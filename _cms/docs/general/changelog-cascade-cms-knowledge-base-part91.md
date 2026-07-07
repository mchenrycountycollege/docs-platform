---
parent: Changelog
section: [v8.8.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.8.1/index.html)
part: 91 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.8.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.8.1/index.html)

## [v8.8.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.8.1/index.html)

### Features/Improvements

-   Loading times have been improved for the Sites table and Sites drop-down menus used throughout the application.

### Issues Fixed

-   Various background job scheduling issues relating to an asset's Start Date, End Date, and Review Date Metadata Fields and Workflows have been fixed.
-   The left-hand Site Content tree will no longer be in a collapsed state when viewing a draft of a new asset.
-   Updating Content Types with the Bulk Change tool will no longer overwrite page-level region assignments.
-   When fetching Feed Blocks, the system will be able to connect to remote servers running older SSL protocols and ciphers.
-   Data truncation errors will no longer appear in the application logs when background task error messages are longer than 250 characters.
-   Workflows containing a [Version trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/version-trigger.html) will now create versions for Block assets.
-   Configurations linked to previous versions of a Content Type can now be deleted.
-   Addressed a [Siteimprove plugin](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/siteimprove-integration.html) performance issue caused by rechecking a Publish Set that contains the Site's base folder.
-   Addressed issues where the Siteimprove plugin would send many repeated API requests to recheck content on publish and generally made the rechecking of content on publish more efficient.
-   Submitting a Page level block or format region assignment change will no longer display an error message indicating no “configuration could be found”
-   A user friendly error message will now be shown when editing a draft in one tab and discarding that draft in another.
-   The advanced code editor will once again be available when creating new Files.
-   Internal links within Velocity Formats will now be updated to reference the correct asset after a Site or Folder copy.
