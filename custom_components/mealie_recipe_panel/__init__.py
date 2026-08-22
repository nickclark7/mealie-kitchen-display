from __future__ import annotations

import hashlib
import pathlib

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.components.panel_custom import async_register_panel
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN, PANEL_URL_PATH, STATIC_URL_BASE
from .http import VIEWS

WWW_DIR = pathlib.Path(__file__).parent / "www"


async def _versioned_url(hass: HomeAssistant, filename: str) -> str:
    # Content hash in the query string means a changed file gets a new URL,
    # so browser/service-worker caches never serve a stale build — no manual
    # cache-clearing needed after an update, now or for future HACS users.
    # Reading runs in the executor: file I/O directly on the event loop is a
    # blocking call HA's own runtime flags and disallows.
    def _hash() -> str:
        return hashlib.sha256((WWW_DIR / filename).read_bytes()).hexdigest()[:10]

    digest = await hass.async_add_executor_job(_hash)
    return f"{STATIC_URL_BASE}/{filename}?v={digest}"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    hass.data.setdefault(DOMAIN, {})

    if not hass.data[DOMAIN].get("_views_registered"):
        for view_cls in VIEWS:
            hass.http.register_view(view_cls(hass))
        # Safe to cache aggressively now that URLs are content-hashed.
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL_BASE, str(WWW_DIR), True)]
        )
        await async_register_panel(
            hass,
            PANEL_URL_PATH,
            "mealie-recipe-panel",
            sidebar_title="Recipes",
            sidebar_icon="mdi:chef-hat",
            module_url=await _versioned_url(hass, "mealie-recipe-panel.js"),
            embed_iframe=False,
            require_admin=False,
        )
        # Makes the mealie-launcher-card and mealie-dashboard-card custom
        # elements available on every dashboard automatically, without the
        # user manually adding a Lovelace resource.
        add_extra_js_url(hass, await _versioned_url(hass, "mealie-launcher-card.js"))
        add_extra_js_url(hass, await _versioned_url(hass, "mealie-dashboard-card.js"))
        hass.data[DOMAIN]["_views_registered"] = True

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    return True
