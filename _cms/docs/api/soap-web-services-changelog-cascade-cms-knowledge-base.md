---
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/soap-web-services-api/soap-web-services-changelog.html
title: SOAP Web Services Changelog - Cascade CMS Knowledge Base
category: api
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

SOAP Web Services API

# Cascade CMS 8.19[](#CascadeCMS8_19)

-   New property added to `publishInformation` complexType:
    -   `scheduledDate` (dateTime)

# Cascade CMS 8.17[](#CascadeCMS8_17)

-   New property added to `site` complexType:
    -   `siteLinkRewriting` (string)
        -   `absolute`
        -   `relative`
        -   `site-relative`
-   New property added to `page` and `file` complexTypes:
    -   `linkRewriting` (string)
        -   `inherit`
        -   `absolute`
        -   `relative`
        -   `site-relative`
-   Property removed from `page` and `file` complexTypes:
    -   `maintainAbsoluteLinks`

# Cascade CMS 8.16[](#CascadeCMS8_16)

-   New property added to `authentication`:
    -   `apiKey` (string)
    -   Either `username` *and* `password` or `apiKey` are required when authenticating requests
-   New properties added to `moveParameters`:
    -   `unpublish` (boolean)
    -   `destinations` (array of identifiers)
-   New properties added to `delete` operation:
    -   `deleteParameters`
        -   `doWorkflow` (require; boolean)
        -   `unpublish` (boolean)
        -   `destinations` (array of identifiers)
-   New complexTypes `deleteParameters` and `unpublish-parameters`:
    
    `<complexType name="deleteParameters">   <complexContent>     <extension base="impl:unpublish-parameters">       <sequence>         <element name="doWorkflow" minOccurs="1" maxOccurs="1" type="xsd:boolean"/>       </sequence>     </extension>   </complexContent> </complexType>  <complexType name="unpublish-parameters">   <sequence>     <!-- NOT REQUIRED: when true, the asset will be unpublished. Default: false -->     <element name="unpublish" minOccurs="0" maxOccurs="1" nillable="true" type="xsd:boolean"/>     <!-- NOT REQUIRED: unpublishes the asset from the given destinations. Default: all enabled destinations in the asset's site -->     <element name="destinations" minOccurs="0" maxOccurs="1" nillable="true" type="impl:assetIdentifiers"/>   </sequence> </complexType>`
    

# Cascade CMS 8.15[](#CascadeCMS8_15)

-   The `siteImproveIntegrationEnabled`property has been added to the `site` complexType which can be used to enable or disable the [Siteimprove Integration](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/siteimprove-integration.html) for the site.
-   The `accessSiteImproveIntegration` ability has been added to the `site-abilities`complexType which can be used to restrict user/group access to the [Siteimprove Integration](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/siteimprove-integration.html) when viewing folders and pages.

# Cascade CMS 8.14[](#CascadeCMS8_14)

-   Results from the `readAudits` operation will now default to one week's worth of audits in the cases where: 1) no `startDate` or `endDate` are provided, or 2) an `endDate` is provided *without* a `startDate`. Otherwise, all audits within the provided date range will be returned.
-   New `entityTypeString` enumeration values: `workflowemail` and `workflowemailcontainer`
-   New properties added to `workflow`:  
    -   `completedWorkflowEmailId` (string)
    -   `completedWorkflowEmailPath` (string)
    -   `notificationWorkflowEmailId` (string)
    -   `notificationWorkflowEmailPath` (string)
-   New properties added to `workflowDefinition`:  
    -   `completedWorkflowEmailId` (string)
    -   `completedWorkflowEmailPath` (string)
    -   `notificationWorkflowEmailId` (string)
    -   `notificationWorkflowEmailPath` (string)
-   New string property added to `site` :`rootWorkflowEmailContainerId`
-   New boolean property in `site-abilities`: `accessWorkflowEmails`
-   New complex types: `workflowEmail` and `workflowEmailContainer`:
    
    `<complexType name="workflowEmail">   <complexContent>     <extension base="impl:containered-asset">       <sequence>         <!-- The subject of this email            REQUIRED -->         <element name="subject" maxOccurs="1" minOccurs="1" type="xsd:string"/>         <!-- The body of this email            REQUIRED -->         <element name="body" maxOccurs="1" minOccurs="1" type="xsd:string"/>       </sequence>     </extension>   </complexContent> </complexType>  <complexType name="workflowEmailContainer">   <complexContent>     <extension base="impl:containered-asset">       <sequence>         <!-- the array of children -->         <element name="children" maxOccurs="1" minOccurs="0" nillable="true" type="impl:container-children"/>       </sequence>     </extension>   </complexContent> </complexType>`
    

# Cascade CMS 8.12[](#CascadeCMS8_12)

-   In cases where structured data nodes have been removed from the Data Definition, but are still persisted with the asset, the nodes will be moved to the root level of `structured-data-nodes` and its `identifier` property will be changed to a static value of `<legacy>`.
-   When reading an asset with structured data nodes, a `structured-data-node` will now be returned for all fields. This means that if a given asset is missing a value for a field, a `structured-data-node` with that field's default value will be returned.

# Cascade CMS 8.11[](#CascadeCMS8_11)

-   The `dynamic-metadata-field-definition-value` complexType has an new `label` element allowing Dynamic Metadata Field items to be configured with an alternative label to coincide with a value.
-   The `dynamic-metadata-field-type` simpleType now has an additional `datetime` value
-   New properties added to `site`:
    -   `accessibilityCheckerEnabled` (boolean)
    -   `widenDamIntegrationEnabled` (boolean)
    -   `widenDamIntegrationCategory` (string)
    -   `webdamDamIntegrationEnabled` (boolean)
    -   `rootSharedFieldContainerId` (string)
-   New `entityTypeString` enumeration values: `sharedfield` and `sharedfieldcontainer`
-   New boolean property in `site-abilities`: `accessSharedFields`
-   New complex type properties in `asset`: `sharedField` and `sharedFieldContainer`
-   New complex types: `sharedField`, `sharedFieldContainer`

`<complexType name="sharedField">     <complexContent>       <extension base="impl:containered-asset">         <sequence>           <!-- The XML content of this shared field REQUIRED -->           <element name="xml" maxOccurs="1" minOccurs="1" type="xsd:string"/>         </sequence>       </extension>     </complexContent>   </complexType>      <complexType name="sharedFieldContainer">     <complexContent>       <extension base="impl:containered-asset">         <sequence>           <!-- the array of children -->           <element name="children" maxOccurs="1" minOccurs="0" nillable="true" type="impl:container-children"/>         </sequence>       </extension>     </complexContent>   </complexType>`

# Cascade CMS 8.9.1[](#CascadeCMS8_9_1)

-   The `read` SOAP operation will now correctly return `<tag>` elements within `<tags>` for an assets with tags.
-   The `listSubscribers` SOAP operation will now correctly return `<assetIdentifier>` elements within `<manualSubscribers>`

# Cascade CMS 8.9[](#CascadeCMS8_9)

## Content Tags

The `indexBlock` complexType has a new boolean field called `indexTags` which specifies whether or not the block should render tags assigned to assets being indexed.

The `folder-contained-asset` complexType has a new field called `tags` which is used to read/edit tags associated with an asset.

There are also two new complexTypes, `tags` and `tag`, which are used to structure the tags assigned to an asset.

### Related Asset Publishing

The `contentType` complexType has two new fields, `publishSetId` and `publishSetPath`, used to associate a Publish Set with the Content Type.

The `listSubscribers` operation has a new field called `manualSubscribers` to include relationships that are manually added to an asset.

The `publish` operation has a two new boolean fields:

-   `publishRelatedAssets` - includes related assets in the publish job
-   `publishRelatedPublishSet` - includes the Publish Set associated with the given Page's Content Type

### Asset Review Scheduling

The `folder-contained-asset` complexType's `reviewEvery` property is now validated to ensure the provided value is: 0, 30, 90, 180, or 365.

### System Preferences

When updating system preferences using the `editPreference` operation, the `system_pref_system_url` preference will be validated to ensure the provided `value` is a valid URL.

# Cascade CMS 8.8[](#CascadeCMS8_8)

## Siteimprove Settings

The *siteImproveUrl*property has been added to the *site* complexType which can be used to overwrite the Site URL if it differs from the URL specified within Siteimprove.

### System Dictionary

A new ability,*modifyDictionary*,has been added to the *global-abilities*complexType to match new abilities available in the UI related to allowing users the ability to modify the System Dictionary.

# Cascade CMS 8.7[](#CascadeCMS8_7)

## Asset Naming Rules

The following properties have been added to *site* asset:

-   *inheritNamingRules*
-   *namingRuleCase*
-   *namingRuleSpacing*
-   *namingRuleAssets*

### Scheduling properties

Properties *reviewOnSchedule* and *reviewEvery* belong now to *dublin-aware-asset* rather than *folder-contained-asset*. This means that *references*, *formats* and *templates* no longer have these properties.

### Move/rename workflow type

The *workflowDefinition* asset has a new boolean property: *move*.

# Cascade CMS 8.6[](#CascadeCMS8_6)

## Extensions to Strip

The *extensionsToStrip*property has been added to the *destination* and *site* complexTypes which can be used to remove extension(s) from links managed by Cascade CMS during publish.

### LDAP Users

The *ldapDN* property has been added to the *user* compexType which can be used to update an existing LDAP User's binding DN, or manually create new LDAP Users using Web Services.

# Cascade CMS 8.5[](#CascadeCMS8_5)

## Metadata Field Help Text

Metadata help text fields are now available for read/edit via web services to match the UI.  Fields *authorFieldHelpText, descriptionFieldHelpText, displayNameFieldHelpText, endDateFieldHelpText, expirationFolderFieldHelpText, keywordsFieldHelpText, reviewDateFieldHelpText, startDateFieldHelpText, summaryFieldHelpText, teaserFieldHelpText,*and*titleFieldHelpText* have been added to the*metadataSet*complexType and field *helpText*has been added to the*dynamicMetadataFieldDefinition*complexType to facilitate reading/editing help text.

### Scheduled Asset Review

Configuring scheduled asset reviews is now available via web services.  The *reviewOnSchedule* and *reviewEvery*properties have been added to the *folder-contained-asset* complexType which can be used to enable and configure the scheduling of reviews on home area assets.

# Cascade CMS 8.4.1.2ccc4d6[](#CascadeCMS8_4_1_2ccc4d6)

In 8.4.1.2ccc4d6, it is possible to configure whether or not folders should be included in the Stale Content Report. This setting is available at a folder level through the "includeInStaleContent" property:

`<element name="includeInStaleContent" maxoccurs="1" minoccurs="0" nillable="true" type="xsd:boolean"></element>`

# Cascade CMS 8.3[](#CascadeCMS8_3)

## WYSIWYG Editor Configurations

Customizable WYSIWYG Configurations, added in Cascade 8.3, can be manipulated via web services operations like most other assets in the system.  The available fields are displayed below:

`<complexType name="editorConfiguration">     <complexContent>       <extension base="impl:named-asset">         <sequence>           <!-- The Site in which the asset is located NOT REQUIRED when referencing the System Default Editor Configuration (id=DEFAULT, name=Default) One is REQUIRED for all other Editor Configurations -->           <element maxOccurs="1" minOccurs="0" name="siteId" nillable="true" type="xsd:string"></element>           <element maxOccurs="1" minOccurs="0" name="siteName" nillable="true" type="xsd:string"></element>              <!-- File containing css for the WYSIWYG editor Priority: cssFileId > cssFilePath NOT REQUIRED -->           <!-- When editing and selected asset is recycled, it is recommended to preserve this relationship by providing selected asset's id in case if the selected asset gets restored from the recycle bin. -->           <element maxOccurs="1" minOccurs="0" name="cssFileId" type="xsd:string"></element>           <!-- Path works only for non-recycled assets -->           <element maxOccurs="1" minOccurs="0" name="cssFilePath" type="xsd:string"></element>              <!-- NOT REQUIRED: For reading purposes only. Ignored when editing, copying etc. -->           <element maxOccurs="1" minOccurs="0" name="cssFileRecycled" type="xsd:boolean"></element>              <!-- JSON String for the configuration -->           <element maxOccurs="1" minOccurs="1" name="configuration" nillable="false" type="xsd:string"></element>         </sequence>       </extension>     </complexContent>   </complexType>`

A *listEditorConfigurations* operation has also been added which allows script writers to access all Wysiwyg Editor Configurations contained in a particular Site.

With the addition of WYSIWYG configurations, all WYSIWYG related properties on Groups and Sites have been removed.  Sites and Content Types have new properties *defaultEditorConfigurationId/defaultEditorConfigurationPath* and *editorConfigurationId/editorConfigurationPath* respectively, which allow editor configurations to be assigned to those asset types via web services.

New abilities*accessEditorConfigurations and bypassWysiwygEditorRestrictions*have been added to the *sites-abilities* complexType and the *accessDefaultEditorConfiguration* ability has been added to *global-abilities*to match new abilities available in the UI related to WYSIWYG configurations.

### Global Area Cleanup and Other Misc Updates

In an effort to clean up remnants of the Global Area, most of the old Global Area abilities on Roles that are no longer applicable have been removed from the *global-abilities* complexType.

The *defaultGroup* property has also been removed from User objects as it has been removed from the system entirely.

The *accessAudits* ability has been added to the *global-abilities*complexType to match the UI.

# Cascade CMS 8.1.1[](#CascadeCMS8_1_1)

-   Fixed: Blocks can not be read if underlying Data Definition has a field added to it

# Cascade CMS 8.1[](#CascadeCMS8_1)

## Search Updates

The Web Services search API has been updated to mirror the new Advanced Search UI added in Cascade 8.0.

It's now possible to filter search results by specific types, specific fields, and/or a specific site.  Search terms behave identically to how they behave in the UI.  Multi-word phrases can be searched for by surrounding the terms in double-quotes.  Unquoted terms will be matched individually.  For example, "mouse rat" will exactly match the phrase "mouse rat", but mouse rat will match mouse or rat or both.

Note that single term searches in 8.1 will also include partial word matches.  So, searching for housewill match milhouse and houseboat.  This did not happen in 8.0.x.

The "searchInformation" complexType has been changed to the following which more closely matches the new Advanced Search UI:

`<complexType name="searchInformation">     <sequence>       <element maxOccurs="1" minOccurs="1" name="searchTerms" type="xsd:string"></element>       <!-- Id or name of the site to search   NOT REQUIRED, if left blank, all sites will be searched -->       <element maxOccurs="1" minOccurs="0" name="siteId" nillable="false" type="xsd:string"></element>       <element maxOccurs="1" minOccurs="0" name="siteName" nillable="false" type="xsd:string"></element>       <!-- Asset fields to search (e.g. name, title, content), see searchField simpleType for valid values NOT REQUIRED -->       <element maxOccurs="1" minOccurs="0" name="searchFields" nillable="false" type="impl:searchFields"></element>       <!-- Asset types to search (e.g. page, folder, site) NOT REQUIRED, if left blank, all asset types will be searched -->       <element maxOccurs="1" minOccurs="0" name="searchTypes" nillable="false" type="impl:searchTypes"></element>     </sequence>   </complexType>`

Notice the elements to specify a site by either id or name, the element to specify the types of assets to match, and the element to specify the fields to match.

The searchTypes element can be populated with any of the values that already exist in the entityTypeString simpleType.

The searchFields element can be populated with any values present in the newly addedsearchFieldStringsimpleType displayed below.

`<simpleType name="searchFieldString">     <restriction base="xsd:string">       <!-- Basic fields -->       <enumeration value="name"/>       <enumeration value="path"/>       <enumeration value="createdBy"/>       <enumeration value="modifiedBy"/>       <!-- Metadata fields -->       <enumeration value="displayName"/>       <enumeration value="title"/>       <enumeration value="summary"/>       <enumeration value="teaser"/>       <enumeration value="keywords"/>       <enumeration value="description"/>       <enumeration value="author"/>       <!-- File content -->       <enumeration value="blob"/>       <!-- Velocity Format content -->       <enumeration value="velocityFormatContent"/>       <!-- WYSIWYG and Data Definition Page content, Text and XML Block content, Template content, XSLT Format content -->       <enumeration value="xml"/>       <!-- Symlink link text field -->       <enumeration value="link"/>     </restriction>   </simpleType>`

# Cascade CMS 8.0[](#CascadeCMS8_0)

## Asset Factory Descriptions

With the addition of the "description" field for Asset Factories and Asset Factory Containers in the UI, the WSDL has been updated to allow configuring that field via web services.

`<element maxOccurs="1" minOccurs="0" name="description" type="xsd:string"></element>`

### Goodbye Global!

With the removal of the Global Area from the system, all existing complexTypes containing a siteName and siteId now require that at least one of those fields be populated.  This includes all home area assets and site management components.  Note that this is not enforced in the WSDL but is enforced by the server whenever an edit or create operation is performed.

### Ability Updates

The existing "accessAdminArea" global ability has been renamed to "accessManageSiteArea" and a new ability with the old name, "accessAdminArea", has been added which governs access to the new System Administration area and not the Manage Site area as the renamed ability does.

The New Site wizard and Site Migration wizard tools have been removed from the system and their corresponding global abilities in the WSDL, "newSiteWizard" and "siteMigration", have also been removed.

The Recycle Bin Checker and Path Repair database tools have also been removed from the system and their global abilities, "recycleBinChecker" and "pathRepairTool", have likewise been removed from the WSDL.

### Search Updates

Search via the UI has been revamped; however, the WSDL has **not** yet been updated to be compatible with the new search functionality.  Searching via web services will be unpredictable at best and will outright fail at worst.  Stay tuned for search updates in a future release!

# Pre 8.0 Changelog[](#Pre8_0Changelog)

For all changes to the Cascade CMS SOAP Web Services API prior to Cascade CMS 8, see the [previous changelog.](https://www.hannonhill.com/cascadeserver/Web-Services/Web Services Changelog/index.html)

[↑](#top)

# Related Links

-   [Web Services Changelog](https://www.hannonhill.com/cascadeserver/Web-Services/Web Services Changelog/index.html)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }