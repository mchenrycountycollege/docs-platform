---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/display-to-system-name-plug-in.html
title: Display to System Name Plug-in - Cascade CMS Knowledge Base
category: asset-factory
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Asset Factory Plugins

# Overview[](#Overview)

This plug-in ensures that newly-created assets are given search engine friendly system names.

When using an Asset Factory with this plug-in assigned, the system name field is hidden. On submit, the plug-in takes the value in the Display Name metadata field, makes it search engine friendly, and this becomes the system name of the new asset. Making the name search engine friendly involves converting spaces to hyphens and removing any characters that are not A-Z, a-z, 0-9, hyphen, plus symbol, comma, or period.

If used with a File Asset Factory, the plug-in will also preserve the file extension, which will be appended to the system name. If no file is uploaded and the Asset Factory being used has a base asset assigned to it, then the base asset's file extension will be used. When neither a file is uploaded nor a base asset is assigned to the Asset Factory, no file extension will be preserved.

**Note** - [Asset naming rules](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-naming-rules.html) will override the system name conversion done by the plug-in if the rules conflict.

# Examples[](#Examples)

-   If a user uploads a file called *DSCN0009.jpg* and populates the Display Name field with "My House", this plug-in will set the name of the file asset to *my-house.jpg*.
-   If a user creates a new file asset using an Asset Factory with a base asset named *template.html* and populates the Display Name field with "Contact Us", this plug-in will set the name of the created file asset to *contact-us.html*.

**Tip** - This plug-in and the [Title to System Name Plug-in](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/title-to-system-name-plug-in.html) behave the same way with the exception of the metadata field used to generate the system name.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }