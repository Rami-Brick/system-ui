# Metric Block

**Tier:** Primitive (foundational)  
**Path:** `/catalog/primitives/metric-block.md`  
**Occurrences on reference screen:** KPI strip metrics only (primary observed use)

**Appears in:** KPI strip — stacked value/label pairs such as `$0,00` / `0 estimates`, `$600,00` / `2 overdue invoices`.

---

## 1. Purpose

The **stacked stat primitive** of the system.

Metric Block is used when the interface needs to present a **headline data point** with a quieter descriptive label directly beneath it. It is the pattern used in the KPI strip: value first, label second, both treated as one compact visual unit.

This primitive is intentionally narrow.

It is **not** the general answer for every value/label pair in the interface. In particular:
- KPI-style stacked stats belong here
- inline metadata such as `Invoice Date: 09/08/2018` should belong to a separate primitive like **`KeyValueRow`**
- summary totals may later become a dedicated pattern if their visual treatment diverges enough

If this component drifts toward:
- metadata row usage
- equal emphasis between value and label
- arbitrary typography combinations
- general-purpose content blocks

…it stops reading like a stat primitive and becomes too broad to stay useful.

---

## 2. Anatomy

```text
┌─────────────────────┐
│  $600,00            │
│  2 overdue invoices │
│     ↑         ↑     │
│   value     label   │
└─────────────────────┘
```

### Parts
1. **Container** — semantic wrapper (`<div>` by default)
2. **Value** — the primary data point; visually emphasized
3. **Label** — the descriptor; quieter and secondary

### Core rules
- Value is **always more prominent** than the label
- Label is **always muted**
- Value and label are treated as **one visual unit**
- This primitive is **for headline stats only**
- If the layout wants `label: value` on one line, use a different primitive

---

## 3. What is intentionally not part of this primitive

These are related patterns, but they do not belong here:

- **Inline metadata rows** — use a future `KeyValueRow` primitive
- **Segmented KPI bar** — belongs to `SegmentedBar` or `KPIStrip`
- **Delta / trend indicators** (`+12%`, `↓ 3.4%`) — future `MetricDelta` if needed
- **Currency / date / number formatting** — caller responsibility
- **Tooltips / info icons** — composition-level concern
- **Interactive content** — buttons, links, and controls do not belong inside the stat pair by default

This primitive should stay visually simple and semantically tight.

---

## 4. Sizes

| Size | Value | Label | Typical uses |
|---|---|---|---|
| `sm` | 18px / 600 | 11px / 400 | Dense secondary stats |
| `md` | 22px / 600 | 12px / 400 | Default stat treatment |
| `lg` | 32px / 600 | 13px / 400 | KPI strip / headline stat |

**Default size:** `md`

### Sizing rules
- Size scales **both** value and label together
- Label always stays at least one full hierarchy step below the value
- `lg` should be used sparingly for true headline metrics
- Do not invent additional size tiers outside `sm` / `md` / `lg`

### Token mapping
These values are the current concrete resolution of the Phase 1 token intent:
- `sm` value ≈ small emphasized data
- `md` value ≈ secondary stat emphasis
- `lg` value ≈ KPI / hero stat emphasis

The exact Tailwind classes below are the implementation-level expression of that scale.

---

## 5. Alignment

Alignment is controlled by the `align` prop: `left` (default) | `right`

- KPI strip typically uses `left`
- summary areas may use `right`
- `center` is intentionally unsupported to keep data presentation disciplined

### Alignment rule
Changing alignment should never change the internal hierarchy. It only changes how the block anchors within its parent region.

---

## 6. States

Metric Block is a **static display primitive**.

### Observed vs inferred
- **Observed in screenshot:** stacked KPI-style value/label pairs
- **Not applicable:** hover, pressed, focus-visible, disabled

### Accessibility requirements
- Keep value and label in the same container so they are announced together naturally
- Labels should remain readable text, not icon-only hints
- Muted label contrast should be checked against the actual panel surface, not only the page background

---

## 7. Rich value formatting

The primitive treats value and label as one unit, but that does **not** mean the value must be visually flat.

Allowed:
- partially dimmed decimals
- unit suffixes
- currency punctuation
- small inline markup inside the value

Not allowed:
- overriding the base hierarchy so the label becomes louder than the value
- turning the block into a mini layout system
- embedding controls or unrelated interactive content

So the rule is:

> Consumers should not restyle the base hierarchy, but richer formatting **inside the value node** is allowed when it preserves the overall stat treatment.

---

## 8. Token dependencies

| Token | Usage |
|---|---|
| `text.primary` | Value color |
| `text.tertiary` | Label color |
| `font.body-md` / `heading-md` / `display-lg` | Value scale intent |
| `font.micro` / `body-sm` | Label scale intent |

---

## 9. Do / don’t

### Do
- use this for stacked KPI/stat presentation
- keep value and label visually paired
- use `lg` for true headline metrics
- pass pre-formatted values
- keep labels short and descriptive

### Don’t
- don’t use this for inline metadata rows
- don’t use it for titles, paragraphs, or CTAs
- don’t invent extra size tiers
- don’t brighten the label beyond the value
- don’t place interactive elements inside the block by default

---

## 10. Code

```tsx
// components/primitives/MetricBlock.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const metricBlock = cva("flex flex-col gap-1", {
  variants: {
    align: {
      left: "items-start text-left",
      right: "items-end text-right",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

const metricValue = cva("text-white font-semibold tracking-tight leading-none", {
  variants: {
    size: {
      sm: "text-[18px]",
      md: "text-[22px]",
      lg: "text-[32px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const metricLabel = cva("text-white/[0.46] font-normal leading-snug", {
  variants: {
    size: {
      sm: "text-[11px]",
      md: "text-xs",
      lg: "text-[13px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface MetricBlockProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof metricBlock> {
  /** Headline value. Accepts formatted ReactNode content. */
  value: ReactNode;
  /** Quiet descriptor for the value. */
  label: ReactNode;
  /** Size tier controlling both value and label. */
  size?: "sm" | "md" | "lg";
}

export const MetricBlock = forwardRef<HTMLDivElement, MetricBlockProps>(
  ({ value, label, align, size = "md", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(metricBlock({ align }), className)}
        {...props}
      >
        <span className={metricValue({ size })}>{value}</span>
        <span className={metricLabel({ size })}>{label}</span>
      </div>
    );
  },
);

MetricBlock.displayName = "MetricBlock";
```

### Notes on the code
- The primitive now models **only** the stacked stat pattern
- `value` and `label` remain explicit props so the pair stays structurally bound
- Raw Tailwind sizes are the concrete implementation of the earlier token hierarchy
- `tracking-tight` preserves the “numbers should feel slightly tighter” rule from Phase 1
- `leading-snug` on the label helps longer KPI labels remain readable without becoming visually loud

---

## 11. Usage examples

### KPI strip metric

```tsx
<MetricBlock
  value="$600,00"
  label="2 overdue invoices"
  size="lg"
/>
```

### Secondary stat

```tsx
<MetricBlock
  value="$80.00"
  label="Balance Due"
  size="md"
  align="right"
/>
```

### Dense small stat

```tsx
<MetricBlock
  value="24"
  label="Open estimates"
  size="sm"
/>
```

### Richly formatted value

```tsx
<MetricBlock
  size="lg"
  value={
    <span>
      $600<span className="text-white/60 text-[20px]">,00</span>
    </span>
  }
  label="2 overdue invoices"
/>
```

---

## 12. Related components

- **KeyValueRow** *(future primitive)* — inline metadata pattern such as `Invoice Date: 09/08/2018`
- **SegmentedBar** *(future primitive)* — colored group-level bar shown beneath KPI metrics
- **KPIStrip** *(future compound)* — horizontal arrangement of Metric Blocks plus SegmentedBar
- **GlassPanel** — common surface containing one or more Metric Blocks

---

## 13. Open questions / implementation notes

- **KeyValueRow split:** the inline metadata pattern should be documented separately rather than folded back into this primitive
- **Formatting helpers:** if repeated currency/date formatting patterns emerge, extract shared utilities rather than adding formatting logic here
- **Label wrapping:** currently allowed if needed, but should stay visually quiet and rare in practice
- **Summary stat divergence:** if later summary totals behave differently enough from KPI metrics, split them into a more specific primitive

---

**Status:** draft — awaiting validation
