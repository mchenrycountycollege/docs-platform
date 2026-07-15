"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useSidebarWidth } from "./useSidebarWidth";
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
  bionicOn,
  onToggleBionic,
}: {
  breadcrumb: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
  rail?: ReactNode;
  onOpenSearch: () => void;
  bionicOn: boolean;
  onToggleBionic: () => void;
}) {
  const [, toggleTheme] = useTheme();
  const [navOpen, setNavOpen] = useState(false);
  const { width: sidebarWidth, onDragStart, onDragMove, onDragEnd } = useSidebarWidth();
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    if (!resizing) return;
    function handleMove(e: PointerEvent) {
      onDragMove(e.clientX);
    }
    function handleUp() {
      setResizing(false);
      onDragEnd();
    }
    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);
    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizing]);
  // Read navigator only after mount (matching useTheme's pattern above) --
  // this is a "use client" component, but Next's static export still
  // prerenders it to HTML at build time in Node, where navigator is either
  // absent or doesn't match the visiting browser's. Branching on it directly
  // in the render body bakes a value in that can disagree with the
  // client-side render, tripping React's hydration-mismatch error (#418).
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  return (
    <div
      className={`shell${navOpen ? " nav-open" : ""}`}
      style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}
    >
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
        <button
          aria-label="Toggle bionic reading"
          aria-pressed={bionicOn}
          className="icon-btn"
          type="button"
          onClick={onToggleBionic}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <text x="0" y="12" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="currentColor">
              B
            </text>
            <text x="8" y="12" fontFamily="sans-serif" fontSize="11" fontWeight="400" fill="currentColor">
              r
            </text>
          </svg>
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
        <div
          className={`sidebar-resize-handle${resizing ? " dragging" : ""}`}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize navigation sidebar"
          onPointerDown={(e) => {
            e.preventDefault();
            setResizing(true);
            onDragStart(e.clientX);
          }}
        />
      </nav>
      <main className="content-col">{content}</main>
      {rail && <aside aria-label="Page information" className="rail">{rail}</aside>}
    </div>
  );
}
