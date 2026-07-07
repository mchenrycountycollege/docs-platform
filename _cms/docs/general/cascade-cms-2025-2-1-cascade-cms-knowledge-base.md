---
source: https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-2025.2.1/index.html
title: Cascade CMS 2025.2.1 - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

# Cascade CMS 2025.2.1

Cascade CMS version 2025.2.1 is a patch release that makes searching content with punctuation marks more reliable and improves the user experience when creating and editing sites. This release also includes better handling of invalid structured data and dynamic metadata values, plus fixes for the Content Inventory Report pagination on SQL Server and various missing/deleted group reference issues. We've also upgraded to Tomcat 9.0.107 for enhanced security and performance.

## Release Notes

### Features/Improvements

-   Improved UX of Site create and edit by making the two forms consistent in structure.
-   Improved handling of invalid values for Dynamic Metadata and Structured Data fields.
-   This release contains an upgrade to Tomcat 9.0.107

### Fixed

-   Searching content with punctuation marks will now return correct results.
-   Addressed an issue in which errors during Folder creation would be momentarily visible.
-   Paginating the [Content Inventory report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/content-inventory-report.html) will no longer display an error for SQL Server customers.

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