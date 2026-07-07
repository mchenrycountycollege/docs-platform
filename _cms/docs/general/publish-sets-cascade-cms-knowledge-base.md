---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/publish-sets.html
title: Publish Sets - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Publishing

# Overview[](#Overview)

A Publish Set is a group of publishable assets that can be published on-demand, on a schedule, as a result of a [workflow trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/publish-set-trigger.html), or optionally as a part of publishing a page with an associated [Content Type](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/content-types/index.html). They may contain files, folders, and/or pages.

# Creating a Publish Set[](#CreatingaPublishSet)

To create a Publish Set:

1.  Navigate to **Manage Site** > **Publish Sets**.
2.  Navigate to the container in which the new **Publish Set** will be stored, or create a new container using **Add** > **Container**.
3.  Click **Add** > **Publish Set**.
4.  In the **Name** field, enter the name for your Publish Set.
5.  In the **Parent Container** field, select a container for the Publish Set, if desired.
6.  Under **Files**, **Folders**, and/or **Pages** add assets to be included in the set.
7.  Optionally, enable **Publish on a schedule** under the [**Scheduled Publishing**](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/index.html#ScheduledPublishing) tab.
8.  Click **Submit**.

[↑](#top)

# Related Links

-   [Publishing Related Content](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/publishing-related-content.html)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }