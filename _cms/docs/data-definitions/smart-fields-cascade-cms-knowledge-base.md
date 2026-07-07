---
source: https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/what-are-smart-fields.html
title: Smart Fields - Cascade CMS Knowledge Base
category: data-definitions
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Data Definitions

# Overview[](#Overview)

With Smart Fields, you can selectively show fields and field groups in a Data Definition based on values selected in checkbox, drop-down, radio, and multi-select fields.

For example, you may choose to reveal a set of fields for contact information is a "Contact Information" checkbox is enabled. Or a "Column Type" radio field may reveal a WYSIWYG if "Text" is selected and an image chooser field if "Image" is selected.

Required fields or fields with content validated with regular expressions but are hidden due to Smart Field rules are not validated on submit. This allows you to create conditionally-required and conditionally-validated fields in Data Definitions.

# Creating Smart Fields[](#CreatingSmartFields)

Smart Fields are created by editing the **Show Fields** property for values in a checkbox, radio button, drop-down, or multi-select field and selecting which fields or field groups should be revealed when that value is selected.

To set up Smart Fields in the Data Definition Builder:

1.  Create or edit your [Data Definition](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/index.html).
2.  Create or edit a checkbox, radio button, drop-down, or multi-select field.
3.  In the **Show Fields** field associated with each **Value**, select the field and/or field groups that should be shown when that value is selected.

To set up Smart Fields in the XML view:

1.  Create or edit your [Data Definition](https://www.hannonhill.com/cascadecms/latest/design-in-cascade/data-definitions/index.html).
2.  Add a `show-fields` attribute to the `<item>` containing the value that should reveal the other fields or groups or fields.
3.  Enter a comma-separated list of field identifiers. For fields inside of groups, use a slash `/` to indicate the group nesting, e.g. `group1/inside-field`.

**Note** - When editing a Data Definition, all fields are visible regardless of Smart Field rules. Help text below each field affected by Smart Field rules explains when these fields will be shown.

**Tip** - When viewing a Data Definition, use the **Apply Smart Field rules** toggle to preview your form with Smart Field rules applied.

# Example[](#Example)

A use case that demonstrates a few different features of Smart Fields is a form with fields for an address including a "Country" dropdown and associated zip-code field.

When the Country "United States" is selected, a "5 digit zip code" field could be revealed whereas when "Canada" is selected, a "6 character postal code" field could be shown. If the "Country" field has no value selected, both "5 digit zip code" and "6 character postal code" fields could be hidden.

`<system-data-structure>   ... other fields ...   <text identifier="Country" type="dropdown">     <dropdown-item show-fields="5-digit-zip" value="US"/>     <dropdown-item show-fields="6-char-postal" value="Canada"/>     ... other countries ...   </text>   <text identifier="5-digit-zip" label="US Zip Code (5 digit)"/>   <text identifier="6-chart-postal" label="Canadian Postal Code (6 characters)"/> </system-data-structure>`

These rules can stack up as well. In the example above, we could have an "Include Address?" checkbox with the "Country" show-field selected. This would automatically cause the "Country" field, "5 digit zip code", and "6 character postal code" fields to be hidden by default when the "Show Address?" checkbox is unchecked, even if the "Country" field has a default value selected. This is because for the Smart Field rules, hidden fields count as if they had no value selected.

`<system-data-structure>     ... other fields ...     <text identifier="include-address" label="Include Address?" type="checkbox">       <checkbox-item show-fields="Country,..other address fields..." value="yes"/>       <checkbox-item value="no"/>     </text>     ... other address fields ...     <text identifier="Country" type="dropdown">       <dropdown-item show-fields="5-digit-zip" value="US"/>       <dropdown-item show-fields="6-char-postal" value="Canada"/>       ... other countries ...     </text>     <text identifier="5-digit-zip" label="US Zip Code (5 digit)"/>     <text identifier="6-char-postal" label="Canadian Postal Code (6 characters)"/>   </system-data-structure>`  

Groups of fields can also be progressively disclosed, which would result in the group being hidden by default unless a specific value is selected. In the example above, the "Country", "5 digit zip code", and "6 character postal code" fields could be inside of "Address" group. Then, the "Include Address?" checkbox could have the "Address" group selected as a show-field.

`<system-data-structure>     ... other fields ...     <text identifier="include-address" label="Include Address?" type="checkbox">       <checkbox-item show-fields="Address" value="yes"/>       <checkbox-item value="no"/>     </text>     <group identifier="Address">       ... other address fields ...       <text identifier="Country" type="dropdown">         <dropdown-item show-fields="5-digit-zip" value="US"/>         <dropdown-item show-fields="6-char-postal" value="Canada"/>         ... other countries ...       </text>       <text identifier="5-digit-zip" label="US Zip Code (5 digit)"/>       <text identifier="6-char-postal" label="Canadian Postal Code (6 characters)"/>     </group>   </system-data-structure>`  

# Smart Fields and In-context Editing[](#SmartFieldsandIn-contextEditing)

When editing a page in-context, only the fields selected to be editable in-context for a given region are included in Smart Field rules.

For example, if only the "Address" group from the example above is selected to appear in an in-context editable region and the "Include Address?" checkbox is not selected, the "Address" group will be always visible. The Smart Field rules configured for the "Include Address?" field will be ignored because it's not included in the editable region.

# Smart Fields and Structured Data[](#SmartFieldsandStructuredData)

Smart Field rules don't affect the structured data rendered on pages or in index blocks. This is important when writing Formats because you can assume all fields will always be visible.

As a Format writer, you may need to check the values of fields you're using to reveal other fields. For example, a field such as the "Country" dropdown in the example above may have a value set but may not be shown due to the fact that "Include address?" is not checked. Before outputting the "Country" field in your format, you'll want to check the value of "Include Address?" instead of just checking for the presence of a value for the "Country" field.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }