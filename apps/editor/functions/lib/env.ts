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
  /**
   * HS256 signing key (32+ random bytes) for the app session cookie
   * (cascade-auth-migration-plan.md section 2.4). A Pages secret -- and per
   * the known Pages gotcha, `wrangler pages secret put` alone doesn't touch
   * the live deployment; a fresh `wrangler pages deploy` must follow.
   */
  SESSION_SECRET: string;
  /** The Access application's AUD tag, checked as the JWT audience. Unused since Cascade-backed login; delete at cleanup (plan section 5, step 7). */
  ACCESS_AUD: string;
  /** e.g. "your-team.cloudflareaccess.com". Unused since Cascade-backed login; delete at cleanup (plan section 5, step 7). */
  ACCESS_TEAM_DOMAIN: string;
}
