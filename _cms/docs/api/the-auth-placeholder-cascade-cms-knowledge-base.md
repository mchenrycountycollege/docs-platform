---
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/placeholders/auth.html
title: The {auth} placeholder - Cascade CMS Knowledge Base
category: api
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

# Overview[](#Overview)

## `{auth}`

Either:

-   The [user's API Key](https://www.hannonhill.com/cascadecms/latest/cascade-basics/account-settings.html#UserApiKey) can be provided within the request's `Authorization` header as a `Bearer` token.  
    Example: `Authorization: Bearer 27c03f58-7c79-45d1-aa8f-76d697bbb10d`
-   The user's username and password can be provided within the request's `Authorization` header using a `Basic` authentication string, which is a base64-encoded string containing `username:password`.  
    Example: `Authorization: Basic am9obi5zbWl0aDpqb2huMTIz`
-   Request parameters `u` and `p` for username and password, or `apiKey` for the user's API Key.  
    Examples: `u=john.smith&p=john123` OR `apiKey=27c03f58-7c79-45d1-aa8f-76d697bbb10d`
-   Authentication can also be provided in body in JSON format for POST requests only.  
    Examples:
    
    `"authentication": {   "username": "john.smith",   "password": "john123" }`
    
      
    `"authentication": {   "apiKey": "27c03f58-7c79-45d1-aa8f-76d697bbb10d" }`
    

[↑](#top)

# Related Links

-   [Operations](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/operations.html)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }