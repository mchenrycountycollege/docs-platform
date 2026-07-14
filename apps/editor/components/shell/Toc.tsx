"use client";

import { slugify } from "@docs-platform/doc-shell";
import { useEffect, useState } from "react";

interface TocEntry {
  id: string;
  text: string;
}

/**
 * React port of runtime/toc.ts's initToc -- scans the rendered body's h2s
 * and assigns anchor ids via doc-shell's shared slugify, so an anchor link
 * generated here resolves identically on the public reader. Re-scans
 * whenever `bodyHtml` changes (new page, or a reconciled/edited body).
 */
export function Toc({ containerRef, bodyHtml }: { containerRef: React.RefObject<HTMLElement | null>; bodyHtml: string }) {
  const [entries, setEntries] = useState<TocEntry[]>([]);

  useEffect(() => {
    const content = containerRef.current;
    if (!content) {
      setEntries([]);
      return;
    }
    const headings = Array.from(content.querySelectorAll("h2"));
    const used = new Set<string>();
    const next: TocEntry[] = [];
    for (const heading of headings) {
      const base = slugify(heading.textContent || "section");
      let unique = base;
      let n = 2;
      while (used.has(unique)) unique = `${base}-${n++}`;
      used.add(unique);
      heading.id = unique;
      next.push({ id: unique, text: heading.textContent || "" });
    }
    setEntries(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyHtml]);

  if (entries.length === 0) return null;

  return (
    <div className="rail-box">
      <p className="rail-label">On this page</p>
      <ul className="toc-list">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`}>{entry.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
