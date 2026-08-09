import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("recipe-search-bar")
export class RecipeSearchBar extends LitElement {
  @property({ type: String }) value = "";

  private debounceHandle?: number;

  static styles = css`
    :host {
      display: block;
      flex: 2;
      min-width: 200px;
    }
    input {
      width: 100%;
      box-sizing: border-box;
      font-size: 18px;
      padding: 12px 16px;
      min-height: 48px;
      border-radius: 24px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
    }
    input:focus {
      outline: 2px solid var(--primary-color, #03a9f4);
    }
  `;

  private onInput(e: InputEvent) {
    const value = (e.target as HTMLInputElement).value;
    this.value = value;
    window.clearTimeout(this.debounceHandle);
    this.debounceHandle = window.setTimeout(() => {
      this.dispatchEvent(new CustomEvent("search-change", { detail: { value } }));
    }, 300);
  }

  render() {
    return html`
      <input
        type="search"
        placeholder="Search recipes…"
        .value=${this.value}
        @input=${this.onInput}
      />
    `;
  }
}
