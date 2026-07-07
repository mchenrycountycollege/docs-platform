---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/xhtml-blocks.html
title: XHTML/Data Definition Blocks - Cascade CMS Knowledge Base
category: blocks
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Blocks

# Overview[](#Overview)

An XHTML/Data Definition block is a reusable block of content that provides a rich word processing (WYSIWYG) interface or Data Definition form fields for editing content. Unlike a text block, an XHTML block allows for a wide range of HTML elements to be created inside of its editing environment extending to items such as images, links, tables, and bullet points in addition to other standard text formatting.

XHTML/Data Definition blocks are particularly useful for fixed regions of content such as headers and footers that need to stay constant among all pages within the site. A single change to one of these blocks will be present across all pages of the site that make use of the block.

# Creating an XHTML/Data Definition Block[](#CreatinganXHTMLDataDefinitionBlock)

To create an XHTML/Data Definition block:

1.  Click **Add Content** > **Default** > **Block**.
2.  Select **XHTML/Data Definition** and click **Choose**.
3.  In the **Name** field, enter a name for your block.
4.  In the **Placement Folder** field, choose the folder where the block should be created.
5.  Enter content into the WYSIWYG field, or [add a Data Definition](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/xhtml-blocks.html#AddingaDataDefinition) if desired.
6.  Click **Preview Draft** and **Submit**.

# Adding a Data Definition[](#AddingaDataDefinition)

Data Definitions can be added to XHTML blocks to provide a standardized structure to content added to a Cascade CMS page. For example, a contact section with a phone number field, address field, and an email address field could be built as part of a Data Definition and those fields could be reused across pages as a block.

To add a Data Definition to an XHTML/Data Definition block:

1.  Select the **Properties** tab.
2.  With the **Data Definition** chooser, select a Data Definition and click **Choose**.
3.  Select the **Content** tab to resume editing within the Data Definition structure.
4.  Click **Preview Draft** and **Submit**.

**Note** - If content has been entered in the WYSIWYG prior to applying a Data Definition to the block, that content will be transferred to the first available WYSIWYG field defined in the Data Definition. If the Data Definition does not have any WYSIWYG fields, the content will not be transferred.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }