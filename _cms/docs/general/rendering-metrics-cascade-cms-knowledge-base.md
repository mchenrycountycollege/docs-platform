---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/pages/rendering-metrics.html
title: Rendering Metrics - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Pages

# Overview[](#Overview)

Rendering metrics is a tool used to evaluate rendering times of page. You can see how long it takes for each region in a page to render and can then adjust blocks and formats applied to slow regions to improve rendering times.

To view rendering metrics for a page, click **More** > **Rendering Metrics**.

**Total Rendering Time** is the overall time (in milliseconds) that it took to render the page.

Any regions where rendering time is greater than 250ms are considered "slow" and appear in the **Slow Regions** section.  Each region can be expanded to show the block and format assigned to the region and how long it took to render the block and apply the format.

Index Block metrics include the number of assets rendered and if the maximum number of indexed assets is reached. The asset count does not include assets rendered for Index Blocks that are rendered inside pages whose XML is rendered as a part of the original Index Block rendering. So, an Index Block that only indexes 1 page, where that 1 page contains an Index Block that indexes other pages, will only be displayed as having rendered a single asset as a part of the Index Block rendering.

The next section is **All Regions**, which displays every region in the page and how long it took to render each. Each region can be expanded the same way as the Slow Regions section.

The last section is **Other Rendering Operations**, which includes **Supporting Asset Load Time**, **Link Rewriting Time** and **Serialization Time**. Generally, you won't be able to do anything to change these numbers, but they could be a cause for concern if there are unreasonably high values reported.

**Note** - Note that the sum of the individual rendering times will not always add up to the total rendering time. This is because there are some system operations related to rendering that are not displayed as a part of rendering metrics and should be thought of as overhead rendering costs.

# Troubleshooting Slow Region Renders[](#TroubleshootingSlowRegionRenders)

Slow loading page regions are usually the result of slow loading Index Blocks associated with those regions. When troubleshooting a slow loading Index Block, consider the following:

-   How many assets is the Index Block rendering?
-   Could the depth or location of the index be changed to limit the number of assets being rendered?
-   Could you use a Content Type Index Block instead of a Folder Index Block to index only pages using a particular Content Type?
-   Indexing both asset content and metadata is more time consuming. Does your index block need to index asset content? Many dynamic content regions only require the metadata of other assets.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }