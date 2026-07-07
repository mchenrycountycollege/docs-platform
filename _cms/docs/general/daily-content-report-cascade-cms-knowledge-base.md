---
source: https://www.hannonhill.com/cascadecms/latest/cascade-basics/daily-content-report.html
title: Daily Content Report - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Cascade Basics

# Overview[](#Overview)

The Daily Content Report is a daily email summary of your action items, content updates, and content health alerts across all of your sites in the following categories:

-   **Action Items**
    -   Your Tasks - Outstanding tasks assigned to you.
    -   Your Drafts - Unsubmitted drafts.
    -   Workflows Waiting on You - Workflows for which you or one of your groups is the current step owner.
    -   Comments on Assets You Own - Unresolved comments on assets for which you are the content owner.
    -   Your Assets That Need Review - Assets that are approaching their scheduled Review Date and for which you are the content owner.
-   **Content Updates**
    -   Recently Created Content
    -   Recently Updated Content
-   **Content Health**
    -   Most Broken Links - Page assets containing the most broken links. The scheduled Link Checker must be enabled in your System Preferences and in your Site(s) Settings to populate this category.
    -   Most Views - Page assets with the most page views. You must have a verified [Google Analytics Connector](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/how-to-set-up-a-google-analytics-connector.html) for your site(s) to populate this category.

The 10 most recent assets in each category will be displayed. Click on any of the items in your report to be taken to that asset or action item within Cascade CMS.

# Subscribing to the Daily Content Report[](#SubscribingtotheDailyContentReport)

To subscribe to the Daily Content Report:

1.  Click your **User icon**and then click **Settings**.
2.  Under **Daily Content Report**, check **Receive a daily content report** and click **Submit**.

If the report is enabled for your organization and you have an email address associated with your User in Cascade CMS, you'll receive your Daily Content Report at the next scheduled interval.

# Scheduling the Daily Content Report[](#SchedulingtheDailyContentReport)

To enable/schedule the Daily Content Report for your users:

1.  Click the system menu button ( ) > **Administration** > **Preferences** > **Reports**.
2.  Under **Daily Content Report**, enable **Send Daily Content Report to Subscribers**.
3.  Select a time to run the report and click **Submit**.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }