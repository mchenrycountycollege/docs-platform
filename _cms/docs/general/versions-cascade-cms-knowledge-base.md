---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/versions.html
title: Versions - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Content Authoring

# Overview[](#Overview)

Cascade CMS maintains a version history for Site Content and Manage Site assets. As changes are made to assets, Cascade CMS keeps track of the changes in separate copies of the asset called versions.

Each version has a timestamp that allows you to see when the change was made, optional version comments describing the change, and previous versions of an asset can be restored or compared to the current version.

![Versions](https://www.hannonhill.com/cascadecms/latest/cascade-basics/images/versions.png)

# Viewing Versions[](#ViewingVersions)

To view asset versions, click **More** > **Versions** while viewing an asset. The details of the current version of the asset will appear at the top of the window. Past versions will be listed below with the following details:

-   **Name** - The version number (automatically generated) and asset link for that version. Hover over the name to view the asset path.
-   **Last Modified** - The time that this version was last modified and the user who last edited the asset. Hover over the time to get the exact date and time.
-   **Comments** (for Site Content assets)\- Any comments relevant to a particular version. Some version comments will be [automatically generated](https://www.hannonhill.com/cascadecms/latest/cascade-basics/comments.html#VersionComments).

To view a previous version of an asset, click the asset link for that version in the Name column to open it in the main content area. From this view you can click **More** to access additional actions such as restore, delete, view an older or newer version, and view the current version.

# Restoring a Version[](#RestoringaVersion)

To restore a version, select it from the versions list and click the **Restore this version** icon at the top of the list.

When previewing the version you wish to restore, click **More** > **Restore this version**.

**Tip** - Restoring a version does not wipe out the current version for an asset. The current version becomes versioned as well, allowing you to effectively "undo" the restoration.

# Comparing with Current[](#ComparingwithCurrent)

The version comparison screen will render both versions of the page and highlight any differences *within the **DEFAULT** region* using the following rules:

-   Text that has been added is highlighted in green
-   Text that has been removed is highlighted in pink and is struck-through
-   Modifying text is considered as old text removed and new text added
-   Changes and updates to style (i.e. change from bold to italic) is highlighted in purple

To compare a version of a Page asset with the current version, select it and click the **Compare with current** icon at the top of the list.

When previewing the version you wish to compare to the current version, click **More** > **Compare with current**.

[↑](#top)

# Related Links

-   [How does the Max Asset Versions setting affect existing versions?](https://www.hannonhill.com/cascadecms/latest/faqs/general/max-asset-versions-setting.html)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }