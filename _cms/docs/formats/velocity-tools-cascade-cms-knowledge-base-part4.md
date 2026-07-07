---
parent: Velocity Tools
section: Date Tool[](#DateTool)
part: 4 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - Date Tool[](#DateTool)

## Date Tool[](#DateTool)

The Date Tool (added in version 6.2) allows users to retrieve, format, and compare datetime values. Timestamps returned in [Index Block](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/index-blocks.html) XML are Unix timestamps in milliseconds and can be converted to [Java Dates](https://docs.oracle.com/javase/8/docs/api/java/util/Date.html) using the Date Tool.

**New:** [Date Tool Essentials](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/date-tool-essentials.html) covers `.getDate()` vs `.toDate()`, `difference()`, `whenIs()`, time zones, and sorting patterns.

Full API documentation:

-   [ComparisonDateTool](https://velocity.apache.org/tools/devel/apidocs/org/apache/velocity/tools/generic/ComparisonDateTool.html)
-   [DateTool](https://velocity.apache.org/tools/devel/apidocs/org/apache/velocity/tools/generic/DateTool.html)

### $\_DateTool.difference[](#_DateTool_difference)

Returns a Comparison representing the difference between `now` and `then`.

Examples:

`$_DateTool.difference(1578526435000, 1577836800000) ## Expected output: -1 week`

`#set ($pubDate = $currentPage.lastPublishedOn) $_DateTool.difference($_DateTool.getDate(), $pubDate) ## Expected output: -2 weeks`

Available arguments for $\_DateTool.difference.
| Argument | Type | Description |
| --- | --- | --- |
| now | Date / Long   
required | A Date or a Number representing a Unix timestamp in milliseconds. |
| then | Date / Long   
required | A Date or a Number representing a Unix timestamp in milliseconds. |

### $\_DateTool.format[](#_DateTool_format)

Returns a String representing a `date` in a specified `format`.

Examples:

`$_DateTool.format('medium', $date)`

`$_DateTool.format('EEEE MM/dd/yy', $date)`

Available arguments for $\_DateTool.format.
| Argument | Type | Description |
| --- | --- | --- |
| format | String  
optional | A String representing the desired date format. See Java's documentation for [predefined formats](https://docs.oracle.com/javase/tutorial/i18n/format/dateFormat.html) and customizable [simple date formats](https://docs.oracle.com/javase/tutorial/i18n/format/simpleDateFormat.html) . |
| date | Date or Calendar  
required | A Date or Calendar. |

### $\_DateTool.getCalendar[](#_DateTool_getCalendar)

Returns the current date as a Calendar.

Example:

`$_DateTool.getCalendar()`

### $\_DateTool.getDate[](#_DateTool_getDate)

Returns a `date` or the current date as a Date.

Examples:

`$_DateTool.getDate()`

`#set ($page = $_XPathTool.selectSingleNode($contentRoot, "//calling-page/system-page")) #set ($pubDate = $page.getChild("last-published-on").value) $_DateTool.getDate($pubDate)`

Available arguments for $\_DateTool.getDate.
| Argument | Type | Description |
| --- | --- | --- |
| date | String    
optional | A Unix timestamp in milliseconds. |

### $\_DateTool.getDay[](#_DateTool_getDay)

Returns a Number representing the day in a `date` or the current date.

Example:

`$_DateTool.getDay()`

Available arguments for $\_DateTool.getDay.
| Argument | Type | Description |
| --- | --- | --- |
| date | Date or Calendar    
optional | A Date or Calendar. |

### $\_DateTool.getMonth[](#_DateTool_getMonth)

Returns a Number representing the month in a `date` or the current date.

Note: In Java, the first month of the year in the Gregorian and Julian calendars is `JANUARY` which is 0.

Example:

`$_DateTool.getMonth()`

Available arguments for $\_DateTool.getMonth.
| Argument | Type | Description |
| --- | --- | --- |
| date | Date or Calendar    
optional | A Date or Calendar. |

### $\_DateTool.getTime[](#_DateTool_getTime)

Returns a Number representing the current time.

Example:

`$_DateTool.getTime()`

### $\_DateTool.getValue[](#_DateTool_getValue)

Returns an Integer representing the value for the `field` in the `date`.

Example:

`$_DateTool.getValue(1, $date)`

Available arguments for $\_DateTool.getValue.
| Argument | Type | Description |
| --- | --- | --- |
| field | Integer  
required | 
An Integer representing a Calendar field type. Available types:

0 = Era  
1 = Year  
2 = Month  
3 = Week of Year  
4 = Week of Month  
5 = Day of Month  
6 = Day of Year  
7 = Day of Week  
8 = Day of Week in Month  
9 = AM/PM  
10 = Hour  
11 = Hour of Day  
12 = Minute  
13 = Second  
14 = Millisecond  
15 = Zone offset  
16 = DST offset

 |
| date | Date  
required | A Date. |

### $\_DateTool.getYear[](#_DateTool_getYear)

Returns a Number representing the year in a `date` or the current date.

Example:

`$_DateTool.getYear()`

Available arguments for $\_DateTool.getYear.
| Argument | Type | Description |
| --- | --- | --- |
| date | Date or Calendar    
optional | A Date or Calendar. |

### $\_DateTool.toDate[](#_DateTool_toDate)

Returns a `date` in the specified `format` as a Date.

Example:

`#set ($date = $currentPage.getStructuredDataNode("date").textValue) #set ($date = $_DateTool.toDate("MM-dd-yyyy",$date)) $_DateTool.format("EEEE, MMMM dd, yyyy", $date)`

Available arguments for $\_DateTool.toDate.
| Argument | Type | Description |
| --- | --- | --- |
| format | String    
required | A String representing a date format. |
| date | Object    
required | An Object representing a date. |

### $\_DateTool.toDays[](#_DateTool_toDays)

Returns a Number representing the number of days between Unix Time 0 (midnight UTC/GMT on January 1, 1970) and a `time`.

Example:

`$_DateTool.toDays(1577836800000) ## Expected output: 18262`

Available arguments for $\_DateTool.toDays.
| Argument | Type | Description |
| --- | --- | --- |
| time | Long   
required | A Number representing time in milliseconds. |

### $\_DateTool.toHours[](#_DateTool_toHours)

Returns a Number representing the number of hours between Unix Time 0 (midnight UTC/GMT on January 1, 1970) and a `time`.

Example:

`$_DateTool.toHours(1577836800000) ## Expected output: 438288`

Available arguments for $\_DateTool.toHours.
| Argument | Type | Description |
| --- | --- | --- |
| time | Long   
required | A Number representing time in milliseconds. |

### $\_DateTool.toMinutes[](#_DateTool_toMinutes)

Returns a Number representing the number of minutes between Unix Time 0 (midnight UTC/GMT on January 1, 1970) and a `time`.

Example:

`$_DateTool.toMinutes(1577836800000) ## Expected output: 26297280`

Available arguments for $\_DateTool.toMinutes.
| Argument | Type | Description |
| --- | --- | --- |
| time | Long   
required | A Number representing time in milliseconds. |

### $\_DateTool.toMonths[](#_DateTool_toMonths)

Returns a Number representing the number of months between Unix Time 0 (midnight UTC/GMT on January 1, 1970) and a `time`.

Example:

`$_DateTool.toMonths(1577836800000) ## Expected output: 608`

Available arguments for $\_DateTool.toMonths.
| Argument | Type | Description |
| --- | --- | --- |
| time | Long   
required | A Number representing time in milliseconds. |

### $\_DateTool.toSeconds[](#_DateTool_toSeconds)

Returns a Number representing the number of seconds between Unix Time 0 (midnight UTC/GMT on January 1, 1970) and a `time`.

Example:

`$_DateTool.toSeconds(1577836800000) ## Expected output: 1577836800`

Available arguments for $\_DateTool.toSeconds.
| Argument | Type | Description |
| --- | --- | --- |
| time | Long   
required | A Number representing time in milliseconds. |

### $\_DateTool.toWeeks[](#_DateTool_toWeeks)

Returns a Number representing the number of weeks between Unix Time 0 (midnight UTC/GMT on January 1, 1970) and a `time`.

Example:

`$_DateTool.toWeeks(1577836800000) ## Expected output: 2608`

Available arguments for $\_DateTool.toWeeks.
| Argument | Type | Description |
| --- | --- | --- |
| time | Long   
required | A Number representing time in milliseconds. |

### $\_DateTool.toYears[](#_DateTool_toYears)

Returns a Number representing the number of years between Unix Time 0 (midnight UTC/GMT on January 1, 1970) and a `time`.

Example:

`$_DateTool.toYears(1577836800000) ## Expected output: 50`

Available arguments for $\_DateTool.toYears.
| Argument | Type | Description |
| --- | --- | --- |
| time | Long   
required | A Number representing time in milliseconds. |

### $\_DateTool.whenIs[](#_DateTool_whenIs)

Returns a Comparison representing the difference between  `now` and  `then` or between the current time and `then`.

Examples:

`$_DateTool.whenIs(1578526435000, 1577836800000) ## Expected output: 1 week earlier`

`#set ($currentDate = $_DateTool.getDate()) #set ($pubDate = $currentPage.lastPublishedOn) $_DateTool.whenIs($currentDate, $pubDate) ## Expected output: 2 weeks earlier`

Available arguments for $\_DateTool.whenIs.
| Argument | Type | Description |
| --- | --- | --- |
| now | Date / Long   
optional | A Date or a Number representing a Unix timestamp in milliseconds. |
| then | Date / Long   
required | A Date or a Number representing a Unix timestamp in milliseconds. |
