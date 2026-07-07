---
parent: Changelog
section: 20210929
part: 65 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20210929

## 20210929

### Features/Improvements

-   Metadata and property changes made to Folders are now automatically saved in the background as drafts. These drafts are listed within the [My Content area](https://www.hannonhill.com/cascadecms/latest/cascade-basics/my-content.html) and a message will be shown when viewing a Folder if the user has an existing draft.
-   For improved performance, large files that can be skipped by Smart Publishing will no longer be rendered during publish.
-   Cascade CMS application logging (i.e. contents of `cascade.log`) will no longer be duplicated in the `catalina.out` Tomcat logging.
-   To improve rendering performance, cache discard operations after various asset actions such as create, move, rename, and copy will now be performed in the background.

### Fixed

-   Clicking on a chooser field on a mobile device will no longer navigate to a 404 error screen.
-   Clicking the **Browse** button within the first row of a container chooser's **Browse** tab, while filtered, will no longer navigate into the wrong container.
-   We've tweaked the design of page region overlays to avoid adding extra whitespace to the page's rendering.
-   (Un)Starring an asset will now update all star buttons associated with that same asset (ex. in the context menu and when viewing the asset).
-   Addressed an issue where starring drafts or working copies of assets would display an error message.
-   It's now possible to add links to images within a `figure` element.
-   Addressed an issue where time picker fields, such as those when configuring schedule publishing, could not be updated in Safari or Firefox.
-   The Twitter Connector is now deprecated and it will be removed in the next release.
