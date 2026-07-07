---
parent: Changelog
section: 20221229
part: 44 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20221229

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
