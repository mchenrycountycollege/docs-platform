---
source: https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/index.html
title: Data Definitions - Cascade CMS Knowledge Base
category: data-definitions
scraped: 2026-02-16
version: cascade-cms-latest
---

# Data Definitions

A Data Definition is a collection of fields used in the creation and editing of page and block content.

## Topics

-   [Shared Fields](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/shared-fields.html)
-   [Smart Fields](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/what-are-smart-fields.html)
-   [Data Definition XML Schema Reference](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/data-definition-xml-schema-reference.html)

## Overview[](#Overview)

A Data Definition is a collection of fields used in the creation and editing of page and block content. Data Definitions allow users to enter content in a series of form fields to create structured pages without the need for additional formatting via a WYSIWYG, for example.

Data Definitions support 15 types of input including WYSIWYG ("What You See Is What You Get") rich-text fields, checkboxes, radio buttons, multi-select and drop-down lists, and page and file choosers that reference content managed in Cascade CMS. All content entered in a Data Definition will be stored as reusable XML that can be styled with [formats](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/index.html).

There are five basic steps in creating and implementing a Data Definition:

1.  Create a Data Definition using the drag-and-drop Data Definition Builder or write/import Data Definition XML.
2.  Assign the Data Definition to a page via its [Content Type](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/content-types/index.html) or to an [XHTML/Data Definition block](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/xhtml-blocks.html).
3.  Edit the page or block, and fill in your Data Definition's form fields.
4.  Use the XML output from the page or block to write a corresponding [Velocity or XSLT format](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/index.html).
5.  Apply the format to the appropriate page region to transform it into markup.

[↑](#top)

## Creating a Data Definition[](#CreatingaDataDefinition)

To create a Data Definition:

1.  Navigate to **Manage Site** > **Data Definitions**.
2.  Navigate to the container in which the new Data Definition will be stored, or create a new container using **Add** > **Container**.
3.  Click **Add** > **Data Definition**.
4.  In the **Name** field, enter the name for your Data Definition.
5.  In the **Parent Container** field, select a container for the Data Definition, if desired.
6.  There are two interface options when creating a Data Definition:
    -   **XML** - An XML editor (see [Data Definition XML Schema Reference](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/data-definition-xml-schema-reference.html)).
    -   **Builder** - A visual drag-and-drop interface.
7.  The **Builder** has 15 field types to choose from (see [Data Definition Field Types](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/index.html#DataDefinitionFieldTypes)). Click and drag fields into the desired location on the form.
8.  If you'd like to add an existing [Shared Field](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/shared-fields.html) to the form, click **Choose Shared Field**. Otherwise, configure the field settings described below:  
    -   **Identifier** - The identifier of the field which will appear in the XML rendering of an asset that contains this field. Fields within the same group can't share the same identifier.
    -   **Label** - The name of the field that will be visible to users entering content in the field.
    -   **Help text** - Allows you to provide instructions to users about the field's usage and purpose.
    -   **Required** - Determines whether users are required to enter a value for that field before allowing them to save their content.
    -   **Values** (radio, drop-down, checkbox, and multiselect fields) - Provide one or more values.
    -   **Value labels** (radio, drop-down, checkbox, and multiselect fields) (optional) - Specify labels for values. Value labels allow you to update the visible label for field values without affecting values stored in existing pages/blocks.
    -   **Collapsed** (field groups) - This setting determines if the group is collapsed by default when editing the page.
9.  Click **Show Advanced Settings** to see additional field options. These options vary by field type selected and include:  
    -   **Multiple** - Allows users to create multiple instances of this field or group.
    -   **Minimum/Maximum number** - When combined with the "Multiple" setting, limits the number of instances of the same field that can be created.
    -   **Restrict to groups** - Limits the visibility of the field to members of a comma-separated list of Cascade CMS group names.
    -   **Restrict to folder** (chooser and WYSIWYG fields) - Limits asset selection and uploads to a designated folder. For WYSIWYG fields, this setting effects the **Insert/edit image** menu.
    -   **Render content depth** (chooser fields) - This setting determines how many levels of chooser field content are included in the XML rendering. For example, if a page or block chosen in the chooser field also contains chooser fields, and you want to render the content of the assets chosen in those fields, set the depth to 2. If you want to include the content of assets chosen in Level 2's chooser fields, set the depth to 3, and so on.
10.  Click **Submit** when finished configuring field settings.

**Warning** - To avoid loss of content in existing pages and blocks, do not alter or remove `field-id` attributes if you're editing the Data Definition's XML.

[↑](#top)

## Data Definition Field Types[](#DataDefinitionFieldTypes)

![Data Definition Builder](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/images/ddef-builder.png)

There are 15 field types available in the Data Definition Builder. From left to right, they are:

-   **Group** - A collection of fields, often used to organize other fields for improved usability and readability. Groups can be nested.
-   **Text Field** - A single-line plain text field.
-   **Text Area** - A multi-line plain text field.
-   **WYSIWYG Editor** - A rich text editor with optional source code editing. [WYSIWYG Editor Configurations](https://www.hannonhill.com/cascadecms/latest/content-authoring/wysiwyg-editor-configurations/index.html) can be used to manage the tools available to users in the editor.
-   **Checkbox** - A single checkbox or a group of checkbox fields.
-   **Drop-down Menu** - A drop-down field for selecting a single option from a list.
-   **Radio Button** - A single radio button or a group of radio button fields.
-   **Multi-select Chooser** - A multi-select field for selecting one or more items from a list.
-   **Calendar** - A date chooser.
-   **Date Time** - A date/time chooser with hour/minute and AM/PM selectors.
-   **Page Chooser** - A chooser field for selecting internal pages. Example: a list of related links.
-   **File Chooser** - A chooser field for selecting internal files. Examples: image for an employee biography page or a banner image upload.
-   **Block Chooser** - A chooser field for selecting internal blocks. Examples: XHTML / Data Definition Blocks or XML Blocks.
-   **External Link (Symlink) Chooser** - A chooser field for selecting External Link assets.
-   **Linkable Chooser** - A chooser field for selecting an internal page, file, or external link asset.

[↑](#top)

## Reordering Data Definition Fields[](#ReorderingDataDefinitionFields)

You can drag and drop fields in a Data Definition with the drag handle ( ) located to the right of each field.

**Warning** - To avoid loss of content in existing pages and blocks, use caution when moving a field out of a group that permits multiple groups, or into a group that either doesn't permit multiple groups OR has a lower maximum number of groups allowed.

[↑](#top)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }