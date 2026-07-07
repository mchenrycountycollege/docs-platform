---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/administration-tools/logs-and-system-information.html
title: Logs and System Information - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Administration Tools

# Overview[](#Overview)

This area of the system allows system administrators to download log files and view other information related to the application's environment (memory, JVM settings, O/S version, etc). You can access it by clicking the system menu button ( ) > **Administration** > **Logs and System Information**.

# System Information[](#SystemInformation)

The **System Information** tab contains information related to the application's environment including:

-   System time
-   Memory allocation/usage
-   License details
-   Java/JVM details
-   Application server O/S vendor/version
-   Database vendor/version
-   Web application server vendor/version

# Logs[](#Logs)

The **Logs** tab will present you with a listing of `cascade.log` files available in your instance of Cascade CMS. From this interface, you can search log files by date and download them in **txt** or **zip** format by clicking on the corresponding buttons in the **Download** column of the table listing.

This interface can be useful for CMS administrators who need to retrieve log files but who may not have direct access to the application server where the log files are stored on disk.

**Tip** - The log file containing the latest information will always be named `cascade.log` until it rolls over and a datestamp is appended.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }