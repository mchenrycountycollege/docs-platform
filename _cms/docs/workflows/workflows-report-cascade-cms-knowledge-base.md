---
source: https://www.hannonhill.com/cascadecms/latest/content-management/reports/workflows-report.html
title: Workflows Report - Cascade CMS Knowledge Base
category: workflows
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Reports

# Overview[](#Overview)

The Workflows report displays a list of in-progress and/or completed workflows within sites that you can access.

The report defaults to displaying all **In Progress** workflows, but you can use the quick filter tabs at the top to display **Overdue** workflows as well. Additional filtering options are available under **Filter Results**, see ["Filtering the Report"](https://www.hannonhill.com/cascadecms/latest/content-management/reports/workflows-report.html#FilteringtheReport) for more information.

**Note** - If there are workflows that are in an error state, an **In Error** quick filter tab will appear.

The workflows list provides the following information:

-   **Workflow name** - The name of the workflow and a link to the workflow screen.
-   **Asset in workflow** - The name of the asset in workflow and a link to the asset.
-   **Submitted by** - The name of the user who initiated the workflow (also known as the "workflow owner").
-   **Started on** - The date the workflow was initiated. Hover the value for an exact date and time.
-   **Due date** - The date the workflow is due. Hover the value for an exact date and time.

# Filtering the Report[](#FilteringtheReport)

The following filters are available for filtering the report:

-   **Workflow status** - Display in-progress, completed, or all workflows.
-   **From/To** - Display workflows with any activity, such as the date they were initiated or the date they're due, within a specific timeframe.
-   **Site** - Display workflows for assets within specified site(s) that you can access.
-   **Started by** - Display workflows initiated by specified User(s) (also known as the "workflow owner").
-   **Assigned to** - Display workflows currently waiting on specified Users and/or Group(s) (also known as the "current step owner").

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }