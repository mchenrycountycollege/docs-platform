---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/xml-blocks.html
title: XML Blocks - Cascade CMS Knowledge Base
category: blocks
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Blocks

# Overview[](#Overview)

XML Blocks are reusable pieces of content stored as well-formed, static XML or XHTML. These blocks are particularly useful when there is content/data which must be included on one or more pages of a website.

Dealing with XHTML in particular, when the presentation layer is less of a consideration these blocks make managing the content much easier. For example, when wanting to manage links to CSS and/or Javascript files in one location, this type of content is not well-suited for managing in the WYSIWYG of an HTML Block.

# Creating an XML Block[](#CreatinganXMLBlock)

To create an index block:

1.  Click **Add Content** > **Default** > **Block**.
2.  Select **XML** and click **Choose**.
3.  In the **Name** field, enter a name for your block.
4.  In the **Placement Folder** field, choose the folder where the block should be created.
5.  You can add XML content to the block either by uploading an XML file or by entering content directly into the [code editor](https://www.hannonhill.com/cascadecms/latest/content-authoring/advanced-code-editor/index.html).
6.  Click **Preview Draft** and **Submit**.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }