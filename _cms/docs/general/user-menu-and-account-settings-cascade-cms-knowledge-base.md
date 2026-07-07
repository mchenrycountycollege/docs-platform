---
source: https://www.hannonhill.com/cascadecms/latest/cascade-basics/account-settings.html
title: User Menu and Account Settings - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Cascade Basics

# Overview[](#Overview)

![Screenshot demonstrating location of user menu](https://www.hannonhill.com/cascadecms/latest/cascade-basics/images/user-menu-dropdown.png)

Your account settings are accessible when viewing any area in Cascade CMS. To access them, click on the letter representing your name (or your profile picture if you have one set) in the upper-right corner.

-   **Starred** - View your starred assets in the [My Content](https://www.hannonhill.com/cascadecms/latest/cascade-basics/my-content.html) area.
-   **History** - View your recently-visited assets in the [My Content](https://www.hannonhill.com/cascadecms/latest/cascade-basics/my-content.html) area.
-   **Notifications** - View your notifications such as workflow notifications, publish reports, and user mentions.
-   **Tasks** - View [tasks](https://www.hannonhill.com/cascadecms/latest/content-management/tasks.html) that are assigned to you.
-   **Settings** - Configure some basic preferences for how you interact with Cascade CMS (see [Account Settings](https://www.hannonhill.com/cascadecms/latest/cascade-basics/account-settings.html#AccountSettings)).
-   **API Key** - Manage your API Key used to authenticate with scripts and applications (see [User API Key](https://www.hannonhill.com/cascadecms/latest/cascade-basics/account-settings.html#APIKey)).
-   **Sign Out** - Log out of Cascade CMS. After a period of inactivity set by your CMS administrator, you'll be logged out automatically.

# Account Settings[](#AccountSettings)

To access your account settings, click on the user menu button and then click **Settings**. The following settings are available to configure:

-   **Appearance of Asset Links** - View assets by either their Title/Display Name or their system name in Cascade CMS. For more information, see [Asset Display Options](https://www.hannonhill.com/cascadecms/latest/cascade-basics/asset-display-options.html).
-   **Daily Content Report** - Subscribe or unsubscribe from the [Daily Content Report](https://www.hannonhill.com/cascadecms/latest/cascade-basics/daily-content-report.html) if it's enabled for your system.
-   **Default Site** - Choose your default site here to pre-filter new dashboard widgets and reports to display data from this site.
-   **Notification Duration** - Adjust the duration of notifications displayed within the interface.
-   **Change Password** - If your organization uses Active Directory, LDAP, or something similar for logging in users, you won't see this option.
-   **Change Profile Photo** - Drag and drop an image file or choose one from your computer to create a profile image. This image will be displayed next to your username in Cascade CMS.

**Notes  
**The maximum size for profile images is 1.04MB.  
  
Changing password will invalidate "Remember me" functionality across all browsers. You will need to log in again in order to use the "Remember me" feature for future sessions.

# API Key[](#APIKey)

Your API Key is unique to your user account and can be used to authenticate with [Web Services](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html) scripts and applications in place of a traditional username and password.

-   **Generate a new key** to open a dialog which displays a new, unique API Key. This key is only shown once and can't be retrieved again, so be sure to store it somewhere safe.
-   If you lose your API Key, you can **Regenerate** it. Again, the generated key will only be shown once.
-   If you no longer need your API Key, you can **Revoke** it entirely. Once revoked, scripts and applications must authenticate using a traditional username and password.

Once an API Key is generated, the following information will be provided on the API Key screen:

-   **Preview** - a preview of the beginning of your API Key.
-   **Generated at** - the date that your current API Key was generated. For security purposes, you may wish to periodically regenerate your API Key.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }