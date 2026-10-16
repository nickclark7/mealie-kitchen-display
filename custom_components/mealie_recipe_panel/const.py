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

API_URL_BASE = f"/api/{DOMAIN}"
STATIC_URL_BASE = f"/{DOMAIN}_static"
PANEL_URL_PATH = "mealie-recipes"
