---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/index.html
title: Asset Factory Plugins - Cascade CMS Knowledge Base
category: asset-factory
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Asset Factory Plugins

# Available Plugins[](#AvailablePlugins)

[Create Resized Images Plug-in](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/create-resized-images-plug-in.html)  
This plug-in allows an administrator to specify that multiple resized images will be created when a user uploads a single image.  
  
[Image Resizer Plug-in](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/image-resizer-plug-in.html)  
This plug-in allows an administrator to specify that an uploaded image be resized to particular dimensions.  
  
[Display to System Name Plug-in](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/display-to-system-name-plug-in.html)  
This plug-in ensures that newly-created assets are given search engine friendly system names.  
  
[File Limit Plug-in](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/file-limit-plug-in.html)  
This plug-in allows administrators to place restrictions on the size and type of file created using a specific asset factory.  
  
[Set Start Date Plug-in](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/set-start-date-plug-in.html)  
This plug-in sets the metadata field "start date" to the current time for newly created assets, with an optional configurable offset.  
  
[Data Definition Field to System Name Plug-in](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/data-definition-field-to-system-name-plug-in.html)  
This plug-in takes the value from a specified structured data field, makes it "safe" by removing non-SEO characters, and then turns that into the system name for the new asset.  
  
[Data Definition Fields to System Name Plug-in](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/data-definition-field-to-system-name-plug-in.html#DDF)  
This plug-in takes the value from multiple specified structured data fields, concatenates them together, and turns that into the system name for the new asset.  
  
[Friendly Page Name Plug-in](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/friendly-page-name.html)  
This plugin limits the system name of new page assets to configurable regular expression.  
  
[Title to System Name Plug-in](https://www.hannonhill.com/cascadecms/latest/content-authoring/asset-factories/plugins/title-to-system-name-plug-in.html)  
This plug-in ensures that newly-created assets are given search engine friendly system names

# Creating New Plugins[](#CreatingNewPlugins)

## Prerequisites

This article assumes you have moderate Java programming knowledge, as well as a Java Runtime Environment (JRE) installed on your machine (required by Eclipse). Your JRE should match (or be backwards compatible) with the version of Java [required by your version of Cascade CMS](https://www.hannonhill.com/cascadecms/latest/releases/index.html).

### Collecting the tools

Before you get started, Cascade 7+ users should download the following:

-   [Eclipse IDE](https://www.eclipse.org/)
-   [Asset Factory Plugin SDK](https://github.com/hannonhill/Cascade-Server-Asset-Factory-Plugin-SDK/raw/master/dist/CascadeAssetFactoryPluginSDK.zip)

If you wish to use a different IDE to write your plug-in, you can develop against the *standalone assetfactory-plugin-{VERSION}.jar* and the *cascade-api-{VERSION}.jar* files that come in the SDK.

### Installing Eclipse and Opening the SDK

Once you download Eclipse you will want to unzip it to a directory of your choosing. Suggestions:

-   *C:\\java\\eclipse* or *C:\\Program Files\\Eclipse* on Windows
-   */usr/local/eclipse* on Linux
-   *~/java/eclipse* on OS X

Start Eclipse and you will be prompted to choose a workspace location - the default location should suffice. Make note of it as this is where we will unzip the SDK to. Next, you will unzip the Plugin SDK to your workspace directory. The zip should create its own directory inside your workspace directory.

Finally, we will bring in the Plugin SDK (which is really just an Eclipse project) into Eclipse. To do this:

-   Right-click in the package explorer view on the left-hand side and select "Import...".
-   Then, select "Existing Projects into Workspace" under "General" and click "Next".
-   Select "Browse" next to "Select root directory:" and browse to the directory created when you unzipped the SDK. You should then see "Asset Factory Plugin" under "Projects".
-   Click "Finish".

You should now see the project in your Package Explorer. The project has two packages:

-   The resources package - this is where your "resource bundles" will live. A "resource bundle" is a set of localized strings describing various aspects of your Asset Factory plugin, such as the name, description, and the names and descriptions of any parameters your Asset Factory plugin may utilize. Note that the name of this package must be "resources" and must live off the root of the project.
-   The "com.mycompany.cascade.plugin" package - this package can be renamed to whatever you desire - this is where your Plugin class will reside.

### Writing the Plugin Class

A plug-in is a Java class that implements the AssetFactoryPlugin interface. It is strongly recommended that you extend the BaseAssetFactoryPlugin class because it contains the implementation of helper methods that the framework relies on.

The plug-in writer will need to implement the following methods:

`public void doPluginActionPre(AssetFactory, FolderContainedAsset)`

This method is called before the user has performed the initial edit. The FolderContainedAsset passed as a parameter will contain the data from the asset factory's default asset, if one is set. At this stage, the asset has not yet been created.

`public void doPluginActionPost(AssetFactory, FolderContainedAsset)`

This method is called after the user has performed the initial edit. The FolderContainedAsset passed as a parameter will contain the data from the asset factory's default asset, if one is set. At this stage, the asset has not yet been created.

`public void setAllowCreation(boolean flag, String reason)`

This method allows plugin authors to allow/disallow creation of a new asset from an AssetFactory based on logic they describe. Calling this method with the parameter `false` will prevent the asset from being created and display the given reason to the user as an error message.

`public Map<String, String> getAvailableParameterDescriptions()`

This method shall return a map where the keys are the names of the parameters (keys into the resource bundle) and the values are the descriptions of the parameters (keys into the resource bundle). This method must return a non-null Map object.

`public String[] getAvailableParameterNames()`

This method returns a non-null array of strings which are keys into the resource bundle, each of which is the name of a parameter this plug-in can take.

`public String getDescription()`

This method returns a key into the resource bundle which is the description of the plug-in.

`public String getName()`

This method returns a key into the resource bundle which is the name of the plug-in.

### What is a "key into the resource bundle"?

The resource bundle is a file that allows internationalization of your plug-in. This file is formatted with key/value pairs, one on each line. The key is generally a dotted string (example: "name.of.my.plugin") and the value is a human-readable string (example: "This is the name of my plug-in"). The key/value pairs are separated by an equals ("=") sign. You can find two sample resource bundles in the Asset Factory Plug-in SDK.

### Disallowing asset creation

A powerful aspect of Asset Factory plug-ins is their ability to determine which assets are allowed to be created and which aren't. By default, assets are always allowed to be created. However, if a plug-in writer deems that due to some conditions an asset is not to be created, that plug-in writer can throw a new FatalPluginException that contains the reason why the asset cannot be created. The plug-in writer can also call the function `setAllowCreation()` with the first boolean parameter set to false and the second String parameter explaining why the asset was not allowed to be created. The framework will then check this and pass the specified message up to the user.

Note: By default, a plug-in is set to allow assets to be created, so if your plug-in is not intended to restrict creation, you will not need to add any additional code.

### Exceptions

Asset Factory Plug-ins may use two types of exceptions: a PluginException or a FatalPluginException. A PluginException is a general exception that will NOT stop other plug-ins from executing, but it will halt the execution of the current plug-in. A FatalPluginException stops other plugins from executing AND tells the plug-in framework to not allow the asset to be finalized and put into the system.

### What to do with your plug-in

First, create a JAR file containing your plug-in file and the resource bundle(s) it references. To do this:

-   Right click on your project in the Package Explorer (left hand side) in Eclipse and select "Export...".
-   Under the "Java" section, select *JAR file* and click "Next".
-   Next you will be prompted as to which files to include. Ensure the checkboxes for your plug-in package and resources package are selected. If you click on your project, you will see that the ".classpath" and ".project" files are included, which are unnecessary and should be unchecked so they are not included in the JAR. The rest of the default options should be fine (only things checked are "Export generated class files and resources" and "Compress the contents of the JAR file").
-   Under "Select the export destination:", select where the JAR file will be temporarily placed before deployment to Cascade CMS.
-   Click Finish.

To deploy the plug-in JAR:

-   First you must shut down Cascade CMS.
-   Next, locate the JAR file and place this file in *<Tomcat\_Installation\_Location>/webapps/ROOT/WEB-INF/lib* under the Tomcat Deployment directory. JAR files placed in this location are automatically loaded along with other libraries needed by Cascade CMS.
-   Once you have done this, start Cascade CMS and go to the Asset Factory section in the **Administration** area and select **Manage Plugins**.
-   In the "Add a Plugin" text field, enter the fully qualified Java class name of your plug-in (for instance, "com.mycompany.cascade.MyPlugin") and click **Submit**. The plug-in will then be added and will be accessible in the "Plug-ins" tab when editing an Asset Factory.

### What can go wrong

If you loaded your plug-in and now you can't edit any of your Asset Factories (blank screen), the most likely cause is Cascade CMS is being told to look for a key which does not exist in the resource bundle you have supplied. If you can examine the logs, you will more than likely see a message about "Could not locate key for this.is.the.missing.key". You will need to ensure that all the keys that you return in your `getAvailableParameterDescriptions()`, `getAvailableParameterNames()`, `getDescription()`, and `getName()` functions point to valid keys in your resource bundle for all locales.

### Other Resources

The [Asset Factory Plugins](https://github.com/hannonhill/Asset-Factory-Plugins) Github project is another great resource for developing your own custom Asset Factory Plugins.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }