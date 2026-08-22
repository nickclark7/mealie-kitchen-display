import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { MealPlanEntry, PlanEntryType } from "../types";
import { addDaysLocal, todayLocal } from "../date-utils";

const ENTRY_ORDER: PlanEntryType[] = ["breakfast", "lunch", "dinner", "side", "snack", "drink", "dessert"];

function formatShort(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function formatWeekday(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(undefined, { weekday: "short" });
}

@customElement("mealplan-view")
export class MealplanView extends LitElement {
  @property({ type: String }) weekStart = "";
  @property({ attribute: false }) entries: MealPlanEntry[] = [];
  @property({ type: Boolean }) loading = false;

  @state() private addFreeformDate: string | null = null;
  @state() private freeformText = "";
  @state() private freeformEntryType: PlanEntryType = "dinner";

  static styles = css`
    :host {
      display: block;
      padding: 8px 16px 24px;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    .nav button {
      min-height: 44px;
      padding: 0 16px;
      border-radius: 22px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      font-size: 14px;
      cursor: pointer;
    }
    .nav .range {
      font-weight: 600;
      font-size: 16px;
      margin-right: auto;
    }
    .week {
      display: grid;
      grid-template-columns: repeat(7, minmax(160px, 1fr));
      gap: 10px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .day {
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      padding: 10px;
      min-height: 120px;
    }
    .day.today {
      outline: 2px solid var(--primary-color, #03a9f4);
    }
    .day-header {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 8px;
      color: var(--secondary-text-color, #757575);
    }
    .entry-row {
      position: relative;
      margin-bottom: 6px;
    }
    .entry {
      display: block;
      width: 100%;
      box-sizing: border-box;
      text-align: left;
      background: var(--primary-background-color, #fafafa);
      border: none;
      border-radius: 8px;
      padding: 8px 26px 8px 8px;
      cursor: pointer;
      font-size: 13px;
      color: inherit;
      font-family: inherit;
    }
    .entry:disabled {
      cursor: default;
    }
    .entry .type {
      display: block;
      text-transform: uppercase;
      font-size: 10px;
      letter-spacing: 0.03em;
      color: var(--secondary-text-color, #757575);
      margin-bottom: 2px;
    }
    .entry .name {
      display: block;
      font-weight: 600;
    }
    .entry-delete {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 20px;
      height: 20px;
      border: none;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.15);
      color: inherit;
      font-size: 11px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .entry-delete:hover {
      background: var(--error-color, #db4437);
      color: #fff;
    }
    .empty {
      color: var(--secondary-text-color, #757575);
      font-size: 12px;
    }
    .add-freeform {
      width: 100%;
      box-sizing: border-box;
      border: 1px dashed var(--divider-color, #e0e0e0);
      background: transparent;
      color: var(--secondary-text-color, #757575);
      border-radius: 8px;
      padding: 8px;
      font-size: 13px;
      cursor: pointer;
    }
    .freeform-form {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .freeform-form input[type="text"],
    .freeform-form select {
      width: 100%;
      box-sizing: border-box;
      font-size: 13px;
      padding: 8px 10px;
      min-height: 36px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--primary-background-color, #fafafa);
      color: inherit;
    }
    .freeform-actions {
      display: flex;
      justify-content: flex-end;
      gap: 6px;
    }
    .freeform-actions button {
      min-height: 32px;
      padding: 0 12px;
      border-radius: 16px;
      border: none;
      font-size: 12px;
      cursor: pointer;
    }
    .freeform-actions .cancel-small {
      background: transparent;
      color: var(--secondary-text-color, #757575);
    }
    .freeform-actions .add-small {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-weight: 600;
    }
    .freeform-actions .add-small:disabled {
      opacity: 0.6;
      cursor: default;
    }
  `;

  private onSelect(entry: MealPlanEntry) {
    if (!entry.recipe) return;
    this.dispatchEvent(new CustomEvent("recipe-select", { detail: { slug: entry.recipe.slug } }));
  }

  private onDeleteClick(entry: MealPlanEntry) {
    this.dispatchEvent(new CustomEvent("delete-entry", { detail: { entry } }));
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

  private submitFreeformAdd() {
    if (!this.addFreeformDate || !this.freeformText.trim()) return;
    this.dispatchEvent(
      new CustomEvent("freeform-add", {
        detail: { date: this.addFreeformDate, entryType: this.freeformEntryType, title: this.freeformText.trim() },
      })
    );
    this.addFreeformDate = null;
    this.freeformText = "";
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
        <div class="freeform-actions">
          <button class="cancel-small" @click=${() => this.cancelFreeformAdd()}>Cancel</button>
          <button class="add-small" ?disabled=${!this.freeformText.trim()} @click=${() => this.submitFreeformAdd()}>
            Add
          </button>
        </div>
      </div>
    `;
  }

  render() {
    const days = Array.from({ length: 7 }, (_, i) => addDaysLocal(this.weekStart, i));
    const todayIso = todayLocal();

    return html`
      <div class="nav">
        <button @click=${() => this.dispatchEvent(new CustomEvent("prev-week"))}>‹ Prev</button>
        <button @click=${() => this.dispatchEvent(new CustomEvent("next-week"))}>Next ›</button>
        <button @click=${() => this.dispatchEvent(new CustomEvent("today"))}>Today</button>
        <span class="range">${formatShort(days[0])} – ${formatShort(days[6])}</span>
      </div>
      ${this.loading
        ? html`<p>Loading…</p>`
        : html`
            <div class="week">
              ${days.map((date) => {
                const dayEntries = this.entries
                  .filter((e) => e.date === date)
                  .sort((a, b) => ENTRY_ORDER.indexOf(a.entryType) - ENTRY_ORDER.indexOf(b.entryType));
                return html`
                  <div class="day ${date === todayIso ? "today" : ""}">
                    <div class="day-header">${formatWeekday(date)} ${formatShort(date)}</div>
                    ${dayEntries.length
                      ? dayEntries.map(
                          (entry) => html`
                            <div class="entry-row">
                              <button class="entry" ?disabled=${!entry.recipe} @click=${() => this.onSelect(entry)}>
                                <span class="type">${entry.entryType}</span>
                                <span class="name">${entry.recipe?.name ?? (entry.title || "Untitled")}</span>
                              </button>
                              <button
                                class="entry-delete"
                                aria-label="Remove from plan"
                                @click=${() => this.onDeleteClick(entry)}
                              >
                                ✕
                              </button>
                            </div>
                          `
                        )
                      : html`<span class="empty">Nothing planned</span>`}
                    ${this.addFreeformDate === date
                      ? this.renderFreeformForm()
                      : html`<button class="add-freeform" @click=${() => this.openFreeformAdd(date)}>+ Add</button>`}
                  </div>
                `;
              })}
            </div>
          `}
    `;
  }
}
