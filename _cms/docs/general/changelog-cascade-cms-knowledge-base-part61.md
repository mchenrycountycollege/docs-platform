---
parent: Changelog
section: 20211117
part: 61 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20211117

## 20211117

### Fixed

-   Fixed an error message when determining an asset's suggested placement folder in certain circumstances.
-   On-hold workflows being resumed will no longer introduce infinite error loops under certain situations.
-   Corrected an issue where MariaDB 10.6 would prevent successful startup. Note: MariaDB is not an officially-supported database vendor. For supported platforms, please see the **Requirements** section for your release in the [Release Notes](https://www.hannonhill.com/cascadecms/latest/releases/index.html).
-   Fixed a styling issue with sticky announcements where ellipses appeared after each announcement.
-   An asset's context menu will once again close automatically and return focus on the asset link when a user tabs through the end of the menu with a keyboard.
-   Fixed an issue with link rewriting in WYSIWYG editors when editing an asset located in another site.
-   Fixed an error where a site being copied became uneditable if the copy operation was interrupted.
