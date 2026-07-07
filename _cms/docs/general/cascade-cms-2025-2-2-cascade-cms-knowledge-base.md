---
source: https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-2025.2.2/index.html
title: Cascade CMS 2025.2.2 - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

# Cascade CMS 2025.2.2

Cascade CMS 2025.2.2 is the second patch for the 2025 Q2 on-premise release of Cascade CMS. It includes a variety of performance improvements for everyday editing, publishing, and more.

## Highlights

This release is primarily a maintenance release, but is strongly recommended for all customers specifically running SQL Server and Oracle databases due to performance improvements specifically addressing those vendors.

The release includes a variety of performance improvements that improve the reliability of many everyday tasks and reduces the impact of background processes on the user experience.

## Release Notes

### Features/Improvements

-   Additional performance improvements of publish queue screen loading and pagination.
-   Updated image editor for August release of JDeli
-   Improved reliability of link rewriting when using `system-asset` [pseudo tags](https://www.hannonhill.com/cascadecms/latest/content-authoring/linking.html#System-assetpseudo-tags).
-   Performance improvements when accessing scheduler on edits and draft saves prevents "lock wait timeouts" in logs and in interface
-   Improve performance when accessing entity relationships on SQL Server and Oracle databases
-   Improves performance when interacting with the background scheduler on Microsoft SQL Server and Oracle databases

### Fixed

-   Accessing asset permissions through Cascade API will no longer throw an error.
-   Errors encountered when a [Google Analytics Connector](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/how-to-set-up-a-google-analytics-connector.html) attempts to find a matching asset will no longer prevent the sync from completing.
-   Restoring a previous version of a [Content Type](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/content-types/index.html) will now properly persist the Editable Fields and Publish Options from the previous version.
-   You can now apply simple CSS Class Formats to `figure` elements in the WYSIWYG.
-   Fixes various Cross-Site Scripting (XSS) security issues in notifications and tasks

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

1 Support is maintained for up to 3 versions from each database vendor. When support for a new database version is added, support for the oldest version is deprecated and will be removed in the first on-premise release 6 months on or after the date of deprecation. Support is maintained for up to 3 versions from each database vendor. When support for a new database version is added, support for the oldest version is deprecated and will be removed in the first on-premise release 6 months on or after the date of deprecation.