---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/macos.html
title: Installation/Upgrade (macOS) - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Installation & Upgrades

# Before you begin[](#Beforeyoubegin)

-   [Download Cascade CMS](https://www.hannonhill.com/downloads/cascade/index.html).
-   If you're upgrading your environment, be sure leave your existing installation directory in place to reference configuration files and customizations, and choose a NEW installation directory when prompted by the installer or when unzipping the ZIP file.
-   If you're installing Cascade CMS for the first time, make sure you've created and imported the default schema for the database vendor according to the [corresponding instructions](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/database/index.html).

# Open the installer[](#Opentheinstaller)

Double-click the **cascade-{version}-osx.jar** file to begin the installation. Alternatively, the JAR package can be run by executing the following (from the terminal):

`java -jar cascade-{VERSION}-osx.jar`

1.  Read the statement.
2.  Check the box labeled *I have read and understand the preceding statement.*
3.  Click **Next**.

# Select the installation type[](#Selecttheinstallationtype)

1.  Select **Full Cascade Installation**. A Full Cascade Installation will instruct the installer to install a fresh instance of Cascade CMS on the machine.
2.  Click **Next**.

# Configure Cascade CMS[](#ConfigureCascadeCMS)

1.  Fill in (or browse to) the **Cascade CMS installation directory**. By default, Cascade CMS will install to */Applications/Cascade CMS*
2.  In the **Run Cascade CMS on port** field, enter the port on which Cascade CMS will be accessed. The default port is `8080`.
3.  Fill in the **Maximum amount of memory Cascade can use (in MB)** field. The default setting is `512`.
4.  Click **Next**.

# Configure the database[](#Configurethedatabase)

1.  Select the **Database type** which will be used (MySQL, Microsoft SQL Server, or Oracle). Selecting **Manual Configuration** allows for configuring the database connection after the Cascade CMS installation.
2.  Fill in the **Database hostname:port** field with the hostname and port of the database server that Cascade will use.
3.  Enter the **Database name** to which Cascade CMS will connect. For Oracle, also fill out the **Schema name** and **Oracle SID** fields. In most cases, the Database name and Schema name should be the same.
4.  Fill in the **Username** and **Password** fields for accessing the Cascade CMS database. For Oracle, the Username must match the Schema name.
5.  *Optional:* Click the **Test Connection** button to test the connection to the database using the specified credentials.
6.  Click **Next**.

# Complete the installation[](#Completetheinstallation)

1.  Read the Cascade CMS license agreement.
2.  Select *I accept the terms of this license agreement.*
    -   Selecting *I do not accept the terms of this license agreement.* will prevent the installation from completing.
3.  Click **Next**.
4.  Wait for the **Pack Installation progress** bar to display **\[Finished\]** and **Overall installation progress** to display **1/1**.
5.  Click **Done.**

# Apply customizations (if applicable)[](#Applycustomizationsifapplicable)

Manually apply any further customizations you've made to Cascade CMS, including:

-   Customizations to the *tomcat/conf/context.xml* file not including the database configuration (which is configured by the installer).
-   Customizations to the *tomcat/conf/server.xml* file not including the HTTP port (which is configured by the installer).
-   Customizations to the *tomcat/conf/web.xml* file.
-   Copying custom Asset Factory plugins, Publish Triggers, and custom authentication modules from the old/existing *tomcat/webapps/ROOT/WEB-INF/lib* directory to the new installation folder's *tomcat/webapps/ROOT/WEB-INF/lib* directory.
    -   Note**:** The *tomcat/webapps/ROOT/WEB-INF/lib* directory will not exist in the new installation until the application has been deployed at least once. For this reason, the application will need to be started and stopped before copying over your custom JAR files.

**IMPORTANT** - The following files should **not** be copied from the old installation into the new installation as they can cause compatibility problems: *tomcat/conf/context.xml*, *tomcat/conf/server.xml*, and *tomcat/conf/web.xml*. Instead, they should be used only as a reference for updating the corresponding files in the new installation.

# Start Cascade CMS[](#StartCascadeCMS)

1.  Open a terminal window.
2.  Change into the Cascade CMS installation directory (ex. */Applications/Cascade CMS*).
3.  Type `./cascade.sh start`

# Log in[](#Login)

Once the application is running, you should be able to access it in your browser by navigating to `hostname:8080`. Where `hostname` is the host name of the machine on which Cascade is installed and `8080` is the port configured during the installation.

The default credentials to log in are:

`username: admin password: admin`

We recommend changing this password to something more secure immediately after logging in.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }