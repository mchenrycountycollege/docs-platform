---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/external-links/index.html
title: External Links - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

# External Links

An external link is an asset that points to a website hosted outside of Cascade CMS.

## Overview[](#Overview)

An external link is an asset that points to a website hosted outside of Cascade CMS. Because they can be indexed by an index block, external links are useful when you need to include external websites in a dynamic navigation menu.

External links are also great for centralizing links that are used in many locations throughout your site. If the external link URL changes later on, you'll be able to update it in a single location.

[↑](#top)

## Adding an External Link[](#AddinganExternalLink)

To create an external link:

1.  Click **Add Content** > **Default** > **External Link**.
2.  In the **Name** field, enter a name for your external link.
3.  In the **Placement Folder** field, choose the folder where the external link should be created. If you're including the link in an index block, for a dynamic navigation menu for example, place it with the content you want to index.
4.  In the **Link** field, enter the full URL of the website you want to index.
5.  In the **Metadata** tab, enter any necessary metadata for your external link (title, summary, etc.). You can change the Metadata Set for the external link in the Content tab under Properties.
6.  Click **Preview Draft** and **Submit**.

[↑](#top)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }