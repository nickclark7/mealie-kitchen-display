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

API_URL_BASE = f"/api/{DOMAIN}"
STATIC_URL_BASE = f"/{DOMAIN}_static"
PANEL_URL_PATH = "mealie-recipes"
