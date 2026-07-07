---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/text-blocks.html
title: Text Blocks - Cascade CMS Knowledge Base
category: blocks
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Blocks

# Overview[](#Overview)

Text blocks are basic blocks of content that can be reused throughout a site much like an XHTML block. Text blocks are not as widely used as their XHTML counterpart is, because text blocks lack the standard WYSIWYG editor contained inside of XHTML blocks that allow for the creation of rich content with images, links, and standard text formatting options.

More often an XHTML block will be the desired solution; however, there are appropriate times to make use of a text block instead of an XHTML block. For example, where an administrator desires the user to enter plain text only, without any formatting or images. In this case, a text block is the appropriate solution for the content region. The administrator can then style the text block with a format. Like all blocks, a text block may be attached to a template, Configuration Set, or page, and may be reused across multiple pages. A single change to the text block will be present across all pages of the site that make use of the block.

# Creating a Text Block[](#CreatingaTextBlock)

To create a text block:

1.  Click **Add Content** > **Default** > **Block**.
2.  Select **Text** and click **Choose**.
3.  In the **Name** field, enter a name for your block.
4.  In the **Placement Folder** field, choose the folder where the block should be created.
5.  You can add text to the block either by uploading a plain text file or by entering text directly into the code editor.
6.  Click **Preview Draft** and **Submit**.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }