---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/administration-tools/broadcast-messages.html
title: Announcements - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Administration Tools

# Overview[](#Overview)

Announcements allow administrators to create and display messages to users working in the CMS. Notify users about scheduled maintenance, provide links to your own documentation or training materials, or display contact information for your web team or help desk.

# Creating Announcements[](#CreatingAnnouncements)

![sticky announcements widget on the dashboard](https://www.hannonhill.com/cascadecms/latest/cascade-administration/administration-tools/images/sticky-announcements-widget.png)

To create an announcement:

1.  Click the system menu button ( ) > **Administration** > **Announcements**.
2.  Click **Create**.
3.  Fill in the following fields:  
    -   **Announcement Type** (required) - used to determine the style of the message.  
        -   **Notification** - displays a popup-style message to all active users and users who log in before the announcement expires and persists until the user dismisses the message.
        -   **Sticky** - displays in a Sticky widget on all user Dashboards and persists until the announcement is deleted.
    -   **Subject** - a title displayed at the top of the message.
    -   **Message** (required) - the content of the message.
    -   **Start showing on** (for Notifications) - specifies when the message should start being displayed to users. If left blank, the message will start being displayed immediately.
    -   **Stop showing on** (for Notifications) - specifies when the message should no longer be displayed to users. If left blank, the announcement will not expire.
4.  Click **Submit**.

# Viewing and Deleting Announcements[](#ViewingandDeletingAnnouncements)

The **Announcements** screen displays a list of all active and pending announcements and their authors. You can edit existing Sticky announcements at any time and Notifications before their start time has passed. Announcements that have expired (the **Stop showing on** date has passed) will not be displayed here.

To edit Sticky announcements or pending Notifications:

1.  Click the announcement you'd like to edit.
2.  Click the **Edit** link.

To delete active or pending announcements:

1.  Use the checkboxes to select the announcement(s) you'd like to delete.
2.  Click the **Delete** button that appears above the table listing to remove the selected announcement(s).
3.  Alternatively, click the announcement you'd like to delete and then click the **Delete** link.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }