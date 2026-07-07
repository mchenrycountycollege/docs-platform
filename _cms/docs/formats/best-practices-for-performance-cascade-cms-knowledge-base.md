---
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-best-practices.html
title: Best practices for performance - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Formats

# Working with choosers[](#Workingwithchoosers)

When working with choosers, it is important to save repeated `.asset` calls to a variable and then access that variable's methods directly. Failure to do so will result in multiple round trips to the database when only a single round trip is necessary.

Consider the following Velocity code which accesses an image file that has been selected in a chooser:

`#set ($image = $currentPage.getStructuredDataNode("image")) ## one database round trip #set ($imageLink = $image.asset.link) ## another database round trip #set ($imageFileSize = $image.asset.fileSize)  ## another database round trip #set ($imageWidth = $image.asset.dimensions.width) ## another database round trip #set ($imageHeight = $image.asset.dimensions.height)` 

As indicated by the comments, each line with `.asset` is having to fetch the image from the database (forcing a round trip from the app to the database and back). 

Rather than doing this, the code can be simplified by saving the chosen asset to a variable and then accessing methods of that variable:

`## one database round trip #set ($selectedImage = $currentPage.getStructuredDataNode("image").asset)  #set ($imageLink =$selectedImage.link)  #set ($imageFileSize = $selectedImage.fileSize) #set ($imageWidth = $selectedImage.dimensions.width) #set ($imageHeight = $selectedImage.dimensions.height)`

# Using the Query API[](#UsingtheQueryAPI)

When working with the Query API, if you're accessing Structured Data or Dynamic Metadata fields for the queried assets, you should utilize the corresponding `$_.query().preloadStructuredData` and/or `$_.query().preloadDynamicMetadata` methods for a performance boost. 

## Preloading Structured Data

Consider the following code which loads 500 "events":

`#set ($events = $_.query().byContentType("event").execute()) #foreach ($event in $events)  ## database round trip (x 500)  #set($start = $event.getStructuredDataNode("startDateTime").textValue)  #set($end = $event.getStructuredDataNode("endDateTime").textValue)  #set($details = $event.getStructuredDataNode("details").textValue)  #set($link = $event.getStructuredDataNode("additional").getChild("link").textValue) ## additional logic here #end`

In the `foreach` loop here, the application will be required to make a database round trip for each of the 500 results in order to gather each asset's Structured Data. 

By adding the "preload" method to the query as seen below:

`#set ($events = $_.query().byContentType("event").preloadStructuredData().execute())`

The initial query execution will take longer (since the application is gathering the related Structured Data for all 500 results upfront), but accessing this data in the `foreach` loop for each asset will be exponentially faster as the data is already in memory. 

## Preloading Dynamic Metadata

Similar to above, you can preload dynamic metadata as well. Consider the following code in a scenario where the query is returning 500 assets:

`#set ($events = $_.query().byContentType("event").execute()) #foreach ($event in $events)  ## database round trip (x 500)  #set($showInNavMenu = $event.metadata.getDynamicField("display-in-nav").value)  #set($alternateTitle = $event.metadata.getDynamicField("alternate title").value) ## additional logic here #end`

In order to increase performance, we can change the query line as follows which will preload the necessary dynamic metadata fields:

`#set ($events = $_.query().byContentType("event").preloadDynamicMetadata().execute())`

This will force the app to load all of the metadata fields upfront which prevents the repeated database round trips within the `foreach` loop.

# Importing Formats[](#ImportingFormats)

 `#import` directives in Formats require a round trip from the app to the database and back again. This is necessary in order for the app to retrieve the contents of the Format being imported at runtime. Due to this fact, it is important to limit the number of `#import` directives as much as possible in order to keep transformation times performant. 

Consider the following sample code snippet below which imports 3 Formats. Each of the imported Formats contains a single macro.

`## one database round trip #import ("_cms/formats/shared/macros/stripTags") ## another database round trip #import ("_cms/formats/shared/macros/escapeAll") ## another database round trip #import ("_cms/formats/shared/macros/makeAccessible")`

While this type of setup is clean and makes things very straightforward to manage (a single Format contains a single macro with a corresponding name), it requires 3 round trips to the database during the transformation of any Page on which the main Format is attached.

In order to prevent repeated `#import` calls like this, macros should instead be combined into fewer Formats so that fewer `#import` directives are needed.

Continuing the example from above, the macros from the 3 separate Formats indicated above can be combined into a single Format (we'll name it `utility` for the purposes of this sample). Then, rather than importing 3 separate Formats to get access to the 3 individual macros, a single line will do the trick:

`## one database round trip #import ("_cms/formats/shared/macros/utility")`

Now, rather than making multiple trips back and forth to the database (adding to overall render times), only one trip is required and the main Format automatically has access to all of the macros needed for the transformation.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }