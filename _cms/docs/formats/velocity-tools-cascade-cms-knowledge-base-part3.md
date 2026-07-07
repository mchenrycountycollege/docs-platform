---
parent: Velocity Tools
section: Query API[](#QueryAPI)
part: 3 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - Query API[](#QueryAPI)

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
