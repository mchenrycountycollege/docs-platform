---
source: https://www.hannonhill.com/cascadecms/latest/content-management/trash.html
title: Trash - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Content Management

# Overview[](#Overview)

The **Trash** area allows you to view, restore, or empty all deleted assets in your Cascade CMS Site. Navigate to the Trash by clicking the icon at the top of the **Site Content** menu.  
  
![Screenshot of the trash area showing deleted items and their original locations.](https://www.hannonhill.com/cascadecms/latest/_images/trash-img.png)

**Notes:  
**\- Assets in the Trash may be scheduled for permanent deletion from the system via the **Remove items from Trash** after setting under **Manage Site > Site Settings**.  
\- The default setting for new Sites is **15 days**.  
\- Once items are removed from Trash there is no way to recover them after that point in time.

![Dropdown menu for selecting how long to retain items in Trash before automatic removal.](https://www.hannonhill.com/cascadecms/latest/_images/remove-trash-img1.png)

[↑](#top)

# Related Links

-   [How do I restore something I deleted from the trash / recycle bin?](https://www.hannonhill.com/cascadecms/latest/faqs/general/restore-from-trash.html)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }