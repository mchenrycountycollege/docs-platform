---
source: https://www.hannonhill.com/cascadecms/latest/content-management/workflows/how-do-i-assign-a-workflow.html
title: Assigning Workflows - Cascade CMS Knowledge Base
category: workflows
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Workflows

# Overview[](#Overview)

In Cascade CMS, workflows can either be used as part of an Asset Factory for the creation of new content, or assigned to a folder to control actions taken on contained content.

# Assigning a Workflow to an Asset Factory[](#AssigningaWorkflowtoanAssetFactory)

You can use "Create" type Workflow Definitions in conjunction with [Asset Factories](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/index.html) to ensure a workflow is triggered when specific types of content are created, regardless of their placement folder. For example: You might attach a Workflow Definition containing a Marketing approval step to an Asset Factory responsible for creating press releases.

To assign a workflow to an Asset Factory:

1.  Navigate to **Manage Site** > **Asset Factories**.
2.  Select the Asset Factory and click **Edit**.
3.  Under **Settings** > **Workflow Mode** choose **Selected workflow definition**.
4.  Under **Workflow Definition**, select a workflow using the chooser.
5.  Click **Submit**.

**Note** - Workflow Definitions assigned at the Asset Factory level will supercede any workflows applied to or inherited by the new content's placement folder.

# Assigning a Workflow to a Folder[](#AssigningaWorkflowtoaFolder)

Workflows aren't applicable to folder assets themselves, but they're assigned at the folder level and affect actions taken on content contained in that folder. You can assign multiple Workflow Definitions of all types to a folder; the type of action taken and the Workflow Definition's Applicable Groups will control which workflows are triggered for a user.

To assign a workflow to a folder:

1.  While viewing the folder, click **More** > **Workflows** or right-click on the folder and select **Workflows** from the context menu.
2.  Click **Choose Workflow Definition** and choose a workflow to assign. You can assign more than one workflow to a folder by choosing additional workflow definitions.
3.  Configure the following options:  
    -   **Require Workflow on all contained assets** - Any assigned Workflow Definitions will be optional for users unless this setting is enabled. If users aren't permitted to bypass workflow and workflow is required, you must have a Workflow Definition available for each type of action a user might take (Create, Edit, Delete, etc.).
    -   **Inherit Workflow Definitions from containing folders** - This setting allows you to manage workflows from the parent folder down and have subfolders inherit its assigned workflows. This setting isn't applicable to the base folder of a site, but can be used in conjunction with the **Apply setting to contained folders** option to propagate the setting to subfolders.
4.  Click **Submit**.

**Note** - When applying workflow settings to multiple folders using **Apply setting to contained folders**, the process will run as a background task. You'll receive a notification once the process is complete.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }