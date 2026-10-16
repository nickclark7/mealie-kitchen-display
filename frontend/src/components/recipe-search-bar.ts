import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../types";
import "./voice-input-button";

@customElement("recipe-search-bar")
export class RecipeSearchBar extends LitElement {
  @property({ type: String }) value = "";
  @property({ attribute: false }) hass?: HomeAssistant;
  // Speech input: off unless enabled in the integration's options. null
  // pipeline means Home Assistant's preferred one.
  @property({ type: Boolean }) voiceEnabled = false;
  @property({ attribute: false }) voicePipeline: string | null = null;

  @state() private voiceState: "idle" | "listening" | "transcribing" = "idle";

  private debounceHandle?: number;

  static styles = css`
    :host {
      display: block;
      flex: 2;
      min-width: 200px;
    }
    input {
      width: 100%;
      box-sizing: border-box;
      font-size: 18px;
      padding: 12px 16px;
      min-height: 48px;
      border-radius: 24px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
    }
    input:focus {
      outline: 2px solid var(--primary-color, #03a9f4);
    }
    /* The mic sits inside the field, same as the AI prompt's. */
    .wrap {
      position: relative;
    }
    .wrap.has-voice input {
      padding-right: 48px;
    }
    .wrap mealie-voice-button {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
    }
  `;

  private onInput(e: InputEvent) {
    const value = (e.target as HTMLInputElement).value;
    this.value = value;
    window.clearTimeout(this.debounceHandle);
    this.debounceHandle = window.setTimeout(() => {
      this.dispatchEvent(new CustomEvent("search-change", { detail: { value } }));
    }, 300);
  }

  // A dictated search runs straight away: the user has finished speaking,
  // so there's nothing left to debounce.
  private onVoiceText(e: CustomEvent<{ text: string }>) {
    const value = e.detail.text;
    this.value = value;
    window.clearTimeout(this.debounceHandle);
    this.dispatchEvent(new CustomEvent("search-change", { detail: { value } }));
  }

  render() {
    return html`
      <div class="wrap ${this.voiceEnabled ? "has-voice" : ""}">
        <input
          type="search"
          placeholder=${this.voiceState === "listening"
            ? "Listening…"
            : this.voiceState === "transcribing"
              ? "Transcribing…"
              : "Search recipes…"}
          .value=${this.value}
          @input=${this.onInput}
        />
        ${this.voiceEnabled
          ? html`<mealie-voice-button
              .hass=${this.hass}
              .pipelineId=${this.voicePipeline}
              label="Dictate a recipe search"
              @voice-text=${this.onVoiceText}
              @voice-state=${(e: CustomEvent<{ state: "idle" | "listening" | "transcribing" }>) =>
                (this.voiceState = e.detail.state)}
            ></mealie-voice-button>`
          : nothing}
      </div>
    `;
  }
}
