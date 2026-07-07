---
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/system-pseudo-tags.html
title: System Pseudo-Tags - Cascade CMS Knowledge Base
category: system-settings
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Developing in Cascade

# Overview[](#Overview)

System pseudo-tags are special system tags that instruct Cascade CMS to act on the content contained within them. System pseudo-tags are not XML elements but instead use a square bracket notation.

# System View Internal[](#SystemViewInternal)

This tag surrounds content to be displayed inside the system only. It can be used for paths or blocks of code that need to be present upon rendering within the system, but not necessarily when published out of Cascade CMS.

`[system-view:internal]This appears inside Cascade.[/system-view:internal]`

Examples:

-   Generating a message for users in Cascade CMS displaying when the last published date occurred.
-   Simulating an area of a page where some server-side scripting code will exist when the page is published.

# System View External[](#SystemViewExternal)

This tag surrounds content to be displayed outside the system only. It can be used for paths or blocks of code that need to be present upon publishing, but not necessarily when viewed within Cascade CMS.

`[system-view:external]This appears outside Cascade.[/system-view:external]`

Examples:

-   Wrap around web analytics JavaScript so it only tracks traffic on the published page.
-   Wrap around server-side includes, since they'll only work outside of Cascade CMS.

# System CDATA[](#SystemCDATA)

XML's CDATA section instructs the XML parser to ignore whatever content is inside of it. This results in the content being treated strictly as character data instead of markup.

`[cascade:cdata]content[/cascade:cdata]`

In the following example:

`<script><![CDATA[  function matchwo(a,b)  {  if (a < b && a < 0) then    {    return 1;    }  else    {    return 0;    }  }  ]]></script>`

the `<` and `&` characters, if not wrapped in a CDATA section, would generate a parser error because they indicate the start of an element and the start of a character entity respectively. When applying formats to page content, CDATA sections in the content are often interpreted and then removed from the resulting XML. The Cascade CMS CDATA tags are used to ensure that the CDATA section makes it into the page content that is output when rendered inside the system and when published.  
  
This is useful when generating RSS feeds, for example, as the feed itself should contain CDATA sections to instruct the feed readers to interpret the content within the sections as character data.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }