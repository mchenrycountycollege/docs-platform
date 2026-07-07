---
parent: Changelog
section: [v8.14](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.14/index.html)
part: 81 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.14](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.14/index.html)

## [v8.14](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.14/index.html)

### Features/Improvements

-   To help you locate content quicker, collapsed groups in page and block editing interfaces now feature a preview of the first field in the group. We've also updated the design of various form-related components throughout the application.
-   We've introduced a number of improvements to the Browse and Upload tabs in chooser panels to help reduce confusion when choosing assets. Additionally, the chooser panel is now responsive on mobile devices.
-   To avoid obstructing the interface, LDAP sync notifications will no longer display the entire report. Additionally, we've improved performance of LDAP sync report generation.
-   We've updated the look and feel of various reports such as Publish, Folder copy, Site import, and LDAP sync.
-   You can now limit asset selection and uploads to a designated folder for chooser and WYSIWYG fields with the **Restrict to folder** option in your [Data Definitions](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/index.html).
    
-   Reduced memory usage during [Broken Link Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/broken-links-report.html) generation.
-   We've improved performance when editing complex [Data Definitions](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/index.html) in the builder.
-   Windows Server 2019 is now supported.
-   MySQL 8 is now supported; MySQL 5.5 is deprecated and support will be removed in the next on-premise release on or after 5/15/2020.

### Fixed

-   Recipients of scheduled publish notifications will no longer see varying "Received on" dates.
-   Addressed an issue where enabling multiples for existing Data Definition groups would cause descendent fields to lose existing values.
-   Addressed errors when a workflow attempts to merge a working copy while it's still in the Publish Queue. Workflows with assets waiting to be published will be put on hold and resume once the publish completes.
-   Addressed an issue in which checkbox/radio icons are not clickable when selecting assets in tables.
-   Changing a Page's Content Type will no longer display a preview error after submitting the change.
