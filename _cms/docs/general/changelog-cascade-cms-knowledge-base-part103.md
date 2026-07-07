---
parent: Changelog
section: [v8.1.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.1.1/index.html)
part: 103 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.1.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.1.1/index.html)

## [v8.1.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.1.1/index.html)

### Features/Improvements

-   Added: new [JSON-based REST-like API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html)
-   Improvement: Sort drafts by last modified by default in My Content
-   Improvement: Make Asset Comments more prominent and easily accessible in the action menu
-   Improvement: additions to the query and Velocity tool APIs
-   Improvement: an automatic vertical resizer to the editor
-   Improvement: Changed wording of Advanced Submit modal to better clarify intention of Submit and Check Content & Submit options.

### Issues fixed

-   Fixed: re-worked right flyout panel to improve keyboard accessibility
-   Fixed: Issues with timestamps on draft overwriting alert
-   Fixed: Compare with Current functionality missing for Working Copy view
-   Fixed: Accessibility issues in data definition group controls, broadcast messages and datepickers
-   Fixed: Workflow Definition 'allowReassignments' checkboxes lose their value if you click on the workflow builder first when editing
-   Fixed: Left navigation and Folder content tables don't update when assets are moved, renamed, copied, or deleted
-   Fixed: Locator Tool: Accessing a page's structured data via the Cascade API can result in LIE
-   Fixed: Wysiwyg dropdown menus not keyboard accessible
-   Fixed: Custom values in dropdowns do not persist on subsequent edits
-   Fixed: assets that don't render properly saved in user history cause subsequent pages to fail to load
-   Fixed: Invalid broken links reported when a create draft changes site
-   Fixed: Can't get to assets when "Asset Tree Display" preference is set to "Folders only"
-   Fixed: Web Services: Blocks can not be read if underlying Data Definition has a field added to it
-   Fixed: Application version no longer appears in flyout menu
-   Fixed: Update submit flow for index blocks to match flow used by other asset types in Site Content area.
-   Fixed: TinyMCE: Source editor initializes with stacked content and scrolling incorrect when in full screen
-   Fixed: TinyMCE: source editor styling issues due to cached styles between upgrades that should have been cache invalidated
-   Fixed: Format Editing UI: previewing a very large Index Block causes draft submission to fail
