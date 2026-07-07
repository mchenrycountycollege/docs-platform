---
source: https://www.hannonhill.com/cascadecms/latest/design-in-cascade/configurations/index.html
title: Configurations - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

# Configurations

Configurations are collections of one or more outputs that are used to display page content.

## Topics

-   [Linking to Specific Outputs](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/configurations/linking-to-specific-outputs.html)

## Overview[](#Overview)

Configurations are collections of one or more outputs that are used to display page content. Outputs allow page content to take different forms when published. For example, pages can be published as traditional HTML files, RSS feeds, PDF files, and printer-friendly formats simultaneously. Changes to a page's content are replicated through the rest of its outputs.

To make large numbers of outputs manageable, Cascade CMS uses Configurations to group a number of outputs, along with their respective templates, and block and format assignments. For example:

-   You have 100 pages that all need the same five outputs. Without a Configuration, you would have to create, manage, and edit 500 different outputs (100 pages x 5 outputs).
-   You also need to change a page region assignment for your HTML output across all 100 pages. Without Configurations, this would have to be done 100 times (one for each page with that output).

With Configurations, however, you're able to define your five outputs at the Configuration level, and each page that uses that Configuration inherits the output and page region assignments.

Configurations can be overridden at the page level, for example, to change a block or region assignment. This doesn't affect the assignment of the page to the Configuration, so the override can later be removed, at which point the page will default back to the Configuration-level assignments.

[↑](#top)

## Creating a Configuration[](#CreatingaConfiguration)

When creating a new Configuration, you must also create one or more outputs.

To create a Configuration:  

1.  Navigate to **Manage Site** > **Configurations**.
2.  Navigate to the container in which the new Configuration will be stored, or create a new container using **Add** > **Container**.
3.  Click **Add** > **Configuration**.
4.  In the **Name** field, enter the name for your Configuration.
5.  In the **Parent Container** field, select a container for your Configuration, if desired.
6.  In the section that follows, you'll create your outputs. For each output, configure the following fields:  
    -   **Name** (required) - Enter a descriptive name for your output. Typically, this will represent the type of content data published or template selected (HTML, XML, mobile, etc.)
    -   **Default Output** - The default output is the one that is preselected when viewing or editing a page in the interface and is the primary choice for publishing.
    -   **Type of Data** - Choose the type of data being published in this output, note that this will only affect how the data is viewed inside Cascade CMS: HTML, XML, PDF, RTF, JSON, JS (JavaScript), or CSS.
    -   **File Extension** (required) - The file extension to use when publishing pages using this output.
        -   The extension is appended directly to the page name during publish, so it should include any periods you may want in the final filename. Example: .html or .php
    -   **Template** - Choose the template that this output will use.
        -   Once a template is chosen, the template's regions will populate the Regions section below.
    -   **XSLT Format** - Select an optional XSLT Format that will be used to transform the content for any pages that use this output.
        -   This transformation happens at the very end after all individual regions have been rendered and assembled together.
    -   **Publishable** - This option toggles whether or not an output is externally publishable; this is particularly useful for redesign projects.
    -   **Include XML Declaration in Published Files** - This option forces the inclusion of an XML declaration: `<?xml version="1.0" encoding="UTF-8" ?>` at the top of the page's content.
    -   **Regions** - For each region supplied by the output's template you can configure the following:
        -   Select a [block](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/index.html) to assign to that region. Use the "No Block" checkbox to override and remove any block assignment inherited from the template that should not be used for this output.
        -   Select a [format](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/index.html) to assign to that region. Use the "No Format" checkbox to override and remove any format assignment inherited from the template that should not be used for this output.
7.  Click **Preview Draft** and **Submit**.

[↑](#top)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }