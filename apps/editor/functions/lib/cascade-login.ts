import type { Env } from "./env.js";

/**
 * Cascade-backed login validation (cascade-auth-migration-plan.md sections
 * 2.2-2.3): the user's own Cascade credentials are used for exactly one
 * thing -- this validation at login. They are never stored, never persisted,
 * never used for content operations (the shared CASCADE_API_KEY service
 * account keeps doing all of those), and MUST never be logged or echoed.
 *
 * Credentials go in the POST body, not the query string -- the REST docs
 * warn that URLs may land in server logs (plan risk 7).
 */

export type LoginResult =
  /** Credentials valid AND the account can see CASCADE_SITE_NAME. `email` is the account's real email when Cascade let us read it (plan section 4, option b). */
  | { ok: true; email?: string }
  /** Wrong username/password (or any response that doesn't positively prove success -- fail closed). */
  | { ok: "unauthorized" }
  /** Credentials valid, but the account was never granted the docs site. */
  | { ok: "forbidden" };

interface ListSitesResponse {
  success?: unknown;
  message?: unknown;
  sites?: unknown;
}

/** Site names from a listSites body, or null when the shape isn't the one verified live (see plan section 1's table). */
function siteNamesFrom(body: ListSitesResponse): string[] | null {
  if (!Array.isArray(body.sites)) return null;
  const names: string[] = [];
  for (const site of body.sites as unknown[]) {
    const path = (site as { path?: { path?: unknown } }).path;
    if (typeof path?.path !== "string") return null;
    names.push(path.path);
  }
  return names;
}

async function cascadePost(env: Env, operation: string, username: string, password: string): Promise<unknown> {
  const res = await fetch(`${env.CASCADE_BASE_URL}/api/v1/${operation}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ authentication: { username, password } }),
  });
  // Verified live 2026-07-21: Cascade answers 200 for success, auth failure,
  // AND authorization failure alike -- the outcome is in the JSON body. A
  // non-200 here is therefore an upstream/infrastructure problem, not a
  // credential verdict.
  if (!res.ok) {
    throw new Error(`Cascade ${operation} returned HTTP ${res.status}`);
  }
  return res.json();
}

/**
 * Best-effort email lookup with the user's own credentials (plan section 4,
 * recommendation b-with-fallback): the scoped service account cannot read
 * users ("You do not have read permissions", verified live 2026-07-22), but
 * the logged-in user may be able to read their own record. Any failure here
 * degrades to option (c) -- the username gets stamped instead -- so this
 * never blocks a login.
 */
async function readOwnEmail(env: Env, username: string, password: string): Promise<string | undefined> {
  try {
    const body = (await cascadePost(env, `read/user/${encodeURIComponent(username)}`, username, password)) as {
      success?: unknown;
      asset?: { user?: { email?: unknown } };
    };
    if (body.success !== true) return undefined;
    const email = body.asset?.user?.email;
    return typeof email === "string" && email.length > 0 ? email : undefined;
  } catch {
    return undefined;
  }
}

export async function validateCascadeLogin(username: string, password: string, env: Env): Promise<LoginResult> {
  const body = (await cascadePost(env, "listSites", username, password)) as ListSitesResponse;

  // Fail-closed rule (plan section 2.2): authenticated ONLY when
  // success === true. Never infer success from "the error message wasn't the
  // incorrect-password one" -- a Hannon Hill wording change must degrade to
  // rejected logins, not an auth bypass.
  if (body.success !== true) {
    if (typeof body.message === "string") {
      console.warn(`[auth] Cascade rejected login for ${username}: ${body.message}`);
    } else {
      console.error(`[auth] Unrecognized Cascade listSites response shape for ${username}; rejecting`);
    }
    return { ok: "unauthorized" };
  }

  const siteNames = siteNamesFrom(body);
  if (siteNames === null) {
    console.error(`[auth] Cascade listSites succeeded for ${username} but sites had an unrecognized shape; rejecting`);
    return { ok: "unauthorized" };
  }

  // Authorization (plan section 2.3): listSites only returns sites the
  // account may access, so containing the docs site proves the account was
  // deliberately granted it (via the wiki-contributors group in Cascade).
  if (!siteNames.includes(env.CASCADE_SITE_NAME)) {
    return { ok: "forbidden" };
  }

  return { ok: true, email: await readOwnEmail(env, username, password) };
}
