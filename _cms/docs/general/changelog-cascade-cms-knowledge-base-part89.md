---
parent: Changelog
section: [v8.9.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.9.1/index.html)
part: 89 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.9.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.9.1/index.html)

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
