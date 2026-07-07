---
source: https://www.hannonhill.com/cascadecms/latest/content-management/reports/stale-content-report.html
title: Stale Content Report - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Reports

# Overview[](#Overview)

![Stale Content Report Results](https://www.hannonhill.com/cascadecms/latest/content-management/reports/images/stale-content-report-results.png)

The Stale Content report displays a list of assets that have not been modified within a specified time period. The definition of what content is considered stale is specific to each user, with some restrictions:

-   Page or File type assets may be considered stale.
-   Only assets for which the user has write access are included in the results.
-   Only assets within Folders that have **Include in Stale Content report** enabled in their properties are included in the results.

The list of results contains the following information:

-   **Name** - The name of the asset and an asset link.
-   **Owned By** - The username of the owner of the asset.
-   **Last Updated** - The time the asset was last modified. Hover over the entry in this column for an exact date/time.
-   **Last Updated By** - The username of the user who last modified the asset.

# Filtering the Report[](#FilteringtheReport)

![Stale Content Report Filters](https://www.hannonhill.com/cascadecms/latest/content-management/reports/images/stale-content-report-filters.png)

The following filters are available to refine the results of the report:

-   **Site** - A Site must be selected to display report data.
-   **Content last updated more than \_ days ago** - Manually enter how many days an asset can exist without being modified before it is considered stale, or select from the dropdown of common values.
-   **Asset Type** - Choose whether Page and/or File assets are displayed in the results.
-   **Show only content I own** - When this option is enabled, only assets that you are the owner of are displayed in the results.
-   **Restrict to folders** - To restrict the results list to assets within specified folders, click **Choose Folder** and select a folder. Repeat these steps to add additional folders to the results list.

**Note** - Filtering the report to specified Folders will also filter the results of the Stale Content widget on your Dashboard.

# Send a Stale Content Notification[](#SendaStaleContentNotification)

![Stale Content Report Send Notification](https://www.hannonhill.com/cascadecms/latest/content-management/reports/images/stale-content-report-send-notification.png)

To send a stale content email notification:

1.  Select one or more assets from the results list.
2.  Click the **Notify by Email** envelope icon at the top of the list.
3.  Click **Choose Users and Groups** and select Users/Groups to receive the notification email. You may also enter a comma-delimited list of email addresses.
4.  Optionally, add a message to the notification recipients. By default, the system will send the user an email containing a brief description and link to the asset needing review.
5.  Click **Notify**. An email will be sent using the email options configured in your System Preferences.

**Note** - To send a stale content email notification, users need the **Notify users by email about stale content** ability enabled in their Site Role.

# Schedule a Review Date[](#ScheduleaReviewDate)

![Stale Content Report Schedule Review Date](https://www.hannonhill.com/cascadecms/latest/content-management/reports/images/stale-content-report-schedule-review-date.png)

To schedule a review date:

1.  Select one or more assets from the results list.
2.  Click the **Schedule Review** calendar/clock icon at the top of the list.
3.  Select a date for future review. Options include 1 month, 3 months, 1 year, or a specific date.
4.  Click **Schedule Review**. This will update the asset Review Date metadata field to the specified date. Modifying an item’s Review Date does not change the item’s Last Modified date.

# Export Results as a CSV File[](#ExportResultsasaCSVFile)

Information visible in the Stale Content report can be exported as a CSV file using the **Export CSV** link in the top right corner. The file will also contain information about the current user, Site name, and type of report.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }