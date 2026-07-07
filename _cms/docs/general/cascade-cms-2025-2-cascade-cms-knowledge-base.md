---
source: https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-2025.2/index.html
title: Cascade CMS 2025.2 - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

# Cascade CMS 2025.2

Cascade CMS version 2025.2 is a feature release that delivers a new Content Inventory Report, the ability to rename groups, a new Velocity Json Tool, and notable performance improvements including faster report loading, more efficient publishing, and expanded search capabilities that now return up to 5,000 results instead of 250. We've updated various core libraries for performance, stability and security, and included user experience enhancements like streamlined report filtering, fixes for editing Data Definitions and Workflows, and improvements to reporting accuracy.

## Release Notes

### Features/Improvements

-   Added support for OpenJDK 21.0.5+11
-   This release contains an upgrade to Tomcat 9.0.98
-   The library used for [SFTP Transports](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html) has been upgraded for improved security and support for newer algorithms.
-   Improved efficiency of [Destination](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/destinations.html) pool used during publishing.
-   Searching the audits table will now match content within the information column.
-   A new [Velocity Json Tool](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#JsonTool) can be used for fetching remote JSON resources.
-   Improved performance of publish queue screen loading and pagination.
-   Improved performance of exporting Content Inventory Report to CSV.
-   It is now possible to rename [Groups](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/groups.html).
-   Improved UX when updating filtering for various reports by automatically closing the filter flyout when clicking the apply button.
-   Improved load times of Content Inventory Report.
-   Upgraded image editing library to the latest version, 2025.06.
-   Increased the maximum number of [search results](https://www.hannonhill.com/cascadecms/latest/cascade-basics/search/full-search-and-replace.html) returned from 250 to 5,000. This also includes searching via Web Services.
-   A new [Content Inventory Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/content-inventory-report.html) allows reporting on assets in the system based on filters such as by site, asset type, publish dates, review dates, ownership, and other criteria

### Fixed

-   Addressed a situation in which editing an asset followed by using a chooser and datetime field prevented from being able to focus within WYSIWYG components.
-   The Edit with Preview frame will no longer become blank after it reloads from content changes.
-   The Add Content menu will now work on the publish queue and scheduled publish jobs screens.
-   [Unused Assets Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/suggested-unused-assets-report.html) now correctly filters by the selected asset type(s).
-   Unzip file report will now indicate if an error was encountered while attempting to unzip vs individual results errors.
-   Addressed an issue in which deleted groups could not be fully removed from the [Destination](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/destinations.html) and [Workflow Definition](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/index.html) *Applicable Groups* setting.

## Upgrade Guide

-   [First time installation?](#First+time+installation%3F)
-   [Upgrade Steps](#Upgrade+Steps)

### First time installation?

Be sure to [import our default database schema](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/database/index.html) prior to installing Cascade CMS for the first time. Then follow the appropriate [installation instructions](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/index.html) for your environment.

### Upgrade Steps

1.  Shut down your currently running Cascade CMS environment.
2.  Before you upgrade, we strongly recommend that you [**back-up your production database**](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/database/db-backup.html) as well as [set up a test environment](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/test-server.html) and perform a trial run of the upgrade. All customers are entitled to a test license for this purpose.
3.  Read the release notes and upgrade guides for **all releases** between your version and the latest version.

## Requirements & Supported Platforms

### Server Requirements (for CMS deployment)

Summary of system requirements for Cascade CMS.
|  | Requirement | Notes |
| --- | --- | --- |
| CPU | 
-   8-core (recommended)
-   Quad core (minimum)

 | Cascade can be run in virtualized environments like VMware and Hyper-V. |
| Memory | 

-   8GB RAM (recommended)
-   6GB RAM (minimum)

 | It is recommended to allocate approximately 1/2 of the server’s total memory to Cascade. |
| Hard Drive Space | 

-   25GB (recommended)
-   15GB (minimum)

 |  |

#### Supported Platforms

Summary of supported platforms for Cascade CMS.
|  | Supported platform(s) | Supported version(s) | Notes |
| --- | --- | --- | --- |
| Java platforms | OpenJDK | 
-   OpenJDK 21.0.5+11

 | 64-bit is **recommended**for all platforms. |
| Operating System | Microsoft Windows Server | 

-   2019
-   2016
-   2012 / 2012 R2

 |  |
| macOS Server | 

-   10.4 or later

 |  |
| Linux | 

-   64-bit (recommended)
-   32-bit

 |  |
| Databases[1](#footnote1) | MySQL | 

-   8
-   5.7 (deprecated)
-   5.6 (deprecated)

 | Support for MySQL 5.6 and 5.7 will be removed in an upcoming on-premise release. We will notify ahead of time. |
| Microsoft SQL Server | 

-   2022
-   2019
-   2017
-   2016 (deprecated)

 | Support for SQL Server 2016 will be removed in an upcoming on-premise release. We will notify ahead of time. |
| Oracle | 

-   19c
-   18c (deprecated)
-   12c (deprecated)

 | Support for Oracle 12c and 18c will be removed in an upcoming on-premise release. We will notify ahead of time. |
| Web servers | Apache |  |  |
| Microsoft IIS |  |  |
| Sun Java System Web Server |  | Formerly Netscape Enterprise Server. |
| Zeus Web Server |  |  |
| Web browsers | Chrome | [Latest Stable](https://chromestatus.com/roadmap) |  |
| Microsoft | [Edge](https://learn.microsoft.com/en-us/lifecycle/products/microsoft-edge) |  |
| Mozilla Firefox | [Firefox 115+](https://www.mozilla.org/en-US/firefox/releases/) |  |
| Safari | [Safari 16+](https://developer.apple.com/documentation/safari-release-notes) |  |

1 Support is maintained for up to 3 versions from each database vendor. When support for a new database version is added, support for the oldest version is deprecated and will be removed in the first on-premise release 6 months on or after the date of deprecation.