---
parent: Velocity Tools
section: Number Tool[](#NumberTool)
part: 11 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - Number Tool[](#NumberTool)

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
