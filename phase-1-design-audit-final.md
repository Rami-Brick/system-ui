# Phase 1 — Design Audit & Token Extraction
## Salesforce Lead Management Dashboard

> Foundation document for the design kit project. Captures what we see, names what it is, extracts the token system that powers it, and defines the visual invariants that must survive reuse. Everything built later should trace back to this document.
>
> **Source:** [Dribbble — Salesforce Lead Management Dashboard](https://dribbble.com/shots/25205060-Salesforce-Lead-Management-Dashboard)

---

## 1. Visual read

A dark, premium, glass-heavy dashboard built on an opinionated shape language. Core characteristics:

- **Pills and circles dominate.** Nearly every interactive or informational container is a full pill, a circle, or an extremely rounded rectangle.
- **Contrast comes from surface layering**, not hard borders.
- **The palette is restrained** — mostly monochrome, punctuated by selective accents.
- **Typography supports shape**, rather than competing with it.
- The overall feel is **soft-tech**, not enterprise-rigid.

> The uniqueness of this UI does not come from one hero component. It comes from the **repetition of a few strong primitives**: circular buttons, pill containers, frosted panels, muted typography, and scarce neon emphasis. The kit must preserve that discipline.

---

## 2. What must stay invariant

These are the non-negotiable rules of the system. If future reuse breaks these, the kit will drift toward generic dashboard UI.

1. **Prefer pills and circles over standard rectangles.**  
   This shape language is the strongest identity marker in the design.

2. **Use accent color sparingly.**  
   Lime/chartreuse should remain rare and high-signal. Overuse will flatten the hierarchy.

3. **Prefer layered contrast over hard borders.**  
   Depth should come from translucency, opacity shifts, blur, and soft edges — not heavy strokes.

4. **Keep dense data visually soft.**  
   Even information-heavy areas should feel polished and calm, not grid-heavy or harsh.

5. **Keep controls shape-consistent.**  
   Icon-only controls should stay circular; text actions should stay pill-based.

6. **Avoid default component-library aesthetics.**  
   Especially avoid anything that reads as stock shadcn or generic SaaS UI.

7. **Preserve the premium dark atmosphere.**  
   The background should feel deep, layered, and ambient — never flat black and never visually empty.

---

## 3. Region-by-region audit

### A. Global canvas

**What it is:** the full application frame sitting inside a large rounded container on a neutral outer backdrop.

**Observed in screenshot:**
- Outer backdrop: flat warm gray (~`#9B9B95`)
- App frame: very dark charcoal / near-black (~`#0A0B0A`) — **not pure black**
- Large outer corner radius on the app shell (~28–32px)
- Background is **not flat** — subtle atmospheric glow across the top, with a distinct greenish/teal haze visible behind the left content area
- Slight vignette across the whole frame

**System role:** layout composition; yields environment tokens (shell radius, app background, glow treatment).

**Reusability:** tokens yes, standalone component no.

---

### B. Top navigation

**What it is:** horizontal nav bar with brand, nav items, and utilities.

**Observed in screenshot:**
- Left: compact "S" swirl logo mark + lowercase `salesforce` wordmark
- Center: 3 nav items (`Overview`, `Customers`, `Marketing`)
- Active (`Customers`) is a **white pill with black text**
- Inactive items are plain white text with no container
- Right: 3 circular utility buttons (share/send, bell, avatar)
- The avatar has a vivid yellow fill behind the photo — more saturated than the other utilities

**Reusability breakdown:**
- Brand lockup — one-off / project-specific
- Nav tab pattern — reusable compound
- Utility icon button — reusable primitive
- Avatar button — reusable primitive variant

---

### C. Page header row

**What it is:** page-specific toolbar: back nav, title, central tools, and right-side actions.

**Observed in screenshot:**
- Left: circular back-arrow button (subtle, dark)
- Title: **"Customers & leads"** — large bold display, broken into two lines, tight leading
- Middle: long sequence of **9 same-sized circular icon buttons** (lab flask, paper plane, calendar, database, phone, plus, star, share, search)
- Right: two pill controls
  - `Customer Type` — secondary pill (dark surface, light text)
  - `New Customer +` — primary CTA: white pill with black text + **appended black circular + button** (split-style composite)

**Reusability breakdown:**
- Back button — reusable primitive
- Display heading style — reusable typographic token
- Icon toolbar — reusable compound
- Secondary pill — reusable primitive
- Primary CTA pill with appended circle — reusable compound

---

### D. KPI strip

**What it is:** metrics row with a long segmented bar beneath.

**Observed in screenshot:**
- 5 evenly distributed metric blocks, each with:
  - Large monetary value (`$0,00`, `$600,00`, etc.)
  - Small muted label (`0 estimates`, `Unbilled income`, `2 overdue invoices`)
- Underneath: one long horizontally **segmented rounded strip**
- Segments in order L→R: blue → magenta → lime/chartreuse (wide) → pale silver (widest) → orange
- Labels are duplicated (`Unbilled income` twice, `2 overdue invoices` twice)

**Inferred for system completeness:**
- Segment widths likely imply a **proportional stacked indicator**, though this is not fully confirmable from the screenshot
- Duplicate labels are likely placeholder/template content, not a design behavior to preserve literally

**Reusability breakdown:**
- Metric block — reusable compound
- Segmented progress/composition bar — reusable compound
- Exact 5-item layout — pattern-level composition

---

### E. Left panel — invoice list

**What it is:** large frosted content panel with header controls and a list of invoice rows.

**Observed in screenshot:**

**Panel surface:**
- Rounded rectangular glass panel
- Subtle translucent fill
- Very soft edge separation (not a hard border)

**Panel header:**
- Section title (`All Invoices`) + circular `+` button on the left
- List/grid segmented toggle (segmented pill control)
- Right-aligned action icons (refresh, upload, edit)

**Table-like rows:**
- Columns: Name · Phone · Open Balance · Action
- Rows are softly separated — **no classic table lines**
- Each row contains:
  - Avatar circle with **color-coded ring** (blue, magenta, yellow/lime, white/silver, magenta, cyan, orange)
  - Name text
  - Phone text
  - Balance text
  - Action area: pill button + ellipsis icon + directional arrow/open icon

**Selected row state:**
- Lighter background fill
- Stronger emphasis
- Visible **circular dot indicator** at left edge
- Action pill content changes: `Receive payment` → `Create invoice`

**Reusability breakdown:**
- Glass panel — reusable primitive (surface)
- Panel header actions — reusable compound
- Data row — reusable compound
- Row selected state — reusable variant
- Avatar with color ring — reusable primitive
- Column layout — pattern-level composition

---

### F. Right panel — invoice detail

**What it is:** side panel for the selected invoice. Slightly brighter than the left panel.

**Observed in screenshot:**

**Panel surface:**
- Raised variant of the glass panel — noticeably lighter/more opaque than the left panel

**Header line:**
- `INV-00120` label (left)
- 4 circular action icons (paperclip, send, upload, edit)
- Ellipsis menu `...`
- Close `×`

**Main identity block:**
- Large **lime/chartreuse circular avatar** with white `S` initial
- Small blue star badge beside it
- Customer name (`Silker`)
- Multi-line address
- "Bill To:" line with mini avatar + underlined link (`Anna Sterling`)

**Right-aligned metadata stack:**
- Invoice number (`#INV-00120`)
- Balance Due ($80.00, emphasized)
- Invoice Date
- Terms
- Due Date

**Line items mini-table:**
- Columns: # · Item & Description · Qty · Rate · Amount
- 2 rows (Onyx Vase, Rosewood Frame)

**Totals row — 3 adjacent pills:**
- `Sub Total $80.00` — light/white
- `Total $80.00` — medium gray
- `Balance Due $80.00` — **lime/chartreuse, widest, boldest** (highest emphasis)

**Reusability breakdown:**
- Raised glass panel — reusable surface variant
- Header action row — reusable compound
- Customer identity block — reusable compound
- Metadata stack — reusable compound
- Mini line-items table — reusable pattern
- Totals pill group — reusable compound

---

## 4. Visual DNA — the system's design principles

These are descriptive, but also operational. They should later become reusable guidance for humans and AI assistants alike.

### 1. Pill-first geometry
Nearly every container tends toward full pill, circle, or extreme rounding. This is the strongest stylistic rule.

### 2. Circular icon buttons as foundational primitive
They appear everywhere — top-right utilities, center toolbar, panel actions, row actions, close/more controls.

### 3. Frosted surfaces over a dark field
Panels are not flat cards. They feel translucent, layered, slightly blurred, and softly edged.

### 4. Accent restraint
Most surfaces and text are neutral. Accents appear **only where attention should spike**:
- Lime/chartreuse = highest emphasis (primary CTA, balance due, active avatar)
- Identity colors = avatar rings / categorization
- Muted whites/grays = structure

### 5. Quiet, disciplined typography
The type system does not decorate. Hierarchy comes from size, weight, and opacity — not multiple font personalities.

### 6. Data UI softened into consumer-grade polish
Business dashboard, but **no harsh enterprise patterns**:
- No rigid grid lines
- No square buttons
- No heavy dividers
- No visual clutter

### 7. Surfaces are layered, not boxed
Prefer translucency, contrast shifts, and soft borders over rigid outlines and harsh separators.

### 8. Density should still feel soft
This screen handles a lot of information without ever feeling hard-edged. Preserve this.

---

## 5. Reusable element taxonomy

This is the audit-derived decomposition of the screen into likely building blocks.

### Reusable primitives
1. Circular icon button
2. Pill button — text
3. Pill container / capsule surface
4. Avatar circle
5. Avatar with badge
6. Surface panel — base glass
7. Surface panel — raised glass
8. Text label / muted label
9. Data value text
10. Section title
11. Navigation pill
12. Row selection indicator
13. Segmented bar segment

### Reusable compounds
1. Top nav item group (brand + nav + utilities)
2. Icon toolbar (horizontal row of circular buttons)
3. Primary CTA (pill + appended circular + action)
4. KPI metric block (value + label + bar segment)
5. Segmented composition bar (full 5-color meter)
6. List/grid segmented toggle
7. Panel header actions (title + inline + right actions)
8. Invoice row (default)
9. Invoice row (selected variant)
10. Invoice detail header
11. Customer identity block
12. Metadata stack (right-aligned label/value pairs)
13. Mini line-items table
14. Totals pill group

### One-off / pattern-level compositions
1. Full page shell (app frame + canvas + glow)
2. Complete page header arrangement
3. KPI strip layout
4. Left-right dashboard split
5. Full invoice detail layout
6. Entire dashboard assembly

---

## 6. State analysis

Every reusable component needs state variants. The distinction below matters:

- **Observed** = clearly visible in the screenshot
- **Inferred** = not directly visible, but required for a production-ready reusable system

### Circular icon button
- `default` — **observed** — dark translucent circle
- `emphasized` — **observed** — stronger contrast / brighter fill on some actions
- `inverted` — **observed/inferred** — white circle with dark icon for high-prominence actions
- `hover` — **inferred**
- `pressed` — **inferred**
- `disabled` — **inferred**
- `focus-visible` — **inferred**

### Pill button (text)
- `default` — **observed** — dark translucent surface
- `primary` — **observed** — white surface, dark text
- `accent` — **observed** — lime/chartreuse surface, dark text
- `hover` — **inferred**
- `pressed` — **inferred**
- `disabled` — **inferred**
- `focus-visible` — **inferred**

### Nav item
- `inactive` — **observed** — plain text, no container
- `active` — **observed** — white pill, dark text
- `hover` — **inferred**
- `focus-visible` — **inferred**

### List row
- `default` — **observed**
- `selected` — **observed** — lighter fill + dot indicator + action pill swap
- `hover` — **inferred**
- `focus` — **inferred**
- `disabled` — **inferred**
- `loading/skeleton` — **inferred**

### Panel surface
- `base` — **observed** — left panel treatment
- `raised` — **observed** — right panel treatment
- `selected sub-surface` — **observed/inferred** — inside the selected row

### Avatar
- `default` — **observed**
- `color-ring` — **observed**
- `with-badge` — **observed**
- `selected/emphasized` — **inferred**

---

## 7. Design tokens

All values are **first-pass estimates** from the screenshot. Naming uses **semantic dot-notation** — tokens describe purpose, not literal values.

### 7.1 Token confidence

Use this to decide what can be standardized immediately vs what needs implementation-time tuning.

**High confidence**
- Shape language (circles, pills, extreme rounding)
- Surface hierarchy (base glass, raised glass, selected sub-surface)
- Text hierarchy (primary, secondary, tertiary, inverse)
- Accent restraint as a rule
- Relative emphasis relationships between controls and content

**Medium confidence**
- Spacing scale
- Size families for icons, pills, and avatars
- Relative panel padding
- Relative brightness differences between left and right panels

**Low confidence**
- Exact font match to the original concept
- Exact color values
- Exact blur, shadow, opacity, and transparency values
- Exact semantic meaning of some toolbar icons
- Whether the KPI strip is truly data-proportional or partly decorative

### 7.2 Color

#### Neutrals / surfaces

| Token | Estimate | Purpose |
|---|---|---|
| `bg.app` | `#0A0B0A` | Main app background |
| `bg.shell` | `#9B9B95` | Outer neutral canvas |
| `surface.glass` | `rgba(255,255,255,0.04)` | Base frosted panel (left panel) |
| `surface.glass-raised` | `rgba(255,255,255,0.07)` | Raised/emphasized panel (right panel) |
| `surface.glass-selected` | `rgba(255,255,255,0.18)` | Selected row / highlighted sub-surface |
| `surface.control` | `rgba(255,255,255,0.06)` | Buttons / capsules default |
| `surface.control-inverse` | `rgba(255,255,255,0.95)` | White pills / bright CTAs |
| `border.soft` | `rgba(255,255,255,0.08)` | Subtle panel edges |
| `border.faint` | `rgba(255,255,255,0.05)` | Very light separators |

#### Text

| Token | Estimate | Purpose |
|---|---|---|
| `text.primary` | `#FFFFFF` | Main text, values |
| `text.secondary` | `rgba(255,255,255,0.72)` | Supporting text |
| `text.tertiary` | `rgba(255,255,255,0.46)` | Labels, metadata |
| `text.inverse` | `#0B0B0B` | Text on white / accent surfaces |

#### Accents — semantic layer

| Token | Estimate | Purpose |
|---|---|---|
| `accent.primary` | `#DFFF2F` | Highest emphasis — CTA, balance due, active selections |
| `accent.info` | `#2D7CF6` | Info / badge blue |

#### Identity palette (avatar rings, KPI segments)

| Token | Estimate | Purpose |
|---|---|---|
| `identity.blue` | `#2D7CF6` | Avatar ring / KPI segment |
| `identity.magenta` | `#D94BF4` | Avatar ring / KPI segment |
| `identity.chartreuse` | `#E8F21D` | Large "S" avatar fill / bright identity accent |
| `identity.silver` | `#D7D9DF` | Neutral-bright identity accent |
| `identity.orange` | `#FF9A18` | Warm identity accent |
| `identity.cyan` | `#38D3D3` *(tbd)* | Seen on one avatar ring |

#### Atmosphere / glow

| Token | Estimate | Purpose |
|---|---|---|
| `glow.green` | `rgba(154,255,90,0.10)` | Left-side ambient bloom |
| `glow.teal` | `rgba(92,214,180,0.10)` | Cool atmospheric depth |
| `shadow.ambient` | `rgba(0,0,0,0.35)` | Vignette / depth |

---

### 7.3 Typography

Default stack: **Plus Jakarta Sans**. A more premium geometric sans with enough personality for the kit's soft-tech dashboard feel.

| Token | Size / weight | Purpose |
|---|---|---|
| `font.display-lg` | 42–48px / 700 | Main page heading (`Customers & leads`) |
| `font.heading-md` | 20–24px / 600 | Panel titles (`All Invoices`, `Invoice`) |
| `font.stat-lg` | 18–22px / 500–600 | KPI values, invoice totals |
| `font.body-md` | 14px / 400–500 | Primary UI text |
| `font.body-sm` | 12–13px / 400–500 | Metadata, labels |
| `font.micro` | 11–12px / 400 | Fine supporting text |

**Behavior rules:**
- Display heading uses **tight leading**
- Labels lower their contrast (via `text.tertiary`), not always their size
- Numeric values deserve slightly tighter tracking / consistent weight

---

### 7.4 Radii

The system clearly favors **extreme rounding** over moderate rounding.

| Token | Estimate | Purpose |
|---|---|---|
| `radius.app` | 28–32px | Outer app shell |
| `radius.panel` | 24–28px | Large panels |
| `radius.card` | 20–24px | Inner content blocks |
| `radius.pill` | 9999px | Buttons, KPI bars, pills |
| `radius.round` | 50% | Circular controls, avatars |

---

### 7.5 Spacing

Tailwind's 4px base works. Rhythm emphasizes these steps:

| Token | Estimate | Purpose |
|---|---|---|
| `space.1` | 4px | Tight inner spacing |
| `space.2` | 8px | Small gaps |
| `space.3` | 12px | Dense UI spacing |
| `space.4` | 16px | Standard control gap |
| `space.5` | 20px | Section gap |
| `space.6` | 24px | Panel padding minimum |
| `space.7` | 32px | Large panel padding / region spacing |

**Behavior:**
- Panels are **generously padded**
- Controls are **packed but not cramped**
- Horizontal grouping is **tighter** than vertical section spacing

---

### 7.6 Sizes

#### Circular controls

| Token | Estimate | Purpose |
|---|---|---|
| `size.icon-sm` | 28–32px | Tiny inline actions (row ellipsis, arrow) |
| `size.icon-md` | 36–40px | Standard icon button (toolbar) |
| `size.icon-lg` | 44–48px | Emphasized controls (back, close) |

#### Avatars

| Token | Estimate | Purpose |
|---|---|---|
| `size.avatar-sm` | 20–24px | Mini "Bill To" avatar |
| `size.avatar-md` | 32–40px | Table row avatar |
| `size.avatar-lg` | 52–64px | Detail panel main avatar |

#### Pills

| Token | Estimate | Purpose |
|---|---|---|
| `size.pill-sm` | 28–32px | Small utility pills |
| `size.pill-md` | 36–40px | Standard controls |
| `size.pill-lg` | 44–48px | CTA, totals pills |

---

### 7.7 Effects

#### Glass / frost

| Token | Estimate | Purpose |
|---|---|---|
| `effect.blur.panel` | 12–20px | Panel backdrop blur |
| `effect.blur.control` | 8–14px | Button / control blur |
| `effect.inner-light` | subtle top/edge highlight | Soft interior glow |
| `effect.edge-soft` | low-contrast 1px border | Edge definition |

#### Shadow / depth

| Token | Direction | Purpose |
|---|---|---|
| `shadow.panel` | soft, diffuse, below | Lift panel from background |
| `shadow.control` | minimal | Tactile feedback on controls |
| `shadow.glow` | broad, colored | Atmospheric depth |

**Note:** exact blur/shadow values are not reliably measurable from the screenshot. These stay provisional until implementation.

---

## 8. Concerns & flags

Not blockers, but important to carry into later phases.

### Accessibility
- Some muted text on translucent surfaces may fail WCAG contrast in production
- Lime/chartreuse on very light surfaces needs contrast testing
- Small icon-only buttons need clear hover and focus treatment

### Responsiveness
- Composition is **desktop-first**
- Left-right split and long horizontal toolbars need a responsive strategy
- KPI strip may need structural adaptation on narrow widths

### Screenshot uncertainty
- Exact font family not confirmable
- Exact color, blur, and transparency values are estimates
- Some toolbar icons may be **concept-shot embellishment** rather than real functional product UI

### Content placeholders
- The KPI labels are duplicated in the source (`Unbilled income` twice). Replicate placeholder logic loosely — do not preserve obvious template artifacts as rules.

---

## 9. Decisions committed in this document

- **Font stack:** Plus Jakarta Sans
- **Icon library:** `lucide-react`
- **Token naming:** semantic dot-notation (`surface.glass-raised`, not `slate-850`)
- **Fidelity strategy:** visual faithfulness first, then normalize only where reuse clearly benefits
- **Accent split:** `accent.primary` is semantically separate from `identity.chartreuse`, even if the hues end up close
- **System intent:** build a reusable visual language, not a literal one-screen clone

---

## 10. Open questions for implementation

These do not block the audit, but will need resolution when translating the system into code.

- Exact eyedropped color values
- Exact blur / shadow / transparency values
- Whether the KPI segmented bar is truly data-proportional or partly decorative
- Which toolbar icons represent meaningful actions vs concept-shot styling
- Final hover / focus / pressed / disabled state treatments
