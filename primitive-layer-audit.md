# Primitive Layer Audit

Cross-component review of the 8 primitives built in Phase 2 so far. Reviewed against Phase 1 (tokens, invariants, state expectations) and against each other (naming, API, gaps).

---

## Overall verdict

**The primitive layer is in good shape.** No component needs to be scrapped, rewritten, or split. There are no contradictions between primitives. The discipline of building each one narrowly — and splitting when scope broadened (MetricBlock → KeyValueRow) — held up.

What the audit found is a smaller set of issues, grouped below. Real problems first, nitpicks last.

---

## Real issues (worth fixing before compounds)

### 1. MetricBlock `lg` value size falls in a typography token gap

**The issue.** MetricBlock `lg` uses `text-[32px]` for values. Phase 1's typography scale jumps from `font.heading-md` (20–24px) straight to `font.display-lg` (42–48px). 32px exists between two tokens — it doesn't map to either.

**Why it matters.** Every other typography-related size on every other primitive maps to a Phase 1 token range. This one doesn't. When we extract tokens to CSS vars in Phase 4, we either need to add a `font.stat-xl` (~32px) token, or reduce MetricBlock `lg` to `28px` (top of `heading-md` + one step).

**Suggested resolution.** Add `font.stat-xl` (32px / 600 / tracking-tight) as a new token when we extract. Document it as "oversized stat, hero KPI." Don't change the MetricBlock component now — the visual call is right, the token scale just didn't anticipate it.

**Severity:** low structurally, trivial to fix, but worth fixing before compounds use MetricBlock `lg` (the KPI strip will).

---

### 2. Missing cross-component disambiguation rules

This is the one genuine gap that could cause problems once compounds start using primitives together.

The primitives have overlapping visual surface areas in three places, and none of them are explicitly disambiguated anywhere:

**a) PillButton (light) vs PillStat (light).** Both are white pills. Content structure differs (single label vs label+value), but an AI assistant asked to build "a white pill showing $80" doesn't know which to reach for.

**b) MetricBlock vs PillStat for emphasized values.** Both can display a large emphasized value with a label. MetricBlock is containerless; PillStat lives in a pill surface. When is each right?

**c) MetricBlock (stacked) vs KeyValueRow (inline).** Already addressed well in both docs — this one is fine.

**Suggested resolution.** Add a short **"Data Display Decision Tree"** document at `/catalog/primitives/_decision-tree.md`. Something like:

> **I'm showing a value with a label. Which primitive?**
>
> - Is it the answer to a question that's also on screen? (e.g. `Invoice Date: …`) → **KeyValueRow**
> - Is it a headline data point in a set of peers? (KPI strip, dashboard stats) → **MetricBlock**
> - Is it a summary value at the end of a section, in a pill container? → **PillStat**
> - Is it clickable? → **PillButton** (it's an action, not a display)

This would sit alongside the catalog and be part of what we feed to Claude Code in future projects. **More valuable than any individual component doc in preventing drift.**

**Severity:** medium. Not a structural problem, but the thing most likely to cause misuse.

---

## Medium issues (worth addressing, not urgent)

### 3. `asChild` support inconsistency

Only `GlassPanel` supports polymorphism via Radix Slot. The natural candidates that *don't* support it but could benefit:

- **PillButton** — common need: render as `<a>` for navigation links that visually look like buttons (common in top navs)
- **CircularIconButton** — same reason; icon-only links-as-buttons are common

**Suggested resolution.** Add `asChild` to PillButton and CircularIconButton during Phase 4 extraction. Don't block compounds on this — the compounds we're about to build (Split CTA, Panel Header, Icon Toolbar) don't need it.

**Severity:** low. Retrofit-safe.

---

### 4. New tokens not yet in the tokens file

Three new tokens/families were flagged across the 8 primitives for Phase 4 extraction:

| Token | Needed by | Current value |
|---|---|---|
| `surface.control-muted` | PillStat `muted` variant | `#C7C9CE` |
| `text.inverse-muted` | PillStat `muted`/`light` labels | `rgba(11,11,11,0.55)` / `rgba(11,11,11,0.70)` |
| `size.bar-sm` / `md` / `lg` | SegmentedBar heights | 4px / 10px / 16px |
| `font.stat-xl` *(new — from issue #1)* | MetricBlock `lg` value | 32px / 600 / tracking-tight |

**Suggested resolution.** Append these to the Phase 1 token tables during Phase 4 extraction. All are already properly flagged in their respective component docs — this is just a consolidated reminder.

**Severity:** low. Nothing is broken; we just need to remember.

---

## Minor inconsistencies (nice-to-have, not blocking)

### 5. Variant naming: `solid` feels off in CircularIconButton

`CircularIconButton` variants are `glass / light / solid`. The first two describe the *treatment of the surface* (translucent vs bright). `solid` describes *opacity* — it's orthogonal, not parallel. The component's own doc admits the variant is "nested on a light parent" — a contextual role, not a surface treatment.

Renaming options:
- `glass / light / inverse` — `inverse` reads as "the opposite treatment of the parent it's nested in"
- `glass / light / dark` — literal, but reintroduces the color word I argued away from earlier

Honestly, `solid` is fine. It's understandable. This is a nitpick. Flagging only because a review pass should catch it.

**Suggested resolution.** Leave as-is. Revisit if a fourth variant forces a reconsideration.

**Severity:** cosmetic.

---

### 6. Accent color value is slightly different across components

- PillStat `accent` uses `#DFFF2F`
- Phase 1 tokens have `accent.primary` = `#DFFF2F`

Consistent. ✅ Just verifying — this audit item gets a tick rather than a flag.

Same check for identity palette:
- AvatarCircle uses `#2D7CF6 / #D94BF4 / #E8F21D / #D7D9DF / #FF9A18 / #38D3D3`
- SegmentedBar uses same six values

Consistent. ✅

---

## Gaps in Phase 1's compound list (found during audit)

Phase 1 §5 lists 14 compounds. When I proposed the Phase 3 build order last message, I mentioned 10. Phase 1 has compounds I didn't name:

- **Top nav item group** (brand + nav + utilities) — the full horizontal arrangement
- **List/grid segmented toggle** — the small control visible in the left panel header
- **Invoice detail header** — the header row of the right panel specifically
- **Customer identity block** — the Silker avatar + name + address group
- **Mini line-items table** — the Onyx Vase / Rosewood Frame table

**Suggested resolution.** When we start compounds, use Phase 1's list as the authoritative source, not my condensed version. My list missed five compounds that are genuinely distinct patterns. Adding them to the updated build order below.

**Severity:** important for planning, not for correctness.

---

## Updated compound build order

Based on Phase 1's full list + reusability analysis (most-reused first):

### Tier 1 — most reusable, build first
1. **Split CTA** — `PillButton` + `CircularIconButton`
2. **Icon Toolbar** — horizontal row of `CircularIconButton`s
3. **Nav Tab Group** — `PillButton` in `light`/`ghost` states
4. **Panel Header** — title + left add-action + right action group, inside a `GlassPanel`
5. **Metadata Stack** — vertical stack of `KeyValueRow`s
6. **Totals Group** — three `PillStat`s with width ratios

### Tier 2 — composite patterns
7. **List/Grid Toggle** — segmented pill control (new mini-primitive or compound)
8. **Customer Identity Block** — `AvatarCircle` (with badge) + name + address + link
9. **KPI Metric** — `MetricBlock` (`lg`) aligned with a SegmentedBar slice above it
10. **Mini Line-Items Table** — the minimal table styling for invoice line items

### Tier 3 — page-level assemblies
11. **Top Nav** — brand + `Nav Tab Group` + utilities (`CircularIconButton` + `AvatarCircle`)
12. **Invoice Row** (default + selected variants) — the full row pattern
13. **Invoice Detail Header** — ID + actions + close, inside a `GlassPanel (raised)`
14. **KPI Strip** — 5 KPI Metrics + full SegmentedBar

### Tier 4 — full compositions (Phase 3)
- Full page shell
- Complete page header arrangement
- Left-right dashboard split
- Full invoice detail layout
- Entire dashboard assembly

---

## What to do before moving to compounds

**Must do:**
1. Decide whether to build the Data Display Decision Tree doc now or after the first few compounds reveal what disambiguation is actually needed in practice. *(My recommendation: build it now, small effort, high value.)*

**Defer to Phase 4:**
2. Add the four new tokens to Phase 1 token tables
3. Retrofit `asChild` onto PillButton and CircularIconButton

**Safe to leave alone:**
- `solid` variant naming
- Everything else

---

## Things that are right and worth preserving

Closing with what not to lose. Noted here because the discipline that got us here is the thing most likely to erode as complexity grows:

- **"What is intentionally not part of this primitive" sections** — the single most valuable pattern in the catalog. Every component has one, and every one of them prevented scope creep.
- **"Observed vs inferred" state splits** — keeps the catalog honest about what's from the reference vs what's our design extrapolation.
- **Fallbacks over speculation** — AvatarCircle's silent image→initial fallback, SegmentedBar's all-zero empty state, KeyValueRow's visible overflow. These are all examples of "the primitive handles the failure mode correctly" rather than punting to consumers.
- **One-accent-per-page rule** as a documented discipline — not enforceable in code, but stating it in the docs gives AI assistants a rule to respect.
- **Width as a composition concern, not a primitive concern** (PillStat, GlassPanel) — the distinction between "what the primitive owns" and "what the layout owns" is clean across the catalog.

Keep these as template patterns for compounds. Every compound doc should also have "intentionally not part," "observed vs inferred," and clear boundaries between what it owns and what the page owns.

---

**Status:** audit complete — no structural problems found. Proposed fixes are additive, not corrective.
