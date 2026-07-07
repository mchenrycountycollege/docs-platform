---
parent: Changelog
section: 20230303
part: 43 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20230303

## 20230303

### Features/Improvements

-   Improved memory usage when deleting users with many drafts.
-   Temporary files, including those created during Site import and export, are cleaned up on a recurring basis.

### Fixed

-   Users can now unstar entities in bulk on the My Content screen without needing the [Site Role ability](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/role-abilities-in-cascade.html#SiteRoleAbilities) to multi-select delete.
-   The `WORKFLOW_LATEST_COMMENTS` [Workflow Email](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/custom-workflow-emails.html) placeholder will now function as expected during Workflow initialization. The `WORKFLOW_NEXT_STEP_NAME` placeholder has been removed. Existing usage of the `WORKFLOW_NEXT_STEP_NAME` placeholder will output as plaintext content until manually removed.
-   The LDAP syncing process will now process orphaned users with Normal and Custom authentication mode. Additionally, the `remove` LDAP orphaned user behavior has been deprecated and will fall back to `deactivate`, to prevent from accidentally mass deleting users during an erroneous LDAP sync. The `remove` behavior will be removed as a valid LDAP orphaned user behavior in a future release.
-   Images with a Base64 encoded `src` value will no longer be rewritten when viewing the WYSIWYG's HTML editor.
-   Addressed an issue where, under certain situations, caches were not properly discarded between publish jobs.
-   Title and "new window" values will no longer be removed when inserting links within announcements.
-   Addressed an issue where drag 'n drop to move within the Site's content tree would pre-select the wrong new parent folder.
