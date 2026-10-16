import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant, PipelineRunEvent } from "../types";

// Speech-to-text for the add-on's short free-text boxes, using whichever
// speech engine the user already has configured in Home Assistant.
//
// Runs Home Assistant's own Assist pipeline over the existing authenticated
// WebSocket connection with start_stage/end_stage both "stt", so only the
// speech stage runs — no conversation agent, no text-to-speech. Two things
// come for free that way: the server resamples our audio to 16kHz itself
// (so the microphone's native rate can be sent as-is), and its
// voice-activity detection ends the recording when the user stops talking.
// The wire protocol below (buffer until run-start hands out a binary handler
// id, then prefix every chunk with that id) mirrors Home Assistant's own mic
// button in ha-assist-chat.ts.
//
// Bundled into both mealie-recipe-panel.js and mealie-dashboard-card.js,
// both of which load on the same page, so registration must be guarded —
// see the note at the bottom of this file.

// Converts the microphone's Float32 samples to the 16-bit PCM the pipeline
// expects. Loaded as an AudioWorklet module from a blob: URL — it has no
// imports of its own, so there's no module-specifier resolution to go wrong.
const WORKLET_SOURCE = `
class MealieRecorderProcessor extends AudioWorkletProcessor {
  process(inputList) {
    const input = inputList[0];
    if (!input || input.length < 1) return true;
    const float32Data = input[0];
    const int16Data = new Int16Array(float32Data.length);
    for (let i = 0; i < float32Data.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Data[i]));
      int16Data[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    this.port.postMessage(int16Data);
    return true;
  }
}
registerProcessor("mealie-recorder", MealieRecorderProcessor);
`;

// Speech engines punctuate their output as if it were prose, so a dictated
// search comes back as "Chicken curry." — harmless for the Mealie query but
// it looks untidy sitting in the box, and it's equally pointless on the end
// of an AI prompt. Stripped here, in the one place every caller goes
// through, rather than in each host.
function normalizeTranscript(text: string): string {
  return text.trim().replace(/[\s.,!?;:]+$/, "");
}

function microphoneErrorMessage(err: unknown): string {
  const name = err instanceof DOMException ? err.name : "";
  switch (name) {
    case "NotAllowedError":
    case "SecurityError":
      return "Microphone access was blocked. Allow it for this page, then try again.";
    case "NotFoundError":
    case "OverconstrainedError":
      return "No microphone was found on this device.";
    case "NotReadableError":
      return "The microphone is already in use by something else.";
    default:
      return err instanceof Error ? err.message : String(err);
  }
}

export class VoiceInputButton extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  // null = use whatever pipeline Home Assistant has set as preferred.
  @property({ attribute: false }) pipelineId: string | null = null;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = "Dictate";

  @state() private status: "idle" | "starting" | "listening" | "transcribing" = "idle";

  private context?: AudioContext;
  private stream?: MediaStream;
  private source?: MediaStreamAudioSourceNode;
  private recorder?: AudioWorkletNode;
  private unsub?: () => void;
  private handlerId?: number;
  // Audio recorded before run-start arrives with the handler id — sent as
  // soon as it does, so the start of the phrase isn't clipped.
  private pending: Int16Array[] = [];
  // Loudness of the most recent chunk, 0..1. A plain field, not @state: it
  // changes with every audio chunk and only drives a CSS variable, so it
  // must never trigger a Lit re-render.
  private level = 0;
  private levelFrame?: number;
  private awaitingHaIcon = false;

  static styles = css`
    :host {
      display: inline-flex;
      /* Written once per animation frame while listening. */
      --level: 0;
    }
    button {
      position: relative;
      width: 40px;
      height: 40px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--secondary-text-color, #757575);
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-tap-highlight-color: transparent;
    }
    button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    button:active:not(:disabled) {
      background: var(--divider-color, #e0e0e0);
    }
    button.listening {
      color: var(--primary-color, #03a9f4);
    }
    ha-icon {
      --mdc-icon-size: 22px;
      display: flex;
    }
    /* Sits behind the icon and tracks the speaker's voice: a slow base
       breath so it's alive during silence, scaled out by --level as the
       room gets louder. */
    .halo {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      opacity: calc(0.12 + var(--level) * 0.28);
      transform: scale(calc(0.78 + var(--level) * 0.3));
      transition:
        transform 90ms ease-out,
        opacity 90ms ease-out;
      animation: breathe 2.4s ease-in-out infinite;
      pointer-events: none;
    }
    .spinner {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid var(--divider-color, #e0e0e0);
      border-top-color: var(--primary-color, #03a9f4);
      animation: spin 0.8s linear infinite;
    }
    @keyframes breathe {
      0%,
      100% {
        box-shadow: 0 0 0 0 transparent;
      }
      50% {
        box-shadow: 0 0 0 4px rgba(3, 169, 244, 0.12);
      }
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .halo {
        animation: none;
        transition: none;
      }
      .spinner {
        animation: none;
      }
    }
  `;

  static get isSupported(): boolean {
    return (
      window.isSecureContext &&
      !!navigator.mediaDevices?.getUserMedia &&
      typeof AudioContext !== "undefined"
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.teardown();
  }

  // Lets a host swap its field's placeholder to "Listening…" while the
  // field is empty. Hosts that don't listen are unaffected.
  private setStatus(status: typeof this.status) {
    if (this.status === status) return;
    this.status = status;
    const state = status === "starting" ? "listening" : status;
    this.dispatchEvent(
      new CustomEvent("voice-state", { detail: { state }, bubbles: true, composed: true })
    );
  }

  // One style write per frame, however many audio chunks arrived in it.
  private startLevelLoop() {
    const tick = () => {
      if (this.status !== "listening" && this.status !== "starting") return;
      this.style.setProperty("--level", this.level.toFixed(3));
      // Decays on its own, so the halo settles when the room goes quiet
      // instead of sticking at the last loud chunk.
      this.level *= 0.82;
      this.levelFrame = requestAnimationFrame(tick);
    };
    this.levelFrame = requestAnimationFrame(tick);
  }

  private stopLevelLoop() {
    if (this.levelFrame !== undefined) cancelAnimationFrame(this.levelFrame);
    this.levelFrame = undefined;
    this.level = 0;
    this.style.setProperty("--level", "0");
  }

  private measureLevel(chunk: Int16Array) {
    if (!chunk.length) return;
    let sum = 0;
    // Every 4th sample is plenty for a loudness reading and keeps this
    // cheap on a slow tablet.
    for (let i = 0; i < chunk.length; i += 4) {
      const sample = chunk[i] / 0x8000;
      sum += sample * sample;
    }
    const rms = Math.sqrt(sum / Math.ceil(chunk.length / 4));
    // Normal speech sits well below full scale, so scale up and clamp.
    const scaled = Math.min(1, rms * 6);
    this.level = Math.max(this.level, scaled);
  }

  private fail(message: string) {
    this.teardown();
    this.dispatchEvent(
      new CustomEvent("voice-error", { detail: { message }, bubbles: true, composed: true })
    );
  }

  private async onClick() {
    if (this.status === "idle") {
      await this.start();
    } else {
      // Tapping again while listening cancels: nothing is emitted.
      this.teardown();
    }
  }

  private async start() {
    if (!this.hass) return;
    this.setStatus("starting");
    this.pending = [];
    this.handlerId = undefined;

    try {
      await this.openMicrophone();
    } catch (err) {
      this.fail(microphoneErrorMessage(err));
      return;
    }

    try {
      this.unsub = await this.hass.connection.subscribeMessage<PipelineRunEvent>(
        (event) => this.onPipelineEvent(event),
        {
          type: "assist_pipeline/run",
          start_stage: "stt",
          end_stage: "stt",
          input: { sample_rate: this.context!.sampleRate },
          ...(this.pipelineId ? { pipeline: this.pipelineId } : {}),
        }
      );
      this.setStatus("listening");
      this.startLevelLoop();
    } catch (err) {
      this.fail(err instanceof Error ? err.message : String(err));
    }
  }

  private async openMicrophone() {
    const context = new AudioContext();
    this.context = context;
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const blobUrl = URL.createObjectURL(new Blob([WORKLET_SOURCE], { type: "text/javascript" }));
    try {
      await context.audioWorklet.addModule(blobUrl);
    } finally {
      URL.revokeObjectURL(blobUrl);
    }
    this.source = context.createMediaStreamSource(this.stream);
    this.recorder = new AudioWorkletNode(context, "mealie-recorder");
    this.recorder.port.onmessage = (e) => {
      const chunk = e.data as Int16Array;
      this.measureLevel(chunk);
      this.sendChunk(chunk);
    };
    this.source.connect(this.recorder);
  }

  private onPipelineEvent(event: PipelineRunEvent) {
    switch (event.type) {
      case "run-start":
        this.handlerId = event.data?.runner_data?.stt_binary_handler_id ?? undefined;
        for (const chunk of this.pending) this.sendChunk(chunk);
        this.pending = [];
        break;
      case "stt-vad-end":
        // Server heard the end of the phrase and is now running the engine.
        this.stopLevelLoop();
        this.setStatus("transcribing");
        break;
      case "stt-end": {
        const text = normalizeTranscript(event.data?.stt_output?.text ?? "");
        // Audio is finished with either way; the subscription itself is
        // closed by the run-end that follows.
        this.stopRecording();
        this.setStatus("idle");
        if (text) {
          this.dispatchEvent(
            new CustomEvent("voice-text", { detail: { text }, bubbles: true, composed: true })
          );
        } else {
          this.fail("Didn't catch that — try again.");
        }
        break;
      }
      case "run-end":
        this.teardown();
        break;
      case "error":
        this.fail(event.data?.message || "Speech recognition failed");
        break;
      default:
        // stt-start/stt-vad-start need no handling: the server is doing the
        // listening, and the transcript arrives on stt-end.
        break;
    }
  }

  private sendChunk(chunk: Int16Array) {
    if (this.handlerId === undefined) {
      this.pending.push(chunk);
      return;
    }
    const socket = this.hass?.connection.socket;
    if (!socket) return;
    socket.binaryType = "arraybuffer";
    // One byte of handler id, then the raw PCM. A lone handler-id byte (an
    // empty chunk) is how the server is told the audio has finished.
    const data = new Uint8Array(1 + chunk.length * 2);
    data[0] = this.handlerId;
    data.set(new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.length * 2), 1);
    socket.send(data);
  }

  // Closes the microphone and tells the server the audio is done, without
  // touching the subscription (the server still owes us a transcript).
  private stopRecording() {
    if (this.recorder) {
      this.recorder.port.onmessage = null;
      this.recorder.disconnect();
    }
    this.source?.disconnect();
    this.stream?.getTracks().forEach((track) => track.stop());
    if (this.handlerId !== undefined) {
      this.sendChunk(new Int16Array());
      this.handlerId = undefined;
    }
    this.context?.close();
    this.recorder = undefined;
    this.source = undefined;
    this.stream = undefined;
    this.context = undefined;
    this.pending = [];
  }

  private teardown() {
    this.stopRecording();
    this.stopLevelLoop();
    this.unsub?.();
    this.unsub = undefined;
    this.setStatus("idle");
  }

  // ha-icon is Home Assistant's own icon element, so the button matches HA's
  // iconography and inherits the theme colour. It's lazily registered by the
  // frontend, so fall back to the emoji and re-render if it shows up later.
  private renderIcon() {
    if (customElements.get("ha-icon")) {
      return html`<ha-icon icon="mdi:microphone"></ha-icon>`;
    }
    if (!this.awaitingHaIcon) {
      this.awaitingHaIcon = true;
      customElements.whenDefined("ha-icon").then(() => this.requestUpdate());
    }
    return html`🎤`;
  }

  render() {
    if (!VoiceInputButton.isSupported || !this.hass) return nothing;
    const listening = this.status === "listening" || this.status === "starting";
    const labels = {
      idle: this.label,
      starting: "Starting…",
      listening: "Listening — tap to cancel",
      transcribing: "Transcribing…",
    };
    return html`
      <button
        class=${listening ? "listening" : ""}
        ?disabled=${this.disabled || this.status === "transcribing"}
        aria-label=${labels[this.status]}
        aria-pressed=${listening ? "true" : "false"}
        title=${labels[this.status]}
        @click=${this.onClick}
      >
        ${this.status === "transcribing"
          ? html`<div class="spinner"></div>`
          : html`${listening ? html`<div class="halo"></div>` : nothing}${this.renderIcon()}`}
      </button>
    `;
  }
}

// Bundled into two entry files that both load on every page, so an
// unconditional @customElement would throw ("already been used with this
// registry") in whichever bundle evaluates second and abort that whole
// module. Same guard as confirm-dialog.ts and mealie-launcher-overlay.ts.
if (!customElements.get("mealie-voice-button")) {
  customElements.define("mealie-voice-button", VoiceInputButton);
}
