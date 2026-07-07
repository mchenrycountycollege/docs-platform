---
parent: Changelog
section: 20210624
part: 69 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20210624

## 20210624

### Features/Improvements

-   We've improved page rendering speeds for implementations using large Index Blocks.
-   Added support for TLS 1.3 when performing link checking and Feed Block fetching.
-   Properties and methods returned by the [PropertyTool's outputProperties method](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#_PropertyTool_outputProperties) are now unique and sorted.

### Fixed

-   The "back" link when starting a workflow will now return to the asset that is being submitted into workflow.
-   Fixed an error where a Publish Date couldn't be set if the site doesn't contain any Destinations checked by default.
