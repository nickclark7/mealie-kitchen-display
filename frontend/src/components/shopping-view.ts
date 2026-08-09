import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ShoppingList, ShoppingListItem } from "../types";

@customElement("shopping-view")
export class ShoppingView extends LitElement {
  @property({ attribute: false }) lists: ShoppingList[] = [];
  @property({ type: String }) selectedListId = "";
  @property({ attribute: false }) items: ShoppingListItem[] = [];
  @property({ type: Boolean }) loading = false;

  static styles = css`
    :host {
      display: block;
      padding: 8px 16px 24px;
    }
    .list-tabs {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }
    .delete-list {
      margin-left: auto;
      min-height: 44px;
      padding: 0 16px;
      border-radius: 22px;
      border: 1px solid #db4437;
      background: transparent;
      color: #db4437;
      font-size: 14px;
      cursor: pointer;
    }
    .delete-list:disabled {
      opacity: 0.4;
      cursor: default;
    }
    .list-tabs button {
      min-height: 44px;
      padding: 0 16px;
      border-radius: 22px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      font-size: 14px;
      cursor: pointer;
    }
    .list-tabs button.active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
    }
    ul.items {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul.items li {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 4px;
      min-height: 48px;
      border-bottom: 1px solid var(--divider-color, #f0f0f0);
      font-size: 16px;
    }
    ul.items li.checked {
      color: var(--secondary-text-color, #757575);
      text-decoration: line-through;
    }
    ul.items input[type="checkbox"] {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }
    .empty {
      padding: 32px 4px;
      text-align: center;
      color: var(--secondary-text-color, #757575);
    }
  `;

  private toggle(item: ShoppingListItem) {
    this.dispatchEvent(new CustomEvent("toggle-item", { detail: { itemId: item.id, checked: !item.checked } }));
  }

  render() {
    if (!this.lists.length) {
      return html`<div class="empty">No shopping lists yet.</div>`;
    }
    // Unchecked items first, then checked — keeps the active shopping list at the top.
    const sorted = [...this.items].sort((a, b) => Number(a.checked) - Number(b.checked));
    return html`
      <div class="list-tabs">
        ${this.lists.map(
          (l) => html`
            <button
              class=${l.id === this.selectedListId ? "active" : ""}
              @click=${() => this.dispatchEvent(new CustomEvent("select-list", { detail: { listId: l.id } }))}
            >
              ${l.name}
            </button>
          `
        )}
        <button
          class="delete-list"
          ?disabled=${!this.selectedListId}
          @click=${() => this.dispatchEvent(new CustomEvent("delete-list", { detail: { listId: this.selectedListId } }))}
        >
          🗑 Delete List
        </button>
      </div>
      ${this.loading
        ? html`<p>Loading…</p>`
        : sorted.length
          ? html`
              <ul class="items">
                ${sorted.map(
                  (item) => html`
                    <li class=${item.checked ? "checked" : ""}>
                      <input type="checkbox" .checked=${item.checked} @change=${() => this.toggle(item)} />
                      ${item.display}
                    </li>
                  `
                )}
              </ul>
            `
          : html`<div class="empty">This list is empty.</div>`}
    `;
  }
}
