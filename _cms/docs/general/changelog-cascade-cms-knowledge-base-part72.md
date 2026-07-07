---
parent: Changelog
section: [v8.17.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.17.1/index.html)
part: 72 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.17.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.17.1/index.html)

## [v8.17.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.17.1/index.html)

### Features/Improvements

-   We've improved load times when editing Pages and Data Definition Blocks with complex implementations.
-   We've added accessibility improvements focused around the WCAG 1.3.1 and 1.3.2 guidelines to tables, icons and various other components throughout the application.
-   We've added WCAG 2.4.7 related accessibility improvements to buttons, links and various other components throughout the application.
-   Publish reports now feature more concise error reporting and will include errors that were encountered when attempting to remove empty directories on unpublish.
-   We've improved keyboard accessibility in the WYSIWYG and added WYSIWYG keyboard shortcuts to the shortcuts menu (Shift + ?).
-   Users can now adjust the duration of notifications displayed within the interface using a new [user setting](https://www.hannonhill.com/cascadecms/latest/cascade-basics/account-settings.html#AccountSettings) called *Notification Duration*. Additionally, a progress bar is now displayed on the notification to indicate how much longer the notification will be visible on the screen.
-   Added support for SQL Server 2019. Support for SQL Server 2014 is deprecated and will be removed in the next on-premise release on or after 09/25/2021.
-   Added support for Microsoft JDBC driver for SQL Server environments.

### Fixed

-   Starring a Role will no longer result in a `NullPointerException` error.
-   Addressed an issue where consecutive attempts to star an asset caused an error.
-   Fixed several issues related to replacing field groups with Shared Field groups in a Data Definition.
-   Fixed an issue where changing a radio field more than once while editing an asset would not trigger additional draft saves.
-   Fixed an issue with typeahead search when selecting a site in a chooser field.
-   Fixed an issue where file asset size would display as 0 bytes in after editing.
-   Addressed an issue where the context menu would stay open after performing an action from it or tabbing out of it.
-   It is now possible to search for WYSIWYG Editor Configurations in chooser fields.
-   Structured data group and field labels are now escaped to prevent from "bleeding" into the interface.
-   You can now apply advanced Custom Formats to `figure` elements in the WYSIWYG.
-   Fixed a background error when sending a Block through workflow containing a publish-working-copy trigger.
-   Addressed an issue with cached site permissions when removing a user from a Group or deleting a Group.
-   Asset Factories with the Create Resized Images plugin will no longer trigger a null error when used to create assets.
-   Addressed some styling issues in the CMS header.
-   Long task names will now be truncated in the Tasks widget on the Dashboard.
-   Working copies will now show their parent folder instead of the current version's parent folder if different.
-   Corrected an issue where MariaDB 10 was being reported as MySQL 5.5 on startup. Note: MariaDB is not an officially-supported database vendor. For supported platforms, please see the **Requirements** section for your release in the [Release Notes](https://www.hannonhill.com/cascadecms/latest/releases/index.html).
