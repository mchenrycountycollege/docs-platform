---
source: https://www.hannonhill.com/cascadecms/latest/cascade-basics/unpublishing-deleting-which-is-best.html
title: Unpublishing vs. Deleting Content - Which is best? - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Cascade Basics

# Overview[](#Overview)

Cascade CMS pushes web content (files, pages, and folders) to your public-facing webserver. Beyond this, it boils down to what you want to do with your content. If you want to temporarily pull your content off your server (maybe for maintenance or time-sensitive reasons) with the possibility of adding it back later, you'll want to unpublish your content.

On the other hand, if you want to remove content from Cascade CMS altogether, use the delete function. Deleting content will unpublish it (with an option to confirm if previously published) and move it to the Trash bin, where it will remain for an administrator-designated amount of time before being purged from the CMS.

Deleted content can be recalled from the Trash as long as the user has access to see it and as long as it has not been purged.

# Preventing Publishing[](#PreventingPublishing)

Additionally, you'll be able to prevent content from being published using a publishing preference. For example, if you have a page in development but not quite ready for "prime time", it can be hidden from Cascade CMS publishing hooks.

To keep content from being published, locate the **Configure** tab while editing an asset. The Configure tab will show checkboxes for indexing ("Include when indexing") and publishing ("Include when publishing"). Disable the "Include when publishing" option and click **Submit**. Note: doing so will essentially "freeze" any content you already have on your webserver, so you may want to unpublish your content before disabling publishing for the asset in question.

Disabling "Include when indexing" will prevent Cascade CMS from indexing the asset (or its contents if the asset is a folder) internally. It will not affect publishing.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }