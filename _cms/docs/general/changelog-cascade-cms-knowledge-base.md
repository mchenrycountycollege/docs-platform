---
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

# Changelog

## [v2025.2.2](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-2025.2.2/index.html)

### Features/Improvements

-   Additional performance improvements of publish queue screen loading and pagination.
-   Updated image editor for August release of JDeli
-   Improved reliability of link rewriting when using `system-asset` [pseudo tags](https://www.hannonhill.com/cascadecms/latest/content-authoring/linking.html#System-assetpseudo-tags).
-   Performance improvements when accessing scheduler on edits and draft saves prevents "lock wait timeouts" in logs and in interface
-   Improve performance when accessing entity relationships on SQL Server and Oracle databases
-   Improves performance when interacting with the background scheduler on Microsoft SQL Server and Oracle databases

### Fixed

-   Accessing asset permissions through Cascade API will no longer throw an error.
-   Errors encountered when a [Google Analytics Connector](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/how-to-set-up-a-google-analytics-connector.html) attempts to find a matching asset will no longer prevent the sync from completing.
-   Restoring a previous version of a [Content Type](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/content-types/index.html) will now properly persist the Editable Fields and Publish Options from the previous version.
-   You can now apply simple CSS Class Formats to `figure` elements in the WYSIWYG.
-   Fixes various Cross-Site Scripting (XSS) security issues in notifications and tasks

## 20250804

### Fixed

-   Accessing asset permissions through Cascade API will no longer throw an error.
-   Errors encountered when a [Google Analytics Connector](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/how-to-set-up-a-google-analytics-connector.html) attempts to find a matching asset will no longer prevent the sync from completing.
-   Restoring a previous version of a [Content Type](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/content-types/index.html) will now properly persist the Editable Fields and Publish Options from the previous version.

## [v2025.2.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-2025.2.1/index.html)

### Features/Improvements

-   Improved UX of Site create and edit by making the two forms consistent in structure.
-   Improved handling of invalid values for Dynamic Metadata and Structured Data fields.
-   This release contains an upgrade to Tomcat 9.0.107

### Fixed

-   Searching content with punctuation marks will now return correct results.
-   Addressed an issue in which errors during Folder creation would be momentarily visible.
-   Paginating the [Content Inventory report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/content-inventory-report.html) will no longer display an error for SQL Server customers.

## [v2025.2](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-2025.2/index.html)

### Features/Improvements

-   Added support for OpenJDK 21.0.5+11
-   This release contains an upgrade to Tomcat 9.0.98
-   The library used for [SFTP Transports](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html) has been upgraded for improved security and support for newer algorithms.
-   Improved efficiency of [Destination](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/destinations.html) pool used during publishing.
-   Searching the audits table will now match content within the information column.
-   A new [Velocity Json Tool](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#JsonTool) can be used for fetching remote JSON resources.
-   Improved performance of publish queue screen loading and pagination.
-   Improved performance of exporting Content Inventory Report to CSV.
-   It is now possible to rename [Groups](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/groups.html).
-   Improved UX when updating filtering for various reports by automatically closing the filter flyout when clicking the apply button.
-   Improved load times of Content Inventory Report.
-   Upgraded image editing library to the latest version, 2025.06.
-   Increased the maximum number of [search results](https://www.hannonhill.com/cascadecms/latest/cascade-basics/search/full-search-and-replace.html) returned from 250 to 5,000. This also includes searching via Web Services.
-   A new [Content Inventory Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/content-inventory-report.html) allows reporting on assets in the system based on filters such as by site, asset type, publish dates, review dates, ownership, and other criteria

### Fixed

-   Addressed a situation in which editing an asset followed by using a chooser and datetime field prevented from being able to focus within WYSIWYG components.
-   The Edit with Preview frame will no longer become blank after it reloads from content changes.
-   The Add Content menu will now work on the publish queue and scheduled publish jobs screens.
-   [Unused Assets Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/suggested-unused-assets-report.html) now correctly filters by the selected asset type(s).
-   Unzip file report will now indicate if an error was encountered while attempting to unzip vs individual results errors.
-   Addressed an issue in which deleted groups could not be fully removed from the [Destination](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/destinations.html) and [Workflow Definition](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/index.html) *Applicable Groups* setting.

## 20250604

### Features/Improvements

-   It is now possible to rename [Groups](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/groups.html).
-   Improved UX when updating filtering for various reports by automatically closing the filter flyout when clicking the apply button.
-   Improved load times of Content Inventory Report.

## 20250528

### Features/Improvements

-   Upgraded image editing library to the latest version, 2025.01.
-   Improved performance of publish queue screen loading and pagination.
-   Upgraded image editing library to the latest version, 2025.04.
-   Upgraded image editing library to the latest version, 2025.05.
-   Improved performance of exporting Content Inventory Report to CSV.

### Fixed

-   The Edit with Preview frame will no longer become blank after it reloads from content changes.
-   The Add Content menu will now work on the publish queue and scheduled publish jobs screens.
-   [Unused Assets Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/suggested-unused-assets-report.html) now correctly filters by the selected asset type(s).
-   Unzip file report will now indicate if an error was encountered while attempting to unzip vs individual results errors.

## 20250115

### Features/Improvements

-   Upgraded image editing library to the latest version, 2024.11.
-   The library used for [SFTP Transports](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html) has been upgraded for improved security and support for newer algorithms.
-   Improved efficiency of [Destination](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/destinations.html) pool used during publishing.
-   Searching the audits table will now match content within the information column.
-   A new [Velocity Json Tool](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#JsonTool) can be used for fetching remote JSON resources.

## 20241230

### Features/Improvements

-   Added new [Velocity Tool Query API directives](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#queryfilter) that can be used to process larger datasets in addition to applying custom sorting and filtering.
-   Added support for OpenJDK 21.0.5+11
-   This release contains an upgrade to Tomcat 9.0.98

### Fixed

-   Addressed a situation in which editing an asset followed by using a chooser and datetime field prevented from being able to focus within WYSIWYG components.

## [v8.26.0](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.26.0/index.html)

### Features/Improvements

-   Added [Content Tips](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-tips.html) which offer real-time SEO guidance as you edit assets with [visible metadata fields](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/metadata-sets/metadata-fields-in-cascade.html).
-   It is now possible to export the [Users](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/users.html) table within the System Administration area to a CSV file.
-   It is now possible to view the users assigned to a particular Site by clicking on the number of users in the [Sites Listing](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/index.html) screen.
-   Added new [Velocity Tool](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html) methods to the Property Tool and Number Tool. Also added new convenience methods when working with the Structured Data Nodes using [Cascade API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/internal-cascade-api/internal-cascade-api-changelog.html).
-   Improved efficiency of [SFTP Transports](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html) when reading remote directories and files.
-   Added `$_.NumerTool.sortable` Velocity Tool method to be used for string-based sorting, such as with the new `#querysortvalue` [Query API directive](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#querysortvalue).
-   This release contains an upgrade to Tomcat 9.0.97
-   Performance and reliability updates to remote link checking and Feed Block fetching
-   The [Broken Link Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/broken-links-report.html) now considers external links beginning with the System URL as allowed to prevent from checking internal application URLs.

### Fixed

-   Addressed an issue in which searching content within HTML/XML markup would not return the correct results.
-   Fixed issue where [individual asset scheduled (un)publish](https://www.hannonhill.com/cascadecms/latest/faqs/general/scheduled-publishing-for-individual-assets.html) dates would persist after the scheduled date.
-   Structured data fields hidden by smart field rules will no longer undergo content checks on submit.
-   The Spectate Connector is now deprecated and it will be removed in the next release.
-   Addressed an issue in which URL parts (i.e. parameters and anchor) would be removed while rewriting root relative links added to WYSIWYG fields.
-   Addressed an issue in which initial group preview states while editing structured data may not reflect current smart field rules.
-   Root relative links inserted into WYSIWYG fields will be considered external.
-   Addressed a race condition in which sending WebSocket messages prevented the publish queue from processing jobs and resulted in general performance degradation
-   Addressed an issue in which Page Metadata would be empty when accessed within Asset Factory Plugins.
-   It is no longer possible to enter a name with invalid characters when importing a Site. Additionally, updated various places in the application to better handle existing Sites that have invalid characters in their name.
-   Addressed an issue in which Text Blocks created via Site copy would not render properly.
-   [Keyboard shortcuts](https://www.hannonhill.com/cascadecms/latest/content-authoring/accessibility/keyboard-shortcuts.html) are now disabled when a modal or flyout panel is open to prevent accidental execution.

## 20241211

### Features/Improvements

-   This release contains an upgrade to Tomcat 9.0.97
-   Performance and reliability updates to remote link checking and Feed Block fetching

### Fixed

-   Addressed an issue in which Text Blocks created via Site copy would not render properly.
-   [Keyboard shortcuts](https://www.hannonhill.com/cascadecms/latest/content-authoring/accessibility/keyboard-shortcuts.html) are now disabled when a modal or flyout panel is open to prevent accidental execution.

## 20241204

### Features/Improvements

-   Added `$_.NumerTool.sortable` Velocity Tool method to be used for string-based sorting, such as with the new `#querysortvalue` [Query API directive](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#querysortvalue).

### Fixed

-   It is no longer possible to enter a name with invalid characters when importing a Site. Additionally, updated various places in the application to better handle existing Sites that have invalid characters in their name.

## 20241202

### Features/Improvements

-   Added [Content Tips](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-tips.html) which offer real-time SEO guidance as you edit assets with [visible metadata fields](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/metadata-sets/metadata-fields-in-cascade.html).
-   It is now possible to export the [Users](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/users.html) table within the System Administration area to a CSV file.
-   It is now possible to view the users assigned to a particular Site by clicking on the number of users in the [Sites Listing](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/index.html) screen.
-   Added new [Velocity Tool](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html) methods to the Property Tool and Number Tool. Also added new convenience methods when working with the Structured Data Nodes using [Cascade API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/internal-cascade-api/internal-cascade-api-changelog.html).
-   Improved efficiency of [SFTP Transports](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html) when reading remote directories and files.

### Fixed

-   Addressed an issue in which searching content within HTML/XML markup would not return the correct results.
-   Fixed issue where [individual asset scheduled (un)publish](https://www.hannonhill.com/cascadecms/latest/faqs/general/scheduled-publishing-for-individual-assets.html) dates would persist after the scheduled date.
-   Structured data fields hidden by smart field rules will no longer undergo content checks on submit.
-   The Spectate Connector is now deprecated and it will be removed in the next release.
-   Addressed an issue in which URL parts (i.e. parameters and anchor) would be removed while rewriting root relative links added to WYSIWYG fields.
-   Addressed an issue in which initial group preview states while editing structured data may not reflect current smart field rules.
-   Root relative links inserted into WYSIWYG fields will be considered external.
-   Addressed a race condition in which sending WebSocket messages prevented the publish queue from processing jobs and resulted in general performance degradation
-   Addressed an issue in which Page Metadata would be empty when accessed within Asset Factory Plugins.

## [v8.25.0](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.25.0/index.html)

### Features/Improvements

-   Simplified ability/permission checking for editing Sites through the interface, the user must have WRITE permission on the Site object itself. This is consistent with permission checking when editing Sites through Web Services.
-   Simplified ability/permission checking for exporting Sites through the interface, the user must have READ permission on the Site object itself.
-   Uploading images and other files through the asset chooser will no longer pre-fill the File's Display Name with its System Name. This will force users who upload images through the chooser to set Image Description or "alt" text.
-   Improved link checking efficiency during content checks, publishing and Broken Link Report generation. Also, updated XML Feed Blocks to use the same HTTP client library as link checking.
-   Upgraded image editing library to the latest version, 2024.04.
-   Improved stability of scheduling library, Quartz, for MySQL and Oracle.
-   Allowed for links to WYSIWYG Editor Configurations and Shared Fields to have leading slashes.
-   Upgraded various front-end libraries, including thosed used for the advanced code editor, date formatting and code formatting (via the advanced code editor).
-   The [external link check timeout](https://www.hannonhill.com/cascadecms/latest/cascade-administration/external-link-checking.html#Preferences) now has a maximum limit of 10 seconds and the [feed block request timeout system preference](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html#Content) or 20 seconds.
-   It is now possible to unpublish from Destinations using a [Database Transport](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html#DatabasePublishing) during asset move, rename and delete.
-   Publish Set files, pages and folders will now be sorted alphabetically while viewing and editing. Reading a Publish Set using Web Services will also sort the assets consistently.
-   Improved UX of [Workflows Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/workflows-report.html) filtering by updating visibility of filter options based on the selected status filter.
-   Added support for SQL Server 2022. Support for SQL Server 2016 is deprecated and will be removed in the next on-premise release on or after 1/1/2025.
-   Upgraded image editing library to the latest version, 2024.08.
-   The library used for [SFTP Transports](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html) has been upgraded for improved security and support for newer algorithms.

### Fixed

-   The [UnpublishAndDelete workflow trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/unpublish-and-delete-trigger.html) will now respect the authorizing type/user trigger parameters for non-publuishable assets, such as blocks. Additionally, the [Delete workflow trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/delete-trigger.html) will now allow for using the authorizing type/user trigger parameters.
-   Fixed an issue where certain Drafts would display an error *Missing message for key "prompt.asset.linkrewriting."*
-   Creating/editing an [Asset Factory](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/index.html) using Web Services will now allow for omitting a `folderPlacementPosition` (or using an explicit `null` value), allowing for placement the new asset in the parent folder's last position.
-   Improved handling of invalid XML while checking for broken links.
-   Moving/renaming a Folder or Container within Manage Site area will now update search indexes for descendants to prevent stale search information such as paths.
-   Link checking external URLs with special characters will no longer result in false positive broken links.
-   XML Block content will now undergo content checks.
-   The Siteimprove integration will now respect extensionless linking.
-   Addressed an issue in which spell checking would not properly handle empty content.
-   Fixed summary generation in Publish modals.
-   Prevented non-editable image files from causing errors on profile picture upload.
-   Asset information passed to [Publish Triggers](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/publish-triggers.html) when unpublishing via move, rename and delete will now contain the correct asset identifier and type.
-   Unpublishing when deleting an asset will now unpublish from Destinations that use a [Database Transport](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html#DatabasePublishing).
-   Audits created from unpublishing as part of move, rename and delete operations will now reference the correct asset.
-   Deleting a Site will now show a relationship error if a Publish Set is being referenced from another Site.

[Show more versions...](#changelog-more-collapse)

## 20240911

### Features/Improvements

-   The library used for [SFTP Transports](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html) has been upgraded for improved security and support for newer algorithms.

## 20240904

### Features/Improvements

-   The [external link check timeout](https://www.hannonhill.com/cascadecms/latest/cascade-administration/external-link-checking.html#Preferences) now has a maximum limit of 10 seconds and the [feed block request timeout system preference](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html#Content) or 20 seconds.
-   It is now possible to unpublish from Destinations using a [Database Transport](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html#DatabasePublishing) during asset move, rename and delete.
-   Publish Set files, pages and folders will now be sorted alphabetically while viewing and editing. Reading a Publish Set using Web Services will also sort the assets consistently.
-   Improved UX of [Workflows Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/workflows-report.html) filtering by updating visibility of filter options based on the selected status filter.
-   Added support for SQL Server 2022. Support for SQL Server 2016 is deprecated and will be removed in the next on-premise release on or after 1/1/2025.
-   Upgraded image editing library to the latest version, 2024.08.

### Fixed

-   Asset information passed to [Publish Triggers](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/publish-triggers.html) when unpublishing via move, rename and delete will now contain the correct asset identifier and type.
-   Unpublishing when deleting an asset will now unpublish from Destinations that use a [Database Transport](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html#DatabasePublishing).
-   Audits created from unpublishing as part of move, rename and delete operations will now reference the correct asset.
-   Deleting a Site will now show a relationship error if a Publish Set is being referenced from another Site.

## 20240703

### Features/Improvements

-   Upgraded various front-end libraries, including thosed used for the advanced code editor, date formatting and code formatting (via the advanced code editor).

## 20240515

### Features/Improvements

-   Allowed for links to WYSIWYG Editor Configurations and Shared Fields to have leading slashes.

### Fixed

-   Fixed summary generation in Publish modals.
-   Prevented non-editable image files from causing errors on profile picture upload.

## 20240508

### Features/Improvements

-   Upgraded image editing library to the latest version, 2024.04.
-   Improved stability of scheduling library, Quartz, for MySQL and Oracle.

### Fixed

-   Addressed an issue in which spell checking would not properly handle empty content.

## 20240422

### Features/Improvements

-   Simplified ability/permission checking for editing Sites through the interface, the user must have WRITE permission on the Site object itself. This is consistent with permission checking when editing Sites through Web Services.
-   Simplified ability/permission checking for exporting Sites through the interface, the user must have READ permission on the Site object itself.
-   Uploading images and other files through the asset chooser will no longer pre-fill the File's Display Name with its System Name. This will force users who upload images through the chooser to set Image Description or "alt" text.
-   Improved link checking efficiency during content checks, publishing and Broken Link Report generation. Also, updated XML Feed Blocks to use the same HTTP client library as link checking.

### Fixed

-   The [UnpublishAndDelete workflow trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/unpublish-and-delete-trigger.html) will now respect the authorizing type/user trigger parameters for non-publuishable assets, such as blocks. Additionally, the [Delete workflow trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/delete-trigger.html) will now allow for using the authorizing type/user trigger parameters.
-   Fixed an issue where certain Drafts would display an error *Missing message for key "prompt.asset.linkrewriting."*
-   Creating/editing an [Asset Factory](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/index.html) using Web Services will now allow for omitting a `folderPlacementPosition` (or using an explicit `null` value), allowing for placement the new asset in the parent folder's last position.
-   Improved handling of invalid XML while checking for broken links.
-   Moving/renaming a Folder or Container within Manage Site area will now update search indexes for descendants to prevent stale search information such as paths.
-   Link checking external URLs with special characters will no longer result in false positive broken links.
-   XML Block content will now undergo content checks.
-   The Siteimprove integration will now respect extensionless linking.

## [v8.24.3](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.24.3/index.html)

### Features/Improvements

-   Upgraded image editing library to the latest version.
-   This release contains an upgrade to Tomcat 9.0.86

### Fixed

-   Addressed an issue to improve stability of the Siteimprove integration pre-publish feature.
-   Addressed an issue in which paginating outputs/destinations table when (un)publishing would not include all selected outputs/destinations.
-   Deleting a workflow through Web Services will correctly verify the authenticating user's Delete workflows Site Role ability.
-   Updating an SFTP Transport will no longer inadvertently remove the existing private key.
-   My Sites dashboard widget will correctly show "more sites" indicator if user has access to more sites than what is listed.
-   Siteimprove integration will no longer cause an error for Oracle customers when previewing a draft of a new page that does not have a name entered.
-   Addressed an issue where Oracle customers would see an error when previewing a new page which does not a system name entered and uses an Index Block that includes calling page information.

## 20240313

### Features/Improvements

-   This release contains an upgrade to Tomcat 9.0.86

### Fixed

-   Addressed an issue in which paginating outputs/destinations table when (un)publishing would not include all selected outputs/destinations.
-   Deleting a workflow through Web Services will correctly verify the authenticating user's Delete workflows Site Role ability.
-   Updating an SFTP Transport will no longer inadvertently remove the existing private key.

## 20240228

### Features/Improvements

-   Upgraded image editing library to the latest version.

### Fixed

-   Addressed an issue to improve stability of the Siteimprove integration pre-publish feature.

## [v8.24.2](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.24.2/index.html)

### Fixed

-   Changing the Template for a Configuration Set's Output will correctly persist region assignments of the same region name, including the "no block/format" option.

## [v8.24.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.24.1/index.html)

### Fixed

-   Editing a Workflow Definition via Web Services and toggling the move operation type will now use the correct value.
-   Addressed an issue in which Daily Content Report email notifications were not being sent.

## 20240112

### Fixed

-   Editing a Workflow Definition via Web Services and toggling the move operation type will now use the correct value.
-   Addressed an issue in which Daily Content Report email notifications were not being sent.

## [v8.24](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.24/index.html)

### Features/Improvements

-   Improved memory usage when uploading large files. Also updated file size validation to ensure it occurs at the time the file is uploaded.
-   A new [Suggested Unused Assets Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/suggested-unused-assets-report.html) helps site managers identify assets that are not being referenced within the system.
-   Various tables across the application will now have docked controls as the user scrolls down.
-   It is now possible to edit images with the WebP file format. Note: the `.webp` image file extension may need to be added to the **Editable Image Extensions** [System Preferences](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html) under the *Content* tab in order to take advantage of this feature.
-   Updated internal libraries and Software Bill of Materials (SBOM) for improved security posture
-   A close button was added to the page regions pane for improved UX.
-   Updated content checks interface for improved UX
-   Updated the link checker's user agent to help prevent false positives when remote servers block certain types of user agents.
-   Improved performance of using the Velocity Locator Tool to locate assets by their path.
-   [Allowed URLs](https://www.hannonhill.com/cascadecms/latest/cascade-administration/external-link-checking.html#AllowedURLs) can be used to skip checking certain links/domains within the Broken Link Report, Publish Reports, and on-submit content check for broken links.
-   Improved performance of loading audits through the application interface and Web Services. Note: a maximum of 10,001 results will be returned from a Web Services `readAudits` operation request.
-   Viewing a user and group will now list users, groups and roles alphabetically.
-   It is now possible to define [Valid Response Codes](https://www.hannonhill.com/cascadecms/latest/cascade-administration/external-link-checking.html#ValidResponseCodes) for external link checking during publishing, on-submit content checks and Broken Link Report generation.
-   Reduced likelihood of system instability by improving the Index Block rendering process and also imposing a 50MB hard max on the Maximum Rendered Size of an Index Block [system preference](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html).
-   Users will now be presented with a warning when attempting to remove or change a File asset's extension, which can result in issues viewing the File within the CMS as well as the live website. This applies to File creation and rename as well as upload through the File chooser.
-   Siteimprove integration now has Prepublish capabilities, allowing performing checks on page content rendered inside of Cascade CMS.
-   Added support for OpenJDK 11.0.21+9
-   Broken Link Report now contains a summary describing exactly what sort of links it contains based on current filters. Additional tooltips are available with explanation of data points.
-   The application's scheduling library, Quartz, has been upgraded for improved stability, performance and security.
-   Improved accessibility of asset *More* menu links.

### Fixed

-   Improved reliability of Daily Content Report generation. Additionally, the most viewed pages section will now only include data from verified Google Analytics Connectors.
-   Addressed an issue in which Google Analytics summaries no longer displayed trend information (i.e. +/- changes).
-   The Google Analytics dashboard widget will now load properly if data from the previous time period is not present. Additionally, data within the report will now be displayed in a friendlier format.
-   Addressed an issue in which 'okina diacratical marks caused spell checking to cause an error.
-   Live links to page within the *More* dropdown, [context menu](https://www.hannonhill.com/cascadecms/latest/cascade-basics/using-the-context-menu.html) and within [Workflow Email notifications](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/custom-workflow-emails.html) will now respect the Site's *Extensions to Strip* property and remove the extension where applicable.
-   Restoring previous versions of Publish Sets and Destinations will (un)schedule publishing based on that version's scheduled publishing settings.
-   Broken Link data points are more consistent across the dashboard widget and the report.
-   Users with only the *Publish Writable Home Area Assets* [Site Role ability](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/role-abilities-in-cascade.html) will now see the Unpublish action under an asset's More menu.
-   The system will no longer attempt to send email notifications to disabled users.
-   Scheduled LDAP syncing will no longer continue after disabling LDAP.

## 20231211

### Features/Improvements

-   The application's scheduling library, Quartz, has been upgraded for improved stability, performance and security.

### Fixed

-   Users with only the *Publish Writable Home Area Assets* [Site Role ability](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/role-abilities-in-cascade.html) will now see the Unpublish action under an asset's More menu.
-   The system will no longer attempt to send email notifications to disabled users.

## 20231204

### Features/Improvements

-   Broken Link Report now contains a summary describing exactly what sort of links it contains based on current filters. Additional tooltips are available with explanation of data points.

### Fixed

-   Broken Link data points are more consistent across the dashboard widget and the report.

## 20231120

### Features/Improvements

-   Added support for OpenJDK 11.0.21+9

## 20231106

### Features/Improvements

-   Siteimprove integration now has Prepublish capabilities, allowing performing checks on page content rendered inside of Cascade CMS.

### Fixed

-   Live links to page within the *More* dropdown, [context menu](https://www.hannonhill.com/cascadecms/latest/cascade-basics/using-the-context-menu.html) and within [Workflow Email notifications](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/custom-workflow-emails.html) will now respect the Site's *Extensions to Strip* property and remove the extension where applicable.
-   Restoring previous versions of Publish Sets and Destinations will (un)schedule publishing based on that version's scheduled publishing settings.

## 20231024

### Features/Improvements

-   Users will now be presented with a warning when attempting to remove or change a File asset's extension, which can result in issues viewing the File within the CMS as well as the live website. This applies to File creation and rename as well as upload through the File chooser.

### Fixed

-   Addressed an issue in which 'okina diacratical marks caused spell checking to cause an error.

## 20230920

### Fixed

-   Removed page level WCAG Accessibility checking feature and disabled future generation of Accessibility reports.

## 20230913

### Features/Improvements

-   Viewing a user and group will now list users, groups and roles alphabetically.
-   It is now possible to define [Valid Response Codes](https://www.hannonhill.com/cascadecms/latest/cascade-administration/external-link-checking.html#ValidResponseCodes) for external link checking during publishing, on-submit content checks and Broken Link Report generation.
-   Reduced likelihood of system instability by improving the Index Block rendering process and also imposing a 50MB hard max on the Maximum Rendered Size of an Index Block [system preference](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html).

## 20230830

### Features/Improvements

-   Improved performance of using the Velocity Locator Tool to locate assets by their path.
-   [Allowed URLs](https://www.hannonhill.com/cascadecms/latest/cascade-administration/external-link-checking.html#AllowedURLs) can be used to skip checking certain links/domains within the Broken Link Report, Publish Reports, and on-submit content check for broken links.
-   Improved performance of loading audits through the application interface and Web Services. Note: a maximum of 10,001 results will be returned from a Web Services `readAudits` operation request.

### Fixed

-   Improved reliability of Daily Content Report generation. Additionally, the most viewed pages section will now only include data from verified Google Analytics Connectors.
-   Addressed an issue in which Google Analytics summaries no longer displayed trend information (i.e. +/- changes).
-   The Google Analytics dashboard widget will now load properly if data from the previous time period is not present. Additionally, data within the report will now be displayed in a friendlier format.

## 20230719

### Features/Improvements

-   A close button was added to the page regions pane for improved UX.
-   Updated content checks interface for improved UX
-   Updated the link checker's user agent to help prevent false positives when remote servers block certain types of user agents.

## 20230712

### Features/Improvements

-   Updated internal libraries and Software Bill of Materials (SBOM) for improved security posture

## 20230710

### Features/Improvements

-   Improved memory usage when uploading large files. Also updated file size validation to ensure it occurs at the time the file is uploaded.
-   A new [Suggested Unused Assets Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/suggested-unused-assets-report.html) helps site managers identify assets that are not being referenced within the system.
-   Various tables across the application will now have docked controls as the user scrolls down.

## [v8.23](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.23/index.html)

### Features/Improvements

-   Viewing relationships for admin area assets, such as Shared Fields, Data Definitions, Publish Sets, etc. will no longer appear to be missing a table column. Additionally, relationships display as errors or warnings when deleting assets will now contain site and path information for extra context.
-   Passwords for normal authentication users are now required to be stronger. More information about the new password policy can be found on under the [Adding a User documentation](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/users.html#password-policies).
-   Updated processing of Google Analytics Reports to prevent timeouts from long running queries.
-   Connectivity issues encountered during publishing will now retry using a backoff to help address possible rate limiting issues.
-   Improved memory usage during the Page rendering process. Also updated XML namespace handling to no longer remove unused namespaces.
-   Google Analytics Connector will now support for Google Analytics 4.

### Fixed

-   Addressed an issue where under certain situations performing multi-op operations (e.g. publish, copy, move, delete) would not check the proper site for available destinations/connectors or user abilities.
-   Working copies will no longer become orphaned if an error occurs while attempting to start workflow.
-   Relaxed asset naming restrictions to allow for successive underscores (e.g. `__foldername`).
-   Long words and URLs within asset comments will now properly wrap instead of appear to be cut off.
-   The audits table will now default to sorting chronologically by the Time column.
-   Entering a version comment that contains special characters, such as a percent sign, and submitting after performing data checks will no longer display an error.
-   Words containing special characters will no longer be split up during spell checking. Also improved the way full search handles these same words.
-   Addressed an issue in which creating a File using an Asset Factory that has a base asset and switching to the bulk file upload interface uploads the files incorrectly. Also improved UX when switching between single file upload and bulk file upload.
-   Long Asset Factory descriptions will now wrap to new lines.
-   The CSV export for [Stale Content](https://www.hannonhill.com/cascadecms/latest/content-management/reports/stale-content-report.html) and [Content Up for Review](https://www.hannonhill.com/cascadecms/latest/content-management/reports/content-up-for-review-report.html) reports will now contain the asset's owner.
-   Addressed an issue in which drag 'n drop of structured data field fields would not work correctly when expanding a group that is collapsed by default.
-   Addressed an issue where a warning would be displayed if the user does not have access to the restricted folder of a chooser field.
-   Addressed an issue where, under certain circumstances, the user would be redirected to the login screen despite having the "Remember Me" option enabled.
-   Addressed an issue where page regions could not be interacted with after performing an in-context edit.

## 20230605

### Features/Improvements

-   Viewing relationships for admin area assets, such as Shared Fields, Data Definitions, Publish Sets, etc. will no longer appear to be missing a table column. Additionally, relationships display as errors or warnings when deleting assets will now contain site and path information for extra context.
-   Passwords for normal authentication users are now required to be stronger. More information about the new password policy can be found on under the [Adding a User documentation](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/users.html#password-policies).
-   Updated processing of Google Analytics Reports to prevent timeouts from long running queries.
-   Connectivity issues encountered during publishing will now retry using a backoff to help address possible rate limiting issues.

### Fixed

-   Entering a version comment that contains special characters, such as a percent sign, and submitting after performing data checks will no longer display an error.
-   Words containing special characters will no longer be split up during spell checking. Also improved the way full search handles these same words.
-   Addressed an issue in which creating a File using an Asset Factory that has a base asset and switching to the bulk file upload interface uploads the files incorrectly. Also improved UX when switching between single file upload and bulk file upload.
-   Long Asset Factory descriptions will now wrap to new lines.
-   The CSV export for [Stale Content](https://www.hannonhill.com/cascadecms/latest/content-management/reports/stale-content-report.html) and [Content Up for Review](https://www.hannonhill.com/cascadecms/latest/content-management/reports/content-up-for-review-report.html) reports will now contain the asset's owner.
-   Addressed an issue in which drag 'n drop of structured data field fields would not work correctly when expanding a group that is collapsed by default.
-   Addressed an issue where a warning would be displayed if the user does not have access to the restricted folder of a chooser field.
-   Addressed an issue where, under certain circumstances, the user would be redirected to the login screen despite having the "Remember Me" option enabled.
-   Addressed an issue where page regions could not be interacted with after performing an in-context edit.

## 20230412

### Fixed

-   Relaxed asset naming restrictions to allow for successive underscores (e.g. `__foldername`).
-   Long words and URLs within asset comments will now properly wrap instead of appear to be cut off.
-   The audits table will now default to sorting chronologically by the Time column.

## 20230322

### Fixed

-   Addressed an issue where under certain situations performing multi-op operations (e.g. publish, copy, move, delete) would not check the proper site for available destinations/connectors or user abilities.
-   Working copies will no longer become orphaned if an error occurs while attempting to start workflow.

## [v8.22.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.22.1/index.html)

### Features/Improvements

-   Updated system name generation logic used by Asset Factory Plugins and naming suggestion to ensure trailing special characters and successive characters, such as periods and hyphens, are not produced.
-   S3 Transport no longer requires the corresponding S3 bucket to have ACLs enabled. Also replaced the need for a `s3:ListAllMyBuckets` permission with `s3:ListBucket`. See [S3 Transport page](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html#AmazonS3Transports) for details.
-   Improved handling of long running Velocity Formats which result in timeouts.
-   Improved Google Analytics nightly syncing process to help reduce database contention.
-   This release contains an upgrade to Tomcat 9.0.69
-   Added a new copy button to clone/duplicate an occurrence of a field or group that is set to multiple.
-   Improved memory usage when deleting users with many drafts.
-   Temporary files, including those created during Site import and export, are cleaned up on a recurring basis.

### Fixed

-   Addressed an issue where, under certain circumstances, deleting/unpublishing a Folder would not delete the empty directory from the remote server.
-   The icon will once again be shown for high priority Tasks on the dashboard and when viewing Tasks within the My Content area.
-   Publishing related assets via [Workflow Publish Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/publish-trigger.html) will now include all relationships.
-   Overwriting existing assets using an Asset Factory will no longer throw constraint violation errors in certain situations.
-   Addressed an issue where users who can not bypass data checks were able to submit without first viewing all checks with issues.
-   The create and edit Web Services operations will no longer result in a role related error message if the parent Folder requires Workflow.
-   Users can now unstar entities in bulk on the My Content screen without needing the [Site Role ability](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/role-abilities-in-cascade.html#SiteRoleAbilities) to multi-select delete.
-   The `WORKFLOW_LATEST_COMMENTS` [Workflow Email](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/custom-workflow-emails.html) placeholder will now function as expected during Workflow initialization. The `WORKFLOW_NEXT_STEP_NAME` placeholder has been removed. Existing usage of the `WORKFLOW_NEXT_STEP_NAME` placeholder will output as plaintext content until manually removed.
-   The LDAP syncing process will now process orphaned users with Normal and Custom authentication mode. Additionally, the `remove` LDAP orphaned user behavior has been deprecated and will fall back to `deactivate`, to prevent from accidentally mass deleting users during an erroneous LDAP sync. The `remove` behavior will be removed as a valid LDAP orphaned user behavior in a future release.
-   Images with a Base64 encoded `src` value will no longer be rewritten when viewing the WYSIWYG's HTML editor.
-   Addressed an issue where, under certain situations, caches were not properly discarded between publish jobs.
-   Title and "new window" values will no longer be removed when inserting links within announcements.
-   Addressed an issue where drag 'n drop to move within the Site's content tree would pre-select the wrong new parent folder.
-   Improved security of "Remember me" login functionality. Additionally, if the user enables the "Remember me" functionality, the user will be automatically logged back after a restart of the application as opposed to being forwarded to the Log In screen.

## 20230303

### Features/Improvements

-   Improved memory usage when deleting users with many drafts.
-   Temporary files, including those created during Site import and export, are cleaned up on a recurring basis.

### Fixed

-   Users can now unstar entities in bulk on the My Content screen without needing the [Site Role ability](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/role-abilities-in-cascade.html#SiteRoleAbilities) to multi-select delete.
-   The `WORKFLOW_LATEST_COMMENTS` [Workflow Email](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/custom-workflow-emails.html) placeholder will now function as expected during Workflow initialization. The `WORKFLOW_NEXT_STEP_NAME` placeholder has been removed. Existing usage of the `WORKFLOW_NEXT_STEP_NAME` placeholder will output as plaintext content until manually removed.
-   The LDAP syncing process will now process orphaned users with Normal and Custom authentication mode. Additionally, the `remove` LDAP orphaned user behavior has been deprecated and will fall back to `deactivate`, to prevent from accidentally mass deleting users during an erroneous LDAP sync. The `remove` behavior will be removed as a valid LDAP orphaned user behavior in a future release.
-   Images with a Base64 encoded `src` value will no longer be rewritten when viewing the WYSIWYG's HTML editor.
-   Addressed an issue where, under certain situations, caches were not properly discarded between publish jobs.
-   Title and "new window" values will no longer be removed when inserting links within announcements.
-   Addressed an issue where drag 'n drop to move within the Site's content tree would pre-select the wrong new parent folder.

## 20221229

### Features/Improvements

-   Updated system name generation logic used by Asset Factory Plugins and naming suggestion to ensure trailing special characters and successive characters, such as periods and hyphens, are not produced.
-   S3 Transport no longer requires the corresponding S3 bucket to have ACLs enabled. Also replaced the need for a `s3:ListAllMyBuckets` permission with `s3:ListBucket`. See [S3 Transport page](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html#AmazonS3Transports) for details.
-   Improved handling of long running Velocity Formats which result in timeouts.
-   Improved Google Analytics nightly syncing process to help reduce database contention.
-   This release contains an upgrade to Tomcat 9.0.69
-   Added a new copy button to clone/duplicate an occurrence of a field or group that is set to multiple.

### Fixed

-   Addressed an issue where, under certain circumstances, deleting/unpublishing a Folder would not delete the empty directory from the remote server.
-   The icon will once again be shown for high priority Tasks on the dashboard and when viewing Tasks within the My Content area.
-   Publishing related assets via [Workflow Publish Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/publish-trigger.html) will now include all relationships.
-   Overwriting existing assets using an Asset Factory will no longer throw constraint violation errors in certain situations.
-   Addressed an issue where users who can not bypass data checks were able to submit without first viewing all checks with issues.
-   The create and edit Web Services operations will no longer result in a role related error message if the parent Folder requires Workflow.

## [v8.22](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.22/index.html)

### Features/Improvements

-   Improved load time of structured data edit modals for complex implementations.
-   Introduced new [Query API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#QueryAPI) methods for fetching assets by structured data. Also added new structured data and dynamic metadata preloading methods to reduce overhead needed to fetch that content.
-   Structured data fields and groups that allow for multiples can now be moved to the top or bottom in the edit interface.
-   System Role validation when creating and editing Groups through both the interface and Web Services has been improved with a more useful error message.
-   Structured data fields and groups set to multiple can now be dragged to re-order. It is also possible to drag a "multiple" field from one group to another that matches the same path.
-   The `@` symbol can now be used within the system name for assets as well as user and group names.
-   Updated the design and UX of controls used for modifying structured data fields and groups that are set to multiple.
-   It is now possible to preview webp image files within the application.
-   Improved accessibility of structured data groups for assitive technologies when editing Structured Data Blocks and Pages.
-   Uploading within a File chooser no longer requires the [Bypass Workflow ability](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/role-abilities-in-cascade.html#SiteRoleAbilities). The chooser's upload tab will now indicate folders that are restricted by workflow for the user.
-   The [Google Analytics Connector](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/how-to-set-up-a-google-analytics-connector.html) verification process has been updated to adhere to Google's latest authentication requirements, which will be changing early 2023.

### Fixed

-   Using the [Publish Trigger's](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/publish-trigger.html) `publish-related-assets` parameter with a non-publishable asset (e.g. a Block) in a Workflow will now publish that asset's relationships.
-   It is once again possible to search by usernames within a User chooser.
-   It is now possible to search the [Broken Link Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/broken-links-report.html) by source asset path.
-   Configuring the Workflow Definition [Publish Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/publish-trigger.html) with parameters to `unpublish` and `publish-working-copy` will now properly unpublish the working copy.
-   Email notifications sent from the [Stale Content](https://www.hannonhill.com/cascadecms/latest/content-management/reports/stale-content-report.html) and [Content Up For Review](https://www.hannonhill.com/cascadecms/latest/content-management/reports/content-up-for-review-report.html) reports will once again include links to selected assets.

## 20221017

### Features/Improvements

-   The [Google Analytics Connector](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/how-to-set-up-a-google-analytics-connector.html) verification process has been updated to adhere to Google's latest authentication requirements, which will be changing early 2023.

## 20221003

### Features/Improvements

-   Uploading within a File chooser no longer requires the [Bypass Workflow ability](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/role-abilities-in-cascade.html#SiteRoleAbilities). The chooser's upload tab will now indicate folders that are restricted by workflow for the user.

## 20220927

### Features/Improvements

-   Structured data fields and groups set to multiple can now be dragged to re-order. It is also possible to drag a "multiple" field from one group to another that matches the same path.
-   The `@` symbol can now be used within the system name for assets as well as user and group names.
-   Updated the design and UX of controls used for modifying structured data fields and groups that are set to multiple.
-   It is now possible to preview webp image files within the application.
-   Improved accessibility of structured data groups for assitive technologies when editing Structured Data Blocks and Pages.

### Fixed

-   It is now possible to search the [Broken Link Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/broken-links-report.html) by source asset path.
-   Configuring the Workflow Definition [Publish Trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/publish-trigger.html) with parameters to `unpublish` and `publish-working-copy` will now properly unpublish the working copy.

## 20220831

### Features/Improvements

-   System Role validation when creating and editing Groups through both the interface and Web Services has been improved with a more useful error message.

### Fixed

-   It is once again possible to search by usernames within a User chooser.

## 20220823

### Features/Improvements

-   Structured data fields and groups that allow for multiples can now be moved to the top or bottom in the edit interface.

## 20220802

### Features/Improvements

-   Improved load time of structured data edit modals for complex implementations.
-   Introduced new [Query API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#QueryAPI) methods for fetching assets by structured data. Also added new structured data and dynamic metadata preloading methods to reduce overhead needed to fetch that content.

### Fixed

-   Using the [Publish Trigger's](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/publish-trigger.html) `publish-related-assets` parameter with a non-publishable asset (e.g. a Block) in a Workflow will now publish that asset's relationships.
-   Scheduled review settings will no longer be lost after editing and submitting an asset.

## [v8.21](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.21/index.html)

### Features/Improvements

-   Workflow-related modals and screens have been improved and streamlined throughout the application.
-   Introduced a new [Workflows Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/workflows-report.html) which displays a list of in-progress and/or completed workflows within sites that you can access.
-   Editing content in multiple browser tabs is now supported. For example, you can now work on multiple Drafts simultaneously or copy content from one Edit screen to another without needing to close out existing Edit screens first.
-   We've reduced the amount of system resources used when creating a copy of a page asset.
-   Improved load time of structured data edit modals with many visible dropdown, WYSIWYG and datepicker fields.
-   Introduced new system-wide keystore [System Preferences](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html) and removed keystore settings from LDAP configuration.

### Fixed

-   Addressed an issue in which (un)starring a Role would not properly update the interface.
-   Workflow Definitions using the auto-name setting will once again use the Workflow Definition's name plus the asset's title, display name or system name when a new Workflow is initialized.
-   Addressed an issue in which browsers would attempt to autofill certain fields within the System Preferences and other areas of the application.
-   Optimized Content Type edit form to prevent issues when loading the edit modal and during submission.
-   Addressed an issue where special characters within [XML Feed Blocks](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/feed-blocks.html) were improperly serialized.

## 20220630

### Features/Improvements

-   Improved load time of structured data edit modals with many visible dropdown, WYSIWYG and datepicker fields.
-   Introduced new system-wide keystore [System Preferences](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html) and removed keystore settings from LDAP configuration.

### Fixed

-   Addressed an issue in which (un)starring a Role would not properly update the interface.
-   Workflow Definitions using the auto-name setting will once again use the Workflow Definition's name plus the asset's title, display name or system name when a new Workflow is initialized.

## 20220609

### Features/Improvements

-   Workflow-related modals and screens have been improved and streamlined throughout the application.
-   Introduced a new [Workflows Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/workflows-report.html) which displays a list of in-progress and/or completed workflows within sites that you can access.
-   Editing content in multiple browser tabs is now supported. For example, you can now work on multiple Drafts simultaneously or copy content from one Edit screen to another without needing to close out existing Edit screens first.
-   We've reduced the amount of system resources used when creating a copy of a page asset.

## [v8.20](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.20/index.html)

### Features/Improvements

-   Purging file assets from the recycle bin now uses less memory.
-   The WYSIWYG editor will now correct `o:p` tags introduced when pasting content from Microsoft Office applications to paragraph elements to prevent XML validation issues on submit.
-   Improved load time of large (un)publish report notifications by displaying an overall summary and a link to view the full report in a new browser window/tab.
-   New Velocity Tool methods for determining ["type" of an object](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#PropertyTool) or if an [object is numeric](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#_NumberTool_isNumeric), shuffle collections using [ListTool.shuffle](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#_ListTool_shuffle), and convert a HashMap to a JSON string using a new [SerializerTool.toJson](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#serialize-map-to-json) method.
-   Publish jobs that are in progress when the application is shut down will now be re-queued so they can be restarted on application startup.
-   Background jobs such as report generation and sync operations that are in progress when the application is shut down will now be restarted on application startup.

### Fixed

-   Create Drafts for folders with previously-recycled children will no longer prevent the Draft from being deleted when a Draft's parent folder is in the recycle bin and being purged.
-   Using `listSubscribers` batch operation will now return a proper `listSubscribersResult`.
-   Times throughout the system now display based on the user's timezone. Fields that display the server's time zone, such as the Broken Link Report schedule, now note which time zone is being displayed. In addition, dates returned by the REST API will now be returned in UTC.
-   Fixed an issue with the Export CSV feature for the Stale Content Report when filtering for a site.
-   When viewing an asset that is scheduled to (un)publish later, the Destination(s) that were selected to (un)publish to will now be shown instead of the Destination(s) checked by default.
-   Contents of Folders created through an [Asset Factory](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/index.html) will not be created until the draft of that Folder is submitted.
-   Timestamps in rendering error screens, such as when viewing an invalid Feed Block, will now show the correct current date and time.

## 20220519

### Features/Improvements

-   Purging file assets from the recycle bin now uses less memory.
-   The WYSIWYG editor will now correct `o:p` tags introduced when pasting content from Microsoft Office applications to paragraph elements to prevent XML validation issues on submit.
-   Improved load time of large (un)publish report notifications by displaying an overall summary and a link to view the full report in a new browser window/tab.
-   New Velocity Tool methods for determining ["type" of an object](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#PropertyTool) or if an [object is numeric](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#_NumberTool_isNumeric), shuffle collections using [ListTool.shuffle](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#_ListTool_shuffle), and convert a HashMap to a JSON string using a new [SerializerTool.toJson](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#serialize-map-to-json) method.
-   Publish jobs that are in progress when the application is shut down will now be re-queued so they can be restarted on application startup.
-   Background jobs such as report generation and sync operations that are in progress when the application is shut down will now be restarted on application startup.

### Fixed

-   Create Drafts for folders with previously-recycled children will no longer prevent the Draft from being deleted when a Draft's parent folder is in the recycle bin and being purged.
-   Using `listSubscribers` batch operation will now return a proper `listSubscribersResult`.
-   Times throughout the system now display based on the user's timezone. Fields that display the server's time zone, such as the Broken Link Report schedule, now note which time zone is being displayed. In addition, dates returned by the REST API will now be returned in UTC.
-   Fixed an issue with the Export CSV feature for the Stale Content Report when filtering for a site.
-   When viewing an asset that is scheduled to (un)publish later, the Destination(s) that were selected to (un)publish to will now be shown instead of the Destination(s) checked by default.
-   Contents of Folders created through an [Asset Factory](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/index.html) will not be created until the draft of that Folder is submitted.
-   Timestamps in rendering error screens, such as when viewing an invalid Feed Block, will now show the correct current date and time.

## [v8.19.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.19.1/index.html)

### Features/Improvements

-   Improved performance of loading last login times on the user's table within the [System Administration Area](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/users.html)
-   Reduced memory consumption of Index Block caching.
-   Improved resource utilization for concurrent publish jobs.
-   Addressed background performance issues that could cause high application memory usage primarily for SQL Server customers running v8.19.

### Fixed

-   Fixed an error message when determining an asset's suggested placement folder in certain circumstances.
-   On-hold workflows being resumed will no longer introduce infinite error loops under certain situations.
-   Corrected an issue where MariaDB 10.6 would prevent successful startup. Note: MariaDB is not an officially-supported database vendor. For supported platforms, please see the **Requirements** section for your release in the [Release Notes](https://www.hannonhill.com/cascadecms/latest/releases/index.html).
-   Fixed a styling issue with sticky announcements where ellipses appeared after each announcement.
-   An asset's context menu will once again close automatically and return focus on the asset link when a user tabs through the end of the menu with a keyboard.
-   Fixed an issue with link rewriting in WYSIWYG editors when editing an asset located in another site.
-   Fixed an error where a site being copied became uneditable if the copy operation was interrupted.
-   Fixed an issue with publishing connections being closed and opened more frequently than expected.
-   (Un)Publish jobs that encounter repeated timeout errors will now mark the Destination as failed after a period of time.
-   Addressed an issue where the Index Block caching thread pool remaining active would prevent the system from shutting down completely.
-   Fixed an issue where buttons to clear page-level Block and/or Format assignments weren't appearing.
-   The `shouldBePublished` property can once again be updated for publishable assets using SOAP Web Services.
-   Trailing commas in WYSIWYG Editor Configuration custom styles will not longer cause site copy operations to fail.
-   Addressed an issue where errors encountered during publishing can result in empty files on the remote server.

## 20220228

### Features/Improvements

-   Reduced memory consumption of Index Block caching.

### Fixed

-   Addressed an issue where errors encountered during publishing can result in empty files on the remote server.

## 20211220

### Fixed

-   (Un)Publish jobs that encounter repeated timeout errors will now mark the Destination as failed after a period of time.
-   Addressed an issue where the Index Block caching thread pool remaining active would prevent the system from shutting down completely.
-   Fixed an issue where buttons to clear page-level Block and/or Format assignments weren't appearing.
-   The `shouldBePublished` property can once again be updated for publishable assets using SOAP Web Services.
-   Trailing commas in WYSIWYG Editor Configuration custom styles will not longer cause site copy operations to fail.

## 20211122

### Features/Improvements

-   Improved performance of loading last login times on the user's table within the [System Administration Area](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/users.html)

### Fixed

-   Fixed an issue with publishing connections being closed and opened more frequently than expected.

## 20211117

### Fixed

-   Fixed an error message when determining an asset's suggested placement folder in certain circumstances.
-   On-hold workflows being resumed will no longer introduce infinite error loops under certain situations.
-   Corrected an issue where MariaDB 10.6 would prevent successful startup. Note: MariaDB is not an officially-supported database vendor. For supported platforms, please see the **Requirements** section for your release in the [Release Notes](https://www.hannonhill.com/cascadecms/latest/releases/index.html).
-   Fixed a styling issue with sticky announcements where ellipses appeared after each announcement.
-   An asset's context menu will once again close automatically and return focus on the asset link when a user tabs through the end of the menu with a keyboard.
-   Fixed an issue with link rewriting in WYSIWYG editors when editing an asset located in another site.
-   Fixed an error where a site being copied became uneditable if the copy operation was interrupted.

## [v8.19](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.19/index.html)

### Features/Improvements

-   We've added accessibility improvements focused around the WCAG 1.4.1, 1.4.13 and 2.4.7 guidelines to buttons and links throughout the application.
-   Metadata and property changes made to Folders are now automatically saved in the background as drafts. These drafts are listed within the [My Content area](https://www.hannonhill.com/cascadecms/latest/cascade-basics/my-content.html) and a message will be shown when viewing a Folder if the user has an existing draft.
-   For improved performance, large files that can be skipped by Smart Publishing will no longer be rendered during publish.
-   Cascade CMS application logging (i.e. contents of `cascade.log`) will no longer be duplicated in the `catalina.out` Tomcat logging.
-   To improve rendering performance, cache discard operations after various asset actions such as create, move, rename, and copy will now be performed in the background.
-   We're excited to introduce a new editing experience to you - while editing a page, click **Show Edit Preview** to see a preview of your changes alongside the edit screen as you make them. Drag the divider between the preview and the edit screen to resize the preview, or click Preview Draft to view the full-width preview.

### Fixed

-   Unscheduling an (un)publish by clearing out the date field within the (Un)Publish modal will now properly update the modal's submit button. Also, the scheduled (un)publish message that is shown while viewing the asset will be removed as it is no longer applicable.
-   Links to named anchors will now correctly scroll to the anchor within the page preview.
-   HTML markup in workflow comments is now escaped to prevent errors with the workflow screen.
-   Fixed an issue where switching outputs when viewing a Page would cause the *Fullscreen Preview* and *Live* links under the More menu to disappear.
-   Restoring a previous version of a non-group Shared Field will no longer cause loss of content.
-   Clicking on a chooser field on a mobile device will no longer navigate to a 404 error screen.
-   Clicking the **Browse** button within the first row of a container chooser's **Browse** tab, while filtered, will no longer navigate into the wrong container.
-   We've tweaked the design of page region overlays to avoid adding extra whitespace to the page's rendering.
-   (Un)Starring an asset will now update all star buttons associated with that same asset (ex. in the context menu and when viewing the asset).
-   Addressed an issue where starring drafts or working copies of assets would display an error message.
-   It's now possible to add links to images within a `figure` element.
-   Addressed an issue where time picker fields, such as those when configuring schedule publishing, could not be updated in Safari or Firefox.
-   The Twitter Connector is now deprecated and it will be removed in the next release.
-   Edit with Preview is now available when editing in-context.
-   Browse folder arrows in chooser flyouts are once again visible when hovering a folder row and on mobile.

## 20211013

### Fixed

-   Browse folder arrows in chooser flyouts are once again visible when hovering a folder row and on mobile.

## 20211006

### Fixed

-   Edit with Preview is now available when editing in-context.

## 20210929

### Features/Improvements

-   Metadata and property changes made to Folders are now automatically saved in the background as drafts. These drafts are listed within the [My Content area](https://www.hannonhill.com/cascadecms/latest/cascade-basics/my-content.html) and a message will be shown when viewing a Folder if the user has an existing draft.
-   For improved performance, large files that can be skipped by Smart Publishing will no longer be rendered during publish.
-   Cascade CMS application logging (i.e. contents of `cascade.log`) will no longer be duplicated in the `catalina.out` Tomcat logging.
-   To improve rendering performance, cache discard operations after various asset actions such as create, move, rename, and copy will now be performed in the background.

### Fixed

-   Clicking on a chooser field on a mobile device will no longer navigate to a 404 error screen.
-   Clicking the **Browse** button within the first row of a container chooser's **Browse** tab, while filtered, will no longer navigate into the wrong container.
-   We've tweaked the design of page region overlays to avoid adding extra whitespace to the page's rendering.
-   (Un)Starring an asset will now update all star buttons associated with that same asset (ex. in the context menu and when viewing the asset).
-   Addressed an issue where starring drafts or working copies of assets would display an error message.
-   It's now possible to add links to images within a `figure` element.
-   Addressed an issue where time picker fields, such as those when configuring schedule publishing, could not be updated in Safari or Firefox.
-   The Twitter Connector is now deprecated and it will be removed in the next release.

## 20210729

### Features/Improvements

-   We've added accessibility improvements focused around the WCAG 1.4.1, 1.4.13 and 2.4.7 guidelines to buttons and links throughout the application.

### Fixed

-   Unscheduling an (un)publish by clearing out the date field within the (Un)Publish modal will now properly update the modal's submit button. Also, the scheduled (un)publish message that is shown while viewing the asset will be removed as it is no longer applicable.
-   Links to named anchors will now correctly scroll to the anchor within the page preview.
-   HTML markup in workflow comments is now escaped to prevent errors with the workflow screen.
-   Fixed an issue where switching outputs when viewing a Page would cause the *Fullscreen Preview* and *Live* links under the More menu to disappear.
-   Restoring a previous version of a non-group Shared Field will no longer cause loss of content.

## [v8.18](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.18/index.html)

### Features/Improvements

-   Improved accessibility of chooser fields used throughout the application among other general button UI improvements.
-   Address resource contention by reading XSLT Xalan system preferences once upon startup of Cascade CMS. Note: changing the XSLT Xalan preferences now requires a restart of Cascade CMS.
-   Non-fatal Destination errors encountered during publishing, such as temporary networking issues, will no longer cause the Destination to be flagged as "skipped."
-   We've added a toggle to enable or disable additional keyboard shortcuts in the shortcuts menu (Shift + ?).
-   We've added accessibility improvements focused around the WCAG 1.4.1, 1.4.13 and 2.4.7 guidelines to buttons, links, icons and various other components throughout the application.
-   You can now schedule assets to publish or unpublish at a chosen date and time with a new [Optionally Publish/Unpublish Later](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/index.html) field on the publish/unpublish menu. While an asset is scheduled to be published, it won't be included in other publish jobs but it can still be indexed by other site content.
-   We've improved page rendering speeds for implementations using large Index Blocks.
-   Added support for TLS 1.3 when performing link checking and Feed Block fetching.
-   Properties and methods returned by the [PropertyTool's outputProperties method](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#_PropertyTool_outputProperties) are now unique and sorted.
-   Added support for OpenJDK 11.0.10+9.

### Fixed

-   Users at any permission level can now discard their own Drafts and Notifications in bulk.
-   Fixed an issue where an asset could be overwritten by a Draft of a new asset with the same name and location before it's finalized.
-   The LDAP configuration will no longer become invalid after renaming a System Role that is being referenced by a user policy.
-   Addressed a UX issue where sometimes clicking on dropdown fields would cause the dropdown to open and close immediately instead of remaining open.
-   The correct Workflow Owner will now be displayed for workflows in the My Content area.
-   It is now possible to view a user that does not have group assignments (or inherited roles), instead of an error being displayed.
-   Content Types with a related Publish Set will no longer result in a validation issue during a Site copy operation.
-   Fixed a scenario where a workflow resuming background task can become stuck and prevent publish jobs from starting/completing.
-   The "back" link when starting a workflow will now return to the asset that is being submitted into workflow.
-   Fixed an error where a Publish Date couldn't be set if the site doesn't contain any Destinations checked by default.
-   When moving or renaming a Manage Site area asset, the primary button now correctly says "Move" or "Rename" instead of "Unpublish".

## 20210708

### Fixed

-   When moving or renaming a Manage Site area asset, the primary button now correctly says "Move" or "Rename" instead of "Unpublish".

## 20210624

### Features/Improvements

-   We've improved page rendering speeds for implementations using large Index Blocks.
-   Added support for TLS 1.3 when performing link checking and Feed Block fetching.
-   Properties and methods returned by the [PropertyTool's outputProperties method](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#_PropertyTool_outputProperties) are now unique and sorted.

### Fixed

-   The "back" link when starting a workflow will now return to the asset that is being submitted into workflow.
-   Fixed an error where a Publish Date couldn't be set if the site doesn't contain any Destinations checked by default.

## 20210610

### Features/Improvements

-   You can now schedule assets to publish or unpublish at a chosen date and time with a new [Optionally Publish/Unpublish Later](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/index.html) field on the publish/unpublish menu. While an asset is scheduled to be published, it won't be included in other publish jobs but it can still be indexed by other site content.

### Fixed

-   Content Types with a related Publish Set will no longer result in a validation issue during a Site copy operation.
-   Fixed a scenario where a workflow resuming background task can become stuck and prevent publish jobs from starting/completing.

## 20210518

### Features/Improvements

-   Improved accessibility of chooser fields used throughout the application among other general button UI improvements.
-   Address resource contention by reading XSLT Xalan system preferences once upon startup of Cascade CMS. Note: changing the XSLT Xalan preferences now requires a restart of Cascade CMS.
-   Non-fatal Destination errors encountered during publishing, such as temporary networking issues, will no longer cause the Destination to be flagged as "skipped."
-   We've added a toggle to enable or disable additional keyboard shortcuts in the shortcuts menu (Shift + ?).

### Fixed

-   Users at any permission level can now discard their own Drafts and Notifications in bulk.
-   Fixed an issue where an asset could be overwritten by a Draft of a new asset with the same name and location before it's finalized.
-   The LDAP configuration will no longer become invalid after renaming a System Role that is being referenced by a user policy.
-   Addressed a UX issue where sometimes clicking on dropdown fields would cause the dropdown to open and close immediately instead of remaining open.
-   The correct Workflow Owner will now be displayed for workflows in the My Content area.
-   It is now possible to view a user that does not have group assignments (or inherited roles), instead of an error being displayed.

## [v8.17.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.17.1/index.html)

### Features/Improvements

-   We've improved load times when editing Pages and Data Definition Blocks with complex implementations.
-   We've added accessibility improvements focused around the WCAG 1.3.1 and 1.3.2 guidelines to tables, icons and various other components throughout the application.
-   We've added WCAG 2.4.7 related accessibility improvements to buttons, links and various other components throughout the application.
-   Publish reports now feature more concise error reporting and will include errors that were encountered when attempting to remove empty directories on unpublish.
-   We've improved keyboard accessibility in the WYSIWYG and added WYSIWYG keyboard shortcuts to the shortcuts menu (Shift + ?).
-   Users can now adjust the duration of notifications displayed within the interface using a new [user setting](https://www.hannonhill.com/cascadecms/latest/cascade-basics/account-settings.html#AccountSettings) called *Notification Duration*. Additionally, a progress bar is now displayed on the notification to indicate how much longer the notification will be visible on the screen.
-   Added support for SQL Server 2019. Support for SQL Server 2014 is deprecated and will be removed in the next on-premise release on or after 09/25/2021.
-   Added support for Microsoft JDBC driver for SQL Server environments.

### Fixed

-   Starring a Role will no longer result in a `NullPointerException` error.
-   Addressed an issue where consecutive attempts to star an asset caused an error.
-   Fixed several issues related to replacing field groups with Shared Field groups in a Data Definition.
-   Fixed an issue where changing a radio field more than once while editing an asset would not trigger additional draft saves.
-   Fixed an issue with typeahead search when selecting a site in a chooser field.
-   Fixed an issue where file asset size would display as 0 bytes in after editing.
-   Addressed an issue where the context menu would stay open after performing an action from it or tabbing out of it.
-   It is now possible to search for WYSIWYG Editor Configurations in chooser fields.
-   Structured data group and field labels are now escaped to prevent from "bleeding" into the interface.
-   You can now apply advanced Custom Formats to `figure` elements in the WYSIWYG.
-   Fixed a background error when sending a Block through workflow containing a publish-working-copy trigger.
-   Addressed an issue with cached site permissions when removing a user from a Group or deleting a Group.
-   Asset Factories with the Create Resized Images plugin will no longer trigger a null error when used to create assets.
-   Addressed some styling issues in the CMS header.
-   Long task names will now be truncated in the Tasks widget on the Dashboard.
-   Working copies will now show their parent folder instead of the current version's parent folder if different.
-   Corrected an issue where MariaDB 10 was being reported as MySQL 5.5 on startup. Note: MariaDB is not an officially-supported database vendor. For supported platforms, please see the **Requirements** section for your release in the [Release Notes](https://www.hannonhill.com/cascadecms/latest/releases/index.html).

## 20210322

### Fixed

-   Long task names will now be truncated in the Tasks widget on the Dashboard.
-   Working copies will now show their parent folder instead of the current version's parent folder if different.

## 20210315

### Fixed

-   Asset Factories with the Create Resized Images plugin will no longer trigger a null error when used to create assets.
-   Addressed some styling issues in the CMS header.

## 20210309

### Features/Improvements

-   Publish reports now feature more concise error reporting and will include errors that were encountered when attempting to remove empty directories on unpublish.
-   We've improved keyboard accessibility in the WYSIWYG and added WYSIWYG keyboard shortcuts to the shortcuts menu (Shift + ?).
-   Users can now adjust the duration of notifications displayed within the interface using a new [user setting](https://www.hannonhill.com/cascadecms/latest/cascade-basics/account-settings.html#AccountSettings) called *Notification Duration*. Additionally, a progress bar is now displayed on the notification to indicate how much longer the notification will be visible on the screen.

### Fixed

-   Fixed an issue where file asset size would display as 0 bytes in after editing.
-   Addressed an issue where the context menu would stay open after performing an action from it or tabbing out of it.
-   It is now possible to search for WYSIWYG Editor Configurations in chooser fields.
-   Structured data group and field labels are now escaped to prevent from "bleeding" into the interface.
-   You can now apply advanced Custom Formats to `figure` elements in the WYSIWYG.
-   Fixed a background error when sending a Block through workflow containing a publish-working-copy trigger.
-   Addressed an issue with cached site permissions when removing a user from a Group or deleting a Group.

## 20210201

### Features/Improvements

-   We've improved load times when editing Pages and Data Definition Blocks with complex implementations.
-   We've added accessibility improvements focused around the WCAG 1.3.1 and 1.3.2 guidelines to tables, icons and various other components throughout the application.
-   We've added WCAG 2.4.7 related accessibility improvements to buttons, links and various other components throughout the application.

### Fixed

-   Starring a Role will no longer result in a `NullPointerException` error.
-   Addressed an issue where consecutive attempts to star an asset caused an error.
-   Fixed several issues related to replacing field groups with Shared Field groups in a Data Definition.
-   Fixed an issue where changing a radio field more than once while editing an asset would not trigger additional draft saves.
-   Fixed an issue with typeahead search when selecting a site in a chooser field.

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

## [v8.16](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.16/index.html)

### Features/Improvements

-   Broadcast Messages are now [Announcements](https://www.hannonhill.com/cascadecms/latest/cascade-administration/administration-tools/broadcast-messages.html) and there's a new announcement type: Sticky Announcements. Sticky Announcements display on all user Dashboards and can be used to provide information such as contacts or links to your documentation. In addition, you can now see all active and pending announcements in the system and use links and styling in your messages with the provided WYSIWYG.
-   Applicable Custom Formats from your [WYSIWYG Editor Configuration](https://www.hannonhill.com/cascadecms/latest/content-authoring/wysiwyg-editor-configurations/index.html#EditorConfigurationCustomFormatting) are now available when inserting or updating images and links (`a` or `img` elements). You can also see existing CSS classes when updating images and links.
-   New [user API Keys](https://www.hannonhill.com/cascadecms/latest/cascade-basics/account-settings.html) provide a secure way to call Web Services/REST API operations from external scripts and applications.
-   We've made a number of accessibility-focused improvements such as: adding "skip to" links to improve navigation for users who rely on assistive technologies, ensuring tooltips are available not only on mouse hover but also with keyboard focus throughout the interface, and correcting color contrast and readability improvements throughout the interface.
-   When working with API objects, metadata and dynamic metadata fields will be cached after loading to improve rendering time during operations such as sorting on dynamic metadata values.
-   [New Cascade API methods](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/internal-cascade-api/internal-cascade-api-changelog.html) have been added to obtain the Metadata Set, Content Type and Data Definition of applicable assets as well as label and value information for possible and selected field items for applicable Dynamic Metadata and Structured Data fields.
-   New methods for the [Escape Tool](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#EscapeTool) to unescape HTML, JavaScript, and XML markup.
-   New methods for the [String Tool](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#StringTool) include a String builder and a method to generate universally unique IDs (UUID).
-   New [Locator Tool](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#LocatorTool) methods to locate Formats and Linkable assets.
-   New [Regex Tool](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#RegexTool) allows you to compile regular expressions.
-   Image file dimensions are now available via [Cascade API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/internal-cascade-api/internal-cascade-api-changelog.html) and [Index Blocks](https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/index-blocks.html).
-   We've added support for outbound proxies for system-generated emails such as workflow emails and content review notifications. For more information please see ["Configuring outbound proxy support for system-generated emails"](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/email-proxy-support.html).

### Fixed

-   Editing certain JPEG files using the image editor will no longer display the error message *Missing Huffman code table entry* or *JFIF APP0 must be first marker after SOI*.
-   Sending Template and Format assets through workflow will no longer prevent the workflow from completing.
-   Complex CSS selectors used within [WYSIWYG Editor Configurations](https://www.hannonhill.com/cascadecms/latest/content-authoring/wysiwyg-editor-configurations/index.html#EditorConfigurationCustomFormatting) will no longer cause the formats menu to rendering incorrectly.
-   Links in the Recent assets list in the My Content area and widget will surface your Draft or Working Copy if you have one.
-   Fixed an issue where comparing a Draft to the Current Version of a page would result in a blank default content area.
-   The browse tab for choosers that are restricted to a site's base folder will now display search results.
-   Renaming an asset will no longer create a working copy if the new name contains an illegal character. We've also introduced a one-time startup task to remove any working copies that were created as a result of this issue.
-   Drafts and locks will no longer be lost if an issue occurs when starting a workflow on Move/Rename or Edit.
-   The *Link* field for [External Link](https://www.hannonhill.com/cascadecms/latest/content-authoring/external-links/index.html) assets will no longer treat `mailto:` links as invalid.

## [v8.15.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.15.1/index.html)

### Fixed

-   Editing certain JPEG files using the image editor will no longer display the error message: *Missing Huffman code table entry*.
-   Sending Template and Format assets through workflow will no longer prevent the workflow from completing.

## [v8.15](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.15/index.html)

### Features/Improvements

-   To help you keep track of your edits, when previewing an asset we'll show you your Draft or Working Copy by default if you have one. If your Draft is out of date with the current version, we'll let you know in the preview header.
-   To help prevent system instability, the max upload limit [system preference](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html) is restricted to no more than 512MB for individual file uploads. Site imports via file upload and zip files being unpacked are restricted to 2GB, based on browser limitations. In addition, changing the max upload limit system preference no longer requires a restart.
-   You can now create deep links to various asset actions by adding an `action` URL parameter to a Cascade CMS asset link. Example: Create “quick edit” links for pages with `/entity/open.act?id=...&type=page&action=edit`.
-   The [Siteimprove integration](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/siteimprove-integration.html) can now be enabled/disabled for individual Sites.
-   A new [Site Role ability](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/roles.html) has been added to restrict the visibility of the [Siteimprove integration](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/siteimprove-integration.html).
-   To help prevent out of date files being left on your web servers, content will be unpublished by default from all enabled Destinations and Outputs during move, rename, and delete operations. The *Unpublish option enabled by default when moving or deleting assets* user preference has also been removed.
-   Native image file metadata will now be preserved when PNG images are modified using the image editor.
-   This release contains an upgrade to Tomcat 9.0.33 and the AJP Connector has been disabled by default in all installers in order to mitigate the CVE-2020-1938 (Ghostcat) vulnerability. (See [Upgrade Guide](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.15/index.html#upgrade-guide) for details.)
-   Oracle versions 18c/19c are now supported. Support for 11g will be removed in the next on-premise release on or after 01/01/2021.

### Fixed

-   Addressed an issue where using the Compare to Current function would result in a StackOverflowError in some cases.
-   Assets on the My Content screen and dashboard widget are now sorted consistently: Drafts and Owned Content are now sorted by last modified date and Locked Assets are now sorted by lock date.
-   Errors encountered during Accessibility content checks will no longer prevent users from submitting their changes.
-   [Content Type Publish Sets](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/publishing-related-content.html#ContentTypePublishSets) will now be included in the automatic publish of a Page on its Start Date.
-   Publish Sets associated with previous versions of a Content Type can now be deleted without error.
-   Viewing previous versions of a Content Type [associated with a Publish Set](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/publishing-related-content.html#ContentTypePublishSets) will now display the appropriate Publish Set instead of "None".
-   To prevent issues, multiple parallel submissions of the same form will now be prevented.
-   Log files will no longer contain warnings about a missing `resources.customer` resource file.
-    It is once again possible to filter page-level WCAG accessibility issues by compliance level.
-   Previous versions of a Content Type can now be deleted.
-   Recurring reviews for assets will no longer be automatically rescheduled if the asset has not been marked as reviewed by its Review Date. Subsequent Review Dates will now be scheduled when the asset is marked as reviewed or when its review workflow is complete.
-   Addressed errors when deleting users associated with locked assets and/or in-progress workflows.
-   Items will no longer appear partially cut off when users scroll to the bottom of the Sites, Add Content, and type-ahead Search flyout panels.
-   Existing data in a field will now attempt to be mapped if a Data Definition field's `field-id` is changed.
-   WYSIWYG fields will no longer display the Clive controls when the [Clive integration](https://help.clive.cloud/en/articles/2612779-enabling-clive-integration-with-cascade-cms) is disabled.
-   Users will no longer be able to switch sites when choosing or uploading assets if a chooser or WYSIWYG is restricted to a site's base folder.
-   Activating a previous version of a Data Definition will no longer break relationships between the Data Definition and Shared Fields or WYSIWYG Editor Configurations.
-   Shared Fields will no longer be stripped from Data Definitions if the field can't be found, for example, due to a mistyped path.

## [v8.14](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.14/index.html)

### Features/Improvements

-   To help you locate content quicker, collapsed groups in page and block editing interfaces now feature a preview of the first field in the group. We've also updated the design of various form-related components throughout the application.
-   We've introduced a number of improvements to the Browse and Upload tabs in chooser panels to help reduce confusion when choosing assets. Additionally, the chooser panel is now responsive on mobile devices.
-   To avoid obstructing the interface, LDAP sync notifications will no longer display the entire report. Additionally, we've improved performance of LDAP sync report generation.
-   We've updated the look and feel of various reports such as Publish, Folder copy, Site import, and LDAP sync.
-   You can now limit asset selection and uploads to a designated folder for chooser and WYSIWYG fields with the **Restrict to folder** option in your [Data Definitions](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/index.html).
    
-   Reduced memory usage during [Broken Link Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/broken-links-report.html) generation.
-   We've improved performance when editing complex [Data Definitions](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/index.html) in the builder.
-   Windows Server 2019 is now supported.
-   MySQL 8 is now supported; MySQL 5.5 is deprecated and support will be removed in the next on-premise release on or after 5/15/2020.

### Fixed

-   Recipients of scheduled publish notifications will no longer see varying "Received on" dates.
-   Addressed an issue where enabling multiples for existing Data Definition groups would cause descendent fields to lose existing values.
-   Addressed errors when a workflow attempts to merge a working copy while it's still in the Publish Queue. Workflows with assets waiting to be published will be put on hold and resume once the publish completes.
-   Addressed an issue in which checkbox/radio icons are not clickable when selecting assets in tables.
-   Changing a Page's Content Type will no longer display a preview error after submitting the change.

## [v8.13.2](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.13.2/index.html)

### Features/Improvements

-   Text within asset links (asset names) can now be selected throughout the application on non-mobile devices.
-   Microsoft SQL Server 2017 is now supported; 2012 is deprecated and support will be removed in the next on-premise release on or after 3/12/2020.

### Fixed

-   Help text for metadata fields is no longer lost when copying a Metadata Set.
-   Reading a Workflow Definition and Workflow (via `readWorkflowInformation`) using Web Services will now include Custom Workflow Emails.
-   Addressed an issue where long *Show Field* option labels made editing fields difficult in the Data Definition Builder.
-   The My Sites widget will now correctly display the user's most recent sites.
-   It is no longer possible to submit empty comments or replies to comments.
-   Corrected an issue where user and group choosers would not properly handle user and group names containing a comma.
-   The `entityPath` provided to Publish Triggers will no longer be empty during an unpublish job that is triggered from a move/rename operation.
-   Updating the structured data of an asset in varying order using Web Services will no longer lead to unexpected results.

## [v8.13.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.13.1/index.html)

### Features/Improvements

-   We've improved load times for screens such as the Dashboard that rely on counting a user's notifications.

### Issues Fixed

-   To prevent issues with parts of the interface being hidden when viewing PDFs in Internet Explorer 11 (IE11), users will be prompted to preview the PDF in a separate tab instead.
-   Assets using Data Definitions and Shared Fields outside of the current site will no longer lose Shared Field content when edited with Web Services.
-   We've addressed an issue where, under certain circumstances, Asset Factories would not place assets within their designated placement folder.
-   Oracle clients running 12.2+ will no longer experience database update errors relating to adding constraints to [Custom Workflow Email](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/custom-workflow-emails.html) tables during the upgrade process from prior to Cascade CMS 8.13.
-   Oracle clients running 12.2+ metadata values now use the correct data type.
-   We've addressed an issue where sites exported prior to Cascade CMS 8.13 do not import into Cascade CMS 8.13 with a [Custom Workflow Email](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/custom-workflow-emails.html) container.
-   The Windows installer has been updated to address an SSL connection error after upgrading to Cascade CMS 8.13.
-   Workflow comments will no longer be repeated for system steps in a Workflow Definition.

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

## [v8.12](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.12/index.html)

### Features/Improvements

-   Data Definition groups and fields can now be reordered and restructured while preserving existing content. We've added [drag-and-drop re-ordering](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/index.html) to help simplify Data Definition group and field reordering.
-   Consecutive calls with `structuredData`, `getStructuredDataNode()`, or `getStructuredDataNodes()` will now be cached to improve rendering times.
-   On-submit [accessibility content checks](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-checks.html) will now show a helpful message if they appear to be taking longer than expected.
-   We've improved color contrast in various places throughout the application for better visibility and accessibility.
-   To improve impact on system performance, applying workflow settings to multiple folders simultaneously will now run as a background task.
-   We're doing less frequent recrawl requests of Siteimprove when publishing content from Cascade CMS. Individual asset publishes will still issue automatic recheck, but larger, bulk publishes will not recrawl your entire site as frequently.

### Issues Fixed

-    Timestamps for page previews in the Accessibility Report will now show the correct date and time that the preview was generated.
-   The `readAudits` [web services](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/index.html) operation will now handle the `groupname`, `rolename`, `startDate` and `endDate` options within the `auditParameters` request data.
-   Addressed an issue where the [Query API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html#query-api) would return inconsistent results when filtering by multiple Dynamic Metadata field or tag values.
-   Assets associated with an Accessibility Report record can now be fully purged from the recycle bin without error.
-   Addressed an issue where the length of Accessibility Report violation descriptions could exceed the database column length.
-   WCAG accessibility tests relating to CSS and overall page structure will no longer be reported in the on-submit [accessibility content check](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-checks.html).
-   When reading an asset with Structured Data nodes using Web Services, a `structured-data-node` will now be returned for all fields. This means that if a given asset is missing a value for a field, a `structured-data-node` with that field's default value will be returned, instead of the field being omitted from the response.
-   Addressed an issue where under certain situations cached Index Block renderings would not properly update as assets were created and removed. We also reduced average system memory consumption by Index Block caches.
-   [Naming Rules](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-naming-rules.html) will now be applied properly when creating a [reference](https://www.hannonhill.com/cascadecms/latest/content-authoring/references.html) to an existing asset.
-   A JavaScript error will no longer appear when inserting/updating links and images within a WYSIWYG field.
-   Dashboard widgets configured with a deleted Site will now display a message instructing the user to update the widget.
-   Dashboard widgets will no longer become uneditable when configured with a Site to which the current user does not have explicit Site object READ/WRITE permissions.
-   The *Mark as Reviewed* keyboard shortcut when viewing an asset has been changed from `w` to `s` to avoid conflicting with the *Workflows* shortcut when viewing a folder.
-   When recovering a folder from the Trash, assets will be restored in order from the parent folder down to ensure cache paths are set correctly.
-   Broadcast messages will once again remain visible until the user explicitly closes them.
-   Read timeouts during [Google Analytics Connector](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/how-to-set-up-a-google-analytics-connector.html) syncing should occur less frequently.
-   Folders can once again be recycled if they contain assets which are locked or have working copies.
-   Notifications for Tasks with due dates will no longer be sent after the Task has been resolved or deleted.
-   Content ownership will be preserved after an asset goes through workflow or a previous version is activated.
-   It is no longer possible to schedule Broadcast Messages in the past, or with an end date that is before the start date.
-   Asset chooser fields will now properly handle double quotes when displaying assets by their Title or Display Name.
-   Copying Data Definitions and Shared Fields to another Site will no longer result in invalid paths.
-   The Data Definition Builder will no longer become unusable when editing a Data Definition which references a nonexistent Shared Field.
-   WYSIWYG Editor Configurations from another Site will now load when viewing a Data Definitions or when editing Pages/Blocks.
-   Fields inside a Shared Field group will no longer lose their values when swapping out a page's Data Definition or Content Type.
-   Empty content areas will no longer be tested for accessibility issues.

## [v8.11.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.11.1/index.html)

### Features and Improvements

-   Users who receive scheduled publish reports will now be notified in the report if a scheduled publish fails because a site has no enabled Destinations.
-   Users publishing one or more selected assets from a list will now receive a warning if they have no enabled Destinations available to them.

### Issues Fixed

-   WYSIWYG editor fields using deprecated options in a Data Definition now load properly without Javascript errors.
-   Addressed an issue where the New Content dashboard widget would not properly load if the configured Site's base Asset Factory Container contained a sub-container.
-   Submitting content checks during the edit process will no longer prompt the user about unsaved changes.
-   Updating the SMTP password and Widen Collective API key system preferences via Web Services will now encrypt the values instead of persisting them as plain text.
-   Viewing a previewable file (e.g. PDF) will no longer result in two consecutive render requests.
-   Re-enabled the paragraph option within the WYSIWYG's Formats menu.
-   It's no longer possible to assign a recycled Template to a Configuration.
-   If a Template that's in use is recycled, an error will be output to the logs with the associated Configurations to update.
-   Addressed an issue during site imports where empty files would fail to be created.
-   Addressed an issue during site imports where Content Types with associated Publish Sets would fail to be created.
-   Viewing a Shared Field with a `&type=` parameter in the URL will not longer throw a NullPointerException.
-    WCAG [accessibility content checks](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-checks.html) for WYSIWYGs now happen asynchronously as opposed to one field at a time, improving overall check speed.
-   WCAG tests applicable to full pages only have been omitted from the [accessibility content checks](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-checks.html) for WYSIWYGs to help prevent false positives.
-   Sites with an Accessibility Report associated with them can now be deleted.
-    Addressed an issue where an Accessibility Report will not complete if an error is encountered while it is running.

## [v8.11](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.11/index.html)

### Features/Improvements

-   We've updated the on-submit [Accessibility content check](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-checks.html) to reflect HTML5 recommendations for table captions.
-    Cascade Cloud users can now enable additional WCAG 2.0 tests in the on-submit [Accessibility content check](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-checks.html).
-   We've introduced [Shared Fields](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/shared-fields.html) for Data Definitions, which allow you to manage, update, and share individual fields and field groups across Data Definitions and across sites.
-    Cascade Cloud users can now integrate with [Widen Collective](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/widen-collective-integration.html) or [Webdam](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/webdam-integration.html) to allow users to browse and select assets in their digital asset management library from within the WYSIWYG editor.
-   The [Database Optimizer Tool](https://www.hannonhill.com/cascadecms/latest/cascade-administration/database-tools/optimize-database.html) will now run as a background task and appear in the [Background Tasks Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/background-tasks.html). A notification will be sent to the user when the task is completed.
-   We've added more fine-grained formatting controls to [WYSIWYG Editor Configurations](https://www.hannonhill.com/cascadecms/latest/content-authoring/wysiwyg-editor-configurations/index.html). Individual built-in formats in the WYSIWYG Formats dropdown can now be enabled/disabled and [advanced custom formats](https://www.hannonhill.com/cascadecms/latest/content-authoring/wysiwyg-editor-configurations/index.html#EditorConfigurationCustomFormatting) can be used to target and/or generate styled content.
-   Preview options will be pre-populated when editing a Format from a page's region assignments. Selected preview options will also be retained to prevent having to select the same options again.
-   When editing a Format, you can now increase the height of the bottom preview pane.
-    Cascade Cloud users have a new site-wide Accessibility Report, which allows you to monitor and review WCAG 2.0 accessibility issues across your entire site.
-   When publish requests expire, they're now properly deleted. This prevents issues when deleting Sites and Destinations caused by leftover expired requests.
-   We've added indexes to metadata columns in tables to improve the speed of metadata-based API queries.
-   The "Save & Preview" button is now the "Preview Draft" button. We believe this better describes the function of the button and should help reduce confusion on the part of users submitting content.
-   Users will now be asked to confirm if they want to navigate away from content checks when submitting content.
-   A new custom Metadata field type, the date/time field, is now available. This offers an alternative to using the static Start/End Date metadata fields or Data Definition date/time fields.
-   A new Cascade API method, `DynamicMetadataField.hasValue()`, is now available. Much like `StructuredDataNode.hasTextValue()`, this new method checks if a custom Metadata field contains the specified value. Review the [API changelog](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/internal-cascade-api/internal-cascade-api-changelog.html) for this and other improvements to the internal API.
-   Labels can now be added to checkbox, radio, drop-down, and multi-select values in custom Metadata Set fields and Data Definition fields. This allows developers to change the visible label for field values without affecting existing stored values.
-   A new report, [User Activity](https://www.hannonhill.com/cascadecms/latest/content-management/reports/user-activity-report.html), provides statistics on a number of common actions such as asset creations, deletions, edits, and user logins.
-   When editing Velocity Formats, a button has been added to the code editor to display information about the various tools, methods, and properties available.

### Issues Fixed

-   Tags are now included when copying a Site.
-   The Default setting for Dynamic Metadata field values will once again load properly when editing a Metadata Set. For radio and dropdown fields, this setting will once again be restricted to one per field.
-   Index Blocks which index Feed Block content will no longer be cached if there's an issue loading the feed.
-   The New Content dashboard widget will once again use the selected Site's base Asset Factory Container, configurable in the [Site Settings](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/index.html), when determining what Asset Factories to load.
-   Viewing [audits](https://www.hannonhill.com/cascadecms/latest/cascade-administration/audits.html) will once again default to being sorted chronologically.
-   Addressed an issue where orphaned structured data nodes in assets using a Data Definition could prevent changes to the asset from being submitted.
-   Orphaned unpublish requests will no longer prevent their associated Destination and/or Site from being deleted.
-   Groups with invalid names (e.g. containing single quotes) will no longer cause choosers in areas such as Site Role assignments and access rights settings to work incorrectly.
-   Fixed an SSL handshake failure when enabling the Siteimprove CMS plugin. See [Upgrade Guide](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.11/index.html#UpgradeGuide) for details on the upgraded Java JRE we've bundled.
-   Addressed an issue where null values in the Broken Link Report could cause the report to fail to load when filtering.
-   Fixed a typo in the expiration warning help text.
-   Addressed an issue where folders may not be displayed in the folder tree or folder chooser if they had colliding folder orders.
-   Addressed an issue affecting instances running on SQL Server where, under certain circumstances, Index Block rendering could result in higher than normal database CPU usage.
-   Discrepancies between the displayed date/time and the date/time when hovering over timestamps throughout the system have been corrected.
-   Non-current versions of child assets are no longer included when performing a `read` operation on a folder with Web Services or REST API.
-   Searching for the same term more than once (e.g. `about about`) will no longer prevent search results from loading.
-   We've reworked asset recycling in the system to address instances where assets can become corrupted on recycle. Folder recycling now occurs as a background job that's available to view in the [Background Tasks Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/background-tasks.html).

## [v8.10](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.10/index.html)

### Features/Improvements

-   This release ships with the Tomcat 9.0.8 servlet container which contains improvements and security fixes to the previously shipped version of Tomcat. It also replaces Tomcat 8.0.x which [reaches end of life on June 30, 2018.](https://tomcat.apache.org/tomcat-80-eol.html)
-   Dates and times throughout the application are now formatted to show absolute times (e.g. `Today 11:20 AM` or `Jun 1 3:29 PM`) instead of relative times (e.g. `9 minutes ago` or `2 years ago`).
-   We've added information about who last modified a given asset when viewing the contents of a Folder or Container.

### Issues Fixed

-   Exporting Sites will no longer retain file pointers after downloading completes.
-   Testing email preferences after initially loading the [System Preferences](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html) form will now use the correct SMTP password.
-   Validation of URL fields throughout the application will now accept protocol-relative URLs (e.g. `//www.example.com`) . The validation will also allow space characters (e.g. `https://www.example.com/a space/index.html`); however, we still recommend encoding those spaces as `%20`.
-   New database indexes prevent "lock request time out period exceeded" errors for SQL Server customers that were causing user facing performance issues when under load.
-   Addressed an issue where clients running Cascade CMS on Oracle occasionally ran into errors when importing a Velocity Format using the `#import` directive.
-   Content Type Publish Sets must belong to the *same Site* as the related Page being published to avoid invalid relationships and false successful publish notifications.
-   Rendering metrics caching is now thread safe to avoid synchronization errors when rendering multiple Pages, or the same Page, at the same time.
-   Search/replace will now correctly handle empty Structured Data values for Oracle clients.
-   Editing within the WYSIWYG source code editor is once again possible in IE11.
-   Addressed an issue where region assignments in Show Regions would fail to be populated when system region comments were removed in the document markup.
-   Editing a page via in-context editing will no longer remove the content tags associated with the page.
-   Date pickers will now show under fields to ensure they are not cut off by fixed modal headers.

## [v8.9.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.9.1/index.html)

### Features/Improvements

-   We've made some changes to prevent inadvertent actions on a folder when trying to take action on selected items in the folder. When items are selected in a list, folder and container actions are now disabled, and list actions are docked to ensure they're still visible when scrolling the list.

### Issues Fixed

-   Usernames will once again be shown when viewing the Users table in the Administration area.
-   The `listSubscribers` SOAP operation will now correctly return `<assetIdentifier>` elements within `<manualSubscribers>`.
-   The `read` SOAP operation will now correctly return `<tag>` elements within `<tags>` for an assets with tags.
-   Roles are once again included in search results.
-   Addressed an issue where updating the Group assignments for a User may not update the Sites to which they have access.
-   The asset tree will no longer fail to expand after moving an asset.
-   Clicking on the publish notification link after updating an asset will once again load the correct asset's publish modal.
-   Updated reviewable assets that have an valid `reviewEvery` value to avoid validation errors when updating those assets using Web Services.
-   Adding a Page-level region assignment and using the quick submit will once again render the Page as opposed to a rendering exception error message.
-   It's once again possible to replace phrases in content.
-   Moving an asset after opening an asset's relationships will no longer prevent from choosing a new parent container.
-   Addressed various situations where old versions of Destinations could be published to, such as Workflow Publish Triggers and Web Services (i.e. if an old version's ID is provided).
-   Addressed an issue where links resulting in `100-continue` responses during link checking put the link checker in an invalid state.

## [v8.9](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.9/index.html)

### Features/Improvements

-   [Publishing related content](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/publishing-related-content.html) is now easier with the ability to add Relationships to an asset and associate Publish Sets with Content Types; both of which can be included when publishing the content you're working on.
-   [Content tagging](https://www.hannonhill.com/cascadecms/latest/content-authoring/tags.html) now allows you to assign reusable site and systemwide Tags to assets. Tags are searchable within Cascade CMS and can be leveraged to create related content indexes via Query API.
-   We've updated the look and feel of the Plugins tab when editing an Asset Factory.
-   We've improved loading speeds for the Notifications table, Dashboard widget, and notification count in the user menu.
-   Searching within the asset chooser's panel will now display more than just 20 results.
-   We've updated the look and feel of the Site switcher, Add Content menu and type-ahead search in the application header.
-   Dropdown/multi-select fields on the [advanced search](https://www.hannonhill.com/cascadecms/latest/cascade-basics/search/full-search-and-replace.html) and [asset naming rules](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-naming-rules.html) preferences are now alphabetized.

### Issues Fixed

-   Illegal characters are no longer permitted when editing a Site name, and attempting to use them during Site creation will display a more helpful error message.
-   Using the *Fullscreen* button in the WYSIWYG in conjunction with the *Show All Editor Features* button or when editing an XHTML/Data Definition block no longer causes the interface to render incorrectly.
-   The `getLinkingAssets` Cascade API method will now return assets linked through Data Definition chooser fields.
-   The suggestion provided when an asset name does not follow the Site's asset naming rules will now properly handle spaces and invalid characters.
-   The Data Definition builder will now show smart field rule help text for WYSIWYG fields.
-   Unpublish options are once again available when moving or renaming a Folder.
-   The [ability](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/role-abilities-in-cascade.html) to *Run Transport and Destination diagnostic tests* now requires the *Access the Manage Site Area* ability, instead of the *Access Administration Area* ability.
-   Updating a reviewable entity's `reviewEvery` property via Web Services is now validated to ensure the provided value is 0, 30, 90, 180, or 365.
-   Addressed an issue where the Role assignments for a Site may not be persisted properly under certain circumstances such as mixed case Role names in case-sensitive databases or when non-administrative users update a Site's settings.
-   It is once again possible to link to a Page's rendering by supplying a `confId` parameter to the "internal" rendering URL. However, the recommended method of linking to a Page's rendering would be to use the [`?raw` parameter](https://www.hannonhill.com/cascadecms/latest/content-authoring/linking.html#LinkingtoaRenderedVersionofaPage).
-   Addressed a JavaScript error thrown when using the typeahead search in IE11.
-   Addressed an issue where attempting to move a folder would fail if its system name didn't comply with the Site's asset naming rules.
-   The [Data Definition Field(s) to System Name](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/data-definition-field-to-system-name-plug-in.html) Asset Factory plugins will once again properly set the name of pages on creation using the configured Data Definition field identifier(s).
-   WYSIWYG Editor Configurations are once again editable once the max number of asset versions has been reached.
-   Improved error handling for cases where [WCAG 2.0 accessibility checks](https://www.hannonhill.com/cascadecms/latest/content-authoring/accessibility/page-accessibility-checker.html) take longer than normal or if the Tenon.io service is temporarily unavailable.
-   Deletion of a Site will no longer be prevented if previous versions of Manage Site assets that have been moved out of the Site still reference it.
-   When viewing a Metadata Set in the Manage Site area, Custom Metadata fields will now be listed in the order they're defined.
-   Addressed an issue where users were sometimes forwarded to an instance's `/favicon.ico` URL after logging in.
-   Inserting external links in the WYSIWYG in IE11 and Edge works again.
-   Inserting internal images in the WYSIWYG will once again automatically populate the descriptive text with the File's Title, Display Name, or system name.
-   When editing an asset from the context menu, the publish link pop-up will now publish the edited asset as opposed to the asset in the preview window.
-   [WYSIWYG Editor Configurations](https://www.hannonhill.com/cascadecms/latest/content-authoring/wysiwyg-editor-configurations/index.html) can once again be configured with Custom Styles without requiring a CSS File to be chosen.
-   Addressed an issue where updating the dimensions while inserting/updating an image within the WYSIWYG (with *Constrain proportions* enabled) will use incorrect values.
-   Addressed an issue where correcting items on multiple pages during a content check such as Spell Check would only update items on the last page viewed.
-   WYSIWYG Editor Configurations with trailing commas in the *Custom Styles* field no longer cause the *Insert/Edit Link* and *Insert/Edit Image* buttons in the WYSIWYG to stop working.
-   Addressed an issue in which searching/re-indexing would intermittently stop working on Windows installations.
-   Images inserted within the WSYIWYG editor will no longer have an invalid `caption` attribute added to their markup.
-   [Google Analytics Connectors](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/how-to-set-up-a-google-analytics-connector.html) will no longer fail to sync when processing a URL containing 4-byte characters.
-   Addressed an issue in which an error, "Request header too large," would be shown when viewing Feed Blocks or link checks are performed (i.e. during asset submission or Broken Link Report generation).
-   Search results will no longer contain past versions of assets.
-   A server-side error message will no longer appear when updating the [System Preferences](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html) with an invalid System URL.
-   Improved submission times for Content Types that have many page regions and structured data fields.

## [v8.8.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.8.1/index.html)

### Features/Improvements

-   Loading times have been improved for the Sites table and Sites drop-down menus used throughout the application.

### Issues Fixed

-   Various background job scheduling issues relating to an asset's Start Date, End Date, and Review Date Metadata Fields and Workflows have been fixed.
-   The left-hand Site Content tree will no longer be in a collapsed state when viewing a draft of a new asset.
-   Updating Content Types with the Bulk Change tool will no longer overwrite page-level region assignments.
-   When fetching Feed Blocks, the system will be able to connect to remote servers running older SSL protocols and ciphers.
-   Data truncation errors will no longer appear in the application logs when background task error messages are longer than 250 characters.
-   Workflows containing a [Version trigger](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/version-trigger.html) will now create versions for Block assets.
-   Configurations linked to previous versions of a Content Type can now be deleted.
-   Addressed a [Siteimprove plugin](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/siteimprove-integration.html) performance issue caused by rechecking a Publish Set that contains the Site's base folder.
-   Addressed issues where the Siteimprove plugin would send many repeated API requests to recheck content on publish and generally made the rechecking of content on publish more efficient.
-   Submitting a Page level block or format region assignment change will no longer display an error message indicating no “configuration could be found”
-   A user friendly error message will now be shown when editing a draft in one tab and discarding that draft in another.
-   The advanced code editor will once again be available when creating new Files.
-   Internal links within Velocity Formats will now be updated to reference the correct asset after a Site or Folder copy.

## [v8.8](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.8/index.html)

### Features/Improvements

-   The [System Dictionary](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-dictionary.html) is now centralized and customizable, allowing all users to see a common list of suggestions when performing content checks or when using the WYSIWYG's spell check feature.
-   [Smart Publishing](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html#content-publishing) has been updated so that it is only applicable for large files (10MB or larger) to help improve publish times.
-   The "Rewrite links in file" and "Maintain absolute links when rewriting" configuration options are now hidden for file assets that are not editable text files (based on [System Preferences](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html#content-assets)) because these options are not applicable.
-   We've added a new Feed Block "Request Timeout" System Preference which determines the amount of time to allow before the system times out when requesting a Feed Block.
-   You can now specify in System Preferences whether index pages in your Siteimprove account are indexed without "index" in their URLs.
-   If your site's URL in Siteimprove is different than the URL of your site in Cascade CMS, you can now specify it in [Site Settings](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/index.html#SiteSettings).
-   Publishing a page or folder will now trigger a recrawl of those pages by Siteimprove. Publishing a Site's base folder, Destination(s), or Site itself will trigger a recrawl of the site by Siteimprove.

### Issues Fixed

-   Non-editable Files configured with "Re-write links in file" will no longer become corrupt during a nightly relationship-rebuilding job.
-   When creating or editing a [WYSIWYG Editor Configuration](https://www.hannonhill.com/cascadecms/latest/content-authoring/wysiwyg-editor-configurations/index.html), buttons are toggleable again.
-   Feed Block fetching has been refactored to address an issue where remote servers block requests that original from a generic Java user agent.
-   Submitting structured data that contains a chosen asset that is recycled will no longer display an "illegal site in this relationship" error and prevent submission.
-   Performing an operation using the [REST API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html) which accepts optional parameters (e.g. `siteCopy`) will no longer return a failed response.
-   Un-selected replacement terms will no longer be updated when performing a [Search & Replace](https://www.hannonhill.com/cascadecms/latest/cascade-basics/search/full-search-and-replace.html).
-   Copying assets will no longer ignore the Applicable Asset Types setting during [Asset Naming Rule](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-naming-rules.html) validation.

## [v8.7.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.7.1/index.html)

### Features/Improvements

-   The [Role creation/editing interface](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/roles.html) now indicates if an ability has required dependencies before it can be enabled.
-   The [System Preferences](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html) screen has been re-organized into separate tabs and additional help text was added to make the form more intuitive and easier to use.
-   We've made suggestions to use secure URLs subtler. Links will default to `https://` for placeholders and when no protocol is specified, but users will no longer be prompted when attempting to add non-secure URLs (i.e. those beginning with `http://`) in the WYSIWYG.

### Issues Fixed

-   Custom tooltips used on various tables and UI elements no longer persist on the screen when not being hovered.
-   Users without the ability to bypass content checks are now able to advance a workflow after an edit step.
-   Single space character passwords for Transports or Connectors are converted to null in Oracle databases when upgrading to prevent issues with application startup.
-   Orphaned working copies are no longer left behind when a create workflow is rejected or deleted before the working copy is merged.
-   The Save & Preview button is no longer disabled after editing an asset in Workflow.
-   The Save & Preview button is no longer disabled after re-uploading a file while editing an existing file asset.
-   Folders once again expand when clicking the show contents arrow (>) in the asset tree.
-   Creating/editing a User, Group, or Role will no longer redirect back to the main Users, Groups, and Roles screen.
-   It is once again possible to enter content into the code editor while in fullscreen mode.
-   Additional fixes to prevent asset version chains from being broken during workflows with a Version trigger.

## [v8.7](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.7/index.html)

### Features/Improvements

-   We've added real-time notifications for actions including asset and task comments, publish reports, site import/copy reports, and edits to assets you're viewing.
-   Changes to assets will automatically update the asset tree for all users in a site.
-   We improved application performance by replacing frequent polling with WebSocket.
-   There's a new [Background Tasks report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/background-tasks.html), which provides a list of running and completed tasks in the system such as Broken Link Report generation, page renders, scheduled LDAP sync operations and more.
-   We've strengthened password encryption throughout the CMS using current best practices.
-   Editing assets will no longer redirect the user to that asset on submission unless Save & Preview is used or a Workflow is started. This includes edits initiated from context menus and updating Blocks within in-context editing.
-   Added `maxLength` restriction and help text to various form fields to prevent users from entering too much content which could lead to database-related errors.
-   We're promoting the use of secure URLs (`https://`) by adding subtle help text and placeholders throughout the system.
-   We've added a [Move/Rename Workflow Definition type](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/index.html). You can use an unpublish trigger in your Move/Rename workflows to ensure assets are unpublished from the web server when their path changes.
-   You can now apply asset naming rules at the [System](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html) and/or [Site](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/index.html) level. These rules will be enforced for newly-created assets in the system.
-   Access your [SiteImprove](https://siteimprove.com/) data for relevant assets in Cascade by enabling the SiteImprove plugin in your system preferences.

### Issues Fixed

-   Malformed URLs such as "http:hannonhill.com/blah" and mixed-case URLs don't generate errors in the software now.
-   Clicking region names in the sidebar shows region assignments again.
-   Clicking regions that aren't in-context editable no longer highlights them.
-   Corrected a number of issues with the custom scrollbar.
-   Continuing on the improvements to GA Connectors introduced in 8.6, all **newly-verified** GA Connectors will use a new Google application so they will no longer be subject to the same quota as instances running on older versions of Cascade CMS.
-   Grouping by link in the Broken Link Report works again.
-   Scheduling content reviews now only available for reviewable assets to which the user has write access.
-   "Schedule Review" and "Mark as Reviewed" through the context menu now works.
-   Asset review dates are now updated when the next scheduled review date is reached.
-   Several additional bug fixes and improvements related to content review scheduling.
-   Upgraded TinyMCE from v4.5.7 to v4.6.7 to address issues with code sections in source code, selecting Spectate forms, using dialogs and the source code editor in IE11/Edge, along with [numerous other improvements/fixes](https://www.tinymce.com/docs/changelog/#version467september182017).
-   The currently-viewed asset is now properly highlighted within the Site asset tree if it has the same name as its parent container.
-   Nested Data Definition groups no longer overflow the borders of the edit modal.
-   Fixed issue where publishing individual relationships would send an unpublish request.
-   Content within `<script>` tags is no longer subject to spell checking.
-   Unpublishable outputs no longer appear as publishable in the publish modal.
-   Notifications that failed to be sent due to long subject lines are now truncated.
-   Required smart fields no longer prevent form submission if they're hidden.
-   The `[` keyboard shortcut will once again re-open the Site Content sidebar.
-   Unchecking deprecated WYSIWYG Data Definition field options will no longer put the Data Definition into an unusable state.
-   Clicking the Add radio during the spelling content check no longer focuses the Fix radio.

## [v8.6.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.6.1/index.html)

### Issues Fixed

-   Date columns on asset relationship screens are sorted correctly now -- chronologically instead of alphabetically by their relative time descriptions
-   Thumbnails in the Folder gallery view are more readable.
-   System-wide Editor Configuration is editable again
-   LDAP configurations and Publish Triggers can be submitted again
-   Closing Editor Configuration chooser when editing a Data Definition works again.
-   Links to assets in a number of places in the system were not displaying correctly.

## [v8.6](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.6/index.html)

### Features/Improvements

-   Accessibility, link, and spelling content checks are now part of a unified interface and can be enabled/disabled at the site or system levels.
-   Content checks for users can now be enforced through the use of Site Role abilities.
-   Added ability to upload multiple files simultaneously without requiring a zip file.
-   Instances using custom authentication can now redirect users who don't exist within Cascade CMS to a custom URL.
-   Added ability to choose a toolbar color in System Preferences to help differentiate multiple Cascade CMS instances.
-   Added additional context such as site name and path to asset links in search results, chooser panels, My Content area, and more.
-   Regions without in-context editing enabled are no longer highlighted on hover.
-   Added ability to publish to Amazon's Simple Storage Service (S3) through a new Transport type.
-   Added support for FTPS Transport protocol.
-   Added the ability to authenticate SFTP Transports with an SSH key and optional passphrase.
-   Added "Live" link to File view screen (under the More menu) to view the file on the live website using the Site's URL.
-   Added API method `StructuredDataNode.hasTextValue()`
-   Added error indicators to form tabs and sections to help with tracking down field errors.
-   Added the ability to remove extensions from internal links during publish. Extensions to remove are specified at the Destination level (for internal links) and Site Settings (for cross-site links).
-   Exceptions/errors during asset rendering are no longer being output to log files, which will help reduce "error spamming" and the overall size of log files. These errors will still be shown within the application and publish reports or more detailed logging can be used.
-   It is now possible to update an LDAP user's binding DN via Web Services

### Issues Fixed

-   Helped alleviate Google Analytics daily quota restrictions.
-   Fixed issue where it was not possible to ignore links in the Broken Links report.
-   Fixed issue where versions modal didn't properly list versions sorted by date.
-   Fixed issue where `StructuredDataNode.getTextValues()` returned an empty string for checkboxes and multi-selectors.
-   Fixed editing of existing folders for SQL Server.
-   Fixed Daily Content Report for Oracle.
-   Fixed issue where it was not possible to view a group's workflows under the More menu.
-   Fixed issue where scripts were being stripped from links in the WYSIWYG.
-   Fixed issue where it wasn't possible to edit or delete users with numeric usernames starting with 0.
-   Fixed issue where workflow expiration emails were sent to deleted users, resulting in an error.
-   Fixed issues with asset submission: duplicate submits allowed, check for recent edits not happening in certain cases, and draft saves/submits indistinguishable in log files.
-   Fixed issue with web services where `includeInStaleContent` was not returned in folder read operations.
-   Fixed issue where the User avatar within the Welcome dashboard widget would not appear correctly.
-   Fixed issue where it was not possible to select items after navigating directly to page in a paginated list.
-   Fixed issue where choosing "Select all on page" incorrectly selected filtered assets in a list.
-   Fixed issue where long asset names or paths overlapped adjacent columns in data tables.

## [v8.5](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.5/index.html)

### Features/Improvements

-   Submit and Publish reminder notifications have been moved to bottom-center to avoid obscuring frequently used controls at top right.
-   Added the ability to include participants to tasks.
-   Users can now schedule a recurring Review Date on assets.
-   Added a visual Workflow Definition viewer.
-   Help text can now be added to metadata fields to provide additional context/information.
-   Added content health alerts for pages with most broken links and most views to the Daily Content Report.

### Issues fixed

-   Google Analytics Report Overview should now appear again at the top of the Google Analytics Report
-   Google Analytics Connector "Unkown metric(s)" errors have been fixed
-   Re-added the ability to search within Role and User/Group choosers
-   Re-added asset relationship checks on Site deletion
-   Relaxed automated renaming on File upload to no longer remove capitalization
-   Removed asset links from Recycle Bin table since those assets can no longer be interacted with
-   Allow multiple emails in LDAP report
-   Addressed issue where custom scrollbar is not always visible until the user interacts with the scrollable container
-   Addressed an issue where dropdown fields with no default value pre-selected the first item instead of being empty
-   Web Services Folder `read` operations will no longer include assets that are non-current versions
-   Addressed an issue where workflow Advance﻿ and locked asset Commit Changes buttons were not clickable after editing a working copy
-   Trailing spaces are now removed from Radio field values
-   Very long asset names are now truncated when viewing a Folder's contents

## [v8.4.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.4.1/index.html)

### Issues Fixed

-   Upgraded TinyMCE from v4.5.1 to v4.5.7 to address issues with image selection and alignment in browsers including Chrome and Firefox (and included [numerous other improvements/fixes](https://www.tinymce.com/docs/changelog/#version457-april252017))
-   Added "Decimal" option to ordered list styles dropdown
-   Advanced submit when creating assets will only show available Create Workflows
-   Changing the parent Folder when creating/editing an asset will update available Workflows from the new parent Folder
-   Fixed a JavaScript error that was being thrown when viewing a draft or working copy of an asset

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

## [v8.3](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.3/index.html)

### Improvements

-   Use user's full name instead of username when generating user profile
-   Improve icon set with more intuitive icons for various asset types and common actions
-   Improve user's experience when uploading an asset in file chooser
-   Upgrade bundled Tomcat to 8.0.41
-   New system preference has been added which controls the display style for asset links.  This preference will override the existing user preference "Show asset's Title or Display Name if available" if a user has not saved that preference.

### Issues fixed

-   Fixed "Unsupported radio choice" issue when fixing errors on datacheck screens
-   Fixed issue where internal links with anchors aren't pre-populated in insert/edit link chooser
-   Fixed issue when viewing a Symlink with a expiration folder
-   Fixed Advanced Search and Replace screen (Administration -> Search and Replace)

## [v8.2.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.2.1/index.html)

### Issues fixed

-   Fixes a critical bug where Data Definition dropdown fields that allow custom values get cleared when rendering an edit form.
-   Fixes a bug where unselecting rows in tables would sometimes keep them selected in memory.
-   Contains a performance improvement related to user avatars.

## [v8.2](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.2/index.html)

### Improvements

-   Help text is now more readable
-   Context menu can now be accessed on chooser buttons using right click

### Bug Fixes

-   Error when viewing a data definition block with hidden groups
-   Notifications screen does not show all notifications on first load
-   Links to 'read' notifications links do not work as expected
-   User can attempt to start a new workflow on an asset already in a workflow
-   Deleting the last comment in a comment thread makes it impossible to reply to the comment thread
-   Publishing all relationships on an asset causes future publishes using the bulk publish tool (on the Folder view screen, for example) to publish all relationships on the previous asset instead of the currently selected assets
-   "Settings" link in mobile "hamburger" menu does nothing
-   Assets can be unintentionally copied twice by quickly clicking the Copy button on the Copy modal
-   In certain scenarios, data definition block renderings get cached with invalid data if they contain index block renderings
-   Renaming or moving an asset through workflow does not work
-   Publishing assets in bulk (like from the Folder view screen) can actually unpublish the assets if assets have been unpublished using the bulk unpublish tool recently
-   Comments on tasks are no longer displayed when viewing a task

## [v8.1.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.1.1/index.html)

### Features/Improvements

-   Added: new [JSON-based REST-like API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html)
-   Improvement: Sort drafts by last modified by default in My Content
-   Improvement: Make Asset Comments more prominent and easily accessible in the action menu
-   Improvement: additions to the query and Velocity tool APIs
-   Improvement: an automatic vertical resizer to the editor
-   Improvement: Changed wording of Advanced Submit modal to better clarify intention of Submit and Check Content & Submit options.

### Issues fixed

-   Fixed: re-worked right flyout panel to improve keyboard accessibility
-   Fixed: Issues with timestamps on draft overwriting alert
-   Fixed: Compare with Current functionality missing for Working Copy view
-   Fixed: Accessibility issues in data definition group controls, broadcast messages and datepickers
-   Fixed: Workflow Definition 'allowReassignments' checkboxes lose their value if you click on the workflow builder first when editing
-   Fixed: Left navigation and Folder content tables don't update when assets are moved, renamed, copied, or deleted
-   Fixed: Locator Tool: Accessing a page's structured data via the Cascade API can result in LIE
-   Fixed: Wysiwyg dropdown menus not keyboard accessible
-   Fixed: Custom values in dropdowns do not persist on subsequent edits
-   Fixed: assets that don't render properly saved in user history cause subsequent pages to fail to load
-   Fixed: Invalid broken links reported when a create draft changes site
-   Fixed: Can't get to assets when "Asset Tree Display" preference is set to "Folders only"
-   Fixed: Web Services: Blocks can not be read if underlying Data Definition has a field added to it
-   Fixed: Application version no longer appears in flyout menu
-   Fixed: Update submit flow for index blocks to match flow used by other asset types in Site Content area.
-   Fixed: TinyMCE: Source editor initializes with stacked content and scrolling incorrect when in full screen
-   Fixed: TinyMCE: source editor styling issues due to cached styles between upgrades that should have been cache invalidated
-   Fixed: Format Editing UI: previewing a very large Index Block causes draft submission to fail

## [v8.1](https://www.hannonhill.com/cascadecms/latest/releases/8.1/index.html)

### Improvements

-   Added user tasks
-   The editing process is now streamlined for users who are able to skip the preview step
-   Added support for MySQL 5.7; deprecates 5.1
-   Improved performance of loading notifications (even a massive amount)
-   Notifications now include a button to mark all notifications as read and a button to delete all notifications
-   Updated Web Services search functionality to match new Search behavior
-   Can now permanently ignore a broken link in the Broken Link Report
-   Can now view a reason a link is considered broken in the Broken Link Report
-   Broken link types and reasons are now filterable in the Broken Link Report
-   Minor broken Link Report UI Improvements
-   Improved button focus style and increased button contrast
-   Improved focus style in a table of selected assets
-   Clicking the main menu automatically highlights Help & Support button
-   Faster switching between Site Management module types

### Issues Resolved

-   Links ignored in the Broken Link Report are now also ignored in the submit link checker
-   Unable to go directly to deep-link for assets immediately after login using custom authentication
-   Adjustment width and height of the code editor window to better handle smaller screens
-   On mobile, the code editor's window is now fullscreen. This ensures the submit/cancel buttons are always visible.
-   No longer using an iframe for the code editor, which fixes various issues including: code editor components being cut off and a flash of an un-styled textarea before the code editor initialized
-   IE11 no longer throws a JavaScript error on draft view preventing the content from loading
-   Fixed a JavaScript error when a region with invalid XML is encountered
-   Fixed inconsistently named Structured Data/Data Definition/XHTML block in header areas
-   Adds content insertion options in TinyMCE right-click context menu for images/links
-   Fixed missing template name in configure tab of pages
-   When viewing a template, regions are now listed in alphabetical order
-   Fixed unread notification tab from showing read notifications
-   Fixed show all pagination throwing an error in Broken Link Report
-   Fixed no link to resume identity on mobile devices
-   Fixed show all pagination shows no matching records on Content Ownership report either with/without search term
-   Fixed search/replace discrepancies; search includes partial matches and replace is now case insensitive
-   In some cases, core TinyMCE plugins (e.g. the Visual Blocks plugin) were unable to load their associated CSS file, causing the plugin to appear broken

## [v8.0.2](https://www.hannonhill.com/cascadecms/latest/releases/8.0.2/index.html)

### Improvements

-   Added a method to Serializer tool that serializes XML into JSON.  Can be used the convert a JDOM Element or an XML String to JSON using SerializerTool.toJson($element, true/false) or SerializerTool.toJson($string), respectively.
-   Allow Dynamic Metadata field values to be greater than 250 characters
-   API Updates - Improvements for both the Locator Tool and the Cascade Java API ([Details](https://www.hannonhill.com/cascadeserver/Cascade-API/Cascade API Changelog/index.html))
    -   New properties available
        -   $asset.linkingAssets - Returns a list of assets that reference the current asset (a programmatic way to retrieve the contents of the Relationships screen for an asset)
        -   $asset.assetType - Returns a String representing the type of the asset (e.g. "page" for pages)
        -   $block.blockType - Returns a String representing the specific type of a block (e.g. "feed", "index")
        -   $format.formatType - Returns a String representing the specific type of a format (e.g. "xslt", "script")
        -   $folderContainedAsset.site - Returns a com.hannonhill.cascade.api.asset.admin.Site representing the site in which a FolderContainedAsset (e.g. Page, File, Folder) resides.
        -   $administrationAreaAsset.site - Returns a com.hannonhill.cascade.api.asset.admin.Site representing the site in which a SiteManagementAreaAsset (e.g. Metadata Set, Data Definition) resides.
        -   $site.url - Returns the site URL property of a Site.
    -   New method available: $\_PropertyTool.isEmpty($something) - Determines if a String is null or empty.  An empty String is equal to "" after all stray space characters have been removed.

### Issues Resolved

-   Smart Fields in groups-restricted field sets do not work correctly for users who cannot see the smart field
-   Safari 10 - Main asset content overlaps edit options panel
-   Can't change LDAP configuration to use Secure port 636
-   Short usernames cause the user dropdown to be chopped off on the right side
-   TinyMCE dialogs cannot be focused
-   Publish Trigger configuration UI is broken

## [v8.0.1](https://www.hannonhill.com/cascadecms/latest/releases/8.0.1/index.html)

### Improvements

-   Add support for SMTPS
-   Add "Full Screen Preview" option to pages
-   Add $\_.locateReference to Locator Tool
-   Add support for SFTP key exchange algorithms

### Issues Resolved

-   Fixed an issue in Workflow Builder where user and group chooser in ordered steps was not persisting selected asset
-   Fixed problems with installing Cascade 8 as Windows service
-   Fixed an issue where chooser's Recent and Browse Search fields were not searching and were resulting inconsistent site location
-   Addressed issues with text being overrun and other small issues in mobile view
-   Fixed issues with inability to verify/edit WordPress Connector
-   Improved speed of Recent tab in chooser in Firefox Browser
-   Fixed Search box in chooser in Firefox
-   Fixed Metadata Set editing"Asset failed validation" error
-   Addressed rendering issues in Data Definition pages and blocks
-   Fixed deleting assets through multi-op Unpublish on Delete
-   Fixed links inside of Workflows Dashboard widget
-   Fixed viewing Site Role's Users and a System Role's Groups on Oracle/SQL Server
-   Allowed using '#' in strings in imported Velocity Formats
-   Fixed issues where SFTP Shuttle initialization retries were leaving a connection open to the SFTP server

## [v8.0](https://www.hannonhill.com/cascadecms/latest/releases/8.0/index.html)

### Issues Resolved

-   Fixed issue where Index Block Rendering Cache doesn't get discarded when an asset referenced in a Data Definition Block or Index Block is moved
-   Fixed issue where Cascade does not shutdown completely due to running Jetty threads
-   Fixed issue where unable to set Metadata Set expiration folder field visibility and required in Web Services
-   Fixed issue where element expansion produces invalid self-closing HTML elements
-   Fixed issue where auditing messages were swapped for assuming and un-assuming users
-   Fixed issue where Google Analytics sync would fail when no data exists for the time interval
-   Fixed issue where search indexes were not automatically being rebuilt in the file system when they didn't exist on startup
-   Fixed issue where Global CSS would override the Site CSS in Structured Data Blocks with multiple WYSIWYGs
-   Fixed issue where errors would occur as a result of deleting Content Types and Metadata Sets (and parent containers) being referenced by working copies of Pages, Files, etc. Now prevents deletion of those Content Types, Metadata Sets, or Containers until Working Copies are removed.
-   Fixed issue where Symlink URLs were limited to a 250 character length
-   Fixed issue where 'Publish all relationships' button loads blank page for Administration area assets
-   Fixed issue where certain 'Login Failed' messages would not provide additional details in the log file
-   Fixed issue where user input can cause parse errors Advanced Search

### Additional Notes

The Administration and Manage Site areas are now completely separate in Cascade CMS 8. As a result, Roles (that were not the Administrator role) who may have previously had access to Administration only have access to Manage Site.