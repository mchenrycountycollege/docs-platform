"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { DocEditor } from "../editor/DocEditor";
import { ApiUnauthorizedError, getPage, reconcilePage, withDisplayableImages, type PageResult } from "../../lib/api";
import { applyBionic } from "./useBionic";
import { BackToTop } from "./BackToTop";
import { Toc } from "./Toc";
import { pagePathToUrl } from "./usePageUrlSync";

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

/** How long "Copy link" stays flipped to "Copied!" before reverting. */
const COPIED_RESET_MS = 2000;

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
export function usePageView(path: string | null, bionicOn: boolean): { content: ReactNode; rail: ReactNode | null } {
  const [state, setState] = useState<LoadState>({ status: "empty" });
  const [editing, setEditing] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const requestId = useRef(0);
  const reconcileTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pristineBodyHtml = useRef<string | null>(null);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reconcileTimer.current) clearTimeout(reconcileTimer.current);
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
    setCopied(false);
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
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, [path]);

  // React only re-sets .docs-body's innerHTML via dangerouslySetInnerHTML
  // when the bodyHtml string itself changes (new page, save, or reconcile) --
  // that's a fresh, unbolded render we treat as the new pristine copy. A bare
  // on/off toggle doesn't touch bodyHtml, so it can't rely on React to revert
  // the DOM; the second effect below does that manually from the captured copy.
  const currentBodyHtml = state.status === "ready" && !editing ? state.page.bodyHtml : null;

  useEffect(() => {
    const body = bodyRef.current;
    if (!body || currentBodyHtml === null) return;
    pristineBodyHtml.current = body.innerHTML;
    if (bionicOn) applyBionic(body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBodyHtml]);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body || pristineBodyHtml.current === null) return;
    if (bionicOn) {
      applyBionic(body);
    } else {
      body.innerHTML = pristineBodyHtml.current;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bionicOn]);

  // Must be referentially stable across renders that don't change the body
  // itself (sidebar tree/breadcrumb/search updates, theme toggle, etc.) --
  // React re-applies dangerouslySetInnerHTML whenever this object is a new
  // reference, even if the string content is identical, which would blow
  // away Toc's imperative heading.id assignments (and Bionic's <b>-wrapped
  // text) on the very next unrelated re-render.
  const bodyHtmlProp = useMemo(
    () => ({ __html: withDisplayableImages(currentBodyHtml ?? "") }),
    [currentBodyHtml],
  );

  async function handleCopyLink(pagePath: string) {
    const url = `${window.location.origin}${pagePathToUrl(pagePath)}`;
    // navigator.clipboard only exists in a secure context (https / localhost).
    // Over plain http or in an older browser there's nothing to write to, so
    // fall back to a prompt the recipient can copy out of by hand.
    if (!navigator.clipboard) {
      window.prompt("Copy this link:", url);
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

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
            // authorEmail is part of the comparison because the optimistic
            // copy carries the *previous* editor's attribution (DocEditor
            // spreads the pre-save page) -- without it, a save whose HTML
            // round-trips unchanged would leave the stale byline on screen.
            return stored.bodyHtml === current.page.bodyHtml &&
              stored.version === current.page.version &&
              stored.authorEmail === current.page.authorEmail
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
        <div className="content-actions">
          <button
            type="button"
            className="copy-link"
            aria-live="polite"
            onClick={() => void handleCopyLink(page.path)}
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
          <button type="button" className="edit-toggle" onClick={() => setEditing(true)}>
            Edit this page
          </button>
        </div>
      </header>

      <div className="docs-body" ref={bodyRef} dangerouslySetInnerHTML={bodyHtmlProp} />
      <BackToTop />
    </article>
  );

  // Both write paths stamp authorEmail (web: session username-or-email, git:
  // commit author); editorName is a legacy field only the Phase-0 smoke
  // script ever set, kept as a fallback for those early assets.
  const lastEditedBy = page.authorEmail ?? page.editorName;

  const rail = (
    <>
      {page.sourceRepoPath && (
        <div className="rail-box">
          <p className="rail-label">Source file</p>
          <span className="source-path">{page.sourceRepoPath}</span>
        </div>
      )}
      {lastEditedBy && (
        <div className="rail-box">
          <p className="rail-label">Last edited by</p>
          <span className="rail-author">{lastEditedBy}</span>
        </div>
      )}
      <Toc containerRef={bodyRef} bodyHtml={page.bodyHtml} />
    </>
  );

  return { content, rail };
}
