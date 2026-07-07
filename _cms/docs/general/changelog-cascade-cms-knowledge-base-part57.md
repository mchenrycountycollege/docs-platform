---
parent: Changelog
section: [v8.19.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.19.1/index.html)
part: 57 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.19.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.19.1/index.html)

## [v8.19.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.19.1/index.html)

### Features/Improvements

-   Improved performance of loading last login times on the user's table within the [System Administration Area](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/users.html)
-   Reduced memory consumption of Index Block caching.
-   Improved resource utilization for concurrent publish jobs.
-   Addressed background performance issues that could cause high application memory usage primarily for SQL Server customers running v8.19.

### Fixed

-   Fixed an error message when determining an asset's suggested placement folder in certain circumstances.
-   On-hold workflows being resumed will no longer introduce infinite error loops under certain situations.
-   Corrected an issue where MariaDB 10.6 would prevent successful startup. Note: MariaDB is not an officially-supported database vendor. For supported platforms, please see the **Requirements** section for your release in the [Release Notes](https://www.hannonhill.com/cascadecms/latest/releases/index.html).
-   Fixed a styling issue with sticky announcements where ellipses appeared after each announcement.
-   An asset's context menu will once again close automatically and return focus on the asset link when a user tabs through the end of the menu with a keyboard.
-   Fixed an issue with link rewriting in WYSIWYG editors when editing an asset located in another site.
-   Fixed an error where a site being copied became uneditable if the copy operation was interrupted.
-   Fixed an issue with publishing connections being closed and opened more frequently than expected.
-   (Un)Publish jobs that encounter repeated timeout errors will now mark the Destination as failed after a period of time.
-   Addressed an issue where the Index Block caching thread pool remaining active would prevent the system from shutting down completely.
-   Fixed an issue where buttons to clear page-level Block and/or Format assignments weren't appearing.
-   The `shouldBePublished` property can once again be updated for publishable assets using SOAP Web Services.
-   Trailing commas in WYSIWYG Editor Configuration custom styles will not longer cause site copy operations to fail.
-   Addressed an issue where errors encountered during publishing can result in empty files on the remote server.
