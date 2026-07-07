---
parent: Velocity Tools
section: List Tool[](#ListTool)
part: 9 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - List Tool[](#ListTool)

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
