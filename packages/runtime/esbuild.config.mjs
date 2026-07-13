import { build } from "esbuild";

// Bundles into a single self-executing script pushed to Cascade as a File
// asset (docs/_system/docs-runtime.js, see cascade-client's push-runtime.ts)
// and loaded by the docs-platform-page Template via <script src> -- not
// consumed as an npm module, so IIFE + browser target, not ESM/node. ascii
// charset (the esbuild default) matters here: the output is transported as
// raw bytes to Cascade and served with no charset on its content-type
// header, so any non-ASCII character esbuild would otherwise emit literally
// (e.g. in string constants) must stay \uXXXX-escaped instead.
await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "browser",
  target: "es2019",
  format: "iife",
  minify: true,
  outfile: "dist/docs-runtime.js",
});
