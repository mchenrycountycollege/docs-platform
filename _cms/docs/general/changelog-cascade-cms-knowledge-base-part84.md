---
parent: Changelog
section: [v8.13](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.13/index.html)
part: 84 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.13](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.13/index.html)

## [v8.13](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.13/index.html)

### Features/Improvements

-   An integration has been added to easily embed [Clive](https://www.hannonhill.com/products/clive/index.html) forms and smart content.
-   System dictionary words are now validated to ensure they only contain alpha-numeric and limited punctuation characters (`_./+#'&-`). Credit: Jayson Grace of [Sandia National Labs](https://www.sandia.gov/).
-   This release ships with the Tomcat 9.0.17 servlet container which contains improvements and security fixes to the previously shipped version of Tomcat.
-   A new [Assign to Content Owner of Asset](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/assign-to-content-owner-of-asset-trigger.html) Workflow Trigger has been added.
-   Participants of a [Task](https://www.hannonhill.com/cascadecms/latest/content-management/tasks.html) will now be notified when a task is (un)resolved.
-   Improved system performance when removing users manually or through LDAP sync.
-   Improved loading times when viewing audits throughout the application by adding a default date range of one week from the current date (or end date), instead of loading *all* audits.
-   Minor security-related improvements to audits and the Optimize Database tool.
-    Reduced memory usage during Accessibility Report generation.
-   You can now customize notification and completion emails sent during workflows using [Custom Workflow Emails](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/custom-workflow-emails.html).
-   Workflow emails no longer require an SMTP server and will come from `noreply@cascadecms.com`.
-   Improved queries that check if a user has access to a site resulting in faster interface load times for non-administrator users.

### Issues Fixed

-   The subject and body of broadcast messages are now properly escaped. Credit: Jayson Grace of [Sandia National Labs](https://www.sandia.gov/)
-   The `TextBlockAPIAdapter.getText` method will no longer return a wrapping `<system-xml>` element with the Block's text content.
-   Errors during search index rebuild will correctly release filesystem resources so as not to prevent future problems accessing and rebuilding the indices.
-   Accessing REST API from another domain via a browser will no longer cause CORS errors.
-   It is no longer possible to use an invalid date range when filtering audits within the application. For example, the start date can not be after the end date.
-   The [optimize database tool](https://www.hannonhill.com/cascadecms/latest/cascade-administration/database-tools/optimize-database.html) will no longer remove user profile pictures when the option to remove orphaned records is enabled.
-   Minimum field and group values within a Data Definition group will now be respected when adding additional groups.
-   Fixed an error in workflows that occurred when previewing some working copies when a Transition step is followed by an Edit step.
-   During a site import, structured data fields will now be mapped to Data Definitions if they exist outside  of the imported site.
-   Changing the assignee of a Task will now correctly send a notification to the new assignee instead of the user who changed the assignment.
-   Added missing cache element to cache configuration file that resulted in NullPointerException errors for load-balanced environments.
