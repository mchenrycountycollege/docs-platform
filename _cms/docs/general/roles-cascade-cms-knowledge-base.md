---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/roles.html
title: Roles - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Permissions

# Overview[](#Overview)

A role is a set of a abilities that governs a user's access to a number of different areas in Cascade CMS. They can be assigned to a user directly, to any of the user's groups, or to a site to which the user requires access. Roles are not to be confused with [Access Rights](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/access-rights.html) which control read and write access to specific assets.

There are two types of roles in the system: **System Roles** and **Site Roles**. These two role types have many abilities in common, but they apply within different contexts. System Roles are applicable in the Administration Area and cannot be assigned to sites. Site Roles, as you may have guessed, are applicable to sites. Site Roles, however, do not control access to tools and areas of the system that are not specific to a particular site. For example, access to the Sites menu is governed by a user's System Role because the Sites menu can be accessed from anywhere in the system and is not specific to any particular site.

You can access the Roles menu by clicking the system menu button ( ) > **Administration** > **Roles**. The following information will be displayed for all roles:

-   **Name**
-   **Type** - You can filter roles by their type (System or Site) using the filter button.

Click on any role in the list to view its:

-   **Abilities** - A list of [role abilities](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/role-abilities-in-cascade.html) and whether they are enabled or disabled for this role.
-   **Users** - A list of users to which the role is assigned either directly or through one or more of their groups. For Site Roles, a list of sites in which the user is assigned the role either directly or through one of their groups will be provided.
-   **Groups** - A list of groups to which the role is assigned. For Site Roles, a list of sites in which the group is assigned the role will be provided.
-   **Sites** (for Site Roles) - A list of sites to which the role is assigned.

Additional options are available in the **More** menu while viewing a role:  

-   **Relationships** - A list of assets to which the role is linked. For System Roles, this will be users and groups to which the role is directly assigned. For Site Roles, this will be sites to which the role is assigned.
-   **[Audits](https://www.hannonhill.com/cascadecms/latest/cascade-administration/audits.html)** - A summary of activities performed in the system by all users who are assigned this role.
-   **[Access](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/access-rights.html)** - The read/write permissions for the role asset itself.
-   **Delete**

# Effective Roles[](#EffectiveRoles)

In order to figure out whether or not a user has access to an area in the system, Cascade CMS must first determine the user's effective role which includes all of that user's abilities across all of his or her roles in a particular context. The context being either a Site or a System area.

A user's effective System Role is determined by taking all of the roles assigned to the user's groups and all of the roles assigned to the user directly and "summing" them. For example, if a user is assigned a contributor role and the user's group is assigned a manager role, then the user effectively has all of the abilities in the contributor role as well as all of the abilities in the manager role when in the System area.

A user's effective Site Role is determined a little differently, because Site Roles are assigned to sites directly. The effective Site Role is also only applicable when in a particular Site. Nevertheless, the same principle of summing the abilities for all of a user's Site Roles still applies (including those roles that are assigned to the user's groups).

Be aware that while in a site, System Roles will still apply for abilities not contained in Site Roles. As mentioned earlier, access to the publish queue is controlled by System Roles; therefore, a user's effective System Role still applies for this ability when inside a Site.

To see what effective abilities a user has in a particular Site, click **More** > **Effective Abilities** while viewing a user and select a site from the drop-down menu.

# Adding a Role[](#AddingaRole)

To add a role to the system:

1.  Click the system menu button ( ) > **Administration** > **Roles** and click **Add Role**.
2.  Choose **System** or **Site** role.
3.  All role abilities for a new role are disabled by default. Enable the abilities you want users assigned this role to inherit by clicking the checkbox next to the applicable role. You can also select a role to use as a template for the new role from the **Based on original role** drop-down.
4.  Click **Submit**.

# Assigning System Roles[](#AssigningSystemRoles)

To assign a System Role to a User or Group:

1.  Click the system menu button ( ) > **Administration** > **Users** or **Groups**.
2.  Select the user or group and click **Edit**.
3.  In the **Membership and Roles** tab, click **Choose Roles** and select one or more System Roles to assign to the user or group. Any System Roles that have already been assigned to the user or group will be checked. Click **Choose**, and notice that the newly assigned roles are now displayed in the Membership and Roles tab.
4.  Click **Submit**.

# Assigning Site Roles[](#AssigningSiteRoles)

See article ["How do I give a User or Group access to a Site?"](https://www.hannonhill.com/cascadecms/latest/faqs/general/give-user-or-group-access-to-site.html)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }