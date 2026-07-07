---
parent: Changelog
section: [v8.1](https://www.hannonhill.com/cascadecms/latest/releases/8.1/index.html)
part: 104 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.1](https://www.hannonhill.com/cascadecms/latest/releases/8.1/index.html)

## [v8.1](https://www.hannonhill.com/cascadecms/latest/releases/8.1/index.html)

### Improvements

-   Added user tasks
-   The editing process is now streamlined for users who are able to skip the preview step
-   Added support for MySQL 5.7; deprecates 5.1
-   Improved performance of loading notifications (even a massive amount)
-   Notifications now include a button to mark all notifications as read and a button to delete all notifications
-   Updated Web Services search functionality to match new Search behavior
-   Can now permanently ignore a broken link in the Broken Link Report
-   Can now view a reason a link is considered broken in the Broken Link Report
-   Broken link types and reasons are now filterable in the Broken Link Report
-   Minor broken Link Report UI Improvements
-   Improved button focus style and increased button contrast
-   Improved focus style in a table of selected assets
-   Clicking the main menu automatically highlights Help & Support button
-   Faster switching between Site Management module types

### Issues Resolved

-   Links ignored in the Broken Link Report are now also ignored in the submit link checker
-   Unable to go directly to deep-link for assets immediately after login using custom authentication
-   Adjustment width and height of the code editor window to better handle smaller screens
-   On mobile, the code editor's window is now fullscreen. This ensures the submit/cancel buttons are always visible.
-   No longer using an iframe for the code editor, which fixes various issues including: code editor components being cut off and a flash of an un-styled textarea before the code editor initialized
-   IE11 no longer throws a JavaScript error on draft view preventing the content from loading
-   Fixed a JavaScript error when a region with invalid XML is encountered
-   Fixed inconsistently named Structured Data/Data Definition/XHTML block in header areas
-   Adds content insertion options in TinyMCE right-click context menu for images/links
-   Fixed missing template name in configure tab of pages
-   When viewing a template, regions are now listed in alphabetical order
-   Fixed unread notification tab from showing read notifications
-   Fixed show all pagination throwing an error in Broken Link Report
-   Fixed no link to resume identity on mobile devices
-   Fixed show all pagination shows no matching records on Content Ownership report either with/without search term
-   Fixed search/replace discrepancies; search includes partial matches and replace is now case insensitive
-   In some cases, core TinyMCE plugins (e.g. the Visual Blocks plugin) were unable to load their associated CSS file, causing the plugin to appear broken
