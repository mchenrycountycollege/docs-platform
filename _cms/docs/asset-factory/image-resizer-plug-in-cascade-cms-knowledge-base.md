---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/image-resizer-plug-in.html
title: Image Resizer Plug-in - Cascade CMS Knowledge Base
category: asset-factory
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Asset Factory Plugins

# Overview[](#Overview)

This plug-in resizes images with the specified width and height.

**Note** - This plug-in is applicable to Asset Factories for files only.

**Note** - This plug-in relies on the Java Imaging API and is only able to work with freely-licensed image formats. This means this plug-in can work with JPEG, JPEG2000, BMP, PNG, WebP, and GIF images.

# Parameters[](#Parameters)

-   **Height** - The height of the resized image, in pixels. If left blank, the height will be interpolated using the supplied width to maintain the aspect ratio of the original image.
-   **Width** - The width of the resized image, in pixels. If left blank, the width will be interpolated using the supplied height to maintain the aspect ratio of the original image.

If you supply both a height and width parameter, the aspect ratio of the original image will not be maintained.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }