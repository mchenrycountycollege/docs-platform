---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/widen-collective-integration.html
title: Acquia DAM (Widen) Integration (Labs) - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Connectors and Integrations

# Overview[](#Overview)

The [Acquia DAM](https://www.widen.com/digital-asset-management) digital asset management (DAM) integration allows users to browse for and select images and assets from your Widen Collective library directly from the WYSIWYG editor.

This integration is available for Cascade Cloud clients only.

# Enabling Acquia DAM Integration[](#EnablingAcquiaDAMIntegration)

First, enable Acquia DAM integration for your system:

1.  Click the system menu button ( ) > **Administration** > **Preferences** > **Integrations & Plugins**.
2.  Under **Digital Asset Management**, enter your **Widen Collective API key**.
    -   For more information about locating your Widen API key, visit [Widen's FAQ](https://l.spct8.com/yrSUZq).

Next, enable Acquia DAM integration for one or more sites:

1.  Choose a site from the **Site** menu, then select **Manage Site** > **Site Settings**.
2.  Under **Digital Asset Management**, select **Enable Widen Collective Integration**.
3.  Optionally, enter a **Default Category** which corresponds to a valid category in Widen. This will preload the chooser panel with assets from that category.
4.  Click **Submit**.

# Selecting Assets from Acquia DAM[](#SelectingAssetsfromAcquiaDAM)

To select assets from your Acquia DAM library:

1.  In the WYSIWYG editor, click either the **Insert/edit image** or **Insert/edit link** button.
2.  Under **Image/Link Type**, select **External**.
3.  Under **Image/Link Source**, click the **Browse Widen Collective for external images/files** link.
4.  In the chooser panel, select an asset or search for assets using the search bar. Each asset has the following options:
    -   **Download** ( ) - Downloads the selected asset to your computer.
    -   **Quick View** ( ) - Opens a preview window for the asset.
    -   **Share** ( ) - Opens dimension options for the asset. Select a dimension and click **Submit** to insert the asset or link to the asset.
5.  Update fields such as the **Image description** field as needed and click **OK** to insert your image or link.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }