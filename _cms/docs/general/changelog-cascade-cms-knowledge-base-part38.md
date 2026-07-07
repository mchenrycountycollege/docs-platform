---
parent: Changelog
section: [v8.23](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.23/index.html)
part: 38 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.23](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.23/index.html)

## [v8.23](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.23/index.html)

### Features/Improvements

-   Viewing relationships for admin area assets, such as Shared Fields, Data Definitions, Publish Sets, etc. will no longer appear to be missing a table column. Additionally, relationships display as errors or warnings when deleting assets will now contain site and path information for extra context.
-   Passwords for normal authentication users are now required to be stronger. More information about the new password policy can be found on under the [Adding a User documentation](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/users.html#password-policies).
-   Updated processing of Google Analytics Reports to prevent timeouts from long running queries.
-   Connectivity issues encountered during publishing will now retry using a backoff to help address possible rate limiting issues.
-   Improved memory usage during the Page rendering process. Also updated XML namespace handling to no longer remove unused namespaces.
-   Google Analytics Connector will now support for Google Analytics 4.

### Fixed

-   Addressed an issue where under certain situations performing multi-op operations (e.g. publish, copy, move, delete) would not check the proper site for available destinations/connectors or user abilities.
-   Working copies will no longer become orphaned if an error occurs while attempting to start workflow.
-   Relaxed asset naming restrictions to allow for successive underscores (e.g. `__foldername`).
-   Long words and URLs within asset comments will now properly wrap instead of appear to be cut off.
-   The audits table will now default to sorting chronologically by the Time column.
-   Entering a version comment that contains special characters, such as a percent sign, and submitting after performing data checks will no longer display an error.
-   Words containing special characters will no longer be split up during spell checking. Also improved the way full search handles these same words.
-   Addressed an issue in which creating a File using an Asset Factory that has a base asset and switching to the bulk file upload interface uploads the files incorrectly. Also improved UX when switching between single file upload and bulk file upload.
-   Long Asset Factory descriptions will now wrap to new lines.
-   The CSV export for [Stale Content](https://www.hannonhill.com/cascadecms/latest/content-management/reports/stale-content-report.html) and [Content Up for Review](https://www.hannonhill.com/cascadecms/latest/content-management/reports/content-up-for-review-report.html) reports will now contain the asset's owner.
-   Addressed an issue in which drag 'n drop of structured data field fields would not work correctly when expanding a group that is collapsed by default.
-   Addressed an issue where a warning would be displayed if the user does not have access to the restricted folder of a chooser field.
-   Addressed an issue where, under certain circumstances, the user would be redirected to the login screen despite having the "Remember Me" option enabled.
-   Addressed an issue where page regions could not be interacted with after performing an in-context edit.
