from __future__ import annotations

import logging
import random
import uuid

import aiohttp
from aiohttp import web

from homeassistant.components.http import HomeAssistantView
from homeassistant.const import CONF_URL
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import API_URL_BASE, CONF_MEALIE_TOKEN, DOMAIN

_LOGGER = logging.getLogger(__name__)

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
