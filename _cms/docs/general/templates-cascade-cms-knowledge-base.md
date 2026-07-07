---
source: https://www.hannonhill.com/cascadecms/latest/design-in-cascade/templates/index.html
title: Templates - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

# Templates

Templates are XHTML documents that provide the structure of page assets. Templates typically contain the HTML scaffolding and necessary scripts and CSS files to produce the desired "look and feel" of a page.

## Introduction[](#Introduction)

Templates are XHTML documents that provide the structure of page assets. Templates typically contain the HTML scaffolding and necessary scripts and CSS files to produce the desired "look and feel" of a page.

In addition to HTML elements, [system tags](https://www.hannonhill.com/cascadecms/latest/content-authoring/pages/system-tags.html) are used in a template to define areas of content called regions. Once a region is defined in a template, it serves as a placeholder for interchangeable content in the form of static or dynamic [blocks](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/index.html).

[↑](#top)

## Creating a Template[](#CreatingaTemplate)

To create a template:

1.  Click **Add Content** > **Default** > **Template**.
2.  In the **Name** field, enter a name for your Template.
3.  In the **Placement Folder** field, choose the folder where the template should be created.
4.  In the **Content** tab, add content to your template either by uploading a plain text/HTML file or by entering content directly into the [code editor](https://www.hannonhill.com/cascadecms/latest/content-authoring/advanced-code-editor/index.html).
    -   Use [system tags](https://www.hannonhill.com/cascadecms/latest/content-authoring/pages/system-tags.html) to define content areas in your template.
5.  In the **Configure** tab, you will see system regions defined in the template which you can then populate with blocks and formats.
    -   Blocks and formats assigned at the template level will be inherited by all pages that use the template, but can be overridden at the Configuration or page levels.
    -   Optionally, you can select an XSLT format to apply at the template level.
6.  Click **Preview Draft** and **Submit**.

**Note** - All [Templates](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/templates/index.html) are required to include a system-region named `DEFAULT` which is populated with content specific to pages that use the Template. Other region names can be used to create as many additional content regions as necessary. If a `DEFAULT` region doesn't exist when the Template is created, one will automatically be added immediately after the opening `<body>` tag.

[↑](#top)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }