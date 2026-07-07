---
parent: Changelog
section: [v8.13.2](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.13.2/index.html)
part: 82 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.13.2](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.13.2/index.html)

## [v8.13.2](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.13.2/index.html)

### Features/Improvements

-   Text within asset links (asset names) can now be selected throughout the application on non-mobile devices.
-   Microsoft SQL Server 2017 is now supported; 2012 is deprecated and support will be removed in the next on-premise release on or after 3/12/2020.

### Fixed

-   Help text for metadata fields is no longer lost when copying a Metadata Set.
-   Reading a Workflow Definition and Workflow (via `readWorkflowInformation`) using Web Services will now include Custom Workflow Emails.
-   Addressed an issue where long *Show Field* option labels made editing fields difficult in the Data Definition Builder.
-   The My Sites widget will now correctly display the user's most recent sites.
-   It is no longer possible to submit empty comments or replies to comments.
-   Corrected an issue where user and group choosers would not properly handle user and group names containing a comma.
-   The `entityPath` provided to Publish Triggers will no longer be empty during an unpublish job that is triggered from a move/rename operation.
-   Updating the structured data of an asset in varying order using Web Services will no longer lead to unexpected results.
