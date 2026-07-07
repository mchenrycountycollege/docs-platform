---
parent: Changelog
section: [v8.17](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.17/index.html)
part: 77 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.17](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.17/index.html)

## [v8.17](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.17/index.html)

### Features/Improvements

-   We've improved load times when editing Pages and Data Definition Blocks featuring many dropdowns, WYSIWYG fields, and Smart Fields.
-   The date/time picker used throughout the interface has been updated for improved accessibility and a better user experience.
-   You can now star assets to easily navigate to them. Starred assets are available in the My Content area and Dashboard widget and in appropriate asset choosers.
-   We've updated the asset context menu to include additional information for various types of assets such as files and blocks, a live link to view publishable assets on a remote server and additional  actions are now tucked under a "More" section to mimic the actions shown when viewing an asset and to also reduce the initial height of the context menu.
-   Date and time fields throughout the application are now more lenient allowing users to manually enter different types of date/time formats.
-   To help prevent leaving empty directories on the web server, when unpublishing assets Cascade CMS will now check if the assets' parent folder on the web server is empty and if so will attempt to delete it (with the exception of the site's base folder).
-   We've introduced new link rewriting options that can be configured under [Site Settings](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/index.html#SiteSettings). Choose whether internal links within the same site are written as absolute, relative, or site relative links by default. These settings can be overridden at the asset level which replaces the "Maintain site-relative links in content" option.
-   Removed support for previously deprecated Oracle 11, SQL Server 2012 and MySQL 5.5.

### Fixed

-   Performing a move, delete, or publish operation with Web Services using an API Key will no longer throw a "User cannot be null when checking abilities" error.
-   Clicking chooser buttons quickly or while another chooser panel is being closed will no longer yield unexpected results in the interface.
-   Creating announcements with a Start or Stop date later the same day will no longer display an "invalid date" error.
-   Sorting a column in the Audits table no longer sorts the preceding column instead.
-   Fixed an issue where orphaned working copies of an asset could be created if a review date Workflow Definition is invalid.
-   Error indicators for fields will be shown when attempting to submit a Page or Block with errors involving repeatable fields.
-   Fixed an issue with Google Analytics Connector verification.
-   Changing a page's content type will now show its updated output and regions
-   Removed false warnings about changing the `multiple` setting of a field group in a Data Definition when that setting had not been changed.
-   Repositioning an internal image by dragging it in a WYSIWYG editor will no longer result in a broken internal link.
-   Addressed an issue where move/rename workflows containing a Merge trigger displayed an assertion error when attempting to start.
-   Switching the Data Definition of a Page or Block will now respect the collapsed by default settings of groups in the new Data Definition.
-   Un-checking the "Apply format to specific CSS3 selector(s) only" checkbox for a WYSIWYG Editor Configuration will now persist.
-   Updating radio buttons and checkboxes in structured data content will now trigger a Draft auto-save.
-   Image dimensions are now available in the Index Block XML when images are chosen in a File chooser field on a page.
-   Re-editing Drafts or Working copies of certain file types will no longer result in corrupted file assets on submit.
-   Clicking on *Show all field types* when choosing a Shared Field within the Data Definition builder will no longer result in the screen being in an unusable state.
-   Fixed inconsistencies where the site selector within the chooser panel would display the incorrect site. Also addressed a related issue where the wrong site would be used when searching the browse and upload tabs within the chooser panel.
-   Addressed an issue with cache synchronization in load-balanced environments.
-   Addressed a minor syntax error with lock queries in Oracle that resulted in warnings in the database alert logging.
-   Corrected an error when copying or restoring a version of an image file in SQL Server.
-   Fixed various issues in datatables where interface would say no data available before data had loaded. Included Relationships "There are no relationships" and Tags "No tags found" among others.
