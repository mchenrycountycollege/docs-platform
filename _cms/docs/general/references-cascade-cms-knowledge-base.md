---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/references.html
title: References - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Content Authoring

# Overview[](#Overview)

A reference is a special asset in Cascade CMS that represents an existing asset in another location; thus, a single asset can appear to exist in multiple locations. While a single asset appears in navigation as if it were in multiple locations, in actuality, it directs back to the original asset.

The reference, when indexed by an index block, will render content for the linked-to asset. Deleting the reference will have no effect on the referenced asset.

References are a great way of creating index block renders, as users can create a folder of explicitly-chosen content that can be quickly indexed by an index block that is set to render the references in the folder.

References are often used to display links in navigation menus in other folders than where the page actually resides.

# Creating a Reference[](#CreatingaReference)

To create a reference:

1.  Right-click on the asset to be referenced and select **Reference** from the context menu. Alternatively, click **More** > **Reference** while viewing the asset in question.
2.  Select a **Name** for the reference. Note that the Title and Display Name for the reference will be pulled from the original asset being referenced.
3.  Select a **Placement Folder** for the reference.
4.  Click **Submit**.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }