---
source: https://www.hannonhill.com/cascadecms/latest/content-management/relationships.html
title: Relationships - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Content Management

# Overview[](#Overview)

View and publish content that links to an asset. You can view an asset's relationships by selecting **More > Relationships.**  
  
The Relationships menu will display all assets that are related, either directly or manually, to another asset. For example, Pages or Blocks that link to the page you're viewing will be listed as Relationships for that page.  
  

**Note:**Linked Relationships are created by a chooser OR a direct link (`<a href="..." />`). Links created dynamically in a Velocity Format will not show up as a Relationship, unless added as a Manual Relationship. 

 ![Screenshot of the CMS interface showing relationships for an asset including options to publish related assets.](https://www.hannonhill.com/cascadecms/latest/_images/kb-relationships-img.png)

[↑](#top)

# Related Links

-   [Publishing Related Content](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/publishing-related-content.html)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }