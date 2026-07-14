export { readManifest, removeManifestEntry, updateManifestEntry, type Manifest } from "./manifest.js";
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
