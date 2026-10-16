"""Small Mealie read client for code outside the HTTP proxy views.

http.py's MealieProxyView talks to Mealie on behalf of the frontend and
translates failures into HTTP responses for the browser. The voice intent
needs the same data (cookbooks, a recipe count) but has no request to answer,
so it uses this instead and gets ordinary exceptions it can turn into speech.
"""

from __future__ import annotations

import logging
import time
from typing import Any

import aiohttp

from homeassistant.const import CONF_URL
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import CONF_MEALIE_TOKEN, DOMAIN

_LOGGER = logging.getLogger(__name__)

# Cookbooks are named by the user and rarely change, but the list is read on
# every voice request (and goes into the LLM tool description), so it's cached
# rather than re-fetched each time.
_COOKBOOK_TTL = 600
_CACHE_KEY = "cookbook_cache"


class MealieUnavailable(Exception):
    """Mealie isn't configured or couldn't be reached."""


async def async_get_json(
    hass: HomeAssistant, path: str, *, params: dict | None = None
) -> Any:
    entries = hass.config_entries.async_entries(DOMAIN)
    if not entries:
        raise MealieUnavailable("Mealie Kitchen Display is not configured")
    data = entries[0].data

    url = f"{data[CONF_URL]}{path}"
    session = async_get_clientsession(hass)
    try:
        async with session.get(
            url,
            params=params,
            headers={"Authorization": f"Bearer {data[CONF_MEALIE_TOKEN]}"},
            timeout=aiohttp.ClientTimeout(total=15),
        ) as resp:
            if resp.status != 200:
                raise MealieUnavailable(f"Mealie returned {resp.status}")
            return await resp.json()
    except aiohttp.ClientError as err:
        _LOGGER.error("Error contacting Mealie at %s: %s", url, err)
        raise MealieUnavailable("Could not reach Mealie") from err


def cached_cookbooks(hass: HomeAssistant) -> list[dict]:
    """Whatever was last fetched, without fetching.

    For the LLM tool description, which is built in a synchronous callback.
    """
    cached = hass.data.get(DOMAIN, {}).get(_CACHE_KEY)
    return list(cached["items"]) if cached else []


def cookbooks_are_stale(hass: HomeAssistant) -> bool:
    cached = hass.data.get(DOMAIN, {}).get(_CACHE_KEY)
    return not cached or (time.monotonic() - cached["fetched"]) > _COOKBOOK_TTL


async def async_get_cookbooks(hass: HomeAssistant, *, force: bool = False) -> list[dict]:
    """Cookbook id/name pairs, from cache unless stale."""
    if not force and not cookbooks_are_stale(hass):
        return cached_cookbooks(hass)

    data = await async_get_json(
        hass, "/api/households/cookbooks", params={"perPage": "100"}
    )
    items = [
        {"id": cb["id"], "name": cb["name"]}
        for cb in data.get("items", [])
        if cb.get("id") and cb.get("name")
    ]
    hass.data.setdefault(DOMAIN, {})[_CACHE_KEY] = {
        "items": items,
        "fetched": time.monotonic(),
    }
    return items


async def async_count_recipes(
    hass: HomeAssistant, search: str, cookbook_id: str | None = None
) -> int:
    """How many recipes a search would show, so voice can say so up front."""
    params: dict[str, str] = {"page": "1", "perPage": "1", "search": search}
    if cookbook_id:
        params["cookbook"] = cookbook_id
    data = await async_get_json(hass, "/api/recipes", params=params)
    return int(data.get("total") or 0)
