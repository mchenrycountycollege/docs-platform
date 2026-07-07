---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/ai-content-and-seo-suggestions.html
title: AI Content and SEO Suggestions - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Content Authoring

# Overview[](#Overview)

Introducing Cascade CMS intelligence: new features to help you quickly create effective and SEO friendly content including metadata titles, summaries, keywords and alternative text for images.

# Using AI Suggestions[](#UsingAISuggestions)

On any field with AI suggestions, you'll see the AI icon. Click it to generate content like titles, summaries, descriptions and keywords based on the asset's content. You can generate suggestions more than once and accept the ones.

When inserting images into content with the editor, use the AI suggest link to create alternative text description for an image using the image itself.

![Screenshot of the AI recommendations section in Cascade CMS Cloud, highlighting the Native On-Page Accessibility Checker.](https://www.hannonhill.com/cascadecms/latest/content-authoring/images/ai-page-title-suggestions.png)

# Enable AI Suggestions[](#EnableAISuggestions)

To get started, an administrator or someone with access to "Access Administration Area" and "Edit system preferences" [Role abilities](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/role-abilities-in-cascade.html) must navigate to the [Administration menu](https://www.hannonhill.com/cascadecms/latest/cascade-administration/administration-menus.html) > Administration > AI Features and opt-in. This gives your consent to share your content with our custom-built, third-party AI assistants.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }