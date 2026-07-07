---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/groups.html
title: Groups - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Permissions

# Overview[](#Overview)

A group is made up of one or more users with common permissions. Each user in the system must be given membership in at least one group, and can be given membership in multiple groups. Group role membership is passed on to the user, meaning that the user is assigned any roles that are assigned to the group(s) that the user belongs to. This is a convenient and often preferred way to easily change role memberships across groups of users.

Groups are created and populated by administrators or via a third-party authorization system (e.g. LDAP authentication). Because a group is made up of one or more users with common permissions, placing multiple users into groups is a great way to customize permissions settings. If your organization is a university, for example, as an administrator it's your job to identify groups of users who should all have similar access rights and permissions based on your content contribution and management scheme. Let’s say you have 40 professors using Cascade CMS only for managing course catalogs. These users should more than likely be placed in the same group. In addition to providing a way of assigning roles to multiple users, the group also can be specified in the folder access rights interface, giving multiple users read and/or write access to folders and folder-contained assets.

You can access the Groups menu by clicking the system menu button ( ) > **Administration** > **Groups**. The following information will be displayed for all groups:

-   **Name**
-   **Number of Users**

Click on any group in the list to view its Users and Roles. Additional options are available in the **More** menu while viewing a group:

-   **Workflows** - A list of the group's members' owned workflows and waiting workflows (workflows assigned to the group).
-   **Locked Assets** - A list of assets currently checked out by members of the group. You can select one or more assets in the list and click the Break Lock button to discard the user's changes to the selected assets.
-   **[Audits](https://www.hannonhill.com/cascadecms/latest/cascade-administration/audits.html)** - A summary of activities performed in the system by the members of the group.
-   **Delete**

# Adding a Group[](#AddingaGroup)

To add a group to the system:

1.  Click the system menu button ( ) > **Administration** > **Groups** and click **Add Group**.
2.  Enter the following:  
    1.  **Group Name**
    2.  **Users** (optional) - Select the users that should belong to the new group. Users may also be added to a group on the user level.
    3.  **Roles** - Select the desired System Role of the group. This role governs the group's members' access to administrative, non-content areas. The user's actual role abilities are determined by the highest overall permissions when taking into account the user's role(s) AND the roles of the group(s) the user belongs to.
3.  Click **Submit**.

**Note**: It is not possible to modify the **Group Name**for a Group after it has been created.

[↑](#top)

# Related Links

-   [How do I give a User or Group access to a Site?](https://www.hannonhill.com/cascadecms/latest/faqs/general/give-user-or-group-access-to-site.html)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }