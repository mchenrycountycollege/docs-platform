---
source: https://www.hannonhill.com/cascadecms/latest/content-management/reports/background-tasks.html
title: Background Tasks - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Reports

# Overview[](#Overview)

The Background Tasks report provides a list of completed and running tasks in the system, including:

-   Broken Link Report
-   Build Search Index
-   Copy
-   Daily Content Report
-   Google Analytics Sync
-   Page Render (longer than 10 seconds)
-   Recycle Bin Purge
-   Site Export
-   Site Import
-   Scheduled LDAP Sync

The list of results contains the following information:

-   **Task Type** - see above.
-   **Initiated By** - the username of the user who initiated the task. For scheduled tasks this will be the system user.
-   **Start Date** - the time the task was initiated. Hover over this column for for an exact date/time.
-   **End Date** - the time the task completed or failed. Hover over this column for an exact date/time.
-   **Related Asset** - for tasks such as page renders, the asset associated with the task.
-   **Status** - indicates if the task completed, failed, or is still running.
-   **Duration** - the time the task took to complete or fail.

# Filtering the Report[](#FilteringtheReport)

The following filters are available to refine the results of the report:

-   **Start Date** - tasks initiated after the selected date/time.
-   **End Date** - tasks that completed or failed before the selected date/time.
-   **Minimum Duration in Seconds** - tasks that took longer than the selected duration to complete or fail.
-   **Task Type** - see above.
-   **Task Status** - whether the task completed, failed, or is still running.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }