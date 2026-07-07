---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/snippets.html
title: Snippets - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Cascade Administration

# Overview[](#Overview)

Snippets are small but essential pieces of content across your website that can be centrally managed in the CMS. Once a Snippet is created by a content manager, contributors can then discover and leverage those through various fields while creating and editing assets.

Some common use cases for this include an organization’s name, department names, tuition rates, faculty-to-student ratio, or enrollment numbers.

# Creating/editing a Snippet[](#CreatingeditingaSnippet)

To create a Snippet:

-   Click **Menu -> Administration -> Snippets.**
-   Click **+Add Snippet.**
-   Fill out the required fields as described below:
    -   **Title** - A Snippet label shown to users when browsing and selecting Snippets. The label can contain any characters and be changed at any time, unlike the Snippet name which cannot be modified after creation.
    -   **Name** - The unique name/key used for Snippet value replacement. This can not be changed after creation. 
    -   **Value** - The value that will be used to replace the snippet.

To edit an existing Snippet:

-   Click **Menu -> Administration -> Snippets.**
-   In the Snippets listing, place your cursor next to the **Title** or **Value** of the Snippet that you're looking to modify and then click the pencil icon that appears to the right of it.
-   Make the necessary changes in the input field and then click Update (check mark icon).

**Note**: In order to view Snippets, Users must have a System Role with the A**ccess Administration Area** ability enabled. Snippet values can only contain text content (no HTML).

# Viewing Snippet Relationships[](#ViewingSnippetRelationships)

To see a listing of assets where a particular Snippet is in use:

-   Click **Menu -> Administration -> Snippets.**
-   In the table listing that appears, locate the Snippet in question and click the **Relationships** button (far right). This is useful for determining any assets that will be affected by changes that you may make to your Snippet.
-   Optionally, you can publish the related assets by using the **Publish All** button (or by using the multi-select checkboxes next to each asset and then clicking the **Publish** icon). This is important if you're looking to ensure that any recent changes to your Snippet's value get pushed to your live website(s) for the affected assets.

# Inserting a Snippet[](#InsertingaSnippet)

Snippets can be inserted into plain text fields as well as within WYSIWYG editors (assuming the option has been enabled).

To insert a Snippet into a text field or WYSIWYG editor:

-   Click the **Insert Snippet** icon as seen here: ![Icon showing the option to insert a snippet, featuring a gear and star symbol.](https://www.hannonhill.com/cascadecms/latest/_images/insert-snippet-text-field.png)
-   In the pop-up menu that appears, click the **Insert Snippet** icon (**+**) next to the Snippet you wish to insert into the field.

You'll then see the Snippet inserted into the field using the proper syntax (ex. `{snip:hello.world}`).

**Tip**: If you already know the name of your Snippet, you can manually type `{snip:*your-snippet-name*}` into a text field or WYSIWYG and the tag will be replaced with your Snippet value. 

**Note**: If you don't see the Insert Snippet icon while working in a WYSIWYG editor, you may need to request that your administrator enable it for the underlying [WYSIWYG Editor Configuration](https://www.hannonhill.com/cascadecms/latest/content-authoring/wysiwyg-editor-configurations/index.html).

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }