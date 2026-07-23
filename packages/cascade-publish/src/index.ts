// Manifest helpers moved to cascade-client (the web editor worker needs them
// without dragging this package's node-only git code into its bundle);
// re-exported here so existing consumers keep working.
export {
  readManifest,
  removeManifestEntries,
  removeManifestEntry,
  updateManifestEntry,
  type Manifest,
} from "@docs-platform/cascade-client";
export {
  archiveDoc,
  decideArchiveAction,
  type ArchiveAction,
  type ArchiveInput,
  type ArchiveResult,
} from "./archive.js";
export { parseDiffOutput, type ChangeType, type DocChange } from "./git-diff.js";
export {
  OwnershipConflictError,
  PathCollisionError,
  publishDoc,
  type PublishDocInput,
  type PublishDocResult,
} from "./publish-doc.js";
export { processDiff, type ProcessDiffInput, type ProcessDiffResult } from "./process-diff.js";
export { syncDoc, type SyncDocResult } from "./resolve-conflict.js";
