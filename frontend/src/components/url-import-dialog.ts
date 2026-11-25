import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";

// Paste a recipe link. Mealie does the scraping, so this is deliberately
// plain: a field, an Import button, and whatever the backend says went wrong.
export class UrlImportDialog extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ type: Boolean }) importing = false;
  @property({ type: String }) error = "";

  @state() private url = "";

  static styles = css`
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      padding: 16px;
    }
    .dialog {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      border-radius: 16px;
      padding: 20px;
      width: 100%;
      max-width: 520px;
      box-sizing: border-box;
    }
    h2 {
      margin: 0 0 6px;
      font-size: 20px;
    }
    p.hint {
      margin: 0 0 14px;
      color: var(--secondary-text-color, #757575);
      font-size: 14px;
      line-height: 1.4;
    }
    input {
      width: 100%;
      box-sizing: border-box;
      font-size: 16px;
      padding: 12px 14px;
      min-height: 48px;
      border-radius: 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
    }
    input:focus {
      outline: 2px solid var(--primary-color, #03a9f4);
    }
    p.error {
      color: var(--error-color, #db4437);
      font-size: 14px;
      margin: 12px 0 0;
      line-height: 1.4;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 18px;
    }
    button {
      min-height: 44px;
      padding: 0 18px;
      border-radius: 22px;
      border: none;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      background: transparent;
      color: inherit;
    }
    button.primary {
      background: var(--primary-color, #03a9f4);
      color: #fff;
    }
    button:disabled {
      opacity: 0.6;
      cursor: default;
    }
  `;

  private submit() {
    const url = this.url.trim();
    if (!url || this.importing) return;
    this.dispatchEvent(new CustomEvent("url-import", { detail: { url } }));
  }

  private cancel() {
    this.url = "";
    this.dispatchEvent(new CustomEvent("url-import-cancel"));
  }

  render() {
    if (!this.open) return nothing;
    return html`
      <div class="backdrop" @click=${(e: Event) => e.target === e.currentTarget && this.cancel()}>
        <div class="dialog">
          <h2>Import from a link</h2>
          <p class="hint">Paste the address of a recipe page.</p>
          <input
            type="url"
            inputmode="url"
            placeholder="https://…"
            .value=${this.url}
            ?disabled=${this.importing}
            @input=${(e: Event) => (this.url = (e.target as HTMLInputElement).value)}
            @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this.submit()}
          />
          ${this.error ? html`<p class="error">${this.error}</p>` : nothing}
          <div class="actions">
            <button ?disabled=${this.importing} @click=${this.cancel}>Cancel</button>
            <button class="primary" ?disabled=${this.importing || !this.url.trim()} @click=${this.submit}>
              ${this.importing ? "Importing…" : "Import"}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get("url-import-dialog")) {
  customElements.define("url-import-dialog", UrlImportDialog);
}
