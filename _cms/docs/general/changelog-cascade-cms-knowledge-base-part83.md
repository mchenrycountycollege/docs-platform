---
parent: Changelog
section: [v8.13.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.13.1/index.html)
part: 83 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.13.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.13.1/index.html)

## [v8.13.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.13.1/index.html)

### Features/Improvements

-   We've improved load times for screens such as the Dashboard that rely on counting a user's notifications.

### Issues Fixed

-   To prevent issues with parts of the interface being hidden when viewing PDFs in Internet Explorer 11 (IE11), users will be prompted to preview the PDF in a separate tab instead.
-   Assets using Data Definitions and Shared Fields outside of the current site will no longer lose Shared Field content when edited with Web Services.
-   We've addressed an issue where, under certain circumstances, Asset Factories would not place assets within their designated placement folder.
-   Oracle clients running 12.2+ will no longer experience database update errors relating to adding constraints to [Custom Workflow Email](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/custom-workflow-emails.html) tables during the upgrade process from prior to Cascade CMS 8.13.
-   Oracle clients running 12.2+ metadata values now use the correct data type.
-   We've addressed an issue where sites exported prior to Cascade CMS 8.13 do not import into Cascade CMS 8.13 with a [Custom Workflow Email](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/custom-workflow-emails.html) container.
-   The Windows installer has been updated to address an SSL connection error after upgrading to Cascade CMS 8.13.
-   Workflow comments will no longer be repeated for system steps in a Workflow Definition.
