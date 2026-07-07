---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/file-limit-plug-in.html
title: File Limit Plug-in - Cascade CMS Knowledge Base
category: asset-factory
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Asset Factory Plugins

# Overview[](#Overview)

This plugin limits file assets to a specific size and/or system name.

For example, this plug-in can be configured to limit file extensions to .jpg or .png and the file size to <10MB. If either of those conditions are not satisfied, the asset won't be created and a message will be displayed to the user explaining why.

# Parameters[](#Parameters)

-   **Size** – Files created by this Asset Factory may not be larger than this size (in kilobytes).
-   **Filename Regex** – The system name of files created by this Asset Factory must match this regular expression. This is useful for restricting file extensions for documents and images. 

**Note** - This plug-in is applicable to Asset Factories for files only.

**Note** - This plug-in will supercede [asset naming rules](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-naming-rules.html) for file assets. To prevent confusion, it's recommended that your regular expression comply with the site's asset naming rules for file assets.

**Note** - The regex must be PCRE (Perl-compatible regular expressions).

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }