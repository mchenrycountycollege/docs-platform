---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/cascade-8-upgrade-prep.html
title: Cascade CMS 8 Upgrade Prep Guide - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Installation & Upgrades

# Remove Content from the Global Area[](#RemoveContentfromtheGlobalArea)

As of Cascade CMS Version 8, the Global area for content no longer exists. All content and components must be stored and managed in Sites. Before beginning the upgrade process, Cascade CMS will check to ensure that no content remains in the Global area or the Global area's recycle bin. If any content remains in either area the upgrade process will stop.

Before upgrading to Cascade CMS Version 8 please verify that the Global area is completely empty by taking the following steps:

-   Ensure that there are no assets visible in the Global area's asset tree other than the base Folder or any base Administration area Container, except the Default Metadata Set. If any assets remain, they should be deleted as long as they are not being referenced by assets that are in Sites. Assets in the Global area referenced by assets in Sites must be migrated using the Site Migration Tool or manually by recreating the asset inside a Site and reassigning any assets that point to the old asset so that they point to the new asset. Note that Page assets without a Content Type migrated from the Global area into Sites must be assigned a Content Type before or after upgrading before they can be edited. (See [Assign Content Types to Page Assets](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/cascade-8-upgrade-prep.html#AssignContentTypestoPageAssets).)
-   Ensure that there are no assets in the Global area's recycle bin. The recycle bin can be accessed from the Global area Dashboard or the Quick Links menu at the top right of the screen. If there *are* assets remaining in the Global area's Recycle Bin, you can use the Empty Recycle Bin link at the bottom of the recycle bin tab to remove them all at once.
-   Ensure that there are no active workflows in the Global area, including "Create" workflows.
-   Optional: Ensure that no assets in Sites use the Global area's Default Metadata Set. This can be verified by navigating to it in the Global area's Administration area and viewing the Relationships tab. Alternatively, any assets that still use the Global area's Default Metadata Set will be automatically updated to use a copy of the Default Metadata Set after the upgrade. (See [Auto-Migrated Global Site](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/cascade-8-upgrade-prep.html#Auto-MigratedGlobalSite).)
-   Optional: Ensure that there are no "Create" drafts for any user in the Global area. To remove "Create" drafts for users other than yourself, assume the identity of those users, navigate to the Drafts tab on their respective Home area Dashboards, and bulk delete all remaining drafts. The ability to assume another user's identity is only available in version 7.14.x and above. Alternatively, any remaining "Create" drafts in the Global area will be automatically moved to the base Folder of the Auto-Migrated Global Site after the upgrade. (See [Auto-Migrated Global Site](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/cascade-8-upgrade-prep.html#Auto-MigratedGlobalSite).)

If you are a Cascade CMS Cloud customer, please follow the steps above and then contact support \[at\] hannonhill.com to coordinate a test of the upgrade.  
  
If you are using Cascade CMS on premise, please create a copy of the database and test upgrading the copy in a [test environment](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/test-server.html). If the upgrade stops, the log file will list ids, paths, and types of all assets that must be updated, moved, or removed before the upgrade can complete. You should be able to access these assets (except for draft assets) directly by pasting the id and type included in each log message into the following URL:  
  
http://{cascade-domain.com}/entity/open.act?id={id}&type={type}  
  
Note that if you delete assets, the recycle bin should be emptied as a final step.

# Assign Content Types to Page Assets[](#AssignContentTypestoPageAssets)

The elimination of the Global area in Cascade CMS version 8 means that Page assets must be managed in Sites and are therefore required to have a [Content Type](https://www.hannonhill.com/cascadeserver/Content-Type/index.html) assigned to them.

Pages without an assigned Content Type may be migrated out of the Global area into a Site(s); however, upon upgrade they must be assigned a Content Type before changes to them can be submitted. It's recommended that this be done prior to the upgrade to avoid confusion on the part of content editors.

The following query will help identify any current version of a Page which does not have a Content Type assigned.

`select * from cxml_foldercontent where assetType = 'PAG' and isCurrentVersion = 1 and contentTypeId is null;`

# Query Database to Verify Its Upgradability[](#QueryDatabasetoVerifyItsUpgradability)

If you have access to the Cascade CMS database, you can run the following queries to ensure the system contains no problematic assets before attempting the upgrade.

If any of these queries return more than 0 rows, the database is not ready to be upgraded. These queries are read-only and can be be performed against a running Cascade Server 7 instance and database before attempting the Cascade CMS 8 installation. These queries should be run as many times as needed until they all return 0 results.

Steps to resolve any issues that arise as a result of running these queries can be addressed using suggestions outlined in the [Remove Content from the Global Area](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/cascade-8-upgrade-prep.html#RemoveContentfromtheGlobalArea)section.

`select fc.id, fc.cachePath, fc.assetType, fc.isRecycled, fc.isCurrentVersion, fc.isWorkingCopy, fc.draftOriginalId, fc.draftUserId, fc.workflowId from cxml_foldercontent fc left join cxml_recyclerecord rr on fc.recycleRecordId = rr.id where fc.siteId is null and fc.id != 'ROOT' and (rr.recycleState != 2 or rr.recycleState is null) and (fc.isCurrentVersion = 1 or fc.isWorkingCopy = 1 or fc.draftOriginalId is not null); select id, path from cxml_assetfactory where siteId is null; select id, path from cxml_assetfactorycontainer where id != 'ROOT_assetfactorycontainer' and siteId is null; select id, path from cxml_contenttype where siteId is null; select id, path from cxml_contenttypecontainer where id != 'ROOT_contenttypecontainer' and siteId is null; select id, path from cxml_destination where siteId is null; select id, path from cxml_target where id != 'ROOT_target' and siteId is null; select id, path from cxml_metadataset where id != 'ROOT_metadataset' and siteId is null; select id, path from cxml_metadatasetcontainer where id != 'ROOT_metadatasetcontainer' and siteId is null; select id, path from cxml_pageconfigurationset where siteId is null; select id, path from cxml_pageconfigsetcont where id != 'ROOT_pageconfigsetcontainer' and siteId is null; select id, path from cxml_publishset where siteId is null; select id, path from cxml_publishsetcontainer where id != 'ROOT_publishsetcontainer' and siteId is null; select id, path from cxml_structureddatadefinition where siteId is null; select id, path from cxml_structureddatadefcont where id != 'ROOT_structureddatadefcontainer' and siteId is null; select id, path from cxml_transport where siteId is null; select id, path from cxml_transportcontainer where id != 'ROOT_transportcontainer' and siteId is null; select id, path from cxml_workflowdefinition where siteId is null; select id, path from cxml_workflowdefcontainer where id != 'ROOT_workflowdefinitioncontainer' and siteId is null;`

# Auto-Migrated Global Site[](#Auto-MigratedGlobalSite)

On upgrade, if certain problem assets associated with the Global area are detected:

-   A new Site named "\_Auto-Migrated Global\_" will be created. This Site is not given any permissions or assigned any Users, so only Administrators or Users who have the "Access All Sites" ability enabled will be able to access it.
-   Any assets that referenced the Global area's Default Metadata Set before the upgrade will be updated to use a copy of the Default Metadata Set (including dynamic fields) in the Auto-Migrated Global Site. The Relationships view can be used to re-assign these assets after upgrade.
-   Problem assets detected will be moved into the base Folder of the Auto-Migrated Global Site and can be dealt with after upgrade.

# Rolling Back Cascade[](#RollingBackCascade)

In the event that the Cascade CMS 8 startup check prevents you completing the upgrade and you are unable to login to the system, it is possible to run a special version of Cascade Server 7 against the same database.  This allows you to address any startup errors without having to roll back the database itself.

To run a compatible version of Cascade Server 7 against a database that has been modified by Cascade CMS 8, use the following steps:

1.  Download the [Cascade Server 7.14.last `ROOT.war` file](https://hannonhill-public.s3.amazonaws.com/downloads/cascade/7.14.last/ROOT.war).  *Note that this version of Cascade Server 7 is only to be used when upgrading to Cascade CMS 8 and is not intended to be used in production.*
2.  Stop Cascade CMS 8 using `cascade stop` (Windows) or `cascade.sh stop` (Linux/OSX).  Windows users who have installed Cascade as a service should stop the service.
3.  Go into your Cascade CMS 8 installation directory and copy the existing `ROOT.war` file that resides in the `/tomcat/webapps` directory and store it somewhere that will be easily accessible later but outside of the install directory (i.e. not in the `/tomcat/webapps` directory).
4.  Delete both the `ROOT.war` file and `ROOT` directory inside the `/tomcat/webapps` directory.
5.  Take the `ROOT.war` file that was downloaded in Step 1 and place it in the `/tomcat/webapps` directory.
6.  Run the following database query:
    -   `delete from DATABASECHANGELOG where ID = '8_0 migration';`
7.  Start Cascade using `cascade start` (Windows) or `cascade.sh start` (Linux/OS X). Windows users running Cascade as a service should start the service.
8.  Cascade Server 7 is now running against your existing database and you can address any startup errors that occurred when attempting the Cascade CMS 8 upgrade.

Once you have addressed all issues contained in the Cascade CMS 8 startup logs, you should re-run the queries in the [Query Database to Verify Its Upgradability](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/cascade-8-upgrade-prep.html#QueryDatabasetoVerifyItsUpgradability) section to verify the system is ready for upgrade. Once complete, reinstall Cascade CMS 8.

1.  Stop Cascade Server 7 using `cascade stop` (Windows) or `cascade.sh stop` (Linux/OSX).  As mentioned in the initial steps, Windows users running Cascade as a service should stop the service.
2.  Go into your Cascade CMS 8 installation directory (now using the Cascade Server 7 `ROOT.war` file) and remove both the `/tomcat/webapps/ROOT.war` file and the `/tomcat/webapps/ROOT` directory.
3.  Retrieve the `ROOT.war` file that was created in Step 3 above, and move it into the `/tomcat/webapps` directory.
4.  Start Cascade 8 using `cascade start` (Windows) or `cascade.sh start` (Linux/OS X). Windows users running Cascade as a service should start the service.

Once the log file is clear of Cascade 8 startup errors, you will be able to log in to Cascade 8!

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }