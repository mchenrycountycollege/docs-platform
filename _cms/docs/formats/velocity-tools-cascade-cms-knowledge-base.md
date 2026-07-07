---
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---

 hljs.initHighlightingOnLoad();

# Velocity Tools

Cascade CMS's Velocity Tools are a collection of functions that can be used to retrieve and manipulate content in conjunction with Apache Velocity Template Language.

Just getting started with Velocity? Review [Apache's Velocity 1.7 User Guide](https://velocity.apache.org/engine/1.7/user-guide.html) .

## Global Variables[](#GlobalVariables)

Global Variables
| Variable | Output | Description |
| --- | --- | --- |
| `$contentRoot` | `Element` | Returns a JDOM Element containing the XML supplied for the current region. |
| `$currentPage` | `PageAPIAdapter` | Returns the current page as an API object. |
| `$currentPagePath` | `String` | Returns the path of the current page. |
| `$currentPageSiteName` | `String` | Returns the name of the current page's site. |
| `$enabledCustomDirectives` | `ArrayList` | Returns all available custom directives in the CMS environment. |

## Locator Tool[](#LocatorTool)

The Locator Tool (added in version 7.4) retrieves assets located at a given `path` and optionally within a site with a given `siteName` as [Cascade CMS API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/internal-cascade-api/index.html) objects.

**Tip** - If a `siteName` is not provided, the Locator Tool will locate assets within the site where the Format is located. Use the `$currentPageSiteName` variable to locate assets in the site where the Format is being called from (the current page).

### $\_.locate[](#__locate)

Locate an asset at the given `path`, with the specified `type`, and optionally inside of a site with the specified `siteName`.

Available arguments for $\_.locate.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to an asset. |
| type | EntityType  
required | An asset type. Accepted types:
`TYPE_LINKABLE` (Pages, Files, and External Links)  
`TYPE_PAGE`  
`TYPE_FILE`  
`TYPE_FOLDER`  
`TYPE_BLOCK`  
`TYPE_TEMPLATE`  
`TYPE_REFERENCE`  
`TYPE_SYMLINK`  
`TYPE_FORMAT`

 |
| siteName | String  
optional | A site name. |

### $\_.locateBlock[](#__locateBlock)

Locate a Block at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locateBlock("blocks/index/all-events", "Calendar")`

Available arguments for $\_.locateBlock.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to a Block. |
| siteName | String  
optional | A site name. |

### $\_.locateFile[](#__locateFile)

Locate a File at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locateFile("files/logo.png", "Cascade University")`

Available arguments for $\_.locateFile.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to a File. |
| siteName | String  
optional | A site name. |

### $\_.locateFolder[](#__locateFolder)

Locate a Folder at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locateFolder("articles/2019", "News")`

Available arguments for $\_.locateFolder.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to a Folder. |
| siteName | String  
optional | A site name. |

### $\_.locateFormat[](#__locateFormat)

Locate a Format at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locateFormat("_cms/formats/banner", "Cascade University")`

Available arguments for $\_.locateFormat.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to a Format. |
| siteName | String  
optional | A site name. |

### $\_.locateLinkable[](#__locateLinkable)

Locate a Page, File, or External Link at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locateLinkable("student-life/student-portal-link", "Cascade University")`

Available arguments for $\_.locateLinkable.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to a Page, File, or External Link. |
| siteName | String  
optional | A site name. |

### $\_.locatePage[](#__locatePage)

Locate a Page at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locatePage("about-us/contact", "Cascade University")`

Available arguments for $\_.locatePage.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to a Page. |
| siteName | String  
optional | A site name. |

### $\_.locateReference[](#__locateReference)

Locate a Reference at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locateReference("about-us/contact", "Cascade University")`

Available arguments for $\_.locateReference.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to a Reference. |
| siteName | String  
optional | A site name. |

### $\_.locateSymlink[](#__locateSymlink)

Locate an External Link at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locateSymlink("student-life/student-portal-link", "Cascade University")`

Available arguments for $\_.locateSymlink.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to an External Link. |
| siteName | String  
optional | A site name. |

## Query API[](#QueryAPI)

The Query API can also be used to query for assets. To construct a query:

-   Create the query object with `query()`
-   Choose to query (at least one required)
    -   `byMetadataSet()` or `byContentType()` to enable filtering by a metadata value
    -   `byDataDefinition()` or `byContentType()` to enable filtering by a structured data value
    -   `hasAnyTags()` when filtering by tags
    -   `hasAnyPaths()` when filtering by assets with specific paths
    -   `byFolderPath()` when filtering by assets in a specific folder
-   Optionally, set other filtering and sorting parameters
-   Execute the query with `execute()`

Example:

`#set ($query = $_.query()) #set ($query = $query.byContentType("Article")) #set ($query = $query.maxResults(10)) #set ($query = $query.sortBy("startDate")) #set ($query = $query.sortDirection("desc")) #set ($results = $query.execute())`

Query methods can also be chained. Example:

`#set ($results = $_.query().byContentType("Article").maxResults(10).sortBy("startDate").sortDirection("desc").execute())`

**Tip** - Queries return API objects. Use `$_PropertyTool.outputProperties($item)` to output the properties available when working with an API object.

**Tip** - Use `$query` without `execute()` to output current properties of the query, see default values and get additional hints (e.g. `$_.query().byContentType("Article")`)

### $\_.query()[](#__query)

Creates the query object.

Example:

`$_.query()`

### $\_.query().byContentType[](#__query_byContentType)

Return assets using the Content Type at the `path` provided.

Notes:

-   Can't be used in conjunction with  `byMetadataSet()` or `byDataDefinition()`.
-   Querying `byContentType()` will return only page assets.

Examples:

`$_.query().byContentType("Event").execute()`

`$_.query().byContentType("site://Calendar/Event").execute()`

Available arguments for $\_.query().byContentType.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | 
A path to a Content Type with optional site prefix.

If a site prefix is not specified, the query will return assets using the Content Type at the path specified within the current site.

 |

### $\_.query().byMetadataSet[](#__query_byMetadataSet)

Return assets using the Metadata Set at the `path` provided.

Notes:

-   Can't be used in conjunction with  `byContentType()`.

Examples:

`$_.query().byMetadataSet("Article").execute()`

`$_.query().byMetadataSet("site://News/Article").execute()`

Available arguments for $\_.query().byMetadataSet.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | 
A path to a Metadata Set with optional site prefix.

If a site prefix is not specified, the query will return assets using the Metadata Set at the path specified within the current site.

 |

### $\_.query().byDataDefinition[](#__query_byDataDefinition)

Return assets using the Data Definition at the `path` provided.

Notes:

-   Can't be used in conjunction with `byContentType()`.
-   Querying `byDataDefinition()` may return page or structured data block assets.

Examples:

`$_.query().byDataDefinition("Person").execute()`

`$_.query().byDataDefinition("site://Directory/Person").execute()`

Available arguments for $\_.query().byDataDefinition.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | 
A path to a Data Definition with optional site prefix.

If a site prefix is not specified, the query will return assets using the Data Definition at the path specified within the current site.

 |

### $\_.query().bySiteName[](#__query_bySiteName)

Return assets from the specified site in the query results. If not specified, assets from the current site will be returned.

Notes:

-   Can't be used in conjunction with  `searchAcrossAllSites()`.
-   This parameter applies only to the location of the assets returned, and does not apply to the location of the Content Type or Metadata Set being queried.

Examples:

`$_.query().byContentType("Event").bySiteName("Calendar").execute()`

`$_.query().byContentType("site://Calendar/Event").bySiteName("Athletics").execute()`

Available arguments for $\_.query().bySiteName.
| Argument | Type | Description |
| --- | --- | --- |
| name | String    
required | 
The name of a site.

 |

### $\_.query().byFolderPath[](#__query_byFolderPath)

Return assets within the given folder `path` (including descendants).

Notes:

-   A `%` sign can be used as a wildcard to match multiple folder paths (e.g. `departments/b%`)

Example:

`$_.query().byContentType("Person").byFolderPath("departments/biology").execute()`

Available arguments for $\_.query().byFolderPath.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | 
A path to a specific folder.

 |

### $\_.query().hasAnyPaths[](#__query_hasAnyPaths)

Return assets with the specific `paths` provided

Example:

`$_.query().byContentType("Person").hasAnyPaths(["departments/biology","departments/math"]).execute()`

Available arguments for $\_.query().hasAnyPaths.
| Argument | Type | Description |
| --- | --- | --- |
| paths | Collection<String>  
required | 
A collection of specific asset paths.

 |

### $\_.query().hasMetadata[](#__query_hasMetadata)

Return assets with metadata where `name` is set to `value`.

Example:

`$_.query().byMetadataSet("Article").hasMetadata("department","Biology").execute()`

Available arguments for $\_.query().hasMetadata.
| Argument | Type | Description |
| --- | --- | --- |
| name | String  
required | The name of a field in a Metadata Set. |
| value | String  
required | The metadata field value. |

### $\_.query().hasAnyMetadataValues[](#__query_hasAnyMetadataValues)

Return assets with metadata where `name` is set to any of `values`.

Example:

`$_.query().byMetadataSet("Article").hasAnyMetadataValues("department",["English", "Communications"]).execute()`

Available arguments for $\_.query().hasAnyMetadataValues.
| Argument | Type | Description |
| --- | --- | --- |
| name | String  
required | The name of a field in a Metadata Set. |
| values | Collection<String>   
required | A List of metadata field values. |

### $\_.query().hasStructuredData[](#__query_hasStructuredData)

Return assets with structured data where `structuredDataFieldPath` is set to `structuredDataFieldValue`.

Example:

`$_.query().byContentType("Person").hasStructuredData("contact/building","Hannon Hall").execute()`

Available arguments for $\_.query().hasStructuredData.
| Argument | Type | Description |
| --- | --- | --- |
| structuredDataFieldPath | String  
required | The path of a field within the Structured Data. |
| structuredDataFieldValue | String  
required | The structured data field value. |

**Note:**It is not possible to use this method for querying multi-value fields like checkboxes and multi-selects. See [this page](https://www.hannonhill.com/cascadecms/latest/faqs/development/filtering-queries-based-on-structured-data-values.html) for tips on filtering based on checkbox and multi-select fields.

### $\_.query().hasAnyStructuredDataValues[](#__query_hasAnyStructuredDataValues)

Return assets with structured data where `structuredDataFieldPath` has one of the given `structuredDataFieldValues`.

Example:

`$_.query().byContentType("Person").hasAnyStructuredDataValues("contact/building", ["Hannon Hall","Hill Hall"]).execute()`

Available arguments for $\_.query().hasAnyStructuredDataValues.
| Argument | Type | Description |
| --- | --- | --- |
| structuredDataFieldPath | String  
required | The path of a field within the Structured Data. |
| structuredDataFieldValues | Collection<String>  
required | The structured data field values. |

### $\_.query().hasStructuredDataByFieldId[](#__query_hasStructuredDataByFieldId)

Return assets with structured data field with `structuredDataFieldId` is set to `structuredDataFieldValue`.

Example:

`$_.query().byContentType("Person").hasStructuredDataByFieldId("9fac6f9dac1e001b075cc4e8a8d4e5ec","Hannon Hall").execute()`

Available arguments for $\_.query().hasStructuredDataByFieldId.
| Argument | Type | Description |
| --- | --- | --- |
| structuredDataFieldId | String  
required | The field-id of a field within the Structured Data. |
| structuredDataFieldValue | String  
required | The structured data field value. |

**Note**:  
If you're querying for assets containing a structured data value within a Group Shared Field, `structuredDataFieldId` must be the concatenation of the following ids:

-   The `field-id` from the `<shared-field>` element in question (within the Data Definition)
-   The `field-id` from the field in question (within the Shared Field)

Example:

`$_.query().byContentType("Person").hasStructuredDataByFieldId("9fac6f9dac1e001b075cc4e8a8d4e5ec585f9112c0a8003d45455f490cff9beb","Hannon Hall").execute()`

(notice the id provided is 64 digits since two 32-digit ids are combined)

### $\_.query().hasAnyStructuredDataValuesByFieldId[](#__query_hasAnyStructuredDataValuesByFieldId)

Return assets with structured data field with `structuredDataFieldId` has one of the given `structuredDataFieldValue`.

Example:

`$_.query().byContentType("Person").hasAnyStructuredDataValuesByFieldId("9fac6f9dac1e001b075cc4e8a8d4e5ec",["Hannon Hall","Hill Hall"]).execute()`

Available arguments for $\_.query().hasAnyStructuredDataValuesByFieldId.
| Argument | Type | Description |
| --- | --- | --- |
| structuredDataFieldId | String  
required | The field-id of a field within the Structured Data. |
| structuredDataFieldValues | Collection<String>  
required | The structured data field values. |

### $\_.query().hasTag[](#__query_hasTag)

Return assets that have at least `tag` assigned.

Example:

`$_.query().byMetadataSet("Event").hasTag("Campus Events").execute()`

Available arguments for $\_.query().hasTag.
| Argument | Type | Description |
| --- | --- | --- |
| tag | String  
required | The name of a tag. |

### $\_.query().hasAnyTags[](#__query_hasAnyTags)

Return assets that have any of `tags` assigned.

Example:

`$_.query().byMetadataSet("Event").hasAnyTags(["Campus Events", "Academics"]).execute()`

Available arguments for $\_.query().hasAnyTags.
| Argument | Type | Description |
| --- | --- | --- |
| tags | List   
required | A List of tags. |

### $\_.query().includeBlocks[](#__query_includeBlocks)

Include Block assets in the query results.

Example:

`$_.query().byMetadataSet("Default").includeBlocks(true).execute()`

Available arguments for $\_.query().includeBlocks.
| Argument | Type | Description |
| --- | --- | --- |
| include | Boolean   
required | `true` or `false`. Default is `true`. |

### $\_.query().blocksOnly[](#__query_blocksOnly)

Include *only* Block assets in the query results.

Example:

`$_.query().byMetadataSet("Default").blocksOnly().execute()`

### $\_.query().includeFiles[](#__query_includeFiles)

Include File assets in the query results.

Example:

`$_.query().byMetadataSet("Default").includeFiles(true).execute()`

Available arguments for $\_.query().includeFiles.
| Argument | Type | Description |
| --- | --- | --- |
| include | Boolean   
required | `true` or `false`. Default is `true`. |

### $\_.query().filesOnly[](#__query_filesOnly)

Include *only* File assets in the query results.

Example:

`$_.query().byMetadataSet("Default").filesOnly().execute()`

### $\_.query().includeFolders[](#__query_includeFolders)

Include Folder assets in the query results.

Example:

`$_.query().byMetadataSet("Default").includeFolders(true).execute()`

Available arguments for $\_.query().includeFolders.
| Argument | Type | Description |
| --- | --- | --- |
| include | Boolean   
required | `true` or `false`. Default is `true`. |

### $\_.query().foldersOnly[](#__query_foldersOnly)

Include *only* Folder assets in the query results.

Example:

`$_.query().byMetadataSet("Default").foldersOnly().execute()`

### $\_.query().includePages[](#__query_includePages)

Include Page assets in the query results.

Example:

`$_.query().byMetadataSet("Default").includePages(true).execute()`

Available arguments for $\_.query().includePages.
| Argument | Type | Description |
| --- | --- | --- |
| include | Boolean   
required | `true` or `false`. Default is `true`. |

### $\_.query().pagesOnly[](#__query_pagesOnly)

Include *only* Page assets in the query results.

Example:

`$_.query().byMetadataSet("Default").pagesOnly().execute()`

### $\_.query().includeSymlinks[](#__query_includeSymlinks)

Include External Link assets in the query results.

Example:

`$_.query().byMetadataSet("Default").includeSymlinks(true).execute()`

Available arguments for $\_.query().includeSymlinks.
| Argument | Type | Description |
| --- | --- | --- |
| include | Boolean   
required | `true` or `false`. Default is `true`. |

### $\_.query().symlinksOnly[](#__query_symlinksOnly)

Include *only* Symlink assets in the query results.

Example:

`$_.query().byMetadataSet("Default").symlinksOnly().execute()`

### $\_.query().indexableOnly[](#__query_indexableOnly)

Include only assets enabled for indexing in the query results.

Notes:

-   Assets disabled for indexing by their folder hierarchy but not at the individual asset level will still be returned.
-   When set to `true`, results must also have an empty Start Date or a Start Date in the past and an empty End Date or an End Date in the future.

Example:

`$_.query().byContentType("Event").indexableOnly(true).execute()`

Available arguments for $\_.query().indexableOnly.
| Argument | Type | Description |
| --- | --- | --- |
| include | Boolean   
required | `true` or `false`. Default is `true`. |

### $\_.query().maxResults[](#__query_maxResults)

Limit the number of assets returned by the query to the `amount` specified.

Notes:

-   Default is `100` assets.
-   Maximum is `2,000` assets when using `execute()` method.
-   Maximum is `100,000` assets when using `#queryexecute` directive.
-   The number of assets to be queried is not limited, but the maximum number of assets that can be returned from the results of the query execution is limited to 2,000, and the maximum number of assets that can be iterated by the query execution directive is limited to 100,000.

Example:

`$_.query().byContentType("Article").maxResults(5).execute()`

Available arguments for $\_.query().maxResults.
| Argument | Type | Description |
| --- | --- | --- |
| amount | Integer    
required | 
An integer `1` through `100,000` or `-1` (returns the maximum).

 |

### $\_.query().preloadDynamicMetadata[](#__query_preloadDynamicMetadata)

Query will preload dynamic metadata so that accessing that data does not cause additional database trips or slowdowns.

Notes:

Example:

`$_.query().byContentType("Event").preloadDynamicMetadata().execute()`

### $\_.query().preloadStructuredData[](#__query_preloadStructuredData)

Query will preload structured data so that accessing that data does not cause additional database trips or slowdowns. Note:

Notes:

Example:

`$_.query().byContentType("Event").preloadStructuredData().execute()`

### $\_.query().publishableOnly[](#__query_publishableOnly)

Include only assets enabled for publishing in the query results.

Notes:

-   Assets disabled for publishing by their folder hierarchy but not at the individual asset level will still be returned.

Example:

`$_.query().byContentType("Article").publishableOnly(true).execute()`

Available arguments for $\_.query().publishableOnly.
| Argument | Type | Description |
| --- | --- | --- |
| include | Boolean    
required | 
`true` or `false`.

 |

### $\_.query().searchAcrossAllSites[](#__query_searchAcrossAllSites)

Return assets from any site in the query results. If not specified, assets from the current site will be returned.

Notes:

-   Can't be used in conjunction with  `siteName()`.
-   This parameter applies only to the location of the assets returned, and does not apply to the location of the Content Type or Metadata Set being queried.

Examples:

`$_.query().byContentType("Event").searchAcrossAllSites().execute()`

`$_.query().byContentType("site://Calendar/Event").searchAcrossAllSites().execute()`

### $\_.query().sortBy[](#__query_sortBy)

Sort the query results by the specified `field`.

Notes:

-   Only one `sortBy()` call is used per query.
-   Use in conjunction with `sortDirection()` to specify direction of sort.

Example:

`$_.query().byContentType("Profile").sortBy("title").execute()`

Available arguments for $\_.query().sortBy.
| Argument | Type | Description |
| --- | --- | --- |
| field | String    
required | 
`"author"`  
`"created"`  
`"description"`  
`"displayName"`  
`"endDate"`  
`"keywords"`  
`"modified"`  
`"name"`  
`"path"`  
`"reviewDate"`  
`"startDate"`  
`"summary"`  
`"title"`  
`"teaser"`

 |

### $\_.query().sortDirection[](#__query_sortDirection)

Used in conjunction with `sortBy()`, specify the direction of the sort.

Notes:

-   Only one  `sortDirection()` call is used per query.

Example:

`$_.query().byContentType("Article").sortBy("startDate").sortDirection("desc").execute()`

Available arguments for $\_.query().sortDirection.
| Argument | Type | Description |
| --- | --- | --- |
| direction | String    
required | 
`"asc"` or `"desc"`

 |

### $\_.query().siteName (deprecated)[](#__query_siteNamedeprecated)

See [$\_.query().bySiteName](#__query_bySiteName)

### #queryfilter 1st[](#queryfilter)

Executes body logic on each asset matching a given query *before* `maxResults()` is applied. If body logic returns `true`, the asset will be included in the results.

Example:

`#set ($query = $_.query().byContentType("Event")) #queryfilter($query, $asset)   $asset.path.contains("index") #end`

Available arguments for #queryfilter.
| Argument | Type | Description |
| --- | --- | --- |
| query | SearchQuery  
required | A query object. |
| asset | Object  
required | Populated at query execution time automatically by the system. Points to a new asset on each iteration, while the old asset gets cleared to save memory. |
| *body* | Logic  
required | Logic to execute. |

**Note**: Built-in filtering methods result in faster performance and this directive should only be used for scenarios where there is no built-in method. For example, using`.bySiteName` will be faster than using the `#queryfilter` directive with Site name comparison logic.

**Tip**: You can move your logic into the `#queryexecute` directive temporarily to test the functionality and ensure that your body logic executes as expected (returns the exact string `true`).

### #querysortvalue 1st[](#querysortvalue)

Executes body logic on each asset matching a given query to determine by which value the resulting list should be sorted *before* `maxResults()` is applied. This directive is often used in conjunction with the `#queryexecute` directive, although it can also be used with the `.execute()` method and is an alternative to `.sortBy()` . 

Example:

`#set ($query = $_.query().byContentType("Event")) #querysortvalue($query, $asset)   $asset.metadata.title #end`

**Note**: Built-in sorting methods result in faster performance and this directive should only be used for scenarios where it is not possible to use the built-in methods. For example, using`.sortBy("name")` will be faster than using the `#querysortvalue` directive with `$asset.name` as the logic.

**Tips**:  

-   The example above will sort by assets' titles. However, the body logic could include structured data or even custom logic that pulls values from various places on the page.
-   This directive sorts by string only. When sorting numbers, use `[$_NumberTool.sortable](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#_NumberTool_sortable)` to ensure that results get sorted as expected.
-   This directive respects the value passed into the `.sortDirection` method executed on the `$query`.

Available arguments for #querysortvalue.
| Argument | Type | Description |
| --- | --- | --- |
| query | SearchQuery  
required | A query object. |
| asset | Object  
required | Populated at query execution time automatically by the system. Points to a new asset on each iteration, while the old asset gets cleared to save memory. |
| *body* | Logic  
required | Logic to execute. |

### #queryexecute 1st[](#queryexecute)

Given logic is executed on each asset and a result is outputted. This directive can replace the `.execute()` method and it allows for `.maxResults()` to be up to as many as 100,000 (whereas `.execute()` has a hard max of 2,000 results).

Example:

`#set ($query = $_.query().byContentType("Event")) #queryexecute($query, $asset)     $asset.metadata.title #end`

Available arguments for #queryexecute.
| Argument | Type | Description |
| --- | --- | --- |
| query | SearchQuery  
required | A query object. |
| asset | Object  
required | Populated at query execution time automatically by the system. Points to a new asset on each iteration, while the old asset gets cleared to save memory. |
| *body* | Logic  
required | Logic to execute. |

## Date Tool[](#DateTool)

The Date Tool (added in version 6.2) allows users to retrieve, format, and compare datetime values. Timestamps returned in [Index Block](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/index-blocks.html) XML are Unix timestamps in milliseconds and can be converted to [Java Dates](https://docs.oracle.com/javase/8/docs/api/java/util/Date.html) using the Date Tool.

**New:** [Date Tool Essentials](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/date-tool-essentials.html) covers `.getDate()` vs `.toDate()`, `difference()`, `whenIs()`, time zones, and sorting patterns.

Full API documentation:

-   [ComparisonDateTool](https://velocity.apache.org/tools/devel/apidocs/org/apache/velocity/tools/generic/ComparisonDateTool.html)
-   [DateTool](https://velocity.apache.org/tools/devel/apidocs/org/apache/velocity/tools/generic/DateTool.html)

### $\_DateTool.difference[](#_DateTool_difference)

Returns a Comparison representing the difference between `now` and `then`.

Examples:

`$_DateTool.difference(1578526435000, 1577836800000) ## Expected output: -1 week`

`#set ($pubDate = $currentPage.lastPublishedOn) $_DateTool.difference($_DateTool.getDate(), $pubDate) ## Expected output: -2 weeks`

Available arguments for $\_DateTool.difference.
| Argument | Type | Description |
| --- | --- | --- |
| now | Date / Long   
required | A Date or a Number representing a Unix timestamp in milliseconds. |
| then | Date / Long   
required | A Date or a Number representing a Unix timestamp in milliseconds. |

### $\_DateTool.format[](#_DateTool_format)

Returns a String representing a `date` in a specified `format`.

Examples:

`$_DateTool.format('medium', $date)`

`$_DateTool.format('EEEE MM/dd/yy', $date)`

Available arguments for $\_DateTool.format.
| Argument | Type | Description |
| --- | --- | --- |
| format | String  
optional | A String representing the desired date format. See Java's documentation for [predefined formats](https://docs.oracle.com/javase/tutorial/i18n/format/dateFormat.html) and customizable [simple date formats](https://docs.oracle.com/javase/tutorial/i18n/format/simpleDateFormat.html) . |
| date | Date or Calendar  
required | A Date or Calendar. |

### $\_DateTool.getCalendar[](#_DateTool_getCalendar)

Returns the current date as a Calendar.

Example:

`$_DateTool.getCalendar()`

### $\_DateTool.getDate[](#_DateTool_getDate)

Returns a `date` or the current date as a Date.

Examples:

`$_DateTool.getDate()`

`#set ($page = $_XPathTool.selectSingleNode($contentRoot, "//calling-page/system-page")) #set ($pubDate = $page.getChild("last-published-on").value) $_DateTool.getDate($pubDate)`

Available arguments for $\_DateTool.getDate.
| Argument | Type | Description |
| --- | --- | --- |
| date | String    
optional | A Unix timestamp in milliseconds. |

### $\_DateTool.getDay[](#_DateTool_getDay)

Returns a Number representing the day in a `date` or the current date.

Example:

`$_DateTool.getDay()`

Available arguments for $\_DateTool.getDay.
| Argument | Type | Description |
| --- | --- | --- |
| date | Date or Calendar    
optional | A Date or Calendar. |

### $\_DateTool.getMonth[](#_DateTool_getMonth)

Returns a Number representing the month in a `date` or the current date.

Note: In Java, the first month of the year in the Gregorian and Julian calendars is `JANUARY` which is 0.

Example:

`$_DateTool.getMonth()`

Available arguments for $\_DateTool.getMonth.
| Argument | Type | Description |
| --- | --- | --- |
| date | Date or Calendar    
optional | A Date or Calendar. |

### $\_DateTool.getTime[](#_DateTool_getTime)

Returns a Number representing the current time.

Example:

`$_DateTool.getTime()`

### $\_DateTool.getValue[](#_DateTool_getValue)

Returns an Integer representing the value for the `field` in the `date`.

Example:

`$_DateTool.getValue(1, $date)`

Available arguments for $\_DateTool.getValue.
| Argument | Type | Description |
| --- | --- | --- |
| field | Integer  
required | 
An Integer representing a Calendar field type. Available types:

0 = Era  
1 = Year  
2 = Month  
3 = Week of Year  
4 = Week of Month  
5 = Day of Month  
6 = Day of Year  
7 = Day of Week  
8 = Day of Week in Month  
9 = AM/PM  
10 = Hour  
11 = Hour of Day  
12 = Minute  
13 = Second  
14 = Millisecond  
15 = Zone offset  
16 = DST offset

 |
| date | Date  
required | A Date. |

### $\_DateTool.getYear[](#_DateTool_getYear)

Returns a Number representing the year in a `date` or the current date.

Example:

`$_DateTool.getYear()`

Available arguments for $\_DateTool.getYear.
| Argument | Type | Description |
| --- | --- | --- |
| date | Date or Calendar    
optional | A Date or Calendar. |

### $\_DateTool.toDate[](#_DateTool_toDate)

Returns a `date` in the specified `format` as a Date.

Example:

`#set ($date = $currentPage.getStructuredDataNode("date").textValue) #set ($date = $_DateTool.toDate("MM-dd-yyyy",$date)) $_DateTool.format("EEEE, MMMM dd, yyyy", $date)`

Available arguments for $\_DateTool.toDate.
| Argument | Type | Description |
| --- | --- | --- |
| format | String    
required | A String representing a date format. |
| date | Object    
required | An Object representing a date. |

### $\_DateTool.toDays[](#_DateTool_toDays)

Returns a Number representing the number of days between Unix Time 0 (midnight UTC/GMT on January 1, 1970) and a `time`.

Example:

`$_DateTool.toDays(1577836800000) ## Expected output: 18262`

Available arguments for $\_DateTool.toDays.
| Argument | Type | Description |
| --- | --- | --- |
| time | Long   
required | A Number representing time in milliseconds. |

### $\_DateTool.toHours[](#_DateTool_toHours)

Returns a Number representing the number of hours between Unix Time 0 (midnight UTC/GMT on January 1, 1970) and a `time`.

Example:

`$_DateTool.toHours(1577836800000) ## Expected output: 438288`

Available arguments for $\_DateTool.toHours.
| Argument | Type | Description |
| --- | --- | --- |
| time | Long   
required | A Number representing time in milliseconds. |

### $\_DateTool.toMinutes[](#_DateTool_toMinutes)

Returns a Number representing the number of minutes between Unix Time 0 (midnight UTC/GMT on January 1, 1970) and a `time`.

Example:

`$_DateTool.toMinutes(1577836800000) ## Expected output: 26297280`

Available arguments for $\_DateTool.toMinutes.
| Argument | Type | Description |
| --- | --- | --- |
| time | Long   
required | A Number representing time in milliseconds. |

### $\_DateTool.toMonths[](#_DateTool_toMonths)

Returns a Number representing the number of months between Unix Time 0 (midnight UTC/GMT on January 1, 1970) and a `time`.

Example:

`$_DateTool.toMonths(1577836800000) ## Expected output: 608`

Available arguments for $\_DateTool.toMonths.
| Argument | Type | Description |
| --- | --- | --- |
| time | Long   
required | A Number representing time in milliseconds. |

### $\_DateTool.toSeconds[](#_DateTool_toSeconds)

Returns a Number representing the number of seconds between Unix Time 0 (midnight UTC/GMT on January 1, 1970) and a `time`.

Example:

`$_DateTool.toSeconds(1577836800000) ## Expected output: 1577836800`

Available arguments for $\_DateTool.toSeconds.
| Argument | Type | Description |
| --- | --- | --- |
| time | Long   
required | A Number representing time in milliseconds. |

### $\_DateTool.toWeeks[](#_DateTool_toWeeks)

Returns a Number representing the number of weeks between Unix Time 0 (midnight UTC/GMT on January 1, 1970) and a `time`.

Example:

`$_DateTool.toWeeks(1577836800000) ## Expected output: 2608`

Available arguments for $\_DateTool.toWeeks.
| Argument | Type | Description |
| --- | --- | --- |
| time | Long   
required | A Number representing time in milliseconds. |

### $\_DateTool.toYears[](#_DateTool_toYears)

Returns a Number representing the number of years between Unix Time 0 (midnight UTC/GMT on January 1, 1970) and a `time`.

Example:

`$_DateTool.toYears(1577836800000) ## Expected output: 50`

Available arguments for $\_DateTool.toYears.
| Argument | Type | Description |
| --- | --- | --- |
| time | Long   
required | A Number representing time in milliseconds. |

### $\_DateTool.whenIs[](#_DateTool_whenIs)

Returns a Comparison representing the difference between  `now` and  `then` or between the current time and `then`.

Examples:

`$_DateTool.whenIs(1578526435000, 1577836800000) ## Expected output: 1 week earlier`

`#set ($currentDate = $_DateTool.getDate()) #set ($pubDate = $currentPage.lastPublishedOn) $_DateTool.whenIs($currentDate, $pubDate) ## Expected output: 2 weeks earlier`

Available arguments for $\_DateTool.whenIs.
| Argument | Type | Description |
| --- | --- | --- |
| now | Date / Long   
optional | A Date or a Number representing a Unix timestamp in milliseconds. |
| then | Date / Long   
required | A Date or a Number representing a Unix timestamp in milliseconds. |

## Display Tool[](#DisplayTool)

The Display Tool (added in version 6.10) provides methods for controlling the display of references.

### $\_DisplayTool.alt[](#_DisplayTool_alt)

Returns the `value` of the object if defined (i.e. non-`null`), otherwise returns literal string `null` or `alternate` if provided.

Example:

`$_DisplayTool.alt($title,"No title provided.")`

Available arguments for $\_DisplayTool.alt.
| Argument | Type | Description |
| --- | --- | --- |
| value | Object  
required | Any object. |
| alternate | Object  
optional | Any object. |

### $\_DisplayTool.br[](#_DisplayTool_br)

Returns a String in which new line characters (`\n`) are prepended with HTML line break tags (`<br/>`).

Example:

`$_DisplayTool.br("Here is a String with                   a line break.") ## Expected output: Here is a string with<br/>a line break.`

Available arguments for $\_DisplayTool.br.
| Argument | Type | Description |
| --- | --- | --- |
| message | String  
required | A String. |

### $\_DisplayTool.capitalize[](#_DisplayTool_capitalize)

Returns a String in which the first letter is capitalized.

Example:

`$_DisplayTool.capitalize("here is a String.") ## Expected output: Here is a String.`

Available arguments for $\_DisplayTool.capitalize.
| Argument | Type | Description |
| --- | --- | --- |
| message | String  
required | A String. |

### $\_DisplayTool.cell[](#_DisplayTool_cell)

Returns a String that is truncated or padded to `length` and appended with an optional `suffix` if truncated.

Example:

`$_DisplayTool.cell("Here is a String over 10 characters long.",10,"...") ## Expected output: Here is...`

Available arguments for $\_DisplayTool.cell.
| Argument | Type | Description |
| --- | --- | --- |
| message | String  
required | A String. |
| length | Integer  
optional | 
The number of characters to which the message will be truncated or padded (with spaces).

The default is `30`.

 |
| suffix | 

String  
optional

 | 

A suffix to append to the message if truncated.

The default is `"..."`

 |

### $\_DisplayTool.list[](#_DisplayTool_list)

Returns String representing a `list` separated by a `separator` and optional `lastSeparator`.

Example:

`$_DisplayTool.list(["A", "B", "C"], ", ", ", or ") ## Expected output: A, B, or C`

Available arguments for $\_DisplayTool.list.
| Argument | Type | Description |
| --- | --- | --- |
| list | List  
required | A List of any Objects. |
| separator | String  
optional | 
A String to use as a separator.

The default is `", "`.

 |
| lastSeparator | 

String  
optional

 | 

A String to use as a separator between the penultimate and last items in the list.

The default is `" and "`.

 |

### $\_DisplayTool.message[](#_DisplayTool_message)

Returns String `message` formatted with `values`.

Example:

`$_DisplayTool.message("{0}, {1}, or {2}", "A", "B", "C") ## Expected output: A, B, or C`

Available arguments for $\_DisplayTool.message.
| Argument | Type | Description |
| --- | --- | --- |
| message | String  
required | A String. |
| values | Object  
required | 
Any number of input Objects.

 |

### $\_DisplayTool.plural[](#_DisplayTool_plural)

Returns a `singular` or plural word depending on the `amount`. If an alternative `plural` is not provided, basic rules of English pluralization will be used.

Example:

`$_DisplayTool.plural(3,"mouse","mice") ## Expected output: mice`

Available arguments for $\_DisplayTool.plural.
| Argument | Type | Description |
| --- | --- | --- |
| amount | Integer  
required | An Integer. |
| singular | String  
required | 
A singular word.

 |
| plural | 

String  
optional

 | 

A plural word.

 |

### $\_DisplayTool.space[](#_DisplayTool_space)

Returns a String containing the specified `number` of spaces.

Example:

`$_DisplayTool.space(3)`

Available arguments for $\_DisplayTool.space.
| Argument | Type | Description |
| --- | --- | --- |
| number | Integer  
required | Number of space characters. |

### $\_DisplayTool.stripTags[](#_DisplayTool_stripTags)

Returns a String without HTML tags or with only specified `allowedTags`.

Example:

`$_DisplayTool.stripTags("<p>Here is a <code>String</code> with <strong>HTML</strong> tags.</p>","p","code") ## Expected output: <p>Here is a <code>String</code> with HTML tags.</p>`

Available arguments for $\_DisplayTool.stripTags.
| Argument | Type | Description |
| --- | --- | --- |
| html | String  
required | A String. |
| allowedTags | String  
optional | 
Any number of allowed HTML tags.

 |

### $\_DisplayTool.truncate[](#_DisplayTool_truncate)

Returns a String truncated to 30 characters or the specified `length`, appended with "..." or an optional `suffix` if truncated, and optionally truncated at the end of a word.

Example:

`$_DisplayTool.truncate("Here is a truncated String.",15,"...",true) ## Expected output: Here is a...`

Available arguments for $\_DisplayTool.truncate.
| Argument | Type | Description |
| --- | --- | --- |
| message | String  
required | A String. |
| length | Integer  
optional | 
A maximum length.

Default is `30`.

 |
| suffix | 

String  
optional

 | 

A suffix to append to the string if truncated.

Default is `"..."`.

 |
| truncateAtWord | 

Boolean  
optional

 | 

`true` or `false`

Default is `false`.

If `true`, the output will be truncated at the space closest to the end of the String.

 |

### $\_DisplayTool.uncapitalize[](#_DisplayTool_uncapitalize)

Returns a String in which the first letter is uncapitalized.

Example:

`$_DisplayTool.uncapitalize("Here is a String.") ## Expected output: here is a String.`

Available arguments for $\_DisplayTool.uncapitalize.
| Argument | Type | Description |
| --- | --- | --- |
| message | String  
required | A String. |

## Escape Tool[](#EscapeTool)

The Escape Tool (added in version 6.10) contains programming language-specific escape functionality, as well as methods and properties for outputting safely escaped special characters.

Full API documentation:

-   [EscapeTool](https://velocity.apache.org/tools/devel/javadoc/org/apache/velocity/tools/generic/EscapeTool.html)

### $\_EscapeTool.getB / $\_EscapeTool.getBackslash[](#_EscapeTool_getB_EscapeTool_getBackslash)

Returns a backslash.

Example:

`$_EscapeTool.getB() ## Expected output: \`

### $\_EscapeTool.getD / $\_EscapeTool.getDollar[](#_EscapeTool_getD_EscapeTool_getDollar)

Returns a dollar sign.

Example:

`$_EscapeTool.getD() ## Expected output: $`

### $\_EscapeTool.getE / $\_EscapeTool.getExclamation[](#_EscapeTool_getE_EscapeTool_getExclamation)

Returns an exclamation mark.

Example:

`$_EscapeTool.getE() ## Expected output: !`

### $\_EscapeTool.getH / $\_EscapeTool.getHash[](#_EscapeTool_getH_EscapeTool_getHash)

Returns a hash / pound sign.

Example:

`$_EscapeTool.getH() ## Expected output: #`

### $\_EscapeTool.getN / $\_EscapeTool.getNewLine[](#_EscapeTool_getN_EscapeTool_getNewLine)

Returns a new line character.

Example:

`$_EscapeTool.getN() ## Expected output: \n`

### $\_EscapeTool.getQ / $\_EscapeTool.getQuote[](#_EscapeTool_getQ_EscapeTool_getQuote)

Returns a quotation mark.

Example:

`$_EscapeTool.getQ() ## Expected output: "`

### $\_EscapeTool.getS / $\_EscapeTool.getSingleQuote[](#_EscapeTool_getS_EscapeTool_getSingleQuote)

Returns a single quote / apostrophe.

Example:

`$_EscapeTool.getS() ## Expected output: '`

### $\_EscapeTool.html[](#_EscapeTool_html)

Returns an escaped HTML String.

Notes:

-   Due to Cascade CMS's XHTML validation, using `$_EscapeTool.xml()` is recommended even when escaping content for HTML output.

Example:

`$_EscapeTool.html('Here is a String with an ampersand (&).') ## Expected output: Here is a String with an ampersand (&amp;).`

Available arguments for $\_EscapeTool.html.
| Argument | Type | Description |
| --- | --- | --- |
| content | String  
required | A String. |

### $\_EscapeTool.javascript[](#_EscapeTool_javascript)

Returns an escaped JavaScript String.

Example:

`$_EscapeTool.javascript('Here is a String with "quotation marks".') ## Expected output: Here is a String with \"quotation marks\".`

Available arguments for $\_EscapeTool.javascript.
| Argument | Type | Description |
| --- | --- | --- |
| content | String  
required | A String. |

### $\_EscapeTool.unescapeHtml[](#_EscapeTool_unescapeHtml)

Returns an unescaped String containing HTML.

Example:

`$_EscapeTool.unescapeHtml('Here is a String with an  escaped ampersand (&amp;).') ## Expected output: Here is a String with an escaped ampersand (&).`

Available arguments for $\_EscapeTool.unescapeHtml.
| Argument | Type | Description |
| --- | --- | --- |
| content | String  
required | A String. |

### $\_EscapeTool.unescapeJavaScript[](#_EscapeTool_unescapeJavaScript)

Returns an unescaped String containing JavaScript.

Example:

`$_EscapeTool.unescapeJavaScript('if (i === \"foo\")') ## Expected output: if (i === "foo").`

Available arguments for $\_EscapeTool.unescapeJavaScript.
| Argument | Type | Description |
| --- | --- | --- |
| content | String  
required | A String. |

### $\_EscapeTool.unescapeXml[](#_EscapeTool_unescapeXml)

Returns an unescaped String containing XML.

Example:

`$_EscapeTool.unescapeXml('&lt;foo&gt;bar&lt;/foo&gt;') ## Expected output: <foo>bar</foo>`

Available arguments for $\_EscapeTool.unescapeXml.
| Argument | Type | Description |
| --- | --- | --- |
| content | String  
required | A String. |

### $\_EscapeTool.unicode[](#_EscapeTool_unicode)

Returns a String representing a Unicode character.

Example:

`$_EscapeTool.unicode('004D') ## Expected output: M`

Available arguments for $\_EscapeTool.unicode.
| Argument | Type | Description |
| --- | --- | --- |
| code | String  
required | A hexidecimal code representing a Unicode character. |

### $\_EscapeTool.url[](#_EscapeTool_url)

Returns an escaped URL String.

Example:

`$_EscapeTool.url('www.example.com/page?key=value') ## Expected output: www.example.com%2Fpage%3Fkey%3Dvalue`

Available arguments for $\_EscapeTool.url.
| Argument | Type | Description |
| --- | --- | --- |
| content | String  
required | A String. |

### $\_EscapeTool.xml[](#_EscapeTool_xml)

Returns an escaped XML String.

Example:

`$_EscapeTool.html('Here is a String with an ampersand (&).') ## Expected output: Here is a String with an ampersand (&amp;).`

Available arguments for $\_EscapeTool.xml.
| Argument | Type | Description |
| --- | --- | --- |
| content | String  
required | A String. |

## Field Tool[](#FieldTool)

The Field Tool (added in version 7.0) provides access to Java public constant values, which are otherwise inaccessible in Velocity scripts.

Full API documentation:

-   [FieldTool](https://velocity.apache.org/tools/2.0/apidocs/org/apache/velocity/tools/generic/FieldTool.html)

### $\_FieldTool.in[](#_FieldTool_in)

Returns a Classes' public static variables.

Examples:

`$_FieldTool.in($_DateTool.getCalendar()).JANUARY ## Expected output: 0`

Example adding time to a Calendar:

`#set ($date = $_DateTool.getDate()) #set ($calendar = $_DateTool.getCalendar()) $calendar.add($_FieldTool.in($calendar).DAY_OF_YEAR, 1) <p>Today = ${date}</p> <p>Tomorrow = ${calendar.getTime()}</p>`

Available arguments for $\_FieldTool.in.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object   
required | An Object, which gives access to the Classes' public static variables |

## Json Tool[](#JsonTool)

The Json Tool provides the ability to consume remote JSON resources.

### $\_JsonTool.fetch[](#_JsonTool_fetch)

Returns a [HashMap object](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html) representing JSON object or an [ArrayList object](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html) representing an array of objects.

Examples:

`#set ($response = $_JsonTool.fetch("https://jsonplaceholder.typicode.com/posts")) #foreach ($post in $response)  $_EscapeTool.xml($post.title) #end`

Available arguments for $\_JsonTool.fetch.
| Argument | Type | Description |
| --- | --- | --- |
| url | String   
required | A String representing a valid URL |

### $\_JsonTool.fetchWithApiKey[](#_JsonTool_fetchWithApiKey)

Fetches a remote JSON resource with an API key parameter via an `Authorization` request header. Returns a [HashMap object](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html) representing JSON object or an [ArrayList object](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html) representing an array of objects.

Examples:

`#set ($response = $_JsonTool.fetchWithApiKey("https://jsonplaceholder.typicode.com/posts", "abc123")) #foreach ($post in $response)  $_EscapeTool.xml($post.title) #end`

Available arguments for $\_JsonTool.fetchWithApiKey.
| Argument | Type | Description |
| --- | --- | --- |
| url | String   
required | A String representing a valid URL |
| apiKey | String  
required | 
A String representing an API Key. Can be of the following form:

-   (Default) Value only, which prepends the key with `Bearer`
-   Prepended with `Bearer` or `Basic`

 |

## List Tool[](#ListTool)

The List Tool provides operations to perform on lists or arrays.

### $\_ListTool.removeNull[](#_ListTool_removeNull)

Removes items from a List that either do not have a given `propertyName` or it is null.

Notes:

-   Set this to a variable to retain the removed items for processing.

Example:

`#set ($articles = $_.query().byContentType("Article").execute()) #set ($removed = $_ListTool.removeNull($articles, "metadata.startDate"))`

Available arguments for $\_ListTool.removeNull.
| Argument | Type | Description |
| --- | --- | --- |
| list | List  
required | A List of any objects. |
| propertyName | String  
required | A String representing a property name. |

### $\_ListTool.reverse[](#_ListTool_reverse)

Reverses a List.

Example:

`$_ListTool.reverse(["A","B","C"]) ## Expected output: [C, B, A]`

Available arguments for $\_ListTool.reverse.
| Argument | Type | Description |
| --- | --- | --- |
| list | List  
required | A List of any objects. |

### $\_ListTool.shuffle[](#_ListTool_shuffle)

Shuffles a List.

Example:

`$_ListTool.shuffle(["A","B","C"]) ## Expected output: [B, A, C]`

Available arguments for $\_ListTool.shuffle.
| Argument | Type | Description |
| --- | --- | --- |
| list | List  
required | A List of any objects. |

### $\_ListTool.toList[](#_ListTool_toList)

Converts an Array to a List.

Example:

`#set ($categories = $currentPage.metadata.getDynamicField("categories")) #set ($categories = $_ListTool.toList($categories.values))`

Available arguments for $\_ListTool.toList.
| Argument | Type | Description |
| --- | --- | --- |
| array | Array  
required | An Array of any objects. |

## Math Tool[](#MathTool)

The Math Tool (added in version 6.10) provides convenience methods for converting numeric text to real numbers and performing various mathematical operations.

Full API documentation:

-   [MathTool](https://velocity.apache.org/tools/devel/javadoc/org/apache/velocity/tools/generic/MathTool.html)

### $\_MathTool.abs[](#_MathTool_abs)

Returns the absolute value of a `number`.

Example:

`$_MathTool.abs(-3) ## Expected output: 3`

Available arguments for $\_MathTool.abs.
| Argument | Type | Description |
| --- | --- | --- |
| number | Number  
required | A number. |

### $\_MathTool.add[](#_MathTool_add)

Returns the sum of `numbers`.

Example:

`$_MathTool.add(12,30) ## Expected output: 42`

Available arguments for $\_MathTool.add.
| Argument | Type | Description |
| --- | --- | --- |
| numbers | Number  
required | Any number of Numbers. |

### $\_MathTool.ceil[](#_MathTool_ceil)

Returns the smallest integer that is not less than the given `number`.

Example:

`$_MathTool.ceil(3.14159) ## Expected output: 4`

Available arguments for $\_MathTool.ceil.
| Argument | Type | Description |
| --- | --- | --- |
| number | Number  
required | A number. |

### $\_MathTool.div[](#_MathTool_div)

Returns the quotient of `numbers` or `null` if any denominator equals zero.

Example:

`$_MathTool.div(9,3) ## Expected output: 3`

Available arguments for $\_MathTool.div.
| Argument | Type | Description |
| --- | --- | --- |
| numbers | Numbers  
required | Any number of Numbers. |

### $\_MathTool.floor[](#_MathTool_floor)

Returns the integer portion of `number`.

Example:

`$_MathTool.floor(3.14159) ## Expected output: 3`

Available arguments for $\_MathTool.floor.
| Argument | Type | Description |
| --- | --- | --- |
| number | Number  
required | A Number. |

### $\_MathTool.getRandom[](#_MathTool_getRandom)

Returns a pseudo-random Double greater than or equal to 0.0 and less than 1.0.

Example:

`$_MathTool.getRandom()`

### $\_MathTool.idiv[](#_MathTool_idiv)

Returns the result of performing integer division on `number1` and `number2`.

Example:

`$_MathTool.idiv(9.33,3.14) ## Expected output: 3`

Available arguments for $\_MathTool.idiv.
| Argument | Type | Description |
| --- | --- | --- |
| number1 | Number  
required | A Number. |
| number2 | Number  
required | A Number. |

### $\_MathTool.max[](#_MathTool_max)

Returns the maximum of `numbers`.

Example:

`$_MathTool.max(7,23,11) ## Expected output: 23`

Available arguments for $\_MathTool.max.
| Argument | Type | Description |
| --- | --- | --- |
| numbers | Numbers  
required | Any number of Numbers. |

### $\_MathTool.min[](#_MathTool_min)

Returns the minimum of `numbers`.

Example:

`$_MathTool.min(7,23,11) ## Expected output: 7`

Available arguments for $\_MathTool.min.
| Argument | Type | Description |
| --- | --- | --- |
| numbers | Numbers  
required | Any number of Numbers. |

### $\_MathTool.mod[](#_MathTool_mod)

Returns the result of performing integer modulus on `number1` and `number2`.

Example:

`$_MathTool.mod(9.33,3.14) ## Expected output: 0`

Available arguments for $\_MathTool.mod.
| Argument | Type | Description |
| --- | --- | --- |
| number1 | Number  
required | A Number. |
| number2 | Number  
required | A Number. |

### $\_MathTool.mul[](#_MathTool_mul)

Returns the product of `numbers`.

Example:

`$_MathTool.mul(6,7) ## Expected output: 42`

Available arguments for $\_MathTool.mul.
| Argument | Type | Description |
| --- | --- | --- |
| numbers | Numbers  
required | Any number of Numbers. |

### $\_MathTool.pow[](#_MathTool_pow)

Returns the result of `number1` to the power of `number2`.

Example:

`$_MathTool.pow(3,3) ## Expected output: 27`

Available arguments for $\_MathTool.pow.
| Argument | Type | Description |
| --- | --- | --- |
| number1 | Number  
required | A Number. |
| number2 | Number  
required | A Number. |

### $\_MathTool.random[](#_MathTool_random)

Returns a pseudo-random number greater than or equal to `number1` and less than `number2`.

Notes:

-   If both arguments are whole numbers then the returned number will also be, otherwise a Double will be returned.

Example:

`$_MathTool.random(1,10)`

Available arguments for $\_MathTool.random.
| Argument | Type | Description |
| --- | --- | --- |
| number1 | Number  
required | A Number. |
| number2 | Number  
required | A Number. |

### $\_MathTool.round[](#_MathTool_round)

Returns `number` rounded to the nearest whole integer.

Example:

`$_MathTool.round(3.14159) ## Expected output: 3`

Available arguments for $\_MathTool.round.
| Argument | Type | Description |
| --- | --- | --- |
| number | Number  
required | A Number. |

### $\_MathTool.roundTo[](#_MathTool_roundTo)

Returns `number` rounded to the specified number of `decimalPlaces`.

Example:

`$_MathTool.roundTo(2,3.14159) ## Expected output: 3.14`

Available arguments for $\_MathTool.roundTo.
| Argument | Type | Description |
| --- | --- | --- |
| decimalPlaces | Number  
required | The number of decimal places to round to. |
| number | Number  
required | A Number. |

### $\_MathTool.sub[](#_MathTool_sub)

Returns the difference of `numbers` (subtracted in order).

Example:

`$_MathTool.sub(10,7) ## Expected output: 3`

Available arguments for $\_MathTool.sub.
| Argument | Type | Description |
| --- | --- | --- |
| numbers | Numbers  
required | Any number of Numbers. |

### $\_MathTool.toDouble[](#_MathTool_toDouble)

Returns `number` as a Double.

Example:

`$_MathTool.toDouble(3) ## Expected output: 3.0`

Available arguments for $\_MathTool.toDouble.
| Argument | Type | Description |
| --- | --- | --- |
| number | Object  
required | Any Object. |

### $\_MathTool.toInteger[](#_MathTool_toInteger)

Returns `number` as an Integer.

Example:

`$_MathTool.toInteger(3.14159) ## Expected output: 3`

Available arguments for $\_MathTool.toInteger.
| Argument | Type | Description |
| --- | --- | --- |
| number | Object  
required | Any Object. |

### $\_MathTool.toNumber[](#_MathTool_toNumber)

Returns `number` as a Number.

Example:

`$_MathTool.toNumber("3") ## Expected output: 3`

Available arguments for $\_MathTool.toNumber.
| Argument | Type | Description |
| --- | --- | --- |
| number | Object  
required | Any Object. |

## Number Tool[](#NumberTool)

The Number Tool (added in version 6.10) contains several methods for formatting various types of numeric data.

Full API documentation:

-   [NumberTool](https://velocity.apache.org/tools/devel/javadoc/org/apache/velocity/tools/generic/NumberTool.html)

### $\_NumberTool.currency[](#_NumberTool_currency)

Returns a String representing `object` formatted as currency.

Example:

`$_NumberTool.currency(3.14159) ## Expected output: $3.14`

Available arguments for $\_NumberTool.currency.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

### $\_NumberTool.format[](#_NumberTool_format)

Returns a String representing `object` in the given `format`.

Example:

`$_NumberTool.format("integer",3.14159) ## Expected output: 3`

Available arguments for $\_NumberTool.format.
| Argument | Type | Description |
| --- | --- | --- |
| format | String  
optional | `"default"` (`number`)  
`"number"`  
`"currency"`  
`"percent"`  
`"integer"` |
| object | Object  
required | Any Object. |

### $\_NumberTool.integer[](#_NumberTool_integer)

Returns a String representing `object` formatted as an integer.

Example:

`$_NumberTool.integer(3.14159) ## Expected output: 3`

Available arguments for $\_NumberTool.integer.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

### $\_NumberTool.isNumeric[](#_NumberTool_isNumeric)

Returns `true` if a given object is numeric.

Example:

`$_NumberTool.isNumeric("3") ## Expected output: true`

Available arguments for $\_NumberTool.isNumeric.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

### $\_NumberTool.number[](#_NumberTool_number)

Returns a String representing `object` formatted as a number.

Example:

`$_NumberTool.number(3.14159) ## Expected output: 3.142`

Available arguments for $\_NumberTool.number.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

### $\_NumberTool.percent[](#_NumberTool_percent)

Returns a String representing `object` formatted as a percentage.

Example:

`$_NumberTool.percent(3.14159) ## Expected output: 314%`

Available arguments for $\_NumberTool.percent.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

### $\_NumberTool.toNumber[](#_NumberTool_toNumber)

Returns a Number representing `object` in the given `format` or `null` if no conversion is possible.

Example:

`$_NumberTool.toNumber("percent","314%") ## Expected output: 3.14`

Available arguments for $\_NumberTool.toNumber.
| Argument | Type | Description |
| --- | --- | --- |
| format | String  
optional | `"default"` (`number`)  
`"number"`  
`"currency"`  
`"percent"`  
`"integer"` |
| object | Object  
required | Any Object. |

### $\_NumberTool.withPadding[](#_NumberTool_withPadding)

Returns a String representing `number` prefixed with zeroes (`0`) to match `minDigits`.

Example:

`$_NumberTool.withPadding(1, 3) ## Expected output: 001`

Available arguments for $\_NumberTool.withPadding.
| Argument | Type | Description |
| --- | --- | --- |
| number | String  
required | A number or string representation of a number. |
| minDigits | Number  
optional | The minimum number of digits after padding is applied. |

### $\_NumberTool.sortable[](#_NumberTool_sortable)

Returns a String representing `number` that can be used for string-based sorting. Defaults to sorting in *ascending direction* with an optional second parameter to specify sort direction (`asc` or `desc`).

Example:

`$_NumberTool.sortable(1) ## Expected output: 100000000000000000001 $_NumberTool.sortable(1, "desc") ## Expected output: 099999999999999999999`

Available arguments for $\_NumberTool.sortable.
| Argument | Type | Description |
| --- | --- | --- |
| number | String  
required | A number or string representation of a number. |
| sortDirection | String  
optional | The sort direction - `asc` or `desc`. |

## Property Tool[](#PropertyTool)

The Property Tool (added in version 7.4) can be used to view and evaluate the properties of an Object. This is particularly useful when examining the properties and methods available for [Cascade CMS API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/internal-cascade-api/index.html) Objects.

### $\_PropertyTool.isArray[](#_PropertyTool_isArray)

Returns `true` if the object is an array, otherwise `false`.

Example:

`$_PropertyTool.isArray($category.values)`

Available arguments for $\_PropertyTool.isArray.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

### $\_PropertyTool.isIterable[](#_PropertyTool_isIterable)

Returns `true` if the object is an iterable data type (i.e. can be used with a Velocity `#foreach` loop), otherwise `false`.

Example:

`$_PropertyTool.isIterable($category.selectedFieldItems)`

Available arguments for $\_PropertyTool.isIterable.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

### $\_PropertyTool.isList[](#_PropertyTool_isList)

Returns `true` if the object is a list, otherwise `false`.

Example:

`$_PropertyTool.isList($currentPage.tags)`

Available arguments for $\_PropertyTool.isList.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

### $\_PropertyTool.isMap[](#_PropertyTool_isMap)

Returns `true` if the object is a map, otherwise `false`.

Example:

`$_PropertyTool.isMap({ "test": "testing" })`

Available arguments for $\_PropertyTool.isMap.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

### $\_PropertyTool.isSet[](#_PropertyTool_isSet)

Returns `true` if the object is a set, otherwise `false`.

Available arguments for $\_PropertyTool.isSet.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

### $\_PropertyTool.isString[](#_PropertyTool_isString)

Returns `true` if the object is a string, otherwise `false`.

Example:

`$_PropertyTool.isString("testing")`

Available arguments for $\_PropertyTool.isString.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

### $\_PropertyTool.isEmpty[](#_PropertyTool_isEmpty)

Returns  `true` if the object is null, an empty string, or contains only whitespace characters, otherwise  `false`.

Example:

`$_PropertyTool.isEmpty($category.values[0])`

Available arguments for $\_PropertyTool.isEmpty.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

### $\_PropertyTool.isNotEmpty[](#_PropertyTool_isNotEmpty)

Returns  `false` if the object is null or an empty string, otherwise  `true`.

Example:

`$_PropertyTool.isNotEmpty($category.values[0])`

Available arguments for $\_PropertyTool.isNotEmpty.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

### $\_PropertyTool.isNull[](#_PropertyTool_isNull)

Returns  `true` if object is null, otherwise  `false`.

Example:

`$_PropertyTool.isNull($category)`

Available arguments for $\_PropertyTool.isNull.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

### $\_PropertyTool.isNotNull[](#_PropertyTool_isNotNull)

Returns  `true` if object is not null, otherwise  `false`.

Example:

`$_PropertyTool.isNotNull($category)`

Available arguments for $\_PropertyTool.isNotNull.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

### $\_PropertyTool.outputFirstNotEmpty[](#_PropertyTool_outputFirstNotEmpty)

Returns a string of the first non-empty property in the list of properties provided.

Example:

`$_PropertyTool.outputFirstNotEmpty($currentPage.metadata.title, $currentPage.getStructuredDataNode("heading").textValue, $currentPage.name)`

Available arguments for $\_PropertyTool.outputFirstNotEmpty.
| Argument | Type | Description |
| --- | --- | --- |
| properties | Object  
required | A list of any number of Object properties |

### $\_PropertyTool.outputProperties[](#_PropertyTool_outputProperties)

Return a list of all available properties and methods an object exposes as well its type.

Example:

`$_PropertyTool.outputProperties($currentPage)`

Available arguments for $\_PropertyTool.outputProperties.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object  
required | Any Object. |

## Regex Tool[](#RegexTool)

The Regex Tool (added in version 8.16) provides the ability to work with complex regular expressions.

### $\_RegexTool.compile[](#_RegexTool_compile)

Returns a [Pattern object](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Pattern.html) representing a valid regular expression.

Examples:

`$_RegexTool.compile("^[a-zA-Z0-9]*$")  #set ($text = "A string to search for links containing the pattern https:// .") #set ($patternString = ".*https://.*") #set ($pattern = $_RegexTool.compile($patternString)) #set ($matcher = $pattern.matcher($text)) #set ($matches = $matcher.matches()) ## Expected output: true`

Available arguments for $\_RegexTool.compile.
| Argument | Type | Description |
| --- | --- | --- |
| regex | String   
required | A String representing a valid regular expression |

## Serializer Tool[](#SerializerTool)

The Serializer Tool (added in version 6.2) provides a way to serialize JDOM elements as XML or JSON. This makes it possible to do things like output the markup of a WYSIWYG without having to output each node in the JDOM tree manually.

### $\_SerializerTool.serialize[](#_SerializerTool_serialize)

Returns a String representing `element` as XML.

Example:

`<wysiwyg>     <p>Here is a <strong>WYSIWYG</strong> element.</p>    <p>It has multiple lines.</p> </wysiwyg>`

`#set ($wysiwyg = $_XPathTool.selectSingleNode($contentRoot, "//wysiwyg")) #set ($serialized = $_SerializerTool.serialize($wysiwyg,true)) ## Expected output: <p>Here is a <strong>WYSIWYG</strong> element.</p> <p>It has multiple lines.</p>`

Available arguments for $\_SerializerTool.serialize.
| Argument | Type | Description |
| --- | --- | --- |
| element | Element  
required | Any Element. |
| removeRoot | Boolean  
required | 
`true` or `false`

If `true` the root element of the Element will not be included in the output.

 |

### $\_SerializerTool.toJson[](#_SerializerTool_toJson)

#### Serialize XML to JSON

Returns a String representing `element` or `xml` String as JSON.

Example:

`<a>    <b>B</b>    <c>C</c> </a>`

`#set ($a = $_XPathTool.selectSingleNode($contentRoot, "//a")) $_SerializerTool.toJson($a, true) ## Expected output: {"b":"B","c":"C"}`

Available arguments for $\_SerializerTool.toJson(Element, Boolean) and $\_SerializerTool.toJson(String, Boolean).
| Argument | Type | Description |
| --- | --- | --- |
| element / xml | Element / String  
required | Any Element or String. |
| removeRoot | Boolean  
required | 
`true` or `false`

If `true` the root element of the Element or String will not be included in the output.

 |

#### Serialize Map to JSON

Returns a String representing a `Map` as JSON.

Example:

`#set ($a = {"test": "testing", "array": [1, 2, 3]}) $_SerializerTool.toJson($a) ## Expected output: {"test":"testing","array":[1,2,3]}`

Available arguments for $\_SerializerTool.toJson(Map<String,Object>).
| Argument | Type | Description |
| --- | --- | --- |
| map | Map<String, Object>  
required | A Map which contains String keys and Objects for values. |

## Sort Tool[](#SortTool)

The Sort Tool (added in version 6.2) is modeled after the `<xsl:sort/>` directive.

### $\_SortTool.addSortCriterion[](#_SortTool_addSortCriterion)

Adds a new set of parameters to be used during the next `sort()`.

Notes:

-   Defaults will be used if input values are not recognized.
-   This method can be called multiple times to apply any number of criteria.

Example:

`$_SortTool.addSortCriterion("title", "en", "text", "ascending", "upper-first")`

Available arguments for $\_SortTool.addSortCriterion.
| Argument | Type | Description |
| --- | --- | --- |
| xpath | String   
required | XPath specifying the node/value to sort on. |
| language | String   
required | 
A lowercase two-letter [ISO-639 code](http://www.loc.gov/standards/iso639-2/php/code_list.php). Default is `"en"`.

 |
| dataType | String   
required | 

The type of data. Default is `"text"`.

`"text"`  
`"number"`  
`"qname"`

 |
| order | String   
required | 

The sort order. Default is `"ascending"`.

`"ascending"`  
`"descending"`

 |
| caseOrder | String   
required | 

If text, choose whether to sort by uppercase or lowercase letters first. Default is `"lower-first"`.

`"lower-first"`  
`"upper-first"`

 |

### $\_SortTool.sort[](#_SortTool_sort)

Returns a sorted List based on the values from  `addSortCriterion()`, otherwise defaults are used.

Examples:

`$_SortTool.addSortCriterion("name", "en", "text", "ascending", "upper-first") $_SortTool.sort($pages)`

`#set ($currentFolderChildren = $currentPage.parentFolder.children) #set ($sorted = $_SortTool.sort($currentFolderChildren,"name"))`

`$_SortTool.sort($courses, "metadata.dynamicField(course-number).value")`

`#set($articles = $_.query().byContentType("Articles").execute()) $_SortTool.sort($articles,"structuredDataNode(main/header).textValue:desc")`

`#set($rows = $currentPage.getStructuredDataNodes("row")) $_SortTool.sort($rows,"child(title).value:desc")`

Available arguments for $\_SortTool.sort.
| Argument | Type | Description |
| --- | --- | --- |
| objects | List   
required | A List of Objects. |
| property / properties | String / List  
optional | 
A String representing a property or a List of properties (in order) to sort by.

 |

## String Tool[](#StringTool)

The String Tool (added in version 6.2) provides methods to find and return content within a string.

### $\_StringTool.generateUUID[](#_StringTool_generateUUID)

Returns a String that represents a randomly generated UUID.

Example:

`$_StringTool.generateUUID() ## Sample output: 29ecf0f3-7db4-41b5-94a2-3e170338c3b5`

### $\_StringTool.getStringBuilder[](#_StringTool_getStringBuilder)

Returns a new `StringBuilder` instance.

Example:

`#set ($stringBuilder = $_StringTool.getStringBuilder()) #set ($_void = $stringBuilder.append("foo")) #set ($_void = $stringBuilder.append("+")) #set ($_void = $stringBuilder.append("bar")) $stringBuilder ## Sample output: foo+bar`

### $\_StringTool.substringAfter[](#_StringTool_substringAfter)

Returns a String that exists *after* the `needle` in the `haystack`.

Example:

`$_StringTool.substringAfter("aaabbbccc", "bbb") ## Expected output: ccc`

Available arguments for $\_StringTool.substringAfter.
| Argument | Type | Description |
| --- | --- | --- |
| haystack | String   
required | A String to search within. |
| needle | String   
required | A String to search for. |

### $\_StringTool.substringBefore[](#_StringTool_substringBefore)

Returns a String that exists *before* the `needle` in the `haystack`.

Example:

`$_StringTool.substringBefore("aaabbbccc", "bbb") ## Expected output: aaa`

Available arguments for $\_StringTool.substringBefore.
| Argument | Type | Description |
| --- | --- | --- |
| haystack | String   
required | A String to search within. |
| needle | String   
required | A String to search for. |

## XPath Tool[](#XPathTool)

The XPath Tool (added in version 6.2) allows users to query JDOM XML using an XPath expression. A full list of available methods on the XPath Tool can be found in the [JDOM XPath API](https://commons.apache.org/proper/commons-jxpath/javadocs/api-1.1/) .

**Tip** - Just getting started with XPath? Check out this [tutorial on XPath and XPath Syntax](https://www.w3schools.com/xml/xpath_intro.asp) .

### $\_XPathTool.selectNodes[](#_XPathTool_selectNodes)

Returns a List of nodes matching a given `xpath` expression within `content`.

Example:

`#set ($pages = $_XPathTool.selectNodes($contentRoot,"//system-page"))`

Available arguments for $\_XPathTool.selectNodes.
| Argument | Type | Description |
| --- | --- | --- |
| content | XMLElement  
required | An XML Element. |
| xpath | String   
required | An XPath expression. |

### $\_XPathTool.selectSingleNode[](#_XPathTool_selectSingleNode)

Returns a Node matching a given `xpath` expression within `content`.

Example:

`#set ($currentPage = $_XPathTool.selectSingleNode($contentRoot,"//system-page[@current]"))`

Available arguments for $\_XPathTool.selectSingleNode.
| Argument | Type | Description |
| --- | --- | --- |
| content | XMLElement  
required | An XML Element. |
| xpath | String   
required | An XPath expression. |

[↑](#top)