---
parent: Changelog
section: [v8.24](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.24/index.html)
part: 26 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.24](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.24/index.html)

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
