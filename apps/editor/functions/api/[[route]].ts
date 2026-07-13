import { readFolder, readPage } from "@docs-platform/cascade-client";
import { AccessAuthError, verifyAccessJwt } from "../lib/access-auth.js";
import { cascadeConfigFromEnv } from "../lib/cascade-config.js";
import type { Env } from "../lib/env.js";
import { errorResponse, json } from "../lib/http.js";

/**
 * Single catch-all entry point for /api/* (editor-implementation-plan.md
 * section 4's apps/editor/functions/api/[[route]].ts). Every request is
 * Access-JWT-verified first (fail closed -> 401), then dispatched by method
 * + path segments. E0 wires only the two read routes needed to prove the
 * proxy end-to-end; E1-E3 add the write routes from section 3's table here.
 */
export const onRequest: PagesFunction<Env, "route"> = async (context) => {
  let email: string;
  try {
    ({ email } = await verifyAccessJwt(context.request, context.env));
  } catch (err) {
    if (err instanceof AccessAuthError) {
      return json({ error: "unauthorized", message: err.message }, { status: 401 });
    }
    throw err;
  }
  // Identity isn't used by any route yet -- the write routes added in E1+
  // stamp it into MetadataFields.authorEmail/editorName on create/edit.
  void email;

  const routeParam = context.params.route;
  const segments = Array.isArray(routeParam) ? routeParam : routeParam ? [routeParam] : [];
  const route = segments.join("/");
  const url = new URL(context.request.url);
  const config = cascadeConfigFromEnv(context.env);

  try {
    if (context.request.method === "GET" && route === "tree") {
      const path = url.searchParams.get("path") ?? "docs";
      const folder = await readFolder(config, path);
      return json({ path: folder.path, children: folder.children });
    }

    if (context.request.method === "GET" && route === "page") {
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

    return json({ error: "not-found", message: `No route for ${context.request.method} /api/${route}` }, {
      status: 404,
    });
  } catch (err) {
    return errorResponse(err);
  }
};
