# Mealie Kitchen Display

A touch-friendly Home Assistant sidebar panel for browsing, searching, and cooking from your [Mealie](https://mealie.io/) recipes — built for a kitchen tablet, launchable from the sidebar (like Music Assistant) or from a Lovelace card.

All requests to Mealie are proxied server-side through Home Assistant, so it works regardless of whether HA or Mealie run on HTTP or HTTPS — the browser only ever talks to HA's own origin.

<img hight="400" alt="image" src="https://github.com/user-attachments/assets/5725cb75-5448-4332-9346-b1ecb1b4682f" />
<img hight="400"  alt="image" src="https://github.com/user-attachments/assets/4f985574-e480-425f-a54c-b53dbc0af4b8" />


## Features

- Browse and search recipes, with a cookbook filter
- Full recipe detail view: ingredients (with a shopping-list-style checklist), and a step-by-step "cooking mode" that ticks off each instruction as you go
- Favorite recipes (syncs with Mealie's own native favorites) and a "My Recipe" tag, each with an auto-created cookbook so they're easy to browse back to
- Add a recipe to Mealie's meal plan (date + meal type), and a full week calendar view of your plan
- Mark a recipe as made, recording the date in Mealie
- Add selected ingredients to a Mealie shopping list (or create a new one), plus a dedicated shopping list view with checkable items and list deletion
- "Surprise me" random recipe picker — all recipes, your recipes, favorites, or something you've made before
- Delete a recipe, with confirmation
- A matching Lovelace launcher card, so the panel can also be opened from any dashboard
- **AI recipe finder**: generate a recipe from a text description, or import one from a photo and/or pasted text, using your own Home Assistant `ai_task.*` entities — see [AI Recipe Finder](#ai-recipe-finder) below

## Installation

### Via HACS (custom repository)

1. HACS → the "⋮" menu → **Custom repositories**
2. Add this repository URL, category **Integration**
3. Install **Mealie Kitchen Display**, then restart Home Assistant

### Manual

Copy `custom_components/mealie_recipe_panel/` into your Home Assistant `custom_components/` directory, then restart.

## Configuration

Settings → Devices & Services → **Add Integration** → search **Mealie Kitchen Display**.

You'll need:
- Your Mealie instance URL (e.g. `http://192.168.1.50:9000`)
- An API token (Mealie → user menu → Settings → **API Tokens**)

Once added, a **Recipes** entry appears in the sidebar automatically — no further configuration needed. A **Mealie Recipe Launcher** card is also available to add to any dashboard.

### Shopping lists and Home Assistant's native `todo` entities

This add-on writes shopping list items directly to Mealie — that part needs nothing else. If you'd also like those lists to show up as Home Assistant `todo.*` entities (for voice assistant, other shopping-list cards, etc.), add Home Assistant's separate **core Mealie integration** (Settings → Devices & Services → Add Integration → search "Mealie") — it mirrors each Mealie shopping list to a `todo` entity, kept in sync in both directions. That's a different, official integration that ships with Home Assistant; this add-on doesn't duplicate that syncing itself.

## AI Recipe Finder

Tap the ✨ button on the recipe list to open the AI Recipe Finder. It has two tabs:

- **Generate** — describe what you want ("a thick and crispy pizza dough"), and an LLM writes a full recipe.
- **Import** — take/upload a photo of a recipe (a cookbook page, a handwritten card, a screenshot) and/or paste in recipe text, and an LLM transcribes it into the same structured format.

Either way you land on an editable preview — every field, including the name, can be changed, ingredients and instructions can be added/removed, and steps can be dragged into a new order — before you save it into Mealie. Optionally, a second AI model generates a photo for the recipe at the same time.

This feature is **off by default** and needs no LLM provider bundled with it — it works entirely through Home Assistant's own [`ai_task`](https://www.home-assistant.io/integrations/ai_task/) platform, so it uses whatever AI integration(s) you've already set up in Home Assistant (OpenAI, Anthropic Claude, Google Generative AI, a local Ollama server, etc).

### Configuring it

1. Set up at least one AI integration in Home Assistant first (Settings → Devices & Services → Add Integration → e.g. "OpenAI Conversation", "Anthropic Claude", "Ollama") and make sure it has created an `ai_task.*` entity for it. Some integrations create this automatically; others need it added explicitly as a subentry (e.g. an "AI Task" entry under OpenAI Conversation).
2. Settings → Devices & Services → **Mealie Kitchen Display** → **Configure**.
3. Pick an **AI Task entity for recipe text** — this powers both the Generate and Import tabs. Any entity that supports `ai_task`'s `GENERATE_DATA` feature works; for photo import specifically, it also needs `SUPPORT_ATTACHMENTS` (most current multimodal providers have this — text-only models won't).
4. Optionally pick an **AI Task entity for recipe images** — this needs `ai_task`'s `GENERATE_IMAGE` feature, which far fewer providers implement (see below). Leave it unset to skip photo generation; recipes still save fine without a photo.

Both are optional and independent — you can use one provider for text and a different one (or none) for images.

### Supported / tested models

This feature is provider-agnostic by design (it only talks to Home Assistant's `ai_task` API, never to an LLM directly), so anything Home Assistant itself exposes as an `ai_task` entity should work. Tested during development:

| Use | Provider | Notes |
|---|---|---|
| Recipe text (Generate + Import) | OpenAI (e.g. `gpt-5`), Anthropic Claude | Both worked well out of the box, including photo import (attachments). |
| Recipe text (Generate + Import) | Local Ollama models | Works for text; attachment/vision support depends on the specific model pulled. |
| Recipe images | OpenAI `gpt-image-2` (and the `gpt-image-1`/`1.5` family) | Works, but see **OpenAI organization verification** below — this is required, not optional. |
| Recipe images | Local Ollama models | **Not currently possible.** Home Assistant's official Ollama integration does not implement `ai_task`'s image-generation feature for any model, even an image-generation model you've pulled locally (confirmed from HA core source, as of Aug 2026). Picking an Ollama entity as the image entity will fail every time with "does not support generating images". |

If you use a provider not listed here, the same two feature flags decide what works: `GENERATE_DATA` (+ `SUPPORT_ATTACHMENTS` for photo import) for the text entity, `GENERATE_IMAGE` for the image entity. If image generation isn't available for your preferred provider, the rest of the feature still works fine without it.

### OpenAI organization verification

If you use OpenAI for recipe photos, you'll likely hit this error the first time: `does not exist` or `Error talking to OpenAI` with a 403. As of 2026, every current OpenAI image model (`gpt-image-1`, `gpt-image-1-mini`, `gpt-image-1.5`, `gpt-image-2`) requires **organization verification** — a one-time identity/business check, separate from billing — before the API will generate images at all. (DALL-E, which didn't require this, was fully retired by OpenAI in 2026, so there's no unverified fallback within OpenAI.)

To fix: go to [platform.openai.com/settings/organization/general](https://platform.openai.com/settings/organization/general) and click **Verify Organization**. It can take up to 15 minutes to propagate after verifying. Also double-check the model field in your OpenAI Conversation entry — it must be the exact API model id (e.g. `gpt-image-2`), not a display name like "GPT Image 2".

If you'd rather not verify with OpenAI, a local Ollama image-generation model is a free alternative for the *text/import* side of this feature, but — per the table above — can't currently be used for the image-generation side; that part is OpenAI-only for now.

## Development

Frontend source (Lit + TypeScript) lives in `frontend/`. To rebuild after making changes:

```bash
cd frontend
npm install
npm run build
cp dist/*.js ../custom_components/mealie_recipe_panel/www/
```

Restart Home Assistant to pick up backend (`custom_components/mealie_recipe_panel/*.py`) changes; frontend changes take effect on a normal browser refresh (the served JS is cache-busted with a content hash per restart).

## License

MIT — see [LICENSE](LICENSE).
