import { afterEach, describe, expect, it, vi } from "vitest";
import { validateCascadeLogin } from "./cascade-login.js";
import type { Env } from "./env.js";

const env = {
  CASCADE_BASE_URL: "https://cascade.example",
  CASCADE_SITE_NAME: "DEV-Sean",
} as Env;

/** One site entry in the shape verified live (cascade-auth-migration-plan.md section 1). */
function site(name: string) {
  return { id: "x", path: { path: name, siteId: "x" }, type: "site", recycled: false };
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

/**
 * First fetch is always listSites; a second, when it happens, is the
 * best-effort read/user email lookup. Returns the mock so tests can assert
 * on call shape.
 */
function mockFetch(listSitesBody: unknown, readUserBody?: unknown) {
  const mock = vi.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
    const url = String(input);
    if (url.endsWith("/api/v1/listSites")) return jsonResponse(listSitesBody);
    if (url.includes("/api/v1/read/user/")) {
      return jsonResponse(readUserBody ?? { success: false, message: "You do not have read permissions for the requested asset" });
    }
    throw new Error(`unexpected fetch: ${url}`);
  });
  vi.stubGlobal("fetch", mock);
  return mock;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("validateCascadeLogin", () => {
  it("accepts valid credentials when the docs site is in listSites", async () => {
    mockFetch({ sites: [site("_common"), site("DEV-Sean")], success: true });
    const result = await validateCascadeLogin("docstest", "pw", env);
    expect(result).toEqual({ ok: true, email: undefined });
  });

  it("returns the account's email when the user can read their own record", async () => {
    mockFetch(
      { sites: [site("DEV-Sean")], success: true },
      { asset: { user: { username: "docstest", email: "docstest@mchenry.edu" } }, success: true },
    );
    const result = await validateCascadeLogin("docstest", "pw", env);
    expect(result).toEqual({ ok: true, email: "docstest@mchenry.edu" });
  });

  it("rejects wrong credentials (verified live body)", async () => {
    mockFetch({ success: false, message: "The username or password is incorrect" });
    expect(await validateCascadeLogin("docstest", "wrong", env)).toEqual({ ok: "unauthorized" });
  });

  it("fails closed on success:false with any other message (never string-match the error)", async () => {
    mockFetch({ success: false, message: "Your user is not authorized to read system preferences." });
    expect(await validateCascadeLogin("docstest", "pw", env)).toEqual({ ok: "unauthorized" });
  });

  it("fails closed on an unrecognized response shape", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockFetch({ totally: "unexpected" });
    expect(await validateCascadeLogin("docstest", "pw", env)).toEqual({ ok: "unauthorized" });
  });

  it("fails closed when success:true but sites is malformed", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockFetch({ sites: [{ nope: true }], success: true });
    expect(await validateCascadeLogin("docstest", "pw", env)).toEqual({ ok: "unauthorized" });
  });

  it("returns forbidden when credentials are valid but the docs site is absent", async () => {
    mockFetch({ sites: [site("_common"), site("Campus Safety")], success: true });
    expect(await validateCascadeLogin("docstest", "pw", env)).toEqual({ ok: "forbidden" });
  });

  it("still logs in when the email lookup itself throws", async () => {
    const mock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/api/v1/listSites")) return jsonResponse({ sites: [site("DEV-Sean")], success: true });
      throw new Error("network blip");
    });
    vi.stubGlobal("fetch", mock);
    expect(await validateCascadeLogin("docstest", "pw", env)).toEqual({ ok: true, email: undefined });
  });

  it("sends credentials in the POST body, never the URL", async () => {
    const mock = mockFetch({ sites: [site("DEV-Sean")], success: true });
    await validateCascadeLogin("docstest", "hunter2", env);
    for (const [input, init] of mock.mock.calls) {
      expect(String(input)).not.toContain("hunter2");
      expect(init?.method).toBe("POST");
      expect(JSON.parse(String(init?.body))).toMatchObject({ authentication: { username: "docstest", password: "hunter2" } });
    }
  });

  it("throws (rather than returning a verdict) on a non-200 upstream response", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({ oops: true }, 502)));
    await expect(validateCascadeLogin("docstest", "pw", env)).rejects.toThrow("HTTP 502");
  });
});
