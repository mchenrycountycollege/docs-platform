"use client";

import { deriveBookSlug } from "@docs-platform/doc-shell";
import { useEffect, useState } from "react";
import { Breadcrumb } from "../components/shell/Breadcrumb";
import { usePageView } from "../components/shell/PageView";
import { SearchPalette } from "../components/shell/SearchPalette";
import { ShellChrome } from "../components/shell/ShellChrome";
import { useBookNav } from "../components/shell/useBookNav";
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
  const { tree } = useBookNav(bookSlug);
  const { content, rail } = usePageView(openPath);

  return (
    <>
      <ShellChrome
        breadcrumb={<Breadcrumb tree={tree} currentPath={openPath} />}
        sidebar={
          <DocsTree
            onOpenPage={setOpenPath}
            onPageMoved={(fromPath, toPath) => {
              setOpenPath((current) => (current === fromPath ? toPath : current));
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
