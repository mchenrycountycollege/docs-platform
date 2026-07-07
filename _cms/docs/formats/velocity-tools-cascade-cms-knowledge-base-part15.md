---
parent: Velocity Tools
section: Sort Tool[](#SortTool)
part: 15 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - Sort Tool[](#SortTool)

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
