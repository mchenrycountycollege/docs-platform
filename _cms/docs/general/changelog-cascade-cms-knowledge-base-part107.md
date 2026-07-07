---
parent: Changelog
section: [v8.0](https://www.hannonhill.com/cascadecms/latest/releases/8.0/index.html)
part: 107 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.0](https://www.hannonhill.com/cascadecms/latest/releases/8.0/index.html)

## [v8.0](https://www.hannonhill.com/cascadecms/latest/releases/8.0/index.html)

### Issues Resolved

-   Fixed issue where Index Block Rendering Cache doesn't get discarded when an asset referenced in a Data Definition Block or Index Block is moved
-   Fixed issue where Cascade does not shutdown completely due to running Jetty threads
-   Fixed issue where unable to set Metadata Set expiration folder field visibility and required in Web Services
-   Fixed issue where element expansion produces invalid self-closing HTML elements
-   Fixed issue where auditing messages were swapped for assuming and un-assuming users
-   Fixed issue where Google Analytics sync would fail when no data exists for the time interval
-   Fixed issue where search indexes were not automatically being rebuilt in the file system when they didn't exist on startup
-   Fixed issue where Global CSS would override the Site CSS in Structured Data Blocks with multiple WYSIWYGs
-   Fixed issue where errors would occur as a result of deleting Content Types and Metadata Sets (and parent containers) being referenced by working copies of Pages, Files, etc. Now prevents deletion of those Content Types, Metadata Sets, or Containers until Working Copies are removed.
-   Fixed issue where Symlink URLs were limited to a 250 character length
-   Fixed issue where 'Publish all relationships' button loads blank page for Administration area assets
-   Fixed issue where certain 'Login Failed' messages would not provide additional details in the log file
-   Fixed issue where user input can cause parse errors Advanced Search

### Additional Notes

The Administration and Manage Site areas are now completely separate in Cascade CMS 8. As a result, Roles (that were not the Administrator role) who may have previously had access to Administration only have access to Manage Site.