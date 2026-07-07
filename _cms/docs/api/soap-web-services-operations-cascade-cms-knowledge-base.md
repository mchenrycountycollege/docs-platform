---
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/soap-web-services-api/soap-web-services-operations.html
title: SOAP Web Services Operations - Cascade CMS Knowledge Base
category: api
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

SOAP Web Services API

# Introduction to Web Services Operations[](#IntroductiontoWebServicesOperations)

When looking through the WSDL, you can find all of the operations available along with their responses at the top. Every operation is represented by an `<element>` block with the corresponding name for the operation; the response is simply the name of the operation with a "Response" suffix.

The responses contain an "operationResult", which is described by the following complexType in the WSDL:

`<complexType name="operationResult">     <sequence>       <element maxOccurs="1" name="success" type="xsd:string"></element>       <element maxOccurs="1" name="message" nillable="true" type="xsd:string"></element>                          </sequence>   </complexType>`

This WSDL describes that inside the corresponding element (i.e. "editReturn") will appear two more elements: "success", which will be either "true" or "false", and a "message" element that will contain a relevant message from the server (generally only non-nill when the operation failed).

# Authentication[](#Authentication)

For each operation, it is necessary to include authentication information. This is specified by the required "authentication" element seen in every request type. Looking further in the WSDL, we see the following:

`<complexType name="authentication">     <sequence>       <element minOccurs="0" name="password" nillable="false" type="xsd:string"></element>     <element minOccurs="0" name="username" nillable="false" type="xsd:string"></element>     <element minOccurs="0" name="apiKey" nillable="false" type="xsd:string"></element>    </sequence>   </complexType>`

This complex type corresponds to this authentication element. The authentication type must contain one of: username and password OR apiKey, which are each of the type String. This is used by Cascade CMS to authenticate the user making the SOAP request and to ensure that the user has the proper permissions to carry out that operation.

Example:

`<m:authentication>     <m:username>admin</m:username>     <m:password>admin</m:password>   </m:authentication>  <!-- OR -->  <m:authentication>     <m:apiKey>27c03f58-7c79-45d1-aa8f-76d697bbb10d</m:apiKey>   </m:authentication>`

# Operation Overview[](#OperationOverview)

Creating and Editing are two very similar operations. Looking at the WSDL, we see both the "create" and "edit" operations take two sub-elements: authentication (discussed above) and asset. Asset is a universal classification for all Cascade CMS assets and for including workflow information (when necessary). Looking at the "asset" complexType , we see the following:

`<!-- asset is an aggregate type that includes all possible Cascade CMS assets        bundled with workflow configuration. When a user does not have the privileges to bypass        workflow, this configuration is used to configure the step assignments of the workflow --> <complexType name="asset">     <sequence>       <element maxOccurs="1" minOccurs="0" name="workflowConfiguration" type="impl:workflow-configuration"></element>       <choice>         <element maxOccurs="1" minOccurs="1" name="feedBlock" nillable="true" type="impl:feedBlock"></element>       <element maxOccurs="1" minOccurs="1" name="indexBlock" nillable="true" type="impl:indexBlock"></element>       <element maxOccurs="1" minOccurs="1" name="textBlock" nillable="true" type="impl:textBlock"></element>       <element maxOccurs="1" minOccurs="1" name="xhtmlDataDefinitionBlock" nillable="true" type="impl:xhtmlDataDefinitionBlock"></element>       <element maxOccurs="1" minOccurs="1" name="xmlBlock" nillable="true" type="impl:xmlBlock"></element>       <element maxOccurs="1" minOccurs="1" name="file" nillable="true" type="impl:file"></element>       <element maxOccurs="1" minOccurs="1" name="folder" nillable="true" type="impl:folder"></element>       <element maxOccurs="1" minOccurs="1" name="page" nillable="true" type="impl:page"></element>       <element maxOccurs="1" minOccurs="1" name="reference" nillable="true" type="impl:reference"></element>       <element maxOccurs="1" minOccurs="1" name="xsltFormat" nillable="true" type="impl:xsltFormat"></element>       <element maxOccurs="1" minOccurs="1" name="scriptFormat" nillable="true" type="impl:scriptFormat"></element>       <element maxOccurs="1" minOccurs="1" name="symlink" nillable="true" type="impl:symlink"></element>       <element maxOccurs="1" minOccurs="1" name="template" nillable="true" type="impl:template"></element>       <!-- admin area assets (must be manager or higher to access,          no workflowConfiguration needed -->       <element maxOccurs="1" minOccurs="1" name="user" nillable="true" type="impl:user"></element>       <element maxOccurs="1" minOccurs="1" name="group" nillable="true" type="impl:group"></element>       <element maxOccurs="1" minOccurs="1" name="role" nillable="true" type="impl:role"></element>       <element maxOccurs="1" minOccurs="1" name="assetFactory" nillable="true" type="impl:assetFactory"></element>       <element maxOccurs="1" minOccurs="1" name="assetFactoryContainer" nillable="true" type="impl:assetFactoryContainer"></element>       <element maxOccurs="1" minOccurs="1" name="contentType" nillable="true" type="impl:contentType"></element>       <element maxOccurs="1" minOccurs="1" name="contentTypeContainer" nillable="true" type="impl:contentTypeContainer"></element>       <element maxOccurs="1" minOccurs="1" name="connectorContainer" nillable="true" type="impl:connectorContainer"></element>       <element maxOccurs="1" minOccurs="1" name="twitterConnector" nillable="true" type="impl:twitterConnector"></element>       <element maxOccurs="1" minOccurs="1" name="facebookConnector" nillable="true" type="impl:facebookConnector"></element>       <element maxOccurs="1" minOccurs="1" name="wordPressConnector" nillable="true" type="impl:wordPressConnector"></element>       <element maxOccurs="1" minOccurs="1" name="googleAnalyticsConnector" nillable="true" type="impl:googleAnalyticsConnector"></element>       <element maxOccurs="1" minOccurs="1" name="pageConfigurationSet" nillable="true" type="impl:pageConfigurationSet"></element>       <element maxOccurs="1" minOccurs="1" name="pageConfigurationSetContainer" nillable="true" type="impl:pageConfigurationSetContainer"></element>       <element maxOccurs="1" minOccurs="1" name="dataDefinition" nillable="true" type="impl:dataDefinition"></element>       <element maxOccurs="1" minOccurs="1" name="dataDefinitionContainer" nillable="true" type="impl:dataDefinitionContainer"></element>       <element maxOccurs="1" minOccurs="1" name="sharedField" nillable="true" type="impl:sharedField"></element>       <element maxOccurs="1" minOccurs="1" name="sharedFieldContainer" nillable="true" type="impl:sharedFieldContainer"></element>       <element maxOccurs="1" minOccurs="1" name="metadataSet" nillable="true" type="impl:metadataSet"></element>       <element maxOccurs="1" minOccurs="1" name="metadataSetContainer" nillable="true" type="impl:metadataSetContainer"></element>       <element maxOccurs="1" minOccurs="1" name="publishSet" nillable="true" type="impl:publishSet"></element>       <element maxOccurs="1" minOccurs="1" name="publishSetContainer" nillable="true" type="impl:publishSetContainer"></element>       <element maxOccurs="1" minOccurs="1" name="target" nillable="true" type="impl:target"></element>       <element maxOccurs="1" minOccurs="1" name="siteDestinationContainer" nillable="true" type="impl:siteDestinationContainer"></element>       <element maxOccurs="1" minOccurs="1" name="destination" nillable="true" type="impl:destination"></element>       <element maxOccurs="1" minOccurs="1" name="fileSystemTransport" nillable="true" type="impl:fileSystemTransport"></element>       <element maxOccurs="1" minOccurs="1" name="ftpTransport" nillable="true" type="impl:ftpTransport"></element>       <element maxOccurs="1" minOccurs="1" name="databaseTransport" nillable="true" type="impl:databaseTransport"></element>       <element maxOccurs="1" minOccurs="1" name="cloudTransport" nillable="true" type="impl:cloudTransport"></element>       <element maxOccurs="1" minOccurs="1" name="transportContainer" nillable="true" type="impl:transportContainer"></element>       <element maxOccurs="1" minOccurs="1" name="workflowDefinition" nillable="true" type="impl:workflowDefinition"></element>       <element maxOccurs="1" minOccurs="1" name="workflowDefinitionContainer" nillable="true" type="impl:workflowDefinitionContainer"></element>       <element maxOccurs="1" minOccurs="1" name="workflowEmail" nillable="true" type="impl:workflowEmail"></element>       <element maxOccurs="1" minOccurs="1" name="workflowEmailContainer" nillable="true" type="impl:workflowEmailContainer"></element>       <element maxOccurs="1" minOccurs="1" name="twitterFeedBlock" nillable="true" type="impl:twitterFeedBlock"></element>       <!-- other assets -->       <element maxOccurs="1" minOccurs="1" name="site" nillable="true" type="impl:site"></element>       <element maxOccurs="1" minOccurs="1" name="editorConfiguration" nillable="true" type="impl:editorConfiguration"></element>     </choice>     </sequence>   </complexType>`

First, there is the workflowConfiguration element. This is necessary when the user executing the SOAP request does not have the required permissions to bypass workflow, and the operation is subject to workflow. For more information about workflow and SOAP, please see [Workflow and Web Services Operations](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/soap-web-services-api/soap-web-services-operations.html#WorkflowandWebServicesOperations).

Next, there is the choice element that specifies that the user has a choice between all these assets, and each one corresponds to a specific asset type in Cascade CMS. Note that due to the choice element wrapping these elements and the maxOccurs="1" and minOccurs="1" attributes, only one asset may be specified at a time. If you wish to do bulk creation/editing, see the [Batch Operation](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/soap-web-services-api/soap-web-services-operations.html#BatchOperation).

# Read Operation[](#ReadOperation)

All read operations conform to the following WSDL:

`<element name="read">       <complexType>           <sequence>               <element name="authentication" type="impl:authentication"></element>               <element name="identifier" type="impl:identifier"></element>           </sequence>       </complexType>   </element>`

Authentication has been discussed before, in the [Authentication](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/soap-web-services-api/soap-web-services-operations.html#Authentication) section.

The identifier complex type is defined in the following WSDL:

`<complexType name="identifier">     <sequence>       <choice>         <element maxOccurs="1" name="id" type="xsd:string"></element>         <element maxOccurs="1" name="path" type="impl:path"></element>       </choice>       <element maxOccurs="1" minOccurs="1" name="type" type="impl:entityTypeString"></element>     </sequence>   </complexType>`

An identifier is a composite type used to identify a single asset in Cascade CMS. It melds an ID or Path, and a type.

When using a Path as an identifer, you must use a Path type, which is a string of the path, and a Site name or Site ID:

`<complexType name="path">     <sequence>       <element maxOccurs="1" name="path" type="xsd:string"></element>       <choice>         <element maxOccurs="1" name="siteId" nillable="true" type="xsd:string"></element>         <element maxOccurs="1" name="siteName" nillable="true" type="xsd:string"></element>       </choice>     </sequence>   </complexType>`

The type is defined by the following enumeration:

`<simpleType name="entityTypeString">     <restriction base="xsd:string">         <enumeration value="assetfactory"/>         <enumeration value="assetfactorycontainer"/>         <enumeration value="block"/>         <enumeration value="block_FEED"/>         <enumeration value="block_INDEX"/>         <enumeration value="block_TEXT"/>         <enumeration value="block_XHTML_DATADEFINITION"/>         <enumeration value="block_XML"/>         <enumeration value="block_TWITTER_FEED"/>         <enumeration value="connectorcontainer"/>         <enumeration value="twitterconnector"/>         <enumeration value="facebookconnector"/>         <enumeration value="wordpressconnector"/>         <enumeration value="googleanalyticsconnector"/>         <enumeration value="contenttype"/>         <enumeration value="contenttypecontainer"/>         <enumeration value="destination"/>         <enumeration value="editorconfiguration"/>         <enumeration value="file"/>         <enumeration value="folder"/>         <enumeration value="group"/>         <enumeration value="message"/>         <enumeration value="metadataset"/>         <enumeration value="metadatasetcontainer"/>         <enumeration value="page"/>         <enumeration value="pageconfigurationset"/>         <enumeration value="pageconfiguration"/>         <enumeration value="pageregion"/>         <enumeration value="pageconfigurationsetcontainer"/>         <enumeration value="publishset"/>         <enumeration value="publishsetcontainer"/>         <enumeration value="reference"/>         <enumeration value="role"/>         <enumeration value="datadefinition"/>         <enumeration value="datadefinitioncontainer"/>         <enumeration value="sharedfield"/>         <enumeration value="sharedfieldcontainer"/>         <enumeration value="format"/>         <enumeration value="format_XSLT"/>         <enumeration value="format_SCRIPT"/>         <enumeration value="site"/>         <enumeration value="sitedestinationcontainer"/>         <enumeration value="symlink"/>         <enumeration value="target"/>         <enumeration value="template"/>         <enumeration value="transport"/>         <enumeration value="transport_fs"/>         <enumeration value="transport_ftp"/>         <enumeration value="transport_db"/>         <enumeration value="transport_cloud"/>         <enumeration value="transportcontainer"/>         <enumeration value="user"/>         <enumeration value="workflow"/>         <enumeration value="workflowdefinition"/>         <enumeration value="workflowdefinitioncontainer"/>         <enumeration value="workflowemail"/>         <enumeration value="workflowemailcontainer"/>     </restriction> </simpleType>`

# Delete Operation[](#DeleteOperation)

The delete operation is just like the read operation in that it contains an identifier. The WSDL describing the delete operation is as follows:

`<complexType name="delete">     <sequence>       <element maxOccurs="1" minOccurs="0" name="workflowConfiguration" type="impl:workflow-configuration"></element>       <element maxOccurs="1" minOccurs="1" name="identifier" type="impl:identifier"></element>       <element maxOccurs="1" minOccurs="0" name="deleteParameters" type="impl:deleteParameters"></element>   </sequence>   </complexType>`

The delete operation contains workflow information and an identifier, which are discussed in the [Workflow and Web Services Operations](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/soap-web-services-api/soap-web-services-operations.html#WorkflowandWebServicesOperations) and [Read Operation](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/soap-web-services-api/soap-web-services-operations.html#ReadOperation) sections, respectively.

# Move Operation[](#MoveOperation)

The move operation is just like the delete operation in that it contains an identifier. The WSDL describing the move operation is as follows:

`<complexType name="move">   <sequence>     <element maxOccurs="1" minOccurs="1" name="identifier" nillable="false" type="impl:identifier"></element>     <element maxOccurs="1" minOccurs="1" name="moveParameters" nillable="false" type="impl:moveParameters"></element>     <element maxOccurs="1" minOccurs="0" name="workflowConfiguration" nillable="false" type="impl:workflow-configuration"></element>   </sequence> </complexType>`

The move operation contains workflow information and an identifier, which are discussed in the [Workflow and Web Services Operations](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/soap-web-services-api/soap-web-services-operations.html#WorkflowandWebServicesOperations) and [Read Operation](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/soap-web-services-api/soap-web-services-operations.html#ReadOperation) sections, respectively.

# Publish Operation[](#PublishOperation)

The publish operation is very similar to the read and delete operation:

`<complexType name="publish">     <sequence>       <element name="identifier" nillable="true" type="impl:identifier"></element>     </sequence>   </complexType>`

This time the publish operation only takes an identifier and no workflow information. The identifier must reference only publishable assets: a file, folder, or page. Also, it is possible to specify a target, destination, or publish set by using the types target, destination, or publishset in the identifier. The user included in the authentication information must be of the publisher role or higher; otherwise they will not be able to publish and receive an response indicating a failure.

# Batch Operation[](#BatchOperation)

The batch operation is a simple way of accomplishing multiple operations while only transmitting a single SOAP request/response. Here is the WSDL for the "batch" element:

`<element name="batch">     <complexType>       <sequence>         <element maxOccurs="1" minOccurs="1" name="authentication" type="impl:authentication"></element>         <element maxOccurs="unbounded" name="operation" type="impl:operation"></element>       </sequence>     </complexType>   </element>`

[Authentication](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/soap-web-services-api/soap-web-services-operations.html#Authentication) has already been discussed; what is important here is the ability to specify any number of "operation" elements, each of which map to the "operation" complex type:

`<complexType name="operation">     <choice>       <element name="create" type="impl:create"></element>       <element name="delete" type="impl:delete"></element>       <element name="edit" type="impl:edit"></element>       <element name="publish" type="impl:publish"></element>       <element name="read" type="impl:read"></element>     </choice>   </complexType>`

The operation complex type is simply an aggregate of all the other operation types available.

Here is a sample batch request:

`<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">     <SOAP-ENV:Body>       <m:batch xmlns:m="http://www.hannonhill.com/ws/ns/AssetOperationService">         <m:authentication>           <m:password>admin</m:password>           <m:username>admin</m:username>         </m:authentication>         <m:operation>           <m:create>             <m:asset>               <m:page>                 <m:name>default</m:name>                 <m:parentFolderPath>/intranet</m:parentFolderPath>                 <m:path>/intranet/default</m:path>                 <m:metadata>                   <m:author>Zach Bailey</m:author>                 </m:metadata>                 <m:metadataSetId>ROOT</m:metadataSetId>                 <m:shouldBePublished>true</m:shouldBePublished>                 <m:shouldBeIndexed>true</m:shouldBeIndexed>                 <m:xhtml><![CDATA[<p>Welcome to my page!</p>]]></m:xhtml>               </m:page>             </m:asset>           </m:create>           <m:publish>             <m:identifier>               <m:path>/intranet/default</m:path>               <m:type>page</m:type>             </m:identifier>           </m:publish>         </m:operation>       </m:batch>     </SOAP-ENV:Body>   </SOAP-ENV:Envelope>`

This batch request edits the /intranet/default page and then publishes those changes.

# Workflow and Web Services Operations[](#WorkflowandWebServicesOperations)

When a user making an edit, create, or delete request does not have the role/permission to bypass workflow, it is necessary to include workflow information in the request message.

`<complexType name="workflow-configuration">     <sequence>       <element maxOccurs="1" minOccurs="1" name="workflowName" type="xsd:string"></element>       <choice>         <element maxOccurs="1" minOccurs="1" name="workflowDefinitionId" type="xsd:string"></element>         <element maxOccurs="1" minOccurs="1" name="workflowDefinitionPath" type="xsd:string"></element>       </choice>       <element maxOccurs="1" minOccurs="1" name="workflowComments" type="xsd:string"></element>       <element maxOccurs="1" minOccurs="0" name="workflowStepConfigurations" type="impl:workflow-step-configurations"></element>     </sequence>   </complexType>`

This complex type allows the user to specify what to name the workflow instance and what workflow definition to use when instantiating workflow. Additionally, the user must provide workflow comments explaining the action and any workflow step configuration.

Configuring the Workflow Steps

The workflowStepConfigurations element corresponds to the following workflow-step-configurations complex type:

`<complexType name="workflow-step-configurations">     <sequence>       <element maxOccurs="unbounded" name="workflowStepConfiguration" type="impl:workflow-step-configuration"></element>     </sequence>   </complexType>`

This complex type is just a list of workflowStepConfiguration elements which correspond to workflow-step-configuration complex types:

`<complexType name="workflow-step-configuration">     <sequence>       <element maxOccurs="1" minOccurs="1" name="stepIdentifier" type="xsd:string"></element>       <element maxOccurs="1" minOccurs="1" name="stepAssignment" type="xsd:string"></element>     </sequence>   </complexType>`

This allows the user to re-assign workflow steps with a given identifier (using the stepIdentifier element) to a given user or group (using the stepAssignment element). If no workflow step configurations are supplied, the workflow will be initialized with the default values for each step. If no default values are specified in the workflow definition, the user will receive an error explaining that the workflow's steps must be configured.

## Transitioning Between Workflow Steps

Workflow steps can be transistions with web services using the performWorkflowTransition call.  This call requires the workflowTransitionInformation complex type:

`<complexType name="workflowTransitionInformation">          <sequence>          <!-- REQUIRED: The id of the workflow to perform the transition on -->               <element maxOccurs="1" minOccurs="1" name="workflowId" type="xsd:string"></element>          <!-- REQUIRED: The identifier of the action to transition to -->               <element maxOccurs="1" minOccurs="1" name="actionIdentifier" type="xsd:string"></element>          <!-- NOT REQUIRED: The user's comment about the transition taken -->               <element maxOccurs="1" minOccurs="0" name="transitionComment" nillable="true" type="xsd:string"></element>          </sequence>      </complexType>`

# Search Operation[](#SearchOperation)

The search operation is defined by the following WSDL:

`<element name="search">     <complexType>       <sequence>         <element name="authentication" type="impl:authentication"></element>         <element name="searchInformation" type="impl:searchInformation"></element>       </sequence>     </complexType>   </element>`

This operation contains [authentication](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/soap-web-services-api/soap-web-services-operations.html#Authentication) information and `searchInformation`.

The `searchInformation` complex type, and related types, are defined as follows:

`<complexType name="searchInformation">   <sequence>     <element maxOccurs="1" minOccurs="1" name="searchTerms" type="xsd:string"></element>     <!--Id or name of the site to search     NOT REQUIRED, if left blank, all sites will be searched-->     <element maxOccurs="1" minOccurs="0" name="siteId" nillable="false" type="xsd:string"></element>     <element maxOccurs="1" minOccurs="0" name="siteName" nillable="false" type="xsd:string"></element>     <!--Asset fields to search (e.g. name, title, content), see searchField simpleType for valid values     NOT REQUIRED-->     <element maxOccurs="1" minOccurs="0" name="searchFields" nillable="false" type="impl:searchFields"></element>     <!--Asset types to search (e.g. page, folder, site)     NOT REQUIRED, if left blank, all asset types will be searched-->     <element maxOccurs="1" minOccurs="0" name="searchTypes" nillable="false" type="impl:searchTypes"></element>   </sequence> </complexType> <complexType name="searchFields">   <sequence>     <element maxOccurs="unbounded" minOccurs="0" name="searchField" nillable="false" type="impl:searchFieldString"></element>   </sequence> </complexType> <complexType name="searchTypes">   <sequence>     <element maxOccurs="unbounded" minOccurs="0" name="searchType" nillable="false" type="impl:entityTypeString"></element>   </sequence> </complexType> <simpleType name="searchFieldString">   <restriction base="xsd:string">     <!--Basic fields-->     <enumeration value="name"/>     <enumeration value="path"/>     <enumeration value="createdBy"/>     <enumeration value="modifiedBy"/>     <!--Metadata fields-->     <enumeration value="displayName"/>     <enumeration value="title"/>     <enumeration value="summary"/>     <enumeration value="teaser"/>     <enumeration value="keywords"/>     <enumeration value="description"/>     <enumeration value="author"/>     <!--File content-->     <enumeration value="blob"/>     <!--Velocity Format content-->     <enumeration value="velocityFormatContent"/>     <!--WYSIWYG and Data Definition Page content, Text and XML Block content, Template content, XSLT Format content-->     <enumeration value="xml"/>     <!--Symlink link text field-->     <enumeration value="link"/>   </restriction> </simpleType>`

This `searchInformation` complex type, and related types, contain all the fields that one would find in the Advanced Search screen from within the Cascade CMS web interface.

When executing a  search, Cascade CMS will return a Search Result object:

`<complexType name="searchResult">     <complexContent>       <extension base="impl:operationResult">         <sequence>           <element maxOccurs="1" minOccurs="1" name="matches" type="impl:search-matches"></element>         </sequence>       </extension>     </complexContent>            </complexType>`

This complex type contains a type called "search-matches", which is an array of identifiers:

`<complexType name="search-matches">     <sequence>       <element maxOccurs="unbounded" minOccurs="0" name="match" type="impl:identifier"></element>     </sequence>   </complexType>`

# Authenticate Operation[](#AuthenticateOperation)

The authenticate operation relies on the same authentication type the other Asset Operations use:

`<element name="authenticate">     <complexType>       <sequence>         <element name="authentication" type="impl:authentication"></element>       </sequence>     </complexType>   </element>`

This authentication object contains username, password and apiKey elements; all of which are of type String. Either username and password OR apiKey are required.

**Note** - The Authenticate Operation is implemented in the Security Service, which is a different Cascade CMS Web Services Endpoint than the Endpoint used to accomplish the other operations (Asset Operation Handler). Make sure that when you are sending a request containing this operation that you are sending it to the correct endpoint (Security Service).

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }