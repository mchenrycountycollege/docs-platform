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

/**
 * BlockNote wrapper for editing a single docs page (editor-implementation-plan.md
 * sub-phase E1). Handles: loading canonical HTML into blocks, save with
 * server-authoritative normalize + optimistic-concurrency conflicts, and the
 * git-owned read-only banner. Structure ops (create/rename/move/delete) are
 * E2/E3 -- this component only edits an existing page's body.
 */
export function DocEditor({ path }: { path: string }) {
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
        setState({ status: "ready", page: { ...state.page, bodyHtml, version: result.version } });
        setConflict(null);
        setSavedAt(new Date());
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
    return <p>Loading…</p>;
  }

  if (state.status === "error") {
    return <p style={{ color: "crimson" }}>Error: {state.message}</p>;
  }

  const { page } = state;
  const isGitOwned = page.origin === "git";

  return (
    <div>
      {isGitOwned && (
        <div
          style={{
            background: "#fff3cd",
            border: "1px solid #ffe69c",
            borderRadius: 4,
            padding: "0.5rem 0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          This page is managed in <code>{page.sourceRepoPath ?? "a git repository"}</code>. Edit it there
          — changes made here would be overwritten on the next publish.
        </div>
      )}

      {conflict && (
        <div
          style={{
            background: "#f8d7da",
            border: "1px solid #f1aeb5",
            borderRadius: 4,
            padding: "0.5rem 0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          <p style={{ margin: "0 0 0.5rem" }}>
            Someone else saved this page since you loaded it. Reload to see their changes before saving again — your
            unsaved edits in this tab will be discarded.
          </p>
          <button type="button" onClick={() => void handleReloadAfterConflict()}>
            Reload
          </button>
        </div>
      )}

      {saveError && <p style={{ color: "crimson" }}>{saveError}</p>}

      <div style={{ border: "1px solid #e0e0e0", borderRadius: 4 }}>
        <BlockNoteView editor={editor} editable={!isGitOwned} theme="light" />
      </div>

      {!isGitOwned && (
        <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button type="button" onClick={() => void handleSave()} disabled={saving}>
            {saving ? "Saving…" : "Save & publish"}
          </button>
          {savedAt && <span style={{ color: "#2d7a2d" }}>Saved {savedAt.toLocaleTimeString()}</span>}
        </div>
      )}
    </div>
  );
}
