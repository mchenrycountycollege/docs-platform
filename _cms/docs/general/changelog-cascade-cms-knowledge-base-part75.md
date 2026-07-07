---
parent: Changelog
section: 20210309
part: 75 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20210309

## 20210309

### Features/Improvements

-   Publish reports now feature more concise error reporting and will include errors that were encountered when attempting to remove empty directories on unpublish.
-   We've improved keyboard accessibility in the WYSIWYG and added WYSIWYG keyboard shortcuts to the shortcuts menu (Shift + ?).
-   Users can now adjust the duration of notifications displayed within the interface using a new [user setting](https://www.hannonhill.com/cascadecms/latest/cascade-basics/account-settings.html#AccountSettings) called *Notification Duration*. Additionally, a progress bar is now displayed on the notification to indicate how much longer the notification will be visible on the screen.

### Fixed

-   Fixed an issue where file asset size would display as 0 bytes in after editing.
-   Addressed an issue where the context menu would stay open after performing an action from it or tabbing out of it.
-   It is now possible to search for WYSIWYG Editor Configurations in chooser fields.
-   Structured data group and field labels are now escaped to prevent from "bleeding" into the interface.
-   You can now apply advanced Custom Formats to `figure` elements in the WYSIWYG.
-   Fixed a background error when sending a Block through workflow containing a publish-working-copy trigger.
-   Addressed an issue with cached site permissions when removing a user from a Group or deleting a Group.
