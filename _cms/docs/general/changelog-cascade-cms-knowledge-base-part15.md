---
parent: Changelog
section: 20240904
part: 15 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20240904

## 20240904

### Features/Improvements

-   The [external link check timeout](https://www.hannonhill.com/cascadecms/latest/cascade-administration/external-link-checking.html#Preferences) now has a maximum limit of 10 seconds and the [feed block request timeout system preference](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html#Content) or 20 seconds.
-   It is now possible to unpublish from Destinations using a [Database Transport](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html#DatabasePublishing) during asset move, rename and delete.
-   Publish Set files, pages and folders will now be sorted alphabetically while viewing and editing. Reading a Publish Set using Web Services will also sort the assets consistently.
-   Improved UX of [Workflows Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/workflows-report.html) filtering by updating visibility of filter options based on the selected status filter.
-   Added support for SQL Server 2022. Support for SQL Server 2016 is deprecated and will be removed in the next on-premise release on or after 1/1/2025.
-   Upgraded image editing library to the latest version, 2024.08.

### Fixed

-   Asset information passed to [Publish Triggers](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/publish-triggers.html) when unpublishing via move, rename and delete will now contain the correct asset identifier and type.
-   Unpublishing when deleting an asset will now unpublish from Destinations that use a [Database Transport](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html#DatabasePublishing).
-   Audits created from unpublishing as part of move, rename and delete operations will now reference the correct asset.
-   Deleting a Site will now show a relationship error if a Publish Set is being referenced from another Site.
