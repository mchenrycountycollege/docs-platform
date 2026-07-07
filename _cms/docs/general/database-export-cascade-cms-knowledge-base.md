---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/database-tools/database-export.html
title: Database Export - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Database Tools

# Overview[](#Overview)

The Database Export is a support tool that exports the entire Cascade CMS database to a file, so that Hannon Hill can replicate a client database locally without the client having to go through the trouble of performing a database backup or stopping the server.

The Database Export tool should not be used to back up the Cascade CMS database as a part of routine server maintenance. Standard database backup procedures should be followed.

**Notes:**

-   It is strongly recommended that exports be performed during periods of low activity as exporting can take a considerable amount of time and overall system performance may be impacted.
-   This functionality is intended for use by Hannon Hill Support staff as part of troubleshooting for specific issues/problems. It is not intended to be used for any other purpose.
-   This tool is not available in Cascade Cloud.

# Exporting the Database[](#ExportingtheDatabase)

To perform a database export:

1.  Click the system menu button ( ) > **Administration** > **Export Database**.
2.  Configure the following options:  
    1.  **Include contents of File assets** - Enable this option only if you've been instructed to do so by Hannon Hill Support, as this can add significant time to the export process.
    2.  **Keep temporary export file** - Enable this option if you'd like to be able to keep the export on the server filesystem to be retrieved manually later.
3.  Click **Export**.
4.  Wait until the message "Please wait. Your export is being created. This can take a long time." is replaced with the message "Export has completed successfully!"
5.  Click the download link to download the database export.

# Enabling Snapshot Isolation on SQL Server[](#EnablingSnapshotIsolationonSQLServer)

SQL Server needs to have snapshot isolation enabled in order to export the database. To enable snapshot isolation, have the DBA execute the following queries and attempt the export again.

`ALTER DATABASE [databaseName] SET ALLOW_SNAPSHOT_ISOLATION ON  ALTER DATABASE [databaseName] SET READ_COMMITTED_SNAPSHOT ON`

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }