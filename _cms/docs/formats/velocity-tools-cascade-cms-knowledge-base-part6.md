---
parent: Velocity Tools
section: Escape Tool[](#EscapeTool)
part: 6 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - Escape Tool[](#EscapeTool)

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
