import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant } from "./types";
import "./components/mealie-launcher-overlay";

interface LauncherCardConfig {
  type: string;
  panel_path?: string;
  title?: string;
  overlay?: boolean;
}

export class MealieLauncherCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config: LauncherCardConfig = { type: "custom:mealie-launcher-card" };

  // Cached after the first overlay open so re-opening doesn't re-fetch it —
  // a stale cached URL just means a slightly-behind version gets reused
  // until the next full page load, same as any other loaded module.
  private overlayJsUrl: string | null = null;

  setConfig(config: LauncherCardConfig) {
    this.config = { panel_path: "/mealie-recipes", title: "Recipes", overlay: false, ...config };
  }

  getCardSize() {
    return 2;
  }

  static styles = css`
    ha-card {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      min-height: 48px;
    }
    ha-card:active {
      opacity: 0.8;
    }
    .icon {
      font-size: 32px;
    }
    .title {
      font-size: 18px;
      font-weight: 600;
    }
  `;

  private onClick() {
    if (this.config.overlay) {
      this.openOverlay();
      return;
    }
    const path = this.config.panel_path ?? "/mealie-recipes";
    history.pushState(null, "", path);
    window.dispatchEvent(new CustomEvent("location-changed", { bubbles: true, composed: true }));
  }

  private async openOverlay() {
    if (!this.hass) return;
    if (!this.overlayJsUrl) {
      const res = await this.hass.callApi<{ url: string }>("GET", "mealie_recipe_panel/panel-asset-url");
      this.overlayJsUrl = res.url;
    }
    const overlay = document.createElement("mealie-launcher-overlay") as HTMLElement & {
      hass?: HomeAssistant;
      panelJsUrl?: string;
    };
    overlay.hass = this.hass;
    overlay.panelJsUrl = this.overlayJsUrl;
    overlay.addEventListener("overlay-close", () => overlay.remove(), { once: true });
    document.body.appendChild(overlay);
  }

  render() {
    return html`
      <ha-card @click=${this.onClick}>
        <span class="icon">🍲</span>
        <span class="title">${this.config.title}</span>
      </ha-card>
    `;
  }
}

declare global {
  interface Window {
    customCards?: unknown[];
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "mealie-launcher-card",
  name: "Mealie Recipe Launcher",
  description: "Launches the full-screen Mealie recipe browser panel.",
});

// mealie-loader.js is deliberately triggered as more than one independent
// import() (see __init__.py) so that one hanging doesn't leave the card
// unregistered — which means this module can genuinely be evaluated more
// than once if multiple copies succeed. customElements.define() throws on a
// second registration, so guard it like any other idempotent registration.
if (!customElements.get("mealie-launcher-card")) {
  customElements.define("mealie-launcher-card", MealieLauncherCard);
}
