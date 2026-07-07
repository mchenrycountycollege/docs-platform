---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/create-resized-images-plug-in.html
title: Create Resized Images Plug-in - Cascade CMS Knowledge Base
category: asset-factory
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Asset Factory Plugins

# Overview[](#Overview)

This plug-in will create resized copies of the original image.

For example, this plug-in can be configured to create a 75x75-pixel thumbnail in addition to the 400x400-pixel image uploaded.

**Note** - This plug-in is applicable to Asset Factories for files only.

**Note** - This plug-in relies on the Java Imaging API and is only able to work with freely-licensed image formats. This means this plug-in can work with JPEG, JPEG2000, BMP, PNG, and GIF images.

# Parameters[](#Parameters)

-   **Number of additional images** - The number of images the plug-in will create in addition to the original.
-   **Image widths/heights** - A comma-delimited list of widths/heights for the additional images. Example: 450,20%
    -   To use a pixel value, simply enter the number of pixels.
    -   To use a percentage, enter the percentage followed by the percent sign.
    -   A blank space character could be used as well as one of the values. This will cause the plug-in to calculate the width/height of the resized image so that the original aspect ratio is kept. Leaving both width and height values blank for the same image is not allowed.

Both the width and height comma-delimited lists must be specified and must contain an amount of comma-delimited values equal to the number of additional images.

# Examples[](#Examples)

The following parameters will create one additional image that is 15% of the size of the original image. For example: If the original image is 1000x1000 pixels, the plug-in will create an additional 150x150-pixel copy.

-   Number of Additional Images: 1
-   Widths: 15%
-   Height: 15%

The following parameters will create one additional image that is 200 pixels wide and 100 pixels tall. Note that because the width and height are both specified, the aspect ratio of the original image won't be maintained.

-   Number of Additional Images: 1
-   Widths: 200
-   Height: 100

The following parameters will create one additional image that is 150 pixels tall, and the image's width will be calculated so that the original aspect ratio is maintained. For example: If the original image is 2000x1500 pixels, the plug-in will create an additional 200x150 pixel copy.

-   Number of Additional Images: 1
-   Widths:
-   Height: 150

The following parameters will create two additional images. The first image will be 150 pixels wide, and the image's height will be calculated so that the original aspect ratio is maintained. The second image will be 300 pixels wide and 200 pixels tall, and the original aspect ratio will *not* be maintained.

-   Number of Additional Images: 2
-   Widths: 150,300
-   Height: ,200

The following parameters will create two additional images, one 150 pixels tall and one 300 pixels tall, and the images' widths will be calculated so that the original aspect ratio is maintained.

-   Number of Additional Images: 2
-   Widths: ,
-   Height: 150,300

**Note** - When using this plug-in, if you specify that a workflow should not be used, the plug-in will bypass any create workflow in place for the placement folder, regardless of whether the user has the rights to do so or not.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }