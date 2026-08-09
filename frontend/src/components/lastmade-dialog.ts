import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { todayLocal as today } from "../date-utils";

@customElement("lastmade-dialog")
export class LastmadeDialog extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) recipeName = "";

  @state() private date = today();

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
      margin: 0 0 4px;
      font-size: 20px;
    }
    p.subtitle {
      margin: 0 0 16px;
      color: var(--secondary-text-color, #757575);
      font-size: 14px;
    }
    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      margin: 12px 0 6px;
    }
    input[type="date"] {
      width: 100%;
      box-sizing: border-box;
      font-size: 18px;
      padding: 12px 14px;
      min-height: 48px;
      border-radius: 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--primary-background-color, #fafafa);
      color: inherit;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }
    button {
      min-height: 48px;
      padding: 0 20px;
      border-radius: 24px;
      border: none;
      font-size: 16px;
      cursor: pointer;
    }
    button.cancel {
      background: transparent;
      color: var(--primary-text-color, #212121);
    }
    button.confirm {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-weight: 600;
    }
  `;

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("open") && this.open) {
      this.date = today();
    }
  }

  private confirm() {
    this.dispatchEvent(new CustomEvent("lastmade-confirm", { detail: { date: this.date } }));
  }

  private cancel() {
    this.dispatchEvent(new CustomEvent("lastmade-cancel"));
  }

  render() {
    if (!this.open) return null;
    return html`
      <div class="card">
        <h2>Mark as Made</h2>
        <p class="subtitle">${this.recipeName}</p>

        <label for="date">Date</label>
        <input id="date" type="date" .value=${this.date} @change=${(e: Event) => (this.date = (e.target as HTMLInputElement).value)} />

        <div class="actions">
          <button class="cancel" @click=${this.cancel}>Cancel</button>
          <button class="confirm" @click=${this.confirm}>Save</button>
        </div>
      </div>
    `;
  }
}
