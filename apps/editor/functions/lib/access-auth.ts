import { createRemoteJWKSet, jwtVerify } from "jose";
import type { Env } from "./env.js";

export class AccessAuthError extends Error {}

export interface AccessIdentity {
  email: string;
}

/**
 * createRemoteJWKSet's returned function caches fetched keys internally (and
 * only refetches on a kid it hasn't seen, with cooldown), so keying this map
 * by team domain and reusing it across requests in the same Worker isolate
 * gets us JWKS caching for free instead of hand-rolling it. Module scope
 * persists across requests but not across isolates/deploys, which is fine --
 * a cold isolate just pays one extra JWKS fetch.
 */
const jwksByTeamDomain = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

function getJwks(teamDomain: string): ReturnType<typeof createRemoteJWKSet> {
  let jwks = jwksByTeamDomain.get(teamDomain);
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`https://${teamDomain}/cdn-cgi/access/certs`));
    jwksByTeamDomain.set(teamDomain, jwks);
  }
  return jwks;
}

/**
 * Verifies the Cf-Access-Jwt-Assertion header Cloudflare Access attaches to
 * every request that already passed the Access policy (email OTP + explicit
 * allow-list, configured on the Pages project itself -- see
 * editor-implementation-plan.md section 7). Access already blocks
 * unauthenticated traffic at the edge; this check is defense-in-depth (a
 * request that reaches Workers code some other way, e.g. local dev, must
 * still prove a valid signed token) and is the only way to extract the
 * caller's email for identity stamping. Fails closed: any verification
 * problem throws AccessAuthError, which callers must turn into a 401.
 */
export async function verifyAccessJwt(request: Request, env: Env): Promise<AccessIdentity> {
  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  if (!token) {
    throw new AccessAuthError("Missing Cf-Access-Jwt-Assertion header");
  }

  const jwks = getJwks(env.ACCESS_TEAM_DOMAIN);
  let payload: Record<string, unknown>;
  try {
    ({ payload } = await jwtVerify(token, jwks, {
      audience: env.ACCESS_AUD,
      issuer: `https://${env.ACCESS_TEAM_DOMAIN}`,
    }));
  } catch (err) {
    throw new AccessAuthError(
      `Access JWT verification failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  const email = payload.email;
  if (typeof email !== "string" || email.length === 0) {
    throw new AccessAuthError("Access JWT missing 'email' claim");
  }
  return { email };
}
