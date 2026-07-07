---
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/internal-cascade-api/index.html
title: Internal Cascade API - Cascade CMS Knowledge Base
category: api
scraped: 2026-02-16
version: cascade-cms-latest
---

# Internal Cascade API

The internal Cascade API exposes a set of operations to developers for code run within Cascade CMS in Formats, Publish Triggers, Asset Factory Plugins, and other types of plugins.

## Topics

-   [Internal Cascade API Changelog](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/internal-cascade-api/internal-cascade-api-changelog.html)

## Overview[](#Overview)

The internal Cascade API exposes a set of operations to developers for code run within Cascade CMS in formats, Publish Triggers, Asset Factory Plugins, and other types of plugins. Currently the API supports the following operations:

-   **Reading** assets and asset data.
-   **Creating** new assets.
-   Making **edits** to existing assets.
-   Making **copies** of existing assets.
-   Adding assets to the **publish** queue.
-   **Deleting** assets.

The Cascade API is a library written in Java.

To use the API inside of formats, use the [Locator Tool or Query API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#LocatorToolandQueryAPI) to retrieve API objects.

To use the API inside of an [Asset Factory Plugin](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/index.html) or [Publish Trigger](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/publish-triggers.html), developers need to include the Cascade API JAR file in their classpath. The API JAR is bundled with the [Asset Factory Plugin SDK](https://github.com/hannonhill/Cascade-Server-Asset-Factory-Plugin-SDK) and the [Publish Trigger SDK](https://github.com/hannonhill/Cascade-Server-Publish-Trigger-SDK).

[↑](#top)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }