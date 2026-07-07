---
parent: Changelog
section: [v8.7.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.7.1/index.html)
part: 93 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.7.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.7.1/index.html)

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
