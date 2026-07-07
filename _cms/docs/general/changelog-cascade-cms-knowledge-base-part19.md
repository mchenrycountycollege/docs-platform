---
parent: Changelog
section: 20240422
part: 19 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20240422

## 20240422

### Features/Improvements

-   Simplified ability/permission checking for editing Sites through the interface, the user must have WRITE permission on the Site object itself. This is consistent with permission checking when editing Sites through Web Services.
-   Simplified ability/permission checking for exporting Sites through the interface, the user must have READ permission on the Site object itself.
-   Uploading images and other files through the asset chooser will no longer pre-fill the File's Display Name with its System Name. This will force users who upload images through the chooser to set Image Description or "alt" text.
-   Improved link checking efficiency during content checks, publishing and Broken Link Report generation. Also, updated XML Feed Blocks to use the same HTTP client library as link checking.

### Fixed

-   The [UnpublishAndDelete workflow trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/unpublish-and-delete-trigger.html) will now respect the authorizing type/user trigger parameters for non-publuishable assets, such as blocks. Additionally, the [Delete workflow trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/delete-trigger.html) will now allow for using the authorizing type/user trigger parameters.
-   Fixed an issue where certain Drafts would display an error *Missing message for key "prompt.asset.linkrewriting."*
-   Creating/editing an [Asset Factory](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/index.html) using Web Services will now allow for omitting a `folderPlacementPosition` (or using an explicit `null` value), allowing for placement the new asset in the parent folder's last position.
-   Improved handling of invalid XML while checking for broken links.
-   Moving/renaming a Folder or Container within Manage Site area will now update search indexes for descendants to prevent stale search information such as paths.
-   Link checking external URLs with special characters will no longer result in false positive broken links.
-   XML Block content will now undergo content checks.
-   The Siteimprove integration will now respect extensionless linking.
