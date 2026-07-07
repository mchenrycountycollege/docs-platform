---
parent: Changelog
section: 20241202
part: 12 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20241202

## 20241202

### Features/Improvements

-   Added [Content Tips](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-tips.html) which offer real-time SEO guidance as you edit assets with [visible metadata fields](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/metadata-sets/metadata-fields-in-cascade.html).
-   It is now possible to export the [Users](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/users.html) table within the System Administration area to a CSV file.
-   It is now possible to view the users assigned to a particular Site by clicking on the number of users in the [Sites Listing](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/index.html) screen.
-   Added new [Velocity Tool](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html) methods to the Property Tool and Number Tool. Also added new convenience methods when working with the Structured Data Nodes using [Cascade API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/internal-cascade-api/internal-cascade-api-changelog.html).
-   Improved efficiency of [SFTP Transports](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html) when reading remote directories and files.

### Fixed

-   Addressed an issue in which searching content within HTML/XML markup would not return the correct results.
-   Fixed issue where [individual asset scheduled (un)publish](https://www.hannonhill.com/cascadecms/latest/faqs/general/scheduled-publishing-for-individual-assets.html) dates would persist after the scheduled date.
-   Structured data fields hidden by smart field rules will no longer undergo content checks on submit.
-   The Spectate Connector is now deprecated and it will be removed in the next release.
-   Addressed an issue in which URL parts (i.e. parameters and anchor) would be removed while rewriting root relative links added to WYSIWYG fields.
-   Addressed an issue in which initial group preview states while editing structured data may not reflect current smart field rules.
-   Root relative links inserted into WYSIWYG fields will be considered external.
-   Addressed a race condition in which sending WebSocket messages prevented the publish queue from processing jobs and resulted in general performance degradation
-   Addressed an issue in which Page Metadata would be empty when accessed within Asset Factory Plugins.
