---
parent: Changelog
section: [v8.16](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.16/index.html)
part: 78 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.16](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.16/index.html)

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
