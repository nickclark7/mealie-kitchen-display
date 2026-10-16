import "./components/mealie-launcher-overlay";
import type { HomeAssistant } from "./types";

// Opens the recipe panel on this screen when a voice satellite on this device
// is asked for a recipe ("show me a recipe for fried chicken").
//
// Loaded on every Home Assistant page through add_extra_js_url/mealie-loader,
// with no card or dashboard involvement, so it works the same in
// kiosk-satellite, the companion app, Fully Kiosk and a desktop browser —
// they're all a browser showing a Home Assistant page. The display itself
// reuses mealie-launcher-overlay exactly as the dashboard card's overlay mode
// does, so closing it returns the screen to whatever it was showing.

const EVENT_SHOW = "mealie_recipe_panel_show";
// mealie-loader registers two independent copies of itself (see __init__.py),
// so every target it carries is evaluated twice — harmless for the cards,
// whose customElements.define() is guarded, but this module subscribes to an
// event at import time. Two subscriptions meant two overlays per request,
// and because each panel strips the deep link from the URL once it has read
// it, the second one usually mounted too late to see the search and showed
// every recipe on top of the correct results. Each copy is a separate module
// instance with its own variables, so the guard has to live on window.
const INSTANCE_FLAG = "__mealieVoiceDisplayStarted";
// Set per screen by visiting the panel with ?voice_screen=<entity_id>; wins
// over the auto-detected satellite below.
const OVERRIDE_KEY = "mealie-voice-screen";
// Written by the voice_satellite integration's own frontend when a screen is
// assigned to a satellite. Read opportunistically so a screen already running
// a satellite needs no setup at all — another project's format, so every
// access is defensive and an unreadable value just means "unknown".
const VS_CONFIG_KEY = "vs-panel-config";

interface ShowEvent {
  data: { satellite?: string; path?: string };
}

function readLocalStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    // Private windows and blocked site data throw rather than return null.
    return null;
  }
}

function screenSatellite(): string | null {
  const override = readLocalStorage(OVERRIDE_KEY);
  if (override) return override;
  const raw = readLocalStorage(VS_CONFIG_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { satellite_entity?: unknown };
    return typeof parsed.satellite_entity === "string" ? parsed.satellite_entity : null;
  } catch {
    return null;
  }
}

// The root <home-assistant> element carries the live hass object. This is how
// Home Assistant's own browser-side integrations (including the voice
// satellite) reach it from code that isn't a card, and it's the only route
// available to a module loaded outside the dashboard.
function currentHass(): HomeAssistant | undefined {
  const root = document.querySelector("home-assistant") as
    | (HTMLElement & { hass?: HomeAssistant })
    | null;
  return root?.hass;
}

async function waitForHass(): Promise<HomeAssistant> {
  for (;;) {
    const hass = currentHass();
    if (hass?.connection) return hass;
    await new Promise((resolve) => window.setTimeout(resolve, 500));
  }
}

let overlay: HTMLElement | null = null;

async function showPanel(hass: HomeAssistant, path: string) {
  // Already open: retarget rather than stacking a second full-screen overlay.
  // Checks the document too, so an overlay opened by a card (or left behind
  // by an earlier copy of this module) is replaced rather than buried.
  overlay?.remove();
  document
    .querySelectorAll("mealie-launcher-overlay")
    .forEach((existing) => existing.remove());
  overlay = null;

  const { url } = await hass.callApi<{ url: string }>(
    "GET",
    "mealie_recipe_panel/panel-asset-url"
  );
  const el = document.createElement("mealie-launcher-overlay") as HTMLElement & {
    hass?: HomeAssistant;
    panelJsUrl?: string;
    deepLink?: string;
  };
  el.hass = hass;
  el.panelJsUrl = url;
  el.deepLink = path;
  el.addEventListener(
    "overlay-close",
    () => {
      el.remove();
      if (overlay === el) overlay = null;
    },
    { once: true }
  );
  overlay = el;
  document.body.appendChild(el);
}

async function start() {
  const hass = await waitForHass();
  await hass.connection.subscribeEvents<ShowEvent>((event) => {
    const { satellite, path } = event.data ?? {};
    if (!satellite || !path) return;
    if (satellite !== screenSatellite()) return;
    // A background tab shouldn't silently swallow the request meant for the
    // screen someone is actually looking at.
    if (document.visibilityState === "hidden") return;
    const live = currentHass() ?? hass;
    showPanel(live, path).catch((err) =>
      console.error("[mealie-voice-display] could not open the recipe panel", err)
    );
  }, EVENT_SHOW);
}

const globalFlags = window as unknown as Record<string, boolean>;
if (!globalFlags[INSTANCE_FLAG]) {
  globalFlags[INSTANCE_FLAG] = true;
  start().catch((err) => console.error("[mealie-voice-display] startup failed", err));
}
