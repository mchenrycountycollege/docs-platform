"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { DocEditor } from "../editor/DocEditor";
import { ApiUnauthorizedError, getPage, reconcilePage, withDisplayableImages, type PageResult } from "../../lib/api";
import { Toc } from "./Toc";

type LoadState =
  | { status: "empty" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; page: PageResult };

// How long to wait before the background reconcile fetch (editor-
// implementation-plan.md section 4b): long enough that the proxy's
// publish-sequence (page -> nav.json -> search-index.json -> tags.json) has
// realistically settled, short enough the author isn't left looking at a
// stale copy for long if normalizeHtml did adjust anything.
const RECONCILE_DELAY_MS = 6000;

/**
 * The reader-shell "route" for one page (editor-implementation-plan.md E4):
 * read-only by default, "Edit this page" swaps the body into DocEditor's
 * BlockNote view in place -- no route change, same shell. Owns the
 * instant-render + background-reconcile save model from section 4b: on save
 * the just-authored HTML renders immediately (zero round trip), then a
 * silent re-fetch after the publish window reconciles the on-screen body
 * against what's actually stored, in case server-side normalizeHtml
 * adjusted anything the optimistic copy wouldn't reflect.
 *
 * Returns `{ content, rail }` rather than one node because ShellChrome's
 * `.content-col` and `.rail` are separate grid columns (matching the public
 * reader's layout) -- both slots share this one load/edit state, so this is
 * a hook rather than two components that would need to duplicate it.
 */
export function usePageView(path: string | null): { content: ReactNode; rail: ReactNode | null } {
  const [state, setState] = useState<LoadState>({ status: "empty" });
  const [editing, setEditing] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const requestId = useRef(0);
  const reconcileTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reconcileTimer.current) clearTimeout(reconcileTimer.current);
    if (!path) {
      setState({ status: "empty" });
      setEditing(false);
      return;
    }

    const id = ++requestId.current;
    setState({ status: "loading" });
    setEditing(false);

    getPage(path)
      .then((page) => {
        if (id !== requestId.current) return;
        setState({ status: "ready", page });
      })
      .catch((err) => {
        if (id !== requestId.current) return;
        setState({
          status: "error",
          message: err instanceof ApiUnauthorizedError ? err.message : err instanceof Error ? err.message : String(err),
        });
      });

    return () => {
      if (reconcileTimer.current) clearTimeout(reconcileTimer.current);
    };
  }, [path]);

  function handleSaved(saved: PageResult) {
    if (!path) return;
    // Instant half: show the just-authored copy immediately, no round trip.
    setState({ status: "ready", page: saved });
    setEditing(false);

    // Background-reconcile half: quietly re-fetch once the publish sequence
    // has had time to settle and swap in the stored copy if it differs.
    // Silent on match, no modal on a divergence either -- just updates.
    if (reconcileTimer.current) clearTimeout(reconcileTimer.current);
    reconcileTimer.current = setTimeout(() => {
      reconcilePage(path)
        .then((stored) => {
          setState((current) => {
            if (current.status !== "ready" || current.page.path !== path) return current;
            return stored.bodyHtml === current.page.bodyHtml && stored.version === current.page.version
              ? current
              : { status: "ready", page: stored };
          });
        })
        .catch(() => {
          // Best-effort: leave the optimistic copy on screen rather than surfacing a transient error for a silent background op.
        });
    }, RECONCILE_DELAY_MS);
  }

  if (state.status === "empty") {
    return {
      content: (
        <div className="empty-state">
          <h2>Pick a page to get started</h2>
          <p>Browse the tree on the left, or search with ⌘K. You can also create a new book or page from the sidebar.</p>
        </div>
      ),
      rail: null,
    };
  }

  if (state.status === "loading") {
    return { content: <p className="loading-hint">Loading…</p>, rail: null };
  }

  if (state.status === "error") {
    return { content: <p className="banner banner-error">{state.message}</p>, rail: null };
  }

  const { page } = state;
  const isGitOwned = page.origin === "git";

  if (editing) {
    return {
      content: <DocEditor path={path as string} onSaved={handleSaved} onCancel={() => setEditing(false)} />,
      rail: null,
    };
  }

  const content = (
    <article className="content">
      <header className="content-header">
        <div>
          <h1>{page.title}</h1>
          {page.tags.length > 0 && (
            <ul className="doc-tags">
              {page.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>
        <button type="button" className="edit-toggle" onClick={() => setEditing(true)}>
          Edit this page
        </button>
      </header>

      {isGitOwned && (
        <p className="banner banner-git">
          Currently managed in <code>{page.sourceRepoPath ?? "a git repository"}</code>. Saving a change here takes
          ownership from git — the next publish of that source file will be rejected until it sets{" "}
          <code>takeover: true</code>.
        </p>
      )}

      <div className="docs-body" ref={bodyRef} dangerouslySetInnerHTML={{ __html: withDisplayableImages(page.bodyHtml) }} />
    </article>
  );

  const rail = (
    <>
      <div className="rail-box">
        <p className="rail-label">Page info</p>
        {isGitOwned ? (
          <span className="origin-badge">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Published via git
          </span>
        ) : (
          <span className="source-path">Edited in this app</span>
        )}
        {page.sourceRepoPath && <span className="source-path">{page.sourceRepoPath}</span>}
      </div>
      <Toc containerRef={bodyRef} bodyHtml={page.bodyHtml} />
    </>
  );

  return { content, rail };
}
