---
parent: Changelog
section: [v8.0.2](https://www.hannonhill.com/cascadecms/latest/releases/8.0.2/index.html)
part: 105 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.0.2](https://www.hannonhill.com/cascadecms/latest/releases/8.0.2/index.html)

## [v8.0.2](https://www.hannonhill.com/cascadecms/latest/releases/8.0.2/index.html)

### Improvements

-   Added a method to Serializer tool that serializes XML into JSON.  Can be used the convert a JDOM Element or an XML String to JSON using SerializerTool.toJson($element, true/false) or SerializerTool.toJson($string), respectively.
-   Allow Dynamic Metadata field values to be greater than 250 characters
-   API Updates - Improvements for both the Locator Tool and the Cascade Java API ([Details](https://www.hannonhill.com/cascadeserver/Cascade-API/Cascade API Changelog/index.html))
    -   New properties available
        -   $asset.linkingAssets - Returns a list of assets that reference the current asset (a programmatic way to retrieve the contents of the Relationships screen for an asset)
        -   $asset.assetType - Returns a String representing the type of the asset (e.g. "page" for pages)
        -   $block.blockType - Returns a String representing the specific type of a block (e.g. "feed", "index")
        -   $format.formatType - Returns a String representing the specific type of a format (e.g. "xslt", "script")
        -   $folderContainedAsset.site - Returns a com.hannonhill.cascade.api.asset.admin.Site representing the site in which a FolderContainedAsset (e.g. Page, File, Folder) resides.
        -   $administrationAreaAsset.site - Returns a com.hannonhill.cascade.api.asset.admin.Site representing the site in which a SiteManagementAreaAsset (e.g. Metadata Set, Data Definition) resides.
        -   $site.url - Returns the site URL property of a Site.
    -   New method available: $\_PropertyTool.isEmpty($something) - Determines if a String is null or empty.  An empty String is equal to "" after all stray space characters have been removed.

### Issues Resolved

-   Smart Fields in groups-restricted field sets do not work correctly for users who cannot see the smart field
-   Safari 10 - Main asset content overlaps edit options panel
-   Can't change LDAP configuration to use Secure port 636
-   Short usernames cause the user dropdown to be chopped off on the right side
-   TinyMCE dialogs cannot be focused
-   Publish Trigger configuration UI is broken
