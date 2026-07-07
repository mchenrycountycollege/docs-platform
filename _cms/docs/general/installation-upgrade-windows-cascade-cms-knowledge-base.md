---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/windows.html
title: Installation/Upgrade (Windows) - Cascade CMS Knowledge Base
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

# Remove the Windows Service (if applicable)[](#RemovetheWindowsServiceifapplicable)

The Cascade CMS Windows service can be removed by following these steps:

1.  Open a command prompt using the **Run as Administrator** option.
2.  Change into to the Cascade CMS installation folder.
3.  Enter: `removecascadeservice.bat`

The Windows service with the name `Cascade CMS` will be removed.

# Open the installer[](#Opentheinstaller)

1.  Right-click on the **cascade-{version}-win.exe** or **cascade-{version}-win.jar** file and select the **Run as Administrator** option to begin the installation.
2.  Read the statement.
3.  Check the box labeled *I have read and understand the preceding statement.*
4.  Click **Next**.

# Select your installation type[](#Selectyourinstallationtype)

1.  Select **Full Cascade Installation**. A full Cascade CMS installation will instruct the installer to install a fresh instance of Cascade CMS on the machine.
2.  Click **Next**.

# Configure Cascade CMS[](#ConfigureCascadeCMS)

1.  Fill in (or browse to) the **Cascade installation directory**. Cascade CMS will install to *C:\\Program Files\\Cascade CMS*by default. **Important:** If you have a prior installation of Cascade CMS, pick a new/different installation directory or rename the previous installation directory before proceeding.
2.  In the **Run Cascade CMS on port** field, enter the port on which Cascade CMS will be accessed. The default port is 8080.
3.  Fill in the **Maximum amount of memory Cascade can use (in MB)** field. The default setting is 512. (**NOTE:** This setting is only applicable for those running Cascade CMS from the command line. If Cascade CMS will run via Windows service, memory settings will need to be configured *after the installation is completed* according to: [Modifying the Heap Size](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/modify-heap-size.html).)
4.  Choose whether or not to **Start Cascade CMS Automatically on boot**. Selecting this option will install Cascade CMS as a Windows Service.
5.  Click **Next**.

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

The application can be started using one of the following methods:

## Windows Service

If you chose to install the Windows service, it can be started using the following steps:

-   Navigate to the Windows Services dialog box.
-   Right-click on the **Cascade CMS** service.
-   Click **Start**.

### Command Line

-   Open a command prompt.
-   Navigate to the Cascade installation directory ( ex. *C:\\Program Files\\Cascade CMS*).
-   Type `cascade.bat start` .

**Note** - Use only one of the methods described above, as using both will lead to a port conflict with two instances of the application running simultaneously.

# Log in[](#Login)

Once the application is running, you should be able to access it in your browser by navigating to `hostname:8080`. Where `hostname` is the host name of the machine on which Cascade is installed and `8080` is the port configured during the installation.

The default credentials to log in are:

`username: admin password: admin`

We recommend changing this password to something more secure immediately after logging in.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }