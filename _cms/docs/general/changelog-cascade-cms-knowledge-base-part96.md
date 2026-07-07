---
parent: Changelog
section: [v8.6](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.6/index.html)
part: 96 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.6](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.6/index.html)

## [v8.6](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.6/index.html)

### Features/Improvements

-   Accessibility, link, and spelling content checks are now part of a unified interface and can be enabled/disabled at the site or system levels.
-   Content checks for users can now be enforced through the use of Site Role abilities.
-   Added ability to upload multiple files simultaneously without requiring a zip file.
-   Instances using custom authentication can now redirect users who don't exist within Cascade CMS to a custom URL.
-   Added ability to choose a toolbar color in System Preferences to help differentiate multiple Cascade CMS instances.
-   Added additional context such as site name and path to asset links in search results, chooser panels, My Content area, and more.
-   Regions without in-context editing enabled are no longer highlighted on hover.
-   Added ability to publish to Amazon's Simple Storage Service (S3) through a new Transport type.
-   Added support for FTPS Transport protocol.
-   Added the ability to authenticate SFTP Transports with an SSH key and optional passphrase.
-   Added "Live" link to File view screen (under the More menu) to view the file on the live website using the Site's URL.
-   Added API method `StructuredDataNode.hasTextValue()`
-   Added error indicators to form tabs and sections to help with tracking down field errors.
-   Added the ability to remove extensions from internal links during publish. Extensions to remove are specified at the Destination level (for internal links) and Site Settings (for cross-site links).
-   Exceptions/errors during asset rendering are no longer being output to log files, which will help reduce "error spamming" and the overall size of log files. These errors will still be shown within the application and publish reports or more detailed logging can be used.
-   It is now possible to update an LDAP user's binding DN via Web Services

### Issues Fixed

-   Helped alleviate Google Analytics daily quota restrictions.
-   Fixed issue where it was not possible to ignore links in the Broken Links report.
-   Fixed issue where versions modal didn't properly list versions sorted by date.
-   Fixed issue where `StructuredDataNode.getTextValues()` returned an empty string for checkboxes and multi-selectors.
-   Fixed editing of existing folders for SQL Server.
-   Fixed Daily Content Report for Oracle.
-   Fixed issue where it was not possible to view a group's workflows under the More menu.
-   Fixed issue where scripts were being stripped from links in the WYSIWYG.
-   Fixed issue where it wasn't possible to edit or delete users with numeric usernames starting with 0.
-   Fixed issue where workflow expiration emails were sent to deleted users, resulting in an error.
-   Fixed issues with asset submission: duplicate submits allowed, check for recent edits not happening in certain cases, and draft saves/submits indistinguishable in log files.
-   Fixed issue with web services where `includeInStaleContent` was not returned in folder read operations.
-   Fixed issue where the User avatar within the Welcome dashboard widget would not appear correctly.
-   Fixed issue where it was not possible to select items after navigating directly to page in a paginated list.
-   Fixed issue where choosing "Select all on page" incorrectly selected filtered assets in a list.
-   Fixed issue where long asset names or paths overlapped adjacent columns in data tables.
