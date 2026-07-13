import { readFolder, readPage } from "@docs-platform/cascade-client";
import { AccessAuthError, verifyAccessJwt } from "./lib/access-auth.js";
import { cascadeConfigFromEnv } from "./lib/cascade-config.js";
import type { Env } from "./lib/env.js";
import { errorResponse, json } from "./lib/http.js";

/**
 * Cloudflare Pages "Advanced Mode" entry point: a single self-contained
 * Worker module (bundled to out/_worker.js by build-worker.mjs) that owns
 * every request, instead of Pages' file-based Functions routing. Switched
 * to this from functions/api/[[route]].ts because Pages' own
 * Functions-bundling step can't resolve @docs-platform/cascade-client -- it
 * runs in a separate, older, sandboxed Wrangler process that doesn't follow
 * the pnpm symlink out of apps/editor's root directory into
 * ../../packages/cascade-client, even though the real `next build` step (run
 * with full monorepo access) has no such problem. A _worker.js at the output
 * root makes Pages skip Functions-bundling entirely and deploy this
 * pre-bundled file as-is -- same fix as actions/publish/esbuild.config.mjs
 * for the same class of problem (a consumer that can't do its own
 * monorepo-aware dependency resolution).
 */
interface WorkerEnv extends Env {
  /** Static asset binding Pages injects in Advanced Mode -- serves everything `next build` put in out/. */
  ASSETS: Fetcher;
}

async function handleApi(request: Request, env: WorkerEnv): Promise<Response> {
  let email: string;
  try {
    ({ email } = await verifyAccessJwt(request, env));
  } catch (err) {
    if (err instanceof AccessAuthError) {
      return json({ error: "unauthorized", message: err.message }, { status: 401 });
    }
    throw err;
  }
  // Identity isn't used by any route yet -- the write routes added in E1+
  // stamp it into MetadataFields.authorEmail/editorName on create/edit.
  void email;

  const url = new URL(request.url);
  const route = url.pathname.replace(/^\/api\/?/, "");
  const config = cascadeConfigFromEnv(env);

  try {
    if (request.method === "GET" && route === "tree") {
      const path = url.searchParams.get("path") ?? "docs";
      const folder = await readFolder(config, path);
      return json({ path: folder.path, children: folder.children });
    }

    if (request.method === "GET" && route === "page") {
      const path = url.searchParams.get("path");
      if (!path) {
        return json({ error: "bad-request", message: "path query param is required" }, { status: 400 });
      }
      const page = await readPage(config, path);
      return json({
        path: page.path,
        version: page.version,
        title: page.fields.title,
        order: page.fields.order,
        tags: page.fields.tags,
        bodyHtml: page.fields.bodyHtml,
        origin: page.metadata.origin,
        editorName: page.metadata.editorName,
        authorEmail: page.metadata.authorEmail,
      });
    }

    return json(
      { error: "not-found", message: `No route for ${request.method} /api/${route}` },
      { status: 404 },
    );
  } catch (err) {
    return errorResponse(err);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      return handleApi(request, env);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<WorkerEnv>;
