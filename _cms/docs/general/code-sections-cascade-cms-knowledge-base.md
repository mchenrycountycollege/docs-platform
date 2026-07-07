---
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/code-sections.html
title: Code Sections - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Developing in Cascade

# Passthrough Code Sections[](#PassthroughCodeSections)

Passthrough code sections instruct the interpreter to exclude the enclosed code when the page is being previewed internally. Upon publishing, the contents of these tags will be uncommented and included in the final page.

The passthrough code section is delimited as follows:

`<!--#passthrough...put any code here...#passthrough-->`

This deprecated way is also allowed:

`<!--#START-CODE...put any code here...#END-CODE-->`

When viewing a file or page containing these types of blocks within the CMS, these sections are left untouched unless the asset is a page with serialization type of PDF or RTF (as determined by the Target associated with the page's Template). If the serialization type is PDF or RTF the section is simply stripped from the code.

When publishing a file or page containing these blocks to a location outside the CMS, these sections are rewritten so that the enclosing comments and #passthrough strings are removed. However, when publishing a page with PDF or RTF serialization type, these sections are once again completely removed rather than rewritten.

For example, suppose we wanted to embed the following PHP code in a page:

`<?php echo "<Hello World>" ?>`

Wrapping the passthrough code comment tags allows the page to validate as XML:

`<!--#passthrough<?php echo "<Hello World>" ?>#passthrough-->`

When viewing this page in the system, this code would remain inside of the comments untouched; and the PHP code will not render (unless a PDF or RTF configuration of a page is viewed, in which case the comments and the code would be removed).

However, upon publishing to a file with serialization type of HTML or XML, the comment tags are stripped out leaving only the valid PHP code.

When publishing to a PDF or RTF file, or viewing a PDF or RTF configuration of the page within the system, the comments and the code would both be stripped out.

# Passthrough-Top Code Sections Tags[](#Passthrough-TopCodeSectionsTags)

The second type of code section currently supported in the system is the passthrough-top code section, which is delimited as follows:

`<!--#passthrough-top … put any code here… #passthrough-top-->`

This deprecated way is also allowed:

`<!--#START-ROOT-CODE … put any code here… #END-ROOT-CODE-->`

The passthrough-top code section is used to support code that must be placed at the very beginning of a document (file or page) – for example, an ASP page that requires a processing instruction before the page's DOCTYPE. Because the system does not allow for XML comments before the root element or DOCTYPE in a template, such code must be placed inside of a root code section.

The rules for rendering these code sections both inside and outside of the CMS are the same as for the passthrough code section with one notable difference - when publishing to a file or page with serialization type HTML or XML, the comment tags are removed, but the code inside the comments is actually moved to the beginning of the document. This can be useful if, for example, you need to include a page redirect at the top of the page, but you are using a template that does not have a content region defined at the very top.

For example, suppose you have the following .NET template:

`<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>     <%@ Page Language="C#" AutoEventWireup="true" CodeFile="control.aspx.cs" Inherits="_Default" %>     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">     <html xmlns="http://www.w3.org/1999/xhtml">        <head runat="server">           <title>              <system-page-title />           </title>        </head>        <body>           <system-region name="DEFAULT" />        </body>     </html>`

Therefore, when a page using this template was published, the ASP instructions would appear before the page's DOCTYPE.

The following root code section tags could be used to create this template in the CMS:

`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">     <html xmlns="http://www.w3.org/1999/xhtml">     <!--#passthrough-top    <%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>     <%@ Page Language="C#" AutoEventWireup="true" CodeFile="control.aspx.cs" Inherits="_Default" %>     #passthrough-top-->        <head runat="server">           <title>              <system-page-title/>           </title>        </head>        <body>           <system-region name="DEFAULT"/>        </body>     </html>`

If there were multiple passthrough-top code sections in a page or file, they would be placed sequentially at the top of the document in the relative order that they appeared.

# Protect Code Sections Tags[](#ProtectCodeSectionsTags)

These code sections work the same as passthrough code sections with the exception that protect code sections are also rendered inside of Cascade CMS. Because of that, the purpose of these code sections is shifted from outputting server side code to client side code such as Javascript. This also allows outputting unbalanced XML for old browser support.

Protect code sections are delimited as follows:

`<!--#protect...put any code here...#protect-->`

or

`<![CDATA[#protect...put any code here …#protect]]>`

Using the CDATA format allows for special sequences of characters to be entered, such as `--` which is commonly used in JavaScript as a decrement operation. During the last stage of rendering a Page, the special wrapping tags are stripped leaving the text `...put any code here...` in the example above.

Below you will find an example that outputs unbalanced XML that could be used to aid the support of older web browsers.

`<![CDATA[#protect    <!--[if IE 7]>      <body lang=”en”>    <![endif]-->    <!--[if !(IE 7)]>      <body>    <![endif]-->  #protect]]>      …      <![CDATA[#protect     </body>  #protect]]>`

This will result in following code which normally (without use of code sections) would not be allowed by Cascade CMS:

`<!--[if IE 7]>       <body lang=”en”>   <![endif]-->   <!--[if !(IE 7)]>       <body>   <![endif]-->       …   </body>`

# Protect-Top Code Sections Tags[](#Protect-TopCodeSectionsTags)

These code sections work just as passthrough-top code sections but again with the exception that protect-top code sections are also rendered inside of Cascade CMS. You can use these code sections to output a non-standard doctype, use Cascade CMS pages to dynamically render non XML content such as JavaScript, CSS or JSON, or output the HTML 5 Boilerplate code.

The syntax for client root code section is delimited as follows:

`<!--#protect-top...put any code here...#protect-top-->`

or

`<![CDATA[#protect-top...put any code here ...#protect-top]]>`

During the last stage of rendering the page, the special syntax is stripped leaving the text `...put any code here...` in the example above and that text is then being moved above the XML document.

The following code can be used to output the HTML 5 Boilerplate (h5bp) code:

`<html class="no-js"><!--<![endif]-->   <![CDATA[#protect-top  <!DOCTYPE html>  <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->  <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->  <!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->  <!--[if gt IE 8]><!--> #protect-top]]>`

The result of this code will be:

`<!DOCTYPE html>   <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->   <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->   <!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->   <!--[if gt IE 8]><!--><html class="no-js"><!--<![endif]-->`

# Cascade Skip Tags[](#CascadeSkipTags)

In some situations it is useful to completely remove part of the code. This is possible through outputting #cascade-skip tag inside of HTML comments. For example, the code below:

`<xml><!--#cascade-skip--><unnecessary-tag/><!--#cascade-skip--></xml>`

will result with the `<unnecessary-tag/>` being removed after the page finishes rendering, right before it is published out or outputted to the screen:

`<xml/>`

Placing only one `<!--#cascade-skip-->` tag results with the remaining contents being fully stripped. This is especially useful together with the #protect-top tag. For example, this valid XML document:

`<xml><![CDATA[#protect-top  function test()  {          //Some JavaScript code  }  <!--#cascade-skip-->  #protect-top]]>   </xml>`

will result with a pure JavaScript code completely stripped of XML tags:

`function test()   {           //Some JavaScript code }`

A practical real life scenario would involve constructing an XSLT or Velocity format that dynamically renders contents inside of the protect-top code section in example above to get a result with dynamically generated JavaScript code.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }