from __future__ import annotations

from typing import Any

import aiohttp
import voluptuous as vol

from homeassistant import config_entries
from homeassistant.const import CONF_URL
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import selector
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import (
    CONF_AI_ENABLED,
    CONF_AI_IMAGE_ENTITY,
    CONF_AI_TEXT_ENTITY,
    CONF_MEALIE_TOKEN,
    CONF_VOICE_DISPLAY_DEVICES,
    CONF_VOICE_DISPLAY_ENABLED,
    CONF_VOICE_DISPLAY_FALLBACK,
    CONF_VOICE_DISPLAY_SATELLITES,
    CONF_VOICE_ENABLED,
    CONF_VOICE_PIPELINE,
    DOMAIN,
)

STEP_USER_DATA_SCHEMA = vol.Schema(
    {
        vol.Required(CONF_URL): str,
        vol.Required(CONF_MEALIE_TOKEN): str,
    }
)


class CannotConnect(HomeAssistantError):
    """Unable to reach Mealie at all."""


class InvalidAuth(HomeAssistantError):
    """Mealie rejected the token."""


async def _validate_input(hass: HomeAssistant, data: dict[str, Any]) -> str:
    url = data[CONF_URL].rstrip("/")
    session = async_get_clientsession(hass)
    try:
        async with session.get(
            f"{url}/api/users/self",
            headers={"Authorization": f"Bearer {data[CONF_MEALIE_TOKEN]}"},
            timeout=aiohttp.ClientTimeout(total=10),
        ) as resp:
            if resp.status == 401:
                raise InvalidAuth
            if resp.status != 200:
                raise CannotConnect
            payload = await resp.json()
    except aiohttp.ClientError as err:
        raise CannotConnect from err

    return payload.get("username", "Mealie")


class MealieRecipePanelConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1

    @staticmethod
    def async_get_options_flow(
        config_entry: config_entries.ConfigEntry,
    ) -> MealieRecipePanelOptionsFlow:
        return MealieRecipePanelOptionsFlow()

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            try:
                username = await _validate_input(self.hass, user_input)
            except CannotConnect:
                errors["base"] = "cannot_connect"
            except InvalidAuth:
                errors["base"] = "invalid_auth"
            else:
                await self.async_set_unique_id(user_input[CONF_URL].rstrip("/"))
                self._abort_if_unique_id_configured()
                return self.async_create_entry(
                    title=f"Mealie ({username})",
                    data={
                        CONF_URL: user_input[CONF_URL].rstrip("/"),
                        CONF_MEALIE_TOKEN: user_input[CONF_MEALIE_TOKEN],
                    },
                )

        return self.async_show_form(
            step_id="user", data_schema=STEP_USER_DATA_SCHEMA, errors=errors
        )


def _pipeline_options(
    hass: HomeAssistant, current: str | None
) -> list[selector.SelectOptionDict]:
    """Assist pipelines to choose from for speech input.

    An empty value means "whichever pipeline Home Assistant prefers", offered
    as a real option so it can be chosen again after a pipeline has been set.

    assist_pipeline ships with default_config but isn't guaranteed to be
    loaded, so a failure here degrades to just that option rather than
    raising.
    """
    options = [
        selector.SelectOptionDict(value="", label="Use my preferred pipeline")
    ]
    try:
        from homeassistant.components import assist_pipeline

        pipelines = assist_pipeline.async_get_pipelines(hass)
    except (ImportError, KeyError, AttributeError):
        pipelines = []

    options.extend(
        selector.SelectOptionDict(value=pipeline.id, label=pipeline.name)
        for pipeline in pipelines
    )
    if current and not any(option["value"] == current for option in options):
        # A pipeline that has since been deleted: keep it selectable so
        # submitting the form doesn't fail validation on a value the user
        # never touched, and make clear it's no longer there.
        options.append(
            selector.SelectOptionDict(
                value=current, label=f"Pipeline no longer available ({current})"
            )
        )
    return options


class MealieRecipePanelOptionsFlow(config_entries.OptionsFlow):
    """Lets the user turn AI features on/off and pick which ai_task entities power them.

    The entities are optional: leaving the text entity unset doesn't hide the
    feature (new users should still see it and be nudged to set it up) — the
    panel shows a "needs configuring" message instead. CONF_AI_ENABLED is the
    separate, explicit switch for hiding AI features entirely. The image
    entity is independent since not every configured LLM can generate images.
    """

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        current = self.config_entry.options
        schema = vol.Schema(
            {
                vol.Required(
                    CONF_AI_ENABLED, default=current.get(CONF_AI_ENABLED, True)
                ): selector.BooleanSelector(),
                vol.Optional(
                    CONF_AI_TEXT_ENTITY,
                    description={"suggested_value": current.get(CONF_AI_TEXT_ENTITY)},
                ): selector.EntitySelector(selector.EntitySelectorConfig(domain="ai_task")),
                vol.Optional(
                    CONF_AI_IMAGE_ENTITY,
                    description={"suggested_value": current.get(CONF_AI_IMAGE_ENTITY)},
                ): selector.EntitySelector(selector.EntitySelectorConfig(domain="ai_task")),
                vol.Required(
                    CONF_VOICE_ENABLED,
                    default=current.get(CONF_VOICE_ENABLED, False),
                ): selector.BooleanSelector(),
                vol.Optional(
                    CONF_VOICE_PIPELINE,
                    description={"suggested_value": current.get(CONF_VOICE_PIPELINE)},
                ): selector.SelectSelector(
                    selector.SelectSelectorConfig(
                        options=_pipeline_options(
                            self.hass, current.get(CONF_VOICE_PIPELINE)
                        ),
                        # No custom_value: it makes the frontend render a
                        # free-text picker that shows the raw pipeline id
                        # instead of its name. A deleted pipeline is kept
                        # valid by including it in the options above instead.
                        mode=selector.SelectSelectorMode.DROPDOWN,
                    )
                ),
                vol.Required(
                    CONF_VOICE_DISPLAY_ENABLED,
                    # Treated as already on for anyone who configured the
                    # per-device lists this option replaced.
                    default=current.get(
                        CONF_VOICE_DISPLAY_ENABLED,
                        bool(
                            current.get(CONF_VOICE_DISPLAY_DEVICES)
                            or current.get(CONF_VOICE_DISPLAY_SATELLITES)
                        ),
                    ),
                ): selector.BooleanSelector(),
                vol.Optional(
                    CONF_VOICE_DISPLAY_FALLBACK,
                    description={
                        "suggested_value": current.get(CONF_VOICE_DISPLAY_FALLBACK)
                    },
                ): selector.DeviceSelector(selector.DeviceSelectorConfig()),
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
