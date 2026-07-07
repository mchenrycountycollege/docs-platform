---
parent: Velocity Tools
section: Regex Tool[](#RegexTool)
part: 13 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - Regex Tool[](#RegexTool)

## Regex Tool[](#RegexTool)

The Regex Tool (added in version 8.16) provides the ability to work with complex regular expressions.

### $\_RegexTool.compile[](#_RegexTool_compile)

Returns a [Pattern object](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Pattern.html) representing a valid regular expression.

Examples:

`$_RegexTool.compile("^[a-zA-Z0-9]*$")  #set ($text = "A string to search for links containing the pattern https:// .") #set ($patternString = ".*https://.*") #set ($pattern = $_RegexTool.compile($patternString)) #set ($matcher = $pattern.matcher($text)) #set ($matches = $matcher.matches()) ## Expected output: true`

Available arguments for $\_RegexTool.compile.
| Argument | Type | Description |
| --- | --- | --- |
| regex | String   
required | A String representing a valid regular expression |
