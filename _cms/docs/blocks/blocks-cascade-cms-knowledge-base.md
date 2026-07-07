---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/index.html
title: Blocks - Cascade CMS Knowledge Base
category: blocks
scraped: 2026-02-16
version: cascade-cms-latest
---

# Blocks

A block is a piece of content that can be inserted (with or without styling) into any page region.

## Topics

-   [Index Blocks](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/index-blocks.html)
-   [XHTML/Data Definition Blocks](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/xhtml-blocks.html)
-   [Feed Blocks](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/feed-blocks.html)
-   [XML Blocks](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/xml-blocks.html)
-   [Text Blocks](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/text-blocks.html)

## Introduction[](#Introduction)

A block is a piece of content that can be inserted (with or without styling) into any page region. Therefore, whenever there is content that is common to many pages or regions, e.g. an “About the Company” section that appears after every press release and newsletter, that content should be put into a block. Doing so allows the appropriate content to appear in many pages while always being updated from one place, making it easy to maintain consistency in that text/markup across many pages. Cascade users can reuse a single block on an unlimited amount of page regions.

Blocks can contain static content, content that does not change unless modified by a user, or dynamic content, content that changes based on updates outside of Cascade CMS or other day-to-day activities.

There are five types of blocks in Cascade CMS:

1.  [**Index Block**](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/index-blocks.html "Index Block Cascade CMS") \- Used to dynamically generate system assets as XML.
2.  [**Text Block**](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/text-blocks.html "Text Block Cascade CMS") \- Static text content.
3.  **[XML Block](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/xml-blocks.html "XML Block Cascade CMS")** \- Static XML content.
4.  [**XHTML/Data Definition Block**](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/xhtml-blocks.html "XHTML Block Cascade CMS") \- XHTML content or Data Definition form fields for editing content.
5.  **[Feed Block (XML)](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/feed-blocks.html "XML Feed Block")** \- Dynamic XML from a third-party server (e.g. RSS feed).

The text or markup contained by a block can be plugged into a page region at three different levels:

-   Template level
-   Configuration level
-   Page level

When a block is plugged into a page region at the template level, the block content will appear in any pages using that template. Any blocks assigned at the page configuration level will appear in any pages using that configuration. [↑](#top)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }