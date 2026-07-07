---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/pages/system-tags.html
title: System Tags - Cascade CMS Knowledge Base
category: system-settings
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Pages

# Overview[](#Overview)

Cascade CMS recognizes specific XML elements called system tags that are used for dynamic content insertion. System tags are XML elements whose names begin with `system-`.

System tags may be used as content region tags, which are regions within [Templates](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/templates/index.html) where content can be inserted as static or dynamic content blocks, or as the result of a Format acting on a block.

System tags may also be used as metadata tags, where page information (title, author, publish date, etc.) can be used as shorthand on a page.

# System Region Tags[](#SystemRegionTags)

System region tags are self-closing tags with a single attribute `name` that is used to specify the name of the region. This region name is used when viewing Templates, Configurations, and Pages.

`... 	<div class="section section-white"> 			<div class="container"> 				<div class="row"> 					<div class="col-md-6"> 						<system-region name="DEFAULT"/> 					</div> 					<div class="col-md-6"> 						<system-region name="SLIDER"/> 					</div> 				</div> 			</div> 		</div> 		<system-region name="SPOTLIGHTS"/> 		<system-region name="FOOTER"/> 		<system-region name="FOOTER JS"/> 	</body> </html>`

**Note** - A system-region named `DEFAULT` should be the region that contains the main content of a page. Other region names can be used to create as many additional content regions as necessary. If no region exists when the Template is created or edited, a `DEFAULT` region will automatically be added immediately after the opening `<body>` tag.

**Note** - Renaming a system region will cause any Block/Format assignments to be removed from that region. Make sure to take note of any region assignments prior to renaming so that you can assign the corresponding Block/Format back as needed.

# Metadata Tags[](#MetadataTags)

Metadata tags allow you to include metadata from the current page directly in your Template or page source code.

Available individual metadata system tags.
| Tag | Description | Example Output |
| --- | --- | --- |
| `<system-page-name/>` | The system name of the page. | system-tags |
| `<system-page-creator/>` | The creator of the page. | Charlie Holder |
| `<system-page-title/>` | The contents of the page's Title metadata field. | System Tags |
| `<system-page-summary/>` | The contents of the page's Summary metadata field. | Cascade CMS recognizes specific XML elements called system tags that are used for dynamic content insertion. |
| `<system-page-author/>` | The contents of the page's Author metadata field. | Charlie Holder |
| `<system-page-teaser/>` | The contents of the page's Teaser metadata field. | Learn more about system tags in Cascade CMS. |
| `<system-page-keywords/>` | The contents of the page's Keywords metadata field. | tags, metadata, xml |
| `<system-page-description/>` | The contents of the page's Description metadata field. | A review of available system tags in Cascade CMS. |
| `<system-page-display-name/>` | The contents of the page's Display Name metadata field. | System Tags |
| `<system-page-start-date/>` | The contents of the page's Start Date metadata field, displayed in US date format `MMM DD, YYYY hh:mm a`. | May 1, 2021 12:00 AM |
| `<system-page-end-date/>` | The contents of the page's End Date metadata field, displayed in US date format `MMM DD, YYYY hh:mm a`. | May 8, 2021 12:00 AM |

Additional tags can be used to generate entire metadata elements.

Available meta element generating system tags.
| Tag | Description | Example Output |
| --- | --- | --- |
| `<system-page-meta-keywords/>` | A meta element including the contents of the page's Keywords metadata field. | `<meta content="tags, metadata, xml" name="keywords" />` |
| `<system-page-meta-description/>` | A meta element including the contents of the page's Description metadata field. | `<meta content="A review of available system tags in Cascade CMS." name="description" />` |
| `<system-page-meta-author/>` | A meta element including the contents of the page's Author metadata field. | `<meta content="Charlie Holder" name="author" />` |
| `<system-page-meta-date/>` | A meta element including the date and time the page was rendered. | `<meta content="Fri, 07 May 2021 13:56:22 -0560" name="date" />` |

**Note:** Because system tags are XML elements, they may not be used within XML attributes.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }