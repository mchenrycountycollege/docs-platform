---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/linking.html
title: Linking - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Content Authoring

# Overview[](#Overview)

Cascade CMS provides a number of different ways to manage links in content depending on the type of asset containing the link, the type of link (internal or external), and the location of both assets.

# Asset links[](#Assetlinks)

**Asset links** or **internal links** are links between assets, such as Pages or Files, managed within the same Cascade CMS environment.

## Same-site links

Same-site links are links to an asset within the same site as the current asset. Example same-site link paths:

`/path/to/page`

`<img src="/path/to/file.png"/>`

### Cross-site links

Cross-site links are paths to an asset located in a different site than the current asset. They begin with a `site://` prefix followed by the name of the site where the linked-to asset is located. Example cross-site link paths:

`site://Site Name/path/to/page`

`<a href="site://Site Name/path/to/page">Link</a>`

In order for a cross-site link to resolve correctly, the linked-to asset must be found at the site and path provided and must be published.

**Note** - Internal links to page assets should not include the page's file extension, because this is added during publish depending on the page's Configuration settings.

### Link tracking

Most internal asset links are tracked, meaning the CMS creates an id-based relationship between the two assets and the link's path will be automatically updated if the linked-to asset is moved or renamed. (See "Asset links in XML-based content" below for more information.)

In contrast, **external links**, fully-qualified links to assets outside of the CMS including the file extension, are not tracked. Example external link:

`https://www.example.com/path/to/page.html`

While it's also possible to create an "external" link to a CMS-managed asset, it will not be tracked and won't be updated if that asset is moved or renamed.

**Note** - In some scenarios, an asset link that would normally be tracked in the system fails to be tracked. To correct these untracked links, a background task runs once per day to realign internal links within recognized XML-based content.

# Asset links in XML-based content[](#AssetlinksinXML-basedcontent)

Certain attributes of some elements in XML-based assets are automatically checked by Cascade CMS for asset links. Those XML-based assets are:

-   Pages
-   Templates
-   XML Blocks
-   XHTML Blocks
-   XSLT Formats

The table below describes which elements and attributes are automatically checked for links to CMS-managed content when editing, creating, or rendering the content.

Elements and attributes managed as tracked links
| Element | href | src | background |
| --- | --- | --- | --- |
| a | Yes | No | No |
| area | Yes | Yes | Yes |
| body | No | Yes | Yes |
| td | No | No | Yes |
| table | No | No | Yes |
| embed | Yes | Yes | No |
| frame | No | Yes | No |
| iframe | No | Yes | No |
| img | No | Yes | No |
| input | Yes | Yes | Yes |
| param | Yes | Yes | Yes |
| link | Yes | Yes | No |
| script | No | Yes | No |

# System-asset pseudo-tags[](#System-assetpseudo-tags)

To create asset links in non-XML content or outside of a recognized attribute (see "Asset links in XML-based content" above), you can use system-asset pseudo-tags to mark the path as a CMS-managed asset.

`[system-asset]/path/to/asset[/system-asset]`

Scenarios where you may require system-asset pseudo-tags include:

-   background images in CSS
-   imported CSS files
-   images referenced in JavaScript rollover code (either in JavaScript files or in page content)

Example using system-asset pseudo-tags with a path for a CSS background image:

`body {     background: url('[system-asset]/_files/images/background.png[/system-asset]')  }`

**Note** - To ensure asset links within a file are tracked and rewritten correctly, ensure that the **Rewrite asset links in file** option is enabled in its **Configure** tab.

## Local asset pseudo-tags

`[system-asset:local]/path/to/asset[/system-asset:local]`

Used to create a link to the asset at the path provided in whichever site the current page is located.

For example, consider a Template shared by many sites, each with their own custom CSS file. You can use  system-asset:local pseudo-tags in the Template to tell the CMS to include the CSS file specific to the site where the current page is located.

`<link href="[system-asset:local]_files/css/main.css[/system-asset:local]"/>`

This type of link doesn't point to a specific asset; so while the link will be rewritten during preview and when published, it's not tracked or link-checked.

### Embedded image pseudo-tags

`[system-asset:embedded-image]/path[/system-asset:embedded-image]`

Used for embedding images in PDF and RTF file formats. By supplying a path to the tag, the CMS is able to pass the appropriate image to the FO processor so that it can display in the resulting document.

### Output pseudo-tags and attribute

`[system-asset:configuration=output_name]/path/to/page[/system-asset:configuration]`

Used to create a link to a different Output of the page specified.

`<a system-page-output="pdf">Printer-friendly Version</a>`

Used to create a link to a different Output of the current page. When published, the `system-page-output` attribute is replaced by an `href` attribute.

# Linking to a page rendering[](#Linkingtoapagerendering)

Within Cascade CMS by default a link to another page is rewritten such that clicking on that link will display the page asset preview inside the Cascade CMS. In some cases, though, it's necessary to link to the actual rendering of the page itself and not the page asset. This is useful, for example, when the linked-to page generates pure JavaScript content and we want to link to that page from inside of a script tag's src attribute. Along these same lines, its possible to link to a page that generates pure CSS using a link tag with an href attribute that references the CSS file.

To be able to link to the actual rendering, the parameter **raw**needs to be included in the link, for example:

`<link href="/css/page-that-renders-css?raw"/>`

Using this parameter affects only renderings inside of Cascade CMS. It does not have an effect on published pages because the raw parameter is stripped during publishing:

`<link href="../css/page-that-renders-css.css"/>`

The above example will generate a link to the default Output for the Page. If you need to generate a link to a different Output's rendering, use:

`<link href="[system-asset:configuration=configuration_name]/css/page-that-renders-css?raw[/system-asset:configuration]"/>`

# Links between pages and page outputs[](#Linksbetweenpagesandpageoutputs)

Pages often publish to multiple locations with multiple Output extensions by using Configurations with more than one page Output. Links within the page content that link to other pages will be rewritten differently upon publish depending on which page Output they're being rewritten for and which Output the target page has.

The following table shows three different pages, using different Configurations.

<table border="1" cellpadding="6" class="table table-striped"><caption>Pages with different Configurations</caption><tbody><tr><th scope="col">Page</th><th scope="col">Content Type</th><th scope="col">Configuration</th><th scope="col">Output</th></tr><tr><td>PageA</td><td rowspan="2">CT1</td><td rowspan="2">CS1</td><td>HTML <em>(Default)</em></td></tr><tr><td>PageB</td><td>XML</td></tr><tr><td rowspan="2">PageC</td><td rowspan="2">CT2</td><td rowspan="2">CS2</td><td>ASP <em>(Default)</em></td></tr><tr><td>XML</td></tr></tbody></table>

When a page links to another page, it tries to link to the same output. When PageA links to PageB inside the default output (HTML), then the link will direct to the HTML output. If PageA is linking to PageB in the XML output, the link will direct to the XML output. The pages stay in the same outputs unless specified (using \[system-asset:configuration=HTML\] for example).

Linking between PageA or PageB to PageC, which has different outputs, works a little differently. Since PageC does not have an HTML output, when PageA/PageB link to PageC in the HTML output, the link directs to the default output of PageC (ASP). There is no need to specify that PageA's HTML output needs to link to PageC's ASP output.

Linking from the XML output in PageA/PageB to PageC will stay in the XML output, since they are both named XML.

# Link Rewriting Using Destination URLs[](#LinkRewritingUsingDestinationURLs)

Once a page is published, links in that page to other assets managed in Cascade in the same site are rewritten using a relative link format, by default. Cross-site links are rewritten as absolute links by prepending the linked-to site's URL property. It's possible to link from one Output that publishes to one web server to a different Output that publishes to another web server, while both reside in the same site in the CMS.

## Mobile Output Example

For example, when linking from an **HTML** Output that publishes to *http://example.com*, to a **Mobile** Output that publishes to *http://m.example.com*, the **Mobile** Destination URL will be used.

Here is a complete list of requirements for a Destination URL to be used when link rewriting:

-   Link points to a different Output, either using a \[system-asset:configuration\] tag or simply linking to a page that has a different default Output.
-   The linked-to Output publishes only to selected Destinations, which is specified at Content Type level.
-   Out of the selected Destinations, only one distinct Web URL property is specified; two or more Destinations can have a Web URL specified, but they must be identical.
-   The page that is currently being published that contains the link is not currently being published to a Destination with the Web URL.

Therefore, going back to the example above, the following setting would produce a link that uses Destination URL upon publish:

-   Page **/pageA**, **HTML** Output links to **/pageB**'s **Mobile** Output using *\[system-asset:configuration=mobile\]/pageB\[/system-asset:configuration\]*.
-   Page **/pageA**'s **HTML** Output publishes to Destination **HTML**, while **/pageB**'s **Mobile** output publishes only to Destination **Mobile** - both configured at Content Type level.
-   Destination **Mobile** has a URL set to *http://m.example.com*. Destination **Standard** has a URL set to *http://example.com.*
-   The resulting link upon publish would look like this: *http://m.example.com/pageB.html* and it would be linked from a page located at: *http://example.com/pageA.html.*

### Overriding the Site URL for Cross-Site Links

The Destination's Web URL, when specified, also overrides the Site's URL when cross-site linking to a page Output that is set to publish to a particular Destination via it's Content Type. In this case, the site's URL is ignored and the Destination Web URL is used instead.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }