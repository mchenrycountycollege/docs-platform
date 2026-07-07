---
parent: Velocity Tools
section: Serializer Tool[](#SerializerTool)
part: 14 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - Serializer Tool[](#SerializerTool)

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
