---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/linux.html
title: Installation/Upgrade (ZIP) - Cascade CMS Knowledge Base
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

# Edit the configuration files[](#Edittheconfigurationfiles)

1.  Unzip the ZIP file into a new Cascade CMS installation directory.
    -   Note: leave the current installation directory as is because you'll need to reference files from the existing installation later.
2.  If using \*nix/Linux, set execute permissions and ownership on the directory. Ex.:
    -   `chmod -R u+x /path/to/cascade`
    -   `chown -R {user}:{group} /path/to/cascade`
3.  Edit *cascade.sh* (Linux/\*nix/Mac OS) or *cascade.bat* (Windows)  
    1.  `@{cascadeJRE}` - replace this string with the absolute path to your Java runtime folder which contains the *bin* sub-folder.
        -   If you downloaded a full installer, which has the Java runtime bundled, enter the path to the *jdk* directory within the installer.
        -   If you are choosing to use your own Java runtime, see [configuring a Java installation](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/java-configuration.html).
    2.  `@{cascadeMemory}` - specify the maximum amount of memory available to Cascade CMS by replacing this string with a string of the form `-Xmx4096M`  where `4096` is the size of the memory in megabytes. See [modifying the heap size](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/modify-heap-size.html) for more information or the "Requirements" section of the [Release Notes](https://www.hannonhill.com/cascadecms/latest/releases/index.html) for additional information about recommended memory allocation.
4.  Edit *tomcat/conf/context.xml* to [configure the database connection](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/modify-db.html).
    1.  Remove the first line containing `@{dbConf}`.
    2.  Uncomment the appropriate configuration for your database vendor.
    3.  Replace the following strings as specified:
        -   `@{dbusername}` - the username for accessing your database
        -   `@{dbpassword}` - the password for accessing your database
        -   `@{dbhostport}` - the hostname and port separated by a colon (e.g. `localhost:3306`)
        -   `@{dbname}` - the name of the database to use
        -   `@{dbsid}` - the SID of the Oracle database server, usually `orcl`
5.  Edit *tomcat/conf/server.xml*  
    -   `@{dbschema}` - for Oracle, change this to the schema name of your database. For MySQL and SQL Server, remove the string entirely (e.g. `value=""` ).
    -   `@{cascadePort}` - the HTTP port on which Cascade will run (e.g. `8080`). See [modify application ports](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/modify-ports.html) for more information.

# Apply customizations (if applicable)[](#Applycustomizationsifapplicable)

Manually apply any further customizations you've made to Cascade CMS, including:

-   Customizations to the *tomcat/conf/context.xml* file not including the database configuration (which is configured by the installer).
-   Customizations to the *tomcat/conf/server.xml* file not including the HTTP port (which is configured by the installer).
-   Customizations to the *tomcat/conf/web.xml* file.
-   Copying custom Asset Factory plugins, Publish Triggers, and custom authentication modules from the old/existing *tomcat/webapps/ROOT/WEB-INF/lib* directory to the new installation folder's *tomcat/webapps/ROOT/WEB-INF/lib* directory.
    -   Note**:** The *tomcat/webapps/ROOT/WEB-INF/lib* directory will not exist in the new installation until the application has been deployed at least once. For this reason, the application will need to be started and stopped before copying over your custom JAR files.

**IMPORTANT** - The following files should **not** be copied from the old installation into the new installation as they can cause compatibility problems: *tomcat/conf/context.xml*, *tomcat/conf/server.xml*, and *tomcat/conf/web.xml*. Instead, they should be used only as a reference for updating the corresponding files in the new installation.

# Start Cascade CMS (Linux/\*nix, macOS)[](#StartCascadeCMSLinuxnixmacOS)

1.  Open a terminal window.
2.  Change into the Cascade CMS installation directory (ex. */Applications/Cascade CMS*).
3.  Type `./cascade.sh start`

# Start Cascade CMS (Windows)[](#StartCascadeCMSWindows)

The application can be started using one of the following methods:

## Windows Service

If you chose to install the Windows service, it can be started using the following steps:

1.  Navigate to the Windows Services dialog box.
2.  Right-click on the **Cascade CMS** service.
3.  Click **Start**.

### Command Line

1.  Open a command prompt.
2.  Navigate to the Cascade installation directory ( ex. *C:\\Program Files\\Cascade CMS*).
3.  Type `cascade.bat start` .

**Note** - Use only one of the methods described above, as using both will lead to a port conflict with two instances of the application running simultaneously.

# Log in[](#Login)

Once the application is running, you should be able to access it in your browser by navigating to `hostname:8080`. Where `hostname` is the host name of the machine on which Cascade is installed and `8080` is the port configured during the installation.

The default credentials to log in are:

`username: admin password: admin`

We recommend changing this password to something more secure immediately after logging in.

[↑](#top)

# Related Links

-   [Running Cascade CMS as a Linux service](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/running-cascade-cms-as-a-linux-service.html)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }