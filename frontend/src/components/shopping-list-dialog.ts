import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { ShoppingList } from "../types";

const NEW_LIST_VALUE = "__new__";

@customElement("shopping-list-dialog")
export class ShoppingListDialog extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Number }) itemCount = 0;
  @property({ attribute: false }) lists: ShoppingList[] = [];

  @state() private selection = "";
  @state() private newListName = "";

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
    select,
    input[type="text"] {
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
    button.confirm:disabled {
      opacity: 0.5;
      cursor: default;
    }
  `;

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("open") && this.open) {
      this.selection = this.lists[0]?.id ?? NEW_LIST_VALUE;
      this.newListName = "";
    }
  }

  private get canConfirm(): boolean {
    return this.selection === NEW_LIST_VALUE ? this.newListName.trim().length > 0 : !!this.selection;
  }

  private confirm() {
    if (!this.canConfirm) return;
    const detail =
      this.selection === NEW_LIST_VALUE
        ? { newListName: this.newListName.trim() }
        : { listId: this.selection };
    this.dispatchEvent(new CustomEvent("shopping-confirm", { detail }));
  }

  private cancel() {
    this.dispatchEvent(new CustomEvent("shopping-cancel"));
  }

  render() {
    if (!this.open) return null;
    return html`
      <div class="card">
        <h2>Add to Shopping List</h2>
        <p class="subtitle">${this.itemCount} ingredient${this.itemCount === 1 ? "" : "s"} selected</p>

        <label for="list">List</label>
        <select id="list" .value=${this.selection} @change=${(e: Event) => (this.selection = (e.target as HTMLSelectElement).value)}>
          ${this.lists.map((l) => html`<option value=${l.id} ?selected=${l.id === this.selection}>${l.name}</option>`)}
          <option value=${NEW_LIST_VALUE} ?selected=${this.selection === NEW_LIST_VALUE}>+ New list…</option>
        </select>

        ${this.selection === NEW_LIST_VALUE
          ? html`
              <label for="new-list-name">New list name</label>
              <input
                id="new-list-name"
                type="text"
                placeholder="e.g. Weekly Shop"
                .value=${this.newListName}
                @input=${(e: Event) => (this.newListName = (e.target as HTMLInputElement).value)}
              />
            `
          : nothing}

        <div class="actions">
          <button class="cancel" @click=${this.cancel}>Cancel</button>
          <button class="confirm" ?disabled=${!this.canConfirm} @click=${this.confirm}>Add</button>
        </div>
      </div>
    `;
  }
}
