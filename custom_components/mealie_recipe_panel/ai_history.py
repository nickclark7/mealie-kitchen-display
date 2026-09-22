"""Past AI-generated/imported recipes, kept in HA storage (not Mealie).

Every recipe the AI features produce lands here automatically, so it can be
reopened later (e.g. after actually cooking it) and only then promoted into
Mealie's My Recipes. Nothing touches Mealie until that promotion — which is
why this lives in HA's own storage rather than as hidden/tagged Mealie
recipes that would show up in Mealie's UI, search and backups.

Recipe data goes in a normal HA Store (JSON under .storage/); photos are
written as separate files alongside it rather than base64 in the JSON, so
the store stays small to load/save. Both are covered by HA backups.
"""

from __future__ import annotations

import asyncio
from datetime import datetime, timezone
import os
import shutil
import uuid

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import DOMAIN

_STORAGE_VERSION = 1
_STORAGE_KEY = f"{DOMAIN}.ai_history"
_IMAGE_DIR_NAME = f"{DOMAIN}_ai_images"
MAX_ENTRIES = 20


def _extension_for(mime: str | None) -> str:
    if mime and "/" in mime:
        ext = mime.split("/")[-1].lower()
        if ext.isalnum():
            return "jpg" if ext == "jpeg" else ext
    return "png"


class AiHistory:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store[dict] = Store(hass, _STORAGE_VERSION, _STORAGE_KEY)
        self._image_dir = hass.config.path(".storage", _IMAGE_DIR_NAME)
        self._entries: list[dict] = []
        self._lock = asyncio.Lock()

    async def async_load(self) -> None:
        data = await self._store.async_load()
        self._entries = list((data or {}).get("entries", []))

    async def _save(self) -> None:
        await self._store.async_save({"entries": self._entries})

    def _image_path(self, filename: str) -> str:
        return os.path.join(self._image_dir, filename)

    async def _delete_image_files(self, filenames: list[str]) -> None:
        if not filenames:
            return

        def _remove() -> None:
            for name in filenames:
                try:
                    os.remove(self._image_path(name))
                except OSError:
                    pass

        await self.hass.async_add_executor_job(_remove)

    def list(self) -> list[dict]:
        # Newest first; entries are appended in creation order.
        return list(reversed(self._entries))

    def get(self, entry_id: str) -> dict | None:
        return next((e for e in self._entries if e["id"] == entry_id), None)

    async def add(self, recipe: dict, source: str, prompt: str) -> str:
        entry = {
            "id": uuid.uuid4().hex,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "source": source,
            "prompt": prompt,
            "recipe": recipe,
            "imageFile": None,
            "imageMime": None,
        }
        async with self._lock:
            self._entries.append(entry)
            pruned = self._entries[:-MAX_ENTRIES] if len(self._entries) > MAX_ENTRIES else []
            self._entries = self._entries[-MAX_ENTRIES:]
            await self._save()
        await self._delete_image_files([e["imageFile"] for e in pruned if e.get("imageFile")])
        return entry["id"]

    async def set_image(self, entry_id: str, image_bytes: bytes, mime: str | None) -> None:
        # The image arrives well after the recipe text (separate, slower AI
        # call), and the entry may have been saved/deleted/pruned by then —
        # that's fine, the photo just isn't needed any more.
        if self.get(entry_id) is None:
            return
        filename = f"{entry_id}.{_extension_for(mime)}"

        def _write() -> None:
            os.makedirs(self._image_dir, exist_ok=True)
            with open(self._image_path(filename), "wb") as f:
                f.write(image_bytes)

        await self.hass.async_add_executor_job(_write)
        async with self._lock:
            entry = self.get(entry_id)
            if entry is None:
                # Removed while the file was being written.
                stale = filename
            else:
                previous = entry.get("imageFile")
                stale = previous if previous and previous != filename else None
                entry["imageFile"] = filename
                entry["imageMime"] = mime or "image/png"
                await self._save()
        if stale:
            await self._delete_image_files([stale])

    async def read_image(self, entry_id: str) -> tuple[bytes, str] | None:
        entry = self.get(entry_id)
        if not entry or not entry.get("imageFile"):
            return None
        path = self._image_path(entry["imageFile"])

        def _read() -> bytes | None:
            try:
                with open(path, "rb") as f:
                    return f.read()
            except OSError:
                return None

        data = await self.hass.async_add_executor_job(_read)
        if data is None:
            return None
        return data, entry.get("imageMime") or "image/png"

    async def remove(self, entry_id: str) -> bool:
        async with self._lock:
            entry = self.get(entry_id)
            if entry is None:
                return False
            self._entries.remove(entry)
            await self._save()
        if entry.get("imageFile"):
            await self._delete_image_files([entry["imageFile"]])
        return True

    async def async_remove_all(self) -> None:
        """Called when the integration is removed — leave nothing behind."""
        await self._store.async_remove()
        await self.hass.async_add_executor_job(
            lambda: shutil.rmtree(self._image_dir, ignore_errors=True)
        )


def get_history(hass: HomeAssistant) -> AiHistory:
    return hass.data[DOMAIN]["ai_history"]
