# Design Kit

A dark, glass-heavy React + Tailwind UI kit extracted from a dashboard reference. The system is built around pills, circles, frosted panels, atmospheric depth, and one scarce lime accent moment.

## Contents

| Layer | Files | Notes |
|---|---:|---|
| Primitives | 8 | Foundational controls, identity, surfaces, and data display |
| Compounds | 14 | Reusable dashboard patterns composed from primitives |
| Tokens | 2 | `tokens/index.ts` and `tokens/tailwind-preset.ts` |
| Catalog | 22 | One component doc per primitive/compound, plus the primitive decision tree |
| Example | 1 | `examples/dashboard.tsx` |

## Install

```bash
npm install class-variance-authority @radix-ui/react-slot lucide-react clsx tailwind-merge
npm install tailwindcss
npm install @fontsource-variable/plus-jakarta-sans
```

## Tailwind

```ts
// tailwind.config.ts
import kitPreset from "./design-kit/tokens/tailwind-preset";

export default {
  presets: [kitPreset],
  content: ["./src/**/*.{ts,tsx}", "./design-kit/**/*.{ts,tsx}"],
};
```

Load Plus Jakarta Sans in your app entry:

```ts
import "@fontsource-variable/plus-jakarta-sans";
```

If you use CSS variables, import or paste `cssVars` from `tokens/index.ts` into your global stylesheet generation.

## Components

Primitives:

`CircularIconButton`, `PillButton`, `AvatarCircle`, `GlassPanel`, `MetricBlock`, `SegmentedBar`, `KeyValueRow`, `PillStat`

Compounds:

`PrimaryCTA`, `IconToolbar`, `PanelHeader`, `NavTabGroup`, `MetadataStack`, `TotalsGroup`, `SegmentedToggle`, `CustomerIdentityBlock`, `KPIMetric`, `KPIStrip`, `MiniLineItemsTable`, `InvoiceRow`, `InvoiceDetailHeader`, `TopNav`

## Usage Guidance

- Icon-only action: `CircularIconButton`
- Text action: `PillButton`
- Single highest-emphasis page action: `PrimaryCTA`
- Person or entity identity: `AvatarCircle`
- Major translucent surface: `GlassPanel`
- Headline stacked stat: `MetricBlock`
- Inline metadata: `KeyValueRow`
- Summary value in a pill: `PillStat`
- Proportional composition: `SegmentedBar`

The full primitive decision tree lives in `catalog/primitives/_decision-tree.md`.

## Design Rules

1. Interactive controls are pills or circles.
2. Glass panels stay translucent; do not replace them with solid cards.
3. Lime `accent.primary` belongs to `PillStat variant="accent"` and should appear at most once per page.
4. Identity colors are separate from the lime accent and are used for avatars and segmented bars.
5. Display primitives are not interactive; wrap them in a compound if interaction is needed.
6. Typography hierarchy comes from size, weight, and opacity, not decorative treatments.

## Structure

```text
design-kit/
  tokens/
    index.ts
    tailwind-preset.ts
  utils/
    cn.ts
  primitives/
  compounds/
  examples/
    dashboard.tsx
  catalog/
    primitives/
    compounds/
  CLAUDE.md
  README.md
  index.ts
```

## Notes

`PrimaryCTA` is the approved name for the unified page action. Do not use legacy primary-action names in new docs or code.

`AvatarCircle` is the approved identity primitive. If an avatar needs to be clickable, wrap it in a button or create a future `AvatarButton` compound when that pattern repeats.
