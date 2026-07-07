---
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/internal-cascade-api/internal-cascade-api-changelog.html
title: Internal Cascade API Changelog - Cascade CMS Knowledge Base
category: api
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Internal Cascade API

# Cascade CMS 8.25[](#CascadeCMS8_25)

## New methods added to existing Cascade API objects

-   New `com.hannonhill.cascade.apl.asset.common.PermissionLevel` enum added with values `NONE`, `READ` and `WRITE`
-   New methods added to `com.hannonhill.cascade.apl.asset.home.PermissionsCapableAsset`
    -   `getAllPermissionLevel()` - returns the `PermissionLevel` applied to all users that do not have an explicit ACL entry
    -   `setAllPermissionLevel(PermissionLevel)` - updates the `PermissionLevel` for the asset
    -   `addReadAccessUser(String)` - adds an explicit READ permission for the given user name
    -   `addWriteAccessUser(String)` - adds an explicit WRITE permission for the given user name
    -   `addReadAccessGroup(String)` - adds an explicit READ permission for the given group name
    -   `addWriteAccessGroup(String)` - adds an explicit WRITE permission for the given group name
    -   `clearPermissions()` - Clears explicit ACL entries and sets all permission level to NONE
-   New methods added to `com.hannonhill.cascade.api.asset.common.StructuredDataNode` for consistency with `DynamicMetadataField`:
    -   `getValue()`
    -   `getValues()`
    -   `hasValue(String)`

# Cascade CMS 8.22[](#CascadeCMS8_22)

## New Query API Methods

-   [$\_.query().byDataDefinition](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#__query_byDataDefinition)
-   [$\_.query().bySiteName](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#__query_bySiteName)
-   [$\_.query().byFolderPath](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#__query_byFolderPath)
-   [$\_.query().hasAnyPaths](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#__query_hasAnyPaths)
-   [$\_.query().hasStructuredData](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#__query_hasStructuredData)
-   [$\_.query().hasAnyStructuredDataValues](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#__query_hasAnyStructuredDataValues)
-   [$\_.query().hasStructuredDataByFieldId](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#__query_hasStructuredDataByFieldId)
-   [$\_.query().hasAnyStructuredDataValuesByFieldId](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#__query_hasAnyStructuredDataValuesByFieldId)
-   [$\_.query().preloadDynamicMetadata](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#__query_preloadDynamicMetadata)
-   [$\_.query().preloadStructuredData](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#__query_preloadStructuredData)

# Cascade Cloud v20220802[](#CascadeCloudv20220802)

## New methods added to existing Cascade API objects

-   New methods added to `com.hannonhill.cascade.api.asset.home.StructuredDataCapableAsset`
    -   `getStructuredDataNodeWithFieldId()` - returns the first found `StructuredDataNode` that matches given `field-id`
    -   `getStructuredDataNodesWithFieldId()` - returns a `List<StructuredDataNode>` of `StructuredDataNode` objects that match given `field-id`
-   New methods added to `com.hannonhill.cascade.api.asset.common.StructuredDataNode`
    -   `getChildWithFieldId()` - returns the first found child `StructuredDataNode` that matches given `field-id`
    -   `getChildrenWithFieldId()` - returns a `List<StructuredDataNode>` of child `StructuredDataNode` objects that match given `field-id`
    -   `getDefinitionFieldId()` - returns the `field-id` for the `StructuredDataNode`

# Cascade CMS 8.16[](#CascadeCMS8_16)

## New Cascade API Objects

-   `com.hannonhill.cascade.api.asset.admin.ContentType` - represents a Content Type asset
    -   This object inherits all methods from `SiteManagementAreaAsset`
-   `com.hannonhill.cascade.api.asset.admin.MetadataSet` - represents a Metadata Set asset
    -   This object inherits all methods from `SiteManagementAreaAsset`
-   `com.hannonhill.cascade.api.asset.admin.StructuredDataDefinition` - represents a Data Definition asset
    -   This object inherits all methods from `SiteManagementAreaAsset`
-   `com.hannonhill.cascade.api.asset.common.FieldItem` - contains the `label` and `value` information of an individual item that can be selected for a given checkbox, radio, dropdown or multiselect Dynamic Metadata or Structured Data field. If no label is present, the value will be used as the field item's label.
-   `com.hannonhill.cascade.api.asset.common.ImageDimensions` - contains the width and height (in pixels) for an image file

## New methods added to existing Cascade API Objects

-   New methods added to `com.hannonhill.cascade.api.asset.home.Page`
    -   `getDataDefinition()` - returns `com.hannonhill.cascade.api.asset.admin.StructuredDataDefinition`, which is the Data Definition associated with the Page
    -   `getContentType()` - returns `com.hannonhill.cascade.api.asset.admin.ContentType`, which is the Content Type associated with the Page
-   New method added to `com.hannonhill.cascade.api.asset.home.XHTMLDataDefinitionBlock`
    -   `getDataDefinition()` - returns `com.hannonhill.cascade.api.asset.admin.StructuredDataDefinition`, which is the Data Definition associated with the Block
-   New method added to `com.hannonhill.cascade.api.asset.home.MetadataAwareAsset`
    -   `getMetadataSet()` - returns `com.hannonhill.cascade.api.asset.admin.MetadataSet`, which is the Metadata Set associated with the asset
-   New method added to `com.hannonhill.cascade.api.asset.home.File`
    -   `getImageDimensions()` - returns `com.hannonhill.cascade.api.asset.common.ImageDimensions`, which are the dimentions of an image file, if present
-   `DynamicMetadataField.getPossibleFieldItems()` and `StructuredDataNode.getPossibleFieldItems()` returns a `List<FieldItem>` of all possible field items that can be selected for a given checkbox, radio, dropdown or multiselect field. An empty list will be returned for fields that do not support selecting field items.
-   `DynamicMetadataField.getSelectedFieldItems()` and `StructuredDataNode.getSelectedFieldItems()` returns a `List<FieldItem>` of all selected field items for a given checkbox, radio, dropdown or multiselect field. An empty list will be returned for fields that do not support selecting field items.
    -   Note: dropdowns that allow custom values will return a field item which uses the custom value as its `label` and `value`.
-   Added `StructuredDataNode.getLabel()` to access the label of a given Structured Data field.

## New Locator Tool Methods

-   `locateFormat(String path, String siteName)` and `locateFormat(String path)` - returns a Format at the given path and in the given site (optional).
-   `locateLinkable(String path, String siteName)` and `locateLinkable(String path)` - returns a Page, File, External Link, or Block at the given path and in the given site (optional).

## Improvements

-   When working with API objects, metadata and dynamic metadata fields will be cached after loading to improve rendering time during operations such as sorting on dynamic metadata values.

# Cascade CMS 8.13[](#CascadeCMS8_13)

## Fixed

-   The `TextBlockAPIAdapter.getText` method will no longer return a wrapping `<system-xml>` element with the Block's text content.

# Cascade CMS 8.12[](#CascadeCMS8_12)

## Improvements

-   Consecutive calls with `structuredData`, `getStructuredDataNode()`, or `getStructuredDataNodes()` will now be cached to improve rendering times.

## Removed

-   `StructuredDataNode.identifier.id` will no longer return an `id` for `group` elements.

# Cascade CMS 8.11[](#CascadeCMS8_11)

## New Cascade API Methods

-   `DynamicMetadataField.hasValue(String)` - checks if the given value is within the selected values.
-   `DynamicMetadataField.isDatetime()` - returns `true` if the field is a date-time field.

# Cascade CMS 8.9[](#CascadeCMS8_9)

## New Cascade API methods:

-   `FolderContainedAsset.getTags()` - Returns a list of Strings that are tag names assigned to given asset.
    -   Velocity example: `#set($pageTags = $page.tags)`.
-   `Site.getAvailableTags()` - Returns a list of Strings that are tags available in given site, which includes system level tags. The resulting list has unique values and #is sorted alphabetically.
    -   Velocity example: `#set($allTags = $page.site.availableTags)`

## New Query API methods:

-   `hasAnyTags(['tag1', 'tag2'])` - Limits the search results to assets that have at least one of given tags
-   `hasTag('tag')` - Same as calling `hasAnyTags(['tag'])`
-   `hasAnyMetadataValues(String fieldName, Collection<String> fieldValues)` - Same as calling the existing `hasMetadata(String fieldName, Collection<String> fieldValues)`, but the method name has been updated to be more clear about the method is doing (similar to `hasAnyTags`).
    -   Deprecated:  `hasMetadata(fieldName, values)`
-   The `toString()` method for Query API with the information about tags
-   The hard max limit on Query API returned assets has been **increased from 500 to 2,000** to help with use cases where 500 assets was not enough.
    -   A note about performance: tests have shown that fetching 2,000 assets takes ~2 times longer than fetching 400 assets.

## Other Improvements

-   The `FolderContainedAsset.getLinkingAssets()` method will now return assets linked through Data Definition chooser fields

# Cascade CMS 8.7[](#CascadeCMS8_7)

`Site` asset has 3 new methods:

-   `getNamingRuleCase()`
-   `getNamingRuleSpacing()`
-   `getNamingRuleAssets()`

These methods return effective naming rules inside of that site. This means that if the `Site` inherits naming rules, the system-wide naming rules will be returned.

Also, a new method `transform()` has been added to `FilenameNormalizer` that transforms given asset's name based on the naming rules inside of the asset's site. 

```
systemName = utilityProvider.getFilenameNormalizer().transform(asset, systemName);
```

# Cascade CMS 8.6[](#CascadeCMS8_6)

## Improvements

-   Added a new method `StructuredDataNode.hasTextValue(String)` that checks if the given value is within the selected values.

## Fixed

-   `StructuredDataNode.getTextValues()` no longer returns an extra empty value.

# Cascade CMS 8.1.1[](#CascadeCMS8_1_1)

## New methods exposed on objects

Asset now expose a label property `$asset.label` that returns Display Name, Title, or the asset's system name -- whichever is populated first. This is convenience method for quickly accessing this information.

# 8.0.2[](#8_0_2)

## New API objects

-   New API object`com.hannonhill.cascade.api.asset.admin.Site` that represents a Site asset  
    -   This object inherits all methods from `PermissionsCapableAsset`
    -   In addition to these methods, it has `getUrl``()` method that returns String URL of the Site.
-   New class that API objects inherit from `com.hannonhill.cascade.api.asset.admin.SiteManagementAreaAsset`
    -   This class inherits from com.hannonhill.cascade.api.asset.common.PermissionsCapableAsset
    -   It contains method getSite() which returns`com.hannonhill.cascade.api.asset.admin.Site,` which is a Site in which the asset is located.
-   API objects that now inherit from `com.hannonhill.cascade.api.asset.admin.SiteManagementAreaAsset`:
    -   `com.hannonhill.cascade.api.asset.admin.DestinationContainer`
    -   `com.hannonhill.cascade.api.asset.admin.Transport`
    -   `com.hannonhill.cascade.api.asset.admin.Destination`
    -   `com.hannonhill.cascade.api.asset.admin.AssetFactory`

## New methods in existing API objects

-   New method in`com.hannonhill.cascade.webservice.schema.FolderContainedAsset`
    -   `getSite()`\- returns`com.hannonhill.cascade.api.asset.admin.Site,` which is a Site in which the asset is located.
-   New method in `com.hannonhill.cascade.api.asset.common.BaseAsset`
    -   `getAssetType``()` - returns a String that represents the type of the current asset, equivalent to calling `getIdentifer().getType().toString()`
-   New method in `com.hannonhill.cascade.api.asset.home.Block`
    -   `getBlockType``()` - returns a String that represents type of the block
-   New method in `com.hannonhill.cascade.api.asset.home.Format`
    -   `getFormatType()` - returns a String that represents type of the format
-   New method in `com.hannonhill.cascade.api.asset.home.MetadataAwareAsset`
    -   `getLinkingAssets()` - returns a List of `com.hannonhill.cascade.api.asset.home.FolderContainedAssets`that contain links to this asset in their content through ', language: 'en', searchInputs: \['cludo-search-form', 'cludo-search-form-top'\], hideSearchFilters: true, focusOnResultsAfterSearch: true, type: 'inline', template: 'InlineBasic', disableAutocomplete: true, }; CludoSearch = new Cludo(cludoSettings); CludoSearch.init(); })(); piAId = '1002'; piCId = '1003'; (function() { function async\_load(){ var s = document.createElement('script'); s.type = 'text/javascript'; s.src = ('https:' == document.location.protocol ? 'https://pi' : 'http://cdn') + '.pardot.com/pd.js'; var c = document.getElementsByTagName('script')\[0\]; c.parentNode.insertBefore(s, c); } if(window.attachEvent) { window.attachEvent('onload', async\_load); } else { window.addEventListener('load', async\_load, false); } })(); sAId = "1"; sCId = "4"; (function() { function async\_load(){ var s = document.createElement('script'); s.type = 'text/javascript'; s.src = (('https:' == document.location.protocol) ? "https://ssl" : "http://cdn") + ".spectate.com/s.js"; var c = document.getElementsByTagName('script')\[0\]; c.parentNode.insertBefore(s, c); } if(window.attachEvent) { window.attachEvent('onload', async\_load); } else { window.addEventListener('load', async\_load, false); } })();