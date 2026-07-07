---
parent: Changelog
section: 20220802
part: 51 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20220802

## 20220802

### Features/Improvements

-   Improved load time of structured data edit modals for complex implementations.
-   Introduced new [Query API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#QueryAPI) methods for fetching assets by structured data. Also added new structured data and dynamic metadata preloading methods to reduce overhead needed to fetch that content.

### Fixed

-   Using the [Publish Trigger's](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/publish-trigger.html) `publish-related-assets` parameter with a non-publishable asset (e.g. a Block) in a Workflow will now publish that asset's relationships.
-   Scheduled review settings will no longer be lost after editing and submitting an asset.
