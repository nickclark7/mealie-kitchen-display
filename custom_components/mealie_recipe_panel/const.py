DOMAIN = "mealie_recipe_panel"

CONF_MEALIE_URL = "mealie_url"
CONF_MEALIE_TOKEN = "mealie_token"
CONF_AI_TEXT_ENTITY = "ai_text_entity"
CONF_AI_IMAGE_ENTITY = "ai_image_entity"
# Master on/off switch for the AI features, independent of whether an entity
# is actually picked — defaults to True (unset in existing options) so new
# users see the AI functions and are encouraged to configure them, while
# still letting anyone consciously turn the whole feature set off and hide it.
CONF_AI_ENABLED = "ai_enabled"
# Speech-to-text for the add-on's short free-text boxes (the AI prompt, the
# dashboard card's search), run through one of the user's existing Assist
# pipelines. Off unless switched on: it needs microphone permission on the
# device, so it shouldn't appear uninvited.
CONF_VOICE_ENABLED = "voice_enabled"
# Which Assist pipeline to run speech through; unset means Home Assistant's
# own preferred pipeline.
CONF_VOICE_PIPELINE = "voice_pipeline"

# Master switch for "show me a recipe for fried chicken": any device that asks
# and has a screen gets the recipes back on itself, so no per-device setup is
# needed — the request is inherently self-targeted.
CONF_VOICE_DISPLAY_ENABLED = "voice_display_enabled"
# Superseded by CONF_VOICE_DISPLAY_ENABLED. A non-empty list from an older
# version counts as "enabled" so existing setups keep working untouched.
CONF_VOICE_DISPLAY_DEVICES = "voice_display_devices"
# Where to show recipes when the asking device has no screen of its own (an
# ESPHome voice panel) or can't be identified (Assist in a desktop browser
# sends no device id). Optional.
CONF_VOICE_DISPLAY_FALLBACK = "voice_display_fallback"
# Superseded by CONF_VOICE_DISPLAY_DEVICES, which holds device ids rather than
# assist_satellite entity ids. Still read so existing setups keep working.
CONF_VOICE_DISPLAY_SATELLITES = "voice_display_satellites"
# Fired when a satellite asks for recipes to be shown; the frontend module
# loaded on every HA page picks it up and opens the panel overlay.
EVENT_SHOW = f"{DOMAIN}_show"

# Cookbooks this integration creates and maintains itself, mirrored by the
# "Favorite"/"My Recipe" tags.
FAVORITES_COOKBOOK_NAME = "Favorites"
MY_RECIPES_COOKBOOK_NAME = "My Recipes"

API_URL_BASE = f"/api/{DOMAIN}"
STATIC_URL_BASE = f"/{DOMAIN}_static"
PANEL_URL_PATH = "mealie-recipes"
