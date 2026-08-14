export interface HomeAssistant {
  callApi<T>(method: "GET" | "POST" | "PUT" | "DELETE", path: string, parameters?: unknown): Promise<T>;
}

export interface RecipeCategory {
  id: string;
  name: string;
  slug: string;
}

export type RecipeTag = RecipeCategory;

export type PlanEntryType = "breakfast" | "lunch" | "dinner" | "side" | "snack" | "drink" | "dessert";

export type RandomMode = "all" | "my-recipes" | "favorites" | "made-before";

export interface Cookbook {
  id: string;
  name: string;
  slug: string;
}

export interface RecipeTool {
  id: string;
  name: string;
  slug: string;
}

export interface RecipeSummary {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  description: string;
  recipeServings: number;
  totalTime: string | null;
  prepTime: string | null;
  cookTime: string | null;
  performTime: string | null;
  recipeCategory: RecipeCategory[];
  tags: RecipeTag[];
  rating: number | null;
  lastMade: string | null;
}

export interface ShoppingList {
  id: string;
  name: string;
}

export interface ShoppingListItem {
  id: string;
  display: string;
  checked: boolean;
}

export interface ShoppingListDetail extends ShoppingList {
  listItems: ShoppingListItem[];
}

export interface MealPlanEntry {
  id: number;
  date: string;
  entryType: PlanEntryType;
  title: string;
  text: string;
  recipe: RecipeSummary | null;
}

export interface RecipeIngredient {
  quantity: number | null;
  unit: { name: string; abbreviation: string; pluralName: string } | null;
  food: { name: string } | null;
  note: string;
  display: string;
  title: string;
}

export interface RecipeInstruction {
  id: string;
  title: string;
  summary: string;
  text: string;
}

export interface RecipeDetail extends RecipeSummary {
  recipeYield: string;
  orgURL: string | null;
  tools: RecipeTool[];
  recipeIngredient: RecipeIngredient[];
  recipeInstructions: RecipeInstruction[];
}

export interface RecipeUpdateBody {
  name: string;
  description: string;
  recipeServings: number;
  prepTime: string | null;
  cookTime: string | null;
  totalTime: string | null;
  // Untouched lines are sent back as the exact original object (preserving
  // structured quantity/unit/food or instruction title); only new/edited
  // lines are the flattened plain-text shape.
  recipeIngredient: (RecipeIngredient | { note: string })[];
  recipeInstructions: (RecipeInstruction | { text: string })[];
}

export interface GeneratedRecipe {
  name: string;
  description: string;
  recipeServings: number;
  prepTime: string | null;
  cookTime: string | null;
  totalTime: string | null;
  ingredients: string[];
  instructions: string[];
}

export interface GenerateImageResult {
  imageBase64: string | null;
  imageMime: string | null;
  imageError: string | null;
}

export interface PanelConfig {
  // Master switch: false hides every AI entry point in the UI entirely.
  aiEnabled: boolean;
  // Whether an AI Task entity has actually been picked yet. AI entry points
  // stay visible even when this is false (to nudge setup) — they just show
  // a "needs configuring" message instead of the real generate/import UI.
  aiConfigured: boolean;
}

export interface PaginatedResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  items: T[];
}
