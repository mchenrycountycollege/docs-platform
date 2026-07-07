---
parent: Velocity Tools
section: Display Tool[](#DisplayTool)
part: 5 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - Display Tool[](#DisplayTool)

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
