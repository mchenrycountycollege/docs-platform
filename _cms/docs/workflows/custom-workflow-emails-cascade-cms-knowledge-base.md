---
source: https://www.hannonhill.com/cascadecms/latest/content-management/workflows/custom-workflow-emails.html
title: Custom Workflow Emails - Cascade CMS Knowledge Base
category: workflows
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Workflows

# Overview[](#Overview)

Custom Workflow Emails allow you to personalize your workflow notification and completion emails. A WYSIWYG editor plus dropdowns to insert placeholders for workflow details makes it simple to build templates for informative and actionable emails.

When creating a new template, you'll be started off with a basic example to give you an idea of what's possible. From there you can make it your own. Include instructions on what to look for when reviewing content, add a link to the live page for comparison, or add your organization's contact information.

# Creating Workflow Email Templates[](#CreatingWorkflowEmailTemplates)

To create a Custom Workflow Email:

1.  Navigate to **Manage Site** > **Custom Workflow Emails**.
2.  Navigate to the container in which the new Custom Workflow Email will be stored, or create a new container using **Add** > **Container**.
3.  Click **Add** > **Custom Workflow Email**.
4.  Configure the following fields:
    -   **Name** - To make things easier when assigning templates to Workflow Definitions, we recommend including the email type in the name (i.e. "Notification" or "Completion").
    -   **Parent Container** - The container where your Custom Workflow Email will be stored.
    -   **Email Subject** - The subject line of your email.
    -   **Email Content** - The body of your email. See [Workflow Detail Placeholders](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/custom-workflow-emails.html#WorkflowDetailPlaceholders) below for a list of placeholders you can use to populate your email with workflow details.
5.  Click **Submit** to save your Custom Workflow Email.

**Note** - The **Insert/edit image** menu supports only **External** links for Custom Workflow Emails. You can use images managed in Cascade CMS, but you must use the fully-qualified, absolute URL to the published image.

# Workflow Detail Placeholders[](#WorkflowDetailPlaceholders)

The following placeholders are available to populate your emails with workflow details:

Available Workflow Detail Placeholders
| Name | Placeholder | Preview |
| --- | --- | --- |
| Asset Linked to its Cascade CMS Location | `{{ASSET_NAME}}` | [Contact Us](#example) |
| Asset Linked to its Live, Published Location | `{{ASSET_NAME_LIVE}}` | [Biology Faculty Directory](#example) |
| Current Date the Email is Sent | `{{CURRENT_DATE}}` | May 22, 2022 |
| Current Step's Name in the Workflow | `{{WORKFLOW_CURRENT_STEP_NAME}}` | [Editing by Approvers](#example) |
| Due Date | `{{WORKFLOW_DUE_DATE}}` | June 10, 2022 |
| Email Recipient | `{{WORKFLOW_EMAIL_RECIPIENT}}` | [Tessa Smith](#example) |
| History of Steps Passed in the Workflow and Any Comments Along the Way | `{{WORKFLOW_HISTORY}}` | 
## History

**May 16, 2019**  
[Chris Lee](#example) started workflow  
"Please review these changes."

 |
| Latest Comments on the Workflow | `{{WORKFLOW_LATEST_COMMENTS}}` | 

### Latest Comments

**Comments from [Amanda Sims](#example)**  
"Please review these changes."

 |
| Link to the Asset | `{{LINK_TO_ASSET}}` | `https://your.cascadecms.com/entity/open.act?id=d319a0886f000001453872c09d5ecb&type=page` |
| Link to the Workflow | `{{LINK_TO_WORKFLOW}}` | `https://your.cascadecms.com/entity/open.act?id=c228a0897f000001414ea872f06d5efd&type=workflow` |
| Live Link to the Asset | `{{LIVE_LINK_TO_ASSET}}` | `https://www.example.edu/link/to/asset` |
| Owner of the Workflow | `{{WORKFLOW_OWNER}}` | [Britt Wilson](#example) |
| Site Link of the Asset in Workflow | `{{WORKFLOW_SITE_LINK}}` | `https://your.cascadecms.com/entity/open.act?id=c228a0897f000001414ea872f06d5efd&type=folder` |
| Site the Asset in Workflow Belongs to | `{{WORKFLOW_SITE_NAME}}` | [Business Site](#example) |
| Start Date | `{{WORKFLOW_START_DATE}}` | Dec 14, 2022 |
| Step Actions (if any) | `{{WORKFLOW_STEP_ACTIONS}}` | 

### Available Actions

-   [Approve](#example)
-   [Edit](#example)

 |
| Step Owner of the Current Workflow Step | `{{WORKFLOW_STEP_OWNER}}` | [Britt Wilson](#example) |
| User Options | `{{WORKFLOW_USER_OPTIONS}}` | 

### User Options

-   [View your dashboard](#example)
-   View the asset: [Meet the team](#example)
-   View the workflow screen: [Approve and Publish](#example)

 |
| Version Comments | `{{VERSION_COMMENTS}}` | 

### Version Comments

Comments from [Amanda Sims](#example)  
"Updated title and tags."

 |
| Workflow with its Link | `{{WORKFLOW_NAME}}` | [News Article Approval: Registration Begins on August 21](#example) |

This table lists all available placeholders, but multiline placeholders are available in the email message body only.

**Note** - When used in an email subject, any placeholders that include a link (ex. `{{WORKFLOW_NAME}}`) will strip out the link and display only the name or label.

**Note** - Placeholders that include user information will display the user's full name if found (ex. John Smith), otherwise the user's username will be displayed (ex. john.smith).

# Email Styling Best Practices[](#EmailStylingBestPractices)

-   Keep it simple. Using complicated HTML elements that rely on positioning or floats can be hit or miss when displayed across different email clients.
-   If you need to position elements, use a `table` instead of a `div`. Avoid empty `td` elements and use `cellpadding` for spacing. You can add a `role="presentation"` attribute to your `table` to avoid screen readers treating it like tabular data.
-   While extremely popular in web design, SVG images have limited support among email clients. Use PNG, JPG, or GIF as an alternative.
-   Use fully-qualified, absolute links for images and be sure to include `alt` text attributes in case images are blocked by an email client.
-   Images can be made responsive by adding the `responsive` class to the `img` tag.
-   Use inline styles (optionally, with `!important`) to add or override styling for your content.
-   Try to keep your total email size under 100kb to avoid getting caught in spam filters and having email clients such as Gmail clipping your content.

# Using Custom Workflow Emails[](#UsingCustomWorkflowEmails)

Use your Custom Workflow Emails by attaching them to one or more [Workflow Definitions](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/index.html) in the **Properties** tab under **Custom Workflow Emails**.

When attaching Custom Workflow Emails to a Workflow Definition, you can specify two types of emails: **notification** and **completion**.

-   **Notification** emails are sent when an Email trigger's mode is `notify` (or not specified) and should be used when a workflow requires the recipient to take action to move a workflow forward.
-   **Completion** emails are sent when an Email trigger's mode is `completed` and should be used when a workflow is finished to provide the workflow owner information about the results of the workflow via the comments.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }