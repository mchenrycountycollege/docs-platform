---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/content-checks.html
title: Content Checks - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Content Authoring

# Overview[](#Overview)

You can check new and revised assets for spelling errors, invalid internal or external links and accessibility issues with Cascade CMS's built-in content checks.

To run these checks, ensure they're [enabled for your site](https://www.hannonhill.com/cascadecms/latest/content-authoring/content-checks.html#EnablingContentChecks) and select **Check Content & Submit** when creating or submitting an asset for changes.

**Tip** - You can enforce content checks for users by disabling the **Bypass Accessibility, Link, and Spell Checks when submitting content changes** ability in their [Site Role](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/roles.html).

# Spell Check[](#SpellCheck)

The Spell Check checks and reports all words (in asset content and metadata) that are not found in the [system dictionary](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-dictionary.html).

Depending on your role abilities, you have the following options for handling each misspelled word:

-   **Add** - Add the word to the system dictionary.
-   **Ignore** - Disregard the word.
-   **Fix** - Enter your own correction or choose from a list of suggested replacements.

**Note** - Only users with the **Modify Dictionary** ability enabled in their [System Role](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/roles.html) can add words to the system dictionary.

# Link Check[](#LinkCheck)

The Link Check ensures that all links between assets in the system and links to external resources are valid. The **Broken Link** column lists the URL of the broken link, and the **Link Text** column lists the text wrapped for hyperlinks or the tag name for other types of links. You can click the question mark icon ( ) to the left of each link for more information on why the link is considered invalid.

You have two options for handling each broken link:

-   **Ignore** - Disregard the link.
-   **Fix** - Enter a corrected URL in a text box (for external links) or choose an asset within Cascade CMS via an asset chooser (for internal links).

## Scheme-relative Link Checking

External links that do not include a protocol, such as "//google.com" rather than "http://google.com" or "https://google.com" are called scheme-relative links. On the live site, they will navigate the website visitor to the same protocol as the page they are on. Cascade CMS follows a slightly different checking routine for such links as it cannot predict which protocol the visitor is going to view the page on. It verifies the link works with any of the two protocols and reports the link as broken only if the connection fails for both of these protocols.

# Accessibility Check[](#AccessibilityCheck)

The Accessibility content check ensures WYSIWYG content complies with the following accessibility guidelines:

-   Image (`img`) tags must have alternate text describing the graphic. (Section 508 / WCAG 2.0)
-   Table captions should not be empty. (HTML5 recommendation.)

For each issue found, you have the following options:

-   **View Non-Compliant Content** - View the specific HTML markup flagged during the check.
-   **Ignore** - Disregard the issue.
-   **Fix** - Enter a value for the missing or flagged content. For example: alternate text for an image or caption for a table.

# Enabling Content Checks[](#EnablingContentChecks)

## At the System Level

1.  Click the system menu button ( ) > **Administration** > **Preferences** > **Content**.
2.  Under **General** > **Content Checks** select one or more options.
3.  Click **Submit**.

### At the Site Level

1.  Navigate to **Manage Site** > **Site Settings**.
2.  In the **Properties** tab, select one or more options under **Content Checks**.
3.  Alternatively, select **Inherit from system preferences** to enable the content checks selected in your system preferences.
4.  Click **Submit**.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }