---
id: 86d35782-aaa4-4a54-9b89-35545874b67b
title: Using Content Cards in Cascade
book: Design System
chapter: Content Authoring
tags: [content-row, cards, two-column, images, cascade]
order: 110
---

Content Cards is a Content Row type on Two Column pages for showing a short set of items side by side — programs, services, staff, quick links, whatever you'd otherwise be tempted to fake with a bulleted list. You pick a style, add one card per item, and Cascade lays them out for you. No HTML, no Content Editor field, no pasting anything.

Find it on any Two Column page: add a **Content Row**, set its **Type** dropdown to **Cards**.

## Which style: Stacked grid or Compact list

Ask yourself one question — **does this need a picture?**

- **Yes, and I want it to feel like a set of feature cards** → **Stacked grid**. Image on top, 2 across (3 across if the page has no sidebar).
- **No, this is really just a list of links or facts** → **Compact list**. A tinted row per item, with room for a small optional thumbnail if you want one.

If you're still not sure, picture the content as a stack of index cards versus a list of rows in a table. Stacked is the index cards. Compact is the rows.

You set this once per row with the **Card Style** radio — **Stacked grid** or **Compact list**. You can change your mind later; see [Switching styles later](#switching-styles-later).

## Adding cards

1. Add a **Content Row**, set **Type** to **Cards**.
2. Pick **Card Style**.
3. Click **Add** under **Card** for each item you want. Each card is its own group of fields — add as many as the row needs.
4. Fill in the fields for each card (below).
5. Submit, then preview.

A row with only one card automatically spans the full width instead of sitting in a half-empty grid track, so a single featured item doesn't look like it's missing a partner.

## The fields

Only **Title** is required. Everything else can be left blank, and Cascade leaves out whatever isn't filled in — no empty boxes, no placeholder text.

| Field | Required? | What it's for |
|---|---|---|
| Eyebrow | No | A short label above the title, e.g. "Associate Degree." Good for a category tag. |
| Title | **Yes** | The card's heading. The only field a card needs to appear at all. |
| Body | No | One or two sentences of description. It's a rich-text field, so you can bold a word or add a link inside it. Keep it short — every card in a row sizes to whichever one is tallest. |
| Image | No | The card's picture. Stacked crops to a 16:9 band; Compact crops to a small square. See [Images are optional](#images-are-optional) below before you decide to skip it. |
| Alternative Text | No | Screen-reader description of the image. Often correct to leave blank — see [When to leave Alternative Text blank](#when-to-leave-alternative-text-blank). |
| Link | No | Makes the whole card clickable. Pick a page, file, or link already on this site. |
| External Link URL | No | Same idea as Link, but for an address outside this site (e.g. a catalog page). Only used if **Link** is empty — see [Link vs. External Link URL](#link-vs-external-link-url). |
| Link Label | No | Short call-to-action text, e.g. "Program details." Only shows up if the card has a link at all. |

## Images are optional

Leave a card's **Image** field blank and the picture area doesn't appear as a grey box or empty placeholder — it disappears completely, and the card's text starts right at the top.

- In **Stacked grid**, a card without an image gets a purple rule across the top instead, so the card still looks finished and intentional rather than like something failed to load.
- In **Compact list**, there's no equivalent treatment needed — a compact row without a thumbnail just looks like a plain list item, which is normal for that style.

One thing worth knowing rather than something Cascade stops you from doing: in a **Stacked grid** row, mixing cards that have images with cards that don't will render without errors, but it looks uneven — the imaged cards push their titles down further than the image-less ones, so the row reads as inconsistent rather than deliberate. Pick one or the other for a given row: either every card gets an image, or none of them do. **Compact list** doesn't have this problem — mixing thumbnails and no-thumbnails in the same compact row looks fine, because the layout doesn't depend on the image being there.

## When to leave Alternative Text blank

Alternative Text is optional on purpose, not an oversight. A card's image is illustrative — it's sitting right next to a title that already says what the card is about. If you leave Alternative Text blank, Cascade tells screen readers to skip the image entirely, which is the *correct* accessible behavior here: without that, a screen reader user would hear the title and then hear the image described a second time, saying roughly the same thing.

Fill in Alternative Text when the image actually carries information the title doesn't — a photo of a specific building, a chart, a person's face where recognizing them matters. Otherwise, leave it blank.

## Link vs. External Link URL

A card can link to one place. You have two ways to point it there:

- **Link** — pick a page, file, or link already in Cascade's asset tree. Use this for anything on this site.
- **External Link URL** — type a full address by hand, for destinations outside this site (e.g. `https://catalog.mchenry.edu/...`).

If you fill in both, **Link wins** — External Link URL is ignored whenever Link is set. Use External Link URL only when there's genuinely nothing to pick in Cascade because the destination lives elsewhere.

**Link Label** only shows up on the rendered card if the card has a link at all (either kind). If a card has no link, Link Label is simply not shown, even if you typed something into it.

## Switching styles later

Changing a row's **Card Style** from Stacked to Compact (or back) doesn't touch any of your card content — every eyebrow, title, body, image, and link stays exactly as you entered it. Only the layout changes. It's safe to try a row both ways and see which reads better before you commit to one.

## When Cards is the wrong tool

Cards is built for short, parallel, similarly-shaped items — a handful of sentences and maybe an image per item. If what you actually need is a page of real prose — several paragraphs, a mix of headings, inline images breaking up text — that belongs in a **Content Editor** row instead. Don't stretch a card's Body field into a full article; it will size every other card in the row to match it, and it isn't meant to hold that much.

If you find yourself hand-coding HTML into a Content Editor field to fake a card-like layout, stop — that's exactly the situation Cards was built to replace. See [Hand-Coding a One-Off Content Row Design with Gemini](hand-coding-a-content-row-design-with-gemini.md) for when that stopgap is appropriate, and its "When to stop hand-coding" section for why a repeated layout like this should become a real row type instead.

## Screenshots to add

The Data Definition change behind this row type hasn't been deployed to Cascade yet, so the edit-form screens below don't exist yet. Once it's live, capture these in order and drop each image's published Cascade URL in below. Each image must be uploaded into Cascade's asset tree first and referenced by its published `https://www.mchenry.edu/...` URL — a relative path or a locally-referenced file won't survive the docs sanitizer.

1. ![The Content Row Type dropdown showing "Cards"](PASTE_ABSOLUTE_URL_HERE)
2. ![The Card Style radio showing Stacked grid and Compact list](PASTE_ABSOLUTE_URL_HERE)
3. ![An expanded Card group showing all nine fields](PASTE_ABSOLUTE_URL_HERE)
4. ![A published page showing a Stacked grid row and a Compact list row](PASTE_ABSOLUTE_URL_HERE)
