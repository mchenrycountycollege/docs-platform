---
parent: Changelog
section: [v8.21](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.21/index.html)
part: 52 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.21](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.21/index.html)

## [v8.21](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.21/index.html)

### Features/Improvements

-   Workflow-related modals and screens have been improved and streamlined throughout the application.
-   Introduced a new [Workflows Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/workflows-report.html) which displays a list of in-progress and/or completed workflows within sites that you can access.
-   Editing content in multiple browser tabs is now supported. For example, you can now work on multiple Drafts simultaneously or copy content from one Edit screen to another without needing to close out existing Edit screens first.
-   We've reduced the amount of system resources used when creating a copy of a page asset.
-   Improved load time of structured data edit modals with many visible dropdown, WYSIWYG and datepicker fields.
-   Introduced new system-wide keystore [System Preferences](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html) and removed keystore settings from LDAP configuration.

### Fixed

-   Addressed an issue in which (un)starring a Role would not properly update the interface.
-   Workflow Definitions using the auto-name setting will once again use the Workflow Definition's name plus the asset's title, display name or system name when a new Workflow is initialized.
-   Addressed an issue in which browsers would attempt to autofill certain fields within the System Preferences and other areas of the application.
-   Optimized Content Type edit form to prevent issues when loading the edit modal and during submission.
-   Addressed an issue where special characters within [XML Feed Blocks](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/feed-blocks.html) were improperly serialized.
