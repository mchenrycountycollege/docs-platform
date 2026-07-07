---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/index.html
title: Sites - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

# Sites

Sites are containers for organizing all content and administrative assets and properties for a website in Cascade CMS.

## Topics

-   [Site Import and Export](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/site-import-and-export.html)

## Overview[](#Overview)

Sites are containers for organizing all content and administrative assets and properties for a website in Cascade CMS. Administrators can grant access to site content and abilities within a site for specific users and/or groups through the assignment of [Site Roles](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/roles.html).

You can access the Sites menu by clicking the system menu button ( ) > **Sites**. The following information will be displayed for all sites:

-   **Name**
-   **URL**
-   **Last Activity** - The last time a Site Content asset was created or updated.
-   **Users** - The number of users assigned a Site Role in the site either directly or through one of their groups.

Click on any Site in the list to view the site's Manage Site area. Additional options are available in the **More** menu while viewing a site:

-   **Copy** - Copying a site will copy the Site object itself as well as all of its contents from both the Site Content and Manage Site areas.
    -   Copying a site creates new assets to which the user who copied the site will have write access. Existing read and write permissions for assets are not preserved with a site copy the way they are with an exported site object (see "Export" below).
    -   Any links or relationships between assets within the same copied site will point to the newly-created versions of those assets.
    -   When the site copy completes, a site copy report will be added to the Notifications for the user who initiated the copy process. Any problems that occur during the copy will be listed in the report.
-   [**Export**](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/site-import-and-export.html) - Export the site as a CSSE file that can be imported into a Cascade CMS environment.
-   **Publish** - Publish all publishable site content assets in the site.
-   **Unpublish** - Unpublish all publishable site content assets in the site.
-   [**Access**](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/access-rights.html) - Grant read/write access to the site object itself. Note that access to a site's content area is controlled through the assignment of [Site Roles](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/roles.html).
-   **Naming Issues** - View a list of assets in the site that don't adhere to the asset naming rules specified in Site Settings.

[↑](#top)

## Creating a Site[](#CreatingaSite)

To create a site:

1.  Click the system menu button ( ) > **Sites** and select **Add Site**.
2.  In the **Configure** tab, fill out the following required fields (additional [Site Settings](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/index.html#SiteSettings) may be configured later):
    -   **Name** - Enter a name for your site.
    -   **URL** - Enter the fully-qualified URL of your site. This URL will be prepended to an asset's path in the site during publish.
3.  In the **Roles** tab, select [Site Roles](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/roles.html) to assign to your site. Then select users and/or groups to assign to those roles.
4.  Click **Create Site**.

You can also create a site by importing an existing Cascade CMS site export file. For more information, see [Site Import and Export](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/site-import-and-export.html).

**Notes:  
**

-   Your site's **URL** must be a fully-qualified URL (contains `http://` or `https://`). To prevent your content from being blocked by browsers, we recommend the use of secure `https://`.
-   Valid characters for a Site's **Name** are as follows: `A-Z a-z 0-9 . - + _ , @ <space>`

[↑](#top)

## Site Settings[](#SiteSettings)

The following site properties can be configured under **Manage Site** > **Site Settings**.

-   **Extensions to Strip** - A comma-separated list of extensions (such as .html, .php).
    -   Cross-site links pointing to assets in the site will have the specified extensions stripped.
    -   Use this field in conjunction with the **Extensions to Strip** field in your site's [Destinations](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/destinations.html) to create extensionless links throughout the site.
    -   The web server will need to be configured to map the extensionless links to the appropriate files (for example, with an .htaccess file).
-   **Default Metadata Set** - Select the default [Metadata Set](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/metadata-sets/index.html) for assets in your site.
-   **Asset Factory Container** - Asset Factories in the selected container will appear under the New Content widget for the site on the dashboard.
-   **Default WYSIWYG Editor Configuration** - Select the default [WYSIWYG Editor Configuration](https://www.hannonhill.com/cascadecms/latest/content-authoring/wysiwyg-editor-configurations/index.html) for your site.
-   **Starting Page** - The selected page will appear under the New Content widget for the site on the dashboard.
-   **Remove items from Trash after** - Select the number of days assets will remain in the Trash before they're purged from the system.
-   [**Content Checks**](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-checks.html) - Choose whether the site will inherit the content check settings set at the system level, or enable/disable individual checks for the site.
-   **Link Rewriting** - Choose how links between assets within the site are rewritten during publish. Assets in the site will inherit this setting by default, but it can be overridden at the individual asset level.
    -   **Absolute** - Links between assets within the current site are prefixed with the Site URL or the Destination Web URL (if present, when [linking to a specific Output](https://www.hannonhill.com/cascadecms/latest/content-authoring/linking.html#LinkRewritingUsingDestinationURLs)). Example: `https://www.example.com/path/to/page.html`
    -   **Relative** (default) - Links between assets within the current site are written relative to the location of this asset. Example: `../page.html`
    -   **Site-relative** - Links between assets within the current site are written relative to the base folder of the current site. Example: `/path/to/page.html`
-   [**Asset Naming Rules**](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-naming-rules.html) - Choose whether the site will inherit the asset naming rules set at the system level, or configure asset naming rules for the site. Note that changes to asset naming rules are *not* retroactive and will apply to new assets only.
-   **Scheduled Link Checker** - Choose whether or not links in the site will be checked during the [Scheduled Link Check](https://www.hannonhill.com/cascadecms/latest/content-management/reports/broken-links-report.html) configured in the System Preferences.
-   **Check External Links on Publish** - Choose whether or not external links will be checked during publish jobs. Managed links to internal assets are always checked and reported on.
-   **Unpublish assets when they are moved to an expiration folder** - Choose whether or not assets will be unpublished from all available Destinations when they're moved into an [expiration folder](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/metadata-sets/metadata-fields-in-cascade.html).
-   **Publish on a schedule** - In this section you can configure your site to publish at regular intervals. For more information, check out [Scheduled Publishing](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/index.html#ScheduledPublishing).
-   **Enable Siteimprove Integration** - If you're utilizing the [Siteimprove Integration](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/siteimprove-integration.html), this setting enables or disables the integration for the site.
-   **Siteimprove URL** - If you're utilizing the [Siteimprove Integration](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/siteimprove-integration.html) and the URL of your site in Siteimprove is different than the **URL** of your site in Cascade CMS (see above), specify your Siteimprove URL here to ensure page and site data is displayed correctly in the plugin.

[↑](#top)

## Deleting a Site[](#DeletingaSite)

To delete a site:

1.  Click the system menu button ( ) > **Sites**.
2.  Select a site from the list and click the Delete ( ) button at the top of the list.

**Note** - You can only select and delete one site at a time.

[↑](#top)

## Importing or Exporting a Site[](#ImportingorExportingaSite)

Cascade CMS supports the transfer of content and administrative properties from one Cascade CMS environment to another by way of exporting and importing sites. For more information, see [Site Import and Export](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/site-import-and-export.html). [↑](#top)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }