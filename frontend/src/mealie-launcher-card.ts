import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

interface LauncherCardConfig {
  type: string;
  panel_path?: string;
  title?: string;
}

@customElement("mealie-launcher-card")
export class MealieLauncherCard extends LitElement {
  @state() private config: LauncherCardConfig = { type: "custom:mealie-launcher-card" };

  setConfig(config: LauncherCardConfig) {
    this.config = { panel_path: "/mealie-recipes", title: "Recipes", ...config };
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

  private navigate() {
    const path = this.config.panel_path ?? "/mealie-recipes";
    history.pushState(null, "", path);
    window.dispatchEvent(new CustomEvent("location-changed", { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <ha-card @click=${this.navigate}>
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
