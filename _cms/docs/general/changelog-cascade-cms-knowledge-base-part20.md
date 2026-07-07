---
parent: Changelog
section: [v8.24.3](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.24.3/index.html)
part: 20 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.24.3](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.24.3/index.html)

## [v8.24.3](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.24.3/index.html)

### Features/Improvements

-   Upgraded image editing library to the latest version.
-   This release contains an upgrade to Tomcat 9.0.86

### Fixed

-   Addressed an issue to improve stability of the Siteimprove integration pre-publish feature.
-   Addressed an issue in which paginating outputs/destinations table when (un)publishing would not include all selected outputs/destinations.
-   Deleting a workflow through Web Services will correctly verify the authenticating user's Delete workflows Site Role ability.
-   Updating an SFTP Transport will no longer inadvertently remove the existing private key.
-   My Sites dashboard widget will correctly show "more sites" indicator if user has access to more sites than what is listed.
-   Siteimprove integration will no longer cause an error for Oracle customers when previewing a draft of a new page that does not have a name entered.
-   Addressed an issue where Oracle customers would see an error when previewing a new page which does not a system name entered and uses an Index Block that includes calling page information.
