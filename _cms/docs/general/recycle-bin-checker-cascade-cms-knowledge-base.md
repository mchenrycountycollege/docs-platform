---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/database-tools/recycle-bin-checker.html
title: Recycle Bin Checker - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Database Tools

# Overview[](#Overview)

The Recycle Bin Checker is a system tool used to correct data inconsistencies that may occur where the children of recycled assets are not marked as recycled. Situations that can cause this problem are corrected as they are found, but in the case that the database is already in this state this tool is available. Diagnosing this situation, however, is not possible through the Cascade CMS interface so the tool should only be done under the explicit direction of Hannon Hill Support.

**Warning** - Before running any optimization tool, please backup your database to protect against data loss.

# Running the Recycle Bin Checker[](#RunningtheRecycleBinChecker)

To run the Recycle Bin Checker:

1.  Click the system menu button ( ) > **Administration** > **Optimize Database**.
2.  Select **Recycle Bin Checker**.
3.  Click **Submit**.

# Recycle Bin Checker Report[](#RecycleBinCheckerReport)

After running the Recycle Bin Checker, a report is given detailing the status of the repair.

The **Properties** section gives the timestamp of when the tool was started and the status of the attempt (whether any inconsistent items were found and if they were updated successfully).

The section labeled **Successfully Repaired** lists all of the assets which were found to be inconsistent and were repaired without problems, along with the site to which they belonged.

The **Errors** section lists any assets which were not able to be repaired. Each item also includes the error which was encountered during the repair.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }