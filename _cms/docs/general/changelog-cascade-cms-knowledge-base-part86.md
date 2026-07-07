---
parent: Changelog
section: [v8.11.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.11.1/index.html)
part: 86 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.11.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.11.1/index.html)

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
