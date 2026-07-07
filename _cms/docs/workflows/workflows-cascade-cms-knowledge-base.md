---
source: https://www.hannonhill.com/cascadecms/latest/content-management/workflows/index.html
title: Workflows - Cascade CMS Knowledge Base
category: workflows
scraped: 2026-02-16
version: cascade-cms-latest
---

# Workflows

A workflow is a series of steps that content must go through before it can be created, edited, copied, moved, renamed, and/or deleted by users in Cascade CMS.

## Topics

-   [Workflow Triggers](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/index.html)
-   [Assigning Workflows](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/how-do-i-assign-a-workflow.html)
-   [Custom Workflow Emails](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/custom-workflow-emails.html)
-   [Receiving Workflow Notifications](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/receiving-workflow-notifications.html)
-   [Example Workflow Definitions](https://github.com/hannonhill/Cascade-CMS-Workflow)
-   [Workflow XML Schema Reference](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-xml-schema-reference.html)

## Overview[](#Overview)

A workflow is a series of steps that content must go through before it can be created, edited, copied, moved, renamed, and/or deleted by users in Cascade CMS. A **Workflow Definition** is a group of **steps** that are connected by **actions**. Steps may result in multiple actions leading to other steps. Actions may be enhanced by **triggers**, which execute functions within the system. Once a workflow reaches a step resulting in no further action, the workflow is complete. The asset being used in the workflow is no longer considered "in workflow" and is returned to a normal state.

[↑](#top)

## Creating a Workflow Definition[](#CreatingaWorkflowDefinition)

To create a new Workflow Definition:

1.  Navigate to **Manage Site** > **Workflow Definitions**.
2.  Navigate to the container in which the new Workflow Definition will be stored, or create a new container using **Add** > **Container**.
3.  Click **Add** > **Workflow Definition**.
4.  In the **Properties** tab, configure the following fields:
    -   **Name** - To make things easier when assigning workflow, we recommend including the workflow type in the name (Create/Edit, Delete, Move/Rename, etc.).
    -   **Parent Container** - The container where your Workflow Definition will be stored.
    -   **Workflow Type** - The type of action that should trigger the workflow (ex. an Edit workflow will be triggered when an asset is edited).
    -   **Default Workflow Name** - Determines the default name for any new workflow created using the Workflow Definition. The auto-name option will create a workflow name in the format "WorkflowDefinitionName: AssetName".
    -   **Groups** - Only groups listed here will have this Workflow Definition available to them. You can use this setting to provide different workflows to different groups.
    -   [**Custom Workflow Emails**](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/custom-workflow-emails.html) - Attach **Notification** and/or **Completion** workflow email templates here to override the default notifications sent when an [Email trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/email-trigger.html) is present.
5.  There are two interface options when creating a Workflow Definition:
    -   **XML** - An XML editor with optional file upload capability.
    -   **Workflow Builder** - This interface will allow you to visually construct a workflow by adding ordered and unordered steps, actions, and triggers. The builder starts with a stock, five-step approval workflow which can be customized as needed.
6.  Click **Submit** to save your Workflow Definition.

**Tip** - Not sure where to start? We provide several[Example Workflow Definitions](https://github.com/hannonhill/Cascade-CMS-Workflow)that you can copy and customize as needed.

**Tip** - Changes you make in the **Workflow Builder** tab will be reflected in the **XML** tab and vice versa. Try starting by pasting some [example XML](https://github.com/hannonhill/Cascade-CMS-Workflow) in the **XML** tab and then switch over to the **Workflow Builder** tab to customize it.

[↑](#top)

## Previewing a Workflow Definition[](#PreviewingaWorkflowDefinition)

![Workflow Definition Preview](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/images/wf-view.png)

The Workflow Definition preview is a flow diagram of your workflow steps along with their resulting actions and triggers. You can customize the preview with the following actions:

-   Filter what workflow details are visible in the preview with the **Detail** panel on the left:
    -   **Everything** - Displays steps along with their type, default assignments (if applicable), actions, and triggers.
    -   **Actions + Triggers** - Displays steps along with their actions and triggers.
    -   **Actions** - Displays steps with their actions only.
-   Click and drag steps into position for better visibility.
-   Click on any of the connecting lines between actions and their resulting steps to highlight them.

Click the **Reset Layout** button to reset the preview to it's default layout.

[↑](#top)

## Workflow Steps[](#WorkflowSteps)

A step is an individual moment in a workflow where one or more actions are available. Certain steps have step owners — users or groups responsible for advancing the workflow to the next step by choosing an action.

All steps in a given workflow are categorized either as **Ordered Steps**, which are executed in the order in which they're listed, or **Unordered Steps**, which must be explicitly referenced by an action.

-   **Ordered Steps**
    -   By default, ordered steps are executed in the order they're defined, but they can move the workflow to the next or previous step.
    -   In the Workflow Definition XML, ordered steps are connected by actions containing the attribute `move` with a value of `forward` or `reverse`.
-   **Unordered Steps**
    -   Unordered steps are only encountered when selected.
    -   In the Workflow Definition XML, unordered steps are connected by actions containing the `next-id` attribute to specify which step the action leads to.

In addition, all steps fall into one of the following categories:

-   **System Step**
    -   System steps are executed by the system without any user intervention.
    -   System steps can have only a single action (whose type is `auto`), but can execute multiple triggers such as, Version, Merge, and Publish.
    -   The first and last steps in any workflow should be system steps.
    -   It's possible to have an automatic workflow composed entirely of system steps.
-   **Transition Step**
    -   Transition steps contain one or more actions representing user choices.
    -   Transition steps have a default user or group assignment that can be overridden by triggers to assign step ownership dynamically.
-   **Edit Step**
    -   The working copy of an asset in workflow can only be edited during an edit step.
    -   Edit steps are usually unordered steps, for example, sending a workflow back to the initiator for additional changes.
    -   Like system steps, edit steps contain only a single action which serves to determine the next step.

Each step is defined by a number of attributes:

-   **Step Identifier** - The unique identifier of the step in the workflow used to define transitions from one step to another using the `next-id` attribute of the action.
-   **Step Label** - The name of the step (visible to the user).
-   **Step Type** - May be `system`, `transition`, or `edit`.
-   **Escalate To** **/ Escalate After** - Allows you to specify a step that the workflow should automatically proceed to after a specified time frame.
-   **Default Assignment** - Allows you to specify the user or group this step should be assigned to. This assignment can be overridden by triggers to assign step ownership dynamically.
-   **Allow Reassignment** - Allows the step to be reassigned to a specified user, or users within a specified group or role.
-   **Action(s)** - Actions create pathways from the initial step to a final step; transition steps may contain multiple actions.

[↑](#top)

## Workflow Actions[](#WorkflowActions)

Workflow steps are linked by actions, creating pathways from an initial step to a final step. While system and edit steps will each only have one action, transition steps require user intervention and will typically have multiple actions to choose from such as approve, reject, or edit.

Each action is defined by a number of attributes:

-   **Action Identifier** – The unique identifier of the action within a step.
-   **Action Label** – The name of the action (visible to the user).
-   **Transition** – Identifies which step the action leads to.
-   [**Available Triggers**](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/index.html) – Triggers performs tasks when their associated action is selected.
    -   **Parameters** – Optional elements added to a trigger to further specify the system logic that should occur.

[↑](#top)

## Workflow Triggers[](#WorkflowTriggers)

Triggers perform specific tasks when their associated action is reached or selected in a transition step. Triggers can be asset-related, such as versioning or publishing the asset in workflow. Triggers can also perform non-asset-related tasks such as assigning the next step or sending an email notification.

Triggers can be customized with parameters, for example, to specify a Destination for a Publish trigger or an external email address for an Email trigger.

For more information on available triggers and their parameters, see [Workflow Triggers](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/index.html).

[↑](#top)

[↑](#top)

## Related Links

-   [CUC24 Workflows Workshop \[PDF\]](https://www.hannonhill.com/cascadecms/latest/_docs/cuc24-workflows-workshop.pdf)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }