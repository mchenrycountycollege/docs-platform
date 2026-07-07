---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/dubbot-integration.html
title: DubBot Integration - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Connectors and Integrations

# Overview[](#Overview)

The integration between Cascade CMS and the [DubBot platform](https://dubbot.com/)provides users with an efficient and time-saving workflow to address website issues, such as accessibility, broken links, web governance, spelling, SEO, and more.

DubBot offers deep linking to Cascade CMS from DubBot reports to your page assets in Cascade CMS.

**Note**: The DubBot service is separate from Cascade CMS and is not included with the cost of your Cascade CMS subscription.

# Deep linking in DubBot[](#DeeplinkinginDubBot)

To make correcting issues in your content easier, DubBot offers [CMS Deep linking](https://help.dubbot.com/en/articles/2462550-deep-linking-with-cascade-cms#deep-linking). Deep linking creates links to your page assets in Cascade CMS from within reports in your DubBot account. To do this, the Cascade CMS ID of your page assets needs to be included in the page's published source.

You can include a page's ID in your Template(s) with a simple region and Velocity format:

1.  Create a Velocity [Format](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/index.html) containing the following:
    
    `<meta name="id" content="${currentPage.identifier.id}"/>`
    
2.  Create a new [region](https://www.hannonhill.com/cascadecms/latest/content-authoring/pages/system-tags.html) within the `<head>` tags of your Template(s). Example:
    
    `<!-- Page ID for DubBot deeplinking. --> <system-region name="PAGE_ID"/>`
    
3.  Attach your Format to this new region in your Template(s).
4.  Publish all pages that use the Template(s) to ensure that your page ID `<meta>` tag gets included the pages on your web server.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }