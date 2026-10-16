"""LLM tools platform: lets an Assist LLM agent show recipes on a screen.

Home Assistant's `llm` integration discovers this module from any integration,
custom ones included, and hands the tools to whichever conversation agent has
the Assist LLM API enabled. That means phrasing ("show me a recipe for fried
chicken", "pull up my favourite pizza dough") is the model's job, with no
sentence templates to write or maintain.

Modelled on homeassistant/components/intent/llm.py. The tool name must carry
this integration's domain as a prefix.
"""

from __future__ import annotations

from homeassistant.components.llm import LLMTools
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.llm import (
    LLM_API_ASSIST,
    IntentTool,
    LLMContext,
    Tool,
    ToolAnnotations,
)

from . import mealie_api
from .const import DOMAIN
from .intent import (
    INTENT_SHOW_RECIPE,
    ShowRecipeIntentHandler,
    async_voice_display_enabled,
)


@callback
def async_get_tools(
    hass: HomeAssistant, llm_context: LLMContext, api_id: str
) -> LLMTools | None:
    """Return this integration's tools for the Assist API."""
    if api_id != LLM_API_ASSIST:
        return None
    # No satellites configured means the feature is off, so don't spend tokens
    # describing a tool that would only refuse.
    if not async_voice_display_enabled(hass):
        return None

    # The tool description names the user's cookbooks, which is what lets the
    # model map "from taste" onto "Tasteau". Refreshing can't be awaited in a
    # callback, so a stale list is refreshed in the background for next time
    # and this request uses what's cached.
    if mealie_api.cookbooks_are_stale(hass):
        hass.async_create_task(mealie_api.async_get_cookbooks(hass, force=True))

    tools: list[Tool] = [
        IntentTool(
            f"{DOMAIN}__{INTENT_SHOW_RECIPE}",
            ShowRecipeIntentHandler(hass),
            title="Show recipe",
            integration=DOMAIN,
            # Puts recipes on a screen: not a read, but nothing is destroyed
            # and it never reaches beyond this Home Assistant and its Mealie.
            annotations=ToolAnnotations(destructive=False, open_world=False),
        )
    ]
    return LLMTools(tools=tools)
