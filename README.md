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
