---
source: https://www.hannonhill.com/cascadecms/latest/content-management/content-review.html
title: Content Review - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Content Management

# Overview[](#Overview)

The [Review Date](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/metadata-sets/metadata-fields-in-cascade.html) metadata field helps you to keep your content up to date by allowing you to schedule reviews for assets. For assets with a Review Date specified:

-   The asset's Content Owner will receive upcoming review date notifications via email 7 days leading up to the Review Date.
-   If the assets are workflow-enabled, an edit workflow will be started on the Review Date. See [Review with Workflow](https://www.hannonhill.com/cascadecms/latest/content-management/content-review.html#ReviewwithWorkflow).

Assets with upcoming review dates will be listed in the [Content Reviews](https://www.hannonhill.com/cascadecms/latest/content-management/reports/content-up-for-review-report.html) report and content ownership can be reviewed and reassigned in the [Content Ownership](https://www.hannonhill.com/cascadecms/latest/content-management/reports/content-ownership-report.html) report.

# Scheduling a Review[](#SchedulingaReview)

## On an Asset

To schedule a review on an asset:

1.  While viewing an asset, click **More** > **Schedule Review**.
2.  To schedule a recurring review, enable **Review on a Schedule** and select an interval from the options provided:
    -   Every Month
    -   Every 3 Months
    -   Every 6 Months
    -   Every Year
3.  To schedule a single review in the future, disable **Review on a Schedule** and select a review date from the options provided:
    -   1 month from now
    -   3 months from now
    -   6 months from now
    -   1 year from now
    -   Calendar (Date Selection)
4.  Click **Schedule Review**. This will update the asset Review Date metadata field to the specified date. Modifying an item’s Review Date does not change the item’s Last Modified date.

### From the Content Reviews Report

You can also schedule reviews for assets in the [Content Reviews](https://www.hannonhill.com/cascadecms/latest/content-management/reports/content-up-for-review-report.html) report.

# Review with Workflow[](#ReviewwithWorkflow)

If your assets are contained in a workflow-enabled folder, at the scheduled Review Date, the following will happen:

1.  The system will initiate an edit-type workflow by choosing a [Workflow Definition](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/index.html) from those assigned directly to the asset's parent folder or from any inherited by the parent folder from higher-level folders.
2.  If no applicable Workflow Definition is available, no review workflow is initiated.
3.  If an applicable Workflow Definition is found, the system will assign a user to own it:
    -   If there was a previous edit, the user who last edited the asset becomes the owner of the workflow.
    -   If there was no previous edit, the user who created the asset becomes the owner of the workflow.
4.  Assuming a valid user is located, the workflow is started, otherwise no review workflow takes place.

**Note** - If more than one edit-type Workflow Definition is assigned to the folder or inherited from containing folders, the choice of workflow is arbitrary. If you plan on using Review Date workflows, we recommend having only a single edit-type Workflow Definition either assigned to or inherited by the parent folder.

# Marking Assets as Reviewed[](#MarkingAssetsasReviewed)

Once you've reviewed an asset, you can mark is as reviewed by clicking **More** > **Mark as Reviewed**.

If the asset is set to be reviewed on a recurring schedule, the Review Date will be updated to the next appropriate interval. If not, the Review Date will be cleared.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }