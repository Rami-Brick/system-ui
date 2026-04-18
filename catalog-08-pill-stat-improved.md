# Pill Stat

**Tier:** Primitive (foundational)  
**Path:** `/catalog/primitives/pill-stat.md`  
**Occurrences on reference screen:** 3

**Appears in:** invoice detail totals row — `Sub Total $80.00` (light), `Total $80.00` (muted), `Balance Due $80.00` (accent / widest / emphasized).

---

## 1. Purpose

The **display-pill primitive**. Used when a label/value pair needs the visual weight of a pill container — typically at the end of a section to summarize or emphasize a value.

This primitive exists because the other data primitives do not fit this role:

- **MetricBlock** is containerless
- **KeyValueRow** is intentionally quiet metadata with no container
- **PillButton** is interactive and action-oriented

A labeled value inside a pill is a fourth distinct pattern. Forcing it into `PillButton` would make a display look interactive; forcing it into `MetricBlock` would make a stat primitive responsible for surfaces. Both would blur primitive boundaries.

This is also the home for the system’s one-per-page **accent emphasis moment**. The lime `Balance Due` on the reference screen is the single loudest element on the detail panel, and that treatment belongs here.

If Pill Stat drifts toward:
- interactivity
- body-copy or heading use
- multiple accent instances per page
- stacked label/value layouts
- becoming a generic “summary chip” with embedded UI

…it starts duplicating other primitives and weakens the system’s emphasis hierarchy.

---

## 2. Anatomy

```text
┌─────────────────────────────────────────────┐
│   Balance Due              $80.00           │
│      ↑                         ↑            │
│    label                     value          │
└─────────────────────────────────────────────┘
    ↑ pill silhouette (always fully rounded)
    ↑ width is layout-controlled
```

### Parts
1. **Container** — pill-shaped display surface
2. **Label** — short descriptor on the left
3. **Value** — the data point on the right

### Core rules
- Shape is **always a pill**
- Label stays on the **left** and value on the **right** in LTR layouts
- Both stay on **one line**
- **Height and typography stay fixed; width is layout-controlled**
- This is a **display primitive**, never an action
- Variant controls emphasis; width does not imply a different size tier

---

## 3. Variants

Three variants map directly to the tones visible in the invoice detail totals row.

### `light` — quiet display

**Used for:** low-emphasis totals, subtotals, informational summaries.  
**Reference:** `Sub Total $80.00`

- Background: `rgba(255,255,255,0.95)` → `surface.control-inverse`
- Label: muted near-black
- Value: dark near-black
- Visual role: clean and readable without pulling focus

This is the default variant.

---

### `muted` — intermediate display

**Used for:** middle-step totals or grouped values.  
**Reference:** `Total $80.00`

- Background: `#C7C9CE`
- Label: muted near-black
- Value: dark near-black
- Visual role: visually heavier than `light`, but quieter than `accent`

**Note:** this is the most screenshot-derived of the three variants and should be validated during full-screen assembly.

---

### `accent` — highest-emphasis display

**Used for:** the single most important value on a page.  
**Reference:** `Balance Due $80.00`

- Background: `#DFFF2F` → `accent.primary`
- Label: darker than the lighter variants’ labels for readability on lime
- Value: dark near-black, boldest weight in the set
- Visual role: the page’s loudest display moment

### One-per-page rule
`accent` should appear **at most once per page**. If two values are competing for accent, one of them is overstating its importance.

---

## 4. What is intentionally not part of this primitive

- **Interactivity** — not clickable, not focusable, not a button
- **Icons or trend indicators by default** — not observed in the reference, and not added preemptively
- **Size variants** — one size only until a real second size appears
- **Stacked label-above-value layouts** — use `MetricBlock`
- **Multi-value pills** — different primitive or compound
- **Custom backgrounds beyond the three variants** — weakens semantic clarity
- **Per-instance hierarchy overrides** — label/value treatment is part of the primitive identity

### Allowed richness inside `value`
Allowed:
- formatted numeric text
- dimmed decimals
- unit suffixes
- short status wording

Not yet blessed:
- icons
- trend arrows
- embedded controls
- mini layouts inside the pill

If those become real needs, validate them as a separate pattern instead of stretching this primitive.

---

## 5. Data model

```ts
interface PillStatProps {
  label: ReactNode;
  value: ReactNode;
  variant?: "light" | "muted" | "accent";
}
```

Both `label` and `value` accept `ReactNode`, but this should still behave like a simple display pair, not a flexible layout container.

### Content rules
- Labels should usually stay **short**, ideally **1–3 words** in the common case
- Values should stay concise enough to remain comfortably single-line
- This primitive is optimized primarily for **numeric / amount values**, though short non-numeric values can still work

---

## 6. Size model

Pill Stat has **one size**.

### Fixed by the primitive
- Height: `48px`
- Horizontal padding: `20px`
- Vertical alignment: centered
- Shape: full pill
- Typography: fixed per role/variant

### Controlled by layout
- Width
- Relative width compared with sibling Pill Stats
- Placement in flex/grid containers

This separation is deliberate: on the reference screen, the three pills have different widths but the same height. Width is a layout decision; the primitive only owns the display treatment.

---

## 7. States

Pill Stat is **static**.

### Observed vs inferred
- **Observed in screenshot:** three variants, one height, width differences controlled by layout
- **Not applicable:** hover, pressed, focus-visible, disabled

### Accessibility requirements
- Label and value are announced together through shared container structure
- `accent` must always use dark text on lime
- No special ARIA is required in the default case

### Non-interactive rule
This primitive is intentionally non-interactive. Even though the current prop surface may technically allow generic DOM event props, the design rule is: **do not attach click or hover-action behavior to Pill Stat**.

---

## 8. Typography

| Part | Size | Weight | Color |
|---|---|---|---|
| Label | 13px | 500 | muted near-black (`light` / `muted`) · darker muted near-black (`accent`) |
| Value | 14px | 600 (`light` / `muted`) · 700 (`accent`) | dark near-black |

### Typography rules
- Label is slightly smaller and quieter
- Value is slightly larger and bolder
- `accent` increases value weight to reinforce emphasis
- `tracking-tight` is used primarily because the pattern is optimized for numeric/amount values
- Width changes should never change typography

---

## 9. Token dependencies

| Token | Usage |
|---|---|
| `surface.control-inverse` | Background of `light` |
| `accent.primary` | Background of `accent` |
| `text.inverse` | Value color across all variants |
| `radius.pill` | Shape |
| `size.pill-lg` | Height (48px) |

### Token addition
The `muted` background and dark-on-light muted label tones are not fully formalized in the current token set. During extraction, add:

- `surface.control-muted`
- `text.inverse-muted`

For now, they remain inlined because they are still slightly screenshot-derived.

---

## 10. Do / don’t

### Do
- use for end-of-section totals and summary values
- use `light` as the default
- use `accent` only when the value is truly the most important on the page
- let layout control width
- pass pre-formatted values
- keep labels short

### Don’t
- don’t use this for actions
- don’t use `accent` more than once per page
- don’t manually override the base label/value typography
- don’t attach interactive behavior
- don’t turn it into a catch-all summary chip with icons and extra UI
- don’t invent extra variants casually

---

## 11. Code

```tsx
// components/primitives/PillStat.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const pillStat = cva(
  "inline-flex h-12 items-center justify-between gap-4 rounded-full px-5",
  {
    variants: {
      variant: {
        light: "bg-white/95",
        muted: "bg-[#C7C9CE]",
        accent: "bg-[#DFFF2F]",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  },
);

const label = cva("text-[13px] font-medium", {
  variants: {
    variant: {
      light: "text-black/55",
      muted: "text-black/55",
      accent: "text-black/70",
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

const value = cva("text-[14px] text-black tracking-tight", {
  variants: {
    variant: {
      light: "font-semibold",
      muted: "font-semibold",
      accent: "font-bold",
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

export interface PillStatProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof pillStat> {
  /** Short descriptor. */
  label: ReactNode;
  /** Presented value. Optimized primarily for numeric/amount content. */
  value: ReactNode;
}

export const PillStat = forwardRef<HTMLDivElement, PillStatProps>(
  ({ label: labelNode, value: valueNode, variant, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pillStat({ variant }), className)}
        {...props}
      >
        <span className={label({ variant })}>{labelNode}</span>
        <span className={value({ variant })}>{valueNode}</span>
      </div>
    );
  },
);

PillStat.displayName = "PillStat";
```

### Notes on the code
- Height, padding, and shape are fixed
- Width remains consumer-controlled
- Variant affects surface color and value weight, not size
- `tracking-tight` is primarily tuned for numeric values
- The component remains intentionally simple and non-interactive

---

## 12. Usage examples

### Totals row (reference screen)

```tsx
<div className="flex items-center gap-2">
  <PillStat variant="light" label="Sub Total" value="$80.00" className="flex-1" />
  <PillStat variant="muted" label="Total" value="$80.00" className="flex-1" />
  <PillStat variant="accent" label="Balance Due" value="$80.00" className="flex-[1.5]" />
</div>
```

### Single emphasis pill

```tsx
<PillStat
  variant="accent"
  label="Amount Due"
  value="$1,240.00"
  className="w-full max-w-xs"
/>
```

### Value with dimmed decimals

```tsx
<PillStat
  variant="light"
  label="Sub Total"
  value={
    <span>
      $80<span className="text-black/50">.00</span>
    </span>
  }
/>
```

### Grid-based totals layout

```tsx
<div className="grid grid-cols-[1fr_1fr_1.5fr] gap-2">
  <PillStat variant="light" label="Sub Total" value="$80.00" />
  <PillStat variant="muted" label="Total" value="$80.00" />
  <PillStat variant="accent" label="Balance Due" value="$80.00" />
</div>
```

---

## 13. Related components

- **PillButton** — shares the silhouette, but is always interactive
- **MetricBlock** — containerless stacked counterpart for headline stats
- **KeyValueRow** — quieter inline counterpart for metadata
- **TotalsGroup** *(future compound)* — composes multiple Pill Stats and owns width ratios

---

## 14. Open questions / implementation notes

- **Token extraction:** promote `surface.control-muted` and `text.inverse-muted` during extraction
- **Width-ratio convention:** the reference uses roughly `1 : 1 : 1.5`; keep this at compound level, not primitive level
- **Accent scarcity enforcement:** design discipline only for now
- **Dark-surface variant:** add only if a real need appears
- **Non-numeric values:** supported, but the primitive is still visually tuned around amount-style content

---

**Status:** draft — awaiting validation
