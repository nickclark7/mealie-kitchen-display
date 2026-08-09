// Uses esbuild-wasm instead of native esbuild: the /homeassistant mount is
// noexec, so the native esbuild binary can't run in this container.
import * as esbuild from "esbuild-wasm";

await esbuild.initialize({});

const result = await esbuild.build({
  entryPoints: ["src/mealie-recipe-panel.ts", "src/mealie-launcher-card.ts"],
  bundle: true,
  format: "esm",
  target: "es2021",
  outdir: "dist",
  minify: true,
});

if (result.errors.length) {
  console.error(result.errors);
  process.exit(1);
}
console.log("Build complete.");
process.exit(0);
