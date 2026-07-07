---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/authentication/ldap/index.html
title: LDAP/Active Directory Authentication - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

LDAP/Active Directory

# Overview[](#Overview)

Your environment's LDAP Configuration interface can be found under **Administration** > **Security and Authentication** > **LDAP Configuration**. The LDAP Configuration interface consists of three main areas (tabs):

-   [**Options**](https://www.hannonhill.com/cascadecms/latest/cascade-administration/authentication/ldap/index.html#Options) - general information regarding how Cascade CMS should connect to your existing LDAP/AD server.
-   [**Policies**](https://www.hannonhill.com/cascadecms/latest/cascade-administration/authentication/ldap/index.html#Policies) - an interface for building one or more user Policies. Policies specify which users you wish to sync/import into Cascade CMS and determine which Groups and Roles those users should inherit upon syncing.
-   [**XML**](https://www.hannonhill.com/cascadecms/latest/cascade-administration/authentication/ldap/index.html#XML) - an XML representation of your LDAP Configuration.

**Note:** You must have at least one Policy set up in order to use the LDAP functionality within Cascade CMS.

# Options[](#Options)

This screen contains general information regarding how Cascade CMS should connect to your existing LDAP/AD server. The fields located in this interface are self-documenting and for the most part self-explanatory; however, there are a couple of options here that are important to consider.

## Orphaned LDAP Users

The **Orphaned LDAP Users** option determines the action that Cascade CMS should take when an existing LDAP User in the system is no longer synchronized/imported with any of the existing Policies. The three possible actions are:

-   **Ignore** - does nothing, no action will be taken for the User account.
-   **Deactivate** - disables the User account. Disabled accounts can be manually re-enabled by an Administrator.

Note: The Delete option has been deprecated to prevent accidentally mass deleting users during an erroneous LDAP sync and will be removed in a future release of Cascade CMS. Until the behavior is removed as a valid option, configurations with Delete/Remove will fall back to Deactivate.

Consider the following scenario:

-   As part of an LDAP sync, a User named "user1" is imported into Cascade CMS and configured to authenticate against your LDAP/AD server any time they log into the system.
-   Some time later, "user1" has their DN modified in the LDAP/AD server such that they no longer match any of the Policies that have been set up to sync.
-   Upon the next LDAP sync (manual or scheduled), the system marks this User as orphaned because they are an LDAP User in the system but are no longer being synced with any of the current Policies.
-   When this occurs, the User account in Cascade CMS will either be ignored or deactivated depending on the option selected for **Orphaned LDAP Users**.

### Scheduling and Reporting

In addition to manually syncing with LDAP, the system can be configured to sync on a schedule. We typically recommend that this option be set to **Repeat Every 1 days**. If you need to sync more often than this, we don’t recommend doing so more frequently than once per hour since syncing large numbers of Users can be resource intensive.

When running scheduled syncs, we also recommend using the **Generate Report** option to email a report to one or more system Administrators. This way, Administrators can be alerted to any potential syncing issues and see which users were added/removed during each sync.

# Policies[](#Policies)

In order to sync/import users from an LDAP/AD server, a minimum of one Policy must be configured in this interface, but you can add as many additional Policies as needed to manage your Users, Groups, and Roles.  

A Policy allows you to target specific subsets of users in your LDAP/AD server and import them into the system. This can be done either by pointing the configuration to one or more Container Identifiers (for type:**User**) or by specifying a Security Group Id (for type:**Active Directory Security Group**).

## User Policy

When creating a Policy of type**User**, Cascade CMS will attempt to iterate over the first level of users residing in the Container Identifiers that you’ve specified. It will*not*traverse sub-containers within a specified Container Identifier.

The**Filter**section allows you to filter on particular users within containers by specifying one or more**Object Attribute Filter(s)**(name/value pairs) or by using a**Freeform Filter**. The Freeform Filter field can be used to provide a filter using standard LDAP query syntax.

### Active Directory Security Group Policy

Using a Policy of type**Active Directory Security Group**allows you to point to the DN of a Security Group in your existing AD server. In addition to specifying the**Security Group Id**, you’ll also need to provide a**Group Member Attribute Id**. For this field, you’ll typically use a value of`member` as that is the attribute which specifies that a user is a member of the Security Group.

### Authentication Mode

The**Authentication Mode**option specifies how the users synced/imported via your Policy will authenticate when logging into Cascade CMS. These options are:

-   **Normal** - Use this option if you wish to import Users into Cascade CMS but not have them authenticate against your LDAP server. If selected, this option requires that you manually specify a password for each User that you’ve synced/imported into the system by editing each User account. Passwords for Normal Users are stored in the Cascade CMS database and are encrypted as well as salted and hashed.
-   **LDAP** - This option should be selected if you want your users to authenticate directly against your LDAP/AD server each time they log in to Cascade CMS. In this scenario, no password information for those users will be stored in the Cascade CMS database.
-   **Custom** - The Custom option is used to tell the application that the Users being synced/imported via your Policies will authenticate via your Single Sign-On (SSO) solution.

**Note:** In order for Users to authenticate via your SSO solution, you must have your Cascade CMS environment properly configured to direct users to your organization’s SSO login page. See [Custom Authentication](https://www.hannonhill.com/cascadecms/latest/cascade-administration/authentication/index.html#CustomAuthentication) for more information on integrating Cascade CMS with Single Sign-On solutions.

**Tip:** It's possible to configure a Policy to specify one authentication method while another Policy specifies a different authentication method. Example: Policy A can configure Users synced via Policy A to use Normal authentication while Policy B can configure Users in Policy B to authenticate via LDAP.

# XML[](#XML)

The **XML** tab provides an XML representation of your LDAP Configuration, which is a combination of the information entered in both the Options and Policies areas. This can be useful if you’re copying a configuration from one environment to another (from development to production, for example) or if to maintain a backup of a working configuration.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }