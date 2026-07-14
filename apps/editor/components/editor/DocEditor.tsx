"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useRef, useState } from "react";
import {
  ApiUnauthorizedError,
  getPage,
  imageDisplayUrl,
  savePage,
  uploadImage,
  type PageResult,
  type SavePageConflict,
} from "../../lib/api";
import { blocksToHtml, htmlToBlocks } from "../../lib/blocknote-html";
import { schema } from "../../lib/blocknote-schema";

type LoadState = { status: "loading" } | { status: "error"; message: string } | { status: "ready"; page: PageResult };

export interface DocEditorProps {
  path: string;
  /** Called with the saved page (E4/section 4b: the parent shows this instantly and schedules the background reconcile). */
  onSaved?: (page: PageResult) => void;
  /** Called when the author backs out without saving -- swaps the shell back to the read-only view, no API call. */
  onCancel?: () => void;
}

/**
 * BlockNote wrapper for editing a single docs page (editor-implementation-plan.md
 * sub-phase E1). Handles: loading canonical HTML into blocks, save with
 * server-authoritative normalize + optimistic-concurrency conflicts, and the
 * git-owned read-only banner. Structure ops (create/rename/move/delete) are
 * E2/E3 -- this component only edits an existing page's body.
 */
export function DocEditor({ path, onSaved, onCancel }: DocEditorProps) {
  const editor = useCreateBlockNote({
    schema,
    // E3 image upload: stores the file under docs/uploads/<book>/... and
    // returns the root-relative canonical path (same convention as the git
    // path / packages/runtime), which is what ends up in the saved bodyHtml.
    uploadFile: async (file) => (await uploadImage(file, path)).url,
    // That canonical path only resolves on the real public web server (its
    // hostname isn't wired into this app -- see worker.ts's GET /api/file
    // comment), so display inside the editor goes through the same-origin
    // proxy instead. Doesn't affect what gets saved -- blocksToFullHTML
    // exports the block's stored url, not this resolved display url.
    resolveFileUrl: async (url) => imageDisplayUrl(url),
  });

  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [conflict, setConflict] = useState<SavePageConflict | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  // Guards against a slow load response from a previous `path` clobbering
  // the editor after the user has already navigated to a different page.
  const requestId = useRef(0);

  async function load(targetPath: string) {
    const id = ++requestId.current;
    setState({ status: "loading" });
    setConflict(null);
    setSaveError(null);
    setSavedAt(null);
    try {
      const page = await getPage(targetPath);
      if (id !== requestId.current) return;
      const blocks = await htmlToBlocks(editor, page.bodyHtml);
      if (id !== requestId.current) return;
      editor.replaceBlocks(editor.document, blocks.length > 0 ? blocks : [{ type: "paragraph" }]);
      setState({ status: "ready", page });
    } catch (err) {
      if (id !== requestId.current) return;
      if (err instanceof ApiUnauthorizedError) {
        setState({ status: "error", message: err.message });
        return;
      }
      setState({ status: "error", message: err instanceof Error ? err.message : String(err) });
    }
  }

  useEffect(() => {
    void load(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  async function handleSave() {
    if (state.status !== "ready") return;
    setSaving(true);
    setSaveError(null);
    try {
      const bodyHtml = await blocksToHtml(editor, editor.document);
      const result = await savePage({ path, bodyHtml, expectedVersion: state.page.version });
      if (result.ok) {
        // The proxy takes ownership on every web save (see worker.ts's PUT
        // /page handler) -- mirror that here so a git-owned page's badge
        // flips immediately instead of waiting on PageView's reconcile
        // fetch, which only diffs bodyHtml/version and would miss this.
        const saved: PageResult = {
          ...state.page,
          bodyHtml,
          version: result.version,
          origin: "web",
          sourceRepoPath: undefined,
        };
        setState({ status: "ready", page: saved });
        setConflict(null);
        setSavedAt(new Date());
        onSaved?.(saved);
      } else if (result.kind === "conflict") {
        setConflict(result);
      } else if (result.kind === "git-owned") {
        setSaveError(`This page is now managed in ${result.repo ?? "a git repository"} and can't be saved here.`);
      } else {
        setSaveError(result.message);
      }
    } catch (err) {
      if (err instanceof ApiUnauthorizedError) {
        setSaveError(err.message);
      } else {
        setSaveError(err instanceof Error ? err.message : String(err));
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleReloadAfterConflict() {
    await load(path);
  }

  if (state.status === "loading") {
    return <p className="loading-hint">Loading…</p>;
  }

  if (state.status === "error") {
    return <p className="banner banner-error">Error: {state.message}</p>;
  }

  const { page } = state;
  const isGitOwned = page.origin === "git";

  return (
    <article className="content">
      {isGitOwned && (
        <p className="banner banner-git">
          Currently managed in <code>{page.sourceRepoPath ?? "a git repository"}</code>. Saving here takes ownership
          from git — the next publish of that source file will be rejected until it sets <code>takeover: true</code>.
        </p>
      )}

      {conflict && (
        <div className="banner banner-warn">
          <p style={{ margin: "0 0 0.5rem" }}>
            Someone else saved this page since you loaded it. Reload to see their changes before saving again — your
            unsaved edits in this tab will be discarded.
          </p>
          <button type="button" onClick={() => void handleReloadAfterConflict()}>
            Reload
          </button>
        </div>
      )}

      {saveError && <p className="banner banner-error">{saveError}</p>}

      <div style={{ border: "1px solid var(--border)", borderRadius: 8 }}>
        <BlockNoteView editor={editor} theme="light" />
      </div>

      <div className="edit-toolbar">
        <button type="button" className="save-btn" onClick={() => void handleSave()} disabled={saving}>
          {saving ? "Saving…" : "Save & publish"}
        </button>
        <button type="button" className="cancel-btn" onClick={() => onCancel?.()} disabled={saving}>
          Cancel
        </button>
        {savedAt && <span className="saved-hint">Saved {savedAt.toLocaleTimeString()}</span>}
      </div>
    </article>
  );
}
