---
source: https://www.hannonhill.com/cascadecms/latest/cascade-basics/using-the-context-menu.html
title: Context Menu - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Cascade Basics

# Overview[](#Overview)

The context menu, accessible by right-clicking on any asset, provides you with a menu of available actions for that asset. Only actions you have permission to take will be available. For example, if you don't have permission to edit a page, the **Edit** option will not be available in the context menu.

![asset context menu](https://www.hannonhill.com/cascadecms/latest/cascade-basics/images/right-click.png)

# Available Actions[](#AvailableActions)

1.  **Star / Unstar** (/) - Star the asset to easily find it again. Your starred assets can be found in the [My Content](https://www.hannonhill.com/cascadecms/latest/cascade-basics/my-content.html) area and Dashboard widget and in asset choosers.
2.  **Name** - The system name of the asset, which is used in the published URL if it's a publishable asset such as a page, file, or folder. Click the asset link to preview it in the CMS or click the **View on the live website** () link to view it on your live web server (if published).
3.  **Path** - The site name and relative path of the asset within the site. Click the **Click to copy path** () link to copy the asset's path to your clipboard.
4.  **Edit** - Edit the asset.
5.  **Publish** (for publishable assets such as files, pages, and folders) - Publish the asset.

Additional options are available are available under the **More** menu:

1.  **Move** - Move the asset to another location.
2.  **Rename** - Change the system name of the asset.
3.  **Copy** - Make a copy of the asset.
4.  **Delete** - Delete the asset.
5.  **Unpublish** (for publishable assets such as files, pages, and folders) - Remove the asset from the web server.
6.  **[Access](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/access-rights.html)** - Set read and write permissions for the asset.
7.  **[Access for contents](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/access-rights.html)** (for folders) - Update permissions for assets inside the folder.
8.  [**Check-out/Lock**](https://www.hannonhill.com/cascadecms/latest/cascade-basics/drafts-and-working-copies.html#CheckingOutLockingAssets) - Lock an asset to create a Working Copy and prevent others from submitting changes to it.
9.  **[Workflows](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/index.html)** (for folders) - Assign workflows for the contents of the selected folder.
10.  **Bulk Change** (for folders) - Change one or more of the following properties of assets contained in the selected folder in bulk:
     -   Content Type (for pages)
     -   Metadata Set (for folders, files, blocks, and/or links)
     -   Data Definition (for XHTML/Data Definition blocks)
11.  **Relationships** - View (and publish, if applicable) content that links to the asset.
12.  **[Audits](https://www.hannonhill.com/cascadecms/latest/cascade-administration/audits.html)** - View a summary of activities related to the asset.
13.  **[Versions](https://www.hannonhill.com/cascadecms/latest/content-authoring/versions.html)** - View previous versions of the asset.
14.  **[Reference](https://www.hannonhill.com/cascadecms/latest/content-authoring/references.html)** - Create an aliased link that allows the asset to be indexed in another location.
15.  **[Tasks](https://www.hannonhill.com/cascadecms/latest/content-management/tasks.html)** - View tasks associated with the asset.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }