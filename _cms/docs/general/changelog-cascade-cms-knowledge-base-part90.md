---
parent: Changelog
section: [v8.9](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.9/index.html)
part: 90 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.9](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.9/index.html)

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
