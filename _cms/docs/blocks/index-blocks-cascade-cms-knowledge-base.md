---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/blocks/index-blocks.html
title: Index Blocks - Cascade CMS Knowledge Base
category: blocks
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Blocks

# Overview[](#Overview)

An index block is a special type of block that returns a listing of assets from the CMS directory structure in the form of XML data. Assets like pages, files, folders, external links, and even other blocks can be returned as XML content. An index block can even return the data content of multiple pages within a directory for use on other pages within the system.

Index blocks may also be used to return a listing of all pages of a particular content type. For example, all news articles found in a particular site may be lumped into a "news articles" index block.

In Cascade CMS, index blocks are typically used for creating dynamic navigation menus, site maps, indices, etc.

Because index blocks can be configured to index an entire site or a specific folder, the way you configure index blocks in your system will vary depending on your needs and specifications. You can choose to create index blocks that are limited by either the number of assets in a given folder, or by the number/depth of folders to index. To ensure dynamic and consistent content across your site, any time content relevant to that index block in the system changes (a page is added, deleted, renamed, moved, etc.), the index block automatically updates, and all pages using the index block are also updated.

# Creating an Index Block[](#CreatinganIndexBlock)

To create an index block:

1.  Click **Add Content** > **Default** > **Block**.
2.  Select **Index** and click **Choose**.
3.  In the **Name** field, enter a name for your block.
4.  In the **Placement Folder** field, choose the folder where the block should be created.
5.  Under **Index Block Settings**, configure the following options:
    -   **Folder Index** - Choosing this option will generate block contents based on the contents of the specified folder. If you want the block to index nested folders, simply select the highest folder.
        -   **Rendering Behavior** - This field has a great deal of impact on the structure of the rendered XML. It is important to choose a type of rendering behavior that is best suited to the purpose of a particular index block.  
            -   **Render normally, starting at the indexed folder** - This is the most common option and allows one to preview the rendered block XML in most cases when viewing the index block itself. This option renders data starting at the "Index Folder", and renders its children forward at a depth specified in the "Depth of Index" field. Subfolders will be included in the render, along with their children, to the extent to which the depth of index will allow.
            -   **Start at the current page and include its folder hierarchy** - One may think of this as a backwards render. This rendering option depends on a current page context. That is, that this option requires that the index block be rendered in a region of a page (it is for this reason that you may not see XML in the "view" of an index block asset in Cascade CMS). The rendering will start at the current page, render it, and then proceed to render each parent folder until the base folder is rendered. These index blocks tend to be rather small, and are well-suited for breadcrumb navigation generation.
            -   **Start at the current page with folder hierarchy, and also include sibling**s - This option is like the "Start at the current page and include its folder hierarchy" option, except that for each parent folder asset rendered, it will also render that folder's children as well. For example, when rendering with his option, the renderer will start at the current page and render all of the siblings of that page, including the page itself. It will then render the parent folder and all of its siblings, repeating until the base folder is rendered. Note that this option will not continue to render sibling folders as the parent folder hierarchy is traversed.
            -   **Start at the current page with folder hierarchy, siblings, and also render forward** - This option expands on the "Start at the current page with folder hierarchy, and also include siblings" rendering option, but also includes rendering the siblings of the current page, exactly the same way that the normal rendering option would render the current page's parent folder. This option is in effect, a combination of the "Render normally, starting at the indexed folder" and the "Start at the current page with folder hierarchy, and also include siblings" options.
        -   **Depth of Index** - If you only want one folder indexed, type in 1. If there are nested (or child) folders that you wish to include, type in the number of levels you want. If you are indexing all levels, but aren't sure how many there are, it is ok to overshoot (i.e. 100).
    -   **Content Type Index** - Choosing this option will generate block contents based on pages that share the specified Content Type.
    -   **Max Rendered Assets** - Determine how many assets you wish to be rendered. Limiting this number is useful when you want to return only the most recent pages, for example.
    -   **Indexed Asset Content** - This allows you to determine what information is included in results. These results may be styled or filtered via an accompanying script format.
        -   **Append Calling Page Data** - Appends data from the page which includes this index block.
        -   **Regular Content** - Includes content visible to users when editing.
        -   **System Metadata** - Includes system information such as when the asset was created and last updated, and by whom.
        -   **User Metadata** - Includes metadata the user can change.
        -   **Tags** - Includes tags assigned to the asset.
        -   **Folder Access Rights** - Includes permission information such as user and group names and their level of access.
        -   **User Information** - Includes information about the current user.
        -   **Workflow Information** - Includes the asset's workflow information, if applicable.
    -   **Indexed Asset Types** - This allows you to limit the types of assets. For most navigation features, only pages and links need to be indexed.
    -   **Page XML** - This field controls how page XML is rendered inline during an index block render. Note that Regular Content must be indexed in order to render page XML.
        -   **Do not render page XML inline** - This option will not include any XHTML or Data Definition content for any page that is included in the index block render.
        -   **Render page XML inline** - Default region content will be included for any page that is included in the index block render. For XHTML pages, it will be the XHTML/WYSIWYG content that one typically edits in the page. For pages with a Data Definition, it will be the rendered as XML. Note that for pages with a Data Definition, this XML will not have any XSLT applied to it.
        -   **Render page XML inline only for current page** - This is exactly like the "Render page XML inline" option, but only the current page is rendered in this manner. All other pages that are included in the index block render will not have the default page content included for those pages in the resulting document.
    -   **Block XML** - This field controls how block XML is rendered inline during an index block render. Note that Regular Content must be indexed in order to render block XML.
        -   **Do not render block XML inline** - This is the default and does not render any block content inline.
        -   **Render XHTML/Data Definition block, XML block, and Text block XML inline** - This option will render inline the contents of any block in the overall document.
    -   **Sort Method** - This determines the order in which assets are rendered. "Folder Order" refers to ordering content via the drag-and-drop folder view and can be useful in setting up custom navigation.
    -   **Sort Order** - This determines whether the assets are sorted in ascending or descending order.
6.  Click **Preview Draft** and **Submit**.

**Note** - In general, rendering inline page and block content will increase the size of the index block and will increase the amount of time needed to render the index block. Because this could slow down page load times in Cascade CMS, it's recommended that this option only be used if necessary.

# Indexed Asset Content[](#IndexedAssetContent)

## Regular Content

<table class="table table-striped"><caption>Regular Content</caption><tbody><tr><th scope="row" valign="top"><strong>&lt;path&gt;</strong></th><td valign="top">The path from the root of the site.</td></tr><tr><th scope="row" valign="top"><strong>&lt;site&gt;</strong></th><td valign="top">The site-link notation of the asset (only available in a site).</td></tr><tr><th scope="row" valign="top"><strong>&lt;link&gt;</strong></th><td valign="top">The site-link notation of the asset (only available in a site).</td></tr><tr><th scope="row" valign="top"><strong>&lt;display-name&gt;</strong></th><td valign="top">The "Display Name" metadata field.</td></tr><tr><th scope="row" valign="top"><strong>&lt;file-size&gt;</strong></th><td valign="top">The size (in bytes) of a file (only available for files).</td></tr><tr><th scope="row" valign="top"><strong>&lt;height&gt;</strong></th><td valign="top">The height (in pixels) of an image file (if present).</td></tr><tr><th scope="row" valign="top"><strong>&lt;width&gt;</strong></th><td valign="top">The width (in pixels) of an image file (if present).</td></tr></tbody></table>

### System Metadata

*Metadata populated by Cascade CMS automatically.*

<table class="table table-striped"><caption>System Metadata</caption><tbody><tr><th scope="row" valign="top"><strong>&lt;is-published&gt;</strong></th><td valign="top">Returns "true" if the asset has <em>Include when publishing</em> checked or "false" if the asset does not have <em>Include when publishing</em> checked.</td></tr><tr><th scope="row" valign="top"><strong>&lt;created-by&gt;</strong></th><td valign="top">The username of the user who created the asset.</td></tr><tr><th scope="row" valign="top"><strong>&lt;created-on&gt;</strong></th><td valign="top">Timestamp of when the asset was created.</td></tr><tr><th scope="row" valign="top"><strong>&lt;last-modified-by&gt;</strong></th><td valign="top">The username of the user who last modified the asset.</td></tr><tr><th scope="row" valign="top"><strong>&lt;last-modified&gt;</strong></th><td valign="top">Timestamp of when the asset was last modified.</td></tr></tbody></table>

### User Metadata

*Any metadata populated by a user (except Display Name, which is rendered in Regular Content).*

<table class="table table-striped"><caption>User Metadata</caption><tbody><tr><th scope="row" valign="top"><strong>&lt;title&gt;</strong></th><td valign="top"></td></tr><tr><th scope="row" valign="top"><strong>&lt;summary&gt;</strong></th><td valign="top"></td></tr><tr><th scope="row" valign="top"><strong>&lt;author&gt;</strong></th><td valign="top"></td></tr><tr><th scope="row" valign="top"><strong>&lt;teaser&gt;</strong></th><td valign="top"></td></tr><tr><th scope="row" valign="top"><strong>&lt;keywords&gt;</strong></th><td valign="top"></td></tr><tr><th scope="row" valign="top"><strong>&lt;description&gt;</strong></th><td valign="top"></td></tr><tr><th scope="row" valign="top"><strong>&lt;start-date&gt;</strong></th><td valign="top">UNIX timestamp of the start-date.</td></tr><tr><th scope="row" valign="top"><strong>&lt;end-date&gt;</strong></th><td valign="top">UNIX timestamp of the end-date.</td></tr><tr><th scope="row" valign="top"><strong>&lt;dynamic-metadata&gt;</strong></th><td valign="top">The element that holds &lt;name&gt; and &lt;value&gt; for dynamic metadata fields.</td></tr><tr><th scope="row" valign="top"><strong>&lt;name&gt;</strong></th><td valign="top">The name of the dynamic metadata field.&nbsp; Child element of &lt;dynamic-metadata&gt;.</td></tr><tr><th scope="row" valign="top"><strong>&lt;value&gt;</strong></th><td valign="top">The value of the dynamic metadata field.&nbsp; There can be multiple &lt;value&gt; nodes for checkbox field types.</td></tr></tbody></table>

### Folder Access Rights

*Information about the access rights of the assets.*

<table class="table table-striped"><caption>Folder Access Rights</caption><tbody><tr><th scope="row" valign="top"><strong>&lt;access-rights&gt;</strong></th><td valign="top">All the access rights information is contained in this element.</td></tr><tr><th scope="row" valign="top"><strong>&lt;user&gt;</strong></th><td valign="top">Each user's permissions are in this element. If a user does not have <em>read</em> or <em>write</em> permissions to the asset, the &lt;user&gt; node is not rendered.&nbsp; &lt;user&gt; has &lt;name&gt; and &lt;permssion&gt; as children elements.</td></tr><tr><th scope="row" valign="top"><strong>&lt;name&gt;</strong></th><td valign="top">Username</td></tr><tr><th scope="row" valign="top"><strong>&lt;permission&gt;</strong></th><td valign="top">The values <em>read</em> or <em>write</em>.</td></tr><tr><th scope="row" valign="top"><strong>&lt;group&gt;</strong></th><td valign="top">Each group's permissions are in this element. If a group does not have <em>read</em> or <em>write</em> permissions to the asset, the &lt;user&gt; node is not rendered.&nbsp; &lt;group&gt; has &lt;name&gt; and &lt;permssion&gt; as children elements.</td></tr><tr><th scope="row" valign="top"><strong>&lt;name&gt;</strong></th><td valign="top">The name of the group.</td></tr><tr><th scope="row" valign="top"><strong>&lt;permission&gt;</strong></th><td valign="top">The values <em>read</em> or <em>write</em>.</td></tr></tbody></table>

### User Information

*Adds an element after rendering the assets (i.e. towards the bottom of the index block) with information about the user accessing the page inside Cascade CMS. This information can be helpful for generating pages for view inside of Cascade CMS specific to the user.*

<table class="table table-striped"><caption>User Information</caption><tbody><tr><th scope="row" valign="top"><strong>&lt;user-information&gt;</strong></th><td valign="top">The element that contains all the user information nodes.</td></tr><tr><th scope="row" valign="top"><strong>&lt;username&gt;</strong></th><td valign="top">The username of the user currently accessing the index block (i.e. <em>your</em> username when viewing the index block).</td></tr><tr><th scope="row" valign="top"><strong>&lt;full-name&gt;</strong></th><td valign="top">The current user's full name.</td></tr><tr><th scope="row" valign="top"><strong>&lt;groups&gt;</strong></th><td valign="top">Contains &lt;group&gt; nodes for each group for the user.</td></tr><tr><th scope="row" valign="top"><strong>&lt;group&gt;</strong></th><td valign="top">The group's name.</td></tr></tbody></table>

### Workflow Information

*Contains any workflow information about the asset.*

<table class="table table-striped"><caption>Workflow Information</caption><tbody><tr><th scope="row" valign="top"><strong>&lt;workflow&gt;</strong></th><td valign="top">The element that contains all the workflow information.</td></tr><tr><th scope="row" valign="top"><strong>&lt;initialized&gt;</strong></th><td valign="top">If the workflow has started: <em>true</em> or <em>false</em> are the values.</td></tr><tr><th scope="row" valign="top"><strong>&lt;name&gt;</strong></th><td valign="top">The name of the workflow.</td></tr><tr><th scope="row" valign="top"><strong>&lt;owner&gt;</strong></th><td valign="top">The username of the workflow's owner (i.e. the user who started the workflow).</td></tr><tr><th scope="row" valign="top"><strong>&lt;related-entity-id&gt;</strong></th><td valign="top">The unique Cascade CMS identifier of the asset in workflow.</td></tr><tr><th scope="row" valign="top"><strong>&lt;related-entity-type&gt;</strong></th><td valign="top">The entity type of the asset in workflow: <em>page</em>, <em>block</em>, <em>file</em> or <em>symlink</em>.</td></tr><tr><th scope="row" valign="top"><strong>&lt;start-date&gt;</strong></th><td valign="top">The date the workflow began (in the format: <em>MMM DD, YYYY hh:mm a</em>).</td></tr><tr><th scope="row" valign="top"><strong>&lt;end-date&gt;</strong></th><td valign="top">The date the workflow expires (in the format: <em>MMM DD, YYYY hh:mm a</em>).</td></tr><tr><th scope="row" valign="top"><strong>&lt;status&gt;</strong></th><td valign="top">The workflow's status: <em>In Progress</em> or <em>Completed</em>.</td></tr><tr><th scope="row" valign="top"><strong>&lt;current-step&gt;</strong></th><td valign="top">If &lt;status&gt; is <em>In Progress</em>, information about the step the workflow is in currently.</td></tr><tr><th scope="row" valign="top"><strong>&lt;step&gt;</strong></th><td valign="top">Element that contains all the information about the current step.</td></tr><tr><th scope="row" valign="top"><strong>&lt;identifier&gt;</strong></th><td valign="top">The step's unique name.</td></tr><tr><th scope="row" valign="top"><strong>&lt;name&gt;</strong></th><td valign="top">The name of the step.</td></tr><tr><th scope="row" valign="top"><strong>&lt;type&gt;</strong></th><td valign="top">The type of step: <em>edit</em>, <em>transition</em>, or <em>system</em>.</td></tr><tr><th scope="row" valign="top"><strong>&lt;owner&gt;</strong></th><td valign="top">The user or group the step is assigned.</td></tr><tr><th scope="row" valign="top"><strong>&lt;owner-type&gt;</strong></th><td valign="top">Either <em>user</em> or <em>group</em>.</td></tr><tr><th scope="row" valign="top"><strong>&lt;started-one&gt;</strong></th><td valign="top">The date the step was started (in the format: <em>MMM DD, YYYY hh:mm a</em>).</td></tr><tr><th scope="row" valign="top"><strong>&lt;actions&gt;</strong></th><td valign="top">Element that contains &lt;action&gt; elements with the information about each action this step contains.</td></tr><tr><th scope="row" valign="top"><strong>&lt;action&gt;</strong></th><td valign="top">Element that contains information about the action.</td></tr><tr><th scope="row" valign="top"><strong>&lt;identifier&gt;</strong></th><td valign="top">The action's unique identifier.</td></tr><tr><th scope="row" valign="top"><strong>&lt;name&gt;</strong></th><td valign="top">The name of the action.</td></tr><tr><th scope="row" valign="top"><strong>&lt;action-type&gt;</strong></th><td valign="top">The type of action: <em>forward</em>, <em>reverse</em>, or <em>explicit</em>.</td></tr><tr><th scope="row" valign="top"><strong>&lt;entity-information&gt;</strong></th><td valign="top">Contains additional information about the entity attached to this workflow.</td></tr><tr><th scope="row" valign="top"><strong>&lt;id&gt;</strong></th><td valign="top">The entity's unique Cascade CMS identifier.</td></tr><tr><th scope="row" valign="top"><strong>&lt;cache-path&gt;</strong></th><td valign="top">The path of the entity from the root of the site.</td></tr><tr><th scope="row" valign="top"><strong>&lt;name&gt;</strong></th><td valign="top">The name of the entity.</td></tr><tr><th scope="row" valign="top"><strong>&lt;type&gt;</strong></th><td valign="top">The entity type: <em>page</em>, <em>file</em>, <em>block</em> or <em>symlink</em>.</td></tr><tr><th scope="row" valign="top"><strong>&lt;lock-information&gt;</strong></th><td valign="top">Contains information who has the entity locked with the element &lt;lock-owner&gt;.</td></tr><tr><th scope="row" valign="top"><strong>&lt;lock-owner&gt;</strong></th><td valign="top">The name of the user who has locked the entity.</td></tr><tr><th scope="row" valign="top"><strong>&lt;steps&gt;</strong></th><td valign="top">Contains &lt;step&gt; elements for each ordered step in the Workflow Definition.&nbsp; (See &lt;step&gt; above).</td></tr><tr><th scope="row" valign="top"><strong>&lt;unordered-steps&gt;</strong></th><td valign="top">Contains &lt;step&gt; elements for each unordered step in the Workflow Definition (See &lt;step&gt; above).</td></tr><tr><th scope="row" valign="top"><strong>&lt;histories&gt;</strong></th><td valign="top">Contains &lt;history&gt; elements for each change in the workflow.</td></tr><tr><th scope="row" valign="top"><strong>&lt;history&gt;</strong></th><td valign="top">Element that represents an update to the workflow.</td></tr><tr><th scope="row" valign="top"><strong>&lt;who&gt;</strong></th><td valign="top">Username of who updated the workflow.</td></tr><tr><th scope="row" valign="top"><strong>&lt;timestamp&gt;</strong></th><td valign="top">The date the update occurred (in the format: <em>MMM DD, YYYY hh:mm a</em>).</td></tr><tr><th scope="row" valign="top"><strong>&lt;action-name&gt;</strong></th><td valign="top">The name of the action used to update the workflow.</td></tr><tr><th scope="row" valign="top"><strong>&lt;comments&gt;</strong></th><td valign="top">Any user comments entered after the action was taken.</td></tr><tr><th scope="row" valign="top"><strong>&lt;source-step-name&gt;</strong></th><td valign="top">The name of the step where this update occurred.</td></tr><tr><th scope="row" valign="top"><strong>&lt;dest-step-name&gt;</strong></th><td valign="top">The name of the step where the update takes the workflow.</td></tr></tbody></table>

### Append Calling Page Data

*Adds all information about the current page using this index block.*

**<calling-page>** - Contains all information about the current page in a <system-page> element.

# Examples of Index Block XML[](#ExamplesofIndexBlockXML)

The examples below show a portion of an index block for each of the four types of indexed assets: folder, page, file, and external link.  
  
All index blocks begin with the following XML document element:

`<system-index-block name="index-block" type="folder" current-time="1245954924080">`

In this example, `index-block` is the system name of the block asset, and the index block is a folder index block. The `current-time` attribute is the Cascade CMS server's local time at which the index block was rendered represented as a Unix timestamp in milliseconds.  
  
A Content Type index block would start with the following:

`<system-index-block name="index-block" type="content_type" current-time="1245954924080">`

Note that Content Type index blocks do not display folder structure using `<system-folder>` elements. They inherently only contain `<system-page>` elements, because Content Types can only be assigned to pages.  
  
The following sections demonstrate index block XML for a page without a Data Definition, a page with a Data Definition, a folder containing a single page, a file, and an external link, an index or feed block, and an XHTML, XML, or text block.

## Page without a Data Definition

`<system-page id="ef81d1c90a00016b00659a66bcacb166">         <name>page</name>         <is-published>true</is-published>         <title>Lorem Ipsum Dolor Sit Amet</title>         <summary>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</summary>         <author>Author Name</author>         <teaser>Teaser</teaser>         <keywords>Comma, Separated, Keywords</keywords>         <description>Description</description>         <display-name>Lorem Ipsum</display-name>         <path>/index-block-example/page</path>         <created-by>admin</created-by>         <created-on>1245263810949</created-on>         <last-modified-by>admin</last-modified-by>         <last-modified>1245954849582</last-modified>         <page-xhtml>            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>         </page-xhtml>      </system-page>`

### Page with a Data Definition

`<system-page id="ef8c30b10a00016b00659a66495b1501">         <name>structured-data-page</name>         <is-published>true</is-published>         <title>Online Marketing Intern</title>         <author>Author Name</author>         <teaser>Teaser</teaser>         <keywords>Comma, Separated, Keywords</keywords>         <description>Description</description>         <display-name>Marketing Intern</display-name>         <path>/index-block-example/structured-data-page</path>         <created-by>admin</created-by>         <created-on>1245264490577</created-on>         <last-modified-by>admin</last-modified-by>         <last-modified>1245954890668</last-modified>         <system-data-structure definition-path="Job Posting">            <opening>               <job-title>Lorem ipsum</job-title>               <summary>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</summary>            </opening>            <responsibilities>               <bullet-point>Help manage our search engine optimization (SEO) &amp; pay-per-click (PPC) campaigns</bullet-point>               <bullet-point>Help plan annual conference event and customer communications</bullet-point>               <bullet-point>Write marketing copy</bullet-point>            </responsibilities>            <requirements>               <bullet-point>Strong interpersonal skills</bullet-point>               <bullet-point>Located in the Atlanta metropolitan area</bullet-point>            </requirements>            <closing>               <notes>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</notes>               <contact-email>careers@example.com</contact-email>            </closing>         </system-data-structure>      </system-page>`

### Folder

`<system-folder id="ef85ff080a00016b00659a6696c43ceb">         <name>folder</name>         <is-published>true</is-published>         <title>CHANGE ME</title>         <summary>CHANGE ME</summary>         <display-name>CHANGE ME</display-name>         <path>/index-block-example/folder</path>         <created-by>admin</created-by>         <created-on>1245264084723</created-on>         <last-modified-by>admin</last-modified-by>         <last-modified>1245264084723</last-modified>         <system-page id="18a659150a00016b01958816fa2e34a7">            <name>page</name>            <is-published>true</is-published>            <title>CHANGE ME</title>            <summary>CHANGE ME</summary>            <author>Author Name</author>            <teaser>Teaser</teaser>            <keywords>Comma, Separated, Keywords</keywords>            <description>Description</description>            <display-name>CHANGE ME</display-name>            <path>/index-block-example/folder/page</path>            <created-by>admin</created-by>            <created-on>1245954070774</created-on>            <last-modified-by>admin</last-modified-by>            <last-modified>1245954070774</last-modified>            <page-xhtml>               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>            </page-xhtml>         </system-page>      </system-folder>`

### File

`<system-file id="ef8505950a00016b00659a666df25e7d">         <name>file.txt</name>         <is-published>true</is-published>         <path>/index-block-example/file.txt</path>         <created-by>admin</created-by>         <created-on>1245264020863</created-on>         <last-modified-by>admin</last-modified-by>         <last-modified>1245954823105</last-modified>         <file-size>13</file-size>      </system-file>`

### External Link

`<system-symlink id="ef85a0af0a00016b00659a66a30910aa">         <name>external-link</name>         <display-name>An External Link</display-name>         <path>/index-block-example/external-link</path>         <created-by>admin</created-by>         <created-on>1245264060581</created-on>         <last-modified-by>admin</last-modified-by>         <last-modified>1245954788677</last-modified>         <link>http://www.hannonhill.com/</link>   </system-symlink>`

### Index or Feed Block

`<system-block id="18a828040a00016b01958816156e0c63">         <name>index-or-feed-block</name>         <path>/index-block-example/index-or-feed-block</path>         <created-by>admin</created-by>         <created-on>1245954189294</created-on>         <last-modified-by>admin</last-modified-by>         <last-modified>1245954273235</last-modified>      </system-block>`

### XHTML, XML, or Text Block

`<system-block id="ef826bc40a00016b00659a66c30019d5">      <name>xhtml-block</name>      <title>CHANGE ME</title>      <summary>CHANGE ME</summary>      <display-name>CHANGE ME</display-name>      <path>/index-block-example/xhtml-block</path>      <created-by>admin</created-by>      <created-on>1245263850415</created-on>      <last-modified-by>admin</last-modified-by>      <last-modified>1245263862596</last-modified>      <!-- XHTML -->      <block-xhtml>         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>      </block-xhtml>      <!-- XML -->      <block-xhtml>         <xml>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</xml>      </block-xhtml>      <!-- Text -->      <block-xhtml>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</block-xhtml>   </system-block>`

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }