"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useTheme } from "./useTheme";

/**
 * React port of runtime/chrome.ts + the Cascade Template's topbar/grid markup
 * (editor-implementation-plan.md section 4a) -- the editor's "front door"
 * shell, visually matched to the public reader's `.shell`/`.topbar`/
 * `.sidebar`/`.content-col`/`.rail` grid. Each slot is idiomatic React
 * (children props), not innerHTML -- see doc-shell's split notes on why the
 * two renderers share logic, not pixels-via-shared-DOM-code.
 */
export function ShellChrome({
  breadcrumb,
  sidebar,
  content,
  rail,
  onOpenSearch,
}: {
  breadcrumb: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
  rail?: ReactNode;
  onOpenSearch: () => void;
}) {
  const [, toggleTheme] = useTheme();
  const [navOpen, setNavOpen] = useState(false);
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  return (
    <div className={`shell${navOpen ? " nav-open" : ""}`}>
      <header className="topbar">
        <button
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
          className="icon-btn menu-toggle"
          type="button"
          onClick={() => setNavOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setNavOpen(false);
          }}
        >
          <strong>MCC</strong>
          <span>docs editor</span>
        </a>
        {breadcrumb}
        <button className="search-trigger" type="button" onClick={onOpenSearch}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M13 13l-3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          Search docs
          <kbd>{isMac ? "⌘K" : "Ctrl K"}</kbd>
        </button>
        <button aria-label="Toggle color theme" className="icon-btn" type="button" onClick={toggleTheme}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1.5v1.6M8 12.9v1.6M14.5 8h-1.6M3.1 8H1.5M12.6 3.4l-1.13 1.13M4.53 11.47L3.4 12.6M12.6 12.6l-1.13-1.13M4.53 4.53L3.4 3.4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <circle cx="8" cy="8" r="3.1" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
      </header>
      <nav aria-label="Documentation navigation" className="sidebar">
        {sidebar}
      </nav>
      <main className="content-col">{content}</main>
      {rail && <aside aria-label="Page information" className="rail">{rail}</aside>}
    </div>
  );
}
