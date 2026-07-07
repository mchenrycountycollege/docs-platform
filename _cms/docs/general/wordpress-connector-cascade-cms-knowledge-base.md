---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/how-to-set-up-a-wordpress-connector.html
title: WordPress Connector - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Connectors and Integrations

# Creating a WordPress Connector[](#CreatingaWordPressConnector)

To create a WordPress Connector:

1.  Navigate to **Manage Site** > **Connectors**.
2.  Navigate to the container in which the new Connector will be stored, or create a new container using **Add** > **Container**.
3.  Click **Add** > **Connector**.
4.  Select **WordPress** and then click **Choose**.
5.  In the **Name** field, enter the name for your Connector.
6.  In the **Parent Container** field, select a container for your Connector, if desired.
7.  In the **Setting** tab, configure the following fields:
    -   **URL** - Enter the URL to the WordPress environment.
    -   **Username / Password** - Enter the username and password that you use to login into the WordPress environment selected above. If either field changes in WordPress, the Connector will need to be updated and re-verified.
8.  In the **Content Types** tab, configure the following fields:
    -   **Content Type** - Select a Content Type to associate with the Connector.
        -   When selected, the page Output, Metadata mapping for categories, and Metadata mapping for tags fields will be auto-populated using information associated with the selected Content Type.
        -   Due to the way Cascade publishes content to WordPress, multiple WordPress Connectors within a site cannot use the same Content Type and output combination.
    -   **Output** - Select an output to use when publishing to the Connector.
    -   **Metadata mapping for categories** - Dropdown menu of all available metadata fields associated with the Content Type to use for WordPress categories.
        -   The values in the metadata fields are used to associate the WordPress post to a category.
        -   Multiple categories can be assigned using a comma-separated list in plain-text fields, or radio button and multi-select dropdown [dynamic metadata](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/metadata-sets/metadata-fields-in-cascade.html#CustomorDynamicMetadata) fields.
        -   Start Date, End Date, Expiration Folder, Review Date and any hidden metadata fields do not appear in the metadata field dropdown.
    -   **Metadata mapping for tags** - Same as metadata mapping for categories, but to associate the metadata values to WordPress tags on a post.
9.  Click **Submit**.

# Verifying/Unverifying a WordPress Connector[](#VerifyingUnverifyingaWordPressConnector)

To verify or unverify your WordPress connector:

1.  While viewing (but not editing) your Connector, click **Verify**.
2.  A message will be displayed indicating whether or not the Connector has been verified using the URL, username, and password specified. If unsuccessful, an appropriate error message will be displayed.
3.  Once verified, the **Unverify** link is available to deactivate the Connector.

# Publishing Using a WordPress Connector[](#PublishingUsingaWordPressConnector)

The rendered content in the default region of the output selected in your Connector's Content Type is the content that is synchronized with WordPress.

You can publish any of the following to sync your page with WordPress:

-   The page itself.
-   The parent folder of the page.
-   The page's site via Manage Site.
-   A Destination in the current site.
-   A Publish Set containing the page.

When publishing only to WordPress, it's not necessary to select any Destinations in order for content to be synchronized. Connectors existing in the current site that are enabled will be listed on the publish screen and will be automatically processed when publishing.

Note, however, that only Connectors which are deemed applicable to assets included in the publish will be used during the publish. When publishing only with Connectors, assets that don't apply to any of the enabled Connectors will show up in the corresponding publish report under the Skipped Jobs section.

To publish an asset to both WordPress and a Destination, choose the Destinations to publish to on the publish screen.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }