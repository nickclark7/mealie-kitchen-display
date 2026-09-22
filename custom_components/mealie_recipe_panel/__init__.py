from __future__ import annotations

import hashlib
import pathlib
from urllib.parse import quote

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.components.panel_custom import async_register_panel
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .ai_history import AiHistory
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

    if "ai_history" not in hass.data[DOMAIN]:
        history = AiHistory(hass)
        await history.async_load()
        hass.data[DOMAIN]["ai_history"] = history

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
        #
        # Routed through mealie-loader.js rather than pointed at directly:
        # add_extra_js_url's own bare import() call has no timeout and can
        # hang indefinitely on a stalled connection (seen in practice — no
        # error, no recovery, customElements.define() never runs). The
        # loader uses fetch()+AbortController instead, which can time out
        # and retry. The real target URLs travel as query params since
        # add_extra_js_url only lets us choose the URL to import, not the
        # code doing the importing.
        #
        # That outer import() of the loader itself is still exposed to the
        # same hang risk (just for a much smaller file, which measurably
        # helped but didn't eliminate it in practice) — so it's registered
        # twice, as two independent URLs, each carrying every card target.
        # Either copy succeeding brings in every card; both would need to
        # hang for the bug to resurface. The card modules guard their own
        # customElements.define() so it's harmless if both copies succeed.
        loader_url = await _versioned_url(hass, "mealie-loader.js")
        launcher_url = await _versioned_url(hass, "mealie-launcher-card.js")
        dashboard_url = await _versioned_url(hass, "mealie-dashboard-card.js")
        targets = f"target={quote(launcher_url, safe='')}&target={quote(dashboard_url, safe='')}"
        add_extra_js_url(hass, f"{loader_url}&copy=1&{targets}")
        add_extra_js_url(hass, f"{loader_url}&copy=2&{targets}")
        hass.data[DOMAIN]["_views_registered"] = True

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    return True


async def async_remove_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    # Past AI recipes are the only data this integration stores itself —
    # remove them (and their photos) along with the integration.
    history = hass.data.get(DOMAIN, {}).pop("ai_history", None) or AiHistory(hass)
    await history.async_remove_all()
