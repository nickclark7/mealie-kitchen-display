from __future__ import annotations

import base64
import logging
import os
import random
import uuid

import aiohttp
from aiohttp import web

from homeassistant.components.http import HomeAssistantView
from homeassistant.const import CONF_URL
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.network import get_url

from .const import (
    API_URL_BASE,
    CONF_AI_IMAGE_ENTITY,
    CONF_AI_TEXT_ENTITY,
    CONF_MEALIE_TOKEN,
    DOMAIN,
)

_LOGGER = logging.getLogger(__name__)

_IMPORT_MEDIA_SUBDIR = "mealie_recipe_panel"
_ALLOWED_IMAGE_SIZES = {"tiny-original", "min-original", "original"}
_VALID_ENTRY_TYPES = {"breakfast", "lunch", "dinner", "side", "snack", "drink", "dessert"}
_RANDOM_MODES = {"all", "my-recipes", "favorites", "made-before"}
FAVORITE_TAG_NAME = "Favorite"
FAVORITES_COOKBOOK_NAME = "Favorites"
MY_RECIPE_TAG_NAME = "My Recipe"
MY_RECIPES_COOKBOOK_NAME = "My Recipes"


class MealieProxyView(HomeAssistantView):
    """Base class: server-side proxy to a Mealie instance.

    Runs entirely server-side (aiohttp request from HA's core to Mealie), so
    browser CORS/mixed-content rules never apply — the browser only ever
    talks to HA's own origin, regardless of what scheme HA or Mealie use.
    """

    requires_auth = True

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    def _entry_data(self) -> dict | None:
        entries = self.hass.config_entries.async_entries(DOMAIN)
        if not entries:
            return None
        return entries[0].data

    def _entry_options(self) -> dict:
        entries = self.hass.config_entries.async_entries(DOMAIN)
        if not entries:
            return {}
        return entries[0].options

    async def _mealie_get(self, path: str, *, params: dict | None = None, binary: bool = False):
        data = self._entry_data()
        if data is None:
            raise web.HTTPServiceUnavailable(reason="Mealie Kitchen Display is not configured")

        url = f"{data[CONF_URL]}{path}"
        session = async_get_clientsession(self.hass)
        try:
            async with session.get(
                url,
                params=params,
                headers={"Authorization": f"Bearer {data[CONF_MEALIE_TOKEN]}"},
                timeout=aiohttp.ClientTimeout(total=15),
            ) as resp:
                if resp.status != 200:
                    raise web.HTTPBadGateway(reason=f"Mealie returned {resp.status}")
                if binary:
                    return await resp.read(), resp.content_type
                return await resp.json()
        except aiohttp.ClientError as err:
            _LOGGER.error("Error contacting Mealie at %s: %s", url, err)
            raise web.HTTPBadGateway(reason="Could not reach Mealie") from err

    async def _mealie_write(self, method: str, path: str, *, json_body: dict | list | None = None) -> dict:
        data = self._entry_data()
        if data is None:
            raise web.HTTPServiceUnavailable(reason="Mealie Kitchen Display is not configured")

        url = f"{data[CONF_URL]}{path}"
        session = async_get_clientsession(self.hass)
        kwargs = {} if json_body is None else {"json": json_body}
        try:
            async with session.request(
                method,
                url,
                headers={"Authorization": f"Bearer {data[CONF_MEALIE_TOKEN]}"},
                timeout=aiohttp.ClientTimeout(total=15),
                **kwargs,
            ) as resp:
                if resp.status not in (200, 201):
                    raise web.HTTPBadGateway(reason=f"Mealie returned {resp.status}")
                if resp.content_length in (None, 0):
                    return {}
                return await resp.json()
        except aiohttp.ClientError as err:
            _LOGGER.error("Error writing to Mealie at %s: %s", url, err)
            raise web.HTTPBadGateway(reason="Could not reach Mealie") from err

    async def _get_or_create_tag(self, tag_name: str) -> dict:
        tags = await self._mealie_get("/api/organizers/tags", params={"perPage": "100"})
        for tag in tags["items"]:
            if tag["name"].lower() == tag_name.lower():
                return tag
        return await self._mealie_write("POST", "/api/organizers/tags", json_body={"name": tag_name})

    async def _ensure_cookbook_for_tag(self, cookbook_name: str, tag_name: str) -> None:
        cookbooks = await self._mealie_get("/api/households/cookbooks", params={"perPage": "100"})
        if any(cb["name"].lower() == cookbook_name.lower() for cb in cookbooks["items"]):
            return
        await self._mealie_write(
            "POST",
            "/api/households/cookbooks",
            json_body={
                "name": cookbook_name,
                "queryFilterString": f'tags.name CONTAINS ALL ["{tag_name}"]',
            },
        )

    async def _set_tag_state(
        self, slug: str, tag_name: str, want: bool, cookbook_name: str | None = None
    ) -> None:
        recipe = await self._mealie_get(f"/api/recipes/{slug}")
        current_tags = recipe.get("tags") or []
        has = any(t["name"].lower() == tag_name.lower() for t in current_tags)
        if want == has:
            return

        if want:
            tag = await self._get_or_create_tag(tag_name)
            new_tags = [*current_tags, tag]
            if cookbook_name:
                await self._ensure_cookbook_for_tag(cookbook_name, tag_name)
        else:
            new_tags = [t for t in current_tags if t["name"].lower() != tag_name.lower()]

        # PATCH replaces the whole tags array (it does not merge), so we must
        # always send the full desired list, not just the tag being toggled.
        await self._mealie_write("PATCH", f"/api/recipes/{slug}", json_body={"tags": new_tags})

    async def _find_cookbook_id(self, cookbook_name: str) -> str | None:
        cookbooks = await self._mealie_get("/api/households/cookbooks", params={"perPage": "100"})
        for cb in cookbooks["items"]:
            if cb["name"].lower() == cookbook_name.lower():
                return cb["id"]
        return None

    async def _get_self_user_id(self) -> str:
        cache = self.hass.data.setdefault(DOMAIN, {})
        if "user_id" not in cache:
            me = await self._mealie_get("/api/users/self")
            cache["user_id"] = me["id"]
        return cache["user_id"]

    async def _generate_image(self, entity_id: str, subject: str) -> tuple[str | None, str | None]:
        result = await self.hass.services.async_call(
            "ai_task",
            "generate_image",
            {
                "task_name": "Generate recipe image",
                "instructions": f"An appetizing, realistic photo of: {subject}",
                "entity_id": entity_id,
            },
            blocking=True,
            return_response=True,
        )
        if not isinstance(result, dict):
            raise HomeAssistantError(f"Unexpected ai_task.generate_image response type: {type(result)!r}")

        # The service response never carries raw bytes — ai_task.generate_image
        # stores the image via the media_source component and returns a
        # short-lived signed URL instead (HA core pops "image_data" out of the
        # dict before returning it). Fetch the bytes from that signed URL
        # ourselves, immediately, before it expires.
        signed_path = result.get("url")
        if not signed_path:
            raise HomeAssistantError(
                "ai_task.generate_image response had no image URL (got keys: "
                f"{list(result.keys())})"
            )
        mime_type = result.get("mime_type", "image/png")
        base_url = get_url(self.hass, allow_internal=True, allow_ip=True, prefer_external=False)
        session = async_get_clientsession(self.hass)
        try:
            async with session.get(f"{base_url}{signed_path}", timeout=aiohttp.ClientTimeout(total=30)) as resp:
                if resp.status != 200:
                    raise HomeAssistantError(f"Could not fetch generated image (HTTP {resp.status})")
                image_bytes = await resp.read()
        except aiohttp.ClientError as err:
            raise HomeAssistantError(f"Could not fetch generated image: {err}") from err
        return base64.b64encode(image_bytes).decode("ascii"), mime_type

    async def _save_attachment(self, image_bytes: bytes, extension: str) -> tuple[str, str]:
        """Write an uploaded image under HA's local media root for ai_task attachments.

        ai_task.generate_data only accepts attachments as media-source URIs
        (the same shape the Media selector produces), not raw bytes — so a
        multimodal import has to round-trip through a scratch file here.
        """
        media_dirs = self.hass.config.media_dirs
        root = media_dirs.get("local") or self.hass.config.path("media")
        subdir = os.path.join(root, _IMPORT_MEDIA_SUBDIR)
        filename = f"{uuid.uuid4().hex}.{extension}"
        path = os.path.join(subdir, filename)

        def _write() -> None:
            os.makedirs(subdir, exist_ok=True)
            with open(path, "wb") as f:
                f.write(image_bytes)

        await self.hass.async_add_executor_job(_write)
        media_content_id = f"media-source://media_source/local/{_IMPORT_MEDIA_SUBDIR}/{filename}"
        return path, media_content_id

    async def _delete_attachment(self, path: str) -> None:
        def _remove() -> None:
            try:
                os.remove(path)
            except OSError:
                pass

        await self.hass.async_add_executor_job(_remove)


class MealieRecipesView(MealieProxyView):
    url = f"{API_URL_BASE}/recipes"
    name = f"api:{DOMAIN}:recipes"

    async def get(self, request: web.Request) -> web.Response:
        params = {
            "page": request.query.get("page", "1"),
            "perPage": request.query.get("perPage", "24"),
        }
        if search := request.query.get("search"):
            params["search"] = search
        if cookbook := request.query.get("cookbook"):
            params["cookbook"] = cookbook
        categories = request.query.getall("categories", [])
        if categories:
            params["categories"] = categories
        tags = request.query.getall("tags", [])
        if tags:
            params["tags"] = tags
        data = await self._mealie_get("/api/recipes", params=params)
        return web.json_response(data)


class MealieRecipeDetailView(MealieProxyView):
    url = f"{API_URL_BASE}/recipes/{{slug}}"
    name = f"api:{DOMAIN}:recipe_detail"

    async def get(self, request: web.Request, slug: str) -> web.Response:
        data = await self._mealie_get(f"/api/recipes/{slug}")
        return web.json_response(data)

    async def delete(self, request: web.Request, slug: str) -> web.Response:
        await self._mealie_write("DELETE", f"/api/recipes/{slug}")
        return web.json_response({"deleted": True})


class MealieRandomRecipeView(MealieProxyView):
    url = f"{API_URL_BASE}/recipes/random"
    name = f"api:{DOMAIN}:random_recipe"

    async def get(self, request: web.Request) -> web.Response:
        mode = request.query.get("mode", "all")
        if mode not in _RANDOM_MODES:
            raise web.HTTPBadRequest(reason="Invalid mode")

        if mode == "made-before":
            data = await self._mealie_get("/api/recipes", params={"perPage": "500"})
            candidates = [r for r in data["items"] if r.get("lastMade")]
            recipe = random.choice(candidates) if candidates else None
            return web.json_response({"recipe": recipe})

        params = {"orderBy": "random", "paginationSeed": uuid.uuid4().hex, "perPage": "1", "page": "1"}
        if mode in ("my-recipes", "favorites"):
            cookbook_name = MY_RECIPES_COOKBOOK_NAME if mode == "my-recipes" else FAVORITES_COOKBOOK_NAME
            cookbook_id = await self._find_cookbook_id(cookbook_name)
            if not cookbook_id:
                return web.json_response({"recipe": None})
            params["cookbook"] = cookbook_id

        data = await self._mealie_get("/api/recipes", params=params)
        recipe = data["items"][0] if data["items"] else None
        return web.json_response({"recipe": recipe})


class MealieFavoriteView(MealieProxyView):
    url = f"{API_URL_BASE}/recipes/{{slug}}/favorite"
    name = f"api:{DOMAIN}:favorite"

    async def put(self, request: web.Request, slug: str) -> web.Response:
        body = await request.json()
        want_favorite = bool(body.get("favorite"))

        await self._set_tag_state(slug, FAVORITE_TAG_NAME, want_favorite, FAVORITES_COOKBOOK_NAME)

        # Also keep Mealie's own built-in favorite (used by its native UI,
        # e.g. My Recipes > Favorites) in sync, not just our tag/cookbook.
        user_id = await self._get_self_user_id()
        method = "POST" if want_favorite else "DELETE"
        await self._mealie_write(method, f"/api/users/{user_id}/favorites/{slug}")

        return web.json_response({"favorite": want_favorite})


class MealieLastMadeView(MealieProxyView):
    url = f"{API_URL_BASE}/recipes/{{slug}}/last-made"
    name = f"api:{DOMAIN}:last_made"

    async def put(self, request: web.Request, slug: str) -> web.Response:
        body = await request.json()
        date = body.get("date")
        if not date:
            raise web.HTTPBadRequest(reason="date is required")
        data = await self._mealie_write(
            "PATCH", f"/api/recipes/{slug}/last-made", json_body={"timestamp": f"{date}T00:00:00"}
        )
        return web.json_response(data)


class MealieShoppingListsView(MealieProxyView):
    url = f"{API_URL_BASE}/shopping-lists"
    name = f"api:{DOMAIN}:shopping_lists"

    async def get(self, request: web.Request) -> web.Response:
        data = await self._mealie_get("/api/households/shopping/lists", params={"perPage": "100"})
        return web.json_response(data)

    async def post(self, request: web.Request) -> web.Response:
        body = await request.json()
        name = (body.get("name") or "").strip()
        if not name:
            raise web.HTTPBadRequest(reason="name is required")
        data = await self._mealie_write(
            "POST", "/api/households/shopping/lists", json_body={"name": name}
        )
        return web.json_response(data)


class MealieShoppingListDetailView(MealieProxyView):
    url = f"{API_URL_BASE}/shopping-lists/{{list_id}}"
    name = f"api:{DOMAIN}:shopping_list_detail"

    async def get(self, request: web.Request, list_id: str) -> web.Response:
        data = await self._mealie_get(f"/api/households/shopping/lists/{list_id}")
        return web.json_response(data)

    async def delete(self, request: web.Request, list_id: str) -> web.Response:
        await self._mealie_write("DELETE", f"/api/households/shopping/lists/{list_id}")
        return web.json_response({"deleted": True})


class MealieShoppingItemToggleView(MealieProxyView):
    url = f"{API_URL_BASE}/shopping-items/{{item_id}}/checked"
    name = f"api:{DOMAIN}:shopping_item_toggle"

    async def put(self, request: web.Request, item_id: str) -> web.Response:
        body = await request.json()
        # Fetch the full item first: PUT replaces the whole item, and
        # sending only {checked} would reset quantity/food/unit/etc. to
        # their schema defaults (same class of bug as the recipe tags PATCH).
        item = await self._mealie_get(f"/api/households/shopping/items/{item_id}")
        item["checked"] = bool(body.get("checked"))
        data = await self._mealie_write(
            "PUT", f"/api/households/shopping/items/{item_id}", json_body=item
        )
        return web.json_response(data)


class MealieShoppingItemsView(MealieProxyView):
    url = f"{API_URL_BASE}/shopping-items"
    name = f"api:{DOMAIN}:shopping_items"

    async def post(self, request: web.Request) -> web.Response:
        body = await request.json()
        list_id = body.get("shoppingListId")
        items = body.get("items") or []
        if not list_id or not items:
            raise web.HTTPBadRequest(reason="shoppingListId and items are required")
        payload = [{"shoppingListId": list_id, "display": str(item), "note": str(item)} for item in items]
        data = await self._mealie_write(
            "POST", "/api/households/shopping/items/create-bulk", json_body=payload
        )
        return web.json_response(data)


class MealieMyRecipeView(MealieProxyView):
    url = f"{API_URL_BASE}/recipes/{{slug}}/my-recipe"
    name = f"api:{DOMAIN}:my_recipe"

    async def put(self, request: web.Request, slug: str) -> web.Response:
        body = await request.json()
        want = bool(body.get("my_recipe"))
        await self._set_tag_state(slug, MY_RECIPE_TAG_NAME, want, MY_RECIPES_COOKBOOK_NAME)
        return web.json_response({"my_recipe": want})


_AI_RECIPE_STRUCTURE = {
    "name": {"selector": {"text": {}}},
    "description": {"selector": {"text": {}}},
    "recipeServings": {"selector": {"number": {}}},
    "prepTime": {"selector": {"text": {}}},
    "cookTime": {"selector": {"text": {}}},
    "totalTime": {"selector": {"text": {}}},
    "ingredients": {"selector": {"text": {"multiple": True}}},
    "instructions": {"selector": {"text": {"multiple": True}}},
}


class MealieGenerateRecipeView(MealieProxyView):
    """Ask a user-configured ai_task entity for a recipe, and optionally an image.

    Nothing is written to Mealie here — this is a preview. Saving is a
    separate step (MealieSaveRecipeView) so the user can review/regenerate
    first.
    """

    url = f"{API_URL_BASE}/ai/generate-recipe"
    name = f"api:{DOMAIN}:ai_generate_recipe"

    async def post(self, request: web.Request) -> web.Response:
        options = self._entry_options()
        text_entity = options.get(CONF_AI_TEXT_ENTITY)
        if not text_entity:
            raise web.HTTPBadRequest(
                reason="No AI Task entity configured — set one in this integration's options"
            )

        body = await request.json()
        prompt = (body.get("prompt") or "").strip()
        if not prompt:
            raise web.HTTPBadRequest(reason="prompt is required")

        try:
            result = await self.hass.services.async_call(
                "ai_task",
                "generate_data",
                {
                    "task_name": "Generate recipe",
                    "instructions": (
                        "Write a complete, realistic recipe for this request: "
                        f"{prompt}\n\n"
                        "ingredients must be a list of plain, ready-to-display strings "
                        "such as '2 cups flour', not separate quantity/unit/food fields. "
                        "instructions must be a list of plain step strings, one per step."
                    ),
                    "structure": _AI_RECIPE_STRUCTURE,
                    "entity_id": text_entity,
                },
                blocking=True,
                return_response=True,
            )
        except HomeAssistantError as err:
            raise web.HTTPBadGateway(reason=f"AI recipe generation failed: {err}") from err

        recipe = result.get("data", result) if isinstance(result, dict) else result

        image_base64 = None
        image_mime = None
        image_error = None
        image_entity = options.get(CONF_AI_IMAGE_ENTITY)
        if bool(body.get("generateImage")) and image_entity:
            try:
                image_base64, image_mime = await self._generate_image(
                    image_entity, recipe.get("name") or prompt
                )
            except HomeAssistantError as err:
                _LOGGER.warning("AI image generation failed: %s", err)
                image_error = str(err)

        return web.json_response(
            {
                "recipe": recipe,
                "imageBase64": image_base64,
                "imageMime": image_mime,
                "imageError": image_error,
            }
        )


class MealieImportRecipeView(MealieProxyView):
    """Transcribe a recipe from an uploaded photo and/or pasted text.

    Reuses the exact same response shape as MealieGenerateRecipeView so the
    frontend's preview/save flow works unchanged regardless of which path
    produced the recipe.
    """

    url = f"{API_URL_BASE}/ai/import-recipe"
    name = f"api:{DOMAIN}:ai_import_recipe"

    async def post(self, request: web.Request) -> web.Response:
        options = self._entry_options()
        text_entity = options.get(CONF_AI_TEXT_ENTITY)
        if not text_entity:
            raise web.HTTPBadRequest(
                reason="No AI Task entity configured — set one in this integration's options"
            )

        body = await request.json()
        text = (body.get("text") or "").strip()
        image_base64 = body.get("imageBase64")
        if not text and not image_base64:
            raise web.HTTPBadRequest(reason="An image, text, or both are required")

        attachment_path: str | None = None
        attachments: list[dict] | None = None
        if image_base64:
            mime = body.get("imageMime") or "image/jpeg"
            extension = mime.split("/")[-1] if "/" in mime else "jpg"
            try:
                image_bytes = base64.b64decode(image_base64)
            except (ValueError, TypeError) as err:
                raise web.HTTPBadRequest(reason="Could not decode uploaded image") from err
            attachment_path, media_content_id = await self._save_attachment(image_bytes, extension)
            attachments = [{"media_content_id": media_content_id, "media_content_type": mime}]

        instructions = ""
        if attachments:
            instructions += "Transcribe the recipe shown in the attached image into structured data. "
        if text:
            instructions += f"Use this additional recipe text, cleaning it up as needed:\n\n{text}\n\n"
        instructions += (
            "ingredients must be a list of plain, ready-to-display strings "
            "such as '2 cups flour', not separate quantity/unit/food fields. "
            "instructions must be a list of plain step strings, one per step. "
            "If servings or times aren't stated in the source, make a reasonable estimate."
        )

        try:
            service_data = {
                "task_name": "Import recipe",
                "instructions": instructions,
                "structure": _AI_RECIPE_STRUCTURE,
                "entity_id": text_entity,
            }
            if attachments:
                service_data["attachments"] = attachments
            result = await self.hass.services.async_call(
                "ai_task",
                "generate_data",
                service_data,
                blocking=True,
                return_response=True,
            )
        except HomeAssistantError as err:
            raise web.HTTPBadGateway(reason=f"AI recipe import failed: {err}") from err
        finally:
            if attachment_path:
                await self._delete_attachment(attachment_path)

        recipe = result.get("data", result) if isinstance(result, dict) else result

        image_out_base64 = None
        image_out_mime = None
        image_error = None
        image_entity = options.get(CONF_AI_IMAGE_ENTITY)
        if bool(body.get("generateImage")) and image_entity:
            try:
                image_out_base64, image_out_mime = await self._generate_image(
                    image_entity, recipe.get("name") or text or "this recipe"
                )
            except HomeAssistantError as err:
                _LOGGER.warning("AI image generation failed: %s", err)
                image_error = str(err)

        return web.json_response(
            {
                "recipe": recipe,
                "imageBase64": image_out_base64,
                "imageMime": image_out_mime,
                "imageError": image_error,
            }
        )


class MealieSaveRecipeView(MealieProxyView):
    """Persist a previously-generated (preview) recipe into Mealie."""

    url = f"{API_URL_BASE}/ai/save-recipe"
    name = f"api:{DOMAIN}:ai_save_recipe"

    async def post(self, request: web.Request) -> web.Response:
        body = await request.json()
        recipe = body.get("recipe") or {}
        name = (recipe.get("name") or "").strip()
        if not name:
            raise web.HTTPBadRequest(reason="recipe.name is required")

        slug = await self._mealie_write("POST", "/api/recipes", json_body={"name": name})
        if not isinstance(slug, str):
            raise web.HTTPBadGateway(reason="Unexpected response creating recipe in Mealie")

        patch_body = {
            "description": recipe.get("description", ""),
            "recipeServings": recipe.get("recipeServings") or 1,
            "prepTime": recipe.get("prepTime") or None,
            "cookTime": recipe.get("cookTime") or None,
            "totalTime": recipe.get("totalTime") or None,
            # Mealie computes "display" itself from quantity/unit/food/note —
            # it's not a writable field despite being accepted by the schema.
            # Without structured quantity/unit/food, "note" is what actually
            # persists and becomes the shown ingredient line.
            "recipeIngredient": [{"note": str(i)} for i in recipe.get("ingredients", [])],
            "recipeInstructions": [{"text": str(s)} for s in recipe.get("instructions", [])],
        }
        await self._mealie_write("PATCH", f"/api/recipes/{slug}", json_body=patch_body)

        image_base64 = body.get("imageBase64")
        if image_base64:
            mime = body.get("imageMime") or "image/png"
            extension = mime.split("/")[-1] if "/" in mime else "png"
            try:
                image_bytes = base64.b64decode(image_base64)
            except (ValueError, TypeError) as err:
                _LOGGER.warning("Could not decode generated recipe image: %s", err)
            else:
                await self._upload_recipe_image(slug, image_bytes, extension)

        return web.json_response({"slug": slug})

    async def _upload_recipe_image(self, slug: str, image_bytes: bytes, extension: str) -> None:
        data = self._entry_data()
        if data is None:
            return
        form = aiohttp.FormData()
        form.add_field("image", image_bytes, filename=f"image.{extension}", content_type=f"image/{extension}")
        form.add_field("extension", extension)
        session = async_get_clientsession(self.hass)
        try:
            async with session.put(
                f"{data[CONF_URL]}/api/recipes/{slug}/image",
                data=form,
                headers={"Authorization": f"Bearer {data[CONF_MEALIE_TOKEN]}"},
                timeout=aiohttp.ClientTimeout(total=20),
            ) as resp:
                if resp.status not in (200, 201):
                    _LOGGER.warning("Mealie rejected recipe image upload: HTTP %s", resp.status)
        except aiohttp.ClientError as err:
            _LOGGER.warning("Error uploading recipe image to Mealie: %s", err)


class MealieMealplanView(MealieProxyView):
    url = f"{API_URL_BASE}/mealplans"
    name = f"api:{DOMAIN}:mealplans"

    async def get(self, request: web.Request) -> web.Response:
        start_date = request.query.get("start_date")
        end_date = request.query.get("end_date")
        if not start_date or not end_date:
            raise web.HTTPBadRequest(reason="start_date and end_date are required")
        data = await self._mealie_get(
            "/api/households/mealplans",
            params={"start_date": start_date, "end_date": end_date, "perPage": "100"},
        )
        return web.json_response(data)

    async def post(self, request: web.Request) -> web.Response:
        body = await request.json()
        entry_type = body.get("entryType", "dinner")
        if entry_type not in _VALID_ENTRY_TYPES:
            raise web.HTTPBadRequest(reason="Invalid entryType")
        if not body.get("date") or not body.get("recipeId"):
            raise web.HTTPBadRequest(reason="date and recipeId are required")

        data = await self._mealie_write(
            "POST",
            "/api/households/mealplans",
            json_body={
                "date": body["date"],
                "entryType": entry_type,
                "recipeId": body["recipeId"],
                "title": "",
                "text": "",
            },
        )
        return web.json_response(data)


class MealieCategoriesView(MealieProxyView):
    url = f"{API_URL_BASE}/categories"
    name = f"api:{DOMAIN}:categories"

    async def get(self, request: web.Request) -> web.Response:
        data = await self._mealie_get("/api/organizers/categories", params={"perPage": "100"})
        return web.json_response(data)


class MealieTagsView(MealieProxyView):
    url = f"{API_URL_BASE}/tags"
    name = f"api:{DOMAIN}:tags"

    async def get(self, request: web.Request) -> web.Response:
        data = await self._mealie_get("/api/organizers/tags", params={"perPage": "100"})
        return web.json_response(data)


class MealieCookbooksView(MealieProxyView):
    url = f"{API_URL_BASE}/cookbooks"
    name = f"api:{DOMAIN}:cookbooks"

    async def get(self, request: web.Request) -> web.Response:
        data = await self._mealie_get("/api/households/cookbooks", params={"perPage": "100"})
        return web.json_response(data)


class MealieImageView(MealieProxyView):
    # Loaded directly via plain <img src> (browsers don't attach HA's bearer
    # auth header to tag-based requests), and Mealie itself already serves
    # these images unauthenticated, so this endpoint intentionally skips HA
    # auth rather than requiring signed-URL plumbing for a low-sensitivity
    # asset (recipe photos, keyed by unguessable UUIDs).
    requires_auth = False
    url = f"{API_URL_BASE}/image/{{recipe_id}}/{{size}}"
    name = f"api:{DOMAIN}:image"

    async def get(self, request: web.Request, recipe_id: str, size: str) -> web.Response:
        if size not in _ALLOWED_IMAGE_SIZES:
            raise web.HTTPBadRequest(reason="Invalid image size")
        body, content_type = await self._mealie_get(
            f"/api/media/recipes/{recipe_id}/images/{size}.webp", binary=True
        )
        return web.Response(body=body, content_type=content_type)


VIEWS = (
    MealieRecipesView,
    # MealieRandomRecipeView's literal "/recipes/random" path must be
    # registered before MealieRecipeDetailView's "/recipes/{slug}" pattern —
    # aiohttp matches routes in registration order, and {slug} would
    # otherwise swallow "random" as a literal slug value.
    MealieRandomRecipeView,
    MealieRecipeDetailView,
    MealieFavoriteView,
    MealieMyRecipeView,
    MealieGenerateRecipeView,
    MealieImportRecipeView,
    MealieSaveRecipeView,
    MealieMealplanView,
    MealieLastMadeView,
    MealieShoppingListsView,
    MealieShoppingListDetailView,
    MealieShoppingItemToggleView,
    MealieShoppingItemsView,
    MealieCategoriesView,
    MealieTagsView,
    MealieCookbooksView,
    MealieImageView,
)
