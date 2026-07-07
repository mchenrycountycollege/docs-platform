---
source: https://www.hannonhill.com/cascadecms/latest/design-in-cascade/metadata-sets/metadata-fields-in-cascade.html
title: Metadata Fields in Cascade - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Metadata Sets

# Built-in Metadata Fields[](#Built-inMetadataFields)

Metadata fields are the default fields that are included with Cascade. They include:

-   **Display Name** - Commonly the short name of the asset title. Similar to a breadcrumb link or site map reference.
-   **Title** - The title of the asset.
-   **Summary** - The synopsis of the asset.
-   **Teaser** - A short enticing phrase about the asset.
-   **Keywords** - Words or phrases about the asset.
-   **Description** - The description of the asset.
-   **Author** - The person or organization responsible for the asset.
-   **[Review Date](https://www.hannonhill.com/cascadecms/latest/content-management/content-review.html)** - An optional date/time chooser; this field specifies when the asset's content should be reviewed.
-   **Start Date** - An optional date/time chooser; this field specifies the date and time the asset should "go live".
    -   Until the Start Date the asset will not be eligible for indexing or publishing.
    -   If the asset is enabled for publishing, it will be published at the Start Date to all Destinations that are both enabled and configured to be checked by default.
-   **End Date** - An optional date/time chooser; this field specifies the date and time the content should no longer be public.
    -   At the End Date, the asset is moved to an Expiration Folder, if specified, and **Include when publishing** and **Include when indexing** options are turned off for publishable assets.
    -   If system email is configured, expiration warning notices will be sent to the user that last modified the asset.
    -   If that user no longer exists, the expiration notice will be sent to the user that created the asset.
    -   If neither user can be found, no expiration notice is sent.
    -   You can specify how many days prior to an asset's expiration a first and second warning email should be sent in your System Preferences.
-   **Expiration Folder** - An optional folder chooser; this field specifies which folder the content should be moved to upon reaching the End Date.
    -   Assets which have an Expiration Folder can be automatically unpublished from all applicable Destinations if the site has the **Unpublish assets when they are moved to an expiration folder** option enabled in its Site Settings.

Display Name, Title, Summary, Teaser, Keywords, Description, and Author are all free-form text fields.

# Custom (or Dynamic) Metadata[](#CustomorDynamicMetadata)

Custom (or dynamic) metadata fields can include:

-   Custom **Text** fields.
-   Custom **Date-time** fields.
-   Custom **Dropdown** boxes with an optional preset default value.
-   Custom **Radio** button options with an optional preset default value.
-   Custom **Checkbox** options with an optional preset default value.
-   Custom **Multiselect** options with optional preset default values.

Custom Metadata fields are especially effective in allowing users to set categories for content (news, course catalogs, and departments, for example). They are also useful in creating filters for the use and display of content (e.g. creating a toggle for displaying or hiding content on a navigation menu).

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }