---
parent: Changelog
section: 20210201
part: 76 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20210201

## 20210201

### Features/Improvements

-   We've improved load times when editing Pages and Data Definition Blocks with complex implementations.
-   We've added accessibility improvements focused around the WCAG 1.3.1 and 1.3.2 guidelines to tables, icons and various other components throughout the application.
-   We've added WCAG 2.4.7 related accessibility improvements to buttons, links and various other components throughout the application.

### Fixed

-   Starring a Role will no longer result in a `NullPointerException` error.
-   Addressed an issue where consecutive attempts to star an asset caused an error.
-   Fixed several issues related to replacing field groups with Shared Field groups in a Data Definition.
-   Fixed an issue where changing a radio field more than once while editing an asset would not trigger additional draft saves.
-   Fixed an issue with typeahead search when selecting a site in a chooser field.
