import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../types";

// Mounted directly on document.body (not inside any dashboard/view DOM), so
// it layers on top of the whole Home Assistant UI without navigating away —
// closing it just removes this element, leaving the dashboard underneath
// exactly as the user left it.
//
// Bundled independently into both mealie-launcher-card.js and
// mealie-dashboard-card.js, and both load on every page via
// add_extra_js_url/mealie-loader.js. Registering unconditionally via
// @customElement would throw "NotSupportedError: already used with this
// registry" whichever bundle's script evaluates second, aborting that
// entire module — including its own unrelated card registration further
// down. Same fix as confirm-dialog.ts.
export class MealieLauncherOverlay extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) panelJsUrl = "";
  // Optional deep-link query string (e.g. "?recipe=some-slug"), same format
  // mealie-dashboard-card already navigates with. mealie-recipe-panel reads
  // this from location.search on its own first update and strips it back
  // off immediately after acting on it (see loadPanel below).
  @property({ attribute: false }) deepLink = "";

  @state() private error: string | null = null;

  private panelEl?: HTMLElement;

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 1000000;
      display: flex;
      flex-direction: column;
      background: var(--primary-background-color, #fafafa);
      color: var(--primary-text-color, #212121);
    }
    /* A dedicated strip above the panel's own header, rather than floating
       over it — the panel's header buttons differ (and shift position) per
       view, so anything overlaid on top of it risks sitting on a real button. */
    .bar {
      flex-shrink: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: max(env(safe-area-inset-top, 0px), 4px) 8px 4px;
      background: var(--app-header-background-color, #fff);
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    .close {
      border: none;
      background: transparent;
      color: inherit;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .close:active {
      background: var(--divider-color, #e0e0e0);
    }
    .panel-host {
      flex: 1;
      min-height: 0;
    }
    .panel-host mealie-recipe-panel {
      display: block;
      height: 100%;
    }
    .status {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      padding: 24px;
      text-align: center;
    }
    .status.error {
      color: var(--error-color, #db4437);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadPanel();
  }

  private async loadPanel() {
    try {
      // Resolve to a fully-qualified URL before importing: this code can
      // itself be running from a module the launcher card loaded via a
      // blob: URL (mealie-loader.ts's fetch()+Blob+import() workaround for
      // add_extra_js_url hangs), and a root-relative path like this one
      // fails to resolve ("Failed to resolve module specifier") against a
      // blob: base. window.location.href is always the real page URL
      // regardless of what URL the calling module itself was loaded from.
      const absoluteUrl = new URL(this.panelJsUrl, window.location.href).href;
      await import(/* @vite-ignore */ absoluteUrl);
      if (this.deepLink) {
        // Doesn't trigger a real navigation (no location-changed event), so
        // HA's router never notices — the panel picks this up on its own
        // first update, the same way it does after a normal navigate(), and
        // replaces it right back with the plain dashboard path once handled.
        history.replaceState(null, "", location.pathname + this.deepLink);
      }
      const el = document.createElement("mealie-recipe-panel") as HTMLElement & {
        hass?: HomeAssistant;
        narrow?: boolean;
      };
      el.hass = this.hass;
      el.narrow = window.innerWidth < 870;
      el.style.display = "block";
      el.style.height = "100%";
      this.panelEl = el;
      this.requestUpdate();
    } catch (e) {
      this.error = e instanceof Error ? e.message : String(e);
    }
  }

  updated() {
    if (this.panelEl) {
      (this.panelEl as HTMLElement & { hass?: HomeAssistant }).hass = this.hass;
    }
  }

  private close() {
    this.dispatchEvent(new CustomEvent("overlay-close", { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="bar">
        <button class="close" aria-label="Close" @click=${() => this.close()}>✕</button>
      </div>
      ${this.error
        ? html`<div class="status error">Couldn't load the recipe panel: ${this.error}</div>`
        : this.panelEl
          ? html`<div class="panel-host">${this.panelEl}</div>`
          : html`<div class="status">Loading…</div>`}
    `;
  }
}

if (!customElements.get("mealie-launcher-overlay")) {
  customElements.define("mealie-launcher-overlay", MealieLauncherOverlay);
}
