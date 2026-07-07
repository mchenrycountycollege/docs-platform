---
parent: Changelog
section: [v8.19](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.19/index.html)
part: 62 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.19](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.19/index.html)

## [v8.19](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.19/index.html)

### Features/Improvements

-   We've added accessibility improvements focused around the WCAG 1.4.1, 1.4.13 and 2.4.7 guidelines to buttons and links throughout the application.
-   Metadata and property changes made to Folders are now automatically saved in the background as drafts. These drafts are listed within the [My Content area](https://www.hannonhill.com/cascadecms/latest/cascade-basics/my-content.html) and a message will be shown when viewing a Folder if the user has an existing draft.
-   For improved performance, large files that can be skipped by Smart Publishing will no longer be rendered during publish.
-   Cascade CMS application logging (i.e. contents of `cascade.log`) will no longer be duplicated in the `catalina.out` Tomcat logging.
-   To improve rendering performance, cache discard operations after various asset actions such as create, move, rename, and copy will now be performed in the background.
-   We're excited to introduce a new editing experience to you - while editing a page, click **Show Edit Preview** to see a preview of your changes alongside the edit screen as you make them. Drag the divider between the preview and the edit screen to resize the preview, or click Preview Draft to view the full-width preview.

### Fixed

-   Unscheduling an (un)publish by clearing out the date field within the (Un)Publish modal will now properly update the modal's submit button. Also, the scheduled (un)publish message that is shown while viewing the asset will be removed as it is no longer applicable.
-   Links to named anchors will now correctly scroll to the anchor within the page preview.
-   HTML markup in workflow comments is now escaped to prevent errors with the workflow screen.
-   Fixed an issue where switching outputs when viewing a Page would cause the *Fullscreen Preview* and *Live* links under the More menu to disappear.
-   Restoring a previous version of a non-group Shared Field will no longer cause loss of content.
-   Clicking on a chooser field on a mobile device will no longer navigate to a 404 error screen.
-   Clicking the **Browse** button within the first row of a container chooser's **Browse** tab, while filtered, will no longer navigate into the wrong container.
-   We've tweaked the design of page region overlays to avoid adding extra whitespace to the page's rendering.
-   (Un)Starring an asset will now update all star buttons associated with that same asset (ex. in the context menu and when viewing the asset).
-   Addressed an issue where starring drafts or working copies of assets would display an error message.
-   It's now possible to add links to images within a `figure` element.
-   Addressed an issue where time picker fields, such as those when configuring schedule publishing, could not be updated in Safari or Firefox.
-   The Twitter Connector is now deprecated and it will be removed in the next release.
-   Edit with Preview is now available when editing in-context.
-   Browse folder arrows in chooser flyouts are once again visible when hovering a folder row and on mobile.
