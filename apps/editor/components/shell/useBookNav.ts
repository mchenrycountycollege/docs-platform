"use client";

import { buildTree, type NavTree } from "@docs-platform/doc-shell";
import { useEffect, useState } from "react";
import { getNav } from "../../lib/api";

/** Fetches + groups one book's nav (E-Shell's buildTree) for the breadcrumb and ToC. Re-fetches whenever the book changes; a stale in-flight request can't clobber a newer one. */
export function useBookNav(bookSlug: string | null): { tree: NavTree | null; loading: boolean } {
  const [tree, setTree] = useState<NavTree | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!bookSlug) {
      setTree(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    getNav(`docs/${bookSlug}`)
      .then((nav) => {
        if (cancelled) return;
        setTree(buildTree(nav));
      })
      .catch(() => {
        if (!cancelled) setTree(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [bookSlug]);

  return { tree, loading };
}
