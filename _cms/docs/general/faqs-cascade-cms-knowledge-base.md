---
source: https://www.hannonhill.com/cascadecms/latest/faqs/index.html
title: FAQs - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

# Frequently Asked Questions

Welcome to our Frequently Asked Questions (FAQs). Here you'll find advice and answers from the Cascade CMS Product Support team. Select a category below or use the search box above to search for answers.

## General / How To

25 articles in this collection.

[

## How do I edit content or find out where to edit a certain region?

You may be able to edit your page content by simply clicking Edit at the top of the page, making any changes, submitting and then publishing. However, if you don't see the content you want to edit when editing the page, that content could be contained elsewhere. The content may be located in a...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/where-to-edit-content-certain-region.html)[

## How do I upload a folder?

In addition to uploading individual files, Cascade CMS also supports the ability to upload an entire folder. To do this, you must first zip up the folder in question along with its contents.Once you have a zip file containing your folder(s), upload it by following the steps below: Click Add...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/upload-a-folder.html)[

## How do I unlock a page or asset?

First, make sure you're looking at the working copy. Look for the drop-down to the left of the title. If it says Current, click it and select Working Copy. If you're the lock owner: You should now see options to either Commit Changes you've made, or Break Lock and discard those...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/unlock-page-or-asset.html)[

## How do I restore something I deleted from the trash / recycle bin?

The Trash bin is located above the left-hand folder tree when you're in the Site Content area. To restore one or more items from the Trash, select the checkbox next to the items and click the Restore button at the top of the list. Note for users - If you don't see the the Trash bin,...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/restore-from-trash.html)[

## How do I give a User or Group access to a Site?

In order to access a Site via the Site drop down menu, a User must have a Site Role assigned to them at the Site level (either directly or via their Group membership).To see which Users/Groups have Site Roles assigned to them for a specific Site: Navigate to Manage Site > Site Settings. Click...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/give-user-or-group-access-to-site.html)[

## How do I control User access to Folders and assets?

You can control Read/Write access to Site assets through Access rights. Access rights, or permissions, control which Users or Groups can view or edit assets. While viewing an asset (such as a Folder): Click More > Access. Select the Access level for all users. (Selecting None here will hide...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/control-user-access-to-folders-and-assets.html)[

## How can I check what a User can do in a specific Site?

A user’s abilities in a Site will be determined by the Site Role that they are assigned to for that Site. There are a couple of very handy tools that you can use to quickly identify how your Users are configured.

](https://www.hannonhill.com/cascadecms/latest/faqs/general/check-what-user-can-do-in-site.html)[

## How can I tell who edited or published a page?

Audit trails provide a list of activities by users in Cascade CMS which can be handy when tracking down a particular event. Viewing an asset's audit trail While viewing an asset (such as a page or file) click More > Audits. You can filter the audit trail by timeframe or type of action. If you...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/who-edited-or-published-a-page.html)[

## How do I change the name or URL of my site?

To change the name and/or URL of your Site: Access your Site from the Sites system menu, the Site drop-down menu, or the My Sites widget on your dashboard. Once inside your Site, click Manage Site > Site Settings. Update the Name and/or URL field in the Properties tab. Click Submit.

](https://www.hannonhill.com/cascadecms/latest/faqs/general/change-name-or-url-of-site.html)[

## How do I delete a site?

To delete a site in Cascade CMS: Click the menu button ( ) in the upper-right corner of the interface. Click Sites. Select the site from the Sites list by checking the checkbox next to it. Click the Delete icon at the top of the list. Note: You can only delete one site at a...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/delete-a-site.html)[

## How do I publish changes to a block?

Blocks, such as XHTML/Data Definition blocks, aren't publishable by themselves. If you've made changes to a block, such as a navigation block, and you're not seeing your changes on your live site, you'll need to publish any pages that use that block. For blocks used on all or most every page in a...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/publish-changes-to-a-block.html)[

## How do I rebuild my search indexes?

Search indexes can be rebuilt by following these steps: Click Menu > Administration. In the Search section, click Search Indexing. Confirm that your Index Location is correct (this directory should exist on the application server directly under the tomcat folder, by default it will be named...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/rebuild-search-indexes.html)[

## How do I configure 301 Redirects?

301 redirects should be handled by a configuration file on your web server. For example, an .htaccess file if using an Apache-driven web server or a web.config file if using a Microsoft (IIS) web server. While there is not a native feature in Cascade CMS regarding 301 redirects, you can maintain...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/configure-301-redirects.html)[

## How does the Max Asset Versions setting affect existing versions?

If you adjust the Max Asset Versions setting under Administration > Preferences > Content and the new value causes a given asset to have more than the allowed number of Versions, the Version chain will be trimmed for this asset the next time it's edited and submitted. For example, consider...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/max-asset-versions-setting.html)[

## Where can I find publish notifications?

To locate publish notifications for assets that you have published: Click your User profile picture or letter in the top-right corner of the screen. In the dropdown menu that appears, select Notifications. The subject line for a publish notification will look something like the...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/locate-publish-notifications.html)[

## How can I find the O/S account running Cascade CMS?

To find out which O/S account is running the application: Navigate to the Logs and System Information area Scroll down to the User Name field The value entered for this field is the account under which Cascade CMS is currently running.

](https://www.hannonhill.com/cascadecms/latest/faqs/general/how-can-i-find-the-os-account-running-cascade-cms.html)[

## How can I generate a cron expression for my scheduled publishes?

When working with scheduled publishes in the CMS, one option for scheduling is to provide a cron expression. Since Cascade CMS uses Quartz for scheduling, the syntax for cron expressions may be slightly different from other applications where you've set up cron tasks. In order to generate...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/how-can-i-generate-a-cron-expression-for-my-scheduled-publishes.html)[

## How do I delete a Workflow?

To delete a Workflow: Navigate to your workflow Click the Delete Workflow button in the top right of your screen Tip: Having trouble locating your Workflow? Here are a few ways to get back to it: Navigate to the asset in Workflow and click the corresponding link to the workflow in the top...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/how-do-i-delete-a-workflow.html)[

## How do I determine where assets will be published?

Cascade CMS determines where to place files using a combination of the following values: The Transport Server Directory (if blank, the FTP/FTPS/SFTP user’s home directory). The Destination Directory. The folder path of your asset in your Site. For example, consider the following...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/how-do-i-determine-where-assets-will-be-published.html)[

## Scheduled publishing for individual assets

Both the Start Date field (in an asset's Metadata) and the Optionally Publish Later option provide a way to schedule an asset to publish at a future date/time. See below for notes on when to use one versus the other: Start Date The Start Date field, which is part of an asset's Metadata, allows...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/scheduled-publishing-for-individual-assets.html)[

## Granting Access to Specific Folders for Users/Groups

Since Sites typically consist of multiple Folders, there may be scenarios where you're looking to 'hide' many of those from particular Users and/or Groups. Take the following Folder structure into consideration: <Base Folder of Site> FolderA PageA PageB FolderB FolderC Now, consider...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/granting-access-specific-folders-users-groups.html)[

## How do I rename an asset?

To rename an asset: While viewing the asset, click More -> Rename (you can also do this via the context menu) In the New "asset" Name field, enter the new name Click Rename Warning: Renaming an asset will result in the asset being unpublished from all enabled...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/how-do-i-rename-an-asset.html)[

## How do I reorder items in a navigation menu?

One of the most common strategies for implementing a navigation menu is to dynamically output links to the assets contained within a particular Folder. This type of setup often relies on the ordering of those items within that Folder when deciding how to display them within a navigation menu. To...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/how-do-i-reorder-items-in-a-navigation-menu.html)[

## Which algorithms are supported for SFTP?

When publishing to an SFTP server, Cascade CMS supports the following algorithms: KEX...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/which-algorithms-are-supported-for-sftp.html)[

## Styles not loading for 404 pages

If you're managing a 404 page in the CMS and find that it doesn't display properly on your live site in certain scenarios, the issue is likely due to how CSS file(s) in the page are being referenced. To fix this, we'll want to change the link rewriting for the asset at the page...

](https://www.hannonhill.com/cascadecms/latest/faqs/general/styles-not-loading-for-404-pages.html)

[↑](#top)

## Common Error Messages

18 articles in this collection.

[

## PageRenderException: Could not transform with Script format

When previewing a page, you may see a full-page error of the type Could not transform with Script format... . This indicates that a Format responsible for rendering part of the page's content is encountering an error. The path to the Format in question will be included in the first half of the...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/could-not-transform-with-script-format.html)[

## Sorry, workflow is required to be able to continue but no workflows are available to you.

This error means that the user's Site Role doesn't allow them to Bypass workflow, but there isn't an applicable workflow available for the type of action they're taking. If your site uses workflow: Edit the appropriate Workflow Definition and ensure the user's Group is included in the Groups...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/workflow-is-required.html)[

## Login Failed

This article describes steps that Administrators can take to troubleshoot failed login attempts for their users. Note: If you are an end user receiving this message when you attempt to log in, pay special attention to uppercase and lowercase letters in your username as the system is case...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/login-failed.html)[

## Invalid XML: The prefix "o" for element "o:p" is not bound

If you receive this error when trying to create or submit changes to an asset, there may be <o:p> tags in the source code of your editor that will need to be removed or converted to regular <p> tags before the asset can be submitted. Usually these tags are leftovers from pasting...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/prefix-o-for-element-op-is-not-bound.html)[

## Table headers are poorly structured

If your content contains a table, you may see this error during accessibility checks: Table headers are poorly structured Based on the standard being violated, 1.3.1 Info and Relationships, the cause may be that your table header cells lack scope attributes "to associate header cells and data...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/table-headers-are-poorly-structured.html)[

## Header message of length \[\] received but the packetSize is only \[\]

Problem The size of the request header exceeds what's configured for the application. Solution Edit your tomcat/conf/server.xml configuration file and add a packetSize="65536" attribute to the appropriate connector. For example, change: <Connector port="8009" protocol="AJP/1.3"...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/header-message-of-length-received.html)[

## Parameters missing

This article describes steps to take when you receive a 'Parameters missing' error while attempting to submit a file or page. The error message may appear when the amount of data being sent during a submission is larger than allowed by your application server's Tomcat configuration. For example,...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/parameters-missing.html)[

## Secure LDAP sync fails after upgrade to Cascade CMS v8.11

Cascade CMS v8.11 comes bundled with a newer version of Java (JRE 8u191). This newer version of the JRE enables endpoint identification algorithms for LDAPS servers for added security. The change was included in JRE 8u181+ and more information on it can be found in the Oracle/Java Release Notes....

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/secure-ldap-sync-fails.html)[

## Error constructing implementation

When attempting to perform an operation that relies on SSL/TLS, you may see errors like the following: java.security.NoSuchAlgorithmException: Error constructing implementation (algorithm: Default, provider: SunJSSE, class: sun.security.ssl.SSLContextImpl$DefaultSSLContext) This is generally due...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/error-constructing-implementation.html)[

## The index block with path {path} renders too much data

This message is displayed when an Index Block in the system renders a large amount of data and reaches the limit configured in the system Preferences. The size at which the application will stop rendering an Index Block can be configured by doing the following: Navigate to Administration >...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/index-block-renders-too-much-data.html)[

## Could not reset lucene directory

This particular error message generally appears in the log files as: ERROR \[SearchServiceImpl\] Could not reset lucene directory, assets will not be added to search index: java.io.IOException: Cannot delete /path/to/Cascade CMS/tomcat/indexes/xxxxx The underlying problem is typically caused by the...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/could-not-reset-lucene-directory.html)[

## Search failed: no segments file found

Users attempting to perform a search within Cascade CMS may run into an error similar to the one below: Search failed: no segments\* file found in org.apache.lucene.store.FSDirectory To correct this problem, an Administrator should log into the system and follow the steps outlined here to rebuild...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/search-failed-no-segments-file-found.html)[

## Could not get file content for lucene indexing

Users may see an error similar to the following when viewing the tomcat/logs/cascade.log file: ERROR \[SearchWorkerImpl\] : Could not get file content for lucene indexing: com.hannonhill.cascade.model.render.file.FileRenderException: Could not fetch contents of file...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/could-not-get-file-content.html)[

## Could not create index writer

Error messages similar to the following may appear in the tomcat/logs/cascade.log file: Could not create index writer: org.apache.lucene.store.LockObtainFailedException:Lock obtain timed out: @/usr/local/Cascade\_Server/tomcat/indexes/write.lock To correct this problem, the following steps should...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/could-not-create-index-writer.html)[

## Invalid XML character was found in the element content of the document

When submitting an asset (like a Page or Block), users may encounter messages similar to the following: Invalid XML: An invalid XML character (Unicode: 0x2) was found in the element content of the document. In this particular case, the system has identified a control character (0x2) as appearing...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/an-invalid-xml-character-was-found-in-the-element-content-of-the-document.html)[

## Your roles do not allow you to advance workflow

This error indicates that the user's Site Role doesn't allow them to assign a Workflow to themselves or approve steps in a Workflow. To solve this, follow the steps below: Navigate to Menu -> Administration -> Roles. Edit the user's Site Role (the one they are inheriting for the Site in...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/workflow-is-unable-to-proceed.html)[

## Comparison method violates its general contract

During certain Velocity and XSLT transformations, you may encounter an error like the following: An error occurred while rendering asset preview: org.apache.velocity.exception.MethodInvocationException: Invocation of method 'sort' in class com.hannonhill.cascade.velocity.NodeSortTool threw...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/comparison-method-violates-its-general-contract.html)[

## Exception invoking method 'getAvailableIDs' in class sun.util.calendar.ZoneInfo

This particular error message is indicative of a missing startup parameter for the application. To correct this problem, see the steps below for your operating system: Linux/\*nix Stop Cascade CMS Edit cascade.sh In the JAVA\_OPTS, add the...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/exception-invoking-method-getavailableids-in-class-sun.util.calendar.zoneinfo.html)

[↑](#top)

## Troubleshooting

16 articles in this collection.

[

## Why are my changes not appearing on the web site?

If you're seeing discrepancies between your asset in Cascade CMS and on your live website, see the steps below for possible resolutions. Verify that you've submitted the job for publishing After creating or editing an existing asset in Cascade CMS, you must publish your asset in order to see your...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/changes-not-appearing-on-site.html)[

## Why can't my users see anything in the Add Content menu?

In order to see a particular item in this menu, a User must be part of a Group that is configured in the Applicable Groups field for both the Asset Factory and the Asset Factory's Container.  Steps for configuring both can be found below:  Add Applicable Groups to the...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/users-add-content-menu.html)[

## Why can't my user upload images in the WYSIWYG or file chooser?

If your users don't see the Upload tab when inserting images in the WYSIWYG or browsing for files in a file chooser, you may need to adjust some Site Role abilities. Users need these two Site Role abilities enabled in order to upload files via the file chooser: Workflow: Bypass workflow\*...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/user-upload-images-in-wysiwyg-or-file-chooser.html)[

## Why can't my users access the full search feature?

If your users see the following error message when attempting to access Full Search: Your role does not authorize you to view this resource. you may need to adjust their System Role(s). Because the Full Search and Replace feature resides in the Administration area, you will need to enable access...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/users-access-the-full-search.html)[

## Why am I seeing 'Asset does not exist' message in my Publish Notification?

This particular message indicates that the asset being published contains a link to another asset that the system is unable to locate. Refer to the following output from the Broken Links section of a sample Publish Notification: \[Destination: Production Web Site\] about/staff/directoryLink:...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/asset-does-not-exist.html)[

## How can I view the largest binary files within my database?

The following SQL queries will list files from your database from largest to smallest. SQL Server SELECT s.name as site\_name, f.cachePath, b.id, datalength(data) FROM cxml\_blob b join cxml\_foldercontent f on b.id=f.fileBlobId join cxml\_site s on s.id = f.siteid order by datalength(data)...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/view-largest-binary-files-in-database.html)[

## Where can I find the Cascade CMS log files?

The log files for the application can be found in the following areas: From within the Cascade CMS interface Users with access to the Administration area can obtain log files from the application by doing the following: Click Administration. In the Tools section, click Logs and System...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/cascade-cms-log-files.html)[

## How do I enable DEBUG logging?

Additional logging can be added for the application by following the instructions below: Click Administration. In the Tools section, click Logging Configuration. Choose a category from the dropdown or enter a class name in the text field. (Note: Class names will need to be provided by Hannon...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/enable-debug-logging.html)[

## Generating a thread dump

Get the process id (pid) of the Cascade CMS process by running the command ps aux | grep java. Results will look similar to the following: cascade 6415 1.2 67.9 8546368 5203156 ? Sl Jun28 635:49 /usr/local/cascade/java/jre/bin/java ... In this example, 6415 is the pid we're looking for. Execute...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/generating-a-thread-dump.html)[

## How can I find which Java installation my Cascade CMS instance is using?

To find the location of the Java installation that your Cascade CMS instance is using, you'll need to check the boot script for your environment:

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/find-java-installation.html)[

## Why are "g" tags appearing in the WYSIWYG editor?

If you notice that <g> tags are being inserted into your WYSIWYG's source code, for example: <g class="gr\_ gr\_00 gr\_alert gr\_gramm gr\_spell" data\_gr\_id="00" id="00">Here is some content.</g> The likely culprit is the Grammarly browser extension. You can remove those tags from...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/g-tags-in-wysiwyg-editor.html)[

## Assets are not appearing in Index Blocks

If your Index Blocks aren't rendering assets that you feel should be included, be sure to verify whether or not you may be running into one of the following scenarios: The 'Include when indexing' setting is disabled Edit the asset in question and click the Configure pane. Verify that the Include...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/assets-not-appearing-in-index-blocks.html)[

## Why does my Index Block stop indexing assets at a certain point?

There are two different settings which control the number of assets that will be indexed in an Index Block: Max Rendered Assets - this option is found in the Edit interface for Index Blocks Max Assets in Index Blocks - this option is found in Administration > Preferences > Content >...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/index-block-stops-indexing-assets.html)[

## How can I enable request logging for Cascade CMS?

Request logging for the application can be configured by taking the following steps: Stop Cascade CMS Edit the file tomcat/conf/context.xml Within the active <Context> element (for example, just before the closing </Context> tag), enter the following: <Valve...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/how-can-i-enable-request-logging-for-the-cms.html)[

## Search isn't returning expected results

The steps outlined here can be followed if the Search functionality and/or the Full Search/Replace tools aren't returning expected results. Check (or have one of your admins check) the Background Tasks Report. While viewing this report, use the Filter Results option (top right) and...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/search-isnt-returning-expected-results.html)[

## Generate a HAR file

The Hannon Hill Support Team may request that you generate a HAR file as part of a support investigation. Below we'll outline the steps to do this in Firefox, although the steps are very similar in other browsers: Navigate to the area of the CMS where the problem is occurring Open the Firefox...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/generate-a-har-file.html)

[↑](#top)

## Development

27 articles in this collection.

[

## How do I make an XML sitemap?

An XML sitemap can help inform search engines about pages in your site that are available to crawl and the date they were last modified. We have an example SEO Sitemap   Velocity Format which can be applied to an Index Block configured to index your site. Here are the steps to create a...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/make-a-sitemap.html)[

## How do I create a "calling page" Index Block?

This Index Block, which is usually referred to as a calling page or current page Index Block, is one of the most used Blocks in Cascade CMS. Creating an Index Block Select Add Content > Block > Index. Choose a system name (e.g. "calling-page"). For the Index Type field choose "Folder...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/create-calling-page-index-block.html)[

## Output content as JSON

With a combination of Template, Format, and Output, you can publish your page content as a JSON file. Template Create a Template using skip tags and a "dummy" surrounding element: <!--#cascade-skip--><pass-through><system-region...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/output-content-as-json.html)[

## How do I create an XML output for a page?

To create an XML Output for a page: Create a new Template with only the following content: <system-region name="DEFAULT"/> Navigate to Manage Site > Configuration. Select your existing Configuration and edit it. Click Add new Output. For the Name field, enter "XML". For the Template...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/create-xml-output-for-a-page.html)[

## How do I view sample XML when editing a Format?

Often times, when coding (or debugging) a Format, it is important to be able to view sample XML that may be applied to a Format. Or, if you are working with a Velocity Format, you may need to specify a context page in order to test the built in $currentPage and $currentPageSiteName variables. To...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/view-sample-xml-when-editing-format.html)[

## Testing for an empty WYSIWYG field

Testing to see if a WYSIWYG field can be tricky since the field could either contain plain text or HTML elements. One solution is to test if the value of an XML Element is not empty, or if the Element contains children (ie the HTML elements). Using Velocity With the Cascade API ## Record the...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/testing-for-an-empty-wysiwyg-field.html)[

## How do I access Dynamic / Custom Metadata Fields in Velocity?

With the XPath Tool If you're using an Index Block and the XPath Tool, you can target the name of your Custom Metadata Field in your XPath Syntax. Example: #set ($category = $\_XPathTool.selectSingleNode($contentRoot, "//calling-page/system-page/dynamic-metadata\[name='category'\]/value"))#if...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/access-dynamic-custom-metadata-fields-velocity.html)[

## How do I sort on a Calendar field?

The format of a Calendar field value (distinct from a Date/Time field) is MM-dd-yyyy which can make it tricky to sort on without some additional work to convert it to a numerical timestamp. Here are some examples of using a lookup table to sort pages on a Calendar field: With the XPathTool #set...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/sort-on-calendar-field.html)[

## How can I set up canonical tags?

This article provides a couple of sample methods for configuring canonical tags in your Site(s). These are examples only and may require additional development/configuration depending on your organization's needs.

](https://www.hannonhill.com/cascadecms/latest/faqs/development/set-up-canonical-tags.html)[

## How do I access a chooser field's chosen asset?

Cascade API When working with the Cascade API and choosers, there is an asset property which will be set to the chosen asset's API Object if an asset is chosen, or null if no asset is chosen. Because the asset property will be null if no asset is chosen , it is advised to ensure an asset is...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/access-chosen-asset.html)[

## How do I add a code snippet to my content?

Depending on the type of code and how broadly it should be applied to your site, there are several possible methods for adding and maintaining a code snippet in Cascade CMS. See the following article for guidelines and tips. Determine where the code snippet should be applied Before getting...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/add-code-snippet.html)[

## How do I include a page's ID in its contents?

Each asset in Cascade CMS has an unique ID, visible in the URL when viewing the asset in the interface. Including a page's ID in the published page source can be useful for things like deep linking to Cascade CMS from Siteimprove, DubBot, or other third-party reporting platforms. You can include...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/include-page-id-in-contents.html)[

## How do I include Open Graph or Twitter card meta tags in my page?

Open Graph meta tags and Twitter Card meta tags allow you to control what your pages look like when shared on social media sites such as Facebook and Twitter. To add these tags to your published pages, create a new system region within the <head> tags of your Template(s). For...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/include-open-graph-or-twitter-card-meta-tags.html)[

## How do I add a "title" tag to my page?

To add a title metadata tag and other metadata tags directly to your Template(s) Navigate to your Template and click Edit. Place the <system-page-title/> tag inside the <title></title> tags of your Templates and click Submit. When the page is rendered, Cascade pulls in the...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/add-title-tag-to-page.html)[

## How do I apply CSS?

You can apply CSS at the Template, Configuration, or Page level by linking to it in an XML Block. Create a Region in your Template: Navigate to your Template and click Edit. Create a new Region within the <head> tags of your Template by adding a System Region tag. Example:...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/apply-css.html)[

## How do I make CSS classes available in the WYSIWYG formats drop-down menu?

To allow users to apply styles to their content within the WYSIWYG editor: 1a. At the Site Level: Click Manage Site > WYSIWYG Editor Configurations. Select your configuration or click Create to add one. In the CSS File field click Choose File and select the CSS file containing the classes you...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/make-css-classes-available-in-wysiwyg.html)[

## Why aren't my CSS background images being displayed?

CSS background images require special tags that let the system know you are referring to an image that is managed by Cascade CMS. Consider the following lines in a CSS file: .content{ background-image: url('/images/photo.png'); } To link to this image from the CSS file within Cascade, the...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/css-background-images-not-displayed.html)[

## Why am I seeing <system-region> tags around my published content?

System region tags are automatically added to rendered and published content that doesn't contain valid XML. Specifically, due to a lack of a root element when Cascade CMS attempts to validate the content as XML during the rendering and publishing process. To generate non-XML compliant content,...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/system-region-tags-in-published-content.html)[

## How can I redesign a site using our existing content?

The following setup allows you to develop a new site design, using current site content, alongside your current design: Edit your site's Configurations and add a new Output. This Output will use your new Templates, Blocks, and/or Formats. Edit your site's Content Types and configure the Publish...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/redesign-a-site-existing-content.html)[

## How to update deprecated Velocity code

$\_FieldTool.in("com.hannonhill.cascade.model.dom.identifier.EntityTypes") The $\_FieldTool.in(String) method was used to obtain reference to entity types in order to locate assets using the Locator Tool. New methods added to the Locator Tool allow for locating each type of...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/update-deprecated-velocity-code.html)[

## Working with namespaces in Velocity

Consider the sample snippet below: <info xmlns:d="https://www.hannonhill.com"> <d:Title>Hannon Hill - Cascade CMS</d:Title> </info> In order to access the <d:Title> element here using a Velocity Format, the following methods can be used: Method 1: #set ($dNs =...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/working-with-namespaces-in-velocity.html)[

## Filtering queries based on multi-value fields

Using the querytool, you may have a need to filter based on pages with specific checkbox or multi-select values selected. While filtering on these multi-value fields is not possible in a single query, it can be done using some additional logic. Rather than using something like the...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/filtering-queries-based-on-structured-data-values.html)[

## Getting started with REST

Javascript (with jQuery) This changes title of a page “news/2003/best-of-show” in site “example.com” by performing a “read” operation first, changing title and then performing “edit”...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/getting-started-with-rest.html)[

## Working with Server Side Includes

It is possible to publish snippets of HTML which can be pulled in via Server Side Includes (SSI) at runtime on your live web server. This method of including content can be useful for components like navigation menus, footers, and/or any other areas of your site that are commonly used...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/working-with-server-side-includes.html)[

## Configuring a robots meta tag

This article walks through a sample setup that will allow for a "robots" meta tag to be included in the source of one or more pages. Using these options, it's possible to instruct search engines as to whether or not they should index particular pages and/or crawl links on those pages. Template...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/configure-noindex-nofollow.html)

[↑](#top)

## WYSIWYG Editor

11 articles in this collection.

[

## Adding an image to a page

If you're working in a WYSIWYG editor, you can add an image by uploading your image to Cascade CMS, then browsing for it in the WYSIWYG. Upload your image by clicking the Add Content button and using an appropriate file option available to you. These options are set up by your CMS...

](https://www.hannonhill.com/cascadecms/latest/faqs/wysiwyg/add-an-image-to-a-page.html)[

## Adding a PDF to a page

If you're working in a WYSIWYG editor, you can add a link to a file such as a PDF by uploading your file to Cascade CMS, then linking to it in the WYSIWYG. Upload your file by clicking the Add Content menu and use the appropriate file option available to you. These options are set up...

](https://www.hannonhill.com/cascadecms/latest/faqs/wysiwyg/add-a-pdf-or-document-to-a-page.html)[

## Creating an anchor link

Anchor links, sometimes called "skip links", allow you to link to a particular spot within the same page or a different page. To create an anchor link to a location within a page: Place your cursor at the spot where you'd like your destination anchor to appear and click the Anchor...

](https://www.hannonhill.com/cascadecms/latest/faqs/wysiwyg/create-anchor-link.html)[

## Adding classes to links and images

To add a class to a link: Highlight the link in question or place your cursor somewhere in the link text.  Click the Insert/edit link icon (alternatively you can right-click on the link and select Link). In the Styling field, select one of the styles listed.  Click...

](https://www.hannonhill.com/cascadecms/latest/faqs/wysiwyg/adding-classes-to-links-images.html)[

## Adding a caption to an image

To add a caption to an image: In the editor, click on the image that you wish to add a caption for. Click the Insert/edit image icon (alternatively, you can right-click on the image and select Image). In the popup dialog box, click the Advanced tab. Check the option Use figure and...

](https://www.hannonhill.com/cascadecms/latest/faqs/wysiwyg/adding-a-caption-to-an-image.html)[

## Inserting a video

To include a video in your page content: Place your cursor in the editor at the location where you'd like the video to be inserted. Click the Insert/edit media icon. In the pop-up dialog box, there are a few tabs available to you which you can utilize depending on how you intend to...

](https://www.hannonhill.com/cascadecms/latest/faqs/wysiwyg/inserting-a-video.html)[

## Adding a caption to a table

To add a caption to a table: Click anywhere in the table to select it. In the menu bar that appears, click the Table properties icon. Under the General tab, select the Caption checkbox. Click Ok. At this point, a caption area will appear above the first table row. Place your...

](https://www.hannonhill.com/cascadecms/latest/faqs/wysiwyg/adding-a-caption-to-a-table.html)[

## Adding a table header and footer

To add <thead> or <tfoot> elements to a table: Right-click somewhere in the row that you wish to specify as the table header or table footer. In the pop-up menu that appears, select Row -> Row Properties. In the pop-up dialog box under the General tab,...

](https://www.hannonhill.com/cascadecms/latest/faqs/wysiwyg/adding-a-table-header-and-footer.html)[

## Adding header cells to a table

To add header cells to a table along with a scope attribute: Right-click in the cell that you wish to make a header cell. In the pop-up menu that appears, select Cell -> Cell Properties. In the Cell type field, select Header cell. Using the Scope field, set the scope as needed...

](https://www.hannonhill.com/cascadecms/latest/faqs/wysiwyg/adding-header-cells-to-a-table.html)[

## Adding classes to tables

To apply a class to different areas of a table: Click the table, row, or cell where you wish to apply a class. Click the Format menu option, then select Formats -> Custom. Select the appropriate class name to apply it to your selection.  Notes: Not seeing any classes...

](https://www.hannonhill.com/cascadecms/latest/faqs/wysiwyg/adding-classes-to-tables.html)[

## Configuring table properties

To configure properties for a table: Click anywhere in the table to select it. In the pop-up menu that appears, click the Table properties icon (far left). You'll be presented with 2 tabs: General and Advanced. General In the General tab, you can optionally enter values for Width,...

](https://www.hannonhill.com/cascadecms/latest/faqs/wysiwyg/configuring-table-properties.html)

[↑](#top)

## Publish Errors

16 articles in this collection.

[

## The folder hierarchy does not allow this asset to be published

This error message indicates that one or more of the parent folders of the asset you're attempting to publish is not enabled for publishing. Assets contained in folders not enabled for publishing are not publishable, even if they're set to publish at an individual level.To enable a folder for...

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/folder-hierarchy-does-not-allow-this-asset-to-be-published.html)[

## Asset is not set to publish. Please enable publishing for this asset and try again.

This error message indicates that the asset you're attempting to publish is not enabled for publishing. To enable the asset for publishing: Edit the asset. Select the Configure tab. Enable the Include when publishing option. Submit your changes.

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/asset-is-not-set-to-publish.html)[

## You are not authorized to schedule future publish dates

As of Cascade CMS v8.2 the Start Date field publishes the asset at the selected date. If a user receives the following error during submission, that means their Site Role does not allow them to Publish: You are not authorized to schedule future publish dates. Please contact an administrator for...

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/not-authorized-to-schedule-future-publish-dates.html)[

## SFTP: java.net.SocketTimeoutException: Read timed out

Users may see the following error message when attempting to publish to an SFTP server: com.hannonhill.cascade.model.publish.transmit.ShuttleRuntimeException: SFTP error occurred during SFTP Shuttle setup: Session.connect: java.net.SocketTimeoutException: Read timed out This error is typically...

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/read-timed-out.html)[

## This asset cannot be published because there are no publishable configurations

When attempting to publish a page, the following message may appear in the interface: This asset cannot be published because there are no publishable configurations To resolve this, you must enable publishing for at least one of the Outputs for the page: While previewing the page, click Details...

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/no-publishable-configurations.html)[

## Invalid privatekey error when publishing via SFTP

When using SSH Key authentication for SFTP Transports, you may see the following errors when testing the Transport or when publishing to a Destination using the Transport: SFTP error occurred during SFTP Shuttle initialization: invalid privatekey: \[x@xxxxxxx To resolve the issue, upload your SSH...

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/invalid-privatekey-error-when-publishing-via-sftp.html)[

## Permissions issues when publishing to Filesystem Transports

To correct permission issues when using Filesystem Transports, you'll need to make sure that the boot script is updated accordingly. By default, the Tomcat container which Cascade CMS runs on will use a UMASK of 0027 which can lead to permission issues when trying to serve those files via a web...

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/permissions-issues-filesystem-transports.html)[

## I won't open a connection to <ip address 1> (only to <ip address 2>)

When attempting to publish to an FTP server, users may encounter messages like the following: I won't open a connection to <ip address 1> (only to <ip address 2>) This error typically indicates that the underlying Transport is configured to use Active FTP while the target server only...

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/i-wont-open-a-connection-to-ip-address-1-only-to-ip-address-2.html)[

## Problems connecting via SFTP to Solarwinds Serv-U servers

When attempting to publish via SFTP to a Solarwinds Serv-U 15.3.2+ server, one or both of the following error messages may be seen in publish reports: SFTP error: connection resetSFTP error occurred during SFTP Shuttle initialization: Session.connect: java.io.IOException: End of IO Stream...

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/problems-connecting-via-sftp-to-solarwinds-serv-u-servers.html)[

## No Destinations or WordPress Connectors available

When attempting to publish a page, the following message may appear in the interface: You cannot publish (or unpublish) this asset because there are no Destinations or WordPress Connectors available.  The following scenarios could be the cause of the message: There are Destinations...

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/no-destinations-or-wp-connectors-available.html)[

## You cannot publish (or unpublish) this asset because there are no Destinations or WordPress Connectors available.

This error message means that the User trying to publish (or unpublish) does not belong to an applicable group in any of the Site's Destination settings.  To solve: Click Manage Site and then select Destinations. Edit the Destination or Destinations to which the User needs to...

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/you-cannot-publish-or-unpublish-this-asset-because-there-are-no-destinations-or-wordpress-connectors-available.html)[

## Could not connect to FTPS server: NotAfter

When attempting to publish to an FTPS server, users may encounter messages like the following: Could not connect to FTPS server (your.cascadecms.host:990) : NotAfter: Sat May 30 06:00:00 EDT 2020 This error indicates that the SSL/TLS certificate configured at the target FTPS server has expired....

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/could-not-connect-to-ftps-server-notafter.html)[

## Could not put file with path 'FILE\_PATH' onto server: Permission denied

When publishing, users may see the following error message in their publish notifications: Error occurred during SFTP transport: Could not put file with path 'FILE\_PATH' onto server: Permission denied This error indicates that the SFTP account being used to connect to the target server does not...

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/could-not-put-file-with-path-file-path-onto-server-permission-denied.html)[

## Error occurred during FTP transport: Accept timed out

Users may see the following error message when attempting to publish to a FTP server: Error occurred during FTP transport: Accept timed out This error is typically caused by the connection attempting to use Active mode as opposed to Passive mode when connecting to the target web server. To force...

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/error-occurred-during-ftp-transport-accept-timed-out.html)[

## Unsupported or unrecognized SSL message

The following error may appear when publishing to a web server via FTPS: Could not connect to FTPS server (host:21) : Unsupported or unrecognized SSL message This error occurs when the FTPS Transport is configured to connect to a target server using explicit FTPS over port 21. Cascade CMS...

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/unsupported-or-unrecognized-ssl-message.html)[

## Could not put file with path '<path>' onto server: Failure

When attempting to publish to an FTPS server, users may encounter messages like the following: Could not put file with path '<path>' onto server: Failure The most common cause for this error is that the target web server has run out of disk space. It is recommended to check (or have your...

](https://www.hannonhill.com/cascadecms/latest/faqs/publish-errors/could-not-put-file-with-path-path-onto-server-failure.html)

[↑](#top)

## Database Errors

9 articles in this collection.

[

## MySQL 8: Public Key Retrieval is not allowed

After upgrading to MySQL 8, you may encounter the following error on startup: liquibase.exception.JDBCException: java.sql.SQLException: Cannot create PoolableConnectionFactory (Public Key Retrieval is not allowed)...Caused by: com.mysql.jdbc.exceptions.jdbc4.MySQLNonTransientConnectionException:...

](https://www.hannonhill.com/cascadecms/latest/faqs/database-errors/public-key-retrieval-is-not-allowed.html)[

## Packet for query is too large

When uploading a file into Cascade CMS, users may see an error similar to the following message: An error occurred during editing: Error persisting this bean to storage:com.mysql.jdbc.PacketTooBigException: Packet for query is too large(####### > #######). You can change this value on the...

](https://www.hannonhill.com/cascadecms/latest/faqs/database-errors/packet-for-query-is-too-large.html)[

## Error executing SQL DELETE FROM \`cxml\_history\_item\`

The following error message may appear when upgrading to Cascade 8 against a version of MySQL 5.7 prior to release 5.7.11: Migration failed for change set com/hannonhill/cascade/model/database/updater/updates/8\_0/8\_0\_006.xml::8\_0\_006::artur.tomusiak: Reason: liquibase.exception.JDBCException:...

](https://www.hannonhill.com/cascadecms/latest/faqs/database-errors/error-executing-sql-delete-from-cxml_history_item.html)[

## ORA-22275: invalid LOB locator specified

Oracle users may encounter this error when attempting to copy, edit, or submit assets in the system. The behavior will cause messages similar to the following to appear in the cascade.log file: 2015-09-14 07:54:10,936 WARN \[JDBCExceptionReporter\] SQL Error: 22275, SQLState: 999992015-09-14...

](https://www.hannonhill.com/cascadecms/latest/faqs/database-errors/invalid-lob-locator-specified.html)[

## MySQL: Can't create table

When starting Cascade CMS for the first time or after importing a new MySQL database, administrators may see an error message in the log file similar to the following: ERROR \[StartupTasks\] : \*\*\* Startup task: DatabaseIndexAndKeyManagerfailed to execute successfully: java.sql.SQLException: Can't...

](https://www.hannonhill.com/cascadecms/latest/faqs/database-errors/mysql-cant-create-table.html)[

## MySQL: Can't create/write to file

Organizations using MySQL may see an error message similar to the following when attempting to login to the system: Login failed: An error occurred: Startup task: DatabaseIndexAndKeyManager failed to execute successfully: java.sql.SQLException: Can't create/writeto file...

](https://www.hannonhill.com/cascadecms/latest/faqs/database-errors/mysql-cant-createwrite-to-file.html)[

## "Could not acquire change log lock" or "Waiting for changelog lock..."

During start-up, one of the following messages may appear in the cascade.log file and prevent Cascade CMS from starting: Waiting for changelog lock.... Caused by: liquibase.exception.LockException: Could not acquire change log lock. Currently locked by ... These can occur if the application...

](https://www.hannonhill.com/cascadecms/latest/faqs/database-errors/could-not-acquire-change-log-lock-or-waiting-for-changelog-lock....html)[

## The driver could not establish a secure connection to SQL Server by using Secure Sockets Layer (SSL) encryption. Error: "Unexpected rethrowing"

This particular error message can appear on startup. The full message will typically appear as the following: Error occurred fetching database vendor type: Cannot create PoolableConnectionFactory (The driver could not establish a secure connection to SQL Server by using Secure Sockets Layer (SSL)...

](https://www.hannonhill.com/cascadecms/latest/faqs/database-errors/the-driver-could-not-establish-a-secure-connection-to-sql-server-by-using-secure-sockets-layer-ssl-encryption.-error-unexpected-rethrowing.html)[

## The driver could not establish a secure connection to SQL Server by using Secure Sockets Layer (SSL) encryption

When attempting to start Cascade CMS, organizations using SQL Server may be presented with the following error in the log files (which prevents the application from starting): ("encrypt" property is set to "true" and "trustServerCertificate" property is set to "false" but the driver could not...

](https://www.hannonhill.com/cascadecms/latest/faqs/database-errors/the-driver-could-not-establish-a-secure-connection-to-sql-server-by-using-secure-sockets-layer-ssl-encryption.html)

[↑](#top)

## Security

11 articles in this collection.

[

## CVE-2020-1938 Ghostcat

UPDATE (4/28/2020): Cascade CMS 8.15 contains an updated version of Tomcat that addresses this vulnerability. The information below can still be useful for organizations that have not had a chance to upgrade to Cascade CMS 8.15+ yet or that happen to be proxying with Apache, Nginx, etc. (and...

](https://www.hannonhill.com/cascadecms/latest/faqs/security/cve-2020-1938-ghostcat.html)[

## CVE-2021-44228 Log4Shell

In summary, Log4j versions prior to 2.15.0 are subject to a remote code execution vulnerability via the ldap JNDI parser. As per Apache's Log4j security guide: Apache Log4j2 <=2.14.1 JNDI features used in configuration, log messages, and parameters do not protect against attacker controlled...

](https://www.hannonhill.com/cascadecms/latest/faqs/security/cve-2021-44228-log4shell.html)[

## CVE-2021-4104

In summary, A flaw was found in the Java logging library Apache Log4j in version 1.x . This allows a remote attacker to execute code on the server if the deployed application is configured to use JMSAppender. This flaw has been filed for Log4j 1.x, the corresponding flaw information for Log4j...

](https://www.hannonhill.com/cascadecms/latest/faqs/security/cve-2021-4104.html)[

## CVE-2021-45046 Log4Shell

In summary, It was found that the fix to address CVE-2021-44228 in Apache Log4j 2.15.0 was incomplete in certain non-default configurations. This could allows attackers with control over Thread Context Map (MDC) input data when the logging configuration uses a non-default Pattern Layout with...

](https://www.hannonhill.com/cascadecms/latest/faqs/security/cve-2021-45046-log4shell.html)[

## CVE-2021-45105 Log4Shell

In summary, Apache Log4j2 versions 2.0-alpha1 through 2.16.0 (excluding 2.12.3) did not protect from uncontrolled recursion from self-referential lookups. This allows an attacker with control over Thread Context Map data to cause a denial of service when a crafted string is interpreted. This...

](https://www.hannonhill.com/cascadecms/latest/faqs/security/cve-2021-45105-log4shell.html)[

## CVE-2022-23302 JMSSink

In summary, JMSSink in all versions of Log4j 1.x is vulnerable to deserialization of untrusted data when the attacker has write access to the Log4j configuration or if the configuration references an LDAP service the attacker has access to. The attacker can provide a...

](https://www.hannonhill.com/cascadecms/latest/faqs/security/cve-2022-23302-jmssink.html)[

## CVE-2022-23305 JDBCAppender

In summary, By design, the JDBCAppender in Log4j 1.2.x accepts an SQL statement as a configuration parameter where the values to be inserted are converters from PatternLayout. The message converter, %m, is likely to always be included. This allows attackers to manipulate the SQL by entering...

](https://www.hannonhill.com/cascadecms/latest/faqs/security/cve-2022-23305-jdbcappender.html)[

## CVE-2022-23307 Chainsaw Package

In summary, CVE-2020-9493 identified a deserialization issue that was present in Apache Chainsaw. Prior to Chainsaw V2.0 Chainsaw was a component of Apache Log4j 1.2.x where the same issue exists. National Vulnerability Database

](https://www.hannonhill.com/cascadecms/latest/faqs/security/cve-2022-23307-chainsaw-package.html)[

## CVE-2022-22965 Spring4Shell

In summary, from National Vulnerability Database A Spring MVC or Spring WebFlux application running on JDK 9+ may be vulnerable to remote code execution (RCE) via data binding. The specific exploit requires the application to run on Tomcat as a WAR deployment. If the application is deployed as a...

](https://www.hannonhill.com/cascadecms/latest/faqs/security/cve-2022-22965-spring4shell.html)[

## "Remember Me" Cookied Login Vulnerabilities

We have identified several weaknesses in the cookied login progress that would allow a sophisticated attacker to access the CMS as another user using only "remember me" cookies. Cookie authenticity Cookies were not expired or validated on the application side. It was previously possible to...

](https://www.hannonhill.com/cascadecms/latest/faqs/security/remember-me-cookied-login-vulnerabilities.html)[

## CVE-2025-24813

What is CVE-2025-24813? In summary, Path Equivalence: 'file.Name' (Internal Dot) leading to Remote Code Execution and/or Information disclosure and/or malicious content added to uploaded files via write enabled Default Servlet in Apache Tomcat. This issue affects Apache Tomcat: from 11.0.0-M1...

](https://www.hannonhill.com/cascadecms/latest/faqs/security/cve-2025-24813.html)

[↑](#top)