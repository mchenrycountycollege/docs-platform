---
source: https://www.hannonhill.com/cascadecms/latest/design-in-cascade/configurations/linking-to-specific-outputs.html
title: Linking to Specific Outputs - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Configurations

# Overview[](#Overview)

Once you've created outputs for your content, you'll need a way to allow site visitors to browse to them (to subscribe to an RSS feed, access the printer-friendly version of a page, etc.). To do this, Cascade CMS has special `system-page-output` attributes that can be added to links to create links to specific outputs. On publish, the system will automatically remove this attribute and insert the correct `href` attribute in its place.

`<p>     <a system-page-output=“pdf”>PDF</a><br/> <a system-page-output="printer">Printer Friendly</a><br/> <a system-page-output="xml">XML</a><br/> </p>` 

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }