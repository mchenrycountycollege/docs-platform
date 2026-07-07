---
parent: Changelog
section: [v8.22.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.22.1/index.html)
part: 42 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - [v8.22.1](https://www.hannonhill.com/cascadecms/latest/releases/cascade-cms-8.22.1/index.html)

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
