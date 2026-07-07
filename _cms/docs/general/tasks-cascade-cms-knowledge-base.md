---
source: https://www.hannonhill.com/cascadecms/latest/content-management/tasks.html
title: Tasks - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Content Management

# Overview[](#Overview)

Tasks allow content managers and contributors to create and organize their to-do lists in Cascade CMS. Tasks can be associated with all Site Content area assets including pages, files, blocks, and formats.

You can access your task list by clicking your **User icon/name** > **Tasks**. In the tasks menu, you'll find the following tasks lists:

-   **Assigned to Me** - Tasks assigned to you.
-   **Created by Me** - Tasks you've created, including those you're not assigned to.
-   **Participating Only** - Tasks you're participating in, but didn't create and aren't assigned to.
-   **Completed** - Tasks you've completed.

To view all tasks associated with an asset, click **More** > **Tasks** while viewing the asset. In the asset tasks menu, you'll find the following lists:

-   **Tasks Assigned to Me** - Tasks associated with the asset and assigned to you.
-   **All Active Tasks** - All tasks associated with the asset regardless of assignee.

# Creating a Task[](#CreatingaTask)

You can create new tasks from several areas within Cascade CMS:

-   From the Tasks menu by clicking **New Task**.
-   From your My Upcoming Tasks dashboard widget by clicking **Add Task**.
-   From the My Content menu by clicking **Add Task**.
-   From the associated asset itself by clicking **More** > **Tasks** > **Add Task**.

1.  In the Create a Task menu, enter to following:  
    -   **Name** - The name of the task.
    -   **Description** - A short, text-only description or instructions for the task.
    -   **Assigned User** - You can delegate the task to another user or click "Choose Myself" to assign the task to yourself.
    -   **Priority** - Tasks can be labeled Low, Normal, or High priority for task list sorting purposes.
    -   **Due Date** - The date by which the task should be completed.
    -   **Related Asset** - The asset associated with the task.
2.  Click **Create**.

# Adding Task Participants[](#AddingTaskParticipants)

By default, task participants include the user who created the task and the user assigned to the task. You can add additional participants to the task:

-   By [@mentioning](https://www.hannonhill.com/cascadecms/latest/cascade-basics/comments.html) the user(s) in a task comment.
-   Manually, under Participants by clicking **Choose Users**.

New task participants will receive a notification that they've been included on the task.

**Note** - Users who are participating in a task can view it, comment on it, and resolve it. They cannot edit or delete it.

# Changing the Status of a Task[](#ChangingtheStatusofaTask)

Tasks can be resolved/reopened by any participant when it is considered completed or needs to be re-opened. To resolve/reopen a task, participants can do one of the following:

-   View the task and click **Resolve**/**Reopen**
-   Right-click on a link for the task and click **Resolve/Reopen** in the context menu
-   View the assigned tasks tab in [My Content](https://www.hannonhill.com/cascadecms/latest/cascade-basics/my-content.html), or the [Tasks screen](https://www.hannonhill.com/cascadecms/latest/content-management/tasks.html), and select the desired task row(s). Click the **Resolve/Reopen** button at the top of the table.

Task participants will receive a notification when the status of a task is changed.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }