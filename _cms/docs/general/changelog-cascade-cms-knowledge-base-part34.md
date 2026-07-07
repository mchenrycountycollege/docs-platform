---
parent: Changelog
section: 20230830
part: 34 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20230830

## 20230830

### Features/Improvements

-   Improved performance of using the Velocity Locator Tool to locate assets by their path.
-   [Allowed URLs](https://www.hannonhill.com/cascadecms/latest/cascade-administration/external-link-checking.html#AllowedURLs) can be used to skip checking certain links/domains within the Broken Link Report, Publish Reports, and on-submit content check for broken links.
-   Improved performance of loading audits through the application interface and Web Services. Note: a maximum of 10,001 results will be returned from a Web Services `readAudits` operation request.

### Fixed

-   Improved reliability of Daily Content Report generation. Additionally, the most viewed pages section will now only include data from verified Google Analytics Connectors.
-   Addressed an issue in which Google Analytics summaries no longer displayed trend information (i.e. +/- changes).
-   The Google Analytics dashboard widget will now load properly if data from the previous time period is not present. Additionally, data within the report will now be displayed in a friendlier format.
