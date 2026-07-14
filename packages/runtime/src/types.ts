// The nav + search data types now live in @docs-platform/doc-shell (the shared
// framework-agnostic shell logic), so the public reader and the editor
// front-door describe the same artifacts identically. Re-exported here so the
// rest of runtime keeps importing them from "./types.js" unchanged.
export type {
  NavFolder,
  NavPage,
  NavResponse,
  NavChapter,
  NavTree,
  SearchEntry,
  SearchResponse,
} from "@docs-platform/doc-shell";

export interface RuntimeConfig {
  path: string;
  title: string;
  searchUrl: string;
}
