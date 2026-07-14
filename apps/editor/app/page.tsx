"use client";

import { useState } from "react";
import { DocEditor } from "../components/editor/DocEditor";
import { DocsTree } from "../components/tree/DocsTree";

// E2: a real book/chapter/page tree (react-arborist, lazily loaded via
// GET /api/tree) replaces E0's raw-JSON diagnostic. Create/rename/move/
// reorder all live in DocsTree; this component just wires "open a page" and
// "an open page moved" between the tree and the editor.

export default function Home() {
  const [openPagePath, setOpenPagePath] = useState<string | null>(null);
  const [manualPath, setManualPath] = useState("");

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "1.5rem", maxWidth: 1200, margin: "0 auto" }}>
      <h1>docs-platform editor</h1>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
        <aside style={{ width: 320, flexShrink: 0 }}>
          <DocsTree
            onOpenPage={setOpenPagePath}
            onPageMoved={(fromPath, toPath) => {
              setOpenPagePath((current) => (current === fromPath ? toPath : current));
            }}
          />

          <details style={{ marginTop: "1rem" }}>
            <summary>Open by path (debug)</summary>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setOpenPagePath(manualPath);
              }}
              style={{ marginTop: "0.5rem" }}
            >
              <input
                value={manualPath}
                onChange={(e) => setManualPath(e.target.value)}
                placeholder="docs/some-book/some-page"
                style={{ width: "100%" }}
              />
              <button type="submit" style={{ marginTop: "0.25rem" }}>
                Open
              </button>
            </form>
          </details>
        </aside>

        <section style={{ flex: 1, minWidth: 0 }}>
          {openPagePath ? (
            <DocEditor key={openPagePath} path={openPagePath} />
          ) : (
            <p style={{ color: "#666" }}>Select a page from the tree, or create a new one.</p>
          )}
        </section>
      </div>
    </main>
  );
}
