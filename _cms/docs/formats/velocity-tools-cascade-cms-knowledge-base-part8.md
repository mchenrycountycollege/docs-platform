---
parent: Velocity Tools
section: Json Tool[](#JsonTool)
part: 8 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - Json Tool[](#JsonTool)

## Json Tool[](#JsonTool)

The Json Tool provides the ability to consume remote JSON resources.

### $\_JsonTool.fetch[](#_JsonTool_fetch)

Returns a [HashMap object](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html) representing JSON object or an [ArrayList object](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html) representing an array of objects.

Examples:

`#set ($response = $_JsonTool.fetch("https://jsonplaceholder.typicode.com/posts")) #foreach ($post in $response)  $_EscapeTool.xml($post.title) #end`

Available arguments for $\_JsonTool.fetch.
| Argument | Type | Description |
| --- | --- | --- |
| url | String   
required | A String representing a valid URL |

### $\_JsonTool.fetchWithApiKey[](#_JsonTool_fetchWithApiKey)

Fetches a remote JSON resource with an API key parameter via an `Authorization` request header. Returns a [HashMap object](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html) representing JSON object or an [ArrayList object](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html) representing an array of objects.

Examples:

`#set ($response = $_JsonTool.fetchWithApiKey("https://jsonplaceholder.typicode.com/posts", "abc123")) #foreach ($post in $response)  $_EscapeTool.xml($post.title) #end`

Available arguments for $\_JsonTool.fetchWithApiKey.
| Argument | Type | Description |
| --- | --- | --- |
| url | String   
required | A String representing a valid URL |
| apiKey | String  
required | 
A String representing an API Key. Can be of the following form:

-   (Default) Value only, which prepends the key with `Bearer`
-   Prepended with `Bearer` or `Basic`

 |
