---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/advanced-code-editor/index.html
title: Advanced Code Editor - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

# Advanced Code Editor

The Advanced Code Editor (ACE) is Cascade CMS' built-in syntax-highlighting editor.

## Topics

-   [CSS Editor Snippets](https://www.hannonhill.com/cascadecms/latest/content-authoring/advanced-code-editor/css-editor-snippets.html)

## Overview[](#Overview)

The Advanced Code Editor (ACE) is Cascade CMS' built-in syntax-highlighting editor. Assets that are editable with the code editor include Files, Template, Formats, and Text/XML Blocks. The editor provides syntax-highlighting for a variety of languages, auto-indentation and auto-formatting, code folding and code snippets.

By default, Cascade CMS' code editor will display line numbers in the gutter on the left, highlight the active line and try to detect the language of your code to provide the appropriate syntax highlighting. The numbers at the far right of the toolbar show the current line and column of the cursor.

![Advanced Code Editor interface](https://www.hannonhill.com/cascadecms/latest/content-authoring/advanced-code-editor/images/advanced-code-editor.png)

[↑](#top)

## Available Keyboard Shortcuts[](#AvailableKeyboardShortcuts)

The code editor has many keyboard shortcuts available, ranging from searching to undo/redo to navigating to a specific line. For a detailed list of these keyboard shortcuts, please see [this page](http://goo.gl/ET2ct "Ace Editor Default Keyboard Shortcuts") and locate the column with the appropriate Operating System.

[↑](#top)

## Advanced Options[](#AdvancedOptions)

Other options can be toggled using the **Settings** menu and other buttons on the toolbar:

-   **Advanced Editor** - Toggles between using the editor and using a plain text area.
-   **Code Folding** - Enables small arrows in the gutter that can be used to collapse and hide blocks in the code. Supported languages including CSS, HTML, JavaScript, PHP, Velocity, and XML.
-   **Show Whitespace Characters** - Show space, tab, and newline characters.
-   **Code Validation** - Provides validation warning in the gutter.
-   **Highlight Active Line** - Highlights the line where the cursor is in the text area.
-   **Highlight Gutter Line** - Highlights the line where the cursor is in the gutter.
-   **Show Gutter** - Show/hide the gutter on the left side.
-   **Highlight Selected Word** - Highlights all occurrences of the currently selected word.
-   **Font Size** - Switch between 10px, 12px, and 14px font.
-   **Wrap Lines** - Toggles between using line-wrapping for line lengths that exceed the print margin line or the editor's width:
    -   **Off** - Turn off wrapping.
    -   **On** - Wrap lines longer than the print margin line (lines greater than 80 characters).
    -   **Automatic** - Wrap lines longer than the editor's width.
-   **Change Syntax** - Toggles between various languages to use for syntax-highlighting, code folding, formatting, and validation. Supported languages include: CSS, JavaScript, HTML, XML, JSON, LESS, SCSS, Ruby, ColdFusion, JSP, Perl, Python, and Velocity.
-   **Toggle Fullscreen Mode** ( ) - Toggles fullscreen mode.
-   **Format Code** ( ) - The editor supports formatting your code to use consistent indentation and line-endings for some languages.
-   **Help** ( ) - Opens a link to this documentation.
-   **Velocity Documentation** - When editing Velocity formats, this option displays information about the various Velocity tools, methods, and properties available.

[↑](#top)

## Code Snippets[](#CodeSnippets)

The code editor provides a number of pre-defined code snippets for use when editing CSS, HTML, JavaScript, PHP, Velocity, and XSLT. Snippets are activated by selecting the appropriate syntax highlighter, typing a keyword and hitting the tab key.

[↑](#top)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }