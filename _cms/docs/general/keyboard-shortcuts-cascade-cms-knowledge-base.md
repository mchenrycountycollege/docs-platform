---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/accessibility/keyboard-shortcuts.html
title: Keyboard Shortcuts - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Accessibility

# Overview[](#Overview)

Cascade CMS features keyboard shortcuts in the following areas.

## In Cascade CMS (General)

To see a list of available keyboard shortcuts in Cascade CMS, press Shift + ? on your keyboard while logged into the CMS to bring up the **Keyboard Shortcuts** menu.

Additional keyboard shortcuts are enabled by default, but you can toggle them by checking/unchecking the **Enable additional shortcuts** checkbox in the menu.

### In Cascade CMS (Date/Time Fields)

When working in date/time fields such as Calendar or Date/Time fields the following shortcuts are available:

<!-- ul>li{ margin-bottom:10px; } -->

-   Tab then Enter - Enter date/time chooser
-   Up / Down / Left / Right (date entry) - Change date
-   (Cmd) + Ctrl + Right / Left (date entry) - Change month/year
-   Enter (date entry) - Choose date and enter time entry
-   Up / Down (time entry) - Change hour, minute, AM/PM
-   Enter (time entry) - Choose time

### In the WYSIWYG Editor

For more information on keyboard shortcuts in the WYSIWYG editor, please visit [TinyMCE Accessibility](https://www.tiny.cloud/docs/advanced/accessibility/).

### In the Advanced Code Editor

For a list of keyboard shortcuts in the advanced code editor, please visit[Ace Default Keyboard Shortcuts](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts).

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }