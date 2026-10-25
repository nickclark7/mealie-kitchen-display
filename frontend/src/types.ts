export interface HomeAssistant {
  callApi<T>(method: "GET" | "POST" | "PUT" | "DELETE", path: string, parameters?: unknown): Promise<T>;
  // Home Assistant's authenticated WebSocket connection. Used for speech
  // input (voice-input-button.ts), which streams microphone audio as binary
  // frames on the same socket the subscription was made on.
  connection: {
    subscribeMessage<T>(callback: (message: T) => void, subscribeMessage: unknown): Promise<() => void>;
    subscribeEvents<T>(callback: (event: T) => void, eventType: string): Promise<() => void>;
    socket?: WebSocket;
  };
}

// Events emitted by Home Assistant's assist_pipeline/run subscription. Only
// the fields the speech-to-text stage actually uses are typed here.
export interface PipelineRunEvent {
  type: "run-start" | "stt-start" | "stt-vad-start" | "stt-vad-end" | "stt-end" | "run-end" | "error";
  data?: {
    runner_data?: { stt_binary_handler_id?: number | null };
    stt_output?: { text?: string };
    message?: string;
  };
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

// imageUrl/imageUrlLarge are signed by the integration and arrive with the
// recipe: the image views require authentication, and an <img> tag cannot
// send a bearer token, so these URLs carry a signature instead.
export interface RecipeSummary {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  imageUrl?: string | null;
  imageUrlLarge?: string | null;
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

// A recipe the AI features produced, kept in HA storage (not Mealie) until
// it's promoted to My Recipes.
export interface AiHistoryEntry {
  id: string;
  imageUrl: string | null;
  createdAt: string;
  source: "generate" | "import";
  prompt: string;
  recipe: GeneratedRecipe;
  hasImage: boolean;
}

export interface GeneratedRecipeResult {
  recipe: GeneratedRecipe;
  historyId: string;
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
  // Whether to offer speech input in the add-on's free-text boxes. False
  // unless switched on in the integration's options (and assist_pipeline is
  // actually available).
  voiceEnabled: boolean;
  // Assist pipeline to run speech through; null means Home Assistant's
  // preferred pipeline.
  voicePipeline: string | null;
}

export interface PaginatedResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  items: T[];
}
