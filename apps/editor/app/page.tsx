"use client";

import { useEffect, useState } from "react";

// E0 diagnostic only: proves the Function proxy + Access JWT verification +
// readFolder/readPage wiring work end-to-end against the live Cascade
// instance. Real BlockNote/react-arborist UI arrives in E1+
// (project-management/editor-implementation-plan.md).

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

  const [pagePath, setPagePath] = useState("");
  const [page, setPage] = useState<unknown>(null);
  const [pageError, setPageError] = useState<string | null>(null);

  async function loadTree(path: string) {
    setTreeError(null);
    try {
      setTree(await fetchJson(`/api/tree?path=${encodeURIComponent(path)}`));
    } catch (err) {
      setTree(null);
      setTreeError(err instanceof Error ? err.message : String(err));
    }
  }

  async function loadPage(path: string) {
    if (!path) return;
    setPageError(null);
    try {
      setPage(await fetchJson(`/api/page?path=${encodeURIComponent(path)}`));
    } catch (err) {
      setPage(null);
      setPageError(err instanceof Error ? err.message : String(err));
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
      <h1>docs-platform editor -- E0 diagnostic</h1>
      <p>Proxy wiring check only. No editing UI yet.</p>

      <section style={{ marginBottom: "2rem" }}>
        <h2>GET /api/tree</h2>
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
        <h2>GET /api/page</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void loadPage(pagePath);
          }}
        >
          <input
            value={pagePath}
            onChange={(e) => setPagePath(e.target.value)}
            placeholder="docs/some-book/some-page"
            style={{ width: 300 }}
          />
          <button type="submit">Load</button>
        </form>
        {pageError && <p style={{ color: "crimson" }}>Error: {pageError}</p>}
        <pre style={boxStyle}>{page ? JSON.stringify(page, null, 2) : "..."}</pre>
      </section>
    </main>
  );
}
