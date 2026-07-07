---
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/index.html
title: Formats - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---

# Formats

Formats are used to transform XML or API data into XHTML, XML, text, or other meaningful markup.

## Topics

-   [Velocity Tools](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html)
-   [Cascade CMS Velocity Examples](https://github.com/hannonhill/Velocity-Cookbook)
-   [Best practices for performance](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-best-practices.html)
-   [Date Tool Essentials](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/date-tool-essentials.html)

## Overview[](#Overview)

Content in Cascade CMS is stored as XML such as structured data from Data Definitions or XML from Index Blocks. In order to style that data for display on the web, it must be transformed into useful markup, and we use Formats for this purpose.

Formats can be applied alone or in conjunction with [Blocks](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/index.html) to Template regions in a page. Using Formats with Blocks also makes Blocks reusable as one Block's content can be styled in many different ways. Formats can also be assigned to the default region of a page. In this case, the Format styles the user-supplied structured data from the Data Definition in a way that is meaningful for that page.

You can choose between two templating languages to create Formats in Cascade CMS:

-   [Apache Velocity](https://velocity.apache.org/engine/1.7/user-guide.html)
-   [XSLT (eXtensible Stylesheet Language Transformations)](https://www.w3.org/TR/1999/REC-xslt-19991116)

Formats of either type can be used in separate regions on the same page, but syntax from the two can't be used within the same Format.

As a language, Apache Velocity is procedural in nature. It takes several cues from Java, even employing several Java-based tools for string manipulation. String literals and variables in Velocity are derived directly from Java objects. The DateTool, for example, uses the same date formatting as in Java. Velocity users familiar with JavaScript and PHP may note some similarities in how code is written.

As a declarative language, XSLT formats are capable of transforming entire pages at once, given their close ties to XML. Prior users of XSLT should find immediate familiarity in using XML data in Cascade CMS.

[↑](#top)

## Creating a Format[](#CreatingaFormat)

To create a Format:

1.  Click **Add Content**\>**Default**\>**Format**.
2.  Select **Velocity** or **XSLT** and click **Choose**.
3.  Enter a name for your Format and select a **Placement Folder**.
4.  Enter your Format content in the [code editor](https://www.hannonhill.com/cascadecms/latest/content-authoring/advanced-code-editor/index.html).
5.  Click **Preview Draft** to preview the Format and then click**Submit** to save your Format.

[↑](#top)

## Testing a Format[](#TestingaFormat)

You can test your Format on Block and/or page content before the Format is submitted by using the **Test Format** feature in the Format editing area. This saves time and prevents you from having to make numerous small edits to incrementally test Formats against assets to which the Formats will be assigned. It also reduces the number of versions being generated for the asset because only final, tested changes need to be saved.

![new ui in cascade 8](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/images/formats-ui.png)

To test a Format:

1.  Click **Preview Options**.
2.  Under **Select an asset type**, select one of the following options:
    1.  **Block & Context Page** - Select any Block in the system to be rendered in the preview area. For Blocks that can make use of a context page (for example Index Blocks with no folder selected), a page can be selected to be used as the context page for the Block so that a Format can be written as if it were being applied to a page region with an implicit Index Block assigned.
    2.  **Context Page** - Select any page in the system to be rendered in the preview area. WYSIWYG pages will have their WYSIWYG content rendered in the preview area, and Data Definition pages will have their structured data rendered in the preview area. That is unless the default region of the page being previewed has a Block assigned to it in which case the Block's content will be rendered. Note that any Format assigned to the page's default region will be ignored so that the Format currently being edited can be applied to the raw page content.
3.  Click **Test Format**.

The results rendered when the Format in the editor is applied to the chosen content will be displayed in the bottom pane.

[↑](#top)

## Including Formats[](#IncludingFormats)

You can include one or more Velocity Formats in another Velocity Format using the `import` statement. Below is a simple example of a macro declared in one Format and called in another using an `import` statement.

*/\_cascade/formats/include/print*

`#macro(printElementName $element)    $element.name #end`

*/\_cascade/formats/display-elements*

`#import('/_cascade/formats/include/print') #set($elements = $_XPathTool.selectNodes($contentRoot, '//system-page'))  #foreach($element in $elements)    <p>#printElementName($element)</p> #end`

The `import` statement takes a single argument that is a path to another Format in the system. To import a Format from another site, prepend the path with `site://` and the site name. A variable can be supplied to the `import` statement as well.

`#set($myPath = 'site://Site Name/_cascade/formats/include/print') #import($myPath)`

Note that imported Formats can only be used below the line where the Format is included.

`## Incorrect, this comes before the import statement and won't execute correctly. #printElementName($element)  #import('/_cascade/formats/include/print')  ## Correct, this comes after the import statement. #printElementName($element)`

[↑](#top)

## Assigning Formats[](#AssigningFormats)

Both Velocity and XSLT Formats can be assigned to individual regions at the page, Configuration, or Template level.

The page level is the most specific level in the Block/Format assignment hierarchy. Changes to Block/Format assignments at the page level will only affect that page. In contrast, changing a Block/Format assignment on the Configuration level will affect any page using that Configuration.

For example, if your sitemap uses a specific Index Block and Format, rather than setting up a new Configuration that will only be used for one page, you could also override the Block/Format assignment at the page level just for the sitemap page.

**Note** - Only XSLT Formats be applied to the entire page at the page, Configuration, or Template level. An XSLT Format assigned to a page will transform the complete assembled content of that page after all region-level Formats have been applied.

[↑](#top)

## Current Versions[](#CurrentVersions)

Velocity 1.7 is the current version used as of Cascade CMS 8.0. Versions of Cascade CMS earlier than 6.10 support Velocity 1.5.

XSLT version 1.0 is supported in Cascade CMS 8.0 and previous releases.

[↑](#top)

[↑](#top)

## Related Links

-   [Velocity Cheatsheet](https://www.hannonhill.com/cascadecms/latest/_docs/velocity-cheatsheet.pdf)
-   [Advanced Velocity Cheatsheet](https://www.hannonhill.com/cascadecms/latest/_docs/advanced-velocity-cheatsheet.pdf)