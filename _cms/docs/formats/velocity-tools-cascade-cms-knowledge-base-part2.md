---
parent: Velocity Tools
section: Locator Tool[](#LocatorTool)
part: 2 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - Locator Tool[](#LocatorTool)

## Locator Tool[](#LocatorTool)

The Locator Tool (added in version 7.4) retrieves assets located at a given `path` and optionally within a site with a given `siteName` as [Cascade CMS API](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/internal-cascade-api/index.html) objects.

**Tip** - If a `siteName` is not provided, the Locator Tool will locate assets within the site where the Format is located. Use the `$currentPageSiteName` variable to locate assets in the site where the Format is being called from (the current page).

### $\_.locate[](#__locate)

Locate an asset at the given `path`, with the specified `type`, and optionally inside of a site with the specified `siteName`.

Available arguments for $\_.locate.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to an asset. |
| type | EntityType  
required | An asset type. Accepted types:
`TYPE_LINKABLE` (Pages, Files, and External Links)  
`TYPE_PAGE`  
`TYPE_FILE`  
`TYPE_FOLDER`  
`TYPE_BLOCK`  
`TYPE_TEMPLATE`  
`TYPE_REFERENCE`  
`TYPE_SYMLINK`  
`TYPE_FORMAT`

 |
| siteName | String  
optional | A site name. |

### $\_.locateBlock[](#__locateBlock)

Locate a Block at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locateBlock("blocks/index/all-events", "Calendar")`

Available arguments for $\_.locateBlock.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to a Block. |
| siteName | String  
optional | A site name. |

### $\_.locateFile[](#__locateFile)

Locate a File at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locateFile("files/logo.png", "Cascade University")`

Available arguments for $\_.locateFile.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to a File. |
| siteName | String  
optional | A site name. |

### $\_.locateFolder[](#__locateFolder)

Locate a Folder at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locateFolder("articles/2019", "News")`

Available arguments for $\_.locateFolder.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to a Folder. |
| siteName | String  
optional | A site name. |

### $\_.locateFormat[](#__locateFormat)

Locate a Format at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locateFormat("_cms/formats/banner", "Cascade University")`

Available arguments for $\_.locateFormat.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to a Format. |
| siteName | String  
optional | A site name. |

### $\_.locateLinkable[](#__locateLinkable)

Locate a Page, File, or External Link at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locateLinkable("student-life/student-portal-link", "Cascade University")`

Available arguments for $\_.locateLinkable.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to a Page, File, or External Link. |
| siteName | String  
optional | A site name. |

### $\_.locatePage[](#__locatePage)

Locate a Page at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locatePage("about-us/contact", "Cascade University")`

Available arguments for $\_.locatePage.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to a Page. |
| siteName | String  
optional | A site name. |

### $\_.locateReference[](#__locateReference)

Locate a Reference at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locateReference("about-us/contact", "Cascade University")`

Available arguments for $\_.locateReference.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to a Reference. |
| siteName | String  
optional | A site name. |

### $\_.locateSymlink[](#__locateSymlink)

Locate an External Link at the given `path` and optionally inside of a site with the specified `siteName`.

Example:

`$_.locateSymlink("student-life/student-portal-link", "Cascade University")`

Available arguments for $\_.locateSymlink.
| Argument | Type | Description |
| --- | --- | --- |
| path | String  
required | A path to an External Link. |
| siteName | String  
optional | A site name. |
