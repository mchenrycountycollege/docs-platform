import { SignJWT } from "jose";
import { describe, expect, it } from "vitest";
import type { Env } from "./env.js";
import { clearSessionCookie, createSessionCookie, SessionAuthError, verifySession } from "./session.js";

const env = { SESSION_SECRET: "test-secret-at-least-32-bytes-long!!" } as Env;

function requestWithCookie(cookie: string | null): Request {
  return new Request("https://wiki.example/api/tree", cookie === null ? undefined : { headers: { cookie } });
}

/** The cookie's `name=value` pair, without attributes -- what the browser sends back. */
function cookiePair(setCookie: string): string {
  return setCookie.split(";")[0] ?? "";
}

describe("session cookies", () => {
  it("round-trips username and email through create + verify", async () => {
    const setCookie = await createSessionCookie("docstest", "docstest@mchenry.edu", env);
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie).toContain("Secure");
    expect(setCookie).toContain("SameSite=Lax");

    const identity = await verifySession(requestWithCookie(cookiePair(setCookie)), env);
    expect(identity.username).toBe("docstest");
    expect(identity.email).toBe("docstest@mchenry.edu");
    // Freshly minted 30-day token is nowhere near the 7-day refresh window.
    expect(identity.refreshedCookie).toBeUndefined();
  });

  it("omits the email claim when none was available at login", async () => {
    const setCookie = await createSessionCookie("docstest", undefined, env);
    const identity = await verifySession(requestWithCookie(cookiePair(setCookie)), env);
    expect(identity.email).toBeUndefined();
  });

  it("rejects a missing cookie", async () => {
    await expect(verifySession(requestWithCookie(null), env)).rejects.toThrow(SessionAuthError);
  });

  it("rejects a token signed with a different secret", async () => {
    const setCookie = await createSessionCookie("docstest", undefined, { SESSION_SECRET: "some-other-secret-value-entirely!!" } as Env);
    await expect(verifySession(requestWithCookie(cookiePair(setCookie)), env)).rejects.toThrow(SessionAuthError);
  });

  it("rejects an expired token", async () => {
    const jwt = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setSubject("docstest")
      .setIssuedAt(Math.floor(Date.now() / 1000) - 3600)
      .setExpirationTime(Math.floor(Date.now() / 1000) - 60)
      .sign(new TextEncoder().encode(env.SESSION_SECRET));
    await expect(verifySession(requestWithCookie(`wiki_session=${jwt}`), env)).rejects.toThrow(SessionAuthError);
  });

  it("reissues a fresh cookie inside the 7-day sliding window", async () => {
    const jwt = await new SignJWT({ email: "docstest@mchenry.edu" })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject("docstest")
      .setIssuedAt()
      .setExpirationTime("2d")
      .sign(new TextEncoder().encode(env.SESSION_SECRET));
    const identity = await verifySession(requestWithCookie(`wiki_session=${jwt}`), env);
    expect(identity.refreshedCookie).toBeDefined();

    // And the reissued cookie itself verifies, carrying the claims forward.
    const again = await verifySession(requestWithCookie(cookiePair(identity.refreshedCookie!)), env);
    expect(again.username).toBe("docstest");
    expect(again.email).toBe("docstest@mchenry.edu");
  });

  it("finds the session cookie among others", async () => {
    const setCookie = await createSessionCookie("docstest", undefined, env);
    const identity = await verifySession(requestWithCookie(`theme=dark; ${cookiePair(setCookie)}; other=1`), env);
    expect(identity.username).toBe("docstest");
  });

  it("clearSessionCookie expires immediately", () => {
    expect(clearSessionCookie()).toContain("Max-Age=0");
  });
});
