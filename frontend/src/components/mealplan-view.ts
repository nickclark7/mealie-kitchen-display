import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { MealPlanEntry, PlanEntryType } from "../types";
import { addDaysLocal, todayLocal } from "../date-utils";

const ENTRY_ORDER: PlanEntryType[] = ["breakfast", "lunch", "dinner", "side", "snack", "drink", "dessert"];
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function formatShort(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

@customElement("mealplan-view")
export class MealplanView extends LitElement {
  @property({ type: String }) weekStart = "";
  @property({ attribute: false }) entries: MealPlanEntry[] = [];
  @property({ type: Boolean }) loading = false;

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
    .entry {
      display: block;
      width: 100%;
      text-align: left;
      background: var(--primary-background-color, #fafafa);
      border: none;
      border-radius: 8px;
      padding: 8px;
      margin-bottom: 6px;
      cursor: pointer;
      font-size: 13px;
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
    .empty {
      color: var(--secondary-text-color, #757575);
      font-size: 12px;
    }
  `;

  private onSelect(entry: MealPlanEntry) {
    if (!entry.recipe) return;
    this.dispatchEvent(new CustomEvent("recipe-select", { detail: { slug: entry.recipe.slug } }));
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
              ${days.map((date, i) => {
                const dayEntries = this.entries
                  .filter((e) => e.date === date)
                  .sort((a, b) => ENTRY_ORDER.indexOf(a.entryType) - ENTRY_ORDER.indexOf(b.entryType));
                return html`
                  <div class="day ${date === todayIso ? "today" : ""}">
                    <div class="day-header">${DAY_NAMES[i]} ${formatShort(date)}</div>
                    ${dayEntries.length
                      ? dayEntries.map(
                          (entry) => html`
                            <button class="entry" @click=${() => this.onSelect(entry)}>
                              <span class="type">${entry.entryType}</span>
                              <span class="name">${entry.recipe?.name ?? (entry.title || "Untitled")}</span>
                            </button>
                          `
                        )
                      : html`<span class="empty">Nothing planned</span>`}
                  </div>
                `;
              })}
            </div>
          `}
    `;
  }
}
