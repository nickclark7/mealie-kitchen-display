// Home Assistant's add_extra_js_url mechanism runs our real card bundles via
// a bare `import(url)` call it generates itself, with no timeout. In
// practice that call can occasionally hang forever — neither resolving nor
// rejecting, no console error — leaving the custom element permanently
// unregistered even though a fresh fetch of the exact same file, moments
// later, succeeds instantly. fetch() with AbortController does support a
// timeout, so this loader uses that instead and retries on failure, which a
// bare import() call gives us no way to do.
//
// __init__.py points add_extra_js_url at this file (small, so it's exposed
// to the same hang risk for the shortest possible time, and registered as
// more than one independent import() for redundancy) with the real card
// bundle URL(s) passed via `target` query params, since add_extra_js_url
// only lets us choose *what* gets imported, not the code that imports it.

const ATTEMPTS = 3;
const TIMEOUT_MS = 4000;

async function loadOnce(url: string): Promise<void> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} loading ${url}`);
    const code = await res.text();
    const blobUrl = URL.createObjectURL(new Blob([code], { type: "text/javascript" }));
    try {
      await import(/* @vite-ignore */ blobUrl);
    } finally {
      URL.revokeObjectURL(blobUrl);
    }
  } finally {
    clearTimeout(timer);
  }
}

async function loadWithRetry(url: string): Promise<void> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      // Each retry gets a distinct URL so a service worker cache lookup
      // (keyed by exact URL) can't hand back whatever caused the prior
      // attempt to hang, and so it's forced to actually go to network.
      const retryUrl = attempt === 1 ? url : `${url}&retry=${attempt}-${Date.now()}`;
      await loadOnce(retryUrl);
      return;
    } catch (err) {
      lastError = err;
    }
  }
  // eslint-disable-next-line no-console
  console.error("[mealie-loader] giving up loading", url, lastError);
}

// Multiple targets can ride the same loader invocation (see __init__.py) —
// letting one successful outer import() bring in every card, rather than
// needing its own independent (and independently hang-prone) outer import()
// per card.
for (const target of new URL(import.meta.url).searchParams.getAll("target")) {
  loadWithRetry(decodeURIComponent(target));
}
