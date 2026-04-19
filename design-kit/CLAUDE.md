# CLAUDE.md - Design Kit Briefing

Use this file as the working brief when generating UI with this kit.

## What This Kit Is

This is a dark, glass-heavy React + Tailwind dashboard kit with:

- 8 primitives
- 14 compounds
- shared tokens
- a Tailwind preset
- catalog docs for every component
- one full dashboard example

The visual language is narrow on purpose: translucent glass panels, circular icon actions, pill-shaped text actions, quiet typography, and one scarce lime accent.

## Non-Negotiable Rules

1. **Pills and circles dominate.** Use `CircularIconButton` for icon-only actions and `PillButton` for labeled actions.
2. **Accent is scarce.** Lime `#DFFF2F` belongs to `PillStat variant="accent"` and should appear at most once per page.
3. **Surfaces are glass.** Use `GlassPanel` for major surfaces. Do not replace it with generic solid cards.
4. **Identity colors are not accent.** Avatar and segmented-bar colors come from the identity palette.
5. **Display primitives are static.** `AvatarCircle`, `MetricBlock`, `KeyValueRow`, `PillStat`, `SegmentedBar`, and `GlassPanel` do not own interactivity.
6. **Primary action is `PrimaryCTA`.** It is a unified button and does not use lime.

## Component Selection

Interactive:

- Icon only: `CircularIconButton`
- Has text: `PillButton`
- Single most important page action: `PrimaryCTA`

Display:

- Identity: `AvatarCircle`
- Surface: `GlassPanel`
- Headline stat: `MetricBlock`
- Metadata pair: `KeyValueRow`
- Summary pill: `PillStat`
- Proportional breakdown: `SegmentedBar`

Compounds:

- Grouped icon actions: `IconToolbar`
- Panel top bar: `PanelHeader`
- Page navigation tabs: `NavTabGroup`
- Metadata group: `MetadataStack`
- Totals row: `TotalsGroup`
- Icon radio-style selection: `SegmentedToggle`
- Customer identity block: `CustomerIdentityBlock`
- KPI column: `KPIMetric`
- KPI row plus bar: `KPIStrip`
- Detail line items: `MiniLineItemsTable`
- Invoice list row: `InvoiceRow`
- Invoice detail header: `InvoiceDetailHeader`
- Application nav: `TopNav`

Use `catalog/primitives/_decision-tree.md` when primitive choice is ambiguous.

## Token System

Tokens live in `tokens/index.ts`. The Tailwind preset in `tokens/tailwind-preset.ts` exposes color, radius, spacing, size, font-size, blur, shadow, and helper size utilities.

Key values:

- App background: `#0A0B0A`
- Base glass: `rgba(255,255,255,0.04)`
- Raised glass: `rgba(255,255,255,0.07)`
- Selected sub-surface: `rgba(255,255,255,0.18)`
- Primary text: `#FFFFFF`
- Secondary text: `rgba(255,255,255,0.72)`
- Tertiary text: `rgba(255,255,255,0.46)`
- Accent: `#DFFF2F`
- Panel radius: `28px`
- Pill radius: `9999px`

Typography tokens currently include `displayLg`, `headingMd`, `panelTitle`, `statXl`, `statLg`, `bodyMd`, `bodySm`, and `micro`. Do not reference typography tokens outside that list.

## File Structure

```text
design-kit/
  tokens/
    index.ts
    tailwind-preset.ts
  utils/
    cn.ts
  primitives/
    AvatarCircle.tsx
    CircularIconButton.tsx
    GlassPanel.tsx
    KeyValueRow.tsx
    MetricBlock.tsx
    PillButton.tsx
    PillStat.tsx
    SegmentedBar.tsx
  compounds/
    CustomerIdentityBlock.tsx
    IconToolbar.tsx
    InvoiceDetailHeader.tsx
    InvoiceRow.tsx
    KPIMetric.tsx
    KPIStrip.tsx
    MetadataStack.tsx
    MiniLineItemsTable.tsx
    NavTabGroup.tsx
    PanelHeader.tsx
    PrimaryCTA.tsx
    SegmentedToggle.tsx
    TopNav.tsx
    TotalsGroup.tsx
  examples/
    dashboard.tsx
  catalog/
    primitives/
    compounds/
```

## Implementation Rules

- Read the relevant catalog doc before using or modifying a component.
- Use the exported component APIs as documented; do not rely on old names.
- Keep new components rare and justified by real repeated patterns.
- Use `forwardRef` for new components.
- Use CVA for variant-driven primitives.
- Require `aria-label` for icon-only buttons.
- Keep `PrimaryCTA` singular on a page.
- Keep `PillStat variant="accent"` singular on a page.
- Do not add hover or click behavior to display primitives.
- Do not add lime variants to action buttons.
