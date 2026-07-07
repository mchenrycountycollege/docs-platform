---
parent: Velocity Tools
section: XPath Tool[](#XPathTool)
part: 17 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - XPath Tool[](#XPathTool)

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