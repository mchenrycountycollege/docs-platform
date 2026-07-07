---
source: https://www.hannonhill.com/cascadecms/latest/design-in-cascade/content-types/index.html
title: Content Types - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

# Content Types

Content Types combine the look and feel of a page (Configurations) with the editable content fields of a page (Metadata Sets and Data Definitions) so that non-technical users can easily create and edit pages.

## Overview[](#Overview)

Content Types combine the look and feel of a page (Configuration) with the editable content fields of a page (Metadata Set and Data Definition/WYSIWYG) so that non-technical users can easily create and edit pages.

They provide an intuitive and logical way for end users to identify the proper type to associate with a page by grouping together the necessary outputs for predefined page types with familiar names, such as blog posts, press releases, standard content pages, and more.

[↑](#top)

## Creating a Content Type[](#CreatingaContentType)

To create a Content Type:

1.  Navigate to **Manage Site** > **Content Types**.
2.  Navigate to the container in which the new Content Type will be stored, or create a new container using **Add** > **Container**.
3.  Click **Add** > **Content Type**.
4.  In the **Name** field, enter the name for your Content Type.
5.  In the **Parent Container** field, select a container for the Content Type, if desired.
6.  In the **Settings** tab, select the following assets for all pages using this Content Type:  
    -   **Configuration**
    -   **Metadata Set**
    -   **Type of Content** - Select either a Data Definition or WYSIWYG.
7.  In the **Editable Fields** tab, regions from the selected Configuration can be made editable in-context while viewing the page.
    -   **Allow XHTML/Block contents to be edited in-context** - Most useful for static XHTML blocks, this option makes non-page content like headers and footers editable from the page view. Note that changes to XHTML blocks extend to all assets using the block, not just the page being edited.
    -   **Metadata Fields**and**Data Definition Fields** - Use the pencil icon to choose the fields that should be editable in-context. Regions with editable fields will be highlighted on hover in the page view.
8.  In the **Publish Options** tab, select which outputs should be published and to which Destination(s) they will be published. For example, a site redesign output might be published to a testing Destination while the current design may be published to a production Destination.
9.  Optionally, choose a **Publish Set** to associate with the Content Type. Assets in the associated Publish Set can be optionally published whenever a page of this Content Type is published.
10.  Click **Submit**.

[↑](#top)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }