"use client";

import { useEffect, useRef, useState } from "react";
import type { NodeRendererProps } from "react-arborist";
import { Tree } from "react-arborist";
import {
  ApiUnauthorizedError,
  createFolder as apiCreateFolder,
  createPage as apiCreatePage,
  getTree,
  moveItem,
  reorderItems,
  type FolderEntry,
} from "../../lib/api";

const ROOT_PATH = "docs";

type ItemType = FolderEntry["type"] | "loading";

interface TreeNode {
  id: string;
  name: string;
  path: string;
  itemType: ItemType;
  /** Only present for folders -- pages/files/the loading placeholder are always leaves. */
  children?: TreeNode[];
  /** Only meaningful for folders: whether their real children have been fetched yet. */
  loaded?: boolean;
}

function dirnameOf(path: string): string {
  return path.slice(0, path.lastIndexOf("/")) || ROOT_PATH;
}

function nameSegment(path: string): string {
  return path.slice(path.lastIndexOf("/") + 1);
}

function depthOf(path: string): number {
  return path.split("/").length;
}

function loadingPlaceholder(parentPath: string): TreeNode {
  // "#" can't appear in a slugify()'d path segment, so this can't collide
  // with a real child's id.
  return { id: `${parentPath}#loading`, name: "Loading…", path: parentPath, itemType: "loading" };
}

function mapEntry(entry: FolderEntry): TreeNode {
  return {
    id: entry.path,
    name: entry.displayName,
    path: entry.path,
    itemType: entry.type,
    children: entry.type === "folder" ? [loadingPlaceholder(entry.path)] : undefined,
    loaded: entry.type === "folder" ? false : undefined,
  };
}

function findNode(node: TreeNode, id: string): TreeNode | null {
  if (node.id === id) return node;
  if (!node.children) return null;
  for (const child of node.children) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

/** Immutably replaces a folder node's children, wherever it is in the tree. */
function replaceChildren(node: TreeNode, targetPath: string, children: TreeNode[]): TreeNode {
  if (node.path === targetPath && node.itemType === "folder") {
    return { ...node, loaded: true, children };
  }
  if (!node.children) return node;
  let changed = false;
  const nextChildren = node.children.map((child) => {
    const next = replaceChildren(child, targetPath, children);
    if (next !== child) changed = true;
    return next;
  });
  return changed ? { ...node, children: nextChildren } : node;
}

export interface DocsTreeProps {
  /** Called when the user clicks/activates a page row. */
  onOpenPage: (path: string) => void;
  /** Called after a page this component moved/renamed lands at a new path, so the caller can re-point an already-open editor. */
  onPageMoved?: (fromPath: string, toPath: string) => void;
}

/**
 * react-arborist tree over docs/, lazily loaded one folder at a time via
 * GET /api/tree (editor-implementation-plan.md sub-phase E2). Fully
 * controlled: this component owns all tree state itself and persists every
 * mutation (create/rename/move/reorder) through the proxy before reflecting
 * it locally, rather than optimistically mutating and hoping the server
 * agrees.
 *
 * Known limitations (out of scope for E2): dropping at the very top level
 * (reparenting/reordering books themselves) is disabled -- there's no
 * `order` field for folders to persist book position against (see
 * nav-format.vm: chapter/book order follows Cascade's own folder position,
 * which this proxy doesn't expose a way to change). File attachments aren't
 * draggable/renameable yet either -- that's E3.
 */
export function DocsTree({ onOpenPage, onPageMoved }: DocsTreeProps) {
  const [root, setRoot] = useState<TreeNode>({
    id: ROOT_PATH,
    name: ROOT_PATH,
    path: ROOT_PATH,
    itemType: "folder",
    children: undefined,
    loaded: false,
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inFlight = useRef(new Set<string>());

  async function refreshFolder(path: string) {
    if (inFlight.current.has(path)) return;
    inFlight.current.add(path);
    try {
      const result = await getTree(path);
      const children = result.children.map(mapEntry);
      setRoot((prev) =>
        path === prev.path ? { ...prev, loaded: true, children } : replaceChildren(prev, path, children),
      );
    } catch (err) {
      setError(err instanceof ApiUnauthorizedError ? err.message : err instanceof Error ? err.message : String(err));
    } finally {
      inFlight.current.delete(path);
    }
  }

  useEffect(() => {
    void refreshFolder(ROOT_PATH);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleToggle(id: string) {
    const node = findNode(root, id);
    if (node && node.itemType === "folder" && !node.loaded) {
      void refreshFolder(node.path);
    }
  }

  const selectedNode = selectedId ? findNode(root, selectedId) : null;
  const selectedFolderPath = !selectedNode
    ? ROOT_PATH
    : selectedNode.itemType === "folder"
      ? selectedNode.path
      : dirnameOf(selectedNode.path);
  const canCreateChapter = selectedFolderPath !== ROOT_PATH && depthOf(selectedFolderPath) === 2;
  const canCreatePage = selectedFolderPath !== ROOT_PATH;

  async function handleNewBook() {
    const name = window.prompt("New book name:");
    if (!name?.trim()) return;
    try {
      await apiCreateFolder({ parentPath: ROOT_PATH, name: name.trim() });
      await refreshFolder(ROOT_PATH);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  async function handleNewChapter() {
    const name = window.prompt("New chapter name:");
    if (!name?.trim()) return;
    try {
      await apiCreateFolder({ parentPath: selectedFolderPath, name: name.trim() });
      await refreshFolder(selectedFolderPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  async function handleNewPage() {
    const title = window.prompt("New page title:");
    if (!title?.trim()) return;
    try {
      const created = await apiCreatePage({ parentPath: selectedFolderPath, title: title.trim() });
      await refreshFolder(selectedFolderPath);
      onOpenPage(created.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  async function handleRename({ id, name }: { id: string; name: string }) {
    const node = findNode(root, id);
    const trimmed = name.trim();
    if (!node || !trimmed) return;
    const parentPath = dirnameOf(node.path);

    if (node.itemType === "folder") {
      const result = await moveItem({ type: "folder", fromPath: node.path, toParentPath: parentPath, newName: trimmed });
      if (!result.ok) {
        setError(result.kind === "git-owned" ? "That item can't be renamed here." : result.message);
        return;
      }
      await refreshFolder(parentPath);
    } else if (node.itemType === "page") {
      const result = await moveItem({
        type: "page",
        fromPath: node.path,
        toParentPath: parentPath,
        newName: trimmed,
        title: trimmed,
      });
      if (!result.ok) {
        setError(
          result.kind === "git-owned"
            ? `This page is managed in ${result.repo ?? "a git repository"} and can't be renamed here.`
            : result.message,
        );
        return;
      }
      onPageMoved?.(node.path, result.path);
      await refreshFolder(parentPath);
    }
  }

  async function handleMove(args: { dragIds: string[]; parentId: string | null; index: number }) {
    const dragId = args.dragIds[0];
    if (!dragId) return;
    const dragged = findNode(root, dragId);
    if (!dragged || (dragged.itemType !== "page" && dragged.itemType !== "folder")) return;

    const destParentNode = args.parentId ? findNode(root, args.parentId) : root;
    if (!destParentNode) return;
    const destParentPath = destParentNode.path;
    const srcParentPath = dirnameOf(dragged.path);
    const isReparent = srcParentPath !== destParentPath;

    let finalPath = dragged.path;
    if (isReparent) {
      const result = await moveItem({
        type: dragged.itemType,
        fromPath: dragged.path,
        toParentPath: destParentPath,
        newName: nameSegment(dragged.path),
      });
      if (!result.ok) {
        setError(
          result.kind === "git-owned"
            ? `This page is managed in ${result.repo ?? "a git repository"} and can't be moved here.`
            : result.message,
        );
        await refreshFolder(srcParentPath); // resync -- the drag visually happened but the write didn't
        return;
      }
      finalPath = result.path;
      onPageMoved?.(dragged.path, finalPath);
    }

    // Recompute `order` for the destination folder's page siblings in their
    // final visual order (folders have no order field -- see the component
    // doc comment -- so this only actually changes anything for pages, but
    // folder entries still occupy a slot so relative page order is right).
    const destSiblingItems = (destParentNode.children ?? [])
      .filter((c): c is TreeNode & { itemType: "page" | "folder" } => c.itemType === "page" || c.itemType === "folder")
      .filter((c) => c.id !== dragId)
      .map((c) => ({ path: c.path, type: c.itemType }));
    const movedItem = { path: finalPath, type: dragged.itemType };
    const clampedIndex = Math.max(0, Math.min(args.index, destSiblingItems.length));
    const orderedItems = [
      ...destSiblingItems.slice(0, clampedIndex),
      movedItem,
      ...destSiblingItems.slice(clampedIndex),
    ];

    try {
      await reorderItems(orderedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }

    await refreshFolder(destParentPath);
    if (isReparent) await refreshFolder(srcParentPath);
  }

  return (
    <>
      <div className="sidebar-actions">
        <button type="button" onClick={() => void handleNewBook()}>
          + Book
        </button>
        <button type="button" onClick={() => void handleNewChapter()} disabled={!canCreateChapter}>
          + Chapter
        </button>
        <button type="button" onClick={() => void handleNewPage()} disabled={!canCreatePage}>
          + Page
        </button>
      </div>
      {error && (
        <p className="sidebar-error">
          {error} <button type="button" onClick={() => setError(null)}>dismiss</button>
        </p>
      )}
      <div className="sidebar-tree">
        <Tree<TreeNode>
          data={root.children ?? []}
          width="100%"
          height={640}
          rowHeight={30}
          openByDefault={false}
          disableMultiSelection
          onToggle={handleToggle}
          onSelect={(nodes) => setSelectedId(nodes[0]?.id ?? null)}
          onActivate={(node) => {
            if (node.data.itemType === "page") onOpenPage(node.data.path);
          }}
          onRename={(args) => void handleRename(args)}
          onMove={(args) => void handleMove(args)}
          disableEdit={(data) => data.itemType === "loading"}
          disableDrag={(data) => data.itemType === "loading" || data.itemType === "file"}
          disableDrop={({ parentNode }) =>
            parentNode.isRoot || parentNode.data.itemType !== "folder" || !parentNode.data.loaded
          }
        >
          {Row}
        </Tree>
      </div>
    </>
  );
}

function icon(node: NodeRendererProps<TreeNode>["node"]): string {
  switch (node.data.itemType) {
    case "folder":
      return node.isOpen ? "\u{1F4C2}" : "\u{1F4C1}";
    case "file":
      return "\u{1F4CE}";
    case "loading":
      return "";
    default:
      return "\u{1F4C4}";
  }
}

function Row({ node, style, dragHandle }: NodeRendererProps<TreeNode>) {
  const data = node.data;

  if (data.itemType === "loading") {
    return (
      <div style={{ ...style, opacity: 0.6, paddingLeft: 4 }} className="tree-row">
        Loading…
      </div>
    );
  }

  const isFolder = data.itemType === "folder";
  const rowClass = `tree-row${isFolder ? " folder-row" : ""}${node.isSelected ? " active" : ""}`;

  return (
    <div
      ref={dragHandle}
      style={style}
      className={rowClass}
      onClick={(e) => {
        node.handleClick(e);
        if (isFolder) node.toggle();
      }}
    >
      <span>{icon(node)}</span>
      {node.isEditing ? (
        <input
          autoFocus
          defaultValue={data.name}
          onClick={(e) => e.stopPropagation()}
          onBlur={() => node.reset()}
          onKeyDown={(e) => {
            if (e.key === "Escape") node.reset();
            if (e.key === "Enter") node.submit((e.target as HTMLInputElement).value);
          }}
        />
      ) : (
        <span
          onDoubleClick={(e) => {
            e.stopPropagation();
            if (node.isEditable) node.edit();
          }}
        >
          {data.name}
        </span>
      )}
    </div>
  );
}
