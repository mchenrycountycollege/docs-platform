---
parent: Velocity Tools
section: Field Tool[](#FieldTool)
part: 7 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - Field Tool[](#FieldTool)

## Field Tool[](#FieldTool)

The Field Tool (added in version 7.0) provides access to Java public constant values, which are otherwise inaccessible in Velocity scripts.

Full API documentation:

-   [FieldTool](https://velocity.apache.org/tools/2.0/apidocs/org/apache/velocity/tools/generic/FieldTool.html)

### $\_FieldTool.in[](#_FieldTool_in)

Returns a Classes' public static variables.

Examples:

`$_FieldTool.in($_DateTool.getCalendar()).JANUARY ## Expected output: 0`

Example adding time to a Calendar:

`#set ($date = $_DateTool.getDate()) #set ($calendar = $_DateTool.getCalendar()) $calendar.add($_FieldTool.in($calendar).DAY_OF_YEAR, 1) <p>Today = ${date}</p> <p>Tomorrow = ${calendar.getTime()}</p>`

Available arguments for $\_FieldTool.in.
| Argument | Type | Description |
| --- | --- | --- |
| object | Object   
required | An Object, which gives access to the Classes' public static variables |
