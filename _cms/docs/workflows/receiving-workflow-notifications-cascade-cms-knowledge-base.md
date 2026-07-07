---
source: https://www.hannonhill.com/cascadecms/latest/content-management/workflows/receiving-workflow-notifications.html
title: Receiving Workflow Notifications - Cascade CMS Knowledge Base
category: workflows
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Workflows

# Types of Notifications[](#TypesofNotifications)

You can be notified of workflows waiting for you or any of your Groups by email or in the My Workflows dashboard widget.

## Via Email

A workflow [Email trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/email-trigger.html) can be used to automatically email the next user or group in the workflow process with a message with a link to the workflow. Workflow emails can be customized by creating [Custom Workflow Emails](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/custom-workflow-emails.html).

### Via My Workflows / My Content

The [My Content](https://www.hannonhill.com/cascadecms/latest/cascade-basics/my-content.html) area or My Workflows dashboard widget will display any waiting workflows for you or your Groups. Workflows are automatically removed once they are advanced and/or reassigned.

### ![My Workflows dashboard widget](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/images/wf-widget.png)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }