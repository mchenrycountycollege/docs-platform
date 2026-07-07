---
id: 104c4747-8c22-476f-81d6-9738ee2cc566
title: Hello World
book: Docs Platform
chapter: Getting Started
tags: [smoke-test]
order: 100
---

## First live git-publish test

This page was created by pushing a markdown file to `docs-platform` itself,
via the reusable GitHub Actions workflow calling `mchenrycountycollege/docs-platform/actions/publish@v1`.

If you're reading this on the published site, the whole pipeline works:
markdown → frontmatter parse → HTML normalize → Cascade REST create →
publish → nav/search-index/tags regeneration.
