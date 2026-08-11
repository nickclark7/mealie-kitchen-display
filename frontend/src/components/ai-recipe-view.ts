import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("ai-recipe-view")
export class AiRecipeView extends LitElement {
  @property({ type: String }) prompt = "";
  @property({ type: Boolean }) generating = false;
  @property({ type: Boolean }) importing = false;
  @property({ type: String }) error = "";

  @state() private tab: "generate" | "import" = "generate";
  @state() private importText = "";
  @state() private importImage: File | null = null;
  @state() private importImagePreview: string | null = null;

  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
    .tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }
    .tabs button {
      flex: 1;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      border-radius: 20px;
      padding: 10px 12px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
    .tabs button.active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
    }
    p.intro {
      color: var(--secondary-text-color, #757575);
      font-size: 15px;
      line-height: 1.5;
      margin: 0 0 16px;
    }
    textarea {
      width: 100%;
      box-sizing: border-box;
      font-family: inherit;
      font-size: 17px;
      padding: 14px 16px;
      min-height: 100px;
      border-radius: 14px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      resize: vertical;
    }
    textarea:focus {
      outline: 2px solid var(--primary-color, #03a9f4);
    }
    button.generate {
      margin-top: 14px;
      width: 100%;
      min-height: 52px;
      border-radius: 26px;
      border: none;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-size: 17px;
      font-weight: 600;
      cursor: pointer;
    }
    button.generate:disabled {
      opacity: 0.6;
      cursor: default;
    }
    p.error {
      color: var(--error-color, #db4437);
      font-size: 14px;
      margin-top: 12px;
    }
    .photo-picker {
      display: block;
      border: 2px dashed var(--divider-color, #e0e0e0);
      border-radius: 14px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      color: var(--secondary-text-color, #757575);
    }
    .photo-picker input {
      display: none;
    }
    .photo-preview {
      position: relative;
      margin-bottom: 14px;
    }
    .photo-preview img {
      width: 100%;
      max-height: 220px;
      object-fit: cover;
      border-radius: 14px;
      display: block;
    }
    .photo-preview button {
      position: absolute;
      top: 8px;
      right: 8px;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      font-size: 16px;
      cursor: pointer;
    }
    .or-divider {
      text-align: center;
      color: var(--secondary-text-color, #757575);
      font-size: 13px;
      margin: 14px 0;
    }
  `;

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearImagePreview();
  }

  private clearImagePreview() {
    if (this.importImagePreview) URL.revokeObjectURL(this.importImagePreview);
    this.importImagePreview = null;
  }

  private onPromptInput(e: Event) {
    this.dispatchEvent(
      new CustomEvent("prompt-change", { detail: { value: (e.target as HTMLTextAreaElement).value } })
    );
  }

  private onGenerate() {
    if (!this.prompt.trim() || this.generating) return;
    this.dispatchEvent(new CustomEvent("generate"));
  }

  private onImportTextInput(e: Event) {
    this.importText = (e.target as HTMLTextAreaElement).value;
  }

  private onImageSelected(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0] ?? null;
    this.clearImagePreview();
    this.importImage = file;
    this.importImagePreview = file ? URL.createObjectURL(file) : null;
  }

  private onRemoveImage() {
    this.clearImagePreview();
    this.importImage = null;
  }

  private onImport() {
    if (this.importing || (!this.importImage && !this.importText.trim())) return;
    this.dispatchEvent(
      new CustomEvent("import", { detail: { text: this.importText.trim(), image: this.importImage } })
    );
  }

  private renderGenerateTab() {
    return html`
      <p class="intro">Describe what you're after — as specific as you like.</p>
      <textarea
        placeholder="e.g. a thick and crispy pizza dough recipe"
        .value=${this.prompt}
        @input=${this.onPromptInput}
      ></textarea>
      <button class="generate" ?disabled=${this.generating || !this.prompt.trim()} @click=${this.onGenerate}>
        ${this.generating ? "Generating…" : "✨ Generate Recipe"}
      </button>
    `;
  }

  private renderImportTab() {
    const canImport = !this.importing && (!!this.importImage || !!this.importText.trim());
    return html`
      <p class="intro">Snap or upload a photo of a recipe, paste in the text, or both.</p>
      ${this.importImagePreview
        ? html`
            <div class="photo-preview">
              <img src=${this.importImagePreview} alt="Selected recipe photo" />
              <button aria-label="Remove photo" @click=${this.onRemoveImage}>✕</button>
            </div>
          `
        : html`
            <label class="photo-picker">
              <input type="file" accept="image/*" capture="environment" @change=${this.onImageSelected} />
              📷 Tap to take or choose a photo
            </label>
          `}
      <p class="or-divider">— and/or —</p>
      <textarea
        placeholder="Paste recipe text here"
        .value=${this.importText}
        @input=${this.onImportTextInput}
      ></textarea>
      <button class="generate" ?disabled=${!canImport} @click=${this.onImport}>
        ${this.importing ? "Importing…" : "📥 Import Recipe"}
      </button>
    `;
  }

  render() {
    return html`
      <div class="tabs">
        <button class=${this.tab === "generate" ? "active" : ""} @click=${() => (this.tab = "generate")}>
          ✨ Generate
        </button>
        <button class=${this.tab === "import" ? "active" : ""} @click=${() => (this.tab = "import")}>
          📷 Import
        </button>
      </div>
      ${this.tab === "generate" ? this.renderGenerateTab() : this.renderImportTab()}
      ${this.error ? html`<p class="error">${this.error}</p>` : nothing}
    `;
  }
}
