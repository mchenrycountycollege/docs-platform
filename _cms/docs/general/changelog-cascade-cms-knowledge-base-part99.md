---
parent: Changelog
section: [v8.4](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.4/index.html)
part: 99 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.4](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.4/index.html)

## [v8.4](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.4/index.html)

### Features/Improvements

-   Auto-complete @mentions of usernames/full names in Asset/Task Comments.
-   Notify Users of concurrent edits
-   Do not allow submitting drafts to a locked asset (manually or through workflow). Also, users can send requests to lock owners to unlock assets.
-   Locked assets can be reassigned to other users
-   Allow reassigning of Working Copies held at particular steps of Workflow
-   Update look and feel of page header for consistency and flexibility
-   Support for SQL Server 2016 for on-premise installations. Note that currently supported versions are 2016, 2014, and 2012. SQL Server 2008 is no longer supported.
-   Upgrade detects and migrates some common problem assets associated with the Global area when upgrading from 7.x.
-   Use full SHA for build id
-   Intercom for Cascade Cloud customers
-   [WCAG accessibility checker when previewing pages for Cascade Cloud customers](https://www.hannonhill.com/cascadecms/latest/content-authoring/accessibility/page-accessibility-checker.html)

### Issues Fixed

-   Search functionality pegging CPU and possibly causing more widespread performance problems
-   Users table takes a long time to load for instances with a lot of audits
-   Write access error during assignment of Workflow edit step if Asset lock does not belong to user
-   User can not commit changes to their own locked assets if they are required to go through Workflow
-   Owned By column in Content Up for Review/Stale Content reports not being populated
-   User Comments: it is not possible to mention usernames with spaces
-   Content Ownership Report: Created column has same value as Last Modified column
-   After deleting Workflow, Lock/Working copy left on asset can't be removed
-   Errors encountered when attempting a search/replace are not displayed to the user
-   Catch all 403 errors from Google Analytics
-   Asset Details menu shows system metadata for the draft
-   Tinymce failed initialization in Firefox on consecutive modal open
-   Intermittent error when committing locked asset
-   Error: "This asset edit was not saved because another edit was submitted"
-   Chooser panel does not show details for site management area asset types
-   Modal backdrop doesn't get removed after closing second modal
-   EmailProvider workflow trigger sends duplicate emails when an error occurs during send
-   Viewing draft message is confusing when there is a working copy present
-   Start workflow screen throws null pointer when there are no ordered transition steps in workflow definition with default user or group assignments
-   Review workflows should create a working copy
-   Workflow builder: escalation hours incorrect after submission
-   Full Screen Preview when viewing a Page is not taking currently selected Output into account
-   Unable to restore assets from Recycle Bin when using custom 7.14.2 build when rolling back from 8.x upgrade
-   IE11: Inserting external links in WYSIWYG places content at the beginning of the content. Recommended to use Edge or a different browser
-   Dollar signs ($) in title/display name of assets selected in choosers prevent Edit modal from appearing
-   Disappearing checkboxes on publish dialog
-   Un-publish on move/rename does not work when starting workflow and then selecting "None"
-   Disabled outputs are still able to be toggled on publish
-   "Welcome" widget missing for users without a full name
-   Safari 10.1: Can't scroll vertically beyond viewport
-   Allow custom CSS classes within Editor Configruations to contain spaces
-   Adding new repeatable groups will no longer duplicate the previous group's values.
