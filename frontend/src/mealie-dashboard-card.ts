import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { MealieClient, describeError } from "./mealie-client";
import type { HomeAssistant, MealPlanEntry, PanelConfig, PlanEntryType, RandomMode, RecipeSummary } from "./types";
import { addDaysLocal, todayLocal } from "./date-utils";
import "./components/confirm-dialog";

type CardMode = "mealplan" | "random" | "random-finder" | "ai-generate" | "search";

interface DashboardCardConfig {
  type: string;
  mode: CardMode;
  title?: string;
  // Where the full panel lives — matches mealie-launcher-card's default, but
  // configurable in case a user has more than one panel instance.
  panel_path?: string;
  count?: number; // "random" mode: how many tiles to show
  random_mode?: RandomMode; // "random" / "random-finder": which pool to pick from
  days?: number; // "mealplan" mode: how many days of the rolling window to show
  show_thumbnails?: boolean; // "mealplan" mode: show each planned recipe's photo
}

const ENTRY_ORDER: PlanEntryType[] = ["breakfast", "lunch", "dinner", "side", "snack", "drink", "dessert"];

const RANDOM_MODE_LABELS: Record<RandomMode, string> = {
  all: "All Recipes",
  "my-recipes": "My Recipes",
  favorites: "Favorites",
  "made-before": "Made Before",
};

const MODE_TITLES: Record<CardMode, string> = {
  mealplan: "This Week's Meals",
  random: "Random Recipes",
  "random-finder": "Surprise Me",
  "ai-generate": "Generate a Recipe with AI",
  search: "Find a Recipe",
};

const MODE_ICONS: Record<CardMode, string> = {
  mealplan: "📅",
  random: "🍽",
  "random-finder": "🎲",
  "ai-generate": "✨",
  search: "🔎",
};

function formatWeekday(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, { weekday: "short" });
}

function formatShort(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

@customElement("mealie-dashboard-card")
export class MealieDashboardCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;

  @state() private config: DashboardCardConfig = { type: "custom:mealie-dashboard-card", mode: "mealplan" };
  // Optimistic default, same reasoning as the panel: don't flash the AI
  // entry points away and back while the real answer is still loading.
  @state() private panelConfig: PanelConfig = { aiEnabled: true, aiConfigured: true };

  @state() private loading = false;
  @state() private error = "";

  @state() private mealplanEntries: MealPlanEntry[] = [];
  @state() private addFreeformDate: string | null = null;
  @state() private freeformText = "";
  @state() private freeformEntryType: PlanEntryType = "dinner";
  @state() private freeformSaving = false;
  @state() private pendingDeleteEntry: MealPlanEntry | null = null;
  @state() private randomRecipes: RecipeSummary[] = [];
  @state() private pickedRecipe: RecipeSummary | null = null;
  @state() private pickerMode: RandomMode = "all";
  @state() private aiPrompt = "";
  @state() private searchQuery = "";
  @state() private searchResults: RecipeSummary[] = [];

  private client?: MealieClient;
  private searchTimer?: number;

  setConfig(config: DashboardCardConfig) {
    if (!config.mode) {
      throw new Error(
        "mealie-dashboard-card: 'mode' is required (mealplan, random, random-finder, ai-generate, search)"
      );
    }
    const prevMode = this.config.mode;
    this.config = {
      panel_path: "/mealie-recipes",
      count: 4,
      random_mode: "all",
      days: 7,
      show_thumbnails: false,
      ...config,
    };
    this.pickerMode = this.config.random_mode ?? "all";
    if (this.client && this.config.mode !== prevMode) {
      this.loadModeData();
    }
  }

  static getStubConfig() {
    return { mode: "mealplan" };
  }

  static getConfigElement() {
    return document.createElement("mealie-dashboard-card-editor");
  }

  getCardSize() {
    if (this.config.mode === "mealplan") return this.config.show_thumbnails ? 5 : 4;
    return 3;
  }

  protected willUpdate(): void {
    if (!this.client && this.hass) {
      this.client = new MealieClient(this.hass);
      this.loadConfig();
      this.loadModeData();
    }
  }

  private async loadConfig() {
    if (!this.client) return;
    try {
      this.panelConfig = await this.client.getConfig();
    } catch {
      // Non-fatal: keep the optimistic default.
    }
  }

  private loadModeData() {
    if (!this.client) return;
    this.error = "";
    if (this.config.mode === "mealplan") this.loadMealplan();
    else if (this.config.mode === "random") this.loadRandomRecipes();
    else if (this.config.mode === "random-finder") {
      this.pickedRecipe = null;
    }
  }

  private async loadMealplan() {
    if (!this.client) return;
    this.loading = true;
    try {
      const start = todayLocal();
      const end = addDaysLocal(start, (this.config.days ?? 7) - 1);
      const result = await this.client.getMealplans(start, end);
      this.mealplanEntries = result.items;
    } catch (e) {
      this.error = await describeError(e, "Failed to load meal plan");
    } finally {
      this.loading = false;
    }
  }

  private openFreeformAdd(date: string) {
    this.addFreeformDate = date;
    this.freeformText = "";
    this.freeformEntryType = "dinner";
  }

  private cancelFreeformAdd() {
    this.addFreeformDate = null;
    this.freeformText = "";
  }

  private async submitFreeformAdd() {
    if (!this.client || !this.addFreeformDate || !this.freeformText.trim()) return;
    this.freeformSaving = true;
    try {
      await this.client.addFreeformMealplanEntry(
        this.addFreeformDate,
        this.freeformEntryType,
        this.freeformText.trim()
      );
      this.addFreeformDate = null;
      this.freeformText = "";
      await this.loadMealplan();
    } catch (e) {
      this.error = await describeError(e, "Failed to add meal plan entry");
    } finally {
      this.freeformSaving = false;
    }
  }

  private requestDeleteEntry(entry: MealPlanEntry) {
    this.pendingDeleteEntry = entry;
  }

  private cancelDeleteEntry() {
    this.pendingDeleteEntry = null;
  }

  private async confirmDeleteEntry() {
    if (!this.client || !this.pendingDeleteEntry) return;
    const entry = this.pendingDeleteEntry;
    this.pendingDeleteEntry = null;
    try {
      await this.client.deleteMealplanEntry(entry.id);
      this.mealplanEntries = this.mealplanEntries.filter((e) => e.id !== entry.id);
    } catch (e) {
      this.error = await describeError(e, "Failed to remove meal plan entry");
    }
  }

  private async loadRandomRecipes() {
    if (!this.client) return;
    this.loading = true;
    try {
      const mode = this.config.random_mode ?? "all";
      const count = this.config.count ?? 4;
      this.randomRecipes = await this.client.getRandomRecipes(mode, count);
    } catch (e) {
      this.error = await describeError(e, "Failed to load random recipes");
    } finally {
      this.loading = false;
    }
  }

  private async pickRandom() {
    if (!this.client) return;
    this.loading = true;
    this.error = "";
    try {
      const { recipe } = await this.client.getRandomRecipe(this.pickerMode);
      this.pickedRecipe = recipe;
      if (!recipe) this.error = "No recipes found for that filter.";
    } catch (e) {
      this.error = await describeError(e, "Failed to pick a recipe");
    } finally {
      this.loading = false;
    }
  }

  private onSearchInput(e: Event) {
    this.searchQuery = (e.target as HTMLInputElement).value;
    window.clearTimeout(this.searchTimer);
    this.searchTimer = window.setTimeout(() => this.runSearch(), 350);
  }

  private async runSearch() {
    if (!this.client) return;
    const q = this.searchQuery.trim();
    if (!q) {
      this.searchResults = [];
      return;
    }
    this.loading = true;
    this.error = "";
    try {
      const result = await this.client.searchRecipes({ search: q, perPage: 6 });
      this.searchResults = result.items;
    } catch (e) {
      this.error = await describeError(e, "Search failed");
    } finally {
      this.loading = false;
    }
  }

  // Same technique mealie-launcher-card uses: a plain pushState + a
  // location-changed event, which HA's frontend router listens for globally.
  private navigate(path: string) {
    history.pushState(null, "", path);
    window.dispatchEvent(new CustomEvent("location-changed", { bubbles: true, composed: true }));
  }

  private openRecipe(recipe: RecipeSummary | null | undefined) {
    if (!recipe) return;
    this.navigate(`${this.config.panel_path}?recipe=${encodeURIComponent(recipe.slug)}`);
  }

  private openAiPrompt() {
    const prompt = this.aiPrompt.trim();
    if (!prompt) return;
    this.navigate(`${this.config.panel_path}?ai_prompt=${encodeURIComponent(prompt)}`);
  }

  private openSearchInApp() {
    const q = this.searchQuery.trim();
    if (!q) return;
    this.navigate(`${this.config.panel_path}?search=${encodeURIComponent(q)}`);
  }

  private imageUrl(recipe: RecipeSummary): string {
    return this.client!.recipeImageUrl(recipe.id);
  }

  static styles = css`
    :host {
      display: block;
    }
    ha-card {
      padding: 16px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
    }
    .header .icon {
      font-size: 22px;
    }
    .header .title {
      font-size: 17px;
      font-weight: 600;
      flex: 1;
    }
    .header button.shuffle {
      border: none;
      background: transparent;
      color: var(--secondary-text-color, #757575);
      font-size: 18px;
      cursor: pointer;
      padding: 4px 6px;
    }
    .muted {
      color: var(--secondary-text-color, #757575);
      font-size: 14px;
    }
    .error {
      color: var(--error-color, #db4437);
      font-size: 14px;
      margin-top: 8px;
    }

    /* mealplan */
    .day-row {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 0;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    .day-row:first-of-type {
      border-top: none;
    }
    .day-label {
      width: 64px;
      flex-shrink: 0;
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color, #757575);
      padding-top: 6px;
    }
    .day-col {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
      min-width: 0;
    }
    .day-entries {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
    }
    .add-freeform {
      border: 1px dashed var(--divider-color, #e0e0e0);
      background: transparent;
      color: var(--secondary-text-color, #757575);
      border-radius: 16px;
      padding: 6px 12px;
      font-size: 13px;
      cursor: pointer;
    }
    .freeform-form {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
    }
    .freeform-form input[type="text"] {
      flex: 1;
      min-width: 140px;
    }
    .freeform-form select {
      min-height: 36px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      font-size: 13px;
    }
    button.primary.small {
      min-height: 36px;
      padding: 0 14px;
      font-size: 13px;
    }
    button.cancel-small {
      border: none;
      background: transparent;
      color: var(--secondary-text-color, #757575);
      font-size: 13px;
      cursor: pointer;
      padding: 0 6px;
    }
    .entry-chip-group {
      display: inline-flex;
      align-items: stretch;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 16px;
      overflow: hidden;
      background: var(--primary-background-color, #fafafa);
    }
    .entry-chip {
      border: none;
      background: transparent;
      color: inherit;
      padding: 6px 10px 6px 12px;
      font-size: 13px;
      cursor: pointer;
    }
    .entry-chip:disabled {
      cursor: default;
      opacity: 0.7;
    }
    .entry-chip-del {
      border: none;
      border-left: 1px solid var(--divider-color, #e0e0e0);
      background: transparent;
      color: var(--secondary-text-color, #757575);
      font-size: 11px;
      padding: 0 10px;
      cursor: pointer;
    }
    .entry-chip-del:hover {
      background: var(--error-color, #db4437);
      color: #fff;
    }
    .entry-thumb {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      width: 72px;
    }
    .entry-thumb-img-wrap {
      position: relative;
      width: 72px;
      height: 72px;
    }
    .entry-thumb-img-btn {
      width: 72px;
      height: 72px;
      border: none;
      background: transparent;
      padding: 0;
      cursor: pointer;
      display: block;
    }
    .entry-thumb-img-btn:disabled {
      cursor: default;
    }
    .entry-thumb-img-btn img,
    .entry-thumb-img-btn .thumb {
      width: 72px;
      height: 72px;
      border-radius: 10px;
      object-fit: cover;
      background: var(--divider-color, #e0e0e0);
      display: block;
    }
    .entry-thumb-del {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 20px;
      height: 20px;
      border: none;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      font-size: 11px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .entry-thumb-del:hover {
      background: var(--error-color, #db4437);
    }
    .entry-thumb-name {
      font-size: 12px;
      text-align: center;
      line-height: 1.25;
    }

    /* random tiles */
    .tiles {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 10px;
    }
    .tile {
      background: var(--primary-background-color, #fafafa);
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      border: none;
      padding: 0;
      text-align: left;
      color: inherit;
      font: inherit;
    }
    .tile img,
    .tile .thumb {
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      display: block;
      background: var(--divider-color, #e0e0e0);
    }
    .tile .name {
      padding: 8px;
      font-size: 13px;
      font-weight: 600;
      line-height: 1.3;
    }

    /* random-finder */
    .finder-controls {
      display: flex;
      gap: 8px;
      margin-bottom: 14px;
    }
    .finder-controls select {
      flex: 1;
      min-height: 40px;
      border-radius: 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      font-size: 14px;
      padding: 0 8px;
    }
    button.primary {
      min-height: 44px;
      padding: 0 18px;
      border-radius: 22px;
      border: none;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
    button.primary:disabled {
      opacity: 0.6;
      cursor: default;
    }
    .picked-card {
      display: flex;
      gap: 12px;
      align-items: center;
      cursor: pointer;
      background: var(--primary-background-color, #fafafa);
      border-radius: 12px;
      padding: 10px;
      margin-top: 12px;
    }
    .picked-card img,
    .picked-card .thumb {
      width: 84px;
      height: 84px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
      background: var(--divider-color, #e0e0e0);
    }
    .picked-card .name {
      font-size: 16px;
      font-weight: 600;
    }
    .picked-card .hint {
      font-size: 13px;
      color: var(--secondary-text-color, #757575);
      margin-top: 4px;
    }
    .try-again {
      margin-top: 10px;
      background: transparent;
      border: none;
      color: var(--primary-color, #03a9f4);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      padding: 4px 0;
    }

    /* ai-generate */
    textarea,
    input[type="text"] {
      width: 100%;
      box-sizing: border-box;
      font-family: inherit;
      font-size: 15px;
      padding: 10px 12px;
      border-radius: 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
    }
    textarea {
      min-height: 72px;
      resize: vertical;
    }
    .setup-needed {
      font-size: 14px;
      color: var(--secondary-text-color, #757575);
      line-height: 1.5;
    }

    /* search */
    .search-row {
      display: flex;
      gap: 8px;
      margin-bottom: 10px;
    }
    .result-row {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      text-align: left;
      border: none;
      background: transparent;
      color: inherit;
      font: inherit;
      cursor: pointer;
      padding: 8px 0;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    .result-row:first-of-type {
      border-top: none;
    }
    .result-row img,
    .result-row .thumb {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
      background: var(--divider-color, #e0e0e0);
    }
    .ai-cta {
      margin-top: 10px;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: center;
      border: 2px dashed var(--primary-color, #03a9f4);
      border-radius: 12px;
      background: transparent;
      color: var(--primary-color, #03a9f4);
      font-size: 14px;
      font-weight: 600;
      padding: 10px 12px;
      cursor: pointer;
    }
    .see-all {
      margin-top: 6px;
      background: transparent;
      border: none;
      color: var(--primary-color, #03a9f4);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      padding: 4px 0;
    }
  `;

  private renderHeader() {
    const mode = this.config.mode;
    return html`
      <div class="header">
        <span class="icon">${MODE_ICONS[mode]}</span>
        <span class="title">${this.config.title || MODE_TITLES[mode]}</span>
        ${mode === "random"
          ? html`<button class="shuffle" aria-label="Shuffle" @click=${() => this.loadRandomRecipes()}>🔄</button>`
          : nothing}
      </div>
    `;
  }

  private renderMealplanEntry(entry: MealPlanEntry) {
    const name = entry.recipe?.name ?? (entry.title || "Untitled");
    if (!this.config.show_thumbnails) {
      return html`
        <span class="entry-chip-group">
          <button class="entry-chip" ?disabled=${!entry.recipe} @click=${() => this.openRecipe(entry.recipe)}>
            ${name}
          </button>
          <button class="entry-chip-del" aria-label="Remove from plan" @click=${() => this.requestDeleteEntry(entry)}>
            ✕
          </button>
        </span>
      `;
    }
    return html`
      <div class="entry-thumb">
        <div class="entry-thumb-img-wrap">
          <button
            class="entry-thumb-img-btn"
            ?disabled=${!entry.recipe}
            @click=${() => this.openRecipe(entry.recipe)}
          >
            ${entry.recipe?.image
              ? html`<img src=${this.imageUrl(entry.recipe)} alt="" />`
              : html`<div class="thumb"></div>`}
          </button>
          <button class="entry-thumb-del" aria-label="Remove from plan" @click=${() => this.requestDeleteEntry(entry)}>
            ✕
          </button>
        </div>
        <span class="entry-thumb-name">${name}</span>
      </div>
    `;
  }

  private renderFreeformForm() {
    return html`
      <div class="freeform-form">
        <input
          type="text"
          placeholder="e.g. Leftovers, Takeout, Eating out"
          .value=${this.freeformText}
          @input=${(e: Event) => (this.freeformText = (e.target as HTMLInputElement).value)}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === "Enter") this.submitFreeformAdd();
          }}
        />
        <select
          .value=${this.freeformEntryType}
          @change=${(e: Event) => (this.freeformEntryType = (e.target as HTMLSelectElement).value as PlanEntryType)}
        >
          ${ENTRY_ORDER.map((t) => html`<option value=${t}>${t}</option>`)}
        </select>
        <button
          class="primary small"
          ?disabled=${this.freeformSaving || !this.freeformText.trim()}
          @click=${() => this.submitFreeformAdd()}
        >
          ${this.freeformSaving ? "Adding…" : "Add"}
        </button>
        <button class="cancel-small" @click=${() => this.cancelFreeformAdd()}>Cancel</button>
      </div>
    `;
  }

  private renderMealplan() {
    if (this.loading && !this.mealplanEntries.length) return html`<p class="muted">Loading…</p>`;
    const days = Array.from({ length: this.config.days ?? 7 }, (_, i) => addDaysLocal(todayLocal(), i));
    return html`
      ${days.map((date) => {
        const entries = this.mealplanEntries
          .filter((e) => e.date === date)
          .sort((a, b) => ENTRY_ORDER.indexOf(a.entryType) - ENTRY_ORDER.indexOf(b.entryType));
        return html`
          <div class="day-row">
            <div class="day-label">${formatWeekday(date)}<br />${formatShort(date)}</div>
            <div class="day-col">
              <div class="day-entries">
                ${entries.length ? entries.map((entry) => this.renderMealplanEntry(entry)) : nothing}
                ${!entries.length && this.addFreeformDate !== date
                  ? html`<span class="muted">Nothing planned</span>`
                  : nothing}
                ${this.addFreeformDate !== date
                  ? html`<button class="add-freeform" @click=${() => this.openFreeformAdd(date)}>+ Add</button>`
                  : nothing}
              </div>
              ${this.addFreeformDate === date ? this.renderFreeformForm() : nothing}
            </div>
          </div>
        `;
      })}
    `;
  }

  private renderRandom() {
    if (this.loading && !this.randomRecipes.length) return html`<p class="muted">Loading…</p>`;
    if (!this.randomRecipes.length) return html`<p class="muted">No recipes found.</p>`;
    return html`
      <div class="tiles">
        ${this.randomRecipes.map(
          (recipe) => html`
            <button class="tile" @click=${() => this.openRecipe(recipe)}>
              ${recipe.image ? html`<img src=${this.imageUrl(recipe)} alt="" />` : html`<div class="thumb"></div>`}
              <div class="name">${recipe.name}</div>
            </button>
          `
        )}
      </div>
    `;
  }

  private renderRandomFinder() {
    return html`
      <div class="finder-controls">
        <select
          .value=${this.pickerMode}
          @change=${(e: Event) => (this.pickerMode = (e.target as HTMLSelectElement).value as RandomMode)}
        >
          ${Object.entries(RANDOM_MODE_LABELS).map(([mode, label]) => html`<option value=${mode}>${label}</option>`)}
        </select>
        <button class="primary" ?disabled=${this.loading} @click=${() => this.pickRandom()}>
          ${this.loading ? "Picking…" : "🎲 Surprise Me"}
        </button>
      </div>
      ${this.pickedRecipe
        ? html`
            <div class="picked-card" @click=${() => this.openRecipe(this.pickedRecipe)}>
              ${this.pickedRecipe.image
                ? html`<img src=${this.imageUrl(this.pickedRecipe)} alt="" />`
                : html`<div class="thumb"></div>`}
              <div>
                <div class="name">${this.pickedRecipe.name}</div>
                <div class="hint">Tap to open</div>
              </div>
            </div>
            <button class="try-again" @click=${() => this.pickRandom()}>🔄 Try Again</button>
          `
        : nothing}
    `;
  }

  private renderAiGenerate() {
    if (!this.panelConfig.aiEnabled) {
      return html`<p class="setup-needed">AI recipe features are disabled in this integration's settings.</p>`;
    }
    if (!this.panelConfig.aiConfigured) {
      return html`
        <p class="setup-needed">
          Choose an AI Task entity for this integration under
          <strong>Settings → Devices &amp; Services → Mealie Kitchen Display → Configure</strong>
          to start generating recipes with AI.
        </p>
      `;
    }
    return html`
      <textarea
        placeholder="e.g. a thick and crispy pizza dough recipe"
        .value=${this.aiPrompt}
        @input=${(e: Event) => (this.aiPrompt = (e.target as HTMLTextAreaElement).value)}
      ></textarea>
      <button
        class="primary"
        style="margin-top: 10px; width: 100%;"
        ?disabled=${!this.aiPrompt.trim()}
        @click=${() => this.openAiPrompt()}
      >
        ✨ Generate Recipe
      </button>
    `;
  }

  private renderSearch() {
    const query = this.searchQuery.trim();
    const showAiCta = this.panelConfig.aiEnabled && query.length > 0;
    return html`
      <div class="search-row">
        <input
          type="text"
          placeholder="Search recipes…"
          .value=${this.searchQuery}
          @input=${this.onSearchInput}
        />
      </div>
      ${this.loading ? html`<p class="muted">Searching…</p>` : nothing}
      ${!this.loading && query && !this.searchResults.length
        ? html`<p class="muted">No recipes found.</p>`
        : nothing}
      ${this.searchResults.map(
        (recipe) => html`
          <button class="result-row" @click=${() => this.openRecipe(recipe)}>
            ${recipe.image ? html`<img src=${this.imageUrl(recipe)} alt="" />` : html`<div class="thumb"></div>`}
            <span class="name">${recipe.name}</span>
          </button>
        `
      )}
      ${this.searchResults.length
        ? html`<button class="see-all" @click=${() => this.openSearchInApp()}>See all results in app →</button>`
        : nothing}
      ${showAiCta
        ? html`
            <button class="ai-cta" @click=${() => this.navigate(`${this.config.panel_path}?ai_prompt=${encodeURIComponent(query)}`)}>
              ✨ Generate "${query}" recipe with AI
            </button>
          `
        : nothing}
    `;
  }

  render() {
    let body;
    switch (this.config.mode) {
      case "mealplan":
        body = this.renderMealplan();
        break;
      case "random":
        body = this.renderRandom();
        break;
      case "random-finder":
        body = this.renderRandomFinder();
        break;
      case "ai-generate":
        body = this.renderAiGenerate();
        break;
      case "search":
        body = this.renderSearch();
        break;
    }
    return html`
      <ha-card>
        ${this.renderHeader()}
        ${body}
        ${this.error ? html`<p class="error">${this.error}</p>` : nothing}
      </ha-card>
      <confirm-dialog
        .open=${!!this.pendingDeleteEntry}
        heading="Remove from meal plan?"
        message=${`"${
          this.pendingDeleteEntry?.recipe?.name ?? this.pendingDeleteEntry?.title ?? "This item"
        }" will be removed from the meal plan.`}
        confirmLabel="Remove"
        destructive
        @confirm=${() => this.confirmDeleteEntry()}
        @cancel=${() => this.cancelDeleteEntry()}
      ></confirm-dialog>
    `;
  }
}

// Home Assistant's card editor contract: setConfig()/hass in, a
// "config-changed" CustomEvent out (bubbling, composed) carrying the full
// updated config. Lovelace's "Edit Card" dialog instantiates this via
// MealieDashboardCard.getConfigElement() and re-renders the card preview on
// every event. Deliberately plain HTML controls rather than ha-selector/
// ha-form — those are HA-internal elements not guaranteed stable across
// versions, and this editor's needs (a handful of selects/inputs) don't
// warrant the risk.
@customElement("mealie-dashboard-card-editor")
export class MealieDashboardCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: DashboardCardConfig;

  setConfig(config: DashboardCardConfig) {
    this._config = config;
  }

  static styles = css`
    .row {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;
    }
    label {
      font-size: 14px;
      font-weight: 600;
    }
    .hint {
      font-size: 12px;
      color: var(--secondary-text-color, #757575);
      margin-top: -2px;
    }
    select,
    input:not([type="checkbox"]) {
      min-height: 40px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      font-size: 14px;
      padding: 0 10px;
      box-sizing: border-box;
      font-family: inherit;
    }
    .checkbox-row label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 400;
    }
    .checkbox-row input[type="checkbox"] {
      width: 18px;
      height: 18px;
    }
  `;

  private updateConfig(patch: Partial<DashboardCardConfig>) {
    if (!this._config) return;
    this._config = { ...this._config, ...patch };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: true, composed: true })
    );
  }

  render() {
    if (!this._config) return nothing;
    const mode = this._config.mode;
    return html`
      <div class="row">
        <label>Mode</label>
        <select
          .value=${mode}
          @change=${(e: Event) => this.updateConfig({ mode: (e.target as HTMLSelectElement).value as CardMode })}
        >
          ${(Object.entries(MODE_TITLES) as [CardMode, string][]).map(
            ([m, label]) => html`<option value=${m}>${MODE_ICONS[m]} ${label}</option>`
          )}
        </select>
      </div>

      <div class="row">
        <label>Title</label>
        <input
          type="text"
          placeholder=${MODE_TITLES[mode]}
          .value=${this._config.title ?? ""}
          @input=${(e: Event) => this.updateConfig({ title: (e.target as HTMLInputElement).value })}
        />
        <span class="hint">Leave blank to use the default title for this mode.</span>
      </div>

      ${mode === "random"
        ? html`
            <div class="row">
              <label>Number of recipes</label>
              <input
                type="number"
                min="1"
                max="12"
                .value=${String(this._config.count ?? 4)}
                @input=${(e: Event) =>
                  this.updateConfig({ count: Number((e.target as HTMLInputElement).value) || 4 })}
              />
            </div>
          `
        : nothing}
      ${mode === "mealplan"
        ? html`
            <div class="row">
              <label>Number of days</label>
              <input
                type="number"
                min="1"
                max="14"
                .value=${String(this._config.days ?? 7)}
                @input=${(e: Event) =>
                  this.updateConfig({ days: Number((e.target as HTMLInputElement).value) || 7 })}
              />
              <span class="hint">Rolling window starting today.</span>
            </div>
            <div class="row checkbox-row">
              <label>
                <input
                  type="checkbox"
                  .checked=${this._config.show_thumbnails ?? false}
                  @change=${(e: Event) =>
                    this.updateConfig({ show_thumbnails: (e.target as HTMLInputElement).checked })}
                />
                Show recipe thumbnails
              </label>
            </div>
          `
        : nothing}
      ${mode === "random" || mode === "random-finder"
        ? html`
            <div class="row">
              <label>Recipe pool</label>
              <select
                .value=${this._config.random_mode ?? "all"}
                @change=${(e: Event) =>
                  this.updateConfig({ random_mode: (e.target as HTMLSelectElement).value as RandomMode })}
              >
                ${Object.entries(RANDOM_MODE_LABELS).map(
                  ([m, label]) => html`<option value=${m}>${label}</option>`
                )}
              </select>
            </div>
          `
        : nothing}

      <div class="row">
        <label>Panel path</label>
        <input
          type="text"
          placeholder="/mealie-recipes"
          .value=${this._config.panel_path ?? ""}
          @input=${(e: Event) => this.updateConfig({ panel_path: (e.target as HTMLInputElement).value })}
        />
        <span class="hint">Only needed if you've registered the panel under a different URL.</span>
      </div>
    `;
  }
}

declare global {
  interface Window {
    customCards?: unknown[];
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "mealie-dashboard-card",
  name: "Mealie Recipe Card",
  description:
    "Meal plan, random recipes, AI recipe generator, surprise-me picker, or recipe search — pick a mode in the card config. Selecting a recipe opens it in the full Mealie panel.",
});
