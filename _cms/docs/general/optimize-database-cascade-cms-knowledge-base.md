---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/database-tools/optimize-database.html
title: Optimize Database - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Database Tools

# Overview[](#Overview)

The Optimize Database tool removes and/or repairs various records within the database. It is NOT recommended to run this tool frequently.

**Warning** - Before running any optimization tool, please backup your database to protect against data loss.

# Running the Optimize Database Tool[](#RunningtheOptimizeDatabaseTool)

To run the Optimize Database tool:

1.  Click the system menu button ( ) > **Administration** > **Optimize Database**.
2.  Select **Optimize Database**.
3.  Configure the following options:  
    -   **Remove notifications and expired announcements** - Removes notifications and expired announcements from the database.
    -   **Remove Smart Publishing information** - Removes all cache information used to intelligently decide when a published file needs to be re-transmitted to the destination server.
    -   **Remove old versions of assets** - Removes all but the current version for all version-capable assets from the database. This includes: pages, files, blocks, formats, templates and external links.
    -   **Remove orphaned records** - Removes all child records from the database that are no longer referenced by a parent record (e.g. blobs, metadata, page configurations, page regions, etc.).
    -   **Remove Background Task History** - Removes all background task history items before the selected start date/time.
4.  Click **Submit**.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }