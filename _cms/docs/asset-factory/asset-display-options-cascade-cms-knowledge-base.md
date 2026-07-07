---
source: https://www.hannonhill.com/cascadecms/latest/cascade-basics/asset-display-options.html
title: Asset Display Options - Cascade CMS Knowledge Base
category: asset-factory
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Cascade Basics

# Overview[](#Overview)

Cascade CMS provides two options to display asset links: by their system name (as in previous Cascade CMS versions) or by their Title or Display Name.

By default, if a folder, page, or file has a Title or Display Name metadata field filled out, it will appear on all asset links throughout your Cascade CMS environment. It is important to note that the formal paths and published filenames are different from what is shown in Cascade CMS with this display method.

In the example below, both sets of folders have the same contents. When this site is published, users will see a web URL of http://www.example.edu/*about* or http://www.example.edu/*gallery*instead of the the corresponding Title/Display Name fields "About Hannon Hill University" or "Photo Gallery".

![Folders as they appear with Show Asset Title/Display Name enabled](https://www.hannonhill.com/cascadecms/latest/cascade-basics/images/site-content-display-name-enabled.png)

Asset links as they appear with Show Asset's Title/Display Name enabled.

![Folders as they appear with Show Asset Title/Display Name disabled](https://www.hannonhill.com/cascadecms/latest/cascade-basics/images/site-content-display-name-disabled.png)

Asset links as they appear with Show Asset's Title/Display Name disabled.

**Tip** - Mouse over any asset name in the Site Content display area to see its full path (system name and path relative to the site's root directory).

# Toggling Asset Display Options[](#TogglingAssetDisplayOptions)

Asset links are displayed by their Title or Display Name by default, but this can be toggled in favor of displaying the asset's system name.

![Appearance of Asset Links Toggle](https://www.hannonhill.com/cascadecms/latest/cascade-basics/images/assetdisplay-toggle.png)

## At the User Level

-   Click on your **User** icon in the upper right-hand corner and then click **Settings**.
-   Under **Appearance of Asset Links**, toggle the **Show asset's Title or Display Name if available** option.

### At the System Level

-   Click the system menu button ( ) > **Administration** > **Preferences** > **Content** > **Assets**.
-   Under **Appearance of Asset Links**, toggle the **Show asset's Title or Display Name if available** option.

Disabling the Title/Display Name option at the system level will override the existing user preference for displaying asset links if a user has not saved that preference.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }