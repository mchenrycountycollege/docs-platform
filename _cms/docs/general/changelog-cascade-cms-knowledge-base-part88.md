---
parent: Changelog
section: [v8.10](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.10/index.html)
part: 88 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.10](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.10/index.html)

## [v8.10](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.10/index.html)

### Features/Improvements

-   This release ships with the Tomcat 9.0.8 servlet container which contains improvements and security fixes to the previously shipped version of Tomcat. It also replaces Tomcat 8.0.x which [reaches end of life on June 30, 2018.](https://tomcat.apache.org/tomcat-80-eol.html)
-   Dates and times throughout the application are now formatted to show absolute times (e.g. `Today 11:20 AM` or `Jun 1 3:29 PM`) instead of relative times (e.g. `9 minutes ago` or `2 years ago`).
-   We've added information about who last modified a given asset when viewing the contents of a Folder or Container.

### Issues Fixed

-   Exporting Sites will no longer retain file pointers after downloading completes.
-   Testing email preferences after initially loading the [System Preferences](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html) form will now use the correct SMTP password.
-   Validation of URL fields throughout the application will now accept protocol-relative URLs (e.g. `//www.example.com`) . The validation will also allow space characters (e.g. `https://www.example.com/a space/index.html`); however, we still recommend encoding those spaces as `%20`.
-   New database indexes prevent "lock request time out period exceeded" errors for SQL Server customers that were causing user facing performance issues when under load.
-   Addressed an issue where clients running Cascade CMS on Oracle occasionally ran into errors when importing a Velocity Format using the `#import` directive.
-   Content Type Publish Sets must belong to the *same Site* as the related Page being published to avoid invalid relationships and false successful publish notifications.
-   Rendering metrics caching is now thread safe to avoid synchronization errors when rendering multiple Pages, or the same Page, at the same time.
-   Search/replace will now correctly handle empty Structured Data values for Oracle clients.
-   Editing within the WYSIWYG source code editor is once again possible in IE11.
-   Addressed an issue where region assignments in Show Regions would fail to be populated when system region comments were removed in the document markup.
-   Editing a page via in-context editing will no longer remove the content tags associated with the page.
-   Date pickers will now show under fields to ensure they are not cut off by fixed modal headers.
