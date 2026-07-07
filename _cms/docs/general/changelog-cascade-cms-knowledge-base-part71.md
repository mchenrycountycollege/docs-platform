---
parent: Changelog
section: 20210518
part: 71 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20210518

## 20210518

### Features/Improvements

-   Improved accessibility of chooser fields used throughout the application among other general button UI improvements.
-   Address resource contention by reading XSLT Xalan system preferences once upon startup of Cascade CMS. Note: changing the XSLT Xalan preferences now requires a restart of Cascade CMS.
-   Non-fatal Destination errors encountered during publishing, such as temporary networking issues, will no longer cause the Destination to be flagged as "skipped."
-   We've added a toggle to enable or disable additional keyboard shortcuts in the shortcuts menu (Shift + ?).

### Fixed

-   Users at any permission level can now discard their own Drafts and Notifications in bulk.
-   Fixed an issue where an asset could be overwritten by a Draft of a new asset with the same name and location before it's finalized.
-   The LDAP configuration will no longer become invalid after renaming a System Role that is being referenced by a user policy.
-   Addressed a UX issue where sometimes clicking on dropdown fields would cause the dropdown to open and close immediately instead of remaining open.
-   The correct Workflow Owner will now be displayed for workflows in the My Content area.
-   It is now possible to view a user that does not have group assignments (or inherited roles), instead of an error being displayed.
