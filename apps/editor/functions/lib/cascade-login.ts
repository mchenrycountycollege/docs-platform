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
 *
 * Authentication and authorization are two separate REST calls:
 *
 *  1. listSites proves the credentials themselves (success:true for any
 *     valid account, success:false otherwise -- verified live 2026-07-21).
 *  2. A read of the docs base folder with those same credentials proves the
 *     account was granted the docs area. This replaced the original
 *     "CASCADE_SITE_NAME in listSites" membership check after REST listSites
 *     was observed (2026-07-23, jreimer) omitting a site the UI's site
 *     dropdown and Effective Abilities both showed, causing false 403s. The
 *     folder read tests Access Rights -- the mechanism the wiki-contributors
 *     group is actually granted -- rather than Cascade's site-list
 *     computation.
 */

export type LoginResult =
  /** Credentials valid AND the account can read the docs base folder. `email` is the account's real email when Cascade let us read it (plan section 4, option b). */
  | { ok: true; email?: string }
  /** Wrong username/password (or any response that doesn't positively prove success -- fail closed). */
  | { ok: "unauthorized" }
  /** Credentials valid, but the account was never granted the docs area. */
  | { ok: "forbidden" };

/**
 * The docs subtree root inside CASCADE_SITE_NAME. Must match ROOT in
 * packages/cascade-client/src/scope.ts -- the same folder every content
 * operation is scoped to.
 */
const DOCS_ROOT = "docs";

interface CascadeOperationResponse {
  success?: unknown;
  message?: unknown;
  sites?: unknown;
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
  const body = (await cascadePost(env, "listSites", username, password)) as CascadeOperationResponse;

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

  // Authorization: the account must be able to read the docs base folder
  // with its own credentials. Same fail-closed rule -- authorized ONLY when
  // the probe positively succeeds.
  const probe = (await cascadePost(
    env,
    `read/folder/${encodeURIComponent(env.CASCADE_SITE_NAME)}/${DOCS_ROOT}`,
    username,
    password,
  )) as CascadeOperationResponse;
  if (probe.success !== true) {
    // The listSites count stays in this log as evidence for the open
    // REST-vs-UI site-list discrepancy (Hannon Hill ticket) -- count only,
    // never the site list itself.
    const siteCount = Array.isArray(body.sites) ? String(body.sites.length) : "an unrecognized number of";
    const detail = typeof probe.message === "string" ? probe.message : "no message in response";
    console.warn(
      `[auth] Credentials valid for ${username}, but the docs-folder probe (${env.CASCADE_SITE_NAME}/${DOCS_ROOT}) was denied: ${detail} (listSites returned ${siteCount} site(s)); rejecting with forbidden`,
    );
    return { ok: "forbidden" };
  }

  const email = await readOwnEmail(env, username, password);
  console.log(
    `[auth] Cascade login validated for ${username} via docs-folder probe; email lookup ${email ? "succeeded" : "failed -- username will be stamped as authorEmail"}`,
  );
  return { ok: true, email };
}
