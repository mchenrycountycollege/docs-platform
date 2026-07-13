import type { CascadeConfig } from "@docs-platform/cascade-client";
import type { Env } from "./env.js";

export function cascadeConfigFromEnv(env: Env): CascadeConfig {
  return {
    baseUrl: env.CASCADE_BASE_URL,
    siteName: env.CASCADE_SITE_NAME,
    apiKey: env.CASCADE_API_KEY,
    documentationPageContentTypeId: env.CASCADE_DOC_CONTENT_TYPE_ID,
    navOutputContentTypeId: env.CASCADE_NAV_CONTENT_TYPE_ID,
  };
}
