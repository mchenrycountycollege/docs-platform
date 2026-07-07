---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/monsido-integration.html
title: Monsido Integration - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Connectors and Integrations

# Overview[](#Overview)

The integration between Cascade CMS and the [Monsido platform](https://monsido.com/) provides users with an efficient and time-saving workflow to address website issues, such as accessibility, broken links, misspellings and more.  
  
Monsido's browser extension for Chrome allows users to work in the Cascade CMS interface but receive visual on-page highlights of errors. This allows Cascade CMS users to efficiently work in a task-oriented manner, and maintain a high-quality website for their visitors.

![Monsido extension for Chrome](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/images/monsido-integration.png)

**Note**: The Monsido service is separate from Cascade CMS and is not included with the cost of your Cascade CMS subscription.

# Set up the page URL[](#SetupthepageURL)

In order for the Monsido integration to locate the page you're previewing in Cascade CMS in your Monsido Inventory, the published URL of the page must be available when previewing the page inside Cascade CMS.

To make the published page URL available:

1.  Create a Velocity [Format](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/index.html) containing the following code:
    
    `[system-view:internal] <script language="javascript">     window.top.postMessage({         type: "monsidoExtension",         fn: "overrideUrl",         data: ["${currentPage.site.url}/${currentPagePath}.html"]     },     "https://cascade.yourdomain.com"); </script> [/system-view:internal]`
    
2.  Replace `.html` with the default extension for your pages (if applicable).
3.  Replace `https://cascade.yourdomain.com` with the URL to your Cascade CMS environment.
4.  Create a new [region](https://www.hannonhill.com/cascadecms/latest/content-authoring/pages/system-tags.html) within the `<head>` tags of your Template(s). Example:
    
    `<!-- Page URL for Monsido integration. --> <system-region name="PAGE_URL"/>`
    
5.  Attach your Format to this new region in your Template(s).

**Note**: This will generate the published page URL by appending the current page path to your Site's **URL** setting. If you aren't seeing the results you expect, verify your site's URL in [Site Settings](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/index.html#SiteSettings).

# Enable the Monsido extension for Chrome[](#EnabletheMonsidoextensionforChrome)

1.  In Chrome, install the [Monsido Extension for Chrome](https://chrome.google.com/webstore/detail/new-monsido-extension/ggdpnefhigjoocdbalmhohmohjngdnfn) .
2.  Click the **Extensions** ( ) button in the toolbar.
3.  Click the Monsido extension to activate the Monsido sidebar.
4.  Log in with the email address and password associated with your Monsido account.

**Tip:** Pin the Monsido extension to your Chrome toolbar to make it easier to open and close the sidebar.  
  
![Extension menu in Chrome toolbar](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/images/monsido-extension.png)

# Viewing Monsido data[](#ViewingMonsidodata)

To view Monsido data for a page, navigate to the page within Cascade CMS and open the Monsido sidebar by clicking the extension in your toolbar in Chrome.

If you're not seeing data for your page in the sidebar, ensure that:

-   Your page has been published.
-   Your page has been scanned by Monsido and appears in your Inventory.
-   The [site URL](https://www.hannonhill.com/cascadecms/latest/cascade-administration/sites/index.html) for your site in Cascade CMS is the same as the URL in your Monsido account.
-   The published URL of the page has been made available inside the CMS. (See ["Set up the page URL"](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/monsido-integration.html#SetupthepageURL) above.)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }