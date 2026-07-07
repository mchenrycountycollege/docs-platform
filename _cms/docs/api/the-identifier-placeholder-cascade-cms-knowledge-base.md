---
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/placeholders/identifier.html
title: The {identifier} placeholder - Cascade CMS Knowledge Base
category: api
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

# Overview[](#Overview)

## `{identifier}`

Either:

-   End of URL string for POST or GET requests: `{type}/{id}`. Example: `folder/2b2fd9bc7f0000010044b22e65131cd3`
-   End of URL string for POST or GET requests: `{type}/{siteName}/{path}`.  
    Example: `page/www.example.com/news/2003/best-of-show`
-   The identifier can also be provided in body in JSON format for POST requests only.  
    Example:
    
    `"identifier": {   "type": "page",   "path": {     "siteId": "2b2fd9a67f0000010044b22e4f6b0859",     "path": "news/2003/about"   } }`
    

**Note**: Notice that providing a site `id` for the identifier is not possible in a URL string.

[↑](#top)

# Related Links

-   [Operations](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/operations.html)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }