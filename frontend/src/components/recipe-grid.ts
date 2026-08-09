import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { RecipeSummary } from "../types";
import { isFavorite } from "../mealie-client";

@customElement("recipe-grid")
export class RecipeGrid extends LitElement {
  @property({ attribute: false }) recipes: RecipeSummary[] = [];
  @property({ attribute: false }) imageUrl: (recipe: RecipeSummary) => string = () => "";
  @property({ type: Boolean }) loading = false;

  static styles = css`
    :host {
      display: block;
      padding: 8px 16px 24px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }
    .card {
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      min-height: 48px;
    }
    .card:active {
      transform: scale(0.98);
    }
    .thumb-wrap {
      position: relative;
    }
    .thumb {
      width: 100%;
      aspect-ratio: 4 / 3;
      background: var(--divider-color, #e0e0e0);
      object-fit: cover;
      display: block;
    }
    .favorite {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.45);
      color: #fff;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .favorite.active {
      color: #ff5a5f;
    }
    .favorite:active {
      background: rgba(0, 0, 0, 0.6);
    }
    .info {
      padding: 12px;
    }
    .name {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 4px;
    }
    .meta {
      font-size: 13px;
      color: var(--secondary-text-color, #757575);
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .empty {
      padding: 48px 16px;
      text-align: center;
      color: var(--secondary-text-color, #757575);
      font-size: 18px;
    }
  `;

  private onSelect(recipe: RecipeSummary) {
    this.dispatchEvent(new CustomEvent("recipe-select", { detail: { slug: recipe.slug } }));
  }

  private onToggleFavorite(e: Event, recipe: RecipeSummary) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("favorite-toggle", { detail: { slug: recipe.slug, favorite: !isFavorite(recipe.tags) } })
    );
  }

  render() {
    if (this.loading) {
      return html`<div class="empty">Loading recipes…</div>`;
    }
    if (!this.recipes.length) {
      return html`<div class="empty">No recipes found.</div>`;
    }
    return html`
      <div class="grid">
        ${this.recipes.map((recipe) => {
          const favorite = isFavorite(recipe.tags);
          return html`
            <div class="card" @click=${() => this.onSelect(recipe)}>
              <div class="thumb-wrap">
                ${recipe.image
                  ? html`<img class="thumb" loading="lazy" src=${this.imageUrl(recipe)} alt="" />`
                  : html`<div class="thumb"></div>`}
                <button
                  class="favorite ${favorite ? "active" : ""}"
                  aria-label="Toggle favorite"
                  @click=${(e: Event) => this.onToggleFavorite(e, recipe)}
                >
                  ${favorite ? "♥" : "♡"}
                </button>
              </div>
              <div class="info">
                <p class="name">${recipe.name}</p>
                <div class="meta">
                  ${recipe.totalTime ? html`<span>⏱ ${recipe.totalTime}</span>` : nothing}
                  ${recipe.recipeServings ? html`<span>🍽 ${recipe.recipeServings}</span>` : nothing}
                </div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}
