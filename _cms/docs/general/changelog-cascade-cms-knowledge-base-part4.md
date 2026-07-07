---
parent: Changelog
section: [v2025.2](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-2025.2/index.html)
part: 4 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v2025.2](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-2025.2/index.html)

## [v2025.2](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-2025.2/index.html)

### Features/Improvements

-   Added support for OpenJDK 21.0.5+11
-   This release contains an upgrade to Tomcat 9.0.98
-   The library used for [SFTP Transports](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html) has been upgraded for improved security and support for newer algorithms.
-   Improved efficiency of [Destination](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/destinations.html) pool used during publishing.
-   Searching the audits table will now match content within the information column.
-   A new [Velocity Json Tool](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#JsonTool) can be used for fetching remote JSON resources.
-   Improved performance of publish queue screen loading and pagination.
-   Improved performance of exporting Content Inventory Report to CSV.
-   It is now possible to rename [Groups](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/groups.html).
-   Improved UX when updating filtering for various reports by automatically closing the filter flyout when clicking the apply button.
-   Improved load times of Content Inventory Report.
-   Upgraded image editing library to the latest version, 2025.06.
-   Increased the maximum number of [search results](https://www.hannonhill.com/cascadecms/latest/cascade-basics/search/full-search-and-replace.html) returned from 250 to 5,000. This also includes searching via Web Services.
-   A new [Content Inventory Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/content-inventory-report.html) allows reporting on assets in the system based on filters such as by site, asset type, publish dates, review dates, ownership, and other criteria

### Fixed

-   Addressed a situation in which editing an asset followed by using a chooser and datetime field prevented from being able to focus within WYSIWYG components.
-   The Edit with Preview frame will no longer become blank after it reloads from content changes.
-   The Add Content menu will now work on the publish queue and scheduled publish jobs screens.
-   [Unused Assets Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/suggested-unused-assets-report.html) now correctly filters by the selected asset type(s).
-   Unzip file report will now indicate if an error was encountered while attempting to unzip vs individual results errors.
-   Addressed an issue in which deleted groups could not be fully removed from the [Destination](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/destinations.html) and [Workflow Definition](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/index.html) *Applicable Groups* setting.
