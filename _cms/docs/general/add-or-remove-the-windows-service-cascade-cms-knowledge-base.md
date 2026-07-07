---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/windows-service.html
title: Add or remove the Windows service - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Installation & Upgrades

# Installing the Windows service[](#InstallingtheWindowsservice)

The Cascade CMS Windows service can be installed by following these steps:

1.  Open a command prompt using the **Run as Administrator** option.
2.  Change into to the Cascade CMS installation folder.
3.  Enter: `installcascadeservice.bat`

A Windows service with the name `Cascade CMS` will be installed.

# Removing the Windows service[](#RemovingtheWindowsservice)

The Cascade CMS Windows service can be removed by following these steps:

1.  Open a command prompt using the **Run as Administrator** option.
2.  Change into to the Cascade CMS installation folder.
3.  Enter: `removecascadeservice.bat`

The Windows service with the name `Cascade CMS` will be removed.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }