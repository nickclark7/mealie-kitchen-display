"""Put recipes on a device's screen, whichever kind of device it is.

The rule is simply "show it where it was asked for"; only the mechanism
differs, because the two kinds of screen are reachable in different ways:

* A browser-based voice satellite (kiosk-satellite, the voice satellite card,
  Fully Kiosk, a desktop browser) is reached by firing an event that the
  frontend module loaded on every Home Assistant page picks up — it opens the
  panel as an overlay over whatever was showing.
* A Home Assistant companion app device is reached through its own notify
  service. The frontend route can't be aimed at one of these: a companion
  webview has no way to learn its own device id (the app's ExternalConfig
  carries hasAssist, appVersion and so on, but no identifier), while a notify
  service is already addressed to exactly one device.
"""

from __future__ import annotations

from dataclasses import dataclass
import logging

from homeassistant.core import HomeAssistant
from homeassistant.helpers import (
    area_registry as ar,
    device_registry as dr,
    entity_registry as er,
)
from homeassistant.util import slugify

from .const import EVENT_SHOW

_LOGGER = logging.getLogger(__name__)

MOBILE_APP_DOMAIN = "mobile_app"
SATELLITE_DOMAIN = "assist_satellite"
# Satellite integrations whose satellite *is* a browser showing Home
# Assistant, which is what the frontend listener needs to be there. An
# ESPHome or Wyoming satellite can hear a request perfectly well but has no
# web page to show it on, so those are routed to a screen in the same area
# instead of having an event fired at nothing.
BROWSER_SATELLITE_PLATFORMS = {"voice_satellite"}


@dataclass(slots=True)
class Screen:
    """A device this integration can show recipes on."""

    device_id: str
    name: str
    # Set for a browser-based satellite; the frontend listener matches on it.
    satellite: str | None = None
    # Set for a companion app device.
    notify_service: str | None = None
    is_android: bool = False

    @property
    def reachable(self) -> bool:
        return bool(self.satellite or self.notify_service)


def async_find_screen(hass: HomeAssistant, device_id: str | None) -> Screen | None:
    """Work out how (and whether) recipes can be shown on a device."""
    if not device_id:
        return None
    device = dr.async_get(hass).async_get(device_id)
    if device is None:
        return None

    name = device.name_by_user or device.name or device_id
    screen = Screen(device_id=device_id, name=name)

    for entry in er.async_entries_for_device(er.async_get(hass), device_id, True):
        if (
            entry.domain == SATELLITE_DOMAIN
            and entry.platform in BROWSER_SATELLITE_PLATFORMS
        ):
            screen.satellite = entry.entity_id
            break

    # config_entry_id is the current API: Home Assistant 2026.10 split devices
    # so each belongs to one config entry, and the old config_entries set is
    # deprecated (it logs a usage warning and goes away in 2027.10). Falling
    # back to it keeps this working on older cores.
    entry_ids = (
        [device.config_entry_id]
        if getattr(device, "config_entry_id", None)
        else list(getattr(device, "config_entries", []) or [])
    )
    for entry_id in entry_ids:
        entry = hass.config_entries.async_get_entry(entry_id)
        if entry is None or entry.domain != MOBILE_APP_DOMAIN:
            continue
        # The companion app registers one notify service per device, named
        # after the device name it registered with — there's no base service
        # taking a target, so the name has to be derived and then checked.
        service = f"{MOBILE_APP_DOMAIN}_{slugify(entry.data.get('device_name', ''))}"
        if hass.services.has_service("notify", service):
            screen.notify_service = service
            screen.is_android = (entry.data.get("os_name") or "").lower() == "android"
        else:
            _LOGGER.warning(
                "No notify.%s service for device %s — it may have been renamed in "
                "the companion app",
                service,
                name,
            )
        break

    return screen


def async_find_screen_in_area(
    hass: HomeAssistant, device_id: str | None
) -> Screen | None:
    """A reachable screen in the same area as a device that has none.

    An ESPHome voice panel can hear a request but can't show a web page, so
    recipes go to a screen in the same room instead — the Lounge Room panels
    to the lounge tablet, Kitchen ones to the kitchen tablet. Uses the areas
    already set on those devices, so there's nothing extra to configure.
    """
    if not device_id:
        return None
    registry = dr.async_get(hass)
    device = registry.async_get(device_id)
    area_id = dr.async_get_effective_area_id(hass, device) if device else None
    if not area_id:
        return None

    candidates: list[Screen] = []
    for other in dr.async_entries_for_area(registry, area_id):
        if other.id == device_id:
            continue
        screen = async_find_screen(hass, other.id)
        if screen and screen.reachable:
            candidates.append(screen)
    if not candidates:
        return None

    area = ar.async_get(hass).async_get_area(area_id)
    _LOGGER.debug(
        "Screens in %s for %s: %s",
        area.name if area else area_id,
        device_id,
        [c.name for c in candidates],
    )
    # A browser satellite shows recipes in place, which is less intrusive in a
    # shared room than a notification on somebody's phone.
    candidates.sort(key=lambda c: (c.satellite is None, c.name))
    return candidates[0]


async def async_show(
    hass: HomeAssistant,
    screen: Screen,
    path: str,
    *,
    query: str,
    from_asking_device: bool,
) -> bool:
    """Show the recipes for `path` on `screen`. False if it couldn't be done."""
    if screen.satellite:
        hass.bus.async_fire(
            EVENT_SHOW,
            {
                "satellite": screen.satellite,
                "device_id": screen.device_id,
                "path": path,
            },
        )
        _LOGGER.info("Fired %s for %s: %s", EVENT_SHOW, screen.satellite, path)
        return True

    if screen.notify_service:
        full_path = f"/mealie-recipes{path}"
        if screen.is_android and from_asking_device:
            # The user is holding this device and just asked, so take them
            # straight there rather than leaving a notification to tap.
            # Android only, and it needs the app's "display over other apps"
            # permission, granted once on first use.
            payload = {
                "message": "command_webview",
                "data": {"command": full_path},
            }
        else:
            payload = {
                "title": "Recipes",
                "message": f"{query} — tap to open",
                "data": {
                    # clickAction is Android's field, url is iOS's; sending
                    # both means one call covers either platform.
                    "clickAction": full_path,
                    "url": full_path,
                },
            }
        await hass.services.async_call(
            "notify", screen.notify_service, payload, blocking=True
        )
        _LOGGER.info("Sent recipes to notify.%s: %s", screen.notify_service, full_path)
        return True

    return False
