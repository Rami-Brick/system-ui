# Totals Group

**Tier:** Compound  
**Path:** `/catalog/compounds/totals-group.md`  
**Occurrences on reference screen:** 1

**Appears in:** invoice detail bottom — `Sub Total $80.00` (light), `Total $80.00` (muted), `Balance Due $80.00` (accent), arranged in a horizontal row with the accent pill widest.

---

## 1. Purpose

The **summary totals compound**. Totals Group arranges a small set of `PillStat` instances into a horizontal summary row with controlled emphasis and controlled width ratios.

Its value is in owning:

1. **variant sequence**
2. **width ratio**
3. **maximum count**
4. **end-of-section summary behavior**

This is a deliberately **reference-faithful** compound. It is not meant to become the universal answer for every row of summary pills.

---

## 2. Composition

### Primitive used
- `PillStat` — one per total

### How it’s composed
The compound maps a `totals` array of 1 to 3 items into `PillStat` instances inside a horizontal row.

The compound owns:
- which variant each position gets
- which pill is widest
- maximum supported item count
- group gap

The primitive still owns:
- pill styling
- pill typography
- pill height

---

## 3. Anatomy

```text
┌─────────────────────────────────────────────────────────────────────────┐
│  Sub Total $80.00    │    Total $80.00    │    Balance Due    $80.00   │
│   (light, flex-1)        (muted, flex-1)       (accent, flex-[1.5])    │
└─────────────────────────────────────────────────────────────────────────┘
```

### Core rules
- Supports **1 to 3 pills only**
- The **last item is always the most emphasized**
- In the 3-pill reference pattern, the last item is `accent` and widest
- Gap is fixed to `gap-2`
- This pattern is for **end-of-section totals**, not general-purpose pill layouts

---

## 4. What is intentionally not part of this compound

- **4+ totals**
- **Arbitrary variant assignment**
- **Arbitrary width ratio changes**
- **Headings or surrounding section structure**
- **Currency/number formatting**
- **General KPI or filter layouts**

### Reference-faithful rule
If the emphasis ordering, item count, or visual logic changes materially, that is a sign you may need a different compound rather than stretching this one.

---

## 5. Variant and width mapping

| Position | Count=1 | Count=2 | Count=3 | Width |
|---|---|---|---|---|
| First | `accent` | `light` | `light` | `flex-1` |
| Second | — | `accent` | `muted` | `flex-1` |
| Third | — | — | `accent` | `flex-[1.5]` |

### Interpretation
- `1` item → single accent summary
- `2` items → quieter lead + emphasized final
- `3` items → full reference pattern: `light → muted → accent`

The last item is always the strongest one.

---

## 6. States

Static. No compound-level states.

### Accessibility note
No extra ARIA is required beyond what each `PillStat` already provides.

---

## 7. Token dependencies

| Value | Tailwind | Token |
|---|---|---|
| Pill gap | `gap-2` | `space.2` (8px) |
| Standard width | `flex-1` | — |
| Emphasis width | `flex-[1.5]` | — |

---

## 8. Code

```tsx
// design-kit/compounds/TotalsGroup.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { PillStat } from "../primitives/PillStat";

type PillStatVariant = "light" | "muted" | "accent";

const VARIANT_MAP: Record<number, PillStatVariant[]> = {
  1: ["accent"],
  2: ["light", "accent"],
  3: ["light", "muted", "accent"],
};

export interface TotalItem {
  id: string;
  label: ReactNode;
  value: ReactNode;
}

export interface TotalsGroupProps extends HTMLAttributes<HTMLDivElement> {
  totals: [TotalItem] | [TotalItem, TotalItem] | [TotalItem, TotalItem, TotalItem];
}

export const TotalsGroup = forwardRef<HTMLDivElement, TotalsGroupProps>(
  ({ totals, className, ...props }, ref) => {
    const variants = VARIANT_MAP[totals.length] ?? VARIANT_MAP[3];

    return (
      <div
        ref={ref}
        className={cn("flex w-full items-stretch gap-2", className)}
        {...props}
      >
        {totals.map((item, index) => {
          const variant = variants[index];
          const isEmphasis = index === totals.length - 1;

          return (
            <PillStat
              key={item.id}
              variant={variant}
              label={item.label}
              value={item.value}
              className={isEmphasis ? "flex-[1.5]" : "flex-1"}
            />
          );
        })}
      </div>
    );
  },
);

TotalsGroup.displayName = "TotalsGroup";
```

### Notes on the code
- Tuple typing enforces 1–3 totals at the call site
- The compound owns variant sequence completely
- The final item is the emphasis item and receives the wider flex ratio
- This is intentionally more opinionated than compounds like `MetadataStack`

---

## 9. Usage examples

### Invoice detail totals

```tsx
<TotalsGroup
  totals={[
    { id: "subtotal", label: "Sub Total", value: "$80.00" },
    { id: "total", label: "Total", value: "$80.00" },
    { id: "balance", label: "Balance Due", value: "$80.00" },
  ]}
/>
```

### Two-pill summary

```tsx
<TotalsGroup
  totals={[
    { id: "total", label: "Total", value: "$240.00" },
    { id: "balance", label: "Balance Due", value: "$120.00" },
  ]}
/>
```

### Single summary value

```tsx
<TotalsGroup
  totals={[
    { id: "balance", label: "Amount Due", value: "$1,240.00" },
  ]}
/>
```

---

## 10. Related components

- **PillStat** — only primitive used here
- **GlassPanel** — common surface context
- **MetadataStack** — common sibling summary/details pattern above it

---

## 11. Open questions / implementation notes

- **Custom width ratio:** intentionally not supported; if needed, reconsider the pattern rather than stretching this one
- **4+ totals:** likely a signal that this is the wrong summary pattern
- **Reference fidelity vs reuse:** keep checking that this stays a reusable end-of-section summary pattern rather than a frozen one-screen layout

---

**Status:** final packaged







