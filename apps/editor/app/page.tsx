"use client";

import { useEffect, useState } from "react";
import { DocEditor } from "../components/editor/DocEditor";

// E1: real BlockNote editing UI for a single page, given its path. The tree
// section below is still the E0 diagnostic -- react-arborist + a proper
// split-view tree/editor layout is E2 (project-management/editor-implementation-plan.md).

const boxStyle: React.CSSProperties = {
  background: "#f4f4f4",
  padding: "1rem",
  overflowX: "auto",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url);
  const data: unknown = await res.json();
  if (!res.ok) {
    const message =
      data !== null && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : `HTTP ${res.status}`;
    throw new Error(message);
  }
  return data;
}

export default function Home() {
  const [treePath, setTreePath] = useState("docs");
  const [tree, setTree] = useState<unknown>(null);
  const [treeError, setTreeError] = useState<string | null>(null);

  const [pagePathInput, setPagePathInput] = useState("");
  const [openPagePath, setOpenPagePath] = useState<string | null>(null);

  async function loadTree(path: string) {
    setTreeError(null);
    try {
      setTree(await fetchJson(`/api/tree?path=${encodeURIComponent(path)}`));
    } catch (err) {
      setTree(null);
      setTreeError(err instanceof Error ? err.message : String(err));
    }
  }

  useEffect(() => {
    loadTree(treePath);
    // Load once on mount with the initial path; loadTree() is re-triggered
    // explicitly by the form submit handler below, not by this effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
      <h1>docs-platform editor</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Browse (E0 diagnostic -- tree UI arrives in E2)</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void loadTree(treePath);
          }}
        >
          <input value={treePath} onChange={(e) => setTreePath(e.target.value)} style={{ width: 300 }} />
          <button type="submit">Load</button>
        </form>
        {treeError && <p style={{ color: "crimson" }}>Error: {treeError}</p>}
        <pre style={boxStyle}>{tree ? JSON.stringify(tree, null, 2) : "..."}</pre>
      </section>

      <section>
        <h2>Edit a page</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpenPagePath(pagePathInput);
          }}
        >
          <input
            value={pagePathInput}
            onChange={(e) => setPagePathInput(e.target.value)}
            placeholder="docs/some-book/some-page"
            style={{ width: 300 }}
          />
          <button type="submit">Open</button>
        </form>
        {openPagePath && <DocEditor key={openPagePath} path={openPagePath} />}
      </section>
    </main>
  );
}
