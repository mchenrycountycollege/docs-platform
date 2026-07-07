---
source: https://www.hannonhill.com/cascadecms/latest/design-in-cascade/metadata-sets/index.html
title: Metadata Sets - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

# Metadata Sets

Metadata is data within the CMS that describes an asset. A Metadata Set represents a curated collection of metadata fields used to describe content.

## Topics

-   [Metadata Fields in Cascade](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/metadata-sets/metadata-fields-in-cascade.html)

## Overview[](#Overview)

Metadata is data within the CMS that describes an asset. Common fields such as title, summary, or keywords provide quick information about the content contained inside of a particular asset. Because the system manages all assets as XML, the metadata that a user enters for assets can be used for display purposes on site pages. When used in conjunction with Index Blocks, an Format can be applied to the metadata to create common HTML content listings such as a listing of recent press releases including the title and a quick summary of the press release content.

A Metadata Set represents a curated collection of metadata fields used to describe content. Of the [eleven standard metadata fields](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/metadata-sets/metadata-fields-in-cascade.html) in the Cascade CMS Metadata Set, content may require the use of some, most, or all of them, and Metadata Sets give administrators the ability to tailor content to suit their needs. News articles, for example, may use the author field while interior-type content pages may not.

[↑](#top)

## Creating a Metadata Set[](#CreatingaMetadataSet)

To create a metadata set:

1.  Navigate to **Manage Site** > **Metadata Sets**and click **Add**.
2.  From here you can either create a Container to group similar Metadata Sets (everything news-oriented, for example) or a Metadata Set.
3.  In the **Name** field, enter the name for your Metadata Set.
4.  In the**Parent Container** field, select a Container for the Metadata Set, if desired.
5.  Cascade CMS has [eleven standard metadata fields](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/metadata-sets/metadata-fields-in-cascade.html) and they are listed under the **Built-in Fields** tab. For each field, configure the following:
    -   **Help Text** (optional) - Allows you to provide instructions to users about the field's usage and purpose.
    -   **Visibility** - Determines whether a field is shown inline with content in the content tab (Inline), shown in the metadata tab (Visible), or hidden completely (Hidden).
    -   **Required** (optional) - Determines whether users are required to enter a value for that field before allowing them to save their content.
6.  In addition to the standard fields, Cascade CMS also allows for additional, ad-hoc metadata to be added through the **Custom Fields** tab. The types of input fields available are **Text**, **Date-time**, **Radio**, **Dropdown**, **Checkbox** or **Multiselect**. For each custom field, configure the following:  
    -   **Name** - The name of the field, will appear in the XML rendering of an asset that contains this field.
    -   **Field Label** - The visible name of the field that will appear on the screen when the affected content is edited.
    -   **Values** - For Radio, Dropdown, Checkbox, and Multiselect fields you will also need to provide one or more values.
        -   To specify that a value should be selected by default, enable the **Default** checkbox next to the field value.
        -   Radioand Dropdown fields can have only one default value.
        -   The Radio, Checkbox, and Multiselect field types do not allow empty values.
        -   The Dropdown field type allows one empty value as long as there is at least one other non-empty value.
    -   **Value Labels** (optional) - For Radio, Dropdown, Checkbox, and Multiselect fields you can also specify optional labels for values. This allows you to manage the visible label for field values without affecting existing stored values.
    -   To change the order of fields in this tab, click the dotted line next to the field and drag it to its new location.
7.  Click **Submit**.

[↑](#top)

[↑](#top)