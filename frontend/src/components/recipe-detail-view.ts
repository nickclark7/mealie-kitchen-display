import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { RecipeDetail } from "../types";
import { isFavorite, isMyRecipe } from "../mealie-client";

@customElement("recipe-detail-view")
export class RecipeDetailView extends LitElement {
  @property({ attribute: false }) recipe: RecipeDetail | null = null;
  @property({ type: String }) imageUrl = "";

  @state() private completedSteps = new Set<number>();
  @state() private checkedIngredients = new Set<number>();

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("recipe") && (changed.get("recipe") as RecipeDetail | null)?.slug !== this.recipe?.slug) {
      this.completedSteps = new Set();
      this.checkedIngredients = new Set();
    }
  }

  static styles = css`
    :host {
      display: block;
      padding: 10px 16px 24px;
      font-size: 16px;
      line-height: 1.3;
    }
    img.hero {
      width: 100%;
      max-height: 220px;
      object-fit: cover;
      border-radius: 12px;
      margin-bottom: 10px;
    }
    .meta-row {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
      margin-bottom: 10px;
      font-size: 14px;
      color: var(--secondary-text-color, #757575);
    }
    .favorite {
      margin-left: auto;
      border: none;
      background: transparent;
      font-size: 26px;
      line-height: 1;
      padding: 4px;
      min-width: 40px;
      min-height: 40px;
      cursor: pointer;
      color: var(--secondary-text-color, #757575);
    }
    .favorite.active {
      color: #ff5a5f;
    }
    .action-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 10px;
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
    .pill-button.active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
    }
    .pill-button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .pill-button.danger {
      color: #db4437;
      border-color: #db4437;
      margin-left: auto;
    }
    .ingredients-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    h2 {
      font-size: 18px;
      margin: 14px 0 6px;
      border-bottom: 2px solid var(--divider-color, #e0e0e0);
      padding-bottom: 4px;
    }
    ul.ingredients {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul.ingredients li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 4px;
      min-height: 38px;
      border-bottom: 1px solid var(--divider-color, #f0f0f0);
    }
    ul.ingredients input[type="checkbox"] {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
    }
    ol.instructions {
      padding-left: 0;
      list-style: none;
      counter-reset: step;
    }
    ol.instructions li {
      counter-increment: step;
      padding: 8px 4px 8px 36px;
      position: relative;
      border-bottom: 1px solid var(--divider-color, #f0f0f0);
      cursor: pointer;
      user-select: none;
    }
    ol.instructions li::before {
      content: counter(step);
      position: absolute;
      left: 0;
      top: 8px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 13px;
    }
    ol.instructions li.done {
      color: var(--secondary-text-color, #757575);
    }
    ol.instructions li.done::before {
      content: "✓";
      background: #2e7d32;
    }
    .step-done-label {
      font-style: italic;
    }
  `;

  private onToggleFavorite() {
    if (!this.recipe) return;
    this.dispatchEvent(
      new CustomEvent("favorite-toggle", {
        detail: { slug: this.recipe.slug, favorite: !isFavorite(this.recipe.tags) },
      })
    );
  }

  private onToggleMyRecipe() {
    if (!this.recipe) return;
    this.dispatchEvent(
      new CustomEvent("my-recipe-toggle", {
        detail: { slug: this.recipe.slug, myRecipe: !isMyRecipe(this.recipe.tags) },
      })
    );
  }

  private onAddToMealplan() {
    if (!this.recipe) return;
    this.dispatchEvent(new CustomEvent("open-mealplan"));
  }

  private onOpenLastMade() {
    if (!this.recipe) return;
    this.dispatchEvent(new CustomEvent("open-lastmade"));
  }

  private onDelete() {
    if (!this.recipe) return;
    this.dispatchEvent(new CustomEvent("open-delete-confirm"));
  }

  private toggleIngredient(index: number) {
    const next = new Set(this.checkedIngredients);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    this.checkedIngredients = next;
  }

  private onAddToShoppingList() {
    if (!this.recipe) return;
    const items = this.recipe.recipeIngredient
      .filter((_, i) => this.checkedIngredients.has(i))
      .map((ing) => ing.display);
    if (!items.length) return;
    this.dispatchEvent(new CustomEvent("open-shopping-list", { detail: { items } }));
  }

  private toggleStep(index: number) {
    const next = new Set(this.completedSteps);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    this.completedSteps = next;
  }

  render() {
    const recipe = this.recipe;
    if (!recipe) {
      return html`<p>Loading…</p>`;
    }
    const favorite = isFavorite(recipe.tags);
    const myRecipe = isMyRecipe(recipe.tags);
    return html`
      ${recipe.image ? html`<img class="hero" src=${this.imageUrl} alt="" />` : nothing}
      <div class="meta-row">
        ${recipe.prepTime ? html`<span>Prep: ${recipe.prepTime}</span>` : nothing}
        ${recipe.cookTime ? html`<span>Cook: ${recipe.cookTime}</span>` : nothing}
        ${recipe.totalTime ? html`<span>Total: ${recipe.totalTime}</span>` : nothing}
        ${recipe.recipeServings ? html`<span>Servings: ${recipe.recipeServings}</span>` : nothing}
        <button class="favorite ${favorite ? "active" : ""}" aria-label="Toggle favorite" @click=${this.onToggleFavorite}>
          ${favorite ? "♥" : "♡"}
        </button>
      </div>
      <div class="action-row">
        <button class="pill-button ${myRecipe ? "active" : ""}" @click=${this.onToggleMyRecipe}>
          ${myRecipe ? "✓ My Recipe" : "+ My Recipe"}
        </button>
        <button class="pill-button" @click=${this.onAddToMealplan}>📅 Add to Meal Plan</button>
        <button class="pill-button" @click=${this.onOpenLastMade}>
          ${recipe.lastMade ? `✓ Last made ${recipe.lastMade.slice(0, 10)}` : "🍽 Mark as Made"}
        </button>
        <button class="pill-button danger" @click=${this.onDelete}>🗑 Delete</button>
      </div>
      ${recipe.description ? html`<p>${recipe.description}</p>` : nothing}

      <div class="ingredients-header">
        <h2>Ingredients</h2>
        <button
          class="pill-button"
          ?disabled=${!this.checkedIngredients.size}
          @click=${this.onAddToShoppingList}
        >
          🛒 Add ${this.checkedIngredients.size || ""} to Shopping List
        </button>
      </div>
      <ul class="ingredients">
        ${recipe.recipeIngredient.map(
          (ing, i) => html`<li>
            <input type="checkbox" .checked=${this.checkedIngredients.has(i)} @change=${() => this.toggleIngredient(i)} />${ing.display}
          </li>`
        )}
      </ul>

      <h2>Instructions</h2>
      <ol class="instructions">
        ${recipe.recipeInstructions.map((step, i) => {
          const done = this.completedSteps.has(i);
          return html`
            <li class=${done ? "done" : ""} @click=${() => this.toggleStep(i)}>
              ${done
                ? html`<span class="step-done-label">Step ${i + 1} done</span>`
                : html`${step.title ? html`<strong>${step.title}</strong><br />` : nothing}${step.text}`}
            </li>
          `;
        })}
      </ol>
    `;
  }
}
