---
parent: Velocity Tools
section: String Tool[](#StringTool)
part: 16 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - String Tool[](#StringTool)

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
