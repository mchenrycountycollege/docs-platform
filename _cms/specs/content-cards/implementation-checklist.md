# Content Cards — Cascade Implementation Checklist

Row type `cards` on the **Two Column** Data Definition. Two styles: **Stacked grid** (A)
and **Compact list** (D), chosen per row by a radio. Ships to both the legacy and the
refresh page frames from one code path.

Everything below has already been written into this repo. This checklist is the
sequence for getting it into Cascade.

**Files in this repo:**

| Purpose | Path |
|---|---|
| DD delta (paste source + review) | `_cms/specs/content-cards/data-definition.xml` |
| DD, already patched | `_cms/data-definitions-prod/two-column.xml` |
| Velocity macro | `_cms/formats/_shared/content-cards.vm` |
| CSS block | `_cms/specs/content-cards/content-cards.css` |
| CSS, already appended | `_cms/cascade-css-files/app.css`, `_cms/cascade-css-files/_refresh/style.css` |
| Legacy dispatcher, already wired | `_cms/formats/two-column/default.vm` |
| Refresh dispatcher, already wired | `_cms/formats/_refresh/two-column/default-two-column.vm` |

---

## Phase 1: Data Definition

- [ ] Manage Site → **Data Definitions** → open **Two Column**
- [ ] Switch to the XML view and back up the current XML before editing
- [ ] Add the `<dropdown-item label="Cards" .../>` line to the `type` dropdown inside
      the `content` group, immediately after the existing **Listing** item
- [ ] Add the `cards-style` radio and the `card` group as siblings inside the `content`
      group, immediately before `<shared-field identifier="spotlight-cards" ...>`
- [ ] Submit
- [ ] **Verify the `card` group's Body field renders as a WYSIWYG editor.** It reuses the
      exact `wysiwyg="true"` pattern already proven by the `listing/wysiwyg` field in this
      same DD, so it should — but confirm before moving on
- [ ] Open any existing Two Column page and confirm **no existing row type changed**.
      The nine new `field-id` values use the `cd0000NN` prefix, checked as unique against
      every ID already in this DD, so nothing should have been reassigned

## Phase 2: Format

- [ ] Navigate to `/_cms/formats/_shared/`
- [ ] Create a new Format named `content-cards`
- [ ] Set Type to **Velocity Format**
- [ ] Paste the contents of `_cms/formats/_shared/content-cards.vm`
- [ ] Submit

## Phase 3: Wire both dispatchers

- [ ] Open `/_cms/formats/two-column/default.vm` (legacy) and add the `cards` branch after
      the `listing` branch — it includes a `<div class="clearfix"></div>` first, matching
      how every other row type recovers from Listing's floats
- [ ] Open `/_cms/formats/_refresh/two-column/default-two-column.vm` and add the same
      branch, without the clearfix (refresh does not float)
- [ ] Submit both

## Phase 4: CSS

- [ ] Open the legacy stylesheet asset (`app.css`) and paste the block from
      `_cms/specs/content-cards/content-cards.css` at the end of the file
- [ ] Open the refresh stylesheet asset (`_refresh/style.css`) and paste **the identical
      block** at the end of the file
- [ ] Submit both

The block is byte-for-byte the same in both. Every site value is written as
`var(--token, fallback)`: refresh defines the tokens and wins, legacy defines none and
takes the fallback. If the two files ever diverge, that is a bug, not a customization.

## Phase 5: Verification

- [ ] Create a test page from the Two Column Content Type on the **dev** site
- [ ] Add a Content Row → Type **Cards** → Card Style **Stacked grid** → add four cards
      with an image each. Confirm 2-up with the sidebar on, 3-up with **Show Sidebar → No**
- [ ] Clear every Image field on that row. Confirm the media band disappears entirely
      (no grey box, no gap) and each card picks up a purple top rule
- [ ] Fill in only Title on one card. Confirm no empty space where eyebrow, body, or CTA
      would have been
- [ ] Delete a card's Title and submit. Confirm the macro skips it rather than rendering
      an empty box
- [ ] Reduce the row to one card. Confirm it spans the full column
- [ ] Switch the same row to **Compact list**. Confirm no content is lost and the layout
      changes to tinted panels
- [ ] Add a card with an **External Link URL** and no internal Link. Confirm it links out.
      Then add an internal Link to the same card and confirm the internal link wins
- [ ] Put a hyperlink inside a card's Body. Confirm it is clickable and does not get
      swallowed by the card-wide title link
- [ ] Keyboard-only pass: Tab to each card. Focus ring visible, one stop per card, and
      the card lifts on `:focus-within`
- [ ] Screen-reader pass: confirm each card announces as a single link, and that a card
      whose Alternative Text is blank does not announce its image
- [ ] Check heading levels: with a row Heading the card titles are `h3`; without one they
      are `h2`. Neither should skip a level under the page `h1`
- [ ] Resize to mobile, tablet, desktop. The grid is driven by container queries on the
      main column, so verify with the sidebar both on and off
- [ ] Repeat the whole pass on a **legacy** Two Column page
- [ ] Publish the test page and confirm on the live site

---

## Notes and decisions

**Imagery is optional everywhere, as asked.** The `image` and `alt` fields carry no
`required` attribute, and the macro renders no `<figure>` at all when the image is blank.
There is one place I would still advise rather than enforce: a **stacked** row that mixes
imaged and image-less cards renders fine but does not look deliberate, because the imaged
cards push their titles down. The Image help text now says to be consistent within a row.
If you would rather Cascade enforce that than suggest it, that is a small addition to the
macro — say the word. Compact cards have no such tension; a mixed compact row looks fine.

**Alt text is not required, and that is deliberate.** A card image is illustrative and
sits next to a title that already carries the meaning, so `alt=""` is the correct
accessible output when an editor leaves it blank — it keeps a screen reader from
announcing the same thing twice. An editor who does fill it in gets it honored verbatim.

**Body is a WYSIWYG, matching the `listing` row.** That is the pattern already proven in
this DD, and it lets editors bold a word or drop in a link. The CSS normalizes what comes
back — headings inside a card are clamped to 1rem, images to `max-width: 100%`, and links
are lifted above the card-wide stretched link so they stay clickable.

**One card = one link.** The title anchor is stretched across the whole card with
`::after { inset: 0 }`, and the CTA is a `<span>`, not a second anchor — otherwise a
screen reader would report two links to one destination for every card.

**No new Block, no new Content Type, no new Configuration.** This is a field on an
existing page Data Definition, so Phases 3 and 5–8 of the standard template do not apply.
Content lives on the page, which is what makes it editable by the same people who already
edit Two Column pages, with no new permissions to grant.

**Adding a third style later** costs one `<radio-item>` and one CSS block. No field
changes, and editors can re-style an existing row without retyping anything — which is
what makes B (horizontal row) cheap to add if Listing is ever retired.
