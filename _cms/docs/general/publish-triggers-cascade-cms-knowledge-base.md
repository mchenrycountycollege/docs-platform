---
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/publish-triggers.html
title: Publish Triggers - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Developing in Cascade

# Overview[](#Overview)

Publish Triggers are plug-ins that can be utilized during the publishing process. They allow developers to execute custom logic each time an asset (page, file, or other content item) is published.

For example, a publish trigger may be set up so that each time a particular page is edited and published, an e-mail is sent to notify users (or even non-Cascade users) that may be interested in that page's publication.

# Publish Trigger Pre-Requisites[](#PublishTriggerPre-Requisites)

Use of the Publish Trigger SDK requires that you have moderate knowledge of Java programming.

1.  Ensure you have version 6 or later of the Java Development Kit (JDK) installed on your computer.
2.  Ensure you are running Cascade 8.0.x or later.
3.  Download the [Eclipse IDE](https://www.eclipse.org/).
4.  Clone the repository and checkout the [8.0.x branch](https://github.com/hannonhill/Cascade-Server-Publish-Trigger-SDK/tree/8.0.x) or [download the SDK](https://github.com/hannonhill/Cascade-Server-Publish-Trigger-SDK/archive/8.0.x.zip) from the [Hannon Hill GitHub repository](http://github.com/hannonhill/Cascade-Server-Publish-Trigger-SDK/).

If you do not want to use Eclipse, you can develop against the [publish trigger API JAR](https://github.com/hannonhill/Cascade-Server-Publish-Trigger-SDK/blob/master/lib/publishtrigger-8.17.jar) and the [general Cascade API JAR](https://github.com/hannonhill/Cascade-Server-Publish-Trigger-SDK/blob/master/lib/cascade-api-8.17.jar) to access other assets from Publish Triggers.

# Installing Eclipse and Opening the SDK[](#InstallingEclipseandOpeningtheSDK)

1.  Once Eclipse is downloaded, it needs to be unzipped to a directory of your choosing (suggestions: c:\\java\\eclipse or c:\\Program Files\\Eclipse on Windows, /usr/local/eclipse on Linux, or ~/java/eclipse on OS X).
2.  Start Eclipse and you will be prompted to choose a workspace location – the default location should suffice.  Make note of this location, as it is where the SDK will also be unzipped.
3.  Unzip the SDK plug-in to your workspace directory. The zip should create its own directory inside your workspace directory.
4.  Load the SDK (which is actually just an Eclipse project) into Eclipse.  To do so, right-click in the Package Explorer view on the left-hand side, and select "Import...".  Then select "Existing Projects Into Workspace" under ‘General’ and click Next.  Select "Browse" (next to "Select root directory:") and navigate to the directory created when you unzipped the SDK.  You should then see "Cascade Publish Trigger" under ‘Projects’.  Click Finish.

You should now see the project in your Package Explorer.  The project already has a pre-created package and starter plug-in named `com.mycompany.cascade.plugin.SimplePublishTrigger`. Feel free to delete/rename/move this plug-in to suit your needs.

# Writing the Publish Trigger Plug-In Class[](#WritingthePublishTriggerPlug-InClass)

A plug-in is a Java class that implements the PublishTrigger interface. The plug-in writer will need to implement the following methods defined on this interface:

`setPublishInformation (PublishTriggerInformation information)`

This method provides the PublishTrigger implementation with an information object, which is a simple JavaBean containing information about the asset currently being published. This is called before invoke(), and generally, the PublishTrigger implementation will simply store this for use during the invoke() method, in which the PublishTrigger implementation will perform its actual logic. This method is called once per item published.

`setParameter (String name, String value)`

This method provides the PublishTrigger implementation with parameters as set in the PublishTrigger XML configuration file. This method is called once per parameter listed in the Publish Trigger configuration XML file, immediately after the PublishTrigger implementation is constructed.

`invoke() throws PublishTriggerException`

This method is where the core logic of the PublishTrigger implementation should be written. It is called once per item published, immediately after setPublishInformation is called. Note that the PublishTrigger implementation provided must provide a default, no-args constructor.

# Publish Trigger Lifecycle[](#PublishTriggerLifecycle)

PublishTrigger implementations are constructed once per logical publish. Once a PublishTrigger implementation is constructed, it is initialized once by passing in all of the parameters defined for that trigger from the Publish Trigger configuration XML file. Then, it’s setPublishInformation and invoke methods will be called once per asset published. Once the logical publish ends, the PublishTriggers are discarded and garbage collected.

# Deploying the Publish Trigger[](#DeployingthePublishTrigger)

Once the custom code is written, package your code into a JAR, including any custom helper classes.  If your PublishTrigger implementation relies on any other outside libraries, these libraries will be copied to the same place as the JAR containing the custom code.  
  
Place these JAR file(s) in the following directory: <Cascade Installation Directory>/webapps/ROOT/WEB-INF/lib. For advanced users that do not have their Cascade CMS deployed as the root web application (non-standard configuration), these files will need to be placed in the corresponding context directory inside of the webapps directory. For example, if Cascade CMS is deployed at the "cms" context, the files would be placed at <Cascade Installation Directory>/webapps/cms/WEB-INF/lib.  
  
Restart Cascade CMS.

**Note** - It's good practice to store any custom code developed for Cascade CMS in the base of the Cascade CMS installation directory as well. This is because these custom files, once deployed, may be overwritten each time the Cascade CMS software is upgraded. For instance, storing a backup of these files inside of <Cascade Installation Directory>/cascade-custom-code is strongly suggested.

# Publish Trigger Configuration[](#PublishTriggerConfiguration)

To manage Publish Triggers, click the system menu button ( ) > **Administration** > **Publish Triggers**. Only users with the **Modify Configuration Files** ability enabled in their System Role can configure Publish Triggers.  
  
A trigger is comprised of a package-qualified Java classname and any associated parameters. Click **Add Trigger** to add additional triggers and **Add Trigger Parameters** to add additional parameters.  
  
Multiple triggers can be defined. In fact, the same trigger class could be defined multiple times with different parameters.  
  
For backwards compatibility and to allow easy copying of trigger configurations from one instance of Cascade CMS to another, there is an XML pane that contains the complete configuration.

**Note** - A JAR file containing the trigger classes must be deployed before startup when attempting to add them to the configuration. Trigger classnames are validated on submission. If the class cannot be found, submission will fail.

# Sample Publish Trigger[](#SamplePublishTrigger)

This sample publish trigger is included in the SDK, and reproduced below:

/\*   
 \* Created on Jan 17, 2008 by Zach Bailey   
 \*   
 \* This software is offered as-is with no license and is free to reproduce or use as anyone sees fit.   
 \*/   
package com.mycompany.cascade.plugin;   
   
import java.util.HashMap;   
import java.util.Map;   
   
import com.cms.publish.PublishTrigger;   
import com.cms.publish.PublishTriggerEntityTypes;   
import com.cms.publish.PublishTriggerException;   
import com.cms.publish.PublishTriggerInformation;   
   
/\*\*   
 \* This plug-in does some really neat stuff!   
 \* @author <Your Name Here>   
 \*/   
public class SimplePublishTrigger implements PublishTrigger   
{   
 private Map<String, String> parameters = new HashMap<String, String>();   
 private PublishTriggerInformation information;   
   
 /\* (non-Javadoc)   
 \* @see com.cms.publish.PublishTrigger#invoke()   
 \*/   
 public void invoke() throws PublishTriggerException   
 {   
 // this is where the logic for the trigger lives.   
 // we switch on the entity type and this allows us to determine if a page or file is being published   
 switch (information.getEntityType())   
 {   
 case PublishTriggerEntityTypes.TYPE\_FILE:   
 System.out.println("Publishing file with path " + information.getEntityPath() + " and id " + information.getEntityId());   
 break;   
 case PublishTriggerEntityTypes.TYPE\_PAGE:   
 System.out.println("Publishing page with path " + information.getEntityPath() + " and id " + information.getEntityId());   
 break;   
 }   
   
 /\* (non-Javadoc)   
 \* @see com.cms.publish.PublishTrigger#setParameter(java.lang.String, java.lang.String)   
 \*/   
 public void setParameter(String name, String value)   
 {   
 // let's just store our parameters in a Map for access later   
 parameters.put(name, value);   
 }   
   
 /\* (non-Javadoc)   
 \* @see com.cms.publish.PublishTrigger#setPublishInformation(com.cms.publish.PublishTriggerInformation)   
 \*/   
 public void setPublishInformation(PublishTriggerInformation information)   
 {   
 // store this in an instance member so invoke() has access to it   
 this.information = information;   
 }   
}

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }