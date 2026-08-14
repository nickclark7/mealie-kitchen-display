import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { MealieClient, describeError } from "./mealie-client";
import type {
  Cookbook,
  GeneratedRecipe,
  GenerateImageResult,
  HomeAssistant,
  MealPlanEntry,
  PanelConfig,
  PlanEntryType,
  RandomMode,
  RecipeDetail,
  RecipeSummary,
  RecipeTag,
  RecipeUpdateBody,
  ShoppingList,
  ShoppingListItem,
} from "./types";
import "./components/panel-shell";
import "./components/recipe-search-bar";
import "./components/cookbook-select";
import "./components/recipe-grid";
import "./components/recipe-detail-view";
import "./components/recipe-edit-view";
import "./components/mealplan-dialog";
import "./components/lastmade-dialog";
import "./components/shopping-list-dialog";
import "./components/mealplan-view";
import "./components/random-picker-dialog";
import "./components/confirm-dialog";
import "./components/shopping-view";
import "./components/ai-recipe-view";
import "./components/ai-recipe-preview";
import { addDaysLocal, mondayOfLocal, todayLocal } from "./date-utils";

function withTag(tags: RecipeTag[], tagName: string, present: boolean): RecipeTag[] {
  const has = tags.some((t) => t.name.toLowerCase() === tagName.toLowerCase());
  if (present) return has ? tags : [...tags, { id: "", name: tagName, slug: tagName.toLowerCase().replace(/\s+/g, "-") }];
  return tags.filter((t) => t.name.toLowerCase() !== tagName.toLowerCase());
}

@customElement("mealie-recipe-panel")
export class MealieRecipePanel extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: Boolean }) narrow = false;

  @state() private recipes: RecipeSummary[] = [];
  @state() private loading = true;
  @state() private selectedRecipe: RecipeDetail | null = null;
  @state() private editingRecipe = false;
  @state() private recipeSaving = false;
  @state() private recipeImageGenerating = false;
  // Bumped after a manual image regeneration so the <img src> query string
  // changes — the image URL is otherwise identical (keyed only by recipe id
  // + size), so the browser would keep showing the old cached photo.
  @state() private recipeImageCacheBust = 0;
  @state() private searchQuery = "";
  @state() private cookbooks: Cookbook[] = [];
  // Optimistic defaults: assume AI is available until loadConfig() resolves,
  // so the header button doesn't flash away and back on every load.
  @state() private panelConfig: PanelConfig = { aiEnabled: true, aiConfigured: true };
  @state() private selectedCookbook = "";
  @state() private error = "";
  @state() private showMealplanDialog = false;
  @state() private showLastmadeDialog = false;
  @state() private showShoppingListDialog = false;
  @state() private shoppingLists: ShoppingList[] = [];
  @state() private pendingShoppingItems: string[] = [];
  @state() private showMealplanView = false;
  @state() private cameFromMealplan = false;
  @state() private weekStart = mondayOfLocal(todayLocal());
  @state() private mealplanEntries: MealPlanEntry[] = [];
  @state() private mealplanLoading = false;
  @state() private showRandomPicker = false;
  @state() private showDeleteConfirm = false;
  @state() private showShoppingView = false;
  @state() private selectedShoppingListId = "";
  @state() private shoppingListItems: ShoppingListItem[] = [];
  @state() private shoppingListItemsLoading = false;
  @state() private showDeleteListConfirm = false;
  @state() private showAiView = false;
  @state() private aiPrompt = "";
  @state() private aiGenerating = false;
  @state() private aiError = "";
  @state() private aiGeneratedRecipe: GeneratedRecipe | null = null;
  @state() private aiImageBase64: string | null = null;
  @state() private aiImageMime: string | null = null;
  @state() private aiImageError: string | null = null;
  @state() private aiImageLoading = false;
  // Not @state: this is a handle for the currently in-flight image request,
  // not something rendered — read only at the moment Save is pressed, to
  // let a still-loading image finish and attach itself in the background.
  private aiImageRequest: Promise<GenerateImageResult> | null = null;
  @state() private aiSaving = false;
  @state() private aiImporting = false;
  @state() private aiLastAction: "generate" | "import" = "generate";
  @state() private aiLastImportText = "";
  @state() private aiLastImportImage: File | null = null;

  private client?: MealieClient;

  createRenderRoot() {
    return this;
  }

  protected willUpdate(): void {
    if (!this.client && this.hass) {
      this.client = new MealieClient(this.hass);
      this.loadRecipes();
      this.loadCookbooks();
      this.loadConfig();
    }
  }

  private async loadConfig() {
    if (!this.client) return;
    try {
      this.panelConfig = await this.client.getConfig();
    } catch (e) {
      // Non-fatal: keep the optimistic default rather than blocking the rest
      // of the panel on this.
    }
  }

  private async loadCookbooks() {
    if (!this.client) return;
    try {
      const result = await this.client.getCookbooks();
      this.cookbooks = result.items;
    } catch (e) {
      // Non-fatal: the selector just won't offer any cookbooks beyond "All".
    }
  }

  private async loadRecipes(search = "") {
    if (!this.client) return;
    this.loading = true;
    this.error = "";
    try {
      const result = await this.client.searchRecipes({ search, cookbook: this.selectedCookbook || undefined });
      this.recipes = result.items;
    } catch (e) {
      this.error = await describeError(e, "Failed to load recipes");
    } finally {
      this.loading = false;
    }
  }

  private async openRecipe(slug: string, fromMealplan = false) {
    if (!this.client) return;
    this.selectedRecipe = null;
    this.cameFromMealplan = fromMealplan;
    this.showMealplanView = false;
    try {
      this.selectedRecipe = await this.client.getRecipe(slug);
    } catch (e) {
      this.error = await describeError(e, "Failed to load recipe");
    }
  }

  private closeDetail() {
    this.selectedRecipe = null;
    this.editingRecipe = false;
    if (this.cameFromMealplan) {
      this.showMealplanView = true;
      this.cameFromMealplan = false;
    }
  }

  private async onSaveRecipeEdit(e: CustomEvent<{ body: RecipeUpdateBody }>) {
    if (!this.client || !this.selectedRecipe) return;
    this.recipeSaving = true;
    try {
      // Renaming a recipe changes its Mealie slug — always adopt whatever
      // slug comes back rather than assuming the one we opened with is
      // still valid.
      const updated = await this.client.updateRecipe(this.selectedRecipe.slug, e.detail.body);
      this.selectedRecipe = updated;
      this.editingRecipe = false;
      this.loadRecipes(this.searchQuery);
    } catch (err) {
      this.error = await describeError(err, "Failed to save recipe changes");
    } finally {
      this.recipeSaving = false;
    }
  }

  private async onRegenerateImage(guidance?: string) {
    if (!this.client || !this.selectedRecipe) return;
    const slug = this.selectedRecipe.slug;
    this.recipeImageGenerating = true;
    try {
      const result = await this.client.generateRecipeImage(this.selectedRecipe.name, guidance);
      if (!result.imageBase64) {
        this.error = result.imageError ?? "Failed to generate an image";
        return;
      }
      await this.client.attachRecipeImage(slug, result.imageBase64, result.imageMime);
      if (this.selectedRecipe?.slug === slug) {
        this.selectedRecipe = await this.client.getRecipe(slug);
      }
      this.recipeImageCacheBust = Date.now();
      this.loadRecipes(this.searchQuery);
    } catch (err) {
      this.error = await describeError(err, "Failed to generate an image");
    } finally {
      this.recipeImageGenerating = false;
    }
  }

  private async openMealplanView() {
    this.showMealplanView = true;
    await this.loadMealplanWeek();
  }

  private async loadMealplanWeek() {
    if (!this.client) return;
    this.mealplanLoading = true;
    try {
      const result = await this.client.getMealplans(this.weekStart, addDaysLocal(this.weekStart, 6));
      this.mealplanEntries = result.items;
    } catch (e) {
      this.error = await describeError(e, "Failed to load meal plan");
    } finally {
      this.mealplanLoading = false;
    }
  }

  private changeWeek(days: number) {
    this.weekStart = addDaysLocal(this.weekStart, days);
    this.loadMealplanWeek();
  }

  private goToCurrentWeek() {
    this.weekStart = mondayOfLocal(todayLocal());
    this.loadMealplanWeek();
  }

  private onSearchChange(e: CustomEvent<{ value: string }>) {
    this.searchQuery = e.detail.value;
    this.loadRecipes(this.searchQuery);
  }

  private onCookbookChange(e: CustomEvent<{ value: string }>) {
    this.selectedCookbook = e.detail.value;
    this.loadRecipes(this.searchQuery);
  }

  private updateRecipeTags(slug: string, tagName: string, present: boolean) {
    this.recipes = this.recipes.map((r) => (r.slug === slug ? { ...r, tags: withTag(r.tags, tagName, present) } : r));
    if (this.selectedRecipe?.slug === slug) {
      this.selectedRecipe = { ...this.selectedRecipe, tags: withTag(this.selectedRecipe.tags, tagName, present) };
    }
  }

  private async onFavoriteToggle(e: CustomEvent<{ slug: string; favorite: boolean }>) {
    if (!this.client) return;
    const { slug, favorite } = e.detail;
    try {
      await this.client.setFavorite(slug, favorite);
    } catch (err) {
      this.error = await describeError(err, "Failed to update favorite");
      return;
    }
    this.updateRecipeTags(slug, "Favorite", favorite);
    // A "Favorites" cookbook may have just been auto-created server-side.
    this.loadCookbooks();
  }

  private async onMyRecipeToggle(e: CustomEvent<{ slug: string; myRecipe: boolean }>) {
    if (!this.client) return;
    const { slug, myRecipe } = e.detail;
    try {
      await this.client.setMyRecipe(slug, myRecipe);
    } catch (err) {
      this.error = await describeError(err, "Failed to update My Recipe");
      return;
    }
    this.updateRecipeTags(slug, "My Recipe", myRecipe);
    // A "My Recipes" cookbook may have just been auto-created server-side.
    this.loadCookbooks();
  }

  private async onMealplanConfirm(e: CustomEvent<{ date: string; entryType: PlanEntryType }>) {
    if (!this.client || !this.selectedRecipe) return;
    try {
      await this.client.addToMealplan(this.selectedRecipe.id, e.detail.date, e.detail.entryType);
    } catch (err) {
      this.error = await describeError(err, "Failed to add to meal plan");
    }
    this.showMealplanDialog = false;
  }

  private async onLastmadeConfirm(e: CustomEvent<{ date: string }>) {
    if (!this.client || !this.selectedRecipe) return;
    const slug = this.selectedRecipe.slug;
    try {
      await this.client.setLastMade(slug, e.detail.date);
      const isoDate = `${e.detail.date}T00:00:00`;
      this.recipes = this.recipes.map((r) => (r.slug === slug ? { ...r, lastMade: isoDate } : r));
      if (this.selectedRecipe?.slug === slug) {
        this.selectedRecipe = { ...this.selectedRecipe, lastMade: isoDate };
      }
    } catch (err) {
      this.error = await describeError(err, "Failed to record last made date");
    }
    this.showLastmadeDialog = false;
  }

  private async onOpenShoppingList(e: CustomEvent<{ items: string[] }>) {
    if (!this.client) return;
    this.pendingShoppingItems = e.detail.items;
    this.showShoppingListDialog = true;
    try {
      const result = await this.client.getShoppingLists();
      this.shoppingLists = result.items;
    } catch (err) {
      this.error = await describeError(err, "Failed to load shopping lists");
    }
  }

  private async onShoppingConfirm(e: CustomEvent<{ listId?: string; newListName?: string }>) {
    if (!this.client) return;
    try {
      const listId = e.detail.listId ?? (await this.client.createShoppingList(e.detail.newListName!)).id;
      await this.client.addToShoppingList(listId, this.pendingShoppingItems);
    } catch (err) {
      this.error = await describeError(err, "Failed to add items to shopping list");
    }
    this.showShoppingListDialog = false;
    this.pendingShoppingItems = [];
  }

  private async onRandomModeSelect(e: CustomEvent<{ mode: RandomMode }>) {
    if (!this.client) return;
    this.showRandomPicker = false;
    try {
      const { recipe } = await this.client.getRandomRecipe(e.detail.mode);
      if (recipe) {
        this.openRecipe(recipe.slug);
      } else {
        this.error = "No recipes found for that category yet.";
      }
    } catch (err) {
      this.error = await describeError(err, "Failed to pick a random recipe");
    }
  }

  private async openShoppingView() {
    this.showShoppingView = true;
    if (!this.shoppingLists.length) {
      try {
        const result = await this.client!.getShoppingLists();
        this.shoppingLists = result.items;
      } catch (err) {
        this.error = await describeError(err, "Failed to load shopping lists");
        return;
      }
    }
    const listId = this.selectedShoppingListId || this.shoppingLists[0]?.id;
    if (listId) this.loadShoppingList(listId);
  }

  private async loadShoppingList(listId: string) {
    if (!this.client) return;
    this.selectedShoppingListId = listId;
    this.shoppingListItemsLoading = true;
    try {
      const detail = await this.client.getShoppingListDetail(listId);
      this.shoppingListItems = detail.listItems;
    } catch (err) {
      this.error = await describeError(err, "Failed to load shopping list");
    } finally {
      this.shoppingListItemsLoading = false;
    }
  }

  private async onToggleShoppingItem(e: CustomEvent<{ itemId: string; checked: boolean }>) {
    if (!this.client) return;
    const { itemId, checked } = e.detail;
    this.shoppingListItems = this.shoppingListItems.map((item) =>
      item.id === itemId ? { ...item, checked } : item
    );
    try {
      await this.client.setShoppingItemChecked(itemId, checked);
    } catch (err) {
      this.error = await describeError(err, "Failed to update item");
    }
  }

  private async onDeleteListConfirm() {
    if (!this.client || !this.selectedShoppingListId) return;
    const listId = this.selectedShoppingListId;
    try {
      await this.client.deleteShoppingList(listId);
      this.shoppingLists = this.shoppingLists.filter((l) => l.id !== listId);
      this.selectedShoppingListId = "";
      this.shoppingListItems = [];
      const next = this.shoppingLists[0]?.id;
      if (next) this.loadShoppingList(next);
    } catch (err) {
      this.error = await describeError(err, "Failed to delete shopping list");
    }
    this.showDeleteListConfirm = false;
  }

  private openAiView() {
    this.showAiView = true;
    this.aiGeneratedRecipe = null;
    this.aiError = "";
  }

  private onAiGenerateFromSearch(e: CustomEvent<{ query: string }>) {
    if (!e.detail.query) return;
    this.aiPrompt = e.detail.query;
    this.openAiView();
    // Only auto-run if AI is actually set up — otherwise openAiView() alone
    // is enough to land on the "needs configuring" message.
    if (this.panelConfig.aiConfigured) {
      this.onAiGenerate();
    }
  }

  private closeAiView() {
    this.showAiView = false;
    this.aiGeneratedRecipe = null;
    this.aiPrompt = "";
    this.aiError = "";
    this.aiLastAction = "generate";
    this.aiLastImportText = "";
    this.aiLastImportImage = null;
  }

  private closeAiPreview() {
    this.aiGeneratedRecipe = null;
    this.aiImageBase64 = null;
    this.aiImageMime = null;
    this.aiImageError = null;
    this.aiImageLoading = false;
  }

  private async onAiGenerate() {
    if (!this.client || !this.aiPrompt.trim()) return;
    this.aiGenerating = true;
    this.aiError = "";
    this.aiLastAction = "generate";
    try {
      const recipe = await this.client.generateRecipe(this.aiPrompt.trim());
      this.aiGeneratedRecipe = recipe;
      this.aiImageBase64 = null;
      this.aiImageMime = null;
      this.aiImageError = null;
      this.startAiImageGeneration(recipe.name);
    } catch (err) {
      this.aiError = await describeError(err, "Failed to generate a recipe");
    } finally {
      this.aiGenerating = false;
    }
  }

  private async onAiImport(e: CustomEvent<{ text: string; image: File | null }>) {
    if (!this.client) return;
    const { text, image } = e.detail;
    if (!text.trim() && !image) return;
    this.aiLastAction = "import";
    this.aiLastImportText = text;
    this.aiLastImportImage = image;
    this.aiImporting = true;
    this.aiError = "";
    try {
      const recipe = await this.client.importRecipe(text, image);
      this.aiGeneratedRecipe = recipe;
      this.aiImageBase64 = null;
      this.aiImageMime = null;
      this.aiImageError = null;
      this.startAiImageGeneration(recipe.name);
    } catch (err) {
      this.aiError = await describeError(err, "Failed to import recipe");
    } finally {
      this.aiImporting = false;
    }
  }

  // Deliberately not awaited by its callers above — the recipe text is
  // already on screen by the time this starts, and the photo (much slower
  // to generate) just pops into the preview whenever it resolves. The raw
  // request promise is stashed on `aiImageRequest` so Save can grab it and
  // let it finish in the background if it's still running when pressed —
  // see onAiSaveRecipe/attachImageWhenReady.
  private startAiImageGeneration(subject: string) {
    if (!this.client) return;
    this.aiImageLoading = true;
    const request = this.client.generateRecipeImage(subject);
    this.aiImageRequest = request;
    request
      .then((result) => {
        this.aiImageBase64 = result.imageBase64;
        this.aiImageMime = result.imageMime;
        this.aiImageError = result.imageError;
      })
      .catch(async (err) => {
        this.aiImageError = await describeError(err, "Failed to generate an image");
      })
      .finally(() => {
        this.aiImageLoading = false;
      });
  }

  // Waits for an image request that was still running when the recipe got
  // saved, then attaches it to the now-existing Mealie recipe. Runs after
  // the user has already moved on, so failures here are silent — the
  // recipe itself saved fine either way, a missing photo is not worth
  // surfacing an error for at this point.
  private async attachImageWhenReady(slug: string, request: Promise<GenerateImageResult>) {
    if (!this.client) return;
    try {
      const result = await request;
      if (result.imageBase64) {
        await this.client.attachRecipeImage(slug, result.imageBase64, result.imageMime);
      }
    } catch {
      // best-effort; nothing to surface to the user at this point
    }
  }

  private onAiRegenerate() {
    if (this.aiLastAction === "import") {
      this.onAiImport(
        new CustomEvent("import", {
          detail: { text: this.aiLastImportText, image: this.aiLastImportImage },
        })
      );
    } else {
      this.onAiGenerate();
    }
  }

  private async onAiSaveRecipe(e: CustomEvent<{ recipe: GeneratedRecipe }>) {
    if (!this.client) return;
    // Grabbed before the save (and before closeAiView resets aiImageRequest
    // for the next recipe) — if the image is still generating, don't make
    // the user wait for it; save now and let it attach itself once ready.
    const pendingImageRequest = this.aiImageLoading ? this.aiImageRequest : null;
    this.aiSaving = true;
    try {
      const { slug } = await this.client.saveGeneratedRecipe(
        e.detail.recipe,
        this.aiImageBase64,
        this.aiImageMime
      );
      if (pendingImageRequest) {
        this.attachImageWhenReady(slug, pendingImageRequest);
      }
      this.closeAiView();
      this.loadRecipes(this.searchQuery);
      this.openRecipe(slug);
    } catch (err) {
      this.aiError = await describeError(err, "Failed to save recipe to Mealie");
    } finally {
      this.aiSaving = false;
    }
  }

  private async onDeleteConfirm() {
    if (!this.client || !this.selectedRecipe) return;
    const slug = this.selectedRecipe.slug;
    try {
      await this.client.deleteRecipe(slug);
      this.recipes = this.recipes.filter((r) => r.slug !== slug);
      this.selectedRecipe = null;
      this.cameFromMealplan = false;
    } catch (err) {
      this.error = await describeError(err, "Failed to delete recipe");
    }
    this.showDeleteConfirm = false;
  }

  render() {
    if (!this.client) {
      return html`<panel-shell title="Recipes"><p style="padding:16px">Loading…</p></panel-shell>`;
    }

    if (this.selectedRecipe && this.editingRecipe) {
      const imageUrl =
        this.client.recipeImageUrl(this.selectedRecipe.id, "original") +
        (this.recipeImageCacheBust ? `?v=${this.recipeImageCacheBust}` : "");
      return html`
        <panel-shell title="Edit Recipe" showBack @back=${() => (this.editingRecipe = false)}>
          <recipe-edit-view
            .recipe=${this.selectedRecipe}
            .imageUrl=${imageUrl}
            .saving=${this.recipeSaving}
            .imageGenerating=${this.recipeImageGenerating}
            @save=${(e: CustomEvent<{ body: RecipeUpdateBody }>) => this.onSaveRecipeEdit(e)}
            @cancel=${() => (this.editingRecipe = false)}
            @regenerate-image=${(e: CustomEvent<{ guidance: string }>) => this.onRegenerateImage(e.detail.guidance)}
          ></recipe-edit-view>
        </panel-shell>
      `;
    }

    if (this.selectedRecipe) {
      const imageUrl =
        this.client.recipeImageUrl(this.selectedRecipe.id, "original") +
        (this.recipeImageCacheBust ? `?v=${this.recipeImageCacheBust}` : "");
      return html`
        <panel-shell title=${this.selectedRecipe.name} showBack @back=${() => this.closeDetail()}>
          <recipe-detail-view
            .recipe=${this.selectedRecipe}
            .imageUrl=${imageUrl}
            @favorite-toggle=${this.onFavoriteToggle}
            @my-recipe-toggle=${this.onMyRecipeToggle}
            @open-mealplan=${() => (this.showMealplanDialog = true)}
            @open-lastmade=${() => (this.showLastmadeDialog = true)}
            @open-shopping-list=${this.onOpenShoppingList}
            @open-delete-confirm=${() => (this.showDeleteConfirm = true)}
            @edit=${() => (this.editingRecipe = true)}
          ></recipe-detail-view>
        </panel-shell>
        <confirm-dialog
          .open=${this.showDeleteConfirm}
          heading="Delete recipe?"
          message="\"${this.selectedRecipe.name}\" will be permanently deleted from Mealie. This can't be undone."
          confirmLabel="Delete"
          destructive
          @confirm=${this.onDeleteConfirm}
          @cancel=${() => (this.showDeleteConfirm = false)}
        ></confirm-dialog>
        <mealplan-dialog
          .open=${this.showMealplanDialog}
          .recipeName=${this.selectedRecipe.name}
          @mealplan-confirm=${this.onMealplanConfirm}
          @mealplan-cancel=${() => (this.showMealplanDialog = false)}
        ></mealplan-dialog>
        <lastmade-dialog
          .open=${this.showLastmadeDialog}
          .recipeName=${this.selectedRecipe.name}
          @lastmade-confirm=${this.onLastmadeConfirm}
          @lastmade-cancel=${() => (this.showLastmadeDialog = false)}
        ></lastmade-dialog>
        <shopping-list-dialog
          .open=${this.showShoppingListDialog}
          .lists=${this.shoppingLists}
          .itemCount=${this.pendingShoppingItems.length}
          @shopping-confirm=${this.onShoppingConfirm}
          @shopping-cancel=${() => (this.showShoppingListDialog = false)}
        ></shopping-list-dialog>
      `;
    }

    if (this.showMealplanView) {
      return html`
        <panel-shell title="Meal Plan" showBack @back=${() => (this.showMealplanView = false)}>
          <mealplan-view
            .weekStart=${this.weekStart}
            .entries=${this.mealplanEntries}
            .loading=${this.mealplanLoading}
            @prev-week=${() => this.changeWeek(-7)}
            @next-week=${() => this.changeWeek(7)}
            @today=${() => this.goToCurrentWeek()}
            @recipe-select=${(e: CustomEvent<{ slug: string }>) => this.openRecipe(e.detail.slug, true)}
          ></mealplan-view>
        </panel-shell>
      `;
    }

    if (this.showShoppingView) {
      const selectedListName = this.shoppingLists.find((l) => l.id === this.selectedShoppingListId)?.name ?? "";
      return html`
        <panel-shell title="Shopping List" showBack @back=${() => (this.showShoppingView = false)}>
          <shopping-view
            .lists=${this.shoppingLists}
            .selectedListId=${this.selectedShoppingListId}
            .items=${this.shoppingListItems}
            .loading=${this.shoppingListItemsLoading}
            @select-list=${(e: CustomEvent<{ listId: string }>) => this.loadShoppingList(e.detail.listId)}
            @toggle-item=${this.onToggleShoppingItem}
            @delete-list=${() => (this.showDeleteListConfirm = true)}
          ></shopping-view>
        </panel-shell>
        <confirm-dialog
          .open=${this.showDeleteListConfirm}
          heading="Delete shopping list?"
          message="\"${selectedListName}\" and all its items will be permanently deleted from Mealie. This can't be undone."
          confirmLabel="Delete"
          destructive
          @confirm=${this.onDeleteListConfirm}
          @cancel=${() => (this.showDeleteListConfirm = false)}
        ></confirm-dialog>
      `;
    }

    if (this.showAiView) {
      if (this.aiGeneratedRecipe) {
        return html`
          <panel-shell title="AI Recipe" showBack @back=${() => this.closeAiPreview()}>
            <ai-recipe-preview
              .recipe=${this.aiGeneratedRecipe}
              .imageBase64=${this.aiImageBase64}
              .imageMime=${this.aiImageMime}
              .imageError=${this.aiImageError}
              .imageLoading=${this.aiImageLoading}
              .saving=${this.aiSaving}
              @save=${(e: CustomEvent<{ recipe: GeneratedRecipe }>) => this.onAiSaveRecipe(e)}
              @regenerate=${() => this.onAiRegenerate()}
            ></ai-recipe-preview>
          </panel-shell>
        `;
      }
      return html`
        <panel-shell title="AI Recipe Finder" showBack @back=${() => this.closeAiView()}>
          <ai-recipe-view
            .prompt=${this.aiPrompt}
            .generating=${this.aiGenerating}
            .importing=${this.aiImporting}
            .error=${this.aiError}
            .aiConfigured=${this.panelConfig.aiConfigured}
            @prompt-change=${(e: CustomEvent<{ value: string }>) => (this.aiPrompt = e.detail.value)}
            @generate=${() => this.onAiGenerate()}
            @import=${(e: CustomEvent<{ text: string; image: File | null }>) => this.onAiImport(e)}
          ></ai-recipe-view>
        </panel-shell>
      `;
    }

    return html`
      <panel-shell title="Recipes">
        <span slot="header-extra" style="display:flex;">
          <button
            style="border:none;background:transparent;font-size:24px;padding:8px;min-width:44px;min-height:44px;cursor:pointer;"
            aria-label="Meal Plan"
            @click=${() => this.openMealplanView()}
          >
            📅
          </button>
          <button
            style="border:none;background:transparent;font-size:24px;padding:8px;min-width:44px;min-height:44px;cursor:pointer;"
            aria-label="Random Recipe"
            @click=${() => (this.showRandomPicker = true)}
          >
            🎲
          </button>
          <button
            style="border:none;background:transparent;font-size:24px;padding:8px;min-width:44px;min-height:44px;cursor:pointer;"
            aria-label="Shopping List"
            @click=${() => this.openShoppingView()}
          >
            🛒
          </button>
          ${this.panelConfig.aiEnabled
            ? html`
                <button
                  style="border:none;background:transparent;font-size:24px;padding:8px;min-width:44px;min-height:44px;cursor:pointer;"
                  aria-label="AI Recipe Finder"
                  @click=${() => this.openAiView()}
                >
                  ✨
                </button>
              `
            : null}
        </span>
        <random-picker-dialog
          .open=${this.showRandomPicker}
          @mode-select=${this.onRandomModeSelect}
          @cancel=${() => (this.showRandomPicker = false)}
        ></random-picker-dialog>
        <div style="display:flex;flex-wrap:wrap;gap:12px;padding:8px 16px;">
          <recipe-search-bar .value=${this.searchQuery} @search-change=${this.onSearchChange}></recipe-search-bar>
          <cookbook-select
            .cookbooks=${this.cookbooks}
            .value=${this.selectedCookbook}
            @cookbook-change=${this.onCookbookChange}
          ></cookbook-select>
        </div>
        ${this.error ? html`<p style="padding:0 16px;color:var(--error-color,#db4437)">${this.error}</p>` : null}
        <recipe-grid
          .recipes=${this.recipes}
          .loading=${this.loading}
          .searchQuery=${this.searchQuery}
          .aiEnabled=${this.panelConfig.aiEnabled}
          .imageUrl=${(r: RecipeSummary) => this.client!.recipeImageUrl(r.id)}
          @recipe-select=${(e: CustomEvent<{ slug: string }>) => this.openRecipe(e.detail.slug)}
          @favorite-toggle=${this.onFavoriteToggle}
          @ai-generate-from-search=${(e: CustomEvent<{ query: string }>) => this.onAiGenerateFromSearch(e)}
        ></recipe-grid>
      </panel-shell>
    `;
  }
}
