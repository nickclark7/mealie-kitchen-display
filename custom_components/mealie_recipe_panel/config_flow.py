from __future__ import annotations

from typing import Any

import aiohttp
import voluptuous as vol

from homeassistant import config_entries
from homeassistant.const import CONF_URL
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import CONF_MEALIE_TOKEN, DOMAIN

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
