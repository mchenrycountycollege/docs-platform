---
parent: Changelog
section: [v8.12](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.12/index.html)
part: 85 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.12](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.12/index.html)

## [v8.12](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.12/index.html)

### Features/Improvements

-   Data Definition groups and fields can now be reordered and restructured while preserving existing content. We've added [drag-and-drop re-ordering](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/index.html) to help simplify Data Definition group and field reordering.
-   Consecutive calls with `structuredData`, `getStructuredDataNode()`, or `getStructuredDataNodes()` will now be cached to improve rendering times.
-   On-submit [accessibility content checks](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-checks.html) will now show a helpful message if they appear to be taking longer than expected.
-   We've improved color contrast in various places throughout the application for better visibility and accessibility.
-   To improve impact on system performance, applying workflow settings to multiple folders simultaneously will now run as a background task.
-   We're doing less frequent recrawl requests of Siteimprove when publishing content from Cascade CMS. Individual asset publishes will still issue automatic recheck, but larger, bulk publishes will not recrawl your entire site as frequently.

### Issues Fixed

-    Timestamps for page previews in the Accessibility Report will now show the correct date and time that the preview was generated.
-   The `readAudits` [web services](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/index.html) operation will now handle the `groupname`, `rolename`, `startDate` and `endDate` options within the `auditParameters` request data.
-   Addressed an issue where the [Query API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#query-api) would return inconsistent results when filtering by multiple Dynamic Metadata field or tag values.
-   Assets associated with an Accessibility Report record can now be fully purged from the recycle bin without error.
-   Addressed an issue where the length of Accessibility Report violation descriptions could exceed the database column length.
-   WCAG accessibility tests relating to CSS and overall page structure will no longer be reported in the on-submit [accessibility content check](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-checks.html).
-   When reading an asset with Structured Data nodes using Web Services, a `structured-data-node` will now be returned for all fields. This means that if a given asset is missing a value for a field, a `structured-data-node` with that field's default value will be returned, instead of the field being omitted from the response.
-   Addressed an issue where under certain situations cached Index Block renderings would not properly update as assets were created and removed. We also reduced average system memory consumption by Index Block caches.
-   [Naming Rules](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-naming-rules.html) will now be applied properly when creating a [reference](https://www.hannonhill.com/cascadecms/latest/content-authoring/references.html) to an existing asset.
-   A JavaScript error will no longer appear when inserting/updating links and images within a WYSIWYG field.
-   Dashboard widgets configured with a deleted Site will now display a message instructing the user to update the widget.
-   Dashboard widgets will no longer become uneditable when configured with a Site to which the current user does not have explicit Site object READ/WRITE permissions.
-   The *Mark as Reviewed* keyboard shortcut when viewing an asset has been changed from `w` to `s` to avoid conflicting with the *Workflows* shortcut when viewing a folder.
-   When recovering a folder from the Trash, assets will be restored in order from the parent folder down to ensure cache paths are set correctly.
-   Broadcast messages will once again remain visible until the user explicitly closes them.
-   Read timeouts during [Google Analytics Connector](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/how-to-set-up-a-google-analytics-connector.html) syncing should occur less frequently.
-   Folders can once again be recycled if they contain assets which are locked or have working copies.
-   Notifications for Tasks with due dates will no longer be sent after the Task has been resolved or deleted.
-   Content ownership will be preserved after an asset goes through workflow or a previous version is activated.
-   It is no longer possible to schedule Broadcast Messages in the past, or with an end date that is before the start date.
-   Asset chooser fields will now properly handle double quotes when displaying assets by their Title or Display Name.
-   Copying Data Definitions and Shared Fields to another Site will no longer result in invalid paths.
-   The Data Definition Builder will no longer become unusable when editing a Data Definition which references a nonexistent Shared Field.
-   WYSIWYG Editor Configurations from another Site will now load when viewing a Data Definitions or when editing Pages/Blocks.
-   Fields inside a Shared Field group will no longer lose their values when swapping out a page's Data Definition or Content Type.
-   Empty content areas will no longer be tested for accessibility issues.
