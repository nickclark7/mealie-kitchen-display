"""Voice intent: show recipes on the screen the request came from.

Said to a voice satellite that also has a screen ("show me a recipe for fried
chicken"), this opens the panel's search results on *that* screen. The intent
itself does no displaying: it resolves the asking satellite, then fires
EVENT_SHOW on the event bus. The listener is the frontend module loaded on
every Home Assistant page (mealie-voice-display.ts), which is what makes this
work identically in kiosk-satellite, the companion app, Fully Kiosk and an
ordinary browser — they're all just a browser showing a Home Assistant page.

Exposed to LLM-backed assistants as a tool by llm.py, so phrasing is the
model's problem rather than a list of sentence templates to maintain.
"""

from __future__ import annotations

import difflib
import logging
import re
from urllib.parse import urlencode

try:  # Home Assistant 2026.10+ validates with probatio; voluptuous before it.
    import probatio as validators
except ImportError:  # pragma: no cover - older cores
    import voluptuous as validators

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import config_validation as cv, entity_registry as er, intent

from . import mealie_api
from .const import (
    CONF_VOICE_DISPLAY_SATELLITES,
    DOMAIN,
    EVENT_SHOW,
    FAVORITES_COOKBOOK_NAME,
    MY_RECIPES_COOKBOOK_NAME,
)

_LOGGER = logging.getLogger(__name__)

INTENT_SHOW_RECIPE = "MealieShowRecipe"

# Words that mean one of the two cookbooks this integration maintains itself,
# rather than a cookbook the user named. "my favourite pizza dough" is the
# Favorites cookbook; plain "my pizza dough" is My Recipes.
_ALIASES = {
    FAVORITES_COOKBOOK_NAME: (
        "favorite",
        "favorites",
        "favourite",
        "favourites",
        "my favorite",
        "my favorites",
        "my favourite",
        "my favourites",
    ),
    MY_RECIPES_COOKBOOK_NAME: (
        "my",
        "mine",
        "my recipe",
        "my recipes",
        "my own",
        "my own recipes",
        "saved",
        "my saved recipes",
    ),
}

# Dropped from a spoken cookbook name before matching: the model often keeps
# the preposition ("from taste", "in the Tasteau cookbook").
_NOISE = re.compile(
    r"^(from|in|on|the|my)\s+|\s+(cook ?book|collection|recipes?)$", re.IGNORECASE
)


class ShowRecipeIntentHandler(intent.IntentHandler):
    """Show Mealie recipe search results on the asking device's screen."""

    intent_type = INTENT_SHOW_RECIPE

    @property
    def description(self) -> str:  # type: ignore[override]
        # Built per request so the model is told which cookbooks actually
        # exist — that's what lets "from taste" land on "Tasteau" instead of
        # the model inventing a name. The list is whatever was last cached;
        # an empty cache just means the guidance is one request less specific.
        base = (
            "Show Mealie recipes matching a description on the screen of the device "
            "the request came from. Use this whenever the user asks to see, show, "
            "find, pull up or look up a recipe.\n"
            "query: just the dish or ingredients, e.g. 'fried chicken', 'pizza dough'. "
            "Never put words like 'my', 'favourite' or a cookbook name in here.\n"
            "cookbook: which collection to search, taken from how the user asked:\n"
            f"- 'my favourite pizza dough' or 'a favourite...' -> '{FAVORITES_COOKBOOK_NAME}'\n"
            f"- 'my pizza dough', 'mine', 'my own', 'my saved' -> '{MY_RECIPES_COOKBOOK_NAME}'\n"
            "- a named collection, as in 'a pizza dough recipe from taste' -> 'taste'\n"
            "- anything general, as in 'a pizza dough recipe' or 'show me pizza "
            "dough' -> omit cookbook entirely so everything is searched.\n"
            "A near-enough cookbook name is matched for you, so pass what the user "
            "said rather than guessing at spelling."
        )
        if names := [cb["name"] for cb in mealie_api.cached_cookbooks(self.hass)]:
            base += "\nThe user's cookbooks are: " + ", ".join(sorted(names)) + "."
        return base

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    @property
    def slot_schema(self) -> dict:
        return {
            validators.Required("query"): cv.string,
            validators.Optional("cookbook"): cv.string,
        }

    async def async_handle(self, intent_obj: intent.Intent) -> intent.IntentResponse:
        hass = intent_obj.hass
        response = intent_obj.create_response()
        slots = self.async_validate_slots(intent_obj.slots)
        query = slots["query"]["value"].strip()
        spoken_cookbook = (slots.get("cookbook", {}).get("value") or "").strip()

        allowed: list[str] = list(
            _entry_options(hass).get(CONF_VOICE_DISPLAY_SATELLITES) or []
        )
        if not allowed:
            response.async_set_speech(
                "Showing recipes on a screen isn't set up yet. Add this device's voice "
                "satellite under the Mealie Kitchen Display integration's options."
            )
            return response

        satellite = _satellite_for_device(hass, intent_obj.device_id)
        if satellite is None or satellite not in allowed:
            response.async_set_speech(
                "This device isn't set up to show recipes on a screen."
            )
            _LOGGER.info(
                "Refused show-recipe request: device %s resolved to satellite %s, "
                "which is not in %s",
                intent_obj.device_id,
                satellite,
                allowed,
            )
            return response

        cookbook: dict | None = None
        unmatched: str | None = None
        if spoken_cookbook:
            cookbook = await _resolve_cookbook(hass, spoken_cookbook)
            if cookbook is None:
                unmatched = spoken_cookbook

        # Said before anything is displayed, so an empty screen never comes as
        # a surprise — and nothing is shown when there's nothing to show.
        try:
            total = await mealie_api.async_count_recipes(
                hass, query, cookbook["id"] if cookbook else None
            )
        except mealie_api.MealieUnavailable as err:
            _LOGGER.warning("Could not count recipes for %r: %s", query, err)
            total = None

        if total == 0:
            where = f" in {cookbook['name']}" if cookbook else ""
            response.async_set_speech(f"I couldn't find any {query} recipes{where}.")
            return response

        params = {"search": query}
        if cookbook:
            # The id, so the panel doesn't have to match a name itself.
            params["cookbook"] = cookbook["id"]
        path = f"?{urlencode(params)}"

        hass.bus.async_fire(
            EVENT_SHOW,
            {"satellite": satellite, "device_id": intent_obj.device_id, "path": path},
        )
        # Fire and forget: nothing reports back whether a screen was actually
        # listening, so this says what was sent rather than claiming it landed.
        _LOGGER.info("Fired %s for %s: %s", EVENT_SHOW, satellite, path)

        response.async_set_speech(
            _speech(query, cookbook["name"] if cookbook else None, unmatched)
        )
        return response


def _normalize(text: str) -> str:
    text = _NOISE.sub("", text.strip()).strip()
    return re.sub(r"[^a-z0-9]+", "", text.lower())


async def _resolve_cookbook(hass: HomeAssistant, spoken: str) -> dict | None:
    """Turn what the user said into one of their cookbooks, or None.

    Handles the built-in aliases first ("my favourite" -> Favorites, "my" ->
    My Recipes), then matches a named cookbook generously: exact, then
    contained either way ("taste" -> "Tasteau"), then closest spelling, so
    speech-to-text wobbles and shortenings still land.
    """
    wanted = _normalize(spoken)
    if not wanted:
        return None

    try:
        cookbooks = await mealie_api.async_get_cookbooks(hass)
    except mealie_api.MealieUnavailable as err:
        _LOGGER.warning("Could not read cookbooks: %s", err)
        return None

    by_norm = {_normalize(cb["name"]): cb for cb in cookbooks}

    for canonical, aliases in _ALIASES.items():
        if wanted in {_normalize(alias) for alias in aliases}:
            # These two are created on first use, so one may not exist yet.
            return by_norm.get(_normalize(canonical))

    if match := by_norm.get(wanted):
        return match

    contained = [
        cb
        for norm, cb in by_norm.items()
        if norm and (wanted in norm or norm in wanted)
    ]
    if contained:
        # Shortest name containing it is the least surprising reading of
        # "taste" when both "Tasteau" and "Tasteau Desserts" exist.
        return min(contained, key=lambda cb: len(cb["name"]))

    if close := difflib.get_close_matches(wanted, list(by_norm), n=1, cutoff=0.7):
        return by_norm[close[0]]
    return None


def _speech(query: str, cookbook: str | None, unmatched: str | None) -> str:
    if cookbook == FAVORITES_COOKBOOK_NAME:
        return f"Showing your favourite {query} recipes."
    if cookbook == MY_RECIPES_COOKBOOK_NAME:
        return f"Showing your own {query} recipes."
    if cookbook:
        return f"Showing {query} recipes from {cookbook}."
    if unmatched:
        # Searched everything rather than refusing, but say why.
        return (
            f"I couldn't find a cookbook called {unmatched}, "
            f"so here are all the {query} recipes."
        )
    return f"Showing recipes for {query}."


@callback
def _entry_options(hass: HomeAssistant) -> dict:
    entries = hass.config_entries.async_entries(DOMAIN)
    return dict(entries[0].options) if entries else {}


@callback
def _satellite_for_device(hass: HomeAssistant, device_id: str | None) -> str | None:
    """The assist_satellite entity belonging to the device that spoke.

    A voice satellite's device is what Home Assistant passes as device_id for
    an intent, so this is the link between "who asked" and "which screen".
    """
    if not device_id:
        return None
    registry = er.async_get(hass)
    for entry in er.async_entries_for_device(registry, device_id, True):
        if entry.domain == "assist_satellite":
            return entry.entity_id
    return None


async def async_setup_intents(hass: HomeAssistant) -> None:
    """Entry point Home Assistant's intent component calls for this platform.

    Naming this module intent.py makes it the integration's intent platform,
    and the component looks for exactly this function. Registering a handler
    twice simply replaces it, so async_setup_entry calling the helper below
    as well is harmless whichever order they run in.
    """
    async_register_intents(hass)
    # Warms the cookbook list so the first spoken request already knows which
    # cookbooks exist. Failures are logged by the client and retried on use.
    try:
        await mealie_api.async_get_cookbooks(hass, force=True)
    except mealie_api.MealieUnavailable:
        pass


@callback
def async_register_intents(hass: HomeAssistant) -> None:
    intent.async_register(hass, ShowRecipeIntentHandler(hass))


@callback
def async_voice_display_enabled(hass: HomeAssistant) -> bool:
    return bool(_entry_options(hass).get(CONF_VOICE_DISPLAY_SATELLITES))
