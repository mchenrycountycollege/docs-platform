---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/users.html
title: Users - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Permissions

# Overview[](#Overview)

Cascade CMS requires individuals using the system to authenticate upon login for security, logging, and resource management purposes. Each user has a user account with a Username, password, and optional full name and email. Group and Role memberships must be assigned to each user to determine which tasks that user may perform and their access to various system resources.

You can access the Users menu by clicking the system menu button ( ) > **Administration** > **Users**. The following information will be displayed for all users:

-   **Username**
-   **Full Name**
-   **Email**
-   **Login Time** - Hover over this entry in this column for an exact date/time.

From this screen you may also filter by:

-   Users who are**Enabled** and/or **Disabled** in the system.
-   Users who have logged in **At least once** and/or **Never**.

Click on any user in the list to view their Settings, Groups, and Roles. Additional options are available in the **More** menu while viewing a user:

-   **Workflows** - A list of the user's owned workflows and waiting workflows (workflows assigned directly to the user or their group).
-   **Locked Assets** - A list of assets currently checked out by the user. You can select one or more assets in the list and click the **Break Lock** button to discard the user's changes to the selected assets.
-   **Drafts** - A list of the user's unsubmitted drafts. You can select one or more assets in the list and click the **Delete** button to discard the user's changes to the selected assets.
-   **[Audits](https://www.hannonhill.com/cascadecms/latest/cascade-administration/audits.html)** - A summary of activities performed in the system by the user.
-   **Delete**
-   **[Effective Abilities](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/users.html#CheckingaUsersEffectiveAbilities)** - An overview of the abilities the user will inherit for a specific site based on their Site Role.
-   **[Assume Identity](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/users.html#AssumingaUsersIdentity)** - Allows you to assume the user's identity and view Cascade CMS as the user sees it.

# Adding a User[](#AddingaUser)

To add a user to the system:

1.  Click the system menu button ( ) > **Administration** > **Users** and click **Add User**.
2.  In the **User Settings** tab enter the following:
    1.  **Enabled** - This setting allows you to activate and deactivate the user without deleting the account. It's checked by default when creating a new user.
    2.  **Username** - A unique name the user will be known by in the system.
    3.  **Full Name** (optional) - The full name of the user.
    4.  **Email** (optional) - The email address to which messages such as workflow notifications and the Daily Content Report will be sent.
    5.  **Authentication** - Determines whether **Normal** (password) or **Custom** (single sign-on solution via a custom plugin) authentication is required for this user.
    6.  **Password** - see [password policies](#password-policies)
3.  In the **Membership and Roles** tab enter the following:
    1.  **Groups** - Select the group(s) to which the user should belong. Assigning multiple groups to each user is an easy way to customize the permissions options for each user.
    2.  **Default Site** (optional) - This option will filter the user's dashboard widgets to reflect data from the site selected.
    3.  **Role** - Select the desired System Role of the user. This role governs the user's access to administrative, non-content areas. The user's actual role abilities are determined by the highest overall permissions when taking into account the user's role(s) AND the roles of the group(s) the user belongs to.
4.  Click **Submit**.

**Note**: Usernames and Passwords are case-sensitive. For example, if a user is created with the username "person123", that user must log in by typing their username "person123" and *not* "Person123".

**Note**: It is not possible to modify the **Username** for a User after their account has been created.

## Password Policies

Users of authentication type **Normal** must have passwords that meet the following policies:

-   At least 12 characters when using alphanumeric, or 8 characters if using special characters
-   Can not include 4 consecutive characters from username, full name, or [organization name (i.e. System Name)](https://www.hannonhill.com/cascadecms/latest/cascade-administration/system-preferences.html#System)
-   Can not include 4 consecutive numbers or letters (e.g. "defg", "3456", etc.)
-   Can not include 3 consecutive characters that are the same (e.g. "aaa", "111", etc.)
-   Should not contain common weak passwords

# Checking a User's Effective Abilities[](#CheckingaUsersEffectiveAbilities)

The Effective Abilities tool allows administrators to get an overview of the abilities a user will inherit for a specific site based on their Site Role. To check a user's Effective Abilities, click **More** > **Effective Abilities** while viewing a user and select a site from the drop-down menu.

Once a site is selected, you'll be presented with a list of role abilities along with whether or not those abilities are enabled for the user in the selected site.

# Assuming a User's Identity[](#AssumingaUsersIdentity)

Users with the **Assume another User's identity** ability enabled in their System Role can assume the identity of any other user. This tool can be used not only to get a quick visual representation of what a user sees but also what they can access in different sites.

To assume another user's identity, either select the user from the user list and click the **Assume this user's identity** button at the top of the list or click **More** > **Assume Identity** while viewing a user.

![resume normal identity](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/images/users-resume-normal-identity.png)

After assuming a user’s identity, you'll see exactly what that user will see when they're logged into the system. You can switch back to your own identity by clicking **Resume normal identity** under the User Menu.

[↑](#top)

# Related Links

-   [How do I give a User or Group access to a Site?](https://www.hannonhill.com/cascadecms/latest/faqs/general/give-user-or-group-access-to-site.html)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }