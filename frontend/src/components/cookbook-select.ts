import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Cookbook } from "../types";

@customElement("cookbook-select")
export class CookbookSelect extends LitElement {
  @property({ attribute: false }) cookbooks: Cookbook[] = [];
  @property({ type: String }) value = "";

  static styles = css`
    :host {
      display: block;
      flex: 1;
      min-width: 140px;
    }
    select {
      width: 100%;
      box-sizing: border-box;
      font-size: 16px;
      padding: 12px 14px;
      min-height: 48px;
      border-radius: 24px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
    }
    select:focus {
      outline: 2px solid var(--primary-color, #03a9f4);
    }
  `;

  private onChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    this.value = value;
    this.dispatchEvent(new CustomEvent("cookbook-change", { detail: { value } }));
  }

  render() {
    return html`
      <select .value=${this.value} @change=${this.onChange}>
        <option value="">All cookbooks</option>
        ${this.cookbooks.map(
          (cb) => html`<option value=${cb.id} ?selected=${cb.id === this.value}>${cb.name}</option>`
        )}
      </select>
    `;
  }
}
