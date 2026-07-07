---
parent: Changelog
section: [v8.22](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.22/index.html)
part: 45 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.22](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.22/index.html)

## [v8.22](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.22/index.html)

### Features/Improvements

-   Improved load time of structured data edit modals for complex implementations.
-   Introduced new [Query API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#QueryAPI) methods for fetching assets by structured data. Also added new structured data and dynamic metadata preloading methods to reduce overhead needed to fetch that content.
-   Structured data fields and groups that allow for multiples can now be moved to the top or bottom in the edit interface.
-   System Role validation when creating and editing Groups through both the interface and Web Services has been improved with a more useful error message.
-   Structured data fields and groups set to multiple can now be dragged to re-order. It is also possible to drag a "multiple" field from one group to another that matches the same path.
-   The `@` symbol can now be used within the system name for assets as well as user and group names.
-   Updated the design and UX of controls used for modifying structured data fields and groups that are set to multiple.
-   It is now possible to preview webp image files within the application.
-   Improved accessibility of structured data groups for assitive technologies when editing Structured Data Blocks and Pages.
-   Uploading within a File chooser no longer requires the [Bypass Workflow ability](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/role-abilities-in-cascade.html#SiteRoleAbilities). The chooser's upload tab will now indicate folders that are restricted by workflow for the user.
-   The [Google Analytics Connector](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/how-to-set-up-a-google-analytics-connector.html) verification process has been updated to adhere to Google's latest authentication requirements, which will be changing early 2023.

### Fixed

-   Using the [Publish Trigger's](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/publish-trigger.html) `publish-related-assets` parameter with a non-publishable asset (e.g. a Block) in a Workflow will now publish that asset's relationships.
-   It is once again possible to search by usernames within a User chooser.
-   It is now possible to search the [Broken Link Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/broken-links-report.html) by source asset path.
-   Configuring the Workflow Definition [Publish Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/publish-trigger.html) with parameters to `unpublish` and `publish-working-copy` will now properly unpublish the working copy.
-   Email notifications sent from the [Stale Content](https://www.hannonhill.com/cascadecms/latest/content-management/reports/stale-content-report.html) and [Content Up For Review](https://www.hannonhill.com/cascadecms/latest/content-management/reports/content-up-for-review-report.html) reports will once again include links to selected assets.
