---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/data-definition-field-to-system-name-plug-in.html
title: Data Definition Field(s) to System Name Plug-in - Cascade CMS Knowledge Base
category: data-definitions
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Asset Factory Plugins

# Overview[](#Overview)

These plug-ins generate search engine friendly system names from one or more Data Definition fields.

**Note** - [Asset naming rules](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-naming-rules.html) will override the system name conversion done by the plug-in if the rules conflict.

# Multiple Data Definition Fields[](#MultipleDataDefinitionFields)

This Data Definition Fields to System Name Plug-in runs after the user submits the new page. First, it checks the system name of the new asset; if the new asset's name has not been changed, the plug-in takes the value of the Data Definition text fields specified by the "field identifiers" parameter, concatenates them together using the "concatenation token" parameter, makes the resulting string lower-case and then replaces all spaces with the "space token" string. It then sets the result to be the system name of the new asset.

**Field Identifiers** - A comma-separated list of the identifiers of Data Definition text nodes to pull the new name's segments from. These are the values that will be concatenated together. Each Data Definition node listed can be of the form `/group-identifier/.../node-identifier` where `...` represents any number of group identifiers separated by `/` characters. In the case where a Data Definition has multiple fields with the same identifier, this path can be used to specify which field should be used by the plugin.

**Concatenation Token** - The string that will be introduced between each "segment" taken from the Data Definition text nodes. If left blank or omitted, each "segment" will be concatenated together with nothing in between.

**Space Token** - The string that will replace spaces inside each "segment" if it contains spaces. If omitted, whitespace will be preserved. If specified but left blank, all whitespace will be removed.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }