import { build } from "esbuild";

// Bundles this action + cascade-publish/doc-core/cascade-client + their deps
// into one file. GitHub Actions can't run `pnpm install` for a referenced
// action, so the dist/ output committed here must be fully self-contained.
await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  outfile: "dist/index.js",
  // esbuild's ESM output calls `require` for a couple of CJS-only transitive
  // deps; this banner restores it under Node's ESM loader (the standard
  // esbuild recipe for bundling CJS-dependent code as ESM).
  banner: {
    js: "import { createRequire as ___createRequire } from 'node:module'; const require = ___createRequire(import.meta.url);",
  },
});
