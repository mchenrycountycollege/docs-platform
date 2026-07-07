---
parent: Changelog
section: 20211220
part: 59 of 107
source: https://www.hannonhill.com/cascadecms/latest/releases/changelog.html
title: Changelog - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Changelog - 20211220

## 20211220

### Fixed

-   (Un)Publish jobs that encounter repeated timeout errors will now mark the Destination as failed after a period of time.
-   Addressed an issue where the Index Block caching thread pool remaining active would prevent the system from shutting down completely.
-   Fixed an issue where buttons to clear page-level Block and/or Format assignments weren't appearing.
-   The `shouldBePublished` property can once again be updated for publishable assets using SOAP Web Services.
-   Trailing commas in WYSIWYG Editor Configuration custom styles will not longer cause site copy operations to fail.
