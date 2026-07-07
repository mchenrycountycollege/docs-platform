import type { CascadeConfig } from "./types.js";

/**
 * Cascade Cloud REST API v1 auth headers.
 *
 * ASSUMPTION (confirm during the Phase 0 live smoke test, adjust here if wrong):
 * the scoped service-account API key is sent as a bearer token. If the live
 * instance instead expects `authentication: { apiKey }` in each JSON body,
 * move that logic here and have `request()` in assets.ts merge it into the body
 * instead of headers — this is the single place that needs to change.
 */
export function buildAuthHeaders(config: CascadeConfig): Record<string, string> {
  return {
    Authorization: `Bearer ${config.apiKey}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}
