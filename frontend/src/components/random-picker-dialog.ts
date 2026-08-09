import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { RandomMode } from "../types";

const OPTIONS: { mode: RandomMode; label: string; icon: string }[] = [
  { mode: "all", label: "All Recipes", icon: "🍽" },
  { mode: "my-recipes", label: "My Recipes", icon: "✍️" },
  { mode: "favorites", label: "Favorites", icon: "❤️" },
  { mode: "made-before", label: "Made Before", icon: "🕑" },
];

@customElement("random-picker-dialog")
export class RandomPickerDialog extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;

  static styles = css`
    :host {
      display: none;
    }
    :host([open]) {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
    }
    .card {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      border-radius: 16px;
      padding: 20px;
      width: min(92vw, 380px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    h2 {
      margin: 0 0 16px;
      font-size: 20px;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    button.option {
      min-height: 72px;
      border-radius: 14px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--primary-background-color, #fafafa);
      color: inherit;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }
    button.option .icon {
      font-size: 22px;
    }
    .cancel-row {
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }
    button.cancel {
      min-height: 44px;
      padding: 0 20px;
      border-radius: 22px;
      border: none;
      background: transparent;
      color: var(--primary-text-color, #212121);
      font-size: 16px;
      cursor: pointer;
    }
  `;

  private select(mode: RandomMode) {
    this.dispatchEvent(new CustomEvent("mode-select", { detail: { mode } }));
  }

  render() {
    if (!this.open) return null;
    return html`
      <div class="card">
        <h2>Surprise Me</h2>
        <div class="grid">
          ${OPTIONS.map(
            (opt) => html`
              <button class="option" @click=${() => this.select(opt.mode)}>
                <span class="icon">${opt.icon}</span>
                <span>${opt.label}</span>
              </button>
            `
          )}
        </div>
        <div class="cancel-row">
          <button class="cancel" @click=${() => this.dispatchEvent(new CustomEvent("cancel"))}>Cancel</button>
        </div>
      </div>
    `;
  }
}
