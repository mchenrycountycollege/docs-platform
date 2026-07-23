"use client";

import { useEffect, useRef } from "react";

const PAGE_PARAM = "p";

/**
 * The shareable URL for one page, as a root-relative string.
 *
 * A query param rather than a real nested path (`/docs/book/page`) because
 * the app is a static export and the Worker serves every non-`/api` path
 * straight from `env.ASSETS.fetch` with no SPA fallback -- a nested path
 * would 404. Keeping the path at `/` means `index.html` always loads and the
 * SPA reads the param client-side, so no Worker change is needed.
 *
 * Slashes are left literal (they're legal in a query string per RFC 3986, and
 * `URLSearchParams` decodes them either way) so a pasted link still reads as
 * `?p=docs/book/chapter/page` instead of a wall of `%2F`.
 */
export function pagePathToUrl(path: string): string {
  return `/?${PAGE_PARAM}=${encodeURIComponent(path).replace(/%2F/g, "/")}`;
}

/**
 * The page path encoded in a `location.search` string, or null if there isn't
 * a usable one. Only `docs/`-rooted values are accepted so a hand-edited or
 * junk param can't drive a bogus asset fetch.
 */
export function pagePathFromUrl(search: string): string | null {
  const value = new URLSearchParams(search).get(PAGE_PARAM);
  if (!value || !value.startsWith("docs/")) return null;
  return value;
}

/**
 * Keeps the browser URL and the shell's `openPath` in step, which is what
 * makes a page linkable at all: the front door is one client-rendered page
 * (app/page.tsx), so "opening" a page is state, not a route, and without this
 * the URL is always `/`.
 *
 * Login needs no special handling. `LoginForm` renders *in place* when
 * `auth === "out"` -- the URL never changes -- so a `?p=` link seeds
 * `openPath` immediately, the shell just doesn't fetch until signed in
 * (`usePageView(auth === "in" ? openPath : null, ...)`). The moment login
 * flips `auth` to `"in"`, the target page loads. "Log in first, then land on
 * the page" falls out for free.
 */
export function usePageUrlSync(openPath: string | null, setOpenPath: (path: string | null) => void): void {
  const initialized = useRef(false);

  useEffect(() => {
    // Read the URL only after mount (same reason as ShellChrome's navigator
    // check): Next's static export prerenders this to HTML at build time with
    // openPath = null, and only the browser knows the real URL. Branching on
    // it in the render body would trip React's hydration mismatch (#418).
    setOpenPath(pagePathFromUrl(window.location.search));

    // Back/forward moves between visited pages rather than leaving the app.
    function onPopState() {
      setOpenPath(pagePathFromUrl(window.location.search));
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // The first run lands in the same commit as the seed effect above, when
    // openPath is still the initial null -- writing here would erase the very
    // ?p= that was just read. Every later run is a real navigation.
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    // Already in agreement means a popstate drove this change; re-pushing
    // would add a duplicate history entry and fight the back button.
    if (pagePathFromUrl(window.location.search) === openPath) return;
    // pushState, not replaceState, so each page opened is its own history
    // entry. A null openPath (sign-out, or the open page being deleted)
    // rewrites back to a clean `/`.
    window.history.pushState({}, "", openPath ? pagePathToUrl(openPath) : "/");
  }, [openPath]);
}
