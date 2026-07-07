---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/configure-a-web-server-for-publishing.html
title: Configure a web server for publishing - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Installation & Upgrades

While there are a few different options for publishing content to a web server (as described in [Transports](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html)), the most common method is to utilize FTP, FTPS, or SFTP. In order to publish from Cascade CMS to a server using one of these protocols, we recommend following the general steps below (we'll use SFTP as an example, but the steps are similar for FTP and FTPS as well):

-   Install an SFTP server on the web server
-   Create an SFTP account for Cascade CMS to use in order to connect and send files
-   Configure the SFTP account's home directory to something appropriate (in most cases, this will be your web root)
-   Ensure that the SFTP account has full permissions to the account's home directory and all of its subfolders (this is necessary so that the CMS can create, update, and remove files from the website)
-   Configure the firewall to allow traffic from the Cascade CMS server over port 22

**Note**: Port 22 is the default for SFTP, but if you are listening on a non-standard port, you'd want to make sure that you allow traffic over that port for Cascade CMS to connect. If using FTP or FTPS, you would typically need to make exceptions for port 21 or 990 respectively.

Once the SFTP server has been configured as described above, you'll want to verify that you can connect to it from the application server (where Cascade CMS is installed).

We recommend using a 3rd party SFTP client (like WinSCP or Filezilla, for example) for this purpose as it will also allow for you to verify that connecting with the account places you in the expected directory on the web server's filesystem (the home directory of the SFTP account).

After verifying that you can successfully connect using a 3rd party client:

-   Log into Cascade CMS and switch into the Site you wish to publish
-   Create a new [Transport](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html) using the SFTP account credentials that were verified above
-   Create a new [Destination](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/destinations.html) and when configuring it, select the Transport that was created in the step prior to this

The combination of the Transport and Destination are what determine how and where the CMS will publish. More information on that can be found in [Determining Where Assets Will Be Published.](https://www.hannonhill.com/cascadecms/latest/faqs/general/how-do-i-determine-where-assets-will-be-published.html)

**Tip**: You can run general connectivity tests for both Transports and Destinations by clicking **More -> Test Connectivity**while viewing them. When testing Destinations, you can optionally choose to send 'dummy' files of 100kb or 1000kb in size. These tests can help to quickly determine if there is some sort of problem when the system attempts to connect using the information provided in the Transport/Destination (related to authentication or firewalls, for example). 

[↑](#top)

# Related Links

-   [Transports](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/transports.html)
-   [Destinations](https://www.hannonhill.com/cascadecms/latest/content-authoring/publishing/destinations.html)
-   [How do I determine where assets will be published?](https://www.hannonhill.com/cascadecms/latest/faqs/general/how-do-i-determine-where-assets-will-be-published.html)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }