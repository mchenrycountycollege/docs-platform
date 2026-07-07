---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/database-tools/path-repair-tool.html
title: Path Repair Tool - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Database Tools

# Overview[](#Overview)

Assets in Cascade CMS cache their path in the site to speed up certain operations in the system. Normally these paths are updated as the assets and their ancestors are moved, but they have been known to get out of sync. Situations that cause this problem are corrected as they are found, but in the case that the database is already in this state the Path Repair Tool can be used to correct it. Diagnosing this situation, however, is not possible through the Cascade CMS interface so the tool should only be done under the explicit direction by Hannon Hill Support.

**Warning** - Before running any optimization tool, please backup your database to protect against data loss.

# Running the Path Repair Tool[](#RunningthePathRepairTool)

To run the Path Repair Tool:

1.  Click the system menu button ( ) > **Administration** > **Optimize Database**.
2.  Select **Path Repair Tool**.
3.  Click **Submit**.

# Path Repair Tool Report[](#PathRepairToolReport)

After running the Path Repair Tool, a report is given detailing the status of the repair.

The **Properties** section gives the timestamp of when the tool was started and the status of the attempt (whether any inconsistent paths were found and if they were updated successfully).

The section labeled **Successfully Repaired** lists all of the assets which were found to have incorrect paths and were repaired without problems, along with the site to which they belonged.

The **Errors** section lists any assets which were not able to be repaired. Each item also includes the error which was encountered during the repair. A common problem is that the asset fails validation, e.g. a page without a configuration or content type, which must be corrected before the path is repaired.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }