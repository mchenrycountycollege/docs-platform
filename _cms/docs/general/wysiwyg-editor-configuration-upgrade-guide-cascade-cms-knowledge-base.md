---
source: https://www.hannonhill.com/cascadecms/latest/content-authoring/wysiwyg-editor-configurations/upgrade-guide.html
title: WYSIWYG Editor Configuration Upgrade Guide - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

WYSIWYG Editor Configurations

# How will the previous version configurations and preferences map?

Upon upgrading, the System Default editor configuration will have settings migrated based on the following pre-existing System Preferences, and those preferences have been removed:

-   If the **Remove font and style attributes** preference was disabled, the **Allow style attributes** option will be enabled
-   If the **Disable table controls** preference was enabled, the **Table** menu will be disabled and hidden
-   If the **Allow text formatting** preference was disabled, the bold, italic and underline buttons and menu items (under Format) will be disabled. The strikethrough, superscript, subscript and code menu items (under Format) will be disabled as well.
-   If the **Allow font formatting** preference was disabled, the format button and menu item will be disabled.
-   If the **Allow font assignment** preference was disabled, or **Remove font and style** preference was enabled, the font style and size dropdowns will be disabled.

Sites that are configured with a CSS File and/or list of CSS Classes will have a Default WYSIWYG editor configuration created automatically. This Default WYSIWYG editor configuration will be based on the System Default WYSIWYG editor configuration.

**WYSIWYG options** on Data Definition WYSIWYG fields are now deprecated. When at least one deprecated **WYSIWYG option** is unchecked it be updated to have additional options unchecked based on the system preferences before they are removed/mapped from the above list. For example, if the **Disable table controls** system preference was enabled, the**Insert Table** deprecated WYSIWYG option will be unchecked for all Data Definition WYSIWYG fields that have at least one deprecated option unchecked.

Additionally, these Data Definition WYSIWYG fields will inherit the **CSS Classes**, **CSS FIle** and **Allow style attributes** properties defined by the Site’s default editor configuration. As a result of these mappings, all Data Definition WYSIWYG fields with deprecated **WYSIWYG options**will look and work exactly the same as they used to in previous versions of Cascade CMS.

All users with the ability to bypass permission restrictions to will also gain the ability to bypass WYSIWYG editor restrictions. As a result, users with this ability will be able to access to all WYSIWYG features as if they had no group restrictions in previous versions.

# Recommendations

The System Default editor configuration is used as the basis for all WYSIWYG editors across the system and defines what features (i.e. buttons and menus), CSS classes and content are allowed. As such, an administrator should adjust the System Default editor configuration to the bare minimum of what users should have access to.

If configurations other than the System Default are required on a per Site basis, additional editor configurations can be created and assigned within the Manage Site area of individual Sites.

Editor configurations can also be assigned at the Content Type or Data Definition WYSIWYG field level if editor configurations other than the Site’s Default (or System Default if not configured) are required.

Cascade CMS administrators may want to revisit existing Roles and adjust the following new Role abilities as needed.

# New Role Abilities

Abilities for existing Roles (Site and System) can be modified to enable/disable the ability to:

-   bypass WYSIWYG editor restrictions (Site Role)
-   access/modify editor configurations within a given Site (Site Role)
-   access/modify the System Default editor configuration (System Role)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }