---
source: https://www.hannonhill.com/cascadecms/latest/content-management/reports/broken-links-report.html
title: Broken Link Report - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Reports

# Overview[](#Overview)

The Broken Links Report displays the results of the scheduled broken Link Checker which can be configured in your System Preferences. Only pages and files that are marked as publishable are scanned for broken links.

# Enabling the Report[](#EnablingtheReport)

First, enable the Broken Links Report for your system:

1.  Click the system menu button ( ) > **Administration** > **Preferences > Reports**.
2.  Under **Link Checker Configuration** configure the following options:
    -   **Run Scheduled Link Checker**\- choose which day of the week and time the report should run.
3.  Click **Submit**.

Next, enable the Broken Links Report for one or more sites:

1.  Choose your site from the **Site** menu and then select **Manage Site** > **Site Settings**.
2.  Under **Link Checking**, enable the **Schedule Link Checking** option.
3.  Click **Submit**.
4.  Repeat these steps for each additional site for which you want to enable the report. A report will be available for the site in the **Reports** area after the next scheduled report date/time.

**Note** - To prevent impacting system performance for users, we recommend scheduling the Broken Links Report to run no more than once weekly during off peak hours, such as early morning on a weekend.

# Viewing the Report[](#ViewingtheReport)

Once the Broken Links Report has been enabled for your system and run for at least one site, you can view the report under **Reports** > **Broken Links Report**. To get started, choose a report-enabled site under **Filter Results**.

![Broken Links Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/images/broken-links-report.png)

The top portion of the Broken Links report contains a summary of the following items:

-   Number of Assets with Reported Broken Links.
-   Number of Reported Broken Links.
-   Number of Broken Links currently Ignored, Allowed, and having Valid Response Codes.
-   Number of Broken Links Remaining (ones that have not been marked as fixed or ignored since the last time the scheduled Link Checker was run).

Below the overview is a results list of all broken links encountered during link checking. These links can be grouped by link, which displays all assets containing a particular broken link, or by asset, which displays all broken links found for each asset checked.  
  
The results list contains the following information:

-   **Source** - The asset in which the broken link was rendered.
-   **Occurrences** -
    -   When grouping by link, this column will indicate the number of assets that were found to have been using a particular link.
    -   When grouping by asset, this column will indicate the number of broken links in the current asset.
    -   Clicking **Show** in this column will display either all assets containing a particular broken link or all links contained in a particular asset depending on whether the report is being grouped by link or by asset, respectively. Clicking **Hide** will collapse the rows.
-   **Type** -
    -   Internal links are links to resources within the system such as Files or Pages.
    -   External links are links to resources outside the system.
-   **Link Description** -
    -   For hyperlinks, the link description is the text contained inside the element or "Link with no text".
    -   For other types of links, this column will contain a description of the type of tag containing the link to help users locate the link on the page (e.g. "Broken image source").
-   **Broken Link** - This is the value of the attribute that is considered broken. For an `<a>` tag, this would be the value of the `<href>` attribute.
    -   Hover over or click on the question mark ( ) icon next to the link for more information on why the link is considered broken.
    -   See [Elements Checked for Broken Links](https://www.hannonhill.com/cascadecms/latest/content-management/reports/broken-links-report.html#ElementsCheckedforBrokenLinks) for a full listing of elements and attributes that are checked for broken links.
-   **Status** - This column indicates whether or not the broken link has been fixed yet or not.
    -   Users can click the dropdown and select **Fixed** to indicate that the link has been fixed in some way, or **Ignored** to indicate that the link should be excluded from the Link Checker.
    -   Marking a link as Fixed or Ignored will reduce the number of links that are considered broken in the Broken Links Remaining summary of the report.
    -   Links marked as Fixed will be displayed as Fixed for all other users in the system.
    -   Note that a status of Fixed will revert back to its original value of **Broken** the next time the Link Checker runs if the link has not actually been fixed inside the corresponding asset.
    -   The first row in each set of grouped rows in the report will have two additional values in the status dropdown: **Mark all fixed** and **Mark all broken**. These values will mark all grouped rows as either Fixed or Broken, respectively.

**Note** - To access the Broken Links report data for a Site, users need the **Access site-wide broken link report** ability enabled in their Site Role. To mark links fixed in the report, users also need the **Mark broken links as fixed on the site-wide broken link report** ability enabled.

# Filtering the Report[](#FilteringtheReport)

![Filter options menu for broken links featuring selection for site, group type, and type options.](https://www.hannonhill.com/cascadecms/latest/content-management/reports/images/broken-links-report-filter.png)

The following filters are available to refine the results of the report:

-   **Site** - A Site must be selected to display report data.
-   **Group By** -
    -   Grouping by **Asset** displays all broken links found for each asset checked.
    -   Grouping by **Link** displays all assets containing a particular broken link.
-   **Type** - 
    -   Internal links are links to resources within the system such as Files or Pages.
    -   External links are links to resources outside the system.
-   **Hide Fixed** - When this option is enabled, links marked as Fixed are hidden from the report.
-   **Show Ignored, Allowed URLs and Valid Response Codes** - When this option is enabled, links marked Ignored, match a [Allowed URL](https://www.hannonhill.com/cascadecms/latest/cascade-administration/external-link-checking.html#AllowedURLs) or responded with a [Valid Response Code](https://www.hannonhill.com/cascadecms/latest/cascade-administration/external-link-checking.html#ValidResponseCodes) are displayed in the report.

# Fixing Broken Links[](#FixingBrokenLinks)

To fix a broken link:

1.  Locate the link you'd like to fix in the **Broken Link** column.
2.  Edit the asset listed in the **Source** column.
3.  You can either fix the link manually by searching for it in the content of the asset or perform a **Check Content & Submit** for the asset and fix the link during the broken link [content check](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-checks.html).

It's important to note that although a "source" asset is listed with each link, the broken link itself may exist in a supporting asset such as a Template, Format, or Block. These and other non-publishable supporting assets don't get checked for broken links directly. When following the steps above, if the broken link can't be found manually or using the on-submit link check, then it's likely that the broken link exists in a supporting asset.

# Elements Checked for Broken Links[](#ElementsCheckedforBrokenLinks)

Elements checked along with their attributes
| Element | Attributes |
| --- | --- |
| a | href |
| td | background |
| link | href, src |
| script | src |
| img | src |
| iframe | src |
| area | href, src, background |
| frame | src |
| param | href, src, background |
| embed | href, src |
| table | background |
| input | href, src, background |
| body | src, background |
| video | src, poster |
| source | src |
| audio | src |

[↑](#top)

# Related Links

-   [System Preferences](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html)
-   [External Link Checking Preferences](https://www.hannonhill.com/cascadecms/latest/cascade-administration/external-link-checking.html)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }