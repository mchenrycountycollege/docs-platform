import { build } from "esbuild";

// Bundles functions/worker.ts (+ @docs-platform/cascade-client + jose) into
// one self-contained out/_worker.js -- see functions/worker.ts's top comment
// for why: Cloudflare Pages' own Functions-bundling step can't resolve the
// pnpm-workspace symlink to cascade-client, so we bundle it ourselves and
// ship Pages Advanced Mode's single-file format instead. Run after
// `next build` (out/ must already exist).
await build({
  entryPoints: ["functions/worker.ts"],
  bundle: true,
  platform: "browser",
  // Some deps (e.g. decode-named-character-reference, pulled in via
  // doc-core's markdown/HTML pipeline) ship a DOM-based `browser` export
  // condition alongside a `worker`/`workerd` one for the real Workers
  // runtime -- without this, esbuild's platform:"browser" picks the DOM
  // build and it crashes at runtime with "document is not defined" (no DOM
  // in workerd). Matches wrangler's own esbuild config for Workers builds.
  conditions: ["worker"],
  target: "esnext",
  format: "esm",
  outfile: "out/_worker.js",
});
