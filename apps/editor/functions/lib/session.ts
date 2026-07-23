import { SignJWT, jwtVerify } from "jose";
import type { Env } from "./env.js";

export class SessionAuthError extends Error {}

/**
 * App session for Cascade-backed login (cascade-auth-migration-plan.md
 * section 2.4): an HS256 JWT in an HttpOnly cookie, minted by POST /api/login
 * after validateCascadeLogin() accepts the user's Cascade credentials. The
 * credentials themselves are never stored -- this cookie is the only thing
 * that persists, and it proves nothing beyond "this person logged in".
 */
const COOKIE_NAME = "wiki_session";
const SESSION_TTL_SECONDS = 30 * 24 * 60 * 60;
/** Sliding session: reissue the cookie when less than this remains. */
const REFRESH_THRESHOLD_SECONDS = 7 * 24 * 60 * 60;

export interface SessionIdentity {
  username: string;
  /** Real email read from Cascade at login when available (plan section 4, option b); absent otherwise. */
  email?: string;
  /**
   * Present when the token was within the sliding-refresh window -- a fresh
   * 30-day cookie the caller must append as a Set-Cookie header on whatever
   * response it returns.
   */
  refreshedCookie?: string;
}

function signingKey(env: Env): Uint8Array {
  return new TextEncoder().encode(env.SESSION_SECRET);
}

export async function createSessionCookie(username: string, email: string | undefined, env: Env): Promise<string> {
  const jwt = await new SignJWT(email ? { email } : {})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(username)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(signingKey(env));
  return `${COOKIE_NAME}=${jwt}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

function sessionTokenFrom(request: Request): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === COOKIE_NAME) return part.slice(eq + 1).trim();
  }
  return null;
}

/**
 * Fails closed, mirroring the old access-auth.ts shape: any problem --
 * missing cookie, bad signature, expired, malformed claims -- throws
 * SessionAuthError, which callers turn into a 401.
 */
export async function verifySession(request: Request, env: Env): Promise<SessionIdentity> {
  const token = sessionTokenFrom(request);
  if (!token) throw new SessionAuthError("No session cookie");

  let payload: Record<string, unknown>;
  try {
    ({ payload } = await jwtVerify(token, signingKey(env), { algorithms: ["HS256"] }));
  } catch (err) {
    throw new SessionAuthError(
      `Session verification failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  const username = payload.sub;
  if (typeof username !== "string" || username.length === 0) {
    throw new SessionAuthError("Session token missing 'sub' claim");
  }
  const email = typeof payload.email === "string" && payload.email.length > 0 ? payload.email : undefined;

  const identity: SessionIdentity = { username, email };
  const secondsLeft = typeof payload.exp === "number" ? payload.exp - Math.floor(Date.now() / 1000) : 0;
  if (secondsLeft < REFRESH_THRESHOLD_SECONDS) {
    identity.refreshedCookie = await createSessionCookie(username, email, env);
  }
  return identity;
}
