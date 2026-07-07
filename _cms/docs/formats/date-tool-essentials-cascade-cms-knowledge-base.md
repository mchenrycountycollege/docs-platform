---
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/date-tool-essentials.html
title: Date Tool Essentials - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Formats

# Overview[](#Overview)

The Date Tool lets you retrieve, parse, format, and compare date/time values in Velocity. It is especially useful when you are working with Unix timestamps in milliseconds (such as Index Block XML values), normalizing mixed time zones from feeds, or formatting human-readable dates for display.

-   Convert Unix timestamps in milliseconds to Java Dates.
-   Parse formatted strings into Dates with `toDate()`.
-   Format Dates for display with `format()`.
-   Compare two dates using `difference()`.

# .getDate() vs .toDate()[](#_getDatevs_toDate)

Use `.getDate()` when you already have a Unix timestamp in milliseconds (for example, from metadata like `$currentPage.metadata.startDate) and need a Java Date for formatting or comparison. If you omit the argument, getDate()` returns the current moment.

If your input is a human-readable date string (like `03-21-2024`), use `.toDate()` instead. The pattern you pass must match the string exactly; if it does not, you will get `null` rather than a parsed date.

A quick rule: numeric Unix timestamps go to `getDate()`, formatted strings go to `toDate()`. Keep your patterns consistent so your parsing and display stay in sync.

These two are easy to mix up: `getDate()` expects (or defaults to) a numeric timestamp and hands you back a Date object, while `toDate()` converts a string *to* a Date object by matching the syntax in the string with your pattern.

Quick compare: getDate vs toDate.
| Method | Input | When to use |
| --- | --- | --- |
| `$_DateTool.getDate()` | Unix timestamp in milliseconds | Convert a numeric timestamp to a Date for formatting or comparison. |
| `$_DateTool.toDate()` | Formatted date string + pattern | Parse a human-readable date string into a Date. |

**Pitfall** - `getDate()` expects milliseconds. If you pass seconds, your date will land near 1970.

## .getDate examples

Many `$currentPage` properties already return Date objects, so you can format them directly without conversion:

`## These already return Date objects - no conversion needed $currentPage.lastPublishedOn    ## Date of last publish $currentPage.createdOn          ## Date asset was created $currentPage.lastModified       ## Date of last modification  ## Get the current date/time $_DateTool.getDate()`

Format these dates directly:

`## Format the last published date for a byline Published $_DateTool.format("MMM d, yyyy", $currentPage.lastPublishedOn) ## Output: Published Jan 15, 2026  ## Format creation date Created $_DateTool.format("MMMM d, yyyy", $currentPage.createdOn) ## Output: Created January 10, 2026`

Data Definition date/time fields store timestamps as strings, so you need to convert them with `getDate()` before formatting:

`## Format a date/time field from a Data Definition #set ($dateNode = $currentPage.getStructuredDataNode("date-time").textValue) #set ($eventDate = $_DateTool.getDate($dateNode))  $_DateTool.format("MMMM d, yyyy", $eventDate) ## Output: March 15, 2026`

## .toDate examples

Use `toDate()` when you have a date as a string and need to parse it into a Date object:

`## Parse a date string - pattern must match the input format exactly #set ($dateString = "03-21-2024") #set ($date = $_DateTool.toDate("MM-dd-yyyy", $dateString)) $_DateTool.format("MMMM d, yyyy", $date) ## Output: March 21, 2024`

`## ISO-style date format (common in feeds and APIs) #set ($shipDateString = "2024-07-05") #set ($shipDate = $_DateTool.toDate("yyyy-MM-dd", $shipDateString)) $_DateTool.format("MMM d, yyyy", $shipDate) ## Output: Jul 5, 2024`

`## Date with time - useful for event timestamps #set ($stamp = "2024-07-05 14:30:00") #set ($stampDate = $_DateTool.toDate("yyyy-MM-dd HH:mm:ss", $stamp)) $_DateTool.format("EEEE, MMM d 'at' h:mma", $stampDate) ## Output: Friday, Jul 5 at 2:30PM`

## Real-world scenarios

Event listing with metadata dates:

`## Display event start date from page metadata #set ($startMillis = $currentPage.metadata.startDate) #if ($startMillis && $startMillis > 0)   #set ($eventDate = $_DateTool.getDate($startMillis))   <time datetime="$_DateTool.format('yyyy-MM-dd', $eventDate)">     $_DateTool.format("MMMM d, yyyy", $eventDate)   </time> #end`

News article with published date:

`## Format last published date for byline #set ($pubDate = $_DateTool.getDate($currentPage.lastPublishedOn)) Published $_DateTool.format("MMM d, yyyy", $pubDate)`

## Working with Index Blocks

Processing dates from Index Block XML:

`## Index Block provides timestamps in milliseconds #foreach ($page in $_XPathTool.selectNodes($contentRoot, "//system-page"))   #set ($lastMod = $_XPathTool.selectSingleNode($page, "last-modified-on"))   #set ($lastModDate = $_DateTool.getDate($lastMod.value))    <li>     $_XPathTool.selectSingleNode($page, "title").value     - Updated $_DateTool.format("M/d/yy", $lastModDate)   </li> #end`

Filtering Index Block results by date:

`## Show only items modified in the last 30 days #set ($now = $_DateTool.getDate()) #foreach ($page in $_XPathTool.selectNodes($contentRoot, "//system-page"))   #set ($lastModMillis = $_XPathTool.selectSingleNode($page, "last-modified-on").value)   #set ($lastModDate = $_DateTool.getDate($lastModMillis))   #set ($diff = $_DateTool.difference($lastModDate, $now))    #if ($diff.days <= 30)     ## Display this item   #end #end`

## Handling edge cases

Null-safe date handling:

`## Always check for null before formatting #set ($startMillis = $currentPage.metadata.startDate) #if ($startMillis && $startMillis > 0)   #set ($startDate = $_DateTool.getDate($startMillis))   $_DateTool.format("MMMM d, yyyy", $startDate) #else   Date not set #end`

Pattern mismatch returns null:

`## toDate returns null if pattern doesn't match input #set ($input = "March 15, 2024") #set ($wrongPattern = $_DateTool.toDate("MM-dd-yyyy", $input))  ## null #set ($rightPattern = $_DateTool.toDate("MMMM d, yyyy", $input)) ## works  #if (!$rightPattern)   Could not parse date #end`

Empty string handling:

`## Empty strings also return null #set ($emptyDate = "") #set ($parsed = $_DateTool.toDate("yyyy-MM-dd", $emptyDate))  #if (!$parsed)   No date provided #end`

# Using difference()[](#Usingdifference)

`difference()` returns a **Comparison** object that describes the distance between two dates. When printed, it renders a human-readable value (like `5 months`), and it also includes structured fields like `days`, `months`, `relative`, and `full`.

## Parsing dates for comparison

Most real-world use starts by converting a string into a Date. Keep the format string aligned with your input (this is the part that usually breaks).

`#set ($today = $_DateTool.getDate())  ## Example input: "07-04-26" (MM-dd-yy) #set ($manualDate = "07-04-26") #set ($targetDate = $_DateTool.toDate("MM-dd-yy", $manualDate))  $today       ## Wed Jan 14 14:36:28 EST 2026 $targetDate  ## Sat Jul 04 00:00:00 EDT 2026`

## Basic example: distance between two dates

Use `difference(dateA, dateB)` when you want the distance between two dates. This is best for countdowns, “time since” labels, or comparisons used in logic.

`#set ($today = $_DateTool.getDate()) #set ($manualDate = "07-04-26") #set ($targetDate = $_DateTool.toDate("MM-dd-yy", $manualDate))  ## Compare today to the target date #set ($difference = $_DateTool.difference($today, $targetDate))  $today       ## Wed Jan 14 14:36:28 EST 2026 $targetDate  ## Sat Jul 04 00:00:00 EDT 2026 $difference  ## 5 months`

## Useful fields on the Comparison object

The returned object is more than just a string. These are the fields you’ll actually use in templates and UI labels:

`$difference.abbr         ## 5 mos $difference.difference    ## 5 months $difference.relative      ## 5 months later $difference.full          ## 5 months 2 weeks 6 days 8 hours 23 minutes ...  $difference.days          ## 170 $difference.weeks         ## 24 $difference.months        ## 5 $difference.years         ## 0  $difference.class         ## class org.apache.velocity.tools.generic.ComparisonDateTool$Comparison`

## Branching UI label: “Still coming up” vs “Happened”

For simple branching logic, `days` is the easiest field to work with. Just be consistent about argument order. In the example below, a positive number means the target date is in the future (relative to today).

`#set ($today = $_DateTool.getDate()) #set ($manualDate = "07-04-26") #set ($targetDate = $_DateTool.toDate("MM-dd-yy", $manualDate)) #set ($difference = $_DateTool.difference($today, $targetDate))  #if ($difference.days >= 0)   Still coming up (in $difference.abbr) #else   Happened ($difference.abbr ago) #end`

Tip: For “ago” labels, you can also use `$difference.abs()` if you want a cleaner positive duration (example: `5 months` instead of `-5 months`).

# whenIs() basics[](#whenIsbasics)

`whenIs()` answers the more human question: “When is A relative to B?” It also returns a **Comparison** object, but the output is naturally directional (`earlier` / `later`), which is great for client-facing labels.

## No-arg usage: “now”

`## today is January 13, 2026 in this example #set ($today = $_DateTool.getDate())  #set ($whenIs = $_DateTool.whenIs($today)) $whenIs ## now`

## Comparing two dates (both directions)

Argument order matters. Swapping them flips `earlier` vs `later`.

`#set ($today = $_DateTool.getDate())  #set ($manualDate = "July 4, 2026") #set ($targetDate = $_DateTool.toDate("MMMM dd, yyyy", $manualDate))  $targetDate ## Sat Jul 04 00:00:00 EDT 2026  ## Target compared to today #set ($whenIsA = $_DateTool.whenIs($targetDate, $today)) $whenIsA ## 5 months earlier  ## Today compared to target #set ($whenIsB = $_DateTool.whenIs($today, $targetDate)) $whenIsB ## 5 months later`

## Useful fields (same Comparison object)

Same object structure as `difference()`, but the human strings are usually what you want to show clients (`relative`, `abbr`, `full`).

`$whenIsB.abbr        ## 5 mos later $whenIsB.relative     ## 5 months later $whenIsB.difference   ## 5 months $whenIsB.full         ## 5 months 3 weeks 7 hours ... later  $whenIsB.days         ## 171 $whenIsB.months       ## 5 $whenIsB.years        ## 0  $whenIsB.class        ## class org.apache.velocity.tools.generic.ComparisonDateTool$Comparison`

## Branching UI label: “didn’t happen yet” vs “you missed it”

This is a clean pattern for client-friendly messaging. Just decide what “positive” means for your argument order and stick to it.

`#set ($today = $_DateTool.getDate()) #set ($manualDate = "July 4, 2026") #set ($targetDate = $_DateTool.toDate("MMMM dd, yyyy", $manualDate))  ## "today relative to target" #set ($whenIs = $_DateTool.whenIs($today, $targetDate))  #if ($whenIs.days > 0)   Didn't happen yet ($whenIs.abbr) #else   You missed it ($whenIs.abbr) #end`

# getCalendar basics[](#getCalendarbasics)

`getCalendar()` returns a Java `Calendar` object representing the current date and time in Cascade’s configured time zone. Use it when you need to read specific parts of “now” (year, month, day, weekday, hour) as numeric values for logic.

`#set ($cal = $_DateTool.getCalendar())  ## Calendar field IDs (numbers) are used by: ## $cal.get(fieldId)  $cal.get(1)  ## YEAR ## Example output: 2026  $cal.get(2)  ## MONTH (zero-based: January = 0) ## Example output: 0  $cal.get(5)  ## DAY_OF_MONTH ## Example output: 15  $cal.get(7)  ## DAY_OF_WEEK (Sunday = 1 ... Saturday = 7) ## Example output: 5  $cal.get(11) ## HOUR_OF_DAY (0–23) ## Example output: 15`

These numeric field IDs are standard Java Calendar constants. You’ll typically only need a small subset of them when working with `getCalendar()`.

| Field ID | Meaning | Notes |
| --- | --- | --- |
| `1` | YEAR | 4-digit year |
| `2` | MONTH | Zero-based: January = `0` |
| `5` | DAY\_OF\_MONTH | 1–31 |
| `6` | DAY\_OF\_YEAR | 1–365/366 |
| `7` | DAY\_OF\_WEEK | Sunday = `1`, Saturday = `7` |
| `9` | AM\_PM | `0` = AM, `1` = PM |
| `11` | HOUR\_OF\_DAY | 24-hour clock (0–23) |
| `12` | MINUTE | 0–59 |

**Important:** `getCalendar()` is best treated as a read-only helper in Cascade. For date math or comparisons, use `difference()` or `whenIs()`. For formatting, use `format()`.

# Formatting output[](#Formattingoutput)

Keep your output consistent by reusing a small set of format strings. Popular options include:

-   `MMMM d, yyyy`
-   `MMM d, yyyy`
-   `yyyy-MM-dd`
-   `yyyyMMdd`
-   `EEEE, MMMM d, yyyy 'at' h:mma`
-   `yyyy-MM-dd'T'HH:mm:ssXXX` (ISO 8601 with offset)
-   `HH:mm` (24-hour) and `h:mma` (12-hour)
-   `'Week' w, yyyy` (week number)

Common symbols:

Common date format symbols
| Symbol | Meaning | Variations / examples |
| --- | --- | --- |
| `y` | Year | y=2024  
yy=24  
yyyy=2024 |
| `M` | Month (1-12) | M=8  
MM=08  
MMM=Aug  
MMMM=August |
| `d` | Day of month | d=5  
dd=05 |
| `E` | Day name | E=Wed  
EEE=Wed  
EEEE=Wednesday |
| `H` | Hour 0-23 | H=9  
HH=09 |
| `h` | Hour 1-12 | h=9  
hh=09 |
| `m` | Minute | m=3  
mm=03 |
| `s` | Second | s=7  
ss=07 |
| `a` | AM/PM marker | a=AM |
| `z` | Time zone abbreviation | z=EDT  
zzzz=Eastern Daylight Time |
| `X` | ISO 8601 offset | X=-5  
XX=-0500  
XXX=-05:00 |
| `w` | Week of year | w=34  
ww=34 |

Practical examples using the same timestamp:

`#set ($stamp = "2024-08-21 13:45:00") #set ($date = $_DateTool.toDate("yyyy-MM-dd HH:mm:ss", $stamp))  $_DateTool.format("MMMM d, yyyy", $date) ## August 21, 2024  $_DateTool.format("EEE, MMM d 'at' h:mma", $date) ## Wed, Aug 21 at 1:45PM  $_DateTool.format("z", $date) ## EDT  $_DateTool.format("zzzz", $date) ## Eastern Daylight Time`

# Handling time zones[](#Handlingtimezones)

Feeds frequently include timestamps paired with separate time zone identifiers (for example, `2024-08-21 13:00:00` with `America/Chicago`). If you format those dates using your server's default time zone, event times can appear hours off. To display the correct local time, you need to explicitly apply each event's time zone when formatting.

## Cloud approach (simple)

In Cascade Cloud, you can pass a time zone string directly to `$_DateTool.getTimeZone().getTimeZone()`:

`#set ($startDate = $currentPage.createdOn)  ## Default server time zone $_DateTool.format('EE MMM dd HH:mm:ss z yyyy', $startDate) ## Output: Wed Aug 21 14:08:26 EDT 2019  ## Converted to UTC $_DateTool.format('EE MMM dd HH:mm:ss z yyyy', $startDate, $_DateTool.getLocale(), $_DateTool.getTimeZone().getTimeZone("UTC")) ## Output: Wed Aug 21 18:08:26 UTC 2019  ## Converted to Pacific time $_DateTool.format('EE MMM dd HH:mm:ss z yyyy', $startDate, $_DateTool.getLocale(), $_DateTool.getTimeZone().getTimeZone("America/Los_Angeles")) ## Output: Wed Aug 21 11:08:26 PDT 2019`

## On-premises limitation

Some on-premises Cascade instances block the nested `.getTimeZone()` call due to Java security restrictions. If you see this error:

`VelocityException: ASTMethod.execute() : exception invoking method 'getTimeZone' in class sun.util.calendar.ZoneInfo`

You can verify whether your instance has this restriction by testing these two calls:

`## This works on all instances - returns a ZoneInfo object $_DateTool.getTimeZone()  ## This fails on some on-prem instances $_DateTool.getTimeZone().getTimeZone("UTC")`

If the second call fails, use the reflection workaround below.

## On-premises workaround (reflection)

This approach uses Java reflection to access the `TimeZone` class directly. It works on both Cloud and on-premises instances:

`## Get the TimeZone class via reflection #set ($tzClass = $_DateTool.getTimeZone().getClass().forName("java.util.TimeZone"))  ## Create a TimeZone object for UTC #set ($utcTz = $tzClass.getMethod("getTimeZone", $tzClass.forName("java.lang.String")).invoke(null, "UTC"))  ## Format a date in UTC $_DateTool.format('EE MMM dd HH:mm:ss z yyyy', $currentPage.createdOn, $_DateTool.getLocale(), $utcTz) ## Output: Wed Aug 21 18:08:26 UTC 2019`

## Processing feeds with mixed time zones

When processing a JSON feed where each event has its own time zone, use the reflection approach with a dynamic zone value:

`## Assume feed fields: $event.start (yyyy-MM-dd HH:mm:ss), $event.timezone (e.g., America/Chicago)  ## Set up the TimeZone class reference once #set ($tzClass = $_DateTool.getTimeZone().getClass().forName("java.util.TimeZone"))  #foreach ($event in $events)   ## Get the TimeZone for this event   #set ($eventTz = $tzClass.getMethod("getTimeZone", $tzClass.forName("java.lang.String")).invoke(null, $event.timezone))    ## Parse the date string   #set ($parser = $_DateTool.getDateFormat("yyyy-MM-dd HH:mm:ss", $_DateTool.getLocale(), $eventTz))   #set ($startDate = $parser.parse($event.start))    ## Format with the event's time zone   $_DateTool.format("MMM d, yyyy 'at' h:mma z", $startDate, $_DateTool.getLocale(), $eventTz)   ## Example output: Aug 21, 2024 at 1:00PM CDT #end`

## Validating time zone IDs

Time zone strings like `America/Chicago` or `America/New_York` must match Java's recognized identifiers. To see all valid IDs:

`#set ($tzClass = $_DateTool.getTimeZone().getClass().forName("java.util.TimeZone")) #set ($allIds = $tzClass.getMethod("getAvailableIDs", null).invoke(null, null)) $_ListTool.toList($allIds)`

This returns a list of all accepted time zone identifiers. As long as your feed's time zone values appear in this list, they will work with the examples above.

# Sorting by date[](#Sortingbydate)

Once you have dates, you'll often need to sort content chronologically. Cascade offers a few approaches depending on your data source.

## Index Block sorting

The simplest approach is to configure sorting directly in the Index Block asset. Under the block's settings, you can sort by system properties like **Last Modified Date**, **Created Date**, or **Start Date** (for pages with date metadata). This handles sorting before your Velocity code runs.

## Sorting with $\_.query()

The `$_.query()` tool lets you query assets directly in Velocity and sort the results by date fields. Use `sortBy()` to specify the field and `sortDirection()` for ascending or descending order.

`## Query articles sorted by last modified date (newest first) #set ($results = $_.query().byContentType("Article").sortBy("modified").sortDirection("desc").execute())  #foreach ($page in $results)   $page.name - $_DateTool.format("MMM d, yyyy", $page.lastModified) #end`

Available date fields for `sortBy()`: `created`, `modified`, `startDate`, `endDate`, and `reviewDate`.

`## Sort events by start date (ascending) #set ($events = $_.query().byContentType("Event").sortBy("startDate").sortDirection("asc").execute())`

## Sorting with $\_SortTool

When you need to sort a collection in Velocity, use `$_SortTool`. This is useful when working with structured data or when you need custom sort logic.

`## Sort a list of pages by lastModified (ascending) #set ($sorted = $_SortTool.sort($pages, "lastModified"))  ## Sort descending (newest first) #set ($sorted = $_SortTool.sort($pages, "lastModified:desc"))  ## Sort by a metadata date field #set ($sorted = $_SortTool.sort($pages, "metadata.startDate:desc"))`

## Sorting with XPath

When processing Index Block XML, you can sort nodes directly in your XPath expression using `sort-by`. Date fields from Index Blocks are Unix timestamps in milliseconds, which sort numerically.

`## Sort pages by last-modified-on, newest first #set ($pages = $_XPathTool.selectNodes(   $contentRoot,   "//system-page[sort-by(last-modified-on, 'number', 'descending')]" ))  #foreach ($page in $pages)   #set ($lastMod = $_XPathTool.selectSingleNode($page, "last-modified-on").value)   #set ($date = $_DateTool.getDate($lastMod))   $_DateTool.format("MMM d, yyyy", $date) #end`

For metadata date fields stored as timestamps, use the same numeric sort:

`## Sort by a dynamic metadata date field (e.g., event start date) #set ($events = $_XPathTool.selectNodes(   $contentRoot,   "//system-page[sort-by(dynamic-metadata[name='start-date']/value, 'number', 'ascending')]" ))`

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }