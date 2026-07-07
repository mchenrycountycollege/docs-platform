---
source: https://www.hannonhill.com/cascadecms/latest/content-management/reports/user-activity-report.html
title: User Activity Report - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Reports

# Overview[](#Overview)

The User Activity report provides usage statistics for common actions users take in the system, including:

-   Creates
-   Edits
-   Publishes
-   Deletes
-   Logins

**Tip** - Click any non-zero number in the report to view an [audit](https://www.hannonhill.com/cascadecms/latest/cascade-administration/audits.html) pre-filtered for that user and action.

**Note** - To view the User Activity report, you'll require the **Access Administration Area** and **Access Users, Groups and Roles** abilities enabled in one or more of your [System Roles](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/roles.html).

# Filtering the Report[](#FilteringtheReport)

The following filters are available under **Filter Settings** to refine the results of the report:

-   **Start Date** - actions initiated after the selected date/time.
-   **End Date** - actions completed before the selected date/time.
-   **Enabled Users Only** - check this option to filter out user accounts that have been disabled in the system.

# Exporting the Report[](#ExportingtheReport)

The report can be exported as a .csv file by clicking the **Export CSV** link.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }