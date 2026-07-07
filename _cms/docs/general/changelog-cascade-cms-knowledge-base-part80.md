---
parent: Changelog
section: [v8.15](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.15/index.html)
part: 80 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.15](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.15/index.html)

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
