import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type { GeneratedRecipe } from "../types";

@customElement("ai-recipe-preview")
export class AiRecipePreview extends LitElement {
  @property({ attribute: false }) recipe: GeneratedRecipe | null = null;
  @property({ type: String }) imageBase64: string | null = null;
  @property({ type: String }) imageMime: string | null = null;
  @property({ type: String }) imageError: string | null = null;
  @property({ type: Boolean }) saving = false;

  // The parent hands us a freshly-generated recipe as a preview; we keep our
  // own editable copy so typing doesn't have to round-trip through parent
  // state on every keystroke. `lastRecipeRef` lets us tell "the user edited
  // draft" apart from "the parent gave us a genuinely new recipe" (e.g. after
  // Regenerate), since both look like "draft !== recipe".
  @state() private draft: GeneratedRecipe | null = null;
  private lastRecipeRef: GeneratedRecipe | null = null;

  // Stable per-step identity, independent of `draft.instructions` (plain
  // strings, which can repeat) — lets the keyed `repeat()` below reuse the
  // same DOM node for a step across reorders, which is what makes the drag
  // handle's imperative transform survive an array splice.
  @state() private instructionIds: number[] = [];
  private nextInstructionId = 0;

  // Drag state is plain instance fields, not @state: touching it on every
  // pointermove would thrash Lit's render loop. Only instructionIds/draft
  // changes (on an actual reorder) should trigger a re-render.
  private dragId: number | null = null;
  private dragStartY = 0;
  private dragEl: HTMLElement | null = null;

  static styles = css`
    :host {
      display: block;
      padding: 10px 16px 24px;
      font-size: 16px;
      line-height: 1.3;
    }
    img.hero {
      width: 100%;
      max-height: 240px;
      object-fit: cover;
      border-radius: 12px;
      margin-bottom: 12px;
    }
    p.image-notice {
      color: var(--secondary-text-color, #757575);
      font-size: 13px;
      margin: 0 0 12px;
    }
    .action-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .pill-button {
      min-height: 44px;
      padding: 0 16px;
      border-radius: 22px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      font-size: 14px;
      cursor: pointer;
    }
    .pill-button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .pill-button.save {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
      font-weight: 600;
    }
    label.field-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color, #757575);
      margin: 14px 0 6px;
    }
    input[type="text"],
    input[type="number"],
    textarea,
    .name-input {
      width: 100%;
      box-sizing: border-box;
      font-family: inherit;
      font-size: 16px;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
    }
    .name-input {
      font-size: 20px;
      font-weight: 700;
      padding: 12px 14px;
    }
    textarea {
      resize: vertical;
      min-height: 60px;
    }
    input:focus,
    textarea:focus {
      outline: 2px solid var(--primary-color, #03a9f4);
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px 12px;
      margin-top: 12px;
    }
    .meta-grid label {
      display: block;
      font-size: 13px;
      color: var(--secondary-text-color, #757575);
    }
    .meta-grid input {
      margin-top: 4px;
    }
    h2 {
      font-size: 18px;
      margin: 18px 0 6px;
      border-bottom: 2px solid var(--divider-color, #e0e0e0);
      padding-bottom: 4px;
    }
    ul.edit-list,
    ol.edit-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul.edit-list li,
    ol.edit-list li {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 6px 0;
    }
    ul.edit-list li input,
    ol.edit-list li textarea {
      flex: 1;
    }
    .remove-btn {
      flex: none;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      background: var(--divider-color, #e0e0e0);
      color: inherit;
      font-size: 15px;
      cursor: pointer;
    }
    .step-number {
      flex: none;
      width: 28px;
      height: 28px;
      margin-top: 6px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 13px;
    }
    .instructions-list li {
      background: var(--card-background-color, #fff);
      touch-action: pan-y;
    }
    .instructions-list li.dragging {
      position: relative;
      z-index: 5;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      touch-action: none;
      user-select: none;
    }
    .drag-handle {
      flex: none;
      border: none;
      border-radius: 8px;
      width: 40px;
      height: 40px;
      margin-top: 2px;
      background: var(--divider-color, #e0e0e0);
      color: var(--secondary-text-color, #757575);
      font-size: 20px;
      line-height: 1;
      cursor: grab;
      touch-action: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .drag-handle:active {
      cursor: grabbing;
    }
    .add-btn {
      margin-top: 8px;
      border: 1px dashed var(--divider-color, #e0e0e0);
      background: transparent;
      color: var(--primary-color, #03a9f4);
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
    }
  `;

  willUpdate(changed: PropertyValues) {
    if (changed.has("recipe") && this.recipe !== this.lastRecipeRef) {
      this.lastRecipeRef = this.recipe;
      this.draft = this.recipe
        ? { ...this.recipe, ingredients: [...this.recipe.ingredients], instructions: [...this.recipe.instructions] }
        : null;
      this.instructionIds = this.recipe ? this.recipe.instructions.map(() => this.nextInstructionId++) : [];
    }
  }

  private updateField<K extends keyof GeneratedRecipe>(key: K, value: GeneratedRecipe[K]) {
    if (!this.draft) return;
    this.draft = { ...this.draft, [key]: value };
  }

  private updateIngredient(index: number, value: string) {
    if (!this.draft) return;
    const ingredients = [...this.draft.ingredients];
    ingredients[index] = value;
    this.draft = { ...this.draft, ingredients };
  }

  private removeIngredient(index: number) {
    if (!this.draft) return;
    this.draft = { ...this.draft, ingredients: this.draft.ingredients.filter((_, i) => i !== index) };
  }

  private addIngredient() {
    if (!this.draft) return;
    this.draft = { ...this.draft, ingredients: [...this.draft.ingredients, ""] };
  }

  private updateInstruction(index: number, value: string) {
    if (!this.draft) return;
    const instructions = [...this.draft.instructions];
    instructions[index] = value;
    this.draft = { ...this.draft, instructions };
  }

  private removeInstruction(index: number) {
    if (!this.draft) return;
    this.draft = { ...this.draft, instructions: this.draft.instructions.filter((_, i) => i !== index) };
    this.instructionIds = this.instructionIds.filter((_, i) => i !== index);
  }

  private addInstruction() {
    if (!this.draft) return;
    this.draft = { ...this.draft, instructions: [...this.draft.instructions, ""] };
    this.instructionIds = [...this.instructionIds, this.nextInstructionId++];
  }

  private swapInstructions(from: number, to: number) {
    if (!this.draft) return;
    const instructions = [...this.draft.instructions];
    const [movedText] = instructions.splice(from, 1);
    instructions.splice(to, 0, movedText);
    const ids = [...this.instructionIds];
    const [movedId] = ids.splice(from, 1);
    ids.splice(to, 0, movedId);
    this.draft = { ...this.draft, instructions };
    this.instructionIds = ids;
  }

  // Pointer Events (not native HTML5 drag-and-drop, which mobile/touch
  // browsers implement inconsistently) so the same code drags smoothly with
  // mouse or a finger on a kitchen touch panel. The dragged <li> is moved
  // with an imperative CSS transform on every pointermove; when its center
  // crosses a sibling's bounds we splice the underlying array (swapping
  // places) and immediately compensate dragStartY by that sibling's height
  // so the transform doesn't visibly jump when the sibling reflows.
  private onDragStart(e: PointerEvent, id: number) {
    e.preventDefault();
    const handle = e.currentTarget as HTMLElement;
    const li = handle.closest("li") as HTMLElement | null;
    if (!li) return;
    this.dragId = id;
    this.dragStartY = e.clientY;
    this.dragEl = li;
    li.classList.add("dragging");
    handle.setPointerCapture(e.pointerId);
    handle.addEventListener("pointermove", this.onDragMove);
    handle.addEventListener("pointerup", this.onDragEnd);
    handle.addEventListener("pointercancel", this.onDragEnd);
  }

  private onDragMove = (e: PointerEvent) => {
    if (this.dragId === null || !this.dragEl) return;
    const deltaY = e.clientY - this.dragStartY;
    this.dragEl.style.transform = `translateY(${deltaY}px)`;

    const draggedRect = this.dragEl.getBoundingClientRect();
    const draggedCenter = draggedRect.top + draggedRect.height / 2;
    const index = this.instructionIds.indexOf(this.dragId);

    const siblings = Array.from(this.renderRoot.querySelectorAll<HTMLElement>(".instructions-list li[data-id]"));
    for (const sib of siblings) {
      const id = Number(sib.dataset.id);
      if (id === this.dragId) continue;
      const rect = sib.getBoundingClientRect();
      if (draggedCenter < rect.top || draggedCenter > rect.bottom) continue;
      const otherIndex = this.instructionIds.indexOf(id);
      if (otherIndex === index) continue;

      this.dragStartY += otherIndex > index ? rect.height : -rect.height;
      this.swapInstructions(index, otherIndex);
      this.dragEl.style.transform = `translateY(${e.clientY - this.dragStartY}px)`;
      break;
    }
  };

  private onDragEnd = (e: PointerEvent) => {
    const handle = e.currentTarget as HTMLElement;
    handle.removeEventListener("pointermove", this.onDragMove);
    handle.removeEventListener("pointerup", this.onDragEnd);
    handle.removeEventListener("pointercancel", this.onDragEnd);
    if (this.dragEl) {
      this.dragEl.classList.remove("dragging");
      this.dragEl.style.transform = "";
    }
    this.dragId = null;
    this.dragEl = null;
  };

  private onSave() {
    if (!this.draft || !this.draft.name.trim() || this.saving) return;
    this.dispatchEvent(new CustomEvent("save", { detail: { recipe: this.draft } }));
  }

  render() {
    const recipe = this.draft;
    if (!recipe) return html`<p>Loading…</p>`;
    const canSave = !this.saving && !!recipe.name.trim();
    return html`
      ${this.imageBase64
        ? html`<img class="hero" src="data:${this.imageMime || "image/png"};base64,${this.imageBase64}" alt="" />`
        : nothing}
      ${!this.imageBase64 && this.imageError ? html`<p class="image-notice">No image generated: ${this.imageError}</p>` : nothing}

      <div class="action-row">
        <button class="pill-button save" ?disabled=${!canSave} @click=${this.onSave}>
          ${this.saving ? "Saving…" : "💾 Save to Mealie"}
        </button>
        <button class="pill-button" ?disabled=${this.saving} @click=${() => this.dispatchEvent(new CustomEvent("regenerate"))}>
          🔄 Regenerate
        </button>
      </div>

      <label class="field-label">Recipe name</label>
      <input
        class="name-input"
        type="text"
        placeholder="Recipe name"
        .value=${recipe.name}
        @input=${(e: Event) => this.updateField("name", (e.target as HTMLInputElement).value)}
      />

      <div class="meta-grid">
        <label>
          Servings
          <input
            type="number"
            min="1"
            .value=${String(recipe.recipeServings)}
            @input=${(e: Event) => this.updateField("recipeServings", Number((e.target as HTMLInputElement).value) || 0)}
          />
        </label>
        <label>
          Prep time
          <input
            type="text"
            .value=${recipe.prepTime ?? ""}
            @input=${(e: Event) => this.updateField("prepTime", (e.target as HTMLInputElement).value || null)}
          />
        </label>
        <label>
          Cook time
          <input
            type="text"
            .value=${recipe.cookTime ?? ""}
            @input=${(e: Event) => this.updateField("cookTime", (e.target as HTMLInputElement).value || null)}
          />
        </label>
        <label>
          Total time
          <input
            type="text"
            .value=${recipe.totalTime ?? ""}
            @input=${(e: Event) => this.updateField("totalTime", (e.target as HTMLInputElement).value || null)}
          />
        </label>
      </div>

      <label class="field-label">Description</label>
      <textarea .value=${recipe.description} @input=${(e: Event) => this.updateField("description", (e.target as HTMLTextAreaElement).value)}></textarea>

      <h2>Ingredients</h2>
      <ul class="edit-list">
        ${recipe.ingredients.map(
          (ing, i) => html`
            <li>
              <input type="text" .value=${ing} @input=${(e: Event) => this.updateIngredient(i, (e.target as HTMLInputElement).value)} />
              <button class="remove-btn" aria-label="Remove ingredient" @click=${() => this.removeIngredient(i)}>✕</button>
            </li>
          `
        )}
      </ul>
      <button class="add-btn" @click=${() => this.addIngredient()}>+ Add ingredient</button>

      <h2>Instructions</h2>
      <ol class="edit-list instructions-list">
        ${repeat(
          recipe.instructions,
          (_, i) => this.instructionIds[i],
          (step, i) => html`
            <li data-id=${this.instructionIds[i]}>
              <div class="step-number">${i + 1}</div>
              <textarea .value=${step} @input=${(e: Event) => this.updateInstruction(i, (e.target as HTMLTextAreaElement).value)}></textarea>
              <button
                class="drag-handle"
                aria-label="Drag to reorder step"
                @pointerdown=${(e: PointerEvent) => this.onDragStart(e, this.instructionIds[i])}
              >
                ⠿
              </button>
              <button class="remove-btn" aria-label="Remove step" @click=${() => this.removeInstruction(i)}>✕</button>
            </li>
          `
        )}
      </ol>
      <button class="add-btn" @click=${() => this.addInstruction()}>+ Add step</button>
    `;
  }
}
