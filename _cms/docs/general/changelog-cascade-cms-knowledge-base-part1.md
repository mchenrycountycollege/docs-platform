---
parent: Changelog
section: [v2025.2.2](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-2025.2.2/index.html)
part: 1 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v2025.2.2](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-2025.2.2/index.html)

## [v2025.2.2](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-2025.2.2/index.html)

### Features/Improvements

-   Additional performance improvements of publish queue screen loading and pagination.
-   Updated image editor for August release of JDeli
-   Improved reliability of link rewriting when using `system-asset` [pseudo tags](https://www.hannonhill.com/cascadecms/latest/content-authoring/linking.html#System-assetpseudo-tags).
-   Performance improvements when accessing scheduler on edits and draft saves prevents "lock wait timeouts" in logs and in interface
-   Improve performance when accessing entity relationships on SQL Server and Oracle databases
-   Improves performance when interacting with the background scheduler on Microsoft SQL Server and Oracle databases

### Fixed

-   Accessing asset permissions through Cascade API will no longer throw an error.
-   Errors encountered when a [Google Analytics Connector](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/how-to-set-up-a-google-analytics-connector.html) attempts to find a matching asset will no longer prevent the sync from completing.
-   Restoring a previous version of a [Content Type](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/content-types/index.html) will now properly persist the Editable Fields and Publish Options from the previous version.
-   You can now apply simple CSS Class Formats to `figure` elements in the WYSIWYG.
-   Fixes various Cross-Site Scripting (XSS) security issues in notifications and tasks
