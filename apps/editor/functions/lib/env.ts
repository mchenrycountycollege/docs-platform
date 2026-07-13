/**
 * Cloudflare Pages Function bindings for apps/editor. Configured as Pages
 * project secrets/vars (project-management/editor-implementation-plan.md
 * section 7, item 2) -- never read from process.env, since Pages Functions
 * run on Workers, not Node.
 */
export interface Env {
  CASCADE_BASE_URL: string;
  CASCADE_SITE_NAME: string;
  CASCADE_API_KEY: string;
  CASCADE_DOC_CONTENT_TYPE_ID: string;
  CASCADE_NAV_CONTENT_TYPE_ID: string;
  /** The Access application's AUD tag, checked as the JWT audience. */
  ACCESS_AUD: string;
  /** e.g. "your-team.cloudflareaccess.com" -- used for both the JWKS URL and the expected `iss` claim. */
  ACCESS_TEAM_DOMAIN: string;
}
