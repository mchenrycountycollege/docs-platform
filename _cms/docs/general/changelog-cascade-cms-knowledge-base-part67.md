---
parent: Changelog
section: [v8.18](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.18/index.html)
part: 67 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.18](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.18/index.html)

## [v8.18](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.18/index.html)

### Features/Improvements

-   Improved accessibility of chooser fields used throughout the application among other general button UI improvements.
-   Address resource contention by reading XSLT Xalan system preferences once upon startup of Cascade CMS. Note: changing the XSLT Xalan preferences now requires a restart of Cascade CMS.
-   Non-fatal Destination errors encountered during publishing, such as temporary networking issues, will no longer cause the Destination to be flagged as "skipped."
-   We've added a toggle to enable or disable additional keyboard shortcuts in the shortcuts menu (Shift + ?).
-   We've added accessibility improvements focused around the WCAG 1.4.1, 1.4.13 and 2.4.7 guidelines to buttons, links, icons and various other components throughout the application.
-   You can now schedule assets to publish or unpublish at a chosen date and time with a new [Optionally Publish/Unpublish Later](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/index.html) field on the publish/unpublish menu. While an asset is scheduled to be published, it won't be included in other publish jobs but it can still be indexed by other site content.
-   We've improved page rendering speeds for implementations using large Index Blocks.
-   Added support for TLS 1.3 when performing link checking and Feed Block fetching.
-   Properties and methods returned by the [PropertyTool's outputProperties method](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#_PropertyTool_outputProperties) are now unique and sorted.
-   Added support for OpenJDK 11.0.10+9.

### Fixed

-   Users at any permission level can now discard their own Drafts and Notifications in bulk.
-   Fixed an issue where an asset could be overwritten by a Draft of a new asset with the same name and location before it's finalized.
-   The LDAP configuration will no longer become invalid after renaming a System Role that is being referenced by a user policy.
-   Addressed a UX issue where sometimes clicking on dropdown fields would cause the dropdown to open and close immediately instead of remaining open.
-   The correct Workflow Owner will now be displayed for workflows in the My Content area.
-   It is now possible to view a user that does not have group assignments (or inherited roles), instead of an error being displayed.
-   Content Types with a related Publish Set will no longer result in a validation issue during a Site copy operation.
-   Fixed a scenario where a workflow resuming background task can become stuck and prevent publish jobs from starting/completing.
-   The "back" link when starting a workflow will now return to the asset that is being submitted into workflow.
-   Fixed an error where a Publish Date couldn't be set if the site doesn't contain any Destinations checked by default.
-   When moving or renaming a Manage Site area asset, the primary button now correctly says "Move" or "Rename" instead of "Unpublish".
