import type {
  Cookbook,
  GeneratedRecipe,
  GenerateImageResult,
  HomeAssistant,
  MealPlanEntry,
  PaginatedResponse,
  PanelConfig,
  PlanEntryType,
  RandomMode,
  RecipeCategory,
  RecipeDetail,
  RecipeSummary,
  RecipeTag,
  RecipeUpdateBody,
  ShoppingList,
  ShoppingListDetail,
} from "./types";

// All calls go through the mealie_recipe_panel custom_component's HA-side
// proxy (/api/mealie_recipe_panel/...), never directly to Mealie. That proxy
// hop is what avoids browser CORS/mixed-content restrictions: HA's frontend
// is always same-origin with itself, regardless of what scheme HA or Mealie
// individually use.
export class MealieClient {
  constructor(private hass: HomeAssistant) {}

  async searchRecipes(opts: {
    search?: string;
    page?: number;
    perPage?: number;
    categories?: string[];
    tags?: string[];
    cookbook?: string;
  } = {}): Promise<PaginatedResponse<RecipeSummary>> {
    const params = new URLSearchParams();
    params.set("page", String(opts.page ?? 1));
    params.set("perPage", String(opts.perPage ?? 24));
    if (opts.search) params.set("search", opts.search);
    if (opts.cookbook) params.set("cookbook", opts.cookbook);
    for (const c of opts.categories ?? []) params.append("categories", c);
    for (const t of opts.tags ?? []) params.append("tags", t);
    return this.hass.callApi("GET", `mealie_recipe_panel/recipes?${params.toString()}`);
  }

  async getCookbooks(): Promise<PaginatedResponse<Cookbook>> {
    return this.hass.callApi("GET", `mealie_recipe_panel/cookbooks`);
  }

  async getConfig(): Promise<PanelConfig> {
    return this.hass.callApi("GET", `mealie_recipe_panel/config`);
  }

  async getRecipe(slug: string): Promise<RecipeDetail> {
    return this.hass.callApi("GET", `mealie_recipe_panel/recipes/${slug}`);
  }

  // POST, not PATCH/PUT: this backend route fetches-then-merges the full
  // recipe server-side, so it isn't a REST-partial-update in the usual
  // sense, and POST keeps it consistent with every other mutation in this
  // client.
  async updateRecipe(slug: string, body: RecipeUpdateBody): Promise<RecipeDetail> {
    return this.hass.callApi("POST", `mealie_recipe_panel/recipes/${slug}`, body);
  }

  async getCategories(): Promise<PaginatedResponse<RecipeCategory>> {
    return this.hass.callApi("GET", `mealie_recipe_panel/categories`);
  }

  async getTags(): Promise<PaginatedResponse<RecipeTag>> {
    return this.hass.callApi("GET", `mealie_recipe_panel/tags`);
  }

  recipeImageUrl(recipeId: string, size: "min-original" | "original" | "tiny-original" = "min-original"): string {
    return `/api/mealie_recipe_panel/image/${recipeId}/${size}`;
  }

  async setFavorite(slug: string, favorite: boolean): Promise<{ favorite: boolean }> {
    return this.hass.callApi("PUT", `mealie_recipe_panel/recipes/${slug}/favorite`, { favorite });
  }

  async setMyRecipe(slug: string, myRecipe: boolean): Promise<{ my_recipe: boolean }> {
    return this.hass.callApi("PUT", `mealie_recipe_panel/recipes/${slug}/my-recipe`, { my_recipe: myRecipe });
  }

  async addToMealplan(recipeId: string, date: string, entryType: PlanEntryType): Promise<unknown> {
    return this.hass.callApi("POST", `mealie_recipe_panel/mealplans`, { recipeId, date, entryType });
  }

  // No recipe attached — just a plain note on the plan (e.g. "Leftovers",
  // "Eating out"), which Mealie supports natively.
  async addFreeformMealplanEntry(date: string, entryType: PlanEntryType, title: string): Promise<unknown> {
    return this.hass.callApi("POST", `mealie_recipe_panel/mealplans`, { date, entryType, title });
  }

  async deleteMealplanEntry(entryId: number): Promise<unknown> {
    return this.hass.callApi("DELETE", `mealie_recipe_panel/mealplans/${entryId}`);
  }

  async setLastMade(slug: string, date: string): Promise<unknown> {
    return this.hass.callApi("PUT", `mealie_recipe_panel/recipes/${slug}/last-made`, { date });
  }

  async getShoppingLists(): Promise<PaginatedResponse<ShoppingList>> {
    return this.hass.callApi("GET", `mealie_recipe_panel/shopping-lists`);
  }

  async createShoppingList(name: string): Promise<ShoppingList> {
    return this.hass.callApi("POST", `mealie_recipe_panel/shopping-lists`, { name });
  }

  async addToShoppingList(shoppingListId: string, items: string[]): Promise<unknown> {
    return this.hass.callApi("POST", `mealie_recipe_panel/shopping-items`, { shoppingListId, items });
  }

  async getMealplans(startDate: string, endDate: string): Promise<PaginatedResponse<MealPlanEntry>> {
    return this.hass.callApi(
      "GET",
      `mealie_recipe_panel/mealplans?start_date=${startDate}&end_date=${endDate}`
    );
  }

  async getRandomRecipe(mode: RandomMode): Promise<{ recipe: RecipeSummary | null }> {
    return this.hass.callApi("GET", `mealie_recipe_panel/recipes/random?mode=${mode}`);
  }

  // Fetches all N in a single request (one page, already distinct) instead
  // of N separate random picks — much faster than looping getRandomRecipe.
  async getRandomRecipes(mode: RandomMode, count: number): Promise<RecipeSummary[]> {
    const { recipes } = await this.hass.callApi<{ recipes: RecipeSummary[] }>(
      "GET",
      `mealie_recipe_panel/recipes/random?mode=${mode}&count=${count}`
    );
    return recipes;
  }

  async deleteRecipe(slug: string): Promise<unknown> {
    return this.hass.callApi("DELETE", `mealie_recipe_panel/recipes/${slug}`);
  }

  async getShoppingListDetail(listId: string): Promise<ShoppingListDetail> {
    return this.hass.callApi("GET", `mealie_recipe_panel/shopping-lists/${listId}`);
  }

  async setShoppingItemChecked(itemId: string, checked: boolean): Promise<unknown> {
    return this.hass.callApi("PUT", `mealie_recipe_panel/shopping-items/${itemId}/checked`, { checked });
  }

  async deleteShoppingList(listId: string): Promise<unknown> {
    return this.hass.callApi("DELETE", `mealie_recipe_panel/shopping-lists/${listId}`);
  }

  async generateRecipe(prompt: string): Promise<GeneratedRecipe> {
    const { recipe } = await this.hass.callApi<{ recipe: GeneratedRecipe }>(
      "POST",
      `mealie_recipe_panel/ai/generate-recipe`,
      { prompt }
    );
    return recipe;
  }

  async saveGeneratedRecipe(
    recipe: GeneratedRecipe,
    imageBase64: string | null,
    imageMime: string | null
  ): Promise<{ slug: string }> {
    return this.hass.callApi("POST", `mealie_recipe_panel/ai/save-recipe`, { recipe, imageBase64, imageMime });
  }

  async importRecipe(text: string, image: File | null): Promise<GeneratedRecipe> {
    let imageBase64: string | null = null;
    let imageMime: string | null = null;
    if (image) {
      imageBase64 = await fileToBase64(image);
      imageMime = image.type || "image/jpeg";
    }
    const { recipe } = await this.hass.callApi<{ recipe: GeneratedRecipe }>(
      "POST",
      `mealie_recipe_panel/ai/import-recipe`,
      { text, imageBase64, imageMime }
    );
    return recipe;
  }

  // Split out from generate/import (rather than requested inline) so the
  // frontend can show the recipe text immediately and let the — much
  // slower — photo pop in once it's ready, instead of blocking on both.
  async generateRecipeImage(subject: string, guidance?: string): Promise<GenerateImageResult> {
    return this.hass.callApi("POST", `mealie_recipe_panel/ai/generate-recipe-image`, { subject, guidance });
  }

  // Attaches a photo to a recipe that's already been saved — used when the
  // user saves before the background image finishes generating.
  async attachRecipeImage(slug: string, imageBase64: string, imageMime: string | null): Promise<unknown> {
    return this.hass.callApi("POST", `mealie_recipe_panel/recipes/${slug}/ai-image`, { imageBase64, imageMime });
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // dataURL looks like "data:image/jpeg;base64,<data>" — strip the prefix.
      const result = reader.result as string;
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// hass.callApi doesn't reliably reject with a plain Error — depending on the
// failure it may throw a fetch Response, or a plain {message} object. Without
// this, `err instanceof Error` silently swallows the real reason and every
// error message in the UI collapses to a generic fallback string.
export async function describeError(err: unknown, fallback: string): Promise<string> {
  if (err instanceof Error && err.message) return err.message;
  if (err && typeof err === "object") {
    const maybeResponse = err as Partial<Response>;
    if (typeof maybeResponse.text === "function") {
      try {
        const text = await maybeResponse.text();
        if (text) return text;
      } catch {
        // fall through
      }
    }
    const maybeMessage = (err as { message?: unknown }).message;
    if (typeof maybeMessage === "string" && maybeMessage) return maybeMessage;
    const maybeStatus = (err as { status?: unknown }).status;
    if (typeof maybeStatus === "number") return `Request failed (HTTP ${maybeStatus})`;
  }
  return fallback;
}

export const FAVORITE_TAG_NAME = "Favorite";
export const MY_RECIPE_TAG_NAME = "My Recipe";

function hasTag(tags: RecipeTag[] | undefined, name: string): boolean {
  return !!tags?.some((t) => t.name.toLowerCase() === name.toLowerCase());
}

export function isFavorite(tags: RecipeTag[] | undefined): boolean {
  return hasTag(tags, FAVORITE_TAG_NAME);
}

export function isMyRecipe(tags: RecipeTag[] | undefined): boolean {
  return hasTag(tags, MY_RECIPE_TAG_NAME);
}
