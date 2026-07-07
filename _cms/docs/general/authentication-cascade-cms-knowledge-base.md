---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/authentication/index.html
title: Authentication - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

# Authentication

Cascade CMS can authenticate users natively, through an external LDAP server, or via custom authentication.

## Topics

-   [LDAP/Active Directory Authentication](https://www.hannonhill.com/cascadecms/latest/cascade-administration/authentication/ldap/index.html)

## Overview[](#Overview)

Cascade CMS is equipped to handle three types of user authentication:

-   **Normal authentication** (default) - Default mode where authentication is handled natively by Cascade CMS.
-   **LDAP authentication** - Cascade CMS delegates authentication to an external LDAP server (e.g. Active Directory, OpenLDAP).
-   **Custom authentication** - Cascade CMS provides an authentication API to allow developers to hook into third-party authentication/single sign-on systems (e.g. Kerberos, Shibboleth, CAS).

[↑](#top)

## Normal Authentication[](#NormalAuthentication)

With normal authentication, users enter the usernames and passwords on the login screen and Cascade CMS authenticates them against their encrypted credentials stored in the database.

User accounts must be created for each user before they can access the system. This is accomplished manually in the **Administration** menu or can be done programmatically via the Web Services API.

It is also possible to import users' usernames, emails, full names, and group/role memberships from an LDAP server but use Cascade CMS's built-in facilities to authenticate the users.

[↑](#top)

## LDAP Authentication[](#LDAPAuthentication)

Users can also be set to authenticate against an existing LDAP server such as Active Directory or Open LDAP. Using LDAP allows users and passwords to be centrally managed and then synced to Cascade CMS.

The system still requires users records in the database for each user so that their preferences, group, and role memberships can be maintained. However, only the DN (Distinguished Name) of the user and not the password are stored in the database.

When the user attempts to login, the supplied username is used to retrieve the DN of the user. Then the system attempts to bind to the LDAP server using the DN and the supplied password. The user is authenticated if the bind is successful.

For more information about importing/syncing Users and authenticating with LDAP, see [LDAP/Active Directory Authentication](https://www.hannonhill.com/cascadecms/latest/cascade-administration/authentication/ldap/index.html).

[↑](#top)

## Custom Authentication[](#CustomAuthentication)

**Note -** The information below is relevant only to customers with on-premise installations of Cascade CMS. For Cascade Cloud customers, setup and configuration are handled as part of our custom authentication offering. For more information, reach out to support \[at\] hannonhill.com.

Cascade exposes an authentication API to allow developers to hook into third-party authentication and single sign-on (SSO) frameworks. Developers can choose to redirect the browser to custom login and logout screens and implement custom logic to supply the name of the user for Cascade CMS to authenticate and logic to log the user out.

In addition, users can be redirected to a custom error screen if authentication fails. An `auth-error` parameter will be appended to a forwarding URL with the reason for the error, such as if the user doesn't exist or is not enabled in Cascade CMS. To configure your **Error Page URL**, click the system menu button **( ) > Administration > Manage Custom Authentication**.

Please visit our [Custom Authentication API Project on GitHub](http://github.com/hannonhill/Cascade-Server-Authentication-API "Cascade Server Authentication API Project") to learn more about developing authentication modules. Also check out our [Custom Authentication Module Examples on GitHub](https://github.com/hannonhill/Custom-Authentication-Module-Examples) to see working implementations of custom authentication using various technologies including CAS and Shibboleth.

[↑](#top)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }