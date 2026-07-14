"use client";

import { createSearchIndex, type SearchEntry } from "@docs-platform/doc-shell";
import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { getSearchIndex } from "../../lib/api";

/**
 * cmdk-based ⌘K quick search (editor-implementation-plan.md section 4 stack,
 * "cmdk + Fuse command palette"). Loads the whole-site search index lazily on
 * first open and caches it (lib/api.ts's getSearchIndex), then filters with
 * doc-shell's createSearchIndex -- the same Fuse config the public reader's
 * ⌘K uses, so relevance behaves identically on both surfaces.
 */
export function SearchPalette({
  open,
  onOpenChange,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (path: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<SearchEntry[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || entries || loadError) return;
    getSearchIndex()
      .then(setEntries)
      .catch((err) => setLoadError(err instanceof Error ? err.message : String(err)));
  }, [open, entries, loadError]);

  const results = entries ? createSearchIndex(entries).search(query) : [];

  return (
    <Command.Dialog open={open} onOpenChange={onOpenChange} label="Search documentation" shouldFilter={false}>
      <Command.Input autoFocus value={query} onValueChange={setQuery} placeholder="Search documentation…" />
      <Command.List>
        {!entries && !loadError && <Command.Empty>Loading…</Command.Empty>}
        {loadError && <Command.Empty>Search is unavailable right now.</Command.Empty>}
        {entries && results.length === 0 && <Command.Empty>No pages match. Try a different term.</Command.Empty>}
        {results.map((entry) => (
          <Command.Item
            key={entry.path}
            value={entry.path}
            onSelect={() => {
              onSelect(entry.path);
              onOpenChange(false);
            }}
          >
            <div>{entry.title}</div>
            <div className="r-path">{entry.excerpt}</div>
          </Command.Item>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
