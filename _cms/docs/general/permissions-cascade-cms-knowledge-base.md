---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/index.html
title: Permissions - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

# Permissions

Permissions in Cascade CMS consist of roles, which govern a user's abilities and access to sites or the administration area, and access rights, which allow users to view or edit assets.

## Topics

-   [Users](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/users.html)
-   [Groups](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/groups.html)
-   [Roles](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/roles.html)
-   [Role Abilities](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/role-abilities-in-cascade.html)
-   [Access Rights](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/access-rights.html)

## Overview[](#Overview)

Permissions in Cascade CMS are best broken into two spheres: system-wide and site-specific. Permissions assigned at the system level affect abilities in the administration area. For example, granting the ability to create new sites, users, and groups are system-wide permissions. Typically, access to a specific set of abilities (Tools, Security, etc.) should be granted as needed to would-be administrators and administrator groups.

Site-level permissions, on the other hand, govern who can access a given site and what they can see and do in that site. For example, as Cascade CMS includes a stock Site Administrator and Site Contributor role, users are initially limited to one of those two access levels when granted access to a site. Of course, most organizations will have different levels of participation and duties to fulfill, and the creation of additional roles is encouraged as needed.

System-wide administrators have administrative-level access to all sites, while non-administrators must be assigned to a site (either individually or as part of a group) to be able to see it. Once assigned to a site, their site-level role assignment will determine their abilities within the site.

[↑](#top)

[↑](#top)

## Related Links

-   [How do I give a User or Group access to a Site?](https://www.hannonhill.com/cascadecms/latest/faqs/general/give-user-or-group-access-to-site.html)
-   [Active Users Report](https://www.hannonhill.com/cascadecms/latest/content-management/reports/active-users-report.html)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }