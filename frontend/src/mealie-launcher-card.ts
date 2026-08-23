import { LitElement, html, css, nothing } from "lit";
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

  static getStubConfig() {
    return { title: "Recipes", overlay: false };
  }

  static getConfigElement() {
    return document.createElement("mealie-launcher-card-editor");
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

// Home Assistant's card editor contract: setConfig()/hass in, a
// "config-changed" CustomEvent out (bubbling, composed) carrying the full
// updated config. Lovelace's "Edit Card" dialog instantiates this via
// MealieLauncherCard.getConfigElement() and re-renders the card preview on
// every event. Matches MealieDashboardCardEditor's structure/styling in
// mealie-dashboard-card.ts for consistency between the two cards' editors.
export class MealieLauncherCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: LauncherCardConfig;

  setConfig(config: LauncherCardConfig) {
    this._config = config;
  }

  static styles = css`
    .row {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;
    }
    label {
      font-size: 14px;
      font-weight: 600;
    }
    .hint {
      font-size: 12px;
      color: var(--secondary-text-color, #757575);
      margin-top: -2px;
    }
    input:not([type="checkbox"]) {
      min-height: 40px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      font-size: 14px;
      padding: 0 10px;
      box-sizing: border-box;
      font-family: inherit;
    }
    .checkbox-row label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 400;
    }
    .checkbox-row input[type="checkbox"] {
      width: 18px;
      height: 18px;
    }
  `;

  private updateConfig(patch: Partial<LauncherCardConfig>) {
    if (!this._config) return;
    this._config = { ...this._config, ...patch };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: true, composed: true })
    );
  }

  render() {
    if (!this._config) return nothing;
    return html`
      <div class="row">
        <label>Title</label>
        <input
          type="text"
          .value=${this._config.title ?? ""}
          @input=${(e: Event) => this.updateConfig({ title: (e.target as HTMLInputElement).value })}
        />
      </div>

      <div class="row checkbox-row">
        <label>
          <input
            type="checkbox"
            .checked=${this._config.overlay ?? false}
            @change=${(e: Event) => this.updateConfig({ overlay: (e.target as HTMLInputElement).checked })}
          />
          Open as overlay
        </label>
        <span class="hint"
          >When on, opens the panel full-screen on top of the current dashboard instead of navigating away — a close
          button returns you to exactly where you launched it from.</span
        >
      </div>

      <div class="row">
        <label>Panel path</label>
        <input
          type="text"
          placeholder="/mealie-recipes"
          .value=${this._config.panel_path ?? ""}
          @input=${(e: Event) => this.updateConfig({ panel_path: (e.target as HTMLInputElement).value })}
        />
        <span class="hint">Only needed if you've registered the panel under a different URL.</span>
      </div>
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
if (!customElements.get("mealie-launcher-card-editor")) {
  customElements.define("mealie-launcher-card-editor", MealieLauncherCardEditor);
}
