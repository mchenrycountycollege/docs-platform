---
parent: Velocity Tools
section: Property Tool[](#PropertyTool)
part: 12 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - Property Tool[](#PropertyTool)

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
