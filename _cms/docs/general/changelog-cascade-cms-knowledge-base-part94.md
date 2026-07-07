---
parent: Changelog
section: [v8.7](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.7/index.html)
part: 94 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.7](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.7/index.html)

## [v8.7](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.7/index.html)

### Features/Improvements

-   We've added real-time notifications for actions including asset and task comments, publish reports, site import/copy reports, and edits to assets you're viewing.
-   Changes to assets will automatically update the asset tree for all users in a site.
-   We improved application performance by replacing frequent polling with WebSocket.
-   There's a new [Background Tasks report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/background-tasks.html), which provides a list of running and completed tasks in the system such as Broken Link Report generation, page renders, scheduled LDAP sync operations and more.
-   We've strengthened password encryption throughout the CMS using current best practices.
-   Editing assets will no longer redirect the user to that asset on submission unless Save & Preview is used or a Workflow is started. This includes edits initiated from context menus and updating Blocks within in-context editing.
-   Added `maxLength` restriction and help text to various form fields to prevent users from entering too much content which could lead to database-related errors.
-   We're promoting the use of secure URLs (`https://`) by adding subtle help text and placeholders throughout the system.
-   We've added a [Move/Rename Workflow Definition type](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/index.html). You can use an unpublish trigger in your Move/Rename workflows to ensure assets are unpublished from the web server when their path changes.
-   You can now apply asset naming rules at the [System](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html) and/or [Site](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/index.html) level. These rules will be enforced for newly-created assets in the system.
-   Access your [SiteImprove](https://siteimprove.com/) data for relevant assets in Cascade by enabling the SiteImprove plugin in your system preferences.

### Issues Fixed

-   Malformed URLs such as "http:hannonhill.com/blah" and mixed-case URLs don't generate errors in the software now.
-   Clicking region names in the sidebar shows region assignments again.
-   Clicking regions that aren't in-context editable no longer highlights them.
-   Corrected a number of issues with the custom scrollbar.
-   Continuing on the improvements to GA Connectors introduced in 8.6, all **newly-verified** GA Connectors will use a new Google application so they will no longer be subject to the same quota as instances running on older versions of Cascade CMS.
-   Grouping by link in the Broken Link Report works again.
-   Scheduling content reviews now only available for reviewable assets to which the user has write access.
-   "Schedule Review" and "Mark as Reviewed" through the context menu now works.
-   Asset review dates are now updated when the next scheduled review date is reached.
-   Several additional bug fixes and improvements related to content review scheduling.
-   Upgraded TinyMCE from v4.5.7 to v4.6.7 to address issues with code sections in source code, selecting Spectate forms, using dialogs and the source code editor in IE11/Edge, along with [numerous other improvements/fixes](https://www.tinymce.com/docs/changelog/#version467september182017).
-   The currently-viewed asset is now properly highlighted within the Site asset tree if it has the same name as its parent container.
-   Nested Data Definition groups no longer overflow the borders of the edit modal.
-   Fixed issue where publishing individual relationships would send an unpublish request.
-   Content within `<script>` tags is no longer subject to spell checking.
-   Unpublishable outputs no longer appear as publishable in the publish modal.
-   Notifications that failed to be sent due to long subject lines are now truncated.
-   Required smart fields no longer prevent form submission if they're hidden.
-   The `[` keyboard shortcut will once again re-open the Site Content sidebar.
-   Unchecking deprecated WYSIWYG Data Definition field options will no longer put the Data Definition into an unusable state.
-   Clicking the Add radio during the spelling content check no longer focuses the Fix radio.
