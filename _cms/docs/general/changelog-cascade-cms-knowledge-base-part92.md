---
parent: Changelog
section: [v8.8](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.8/index.html)
part: 92 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.8](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.8/index.html)

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
