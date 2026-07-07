---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/webdam-integration.html
title: Webdam by Bynder Integration (Labs) - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Connectors and Integrations

# Overview[](#Overview)

The [Webdam by Bynder](https://www.bynder.com/en/webdam/) digital asset management (DAM) integration allows users to browse for and select images and assets from your Webdam library directly from the WYSIWYG editor.

This integration is available for Cascade Cloud clients only.

# Enabling Webdam Integration[](#EnablingWebdamIntegration)

First, enable Webdam integration for your system:

1.  Click the system menu button ( ) > **Administration** > **Preferences** > **Integrations & Plugins**.
2.  Under **Digital Asset Management**, enter your organization's **Webdam Domain**. Example: *https://yourorganization.webdam.com*

Next, enable Webdam integration for one or more Sites:

1.  Choose a site from the **Site** menu, then select **Manage Site** > **Site Settings**.
2.  Under **Digital Asset Management**, select **Enable Webdam Integration**.
3.  Click **Submit**.

# Selecting Assets from Webdam[](#SelectingAssetsfromWebdam)

To select assets from your Webdam library:

1.  In the WYSIWYG editor, click either the **Insert/edit image** or **Insert/edit link** button.
2.  Under **Image/Link Type**, select **External**.
3.  Under **Image/Link Source**, click the **Browse Webdam for external images/files** link.
4.  In the chooser panel, browse for an asset or search for assets using the search bar.
    -   Optionally, sort assets by attributes such as date uploaded, date created, name, or size.
    -   Hover over an image to view an expanded preview.
5.  Click an asset to select it. A checkmark will appear by your selected asset.
6.  Choose your asset dimensions using the menu in the bottom left and click **Insert**.
7.  Update fields such as the **Image description** field as needed and click **OK** to insert your image or link.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }