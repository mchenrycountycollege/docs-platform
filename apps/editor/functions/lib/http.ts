import { CascadeApiError, Forbidden, MalformedPageError, VersionConflictError } from "@docs-platform/cascade-client";

export function json(data: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json", ...init?.headers },
  });
}

/**
 * Normalizes every error a route handler can throw into a response, so a
 * lossy/unexpected Cascade failure can't leak the API key or raw upstream
 * internals to the browser (editor-implementation-plan.md section 3,
 * "Errors"). Route handlers should let errors propagate and call this once
 * at the top level rather than catching case-by-case.
 */
export function errorResponse(err: unknown): Response {
  if (err instanceof Forbidden) {
    return json({ error: "forbidden", message: err.message }, { status: 403 });
  }
  if (err instanceof VersionConflictError) {
    return json(
      { error: "conflict", currentVersion: err.currentVersion, currentBodyHtml: err.currentBodyHtml },
      { status: 409 },
    );
  }
  if (err instanceof CascadeApiError) {
    console.error(`[api] Cascade API error (status ${err.status}): ${err.message}`);
    return json({ error: "cascade-error", message: "Upstream Cascade request failed" }, { status: 502 });
  }
  if (err instanceof MalformedPageError) {
    console.error(`[api] malformed page: ${err.message}`);
    return json(
      {
        error: "malformed-page",
        message: `This page's stored data doesn't match the current Data Definition and can't be opened here. Fix it directly in Cascade at ${err.path}.`,
      },
      { status: 422 },
    );
  }
  console.error("[api] unexpected error", err);
  return json({ error: "internal", message: "Unexpected server error" }, { status: 500 });
}
