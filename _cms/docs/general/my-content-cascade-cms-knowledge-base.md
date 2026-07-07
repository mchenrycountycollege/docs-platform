---
source: https://www.hannonhill.com/cascadecms/latest/cascade-basics/my-content.html
title: My Content - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Cascade Basics

# Overview[](#Overview)

The**My Content** area and dashboard widget allow you to quickly access all of the content you're responsible for:

-   **Starred** - Assets you've starred.
-   **Recent** - Assets you've accessed recently.
-   **Owned Content** - Assets for which you're the assigned content owner.
-   **Drafts** - Your unsubmitted drafts for both existing and newly-created assets. To discard drafts of assets in this list, select one or more drafts and click the **Discard** trash can icon at the top of the list.
-   **Workflows** - Workflows you've started and workflows where you or one of your groups owns the current step.
-   **Locked Assets** - Assets you've checked-out/locked. To discard changes to assets in this list, select one or more assets and click the **Break Lock** padlock icon at the top of the list.
-   **Tasks Assigned to Me** - Your assigned tasks. From this list you can resolve or delete existing tasks or add new ones.

The content displayed in this area includes assets from all sites you have access to. You can sort and filter the assets in the My Content area by using the column headers and search boxes. Click on any item to view that asset or action item.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }