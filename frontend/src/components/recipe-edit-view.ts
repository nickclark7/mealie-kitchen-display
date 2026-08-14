import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type { RecipeDetail, RecipeIngredient, RecipeInstruction, RecipeUpdateBody } from "../types";

interface EditableIngredient {
  key: number;
  original: RecipeIngredient | null;
  initialText: string;
  text: string;
}

interface EditableInstruction {
  key: number;
  original: RecipeInstruction | null;
  initialText: string;
  text: string;
}

@customElement("recipe-edit-view")
export class RecipeEditView extends LitElement {
  @property({ attribute: false }) recipe: RecipeDetail | null = null;
  @property({ type: String }) imageUrl = "";
  @property({ type: Boolean }) saving = false;
  @property({ type: Boolean }) imageGenerating = false;

  @state() private draftName = "";
  @state() private draftDescription = "";
  @state() private draftServings = 1;
  @state() private draftPrepTime: string | null = null;
  @state() private draftCookTime: string | null = null;
  @state() private draftTotalTime: string | null = null;
  @state() private ingredients: EditableIngredient[] = [];
  @state() private instructions: EditableInstruction[] = [];
  @state() private showImagePrompt = false;
  @state() private imageGuidance = "";

  private lastSlug: string | null | undefined = undefined;
  private nextKey = 0;

  // See ai-recipe-preview.ts for the same drag-to-reorder approach — plain
  // instance fields (not @state) so pointermove doesn't thrash Lit's render.
  private dragKey: number | null = null;
  private dragStartY = 0;
  private dragEl: HTMLElement | null = null;

  static styles = css`
    :host {
      display: block;
      padding: 10px 16px 24px;
      font-size: 16px;
      line-height: 1.3;
    }
    img.hero {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
      border-radius: 12px;
      margin-bottom: 12px;
    }
    .action-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .pill-button {
      min-height: 44px;
      padding: 0 16px;
      border-radius: 22px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      font-size: 14px;
      cursor: pointer;
    }
    .pill-button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .pill-button.save {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
      font-weight: 600;
    }
    label.field-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color, #757575);
      margin: 14px 0 6px;
    }
    input[type="text"],
    input[type="number"],
    textarea,
    .name-input {
      width: 100%;
      box-sizing: border-box;
      font-family: inherit;
      font-size: 16px;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
    }
    .name-input {
      font-size: 20px;
      font-weight: 700;
      padding: 12px 14px;
    }
    textarea {
      resize: vertical;
      min-height: 60px;
    }
    input:focus,
    textarea:focus {
      outline: 2px solid var(--primary-color, #03a9f4);
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px 12px;
      margin-top: 12px;
    }
    .meta-grid label {
      display: block;
      font-size: 13px;
      color: var(--secondary-text-color, #757575);
    }
    .meta-grid input {
      margin-top: 4px;
    }
    h2 {
      font-size: 18px;
      margin: 18px 0 6px;
      border-bottom: 2px solid var(--divider-color, #e0e0e0);
      padding-bottom: 4px;
    }
    ul.edit-list,
    ol.edit-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul.edit-list li,
    ol.edit-list li {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 6px 0;
    }
    ul.edit-list li input,
    ol.edit-list li textarea {
      flex: 1;
    }
    .remove-btn {
      flex: none;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      background: var(--divider-color, #e0e0e0);
      color: inherit;
      font-size: 15px;
      cursor: pointer;
    }
    .step-number {
      flex: none;
      width: 28px;
      height: 28px;
      margin-top: 6px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 13px;
    }
    .instructions-list li {
      background: var(--card-background-color, #fff);
      touch-action: pan-y;
    }
    .instructions-list li.dragging {
      position: relative;
      z-index: 5;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      touch-action: none;
      user-select: none;
    }
    .drag-handle {
      flex: none;
      border: none;
      border-radius: 8px;
      width: 40px;
      height: 40px;
      margin-top: 2px;
      background: var(--divider-color, #e0e0e0);
      color: var(--secondary-text-color, #757575);
      font-size: 20px;
      line-height: 1;
      cursor: grab;
      touch-action: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .drag-handle:active {
      cursor: grabbing;
    }
    .add-btn {
      margin-top: 8px;
      border: 1px dashed var(--divider-color, #e0e0e0);
      background: transparent;
      color: var(--primary-color, #03a9f4);
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
    }
    .image-prompt-panel {
      margin: -8px 0 18px;
      padding: 12px;
      border-radius: 12px;
      background: var(--secondary-background-color, #f5f5f5);
    }
    .image-prompt-panel p {
      margin: 0 0 8px;
      font-size: 13px;
      color: var(--secondary-text-color, #757575);
    }
    .image-prompt-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .image-prompt-row input {
      flex: 1 1 220px;
    }
  `;

  willUpdate(changed: PropertyValues) {
    if (changed.has("recipe") && this.recipe?.slug !== this.lastSlug) {
      this.lastSlug = this.recipe?.slug ?? null;
      const recipe = this.recipe;
      this.draftName = recipe?.name ?? "";
      this.draftDescription = recipe?.description ?? "";
      this.draftServings = recipe?.recipeServings ?? 1;
      this.draftPrepTime = recipe?.prepTime ?? null;
      this.draftCookTime = recipe?.cookTime ?? null;
      this.draftTotalTime = recipe?.totalTime ?? null;
      this.ingredients =
        recipe?.recipeIngredient.map((original) => {
          const text = original.display || original.note || "";
          return { key: this.nextKey++, original, initialText: text, text };
        }) ?? [];
      this.instructions =
        recipe?.recipeInstructions.map((original) => ({
          key: this.nextKey++,
          original,
          initialText: original.text,
          text: original.text,
        })) ?? [];
    }
  }

  private updateIngredientText(key: number, text: string) {
    this.ingredients = this.ingredients.map((ing) => (ing.key === key ? { ...ing, text } : ing));
  }

  private removeIngredient(key: number) {
    this.ingredients = this.ingredients.filter((ing) => ing.key !== key);
  }

  private addIngredient() {
    this.ingredients = [...this.ingredients, { key: this.nextKey++, original: null, initialText: "", text: "" }];
  }

  private updateInstructionText(key: number, text: string) {
    this.instructions = this.instructions.map((step) => (step.key === key ? { ...step, text } : step));
  }

  private removeInstruction(key: number) {
    this.instructions = this.instructions.filter((step) => step.key !== key);
  }

  private addInstruction() {
    this.instructions = [...this.instructions, { key: this.nextKey++, original: null, initialText: "", text: "" }];
  }

  private swapInstructions(from: number, to: number) {
    const next = [...this.instructions];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    this.instructions = next;
  }

  private onDragStart(e: PointerEvent, key: number) {
    e.preventDefault();
    const handle = e.currentTarget as HTMLElement;
    const li = handle.closest("li") as HTMLElement | null;
    if (!li) return;
    this.dragKey = key;
    this.dragStartY = e.clientY;
    this.dragEl = li;
    li.classList.add("dragging");
    handle.setPointerCapture(e.pointerId);
    handle.addEventListener("pointermove", this.onDragMove);
    handle.addEventListener("pointerup", this.onDragEnd);
    handle.addEventListener("pointercancel", this.onDragEnd);
  }

  private onDragMove = (e: PointerEvent) => {
    if (this.dragKey === null || !this.dragEl) return;
    const deltaY = e.clientY - this.dragStartY;
    this.dragEl.style.transform = `translateY(${deltaY}px)`;

    const draggedRect = this.dragEl.getBoundingClientRect();
    const draggedCenter = draggedRect.top + draggedRect.height / 2;
    const index = this.instructions.findIndex((s) => s.key === this.dragKey);

    const siblings = Array.from(this.renderRoot.querySelectorAll<HTMLElement>(".instructions-list li[data-key]"));
    for (const sib of siblings) {
      const key = Number(sib.dataset.key);
      if (key === this.dragKey) continue;
      const rect = sib.getBoundingClientRect();
      if (draggedCenter < rect.top || draggedCenter > rect.bottom) continue;
      const otherIndex = this.instructions.findIndex((s) => s.key === key);
      if (otherIndex === index) continue;

      this.dragStartY += otherIndex > index ? rect.height : -rect.height;
      this.swapInstructions(index, otherIndex);
      this.dragEl.style.transform = `translateY(${e.clientY - this.dragStartY}px)`;
      break;
    }
  };

  private onDragEnd = (e: PointerEvent) => {
    const handle = e.currentTarget as HTMLElement;
    handle.removeEventListener("pointermove", this.onDragMove);
    handle.removeEventListener("pointerup", this.onDragEnd);
    handle.removeEventListener("pointercancel", this.onDragEnd);
    if (this.dragEl) {
      this.dragEl.classList.remove("dragging");
      this.dragEl.style.transform = "";
    }
    this.dragKey = null;
    this.dragEl = null;
  };

  private onSave() {
    if (this.saving) return;
    const name = this.draftName.trim();
    if (!name) return;

    // Ingredient/instruction lines the user never touched are sent back
    // exactly as Mealie gave them (preserving quantity/unit/food structure
    // from e.g. a URL-scraped recipe); only new or edited lines get
    // flattened to a plain note/text — same convention as the AI save flow,
    // but scoped to just what actually changed here.
    const recipeIngredient = this.ingredients
      .filter((ing) => ing.text.trim())
      .map((ing) => (ing.original && ing.text === ing.initialText ? ing.original : { note: ing.text.trim() }));
    const recipeInstructions = this.instructions
      .filter((step) => step.text.trim())
      .map((step) => (step.original && step.text === step.initialText ? step.original : { text: step.text.trim() }));

    const body: RecipeUpdateBody = {
      name,
      description: this.draftDescription,
      recipeServings: this.draftServings,
      prepTime: this.draftPrepTime,
      cookTime: this.draftCookTime,
      totalTime: this.draftTotalTime,
      recipeIngredient,
      recipeInstructions,
    };
    this.dispatchEvent(new CustomEvent("save", { detail: { body } }));
  }

  private onRegenerateImage() {
    if (!this.recipe || this.imageGenerating) return;
    // Same request whether or not guidance is filled in — an empty string
    // is just "regenerate as-is", covering both cases with one action.
    this.dispatchEvent(
      new CustomEvent("regenerate-image", { detail: { guidance: this.imageGuidance.trim() } })
    );
    this.showImagePrompt = false;
    this.imageGuidance = "";
  }

  render() {
    if (!this.recipe) return html`<p>Loading…</p>`;
    const canSave = !this.saving && !!this.draftName.trim();
    return html`
      ${this.recipe.image ? html`<img class="hero" src=${this.imageUrl} alt="" />` : nothing}

      <div class="action-row">
        <button class="pill-button save" ?disabled=${!canSave} @click=${this.onSave}>
          ${this.saving ? "Saving…" : "💾 Save Changes"}
        </button>
        <button class="pill-button" ?disabled=${this.saving} @click=${() => this.dispatchEvent(new CustomEvent("cancel"))}>
          Cancel
        </button>
        <button
          class="pill-button"
          ?disabled=${this.imageGenerating}
          @click=${() => (this.showImagePrompt = !this.showImagePrompt)}
        >
          ${this.imageGenerating ? "📷 Generating…" : "📷 New AI Photo"}
        </button>
      </div>

      ${this.showImagePrompt && !this.imageGenerating
        ? html`
            <div class="image-prompt-panel">
              <p>Optional: describe what you want the new photo to show, or leave blank to just try again.</p>
              <div class="image-prompt-row">
                <input
                  type="text"
                  placeholder="e.g. uncooked pizza dough resting on a wooden paddle"
                  .value=${this.imageGuidance}
                  @keydown=${(e: KeyboardEvent) => {
                    if (e.key === "Enter") this.onRegenerateImage();
                  }}
                  @input=${(e: Event) => (this.imageGuidance = (e.target as HTMLInputElement).value)}
                />
                <button class="pill-button save" @click=${this.onRegenerateImage}>Generate</button>
                <button class="pill-button" @click=${() => (this.showImagePrompt = false)}>Cancel</button>
              </div>
            </div>
          `
        : nothing}

      <label class="field-label">Recipe name</label>
      <input
        class="name-input"
        type="text"
        placeholder="Recipe name"
        .value=${this.draftName}
        @input=${(e: Event) => (this.draftName = (e.target as HTMLInputElement).value)}
      />

      <div class="meta-grid">
        <label>
          Servings
          <input
            type="number"
            min="1"
            .value=${String(this.draftServings)}
            @input=${(e: Event) => (this.draftServings = Number((e.target as HTMLInputElement).value) || 0)}
          />
        </label>
        <label>
          Prep time
          <input
            type="text"
            .value=${this.draftPrepTime ?? ""}
            @input=${(e: Event) => (this.draftPrepTime = (e.target as HTMLInputElement).value || null)}
          />
        </label>
        <label>
          Cook time
          <input
            type="text"
            .value=${this.draftCookTime ?? ""}
            @input=${(e: Event) => (this.draftCookTime = (e.target as HTMLInputElement).value || null)}
          />
        </label>
        <label>
          Total time
          <input
            type="text"
            .value=${this.draftTotalTime ?? ""}
            @input=${(e: Event) => (this.draftTotalTime = (e.target as HTMLInputElement).value || null)}
          />
        </label>
      </div>

      <label class="field-label">Description</label>
      <textarea
        .value=${this.draftDescription}
        @input=${(e: Event) => (this.draftDescription = (e.target as HTMLTextAreaElement).value)}
      ></textarea>

      <h2>Ingredients</h2>
      <ul class="edit-list">
        ${this.ingredients.map(
          (ing) => html`
            <li>
              <input
                type="text"
                .value=${ing.text}
                @input=${(e: Event) => this.updateIngredientText(ing.key, (e.target as HTMLInputElement).value)}
              />
              <button class="remove-btn" aria-label="Remove ingredient" @click=${() => this.removeIngredient(ing.key)}>✕</button>
            </li>
          `
        )}
      </ul>
      <button class="add-btn" @click=${() => this.addIngredient()}>+ Add ingredient</button>

      <h2>Instructions</h2>
      <ol class="edit-list instructions-list">
        ${repeat(
          this.instructions,
          (step) => step.key,
          (step, i) => html`
            <li data-key=${step.key}>
              <div class="step-number">${i + 1}</div>
              <textarea
                .value=${step.text}
                @input=${(e: Event) => this.updateInstructionText(step.key, (e.target as HTMLTextAreaElement).value)}
              ></textarea>
              <button
                class="drag-handle"
                aria-label="Drag to reorder step"
                @pointerdown=${(e: PointerEvent) => this.onDragStart(e, step.key)}
              >
                ⠿
              </button>
              <button class="remove-btn" aria-label="Remove step" @click=${() => this.removeInstruction(step.key)}>✕</button>
            </li>
          `
        )}
      </ol>
      <button class="add-btn" @click=${() => this.addInstruction()}>+ Add step</button>
    `;
  }
}
