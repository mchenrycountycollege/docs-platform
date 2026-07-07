---
source: https://www.hannonhill.com/cascadecms/latest/content-management/reports/content-up-for-review-report.html
title: Content Reviews Report - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Reports

# Overview[](#Overview)

![Content Reviews Report Results](https://www.hannonhill.com/cascadecms/latest/content-management/reports/images/content-up-for-review-report-results.png)

The Content Reviews report provides a list of assets that have upcoming or past-due review dates.

-   Page or file type assets may be considered stale.
-   Only assets for which the user has write access are included in the results.
-   Only assets with a date/time specified in their **Review Date** [metadata fields](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/metadata-sets/metadata-fields-in-cascade.html) are included in the results.

The list of results contains the following information:

-   **Name** - The name of the asset and an asset link.
-   **Review Date** - The date/time specified in the asset's Review Date metadata field. Hover over the entry in this column for an exact date/time.
-   **Owned By** - The username of the owner of the asset.
-   **Last Updated** - The time the asset was last modified. Hover over the entry in this column for an exact date/time.
-   **Last Updated By** - The username of the user who last modified the asset.

# Filtering the Report[](#FilteringtheReport)

![Content Reviews Report Filters](https://www.hannonhill.com/cascadecms/latest/content-management/reports/images/content-up-for-review-report-filters.png)

The following filters are available to refine the results of the report:

-   **Site** - A site must be selected to display report data.
-   **Overdue content or content due in \_\_ days** - Manually enter for how many days from the current date that an asset would be considered up for review, or select from the dropdown of common values.
-   **Asset Type** - Choose whether page and/or file assets are displayed in the results.
-   **Show only content I own** - When this option is enabled, only assets that you are the owner of are displayed in the results.
-   **Restrict to folders** - To restrict the results list to assets within certain folders, click **Choose Folder** and select a folder. Repeat these steps to add additional folders to the results list.

# Send a Stale Content Notification[](#SendaStaleContentNotification)

![Stale Content Report Send Notification](https://www.hannonhill.com/cascadecms/latest/content-management/reports/images/stale-content-report-send-notification.png)

To send a stale content email notification:

1.  Select one or more assets from the results list.
2.  Click the **Notify by Email** envelope icon at the top of the list.
3.  Click **Choose Users and Groups** and select users/groups to receive the notification email. You may also enter a comma-delimited list of email addresses.
4.  Optionally, add a message to the notification recipients. By default, the system will send the user an email containing a brief description and link to the asset needing review.
5.  Click **Notify**. An email will be sent using the email options configured in your System Preferences.

**Note** - To send a stale content email notification, users need the **Notify users by email about stale content** ability enabled in their [Site Role](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/roles.html).

# Schedule a Review Date[](#ScheduleaReviewDate)

![Stale Content Report Schedule Review Date](https://www.hannonhill.com/cascadecms/latest/content-management/reports/images/stale-content-report-schedule-review-date.png)

To schedule a review date:

1.  Select one or more assets from the results list.
2.  Click the **Schedule Review** calendar/clock icon at the top of the list.
3.  To schedule a recurring review, enable **Review on a Schedule** and select an interval from the options provided:
    -   Every Month
    -   Every 3 Months
    -   Every Year
4.  To schedule a single review in the future, disable **Review on a Schedule** and select a review date from the options provided:
    -   1 month from now
    -   3 months from now
    -   1 year from now
    -   Calendar (Date Selection)
5.  Click **Schedule Review**. This will update the asset Review Date metadata field to the specified date. Modifying an item’s Review Date does not change the item’s Last Modified date.

# Export Results as a CSV File[](#ExportResultsasaCSVFile)

Information visible in the Content Reviews report can be exported as a CSV file using the **Export CSV** link in the top right corner. The file will also contain information about the current user, site name, and type of report.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }