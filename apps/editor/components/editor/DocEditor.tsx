"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useRef, useState } from "react";
import {
  ApiUnauthorizedError,
  getPage,
  savePage,
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
  const editor = useCreateBlockNote({ schema });

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
        const saved: PageResult = { ...state.page, bodyHtml, version: result.version };
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
          This page is managed in <code>{page.sourceRepoPath ?? "a git repository"}</code>. Edit it there — changes
          made here would be overwritten on the next publish.
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
        <BlockNoteView editor={editor} editable={!isGitOwned} theme="light" />
      </div>

      {!isGitOwned && (
        <div className="edit-toolbar">
          <button type="button" className="save-btn" onClick={() => void handleSave()} disabled={saving}>
            {saving ? "Saving…" : "Save & publish"}
          </button>
          <button type="button" className="cancel-btn" onClick={() => onCancel?.()} disabled={saving}>
            Cancel
          </button>
          {savedAt && <span className="saved-hint">Saved {savedAt.toLocaleTimeString()}</span>}
        </div>
      )}
    </article>
  );
}
