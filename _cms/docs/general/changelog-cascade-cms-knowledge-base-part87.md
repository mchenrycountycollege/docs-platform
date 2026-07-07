---
parent: Changelog
section: [v8.11](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.11/index.html)
part: 87 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.11](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.11/index.html)

## [v8.11](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.11/index.html)

### Features/Improvements

-   We've updated the on-submit [Accessibility content check](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-checks.html) to reflect HTML5 recommendations for table captions.
-    Cascade Cloud users can now enable additional WCAG 2.0 tests in the on-submit [Accessibility content check](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-checks.html).
-   We've introduced [Shared Fields](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/shared-fields.html) for Data Definitions, which allow you to manage, update, and share individual fields and field groups across Data Definitions and across sites.
-    Cascade Cloud users can now integrate with [Widen Collective](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/widen-collective-integration.html) or [Webdam](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/webdam-integration.html) to allow users to browse and select assets in their digital asset management library from within the WYSIWYG editor.
-   The [Database Optimizer Tool](https://www.hannonhill.com/cascadecms/latest/cascade-administration/database-tools/optimize-database.html) will now run as a background task and appear in the [Background Tasks Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/background-tasks.html). A notification will be sent to the user when the task is completed.
-   We've added more fine-grained formatting controls to [WYSIWYG Editor Configurations](https://www.hannonhill.com/cascadecms/latest/content-authoring/wysiwyg-editor-configurations/index.html). Individual built-in formats in the WYSIWYG Formats dropdown can now be enabled/disabled and [advanced custom formats](https://www.hannonhill.com/cascadecms/latest/content-authoring/wysiwyg-editor-configurations/index.html#EditorConfigurationCustomFormatting) can be used to target and/or generate styled content.
-   Preview options will be pre-populated when editing a Format from a page's region assignments. Selected preview options will also be retained to prevent having to select the same options again.
-   When editing a Format, you can now increase the height of the bottom preview pane.
-    Cascade Cloud users have a new site-wide Accessibility Report, which allows you to monitor and review WCAG 2.0 accessibility issues across your entire site.
-   When publish requests expire, they're now properly deleted. This prevents issues when deleting Sites and Destinations caused by leftover expired requests.
-   We've added indexes to metadata columns in tables to improve the speed of metadata-based API queries.
-   The "Save & Preview" button is now the "Preview Draft" button. We believe this better describes the function of the button and should help reduce confusion on the part of users submitting content.
-   Users will now be asked to confirm if they want to navigate away from content checks when submitting content.
-   A new custom Metadata field type, the date/time field, is now available. This offers an alternative to using the static Start/End Date metadata fields or Data Definition date/time fields.
-   A new Cascade API method, `DynamicMetadataField.hasValue()`, is now available. Much like `StructuredDataNode.hasTextValue()`, this new method checks if a custom Metadata field contains the specified value. Review the [API changelog](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/internal-cascade-api/internal-cascade-api-changelog.html) for this and other improvements to the internal API.
-   Labels can now be added to checkbox, radio, drop-down, and multi-select values in custom Metadata Set fields and Data Definition fields. This allows developers to change the visible label for field values without affecting existing stored values.
-   A new report, [User Activity](https://www.hannonhill.com/cascadecms/latest/content-management/reports/user-activity-report.html), provides statistics on a number of common actions such as asset creations, deletions, edits, and user logins.
-   When editing Velocity Formats, a button has been added to the code editor to display information about the various tools, methods, and properties available.

### Issues Fixed

-   Tags are now included when copying a Site.
-   The Default setting for Dynamic Metadata field values will once again load properly when editing a Metadata Set. For radio and dropdown fields, this setting will once again be restricted to one per field.
-   Index Blocks which index Feed Block content will no longer be cached if there's an issue loading the feed.
-   The New Content dashboard widget will once again use the selected Site's base Asset Factory Container, configurable in the [Site Settings](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/index.html), when determining what Asset Factories to load.
-   Viewing [audits](https://www.hannonhill.com/cascadecms/latest/cascade-administration/audits.html) will once again default to being sorted chronologically.
-   Addressed an issue where orphaned structured data nodes in assets using a Data Definition could prevent changes to the asset from being submitted.
-   Orphaned unpublish requests will no longer prevent their associated Destination and/or Site from being deleted.
-   Groups with invalid names (e.g. containing single quotes) will no longer cause choosers in areas such as Site Role assignments and access rights settings to work incorrectly.
-   Fixed an SSL handshake failure when enabling the Siteimprove CMS plugin. See [Upgrade Guide](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.11/index.html#UpgradeGuide) for details on the upgraded Java JRE we've bundled.
-   Addressed an issue where null values in the Broken Link Report could cause the report to fail to load when filtering.
-   Fixed a typo in the expiration warning help text.
-   Addressed an issue where folders may not be displayed in the folder tree or folder chooser if they had colliding folder orders.
-   Addressed an issue affecting instances running on SQL Server where, under certain circumstances, Index Block rendering could result in higher than normal database CPU usage.
-   Discrepancies between the displayed date/time and the date/time when hovering over timestamps throughout the system have been corrected.
-   Non-current versions of child assets are no longer included when performing a `read` operation on a folder with Web Services or REST API.
-   Searching for the same term more than once (e.g. `about about`) will no longer prevent search results from loading.
-   We've reworked asset recycling in the system to address instances where assets can become corrupted on recycle. Folder recycling now occurs as a background job that's available to view in the [Background Tasks Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/background-tasks.html).
