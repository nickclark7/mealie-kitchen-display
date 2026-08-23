import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../types";

// Mounted directly on document.body (not inside any dashboard/view DOM), so
// it layers on top of the whole Home Assistant UI without navigating away —
// closing it just removes this element, leaving the dashboard underneath
// exactly as the user left it.
@customElement("mealie-launcher-overlay")
export class MealieLauncherOverlay extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) panelJsUrl = "";

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
      await import(/* @vite-ignore */ this.panelJsUrl);
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
