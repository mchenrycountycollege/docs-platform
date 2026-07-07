---
source: https://www.hannonhill.com/cascadecms/latest/cascade-basics/drafts-and-working-copies.html
title: Drafts and Working Copies - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Cascade Basics

# Drafts[](#Drafts)

When you edit an asset, Cascade CMS automatically saves a Draft of your changes. Drafts allow you to preview your changes as you make them without having to manually save a new version of the asset each time. This is especially useful for assets which require workflow, because you can edit and preview the asset as many times as needed before submitting it into workflow. You can preview those changes before submitting them by clicking **Show Edit Preview** (for page assets) or **Preview Draft**.

When viewing an asset you have a Draft for, you'll be shown your Draft first if it's newer than the Current Version. You can switch to the Current Version using the dropdown next to the title. You'll also be reminded if you start to edit an asset you already have an existing Draft for.

You can see all of your existing Drafts in the [My Content](https://www.hannonhill.com/cascadecms/latest/cascade-basics/my-content.html) menu or dashboard widget under **Drafts**.

**Note** - Drafts can't be shared with other users and aren't visible to others viewing the same page. To create a shareable Working Copy which also prevents users from editing the same asset you're working on, you need to Check-out/Lock the asset instead (see below).

# Checking Out / Locking Assets[](#CheckingOutLockingAssets)

You can exclusively check-out / lock any asset you have write access to by clicking **More** > **Check-out/Lock**.

Locking an asset creates a Working Copy, with which you can:

-   **Commit Changes** - finalize and submit the changes or send them into workflow.
-   **Break Lock** - discard your changes.
-   **Reassign lock to another user** - transfer the lock and working copy ownership (they must also have write access).

When previewing a locked asset, you'll be shown the Working Copy first. You can switch to the Current Version using the dropdown next to the title.

You can see all of your existing Working Copies in the [My Content](https://www.hannonhill.com/cascadecms/latest/cascade-basics/my-content.html) menu or dashboard widget under **Locked Assets**.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }