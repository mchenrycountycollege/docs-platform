---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/set-start-date-plug-in.html
title: Set Start Date Plug-in - Cascade CMS Knowledge Base
category: asset-factory
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Asset Factory Plugins

# Overview[](#Overview)

This plugin sets the Start Date metadata field value to the current date and time with an optional offset.

# Parameters[](#Parameters)

-   **Offset**– The new asset's Start Date will be calculated by adding this offset (in seconds) to the asset's creation time.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }