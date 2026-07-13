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
  target: "esnext",
  format: "esm",
  outfile: "out/_worker.js",
});
