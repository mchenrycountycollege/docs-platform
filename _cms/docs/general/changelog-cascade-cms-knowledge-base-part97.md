---
parent: Changelog
section: [v8.5](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.5/index.html)
part: 97 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.5](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.5/index.html)

## [v8.5](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.5/index.html)

### Features/Improvements

-   Submit and Publish reminder notifications have been moved to bottom-center to avoid obscuring frequently used controls at top right.
-   Added the ability to include participants to tasks.
-   Users can now schedule a recurring Review Date on assets.
-   Added a visual Workflow Definition viewer.
-   Help text can now be added to metadata fields to provide additional context/information.
-   Added content health alerts for pages with most broken links and most views to the Daily Content Report.

### Issues fixed

-   Google Analytics Report Overview should now appear again at the top of the Google Analytics Report
-   Google Analytics Connector "Unkown metric(s)" errors have been fixed
-   Re-added the ability to search within Role and User/Group choosers
-   Re-added asset relationship checks on Site deletion
-   Relaxed automated renaming on File upload to no longer remove capitalization
-   Removed asset links from Recycle Bin table since those assets can no longer be interacted with
-   Allow multiple emails in LDAP report
-   Addressed issue where custom scrollbar is not always visible until the user interacts with the scrollable container
-   Addressed an issue where dropdown fields with no default value pre-selected the first item instead of being empty
-   Web Services Folder `read` operations will no longer include assets that are non-current versions
-   Addressed an issue where workflow Advance﻿ and locked asset Commit Changes buttons were not clickable after editing a working copy
-   Trailing spaces are now removed from Radio field values
-   Very long asset names are now truncated when viewing a Folder's contents
