---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/index.html
title: Asset Factories - Cascade CMS Knowledge Base
category: asset-factory
scraped: 2026-02-16
version: cascade-cms-latest
---

# Asset Factories

Asset Factories allow users to rubber stamp new assets with certain configurations and content already in place. Asset Factories can be used to create assets from scratch or be based on an existing pre-configured base asset.

## Topics

-   [Asset Factory Plugins](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/index.html)

## Overview[](#Overview)

Asset Factories allow users to rubber stamp new assets with certain configurations and content already in place. Asset Factories can be used to create assets from scratch or be based on an existing pre-configured base asset. Cascade CMS comes with seven built-in Default Asset Factories, and additional custom Asset Factories can be created.  
  
Asset Factories and their containers can be configured to be accessible only to selected groups in the Add Content menu. Containers for Asset Factories appear as sub-menus in the Add Content menu. For example, a "Press Release" Asset Factory might be filed in a container named "News", which would be accessible only to News contributors.

[↑](#top)

## Creating an Asset Factory[](#CreatinganAssetFactory)

To create an Asset Factory:

1.  Navigate to **Manage Site** > **Asset Factories**.
2.  Navigate to the container in which the new Asset Factory will be stored, or create a new container using **Add** > **Container**.
3.  Click **Add** > **Asset Factory**.
4.  Select the type of Asset Factory you'd like to create and click **Choose**. You can create Asset Factories for the following asset types:
    -   Block
    -   File
    -   Folder
    -   Page
    -   Format
    -   Link
    -   Template
5.  In the **Name** field, enter a name for your Asset Factory. The name will be used as its label in the Add Content menu.
6.  In the **Parent Container** field, select a container for the Asset Factory, if desired. Asset Factory containers appear as submenus in the Add Content menu.
7.  In the **Settings** tab, configure the following fields:  
    1.  **Base Asset**\- An optional asset on which assets created using this Asset Factory will be based.
        -   If no base asset is selected, new assets will have no pre-populated content or configurations.
    2.  **Placement Folder** - An optional folder in which assets created with this Asset Factory are placed.
        -   If a Placement Folder is chosen, users will not be able to choose a different folder when using the Asset Factory unless Subfolder Placement is enabled (see below).
        -   If no placement folder is selected, users will be able to choose any folder as long as they have read/write access to it.
    3.  **Subfolder Placement** - Enabling this option allows assets created using this Asset Factory to be placed in subfolders of the Placement Folder.
    4.  **Description for New Menu** - Allows you to provide a description or help text for the Asset Factory which will appear in the Add Content menu.
    5.  **Folder Placement Position** - Determines the order in which the new asset will appear in the selected placement folder.
        -   For example, a new press release may always need to be placed first in the folder in order for dynamic navigation menus to render them by most recent. The value 0 can be used to place assets in the first position; leave the field blank to place assets in the last position.
    6.  **Overwrite** - Allows newly-created assets to overwrite existing assets with the same name.
    7.  **Applicable Groups** - Determines which groups can access the Asset Factory in the Add Content menu.
        -   These groups must also be included in the Applicable Groups of the Asset Factory's container(s).
    8.  **Workflow mode** - Determines if workflow is required when creating assets with this Asset Factory.
        1.  **None** - Workflow is not required for assets created with this Asset Factory.
        2.  **Folder Controlled** - Create-type Workflow Definitions that are applied to the folder in which the asset is being created will be used.
        3.  **Selected Workflow Definition** - Use the chooser to select a Workflow Definition to be used whenever assets are created with this Asset Factory.
8.  In the **Plugins** tab, add one or more [Asset Factory plugins](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/index.html) by selecting one from the drop-down menu and clicking **\+ Add Plugin**.
9.  Click **Submit**.

[↑](#top)

## Base Assets[](#BaseAssets)

Base assets allow newly-created assets to inherit pre-configured properties. For example, if a page Asset Factory has a base page selected, new pages created using that Asset Factory will inherit the base page's Content Type, block and format assignments, metadata, and content.

Folder Asset Factories with a base folder specified can be used to create entire collections of folders and assets, and links contained in those assets will be resolved relative to the newly-created folder. For example, when creating a new calendar year folder with month pages that link to each other:  
  
Year 1  
Month A  
Month B

  
Year 2  
Month A1  
Month B1  
  
If under the Year 1 folder, a page called Month B links to a page called Month A and this folder is the base folder for an Asset Factory, when Year 2 is created, Month B1 will link to Month A1.

**Note** - To avoid confusing base assets with publishable content, it's advised that base assets be placed in a non-publishable, non-indexable folder separate from folders containing publishable content.

[↑](#top)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }