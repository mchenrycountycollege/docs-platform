---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/friendly-page-name.html
title: Friendly Page Name Plug-in - Cascade CMS Knowledge Base
category: asset-factory
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Asset Factory Plugins

# Overview[](#Overview)

This plug-in validates the system name of new page assets against a configurable regular expression.

**Note** - This plug-in is applicable to Asset Factories for pages only.

**Note** - This plug-in will supercede [asset naming rules](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-naming-rules.html) for page assets. To prevent confusion, it's recommended that your regular expression comply with the site's asset naming rules.

# Parameters[](#Parameters)

-   **Name Regex** - The system name of pages created by this Asset Factory must match this regular expression.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }