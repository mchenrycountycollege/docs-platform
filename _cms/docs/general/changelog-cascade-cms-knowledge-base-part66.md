---
parent: Changelog
section: 20210729
part: 66 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20210729

## 20210729

### Features/Improvements

-   We've added accessibility improvements focused around the WCAG 1.4.1, 1.4.13 and 2.4.7 guidelines to buttons and links throughout the application.

### Fixed

-   Unscheduling an (un)publish by clearing out the date field within the (Un)Publish modal will now properly update the modal's submit button. Also, the scheduled (un)publish message that is shown while viewing the asset will be removed as it is no longer applicable.
-   Links to named anchors will now correctly scroll to the anchor within the page preview.
-   HTML markup in workflow comments is now escaped to prevent errors with the workflow screen.
-   Fixed an issue where switching outputs when viewing a Page would cause the *Fullscreen Preview* and *Live* links under the More menu to disappear.
-   Restoring a previous version of a non-group Shared Field will no longer cause loss of content.
