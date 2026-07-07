---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/feed-blocks.html
title: Feed Blocks - Cascade CMS Knowledge Base
category: blocks
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Blocks

# Overview[](#Overview)

XML feed blocks pull their XML content from a web location. This can be useful when aggregating outside RSS links or receiving output from dynamic scripts or web applications that produce XML.

XML feed blocks have one parameter, the feed URL, which is the location that will respond with an XML document. Cascade CMS then takes that XML content and populates the block with it. The block can then be styled using an format and included in a page region just like any other block in the system.

# Creating a Feed Block[](#CreatingaFeedBlock)

To create a feed block:

1.  Click **Add Content** > **Default** > **Block.**
2.  Select **Feed** and click **Choose**.
3.  In the **Name** field, enter a name for your block.
4.  In the **Placement Folder** field, choose the folder where the block should be created.
5.  In the **Feed URL** field, enter the fully-qualified URL of a valid XML feed.
6.  Click **Preview Draft** and **Submit**.

**Note:** Unless otherwise noted by Hannon Hill Support, Feed Block responses are cached for 5 minutes.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }