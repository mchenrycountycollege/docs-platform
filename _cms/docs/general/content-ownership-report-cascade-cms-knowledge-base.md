---
source: https://www.hannonhill.com/cascadecms/latest/content-management/reports/content-ownership-report.html
title: Content Ownership Report - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Reports

# Overview[](#Overview)

![Content Ownership Report Results](https://www.hannonhill.com/cascadecms/latest/content-management/reports/images/content-ownership-report-results.png)

The Content Ownership report displays assets owned by users in the system. Content owners are responsible for maintaining their content and will be the default recipient for notifications on issues related to that content. Content owners can be assigned to Pages, Files, Folders, Blocks, Formats and External Links. Assets created using the **Add Content** menu or via **Copy** or zip archive are automatically assigned a content owner based on the user that created them.

From the Content Ownership report, assets can be assigned/unassigned an owner either individually or in bulk. Users can see all assets to which they have read access. Reporting exists for viewing both owned and un-owned content.

# Filtering the Report[](#FilteringtheReport)

![Content Ownership Report Filters](https://www.hannonhill.com/cascadecms/latest/content-management/reports/images/content-ownership-report-filters.png)

The following filters are available to refine the results of the report:

-   **Site**\- A Site must be selected to display report data.
-   **Assets owned by me** - will display assets to which the current User is assigned as the owner.
-   **Assets owned by selected owners** - will display assets owned by Users selected via the chooser. Leaving the field empty will result in all assets with any owner being displayed.
-   **Assets with no owner** - will display all assets that do not have an owner.

# Assigning Content Ownership[](#AssigningContentOwnership)

Assets can be assigned owners from the Content Ownership report or directly from the asset. When assigning content ownership, remember:  

-   You must have write access to an asset to assign the content owner.
-   You must share a Group with the User to whom you're assigning the asset or have the ability to view all Users.

To assign/unassign ownership of asset(s) from the report:

1.  Select one or more assets from the results list.
2.  To assign/re-assign ownership of asset(s), click **Assign owner** from the top of the list and select a User or click **Choose myself** to assign yourself ownership of the asset.
3.  To unassign ownership of asset(s), click the **Unassign selected** "x" icon from the top of the list.

To assign/unassign ownership directly from the asset:

1.  While viewing the asset, click **Details** > **Properties**.
2.  To assign/re-assign ownership, click **Choose User** in the **Content Owner** field and select a User or click **Choose myself** to assign yourself. You can clear the assignment by clicking the "x" icon.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }