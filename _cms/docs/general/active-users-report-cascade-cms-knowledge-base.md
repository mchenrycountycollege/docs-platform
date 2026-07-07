---
source: https://www.hannonhill.com/cascadecms/latest/content-management/reports/active-users-report.html
title: Active Users Report - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Reports

# Overview[](#Overview)

![Active Users Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/images/active-users-report.png)

The Active Users report provides a list of users logged into the system. The report will display the following information for all users logged in over the past 24 hours:

-   **Name** - the username and full name of the user.
-   **Last Viewed** - the last asset viewed by the user.
-   **Last Action Time** - the time the user last performed an action. Hover over this entry in this column for an exact date/time.
-   **Login Time** - the time the user last logged in. Hover over this entry in this column for an exact date/time.

# Logging Out Users[](#LoggingOutUsers)

![Active Users Logout](https://www.hannonhill.com/cascadecms/latest/content-management/reports/images/active-users-logout.png)

If necessary, users with **Force logout of users** enabled in their System Role can force a logout of other Cascade CMS users. Forced logouts may prove useful when clearing out users in advance of downtime or a system upgrade, during routine maintenance, or to prevent unauthorized activity, among other examples.

To force a logout:

1.  Select a user or users from the list.
2.  Click the **Force Logout** button at the top of the list.

If the user uses Normal or LDAP authentication, using Force Logout you will also invalidate that user's "Remember me" functionality across all browsers.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }