---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/accessibility/page-accessibility-checker.html
title: Native On-Page Accessibility Checker - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Accessibility

# Overview[](#Overview)

The Native On-Page Accessibility Checker is an on-demand page-level tool for checking page content for WCAG 2.0, 2.1, 2.2 compliance (Level A, AA, and AAA). The checker leverages the [Axe® accessibility checker](https://www.deque.com/axe/) and supports the following accessibility standards:

-   WCAG 2.0, 2.1, 2.2 (A, AA, AAA),
-   [Revised Section 508 Rules (2017)](https://www.access-board.gov/ict/) and [Trusted Tester v5 (TTv5)](https://www.dhs.gov/trusted-tester)
-   [EN 301 549](https://www.deque.com/en-301-549-compliance/) (European Union standard)
-   [Best Practices](https://docs.deque.com/devtools-for-web/4/en/rulesets#experimental) and [Newer Experimental Rules](https://docs.deque.com/devtools-for-web/4/en/rulesets#best-practices)

A list of issues is provided with links to relevant areas on the page and details about the violation, remediation steps, and the specific WCAG guidelines in violation. It will also analyze the page in a headless browser allowing it to discover issues with color contrast and others that can only be found when loading the page with its CSS and Javascript in a browser.

This feature is available for Cascade Cloud clients only.

![Screenshot of page-level accessibility checker](https://www.hannonhill.com/cascadecms/latest/content-authoring/accessibility/images/native-accessibility-check.png)

# Checking Page Content[](#CheckingPageContent)

To check a page's content for accessibility issues:

1.  While viewing a page click **More** > **Check Page Accessibility**. 
2.  Optionally, use the **Filter by Standard** dropdown to filter by a particular accessibility standard. Available options are as follows:
    -   *All*
    -   *Old Section 508 rules*
    -   *WCAG 2.0 (A), WCAG 2.1 (A), WCAG 2.2 (A)*
    -   *WCAG 2.0 (AA), WCAG 2.1 (AA), WCAG 2.2 (AA)*
    -   *WCAG 2.0 (AAA), WCAG 2.1 (AAA), WCAG 2.2 (AAA)*
    -   *WCAG 2.1 (A), WCAG 2.2 (A)*
    -   *WCAG 2.1 (AA), WCAG 2.2 (AA)*
    -   *WCAG 2.2 (AA)*
    -   *Common accessibility best practices*

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }