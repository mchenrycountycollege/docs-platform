## Implementation Checklist — Art Gallery Current Exhibits

> **Code files produced by Cascade Developer agent**
>
> - Data Definition XML: `_cms/specs/artgallery-current-exhibits/artgallery-current-exhibits-dd.xml`
> - Velocity Format: `_cms/formats/artgallery/current-exhibits.vm`

---

## Phase 1: Create the Data Definition

- [X] In Cascade, navigate to **Manage Site > Data Definitions**
- [X] Click **New** to create a new Data Definition
- [X] Name it: `artgallery-current-exhibits`
- [X] Switch to the **XML** tab in the editor
- [X] **Press Ctrl/Cmd+A** to select all existing content in the XML tab (clears any default placeholder Cascade pre-fills)
- [X] Paste the `<system-data-structure>` element from `_cms/specs/artgallery-current-exhibits/artgallery-current-exhibits-dd.xml` — start your paste at the `<system-data-structure>` opening tag and include everything through `</system-data-structure>`. Do **not** paste the comment block at the top of that file (it is developer documentation, not Cascade XML).
- [X] Click **Submit** to save
- [X] Verify the form preview shows:
  - A rich text **Page Introduction** field (optional)
  - A repeating **Exhibit** group with: Gallery Name, Artist Name, Exhibit Title, Dates, Artist Talk (optional), Reception (optional), Featured Artwork Image, Image Caption (optional), Artist Statement (optional), About the Artist (optional)

---

## Phase 2: Create the Velocity Format

- [X] In Cascade, navigate to **_cms/formats/** (or create this path if it doesn't exist: **_cms/formats/artgallery/**)
- [X] Inside `_cms/formats/artgallery/`, create a new **Format** asset
- [X] Name it: `current-exhibits`
- [X] Copy the full contents of `_cms/formats/artgallery/current-exhibits.vm` from this workspace and paste it into the Format editor
- [X] Click **Submit** to save
- [X] Use the **Test Format** button to validate output:
  - Wire to the Current Exhibits page (once created in Phase 4) or any test page
  - Confirm the exhibit sections, sticky nav, logistics, and accordions render correctly

---

## Phase 3: Create the Content Type

- [ ] Navigate to **Manage Site > Content Types**
- [ ] Click **New** to create a new Content Type
- [ ] Name it: `Art Gallery — Current Exhibits`
- [ ] **Configuration:** Select the appropriate single-column page configuration (e.g., `One Column` or `One Column Full Banner` — the page that renders main content without a sidebar, matching the gallery page layout)
- [ ] **Data Definition:** Select `artgallery-current-exhibits`
- [ ] **Metadata Set:** Select the site default Metadata Set
- [ ] Click **Submit** to save

> **Note:** The Content Type name determines what editors see when adding content. `Art Gallery — Current Exhibits` is clear and uses Title Case per conventions.

---

## Phase 4: Create the Current Exhibits Page

- [ ] Navigate to the Art Gallery section of the site in the asset tree (e.g., `/art-gallery/`)
- [ ] Click **New > Art Gallery — Current Exhibits** (the Content Type just created)
- [ ] Name the page: `current-exhibits`
- [ ] The page will now have the structured form with Exhibit groups
- [ ] Assign the `current-exhibits` Format to the **DEFAULT** (or **MAIN CONTENT**) region of this page:
  - Go to the page's **Edit > Configure** view
  - In the region assignments, select Format `_cms/formats/artgallery/current-exhibits`
  - Leave Block empty for this region (the Format reads directly from page structured data)
- [ ] Click **Submit**

---

## Phase 5: Assign the Format to the Configuration (Optional — Recommended)

If other pages will ever use the same Art Gallery layout, assign the Format at the **Configuration** level instead of page-by-page:

- [ ] Navigate to **Manage Site > Configurations**
- [ ] Open the Configuration assigned to the `Art Gallery — Current Exhibits` Content Type
- [ ] In the **DEFAULT** (or main content) region, assign Format `_cms/formats/artgallery/current-exhibits`
- [ ] Leave the Block field empty for this region
- [ ] Click **Submit**

> **Architecture note:** Assigning at the Configuration level means all pages of this Content Type automatically use this Format without per-page override. This is the preferred approach.

---

## Phase 6: Add Editor-Facing Metadata Image Instructions (Recommended)

The Format derives artwork `alt` text from the image file's **Metadata > Title** field in Cascade. Non-technical editors need to know this:

- [ ] Add a note to the editor-facing training documentation / user guide explaining:
  > "When uploading artwork images, always fill in the **Title** field in the file's Metadata. This text is used as the image description for screen readers and accessibility compliance."
  >
- [ ] Optionally, add a Cascade **Metadata Set** instruction or update the site user guide at `user-workflows/user-guide.html`

---

## Phase 7: Set Up the Workflow

The spec requires a standard Edit approval workflow (editor submits, web team approves before publish):

- [ ] Navigate to the folder where the Current Exhibits page lives (e.g., `/art-gallery/`)
- [ ] Open **Folder Properties** (right-click → Edit)
- [ ] Under the **Workflow** tab:
  - Enable **Require Workflow** for **Edit** actions
  - Assign the existing `Edit - Approval Required` workflow definition (or equivalent)
- [ ] Click **Submit**
- [ ] Test: make an edit to the page as an editor account and confirm the workflow triggers

---

## Phase 8: Set Up the Gallery Editor Role & Permissions

For the non-technical gallery editor who does monthly content swaps:

- [ ] Navigate to **Administration > Roles**
- [ ] Create a new **Site Role** (or reuse an existing contributor role) named: `Art Gallery Editor`
- [ ] **Site Role abilities** for this role:
  - Access Site: ✓
  - Read: ✓
  - Write: ✓ (scoped to the gallery folder below)
  - Delete: ✗
  - Move/Rename: ✗
  - Copy: ✗
  - Publish: ✗ (must go through workflow)
  - Bypass Workflow: ✗ ← NEVER enable for non-technical contributors
  - All administrative abilities: ✗
- [ ] Navigate to the art gallery folder in the asset tree
- [ ] Open **Folder Properties > Access Rights**
- [ ] Grant the `Art Gallery Editor` role **Read + Write** on the art gallery folder
- [ ] Grant the Art Gallery image upload folder **Read + Write** so editors can upload artwork images
- [ ] Grant root `/`: **Read only** (editors can navigate but not edit other content)
- [ ] Click **Submit**

---

## Phase 9: Create an Asset Factory (Optional — Recommended)

If editors ever need to create a _new_ Current Exhibits page (e.g., a future season):

- [ ] Navigate to **Manage Site > Asset Factories**
- [ ] Create a new Asset Factory named: `Art Gallery — Current Exhibits Page`
- [ ] **Base Asset:** the `current-exhibits` page created in Phase 4
- [ ] **Placement Folder:** `/art-gallery/` (restrict to gallery section)
- [ ] **Applicable Groups:** `Art Gallery Editor` (only gallery editors see this in Add Content)
- [ ] **Workflow Mode:** `Folder Controlled` (inherits folder workflow)
- [ ] Click **Submit**

---

## Phase 10: Test the Full Editor Experience

- [ ] Log in (or use Test Login) as a gallery editor account
- [ ] Open the Current Exhibits page and click **Edit**
- [ ] Verify:
  - [ ] Page Introduction field appears and accepts rich text
  - [ ] Exhibit groups can be added (up to 10) and removed
  - [ ] Required fields (Gallery Name, Artist Name, Exhibit Title, Dates, Image) block submission when blank
  - [ ] Optional fields (Artist Talk, Reception, Image Caption, Statement, Bio) can be left blank without errors
  - [ ] Image chooser restricts to file assets (not pages)
- [ ] Submit the page through workflow and confirm the approval email or queue entry is generated
- [ ] After approval/publish, view the published page and test:
  - [ ] Sticky nav renders and scrolls correctly (hidden if only 1 exhibit)
  - [ ] Mobile nav toggle works on a narrow viewport
  - [ ] Artist Talk / Reception rows are hidden when those fields are empty
  - [ ] Image renders with correct alt text (check with browser DevTools)
  - [ ] Accordion opens and closes with keyboard (Tab + Enter/Space)
  - [ ] Only statement or only bio accordion renders correctly when one is empty
  - [ ] No accordion block rendered when both statement and bio are empty

---

## Production CSS Migration (Optional — Recommended)

The Format currently outputs a `<style>` block in the page body for self-containment. For production:

- [ ] Copy the CSS from the `<style>` block in `_cms/formats/artgallery/current-exhibits.vm`
- [ ] Add to the site's compiled stylesheet (or create `artgallery.css` and reference it in the template `<head>`)
- [ ] Remove the `<style>...</style>` block from the Format (lines 21–179)
- [ ] Test the page visually to confirm styles still apply

---

## Summary of Assets Created


| Asset Type      | Name / Path                                 | Notes                                                    |
| ----------------- | --------------------------------------------- | ---------------------------------------------------------- |
| Data Definition | `artgallery-current-exhibits`               | Page-level DD; editor form for exhibit content           |
| Velocity Format | `/_cms/formats/artgallery/current-exhibits` | Reads page DD; renders exhibit layout + nav + accordions |
| Content Type    | `Art Gallery — Current Exhibits`           | Wires DD + Configuration for the editor Add Content menu |
| Page            | `/art-gallery/current-exhibits`             | The actual gallery page (create manually)                |
| Site Role       | `Art Gallery Editor`                        | Scoped write access; no publish or bypass-workflow       |
| Workflow        | `Edit - Approval Required`                  | Folder-level enforcement on`/art-gallery/`               |
| Asset Factory   | `Art Gallery — Current Exhibits Page`      | (Optional) For future season page creation               |
