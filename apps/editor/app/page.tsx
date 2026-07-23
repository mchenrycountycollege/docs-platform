"use client";

import { deriveBookSlug } from "@docs-platform/doc-shell";
import { useEffect, useState } from "react";
import { logout, setOnUnauthorized, whoAmI, type Me } from "../lib/api";
import { Breadcrumb } from "../components/shell/Breadcrumb";
import { LoginForm } from "../components/shell/LoginForm";
import { usePageView } from "../components/shell/PageView";
import { SearchPalette } from "../components/shell/SearchPalette";
import { ShellChrome } from "../components/shell/ShellChrome";
import { useBionicPreference } from "../components/shell/useBionic";
import { useBookNav } from "../components/shell/useBookNav";
import { usePageUrlSync } from "../components/shell/usePageUrlSync";
import { DocsTree } from "../components/tree/DocsTree";

// The front door (editor-implementation-plan.md section 4a, "editor-as-
// front-door + shared shell"): a single client-rendered page, not a router
// with per-page routes -- "opening" a page is a state change inside the same
// shell (sidebar/breadcrumb/⌘K/ToC persist), matching "no separate editor
// screen, no context switch" from the plan. Every page opens read-only by
// default (usePageView); "Edit this page" swaps the body in place.
export default function Home() {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Makes the open page shareable: mirrors openPath into `?p=<asset-path>`
  // and seeds it back from the URL on load. Deliberately above the auth gate
  // -- a signed-out recipient's link seeds openPath, LoginForm renders in
  // place (the URL survives), and the page loads the moment auth flips in.
  usePageUrlSync(openPath, setOpenPath);

  // Auth gate (cascade-auth-migration-plan.md section 3): probe the session
  // once on mount, and let any /api 401 mid-session (expiry, logout in
  // another tab) flip the whole shell back to the login form. "checking"
  // renders nothing rather than flashing the form at signed-in users.
  const [auth, setAuth] = useState<"checking" | "in" | "out">("checking");
  const [me, setMe] = useState<Me | null>(null);
  useEffect(() => {
    setOnUnauthorized(() => setAuth("out"));
    whoAmI()
      .then((who: Me | null) => {
        setMe(who);
        setAuth(who ? "in" : "out");
      })
      .catch(() => setAuth("out"));
    return () => setOnUnauthorized(null);
  }, []);

  async function handleSignOut() {
    // Clear local state even if the network call fails -- the cookie clear is
    // best-effort, and the login form is the right place to land either way.
    try {
      await logout();
    } finally {
      setMe(null);
      setOpenPath(null);
      setAuth("out");
    }
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const bookSlug = openPath ? deriveBookSlug(openPath) : null;
  // Hooks must run unconditionally, so the gate returns are below them; the
  // shell's children only fetch once rendered, so nothing hits /api while
  // logged out.
  const { tree } = useBookNav(auth === "in" ? bookSlug : null);
  const [bionicOn, toggleBionic] = useBionicPreference();
  const { content, rail } = usePageView(auth === "in" ? openPath : null, bionicOn);

  if (auth === "checking") return null;
  if (auth === "out") {
    return (
      <LoginForm
        onLoggedIn={(who) => {
          setMe(who);
          setAuth("in");
        }}
      />
    );
  }

  return (
    <>
      <ShellChrome
        breadcrumb={<Breadcrumb tree={tree} currentPath={openPath} />}
        bionicOn={bionicOn}
        onToggleBionic={toggleBionic}
        username={me?.username}
        onSignOut={() => void handleSignOut()}
        sidebar={
          <DocsTree
            onOpenPage={setOpenPath}
            onPageMoved={(fromPath, toPath) => {
              setOpenPath((current) => (current === fromPath ? toPath : current));
            }}
            onDeleted={(path) => {
              // Prefix match, not just equality: deleting a chapter/book must
              // also close a page that was open somewhere inside it.
              setOpenPath((current) =>
                current === path || current?.startsWith(`${path}/`) ? null : current,
              );
            }}
          />
        }
        content={content}
        rail={rail}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} onSelect={setOpenPath} />
    </>
  );
}
