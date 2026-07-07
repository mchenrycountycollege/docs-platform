---
parent: Frequently Asked Questions
section: How can I view the largest binary files within my database?
part: 52 of 139
source: https://www.hannonhill.com/cascadecms/latest/faqs/index.html
title: FAQs - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Frequently Asked Questions - How can I view the largest binary files within my database?

## How can I view the largest binary files within my database?

The following SQL queries will list files from your database from largest to smallest. SQL Server SELECT s.name as site\_name, f.cachePath, b.id, datalength(data) FROM cxml\_blob b join cxml\_foldercontent f on b.id=f.fileBlobId join cxml\_site s on s.id = f.siteid order by datalength(data)...

](https://www.hannonhill.com/cascadecms/latest/faqs/troubleshooting/view-largest-binary-files-in-database.html)[
