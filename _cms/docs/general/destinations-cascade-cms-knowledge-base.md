---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/destinations.html
title: Destinations - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Publishing

# Overview[](#Overview)

Destinations define the link between site content and the location to which site content can be published. Destinations allow for publishing content on a schedule, and specifies encoding (UTF-8 or ASCII) for the published content. A Destination is associated with a single transport that defines the protocol and location of a remote server to use when publishing content out of the system. In other words, whereas a destination defines the link between a site and transport, a transport represents the physical location of a server which can be used for any number of sites.

# Creating a Destination[](#CreatingaDestination)

To create a Destination:

1.  Navigate to **Manage Site** > **Destination****s**and click **Add**.
2.  From here you can either create a Container to group related Destinations or a Destination.
3.  Configure the following fields in the **General** tab:
    1.  **Name** - How the system identifies the Destination.
    2.  **Parent Container**\- The main storage folder for the Destination.
    3.  **Enable destination** - Allows users to temporarily deactivate certain Destinations. For example, downtime or a content freeze could merit temporarily disabling a Destination.
    4.  **Directory** - Generally, this value is inherited from the Transport.
        -   If the directory field is empty, the Transport directory will be used to determine where content is published.
        -   If the directory contains an absolute path, the Transport directory will not be used. The Destination directory will be used as the exact path where content is published.
        -   If the directory contains a folder name, then the folder supplied in that field is appended to the end of the Transport directory where content will then be published. For example, if the Transport Directory points to the "test/main" folder on the server and "new/destination" is filled into the Destination Directory field, content will be published to the "test/main/new/destination" folder.
    5.  **[Transport](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html)** - Selects the Transport upon which the Destination will be based.
    6.  **Applicable Groups** - Determines which groups may publish to the Destination. Unless a group is defined here, this Destination will not show up on an asset's list of available Destinations on the publish screen for that group.
    7.  **Web URL** - A base URL used for linking to specific Configuration Outputs. For more information see ["Link Rewriting Using Destination URLs"](https://www.hannonhill.com/cascadecms/latest/content-authoring/linking.html#LinkRewritingUsingDestinationURLs).
    8.  **Extensions to Strip** - A comma-separated list of extensions (such as .html, .php). Links pointing to assets published to this Destination will have these extensions stripped.
        -   To strip extensions from cross-site links pointing to assets in the current site, add the same extensions to the **Extensions to Strip** field in Site Settings.
        -   The web server will need to be configured to map the extensionless links to the appropriate files (for example, with an .htaccess file).
    9.  **Publish to this Destination by default** - If this Destination is optional and should not be used every time an asset is published, the checkbox should be unchecked. This way users would need to manually select that Destination when sending an asset to the publish queue.
    10.  **Publish ASCII characters instead of Unicode** - Cascade CMS publishes content in Unicode by default; this may be overridden by selecting the ASCII checkbox.
4.  In the **[Scheduled Publishing](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/index.html#ScheduledPublishing)** tab,content can be set to publish automatically on a schedule.
5.  Click **Submit** to save the new Destination.

# Testing Destination Connectivity[](#TestingDestinationConnectivity)

The Destination test utility allows users to test Destination connectivity without invoking a publish. To run a Destination test:

1.  Navigate to **Manage Site** > **Destinations**.
2.  Select the Destination you wish to test.
3.  Click **More** > **Test Connectivity**.
4.  Optionally: Select the number of files and size of files to test.
5.  Click **Start Test**. If there are no errors, the screen will indicate "Test Successful". If errors are found, the screen will identify the problem that occurred.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }