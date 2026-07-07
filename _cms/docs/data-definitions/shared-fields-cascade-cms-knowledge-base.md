---
source: https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/shared-fields.html
title: Shared Fields - Cascade CMS Knowledge Base
category: data-definitions
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Data Definitions

# Overview[](#Overview)

Shared Fields allow you to manage, update, and share fields and field groups across Data Definitions and across sites.

For example, you may maintain drop-down or multi-select lists for departments or academic majors. Or you may have field groups for creating contact information blocks or image carousels. If you need to add or remove an item from your list or field group, Shared Fields will let you update it one time, from one location, and the changes will immediately be made available in all Data Definitions using that field or field group.

# Creating Shared Fields[](#CreatingSharedFields)

To created a shared field:

1.  Navigate to **Manage Site** > **Shared Fields**.
2.  Navigate to the container in which the new Shared Field will be stored, or create a new container using **Add** > **Container**.
3.  Click **Add** > **Shared Field**.
4.  Select the type of Shared Field you'd like to create and click **Choose**.
    -   Note that only the **Group** Shared Field type can contain multiple fields or have additional fields added after creation.
5.  In the **Name** field, enter a name for your Shared Field.
6.  In the **Parent Container** field, select a container for the Shared Field, if desired.
7.  In the **Builder** tab, configure the settings for your Shared Field or build a field group using the field types available in the toolbar. See [Data Definitions](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/index.html) for more information on field types and options.
8.  Click **Submit** to save your Shared Field.

# Adding Shared Fields to Data Definitions[](#AddingSharedFieldstoDataDefinitions)

To add a Shared Field to a Data Definition:

1.  Create a new [Data Definition](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/index.html) or edit an existing one.
2.  In the **Builder** tab, click and drag a field corresponding to your Shared Field's type to the desired location in your Data Definition.
3.  Click **Choose Shared Field**.
    -   By default, only Shared Fields of the same type as the field chosen will be available in the chooser panel.
    -   You can select a different field type by clicking the **Show all field types** link.
4.  Select your Shared Field and click **Choose**.
5.  In the **Field Properties** menu, configure any field settings you wish to override such as identifier, label, or whether the field is required.
    -   Field settings that are overridden at the Data Definition level won't be updated when the corresponding setting is updated at the Shared Field level.
    -   Field settings that are grayed out aren't able to be overridden and must be configured at the Shared Field level.
6.  Click **Save**.

**Tip** - You can add the same Shared Field to a Data Definition multiple times, but the fields must have unique identifiers if they're contained in the same group.

# Replacing Fields with Shared Fields[](#ReplacingFieldswithSharedFields)

Existing fields or field groups in a Data Definition can be replaced with a Shared Field so long as the identifier and type of the existing field and the identifier and type of the Shared Field are identical.

To replace an existing field or field group with a Shared Field:

1.  Edit your Data Definition.
2.  Edit the existing field or field group by clicking the pencil icon ( ) next to it.
3.  Click **Choose Shared Field**.
4.  Select your Shared Field and click **Choose**.
5.  In the **Field Properties** menu, configure any field settings you wish to override such as identifier, label, or whether the field is required.
    -   The **Identifier** field must match the existing field's identifier exactly.
    -   For Shared Field groups, the group **Identifier** field and identifiers and types of all contained fields must also match exactly. Contained field identifiers can't be overridden at the Data Definition level and must be configured in the Shared Field itself.
6.  Click **Save**.

**Warning** - To avoid data loss when replacing existing fields with Shared Fields, ensure the field type and identifier of the Shared Field matches the field type and identifier of the existing field exactly. When replacing field groups, overall group identifiers must be identical and all contained fields must also have identical identifiers and field types. **Mismatched field identifiers and/or field types will result in existing field content being discarded when the asset is next submitted.**

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }