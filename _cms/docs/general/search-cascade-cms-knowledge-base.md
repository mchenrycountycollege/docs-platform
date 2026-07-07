---
source: https://www.hannonhill.com/cascadecms/latest/cascade-basics/search/index.html
title: Search - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

# Search

The search bar provides an easy way to perform powerful searches within the Cascade CMS content repository.

## Topics

-   [Full Search and Replace](https://www.hannonhill.com/cascadecms/latest/cascade-basics/search/full-search-and-replace.html)
-   [Why can't my users access the full search feature?](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/users-access-the-full-search.html)

## Overview[](#Overview)

The search bar provides an easy way to perform powerful searches within the Cascade CMS content repository. The single search field automatically searches all Home and Administration Area assets across the following fields:  

-   Username and Full Name
-   Author, Created By, and Modified By
-   System Name, Title, and Display Name
-   Description
-   Keywords
-   Summary
-   Teaser
-   Path
-   ID

A basic search will not search markup or XML elements within the content field.

Additional fields are available to search in the [Full Search and Replace](https://www.hannonhill.com/cascadecms/latest/cascade-basics/search/full-search-and-replace.html) feature.

[↑](#top)

## Using the Search Bar[](#UsingtheSearchBar)

To conduct a basic search:

1.  Click the **Search** bar in the upper-right-hand corner of the interface.
2.  Enter your search terms; the list of results will populate as terms are added.
    -   Only those assets for which you have read or write access will be listed.
    -   Assets in the current site will be listed first, with assets in other sites listed after.
3.  Click an asset to view it or right-click an asset to perform actions on it with the [context menu](https://hannonhill.cascadeserver.com/entity/open.act?type=page&id=a3e47ac90a894fa5303760f504570670&confId=c6415bd50a894fa568b1ecd4fb4c060b).
4.  To access the [Full Search and Replace](https://www.hannonhill.com/cascadecms/latest/cascade-basics/search/full-search-and-replace.html) feature, click **Go to Full Search** or press Enter**.**

**Tip** - Clicking the search bar will bring up the last 10 assets in your history. Click **See All History** to access your full history.

[↑](#top)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }