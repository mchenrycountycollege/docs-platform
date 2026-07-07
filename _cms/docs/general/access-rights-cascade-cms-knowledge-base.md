---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/access-rights.html
title: Access Rights - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Permissions

# Access[](#Access)

You can control Read/Write access to Site assets with Access Rights. Access Rights control which Users and/or Groups can view or edit assets.

![Access rights](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/images/access-rights.png)

To update Access Rights for an asset:

1.  When viewing an asset click **More** > **Access**.
2.  Choose the access level for all Users. This will be the level assigned to all Users and Groups that do not have explicit Access Rights specified. A more detailed explanation of the behavior can be found below the field.
3.  Grant Access Rights to specific Users and/or Groups by selecting an access level from the drop-down menu and clicking **Choose Users and Groups**. Explicitly assigned Access Rights with a higher access level will take precedence over the access level for all users as defined above. Assigning Write level access automatically grants Read privileges as well.
4.  Add more Users or Groups with their own levels as necessary.
5.  If you would like to remove Access Rights from a User or Group, click on the X beside it.
6.  Click **Update**.

# Access for Contents[](#AccessforContents)

Folder and Container assets have an additional feature called **Access for Contents** which allows update the access rights for the contents of that Folder/Container. Updating the access rights on the contents of a Folder/Container can be performed using two different strategies:

-   **Merge Access Rights:** Merging will add new assignments to all contained assets where the User or Group specified is not already assigned. If the User or Group is already assigned to an asset, then the access level (Read or Write) will be updated with the new value specified. All other existing User and Group assignments will not be changed.
-   **Overwrite Access Rights:**Overwriting will remove all existing User and Group assignments on all assets within a Folder and apply only those specified. Be cautious with this option. In most cases, you will want to Merge Access Rights as opposed to overwriting them.

![Access for contents](https://www.hannonhill.com/cascadecms/latest/cascade-administration/permissions/images/access-for-contents.png)

To update Access for Contents:

1.  While viewing a Folder click **More** > **Access for Contents**.
2.  If you would like to assign the current Folder or Container's Access Rights to its contents, click **Copy user and group access rights from current folder**.
3.  To overwrite the existing Access Rights on all contents, check the **Overwrite existing access rights on contained assets** checkbox. To merge the permissions you specify into the existing Access Rights of the Folder contents, leave this option unchecked.
4.  If overwriting, choose the access level for all Users. This will be the level assigned to all Users and Groups that do not have explicit Access Rights specified. A more detailed explanation of the behavior can be found below the field. If merging, this setting will be untouched.
5.  Grant Access Rights to specific Users and/or Groups by selecting an access level from the drop-down menu and clicking **Choose Users and Groups**. Explicitly assigned Access Rights with a higher access level will take precedence over the access level for all users as defined above. Assigning Write level access automatically grants Read privileges as well.
6.  Add more Users or Groups with their own levels as necessary.
7.  If you would like to remove Access Rights from a User or Group, click on the X beside it.
8.  Click **Update**.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }