---
parent: Frequently Asked Questions
section: How do I access Dynamic / Custom Metadata Fields in Velocity?
part: 70 of 139
source: https://www.hannonhill.com/cascadecms/latest/faqs/index.html
title: FAQs - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Frequently Asked Questions - How do I access Dynamic / Custom Metadata Fields in Velocity?

## How do I access Dynamic / Custom Metadata Fields in Velocity?

With the XPath Tool If you're using an Index Block and the XPath Tool, you can target the name of your Custom Metadata Field in your XPath Syntax. Example: #set ($category = $\_XPathTool.selectSingleNode($contentRoot, "//calling-page/system-page/dynamic-metadata\[name='category'\]/value"))#if...

](https://www.hannonhill.com/cascadecms/latest/faqs/development/access-dynamic-custom-metadata-fields-velocity.html)[
