---
source: https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/index.html
title: Workflow Triggers - Cascade CMS Knowledge Base
category: workflows
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Workflow Triggers

# Overview[](#Overview)

A workflow trigger is a plugin that enhances an action in the workflow process by executing code as the transition from a source step to a destination step occurs. It encapsulates some system logic to accomplish a non-workflow related function.

Cascade CMS comes with a series of pre-defined triggers, and custom plug-in triggers may also be added to execute custom code during a step transition. More than one workflow trigger may be attached to a workflow action.  
  
A trigger may be enhanced by a parameter, which is an optional element that further specifies the system logic that should occur.

# Available Triggers[](#AvailableTriggers)

The following is a list of pre-defined workflow triggers. Click the title of a trigger to learn more about it and for implementation instructions:

1.  [Assign Step If User Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/assign-step-if-user-trigger.html)  
    Advances a workflow to the step specified by the next parameter, if previous step was executed by a specified user.
2.  [Assign To Content Owner of Asset Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/assign-to-content-owner-of-asset-trigger.html)  
    Assigns the following step to the content owner of the asset in workflow.
3.  [Assign To Group Owning Asset Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/assign-to-group-owning-asset-trigger.html)  
    Assigns the following step to the group with write access to the parent folder of the asset in workflow.
4.  [Assign to Specified Group Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/assign-to-specified-group-trigger.html)  
    This trigger is used to assign a workflow to a group.
5.  [Assign To Workflow Owner Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/assign-to-workflow-owner-trigger.html)  
    Assigns the following step to the user that initiated the workflow.
6.  [Copy Folder Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/copy-folder-trigger.html)  
    Copies the parent folder of the asset in workflow into a designated location.
7.  [Create New Workflow Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/create-new-workflow-trigger.html)  
    This trigger starts new workflows for analogous assets to support translation capabilities or cross-site content synchronization.
8.  [Delete Parent Folder Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/delete-parent-folder-trigger.html)  
    This trigger deletes the parent folder of the asset in workflow as well as all contents of that folder.
9.  [Delete Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/delete-trigger.html)  
    This trigger deletes the asset in the workflow.
10.  [Email Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/email-trigger.html)  
     Including this trigger will provide an email notification for the step immediately following.
11.  [Merge Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/merge-trigger.html)  
     Merges any changes into the system repository.
12.  [Preserve Current User Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/preserve-current-user-trigger.html)  
     Acts as a workaround solution when a workflow is submitted to a group instead of a user.
13.  [Publish Containing Publish Set Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/publish-containing-publish-set-trigger.html)  
     This trigger is used to publish out publish sets that the asset in workflow is a member of.
14.  [Publish Parent Folder Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/publish-parent-folder-trigger.html)  
     Publishes the parent folder of the asset in workflow.
15.  [Publish Set Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/publish-set-trigger.html)  
     Publishes all assets in a designated Publish Set.
16.  [Publish Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/publish-trigger.html)  
     Publishes the current asset in workflow (if publishable) to all enabled Destinations available.
17.  [Unpublish and Delete Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/unpublish-and-delete-trigger.html)  
     Allows for unpublishing content and deleting it at the same time.
18.  [Version Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/version-trigger.html)  
     Creates a version of the page that will be stored as the most current version.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }