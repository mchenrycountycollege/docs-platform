---
parent: Changelog
section: 20210610
part: 70 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20210610

## 20210610

### Features/Improvements

-   You can now schedule assets to publish or unpublish at a chosen date and time with a new [Optionally Publish/Unpublish Later](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/index.html) field on the publish/unpublish menu. While an asset is scheduled to be published, it won't be included in other publish jobs but it can still be indexed by other site content.

### Fixed

-   Content Types with a related Publish Set will no longer result in a validation issue during a Site copy operation.
-   Fixed a scenario where a workflow resuming background task can become stuck and prevent publish jobs from starting/completing.
