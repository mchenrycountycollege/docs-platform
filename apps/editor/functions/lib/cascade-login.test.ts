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

/** The probe denial Cascade returns for an account without Access Rights (verified live wording). */
const PROBE_DENIED = { success: false, message: "You do not have read permissions for the requested asset" };

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

/**
 * The three endpoints a login can touch, in call order: listSites
 * (authentication), read/folder of the docs root (authorization probe), and
 * the best-effort read/user email lookup. Returns the mock so tests can
 * assert on call shape.
 */
function mockFetch(opts: { listSites: unknown; probe?: unknown; readUser?: unknown }) {
  const mock = vi.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
    const url = String(input);
    if (url.endsWith("/api/v1/listSites")) return jsonResponse(opts.listSites);
    if (url.includes("/api/v1/read/folder/")) return jsonResponse(opts.probe ?? { success: true });
    if (url.includes("/api/v1/read/user/")) {
      return jsonResponse(opts.readUser ?? { success: false, message: "You do not have read permissions for the requested asset" });
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
  it("accepts valid credentials when the docs-folder probe succeeds", async () => {
    const mock = mockFetch({ listSites: { sites: [site("_common"), site("DEV-Sean")], success: true } });
    const result = await validateCascadeLogin("docstest", "pw", env);
    expect(result).toEqual({ ok: true, email: undefined });
    const probeCall = mock.mock.calls.find(([input]) => String(input).includes("/read/folder/"));
    expect(String(probeCall?.[0])).toContain("/api/v1/read/folder/DEV-Sean/docs");
  });

  it("accepts even when listSites omits the docs site (the REST-vs-UI discrepancy that motivated the probe)", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    mockFetch({ listSites: { sites: [site("_common"), site("Campus Safety")], success: true } });
    expect(await validateCascadeLogin("jreimer", "pw", env)).toEqual({ ok: true, email: undefined });
  });

  it("returns the account's email when the user can read their own record", async () => {
    mockFetch({
      listSites: { sites: [site("DEV-Sean")], success: true },
      readUser: { asset: { user: { username: "docstest", email: "docstest@mchenry.edu" } }, success: true },
    });
    const result = await validateCascadeLogin("docstest", "pw", env);
    expect(result).toEqual({ ok: true, email: "docstest@mchenry.edu" });
  });

  it("rejects wrong credentials (verified live body)", async () => {
    mockFetch({ listSites: { success: false, message: "The username or password is incorrect" } });
    expect(await validateCascadeLogin("docstest", "wrong", env)).toEqual({ ok: "unauthorized" });
  });

  it("fails closed on success:false with any other message (never string-match the error)", async () => {
    mockFetch({ listSites: { success: false, message: "Your user is not authorized to read system preferences." } });
    expect(await validateCascadeLogin("docstest", "pw", env)).toEqual({ ok: "unauthorized" });
  });

  it("fails closed on an unrecognized listSites response shape", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockFetch({ listSites: { totally: "unexpected" } });
    expect(await validateCascadeLogin("docstest", "pw", env)).toEqual({ ok: "unauthorized" });
  });

  it("returns forbidden when credentials are valid but the docs-folder probe is denied", async () => {
    mockFetch({ listSites: { sites: [site("_common")], success: true }, probe: PROBE_DENIED });
    expect(await validateCascadeLogin("docstest", "pw", env)).toEqual({ ok: "forbidden" });
  });

  it("fails closed (forbidden) on an unrecognized probe response shape", async () => {
    mockFetch({ listSites: { sites: [site("DEV-Sean")], success: true }, probe: { totally: "unexpected" } });
    expect(await validateCascadeLogin("docstest", "pw", env)).toEqual({ ok: "forbidden" });
  });

  it("still logs in when the email lookup itself throws", async () => {
    const mock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/api/v1/listSites")) return jsonResponse({ sites: [site("DEV-Sean")], success: true });
      if (url.includes("/api/v1/read/folder/")) return jsonResponse({ success: true });
      throw new Error("network blip");
    });
    vi.stubGlobal("fetch", mock);
    expect(await validateCascadeLogin("docstest", "pw", env)).toEqual({ ok: true, email: undefined });
  });

  it("sends credentials in the POST body, never the URL", async () => {
    const mock = mockFetch({ listSites: { sites: [site("DEV-Sean")], success: true } });
    await validateCascadeLogin("docstest", "hunter2", env);
    expect(mock.mock.calls.length).toBeGreaterThanOrEqual(3);
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

  it("throws when the probe itself hits a non-200 (no verdict from infrastructure errors)", async () => {
    const mock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/api/v1/listSites")) return jsonResponse({ sites: [site("DEV-Sean")], success: true });
      return jsonResponse({ oops: true }, 502);
    });
    vi.stubGlobal("fetch", mock);
    await expect(validateCascadeLogin("docstest", "pw", env)).rejects.toThrow("HTTP 502");
  });
});
