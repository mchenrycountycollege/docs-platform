---
parent: Changelog
section: 20220519
part: 56 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20220519

## 20220519

### Features/Improvements

-   Purging file assets from the recycle bin now uses less memory.
-   The WYSIWYG editor will now correct `o:p` tags introduced when pasting content from Microsoft Office applications to paragraph elements to prevent XML validation issues on submit.
-   Improved load time of large (un)publish report notifications by displaying an overall summary and a link to view the full report in a new browser window/tab.
-   New Velocity Tool methods for determining ["type" of an object](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#PropertyTool) or if an [object is numeric](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#_NumberTool_isNumeric), shuffle collections using [ListTool.shuffle](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#_ListTool_shuffle), and convert a HashMap to a JSON string using a new [SerializerTool.toJson](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#serialize-map-to-json) method.
-   Publish jobs that are in progress when the application is shut down will now be re-queued so they can be restarted on application startup.
-   Background jobs such as report generation and sync operations that are in progress when the application is shut down will now be restarted on application startup.

### Fixed

-   Create Drafts for folders with previously-recycled children will no longer prevent the Draft from being deleted when a Draft's parent folder is in the recycle bin and being purged.
-   Using `listSubscribers` batch operation will now return a proper `listSubscribersResult`.
-   Times throughout the system now display based on the user's timezone. Fields that display the server's time zone, such as the Broken Link Report schedule, now note which time zone is being displayed. In addition, dates returned by the REST API will now be returned in UTC.
-   Fixed an issue with the Export CSV feature for the Stale Content Report when filtering for a site.
-   When viewing an asset that is scheduled to (un)publish later, the Destination(s) that were selected to (un)publish to will now be shown instead of the Destination(s) checked by default.
-   Contents of Folders created through an [Asset Factory](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/index.html) will not be created until the draft of that Folder is submitted.
-   Timestamps in rendering error screens, such as when viewing an invalid Feed Block, will now show the correct current date and time.
