---
source: https://www.hannonhill.com/cascadecms/latest/cascade-basics/search/full-search-and-replace.html
title: Full Search and Replace - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Search

# Overview[](#Overview)

Full Search offers a more fine-tuned search capability than a basic search and includes filters to select Sites, asset types, and asset fields to search. Full Search searches all Home and Administration Area assets across the following fields:

-   Username and Full Name
-   Author, Owner, Created By, and Modified By
-   System Name, Title, and Display Name
-   Description
-   Keywords
-   Tags
-   Summary
-   Teaser
-   Path
-   Link
-   Asset Type
-   Asset ID
-   Site and Site ID
-   Velocity Format content
-   XML content
-   Binary Large OBject (BLOB) data

Note that not all fields are applicable for all asset types.

# Conducting a Full Search[](#ConductingaFullSearch)

![full search options](https://www.hannonhill.com/cascadecms/latest/cascade-basics/search/images/full-search-options.png)

To conduct a full search:

1.  Enter your search terms in the Search box in the top-right of the Cascade CMS interface and either press Enter or click the **Go to Full Search** link. The list of results will populate as terms are added.
    -   Only those assets for which you have read or write access will be listed.
    -   By default, 20 assets will be listed per page. To jump to another page of results, select a page number or click previous or next below the search results.
2.  Optionally, expand the **Advanced Options** menu to use the Site, asset types, and/or asset fields filters to further refine your list of results.
3.  Click an asset to view it or right-click an asset to perform actions on it with the [context menu](https://hannonhill.cascadeserver.com/entity/open.act?type=page&id=a3e47ac90a894fa5303760f504570670&confId=c6415bd50a894fa568b1ecd4fb4c060b).

## Search Tips

-   To match a multi-word phrase like "ice cream", put quotes `""` around your search terms.
-   Use `?` as a single-character wildcard. For example, a search for `fac?s` will return "facts" and "faces".
-   Use `*` as a multiple-character wildcard. For example, a search for `fac*s` will return "facts", "faces", and "factories".

**Note** - The maximum number of search results is capped at **5000**. If you're hitting this max, we recommend using the Advanced Options to limit the scope of your search operation.

# Replacing Content[](#ReplacingContent)

![search and replace](https://www.hannonhill.com/cascadecms/latest/cascade-basics/search/images/search-and-replace.png)

The Replace Content feature allows users to quickly change multiple assets at once. To replace content:

1.  Select the assets you wish to update from the list of search results and click **Replace Content** at the top of the list.
2.  In the Replacement Text field, type the text you wish to replace the search terms with in the assets to be updated.
    -   Text replacement will replace partial matches in content. Replacing the word "app" will replace "apple".
    -   Text replacement is also case insensitive. Replacing the word "house" will replace "House" or "HOUSE".
3.  Click **Replace**.

**Note** - Content replacement is only available to users with access to the Administration area and write access to the selected assets. Content replacement will not be processed through workflow.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }