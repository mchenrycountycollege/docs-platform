# Shareable, login-gated page links (editor front-door app)

## Context

People want to copy a link to a specific docs page and send it to a coworker. The recipient should land **straight on that book → chapter → page** if they're signed in, and be sent through **login first, then to that page** if they're not.

The target is the **editor front-door app** (`apps/editor`, the login-gated Next.js static-export SPA on `*.pages.dev`) — confirmed with the user. Two facts about how it works today make this feature small:

- **There is no URL for a specific page.** The whole app is one client-rendered page ([app/page.tsx](../apps/editor/app/page.tsx)). "Opening" a page is React state (`openPath`), so the browser URL is always `/` and nothing is shareable. This is the only real gap.
- **Login is in-place, not a route.** When `auth === "out"`, [app/page.tsx:76-85](../apps/editor/app/page.tsx#L76-L85) renders `<LoginForm>` in the same page — the URL never changes. So once the open page is encoded in the URL, that URL survives the entire login, and "log in first, then land on the page" falls out **for free**: we just re-open from the URL once `auth` flips to `"in"`.

There is no existing share/copy/permalink UI anywhere (confirmed by search), and no return-to/next-URL handling — this is greenfield.

## Approach

Encode the open page in the URL as a query param `?p=<asset-path>` (e.g. `/?p=docs/docs-platform/getting-started/hello-world`), keep it in sync with `openPath`, add a "Copy link" button, and let the existing in-place login do the redirect work.

**Why a query param (`?p=`), not a real path** like `/docs/book/page`: the app is a static export served by the Worker via `env.ASSETS.fetch` for every non-`/api` path ([worker.ts:926-934](../apps/editor/functions/worker.ts#L926-L934)). A real nested path would 404 (no matching static file, no SPA fallback in the Worker). `?p=...` keeps the path at `/`, so `index.html` always loads and the SPA reads the param client-side. No Worker changes needed. The asset path is exactly the `openPath` string already used everywhere (`docs/<book>/<chapter>/<page>`), and `deriveBookSlug` ([packages/doc-shell/src/nav.ts:5](../packages/doc-shell/src/nav.ts#L5)) already derives the book from it.

### 1. URL ↔ `openPath` sync — new hook + wire into `app/page.tsx`

Add a small hook `apps/editor/components/shell/usePageUrlSync.ts` (mirrors the existing `useBookNav`/`useTheme` hook style) that takes `openPath` and `setOpenPath` and:

- **On mount (effect, not a lazy `useState` initializer):** read `?p=` from `location.search` and `setOpenPath(param)`. Reading the URL in a mount effect — never in the render body — avoids the static-prerender hydration mismatch that [ShellChrome.tsx:60-69](../apps/editor/components/shell/ShellChrome.tsx#L60-L69) already documents (React #418): the build-time HTML has `openPath = null`, and only the browser knows the real URL.
- **Register a `popstate` listener:** on back/forward, re-read `?p=` and `setOpenPath`, so browser history navigates between pages.
- **On `openPath` change (effect):** if `openPath` differs from the current `?p=` value, `history.pushState({}, "", newUrl)` (pushState so back/forward works). When a `popstate` sets `openPath` to already match the URL, this effect is a no-op — no feedback loop. `openPath === null` (e.g. after sign-out) rewrites the URL to `/`.

Add two pure, unit-testable helpers in the same file: `pagePathToUrl(path)` → `` `/?p=${encodeURIComponent(path)}` `` and `pagePathFromUrl(search)` → the decoded path or `null` (accept only values starting with `docs/`, so a junk param can't drive a bogus fetch).

Wire it into [app/page.tsx](../apps/editor/app/page.tsx) next to the existing `openPath` state: `usePageUrlSync(openPath, setOpenPath)`. **No change to the auth gate is required** — `openPath` gets seeded from the URL even while `auth` is `"checking"`/`"out"`, but the shell already only fetches when signed in (`usePageView(auth === "in" ? openPath : null, …)` at [app/page.tsx:73](../apps/editor/app/page.tsx#L73)). So a logged-out recipient's `?p=` link seeds `openPath`, `LoginForm` shows, and the moment login sets `auth = "in"` the target page loads. The existing sign-out already sets `openPath = null` ([app/page.tsx:49](../apps/editor/app/page.tsx#L49)), which the sync effect turns into a clean `/`.

### 2. "Copy link" button — `PageView.tsx`

In the article header `.content-header` next to the existing "Edit this page" button ([PageView.tsx:176-190](../apps/editor/components/shell/PageView.tsx#L176-L190)), add a "Copy link" button:

- Build the absolute URL: `` `${window.location.origin}${pagePathToUrl(path)}` `` (reuse the helper from step 1; `path` is already in scope in `usePageView`).
- `await navigator.clipboard.writeText(url)`, then flip a local `copied` state to show "Copied!" for ~2s. Guard for `navigator.clipboard` being unavailable (older/insecure contexts) — fall back to leaving the URL selectable, or a `prompt`. Keep it a plain `<button>` styled like `edit-toggle`.

### Out of scope for v1 (note, don't build)

- **Sidebar auto-reveal:** [DocsTree](../apps/editor/components/tree/DocsTree.tsx) lazy-loads folders with `openByDefault={false}`, so a deep-linked page won't auto-expand the tree to highlight itself. The **breadcrumb still shows the full location** (it derives from `openPath` + book nav — [Breadcrumb.tsx](../apps/editor/components/shell/Breadcrumb.tsx)), so orientation isn't lost. Auto-expanding the tree to the active page is a separate enhancement.
- **Invalid / no-access `?p=`:** falls through to `usePageView`'s existing error banner ([PageView.tsx:161-163](../apps/editor/components/shell/PageView.tsx#L161-L163)) via `getPage`'s failure. Acceptable for v1; a friendlier "page not found or you don't have access" message could come later.
- The **published public docs site** already has real per-page URLs and is a separate renderer — untouched here.

## Files to change

- **New:** `apps/editor/components/shell/usePageUrlSync.ts` — the sync hook + `pagePathToUrl` / `pagePathFromUrl` helpers.
- **New:** `apps/editor/components/shell/usePageUrlSync.test.ts` — unit tests for the two pure helpers (round-trip encode/decode, `docs/`-prefix rejection, `null` cases). Matches the repo's colocated `*.test.ts` vitest convention.
- **Edit:** [apps/editor/app/page.tsx](../apps/editor/app/page.tsx) — call `usePageUrlSync(openPath, setOpenPath)`.
- **Edit:** [apps/editor/components/shell/PageView.tsx](../apps/editor/components/shell/PageView.tsx) — "Copy link" button + `copied` state, reusing `pagePathToUrl`.

## Verification

1. `pnpm --filter @docs-platform/editor typecheck` and `pnpm --filter @docs-platform/editor test` — helper unit tests pass, no type errors.
2. **Full end-to-end** needs the Worker (login + `/api`), which `next dev` does not run. Build then serve with Pages:
   - `pnpm --filter @docs-platform/editor build`
   - `pnpm --filter @docs-platform/editor pages:dev` (uses `.dev.vars` for `SESSION_SECRET` + Cascade creds)
3. **Signed in:** open a page → URL shows `?p=docs/<book>/<chapter>/<page>`; click **Copy link** → "Copied!"; paste into a new tab → lands directly on the same page. Browser back/forward moves between visited pages.
4. **Signed out (incognito):** paste a `?p=…` link → `LoginForm` appears → sign in → lands **directly on that page**, not the empty "Pick a page" state.
5. **Sign out** from a deep-linked page → URL returns to `/` and the tree/empty state shows.
