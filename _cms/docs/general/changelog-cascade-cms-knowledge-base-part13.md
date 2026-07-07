---
parent: Changelog
section: [v8.25.0](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.25.0/index.html)
part: 13 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.25.0](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.25.0/index.html)

## [v8.25.0](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.25.0/index.html)

### Features/Improvements

-   Simplified ability/permission checking for editing Sites through the interface, the user must have WRITE permission on the Site object itself. This is consistent with permission checking when editing Sites through Web Services.
-   Simplified ability/permission checking for exporting Sites through the interface, the user must have READ permission on the Site object itself.
-   Uploading images and other files through the asset chooser will no longer pre-fill the File's Display Name with its System Name. This will force users who upload images through the chooser to set Image Description or "alt" text.
-   Improved link checking efficiency during content checks, publishing and Broken Link Report generation. Also, updated XML Feed Blocks to use the same HTTP client library as link checking.
-   Upgraded image editing library to the latest version, 2024.04.
-   Improved stability of scheduling library, Quartz, for MySQL and Oracle.
-   Allowed for links to WYSIWYG Editor Configurations and Shared Fields to have leading slashes.
-   Upgraded various front-end libraries, including thosed used for the advanced code editor, date formatting and code formatting (via the advanced code editor).
-   The [external link check timeout](https://www.hannonhill.com/cascadecms/latest/cascade-administration/external-link-checking.html#Preferences) now has a maximum limit of 10 seconds and the [feed block request timeout system preference](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html#Content) or 20 seconds.
-   It is now possible to unpublish from Destinations using a [Database Transport](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html#DatabasePublishing) during asset move, rename and delete.
-   Publish Set files, pages and folders will now be sorted alphabetically while viewing and editing. Reading a Publish Set using Web Services will also sort the assets consistently.
-   Improved UX of [Workflows Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/workflows-report.html) filtering by updating visibility of filter options based on the selected status filter.
-   Added support for SQL Server 2022. Support for SQL Server 2016 is deprecated and will be removed in the next on-premise release on or after 1/1/2025.
-   Upgraded image editing library to the latest version, 2024.08.
-   The library used for [SFTP Transports](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html) has been upgraded for improved security and support for newer algorithms.

### Fixed

-   The [UnpublishAndDelete workflow trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/unpublish-and-delete-trigger.html) will now respect the authorizing type/user trigger parameters for non-publuishable assets, such as blocks. Additionally, the [Delete workflow trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/delete-trigger.html) will now allow for using the authorizing type/user trigger parameters.
-   Fixed an issue where certain Drafts would display an error *Missing message for key "prompt.asset.linkrewriting."*
-   Creating/editing an [Asset Factory](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/index.html) using Web Services will now allow for omitting a `folderPlacementPosition` (or using an explicit `null` value), allowing for placement the new asset in the parent folder's last position.
-   Improved handling of invalid XML while checking for broken links.
-   Moving/renaming a Folder or Container within Manage Site area will now update search indexes for descendants to prevent stale search information such as paths.
-   Link checking external URLs with special characters will no longer result in false positive broken links.
-   XML Block content will now undergo content checks.
-   The Siteimprove integration will now respect extensionless linking.
-   Addressed an issue in which spell checking would not properly handle empty content.
-   Fixed summary generation in Publish modals.
-   Prevented non-editable image files from causing errors on profile picture upload.
-   Asset information passed to [Publish Triggers](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/publish-triggers.html) when unpublishing via move, rename and delete will now contain the correct asset identifier and type.
-   Unpublishing when deleting an asset will now unpublish from Destinations that use a [Database Transport](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html#DatabasePublishing).
-   Audits created from unpublishing as part of move, rename and delete operations will now reference the correct asset.
-   Deleting a Site will now show a relationship error if a Publish Set is being referenced from another Site.

[Show more versions...](#changelog-more-collapse)
