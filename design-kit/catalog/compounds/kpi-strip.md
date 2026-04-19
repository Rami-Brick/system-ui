# KPI Strip

**Tier:** Compound  
**Path:** `/catalog/compounds/kpi-strip.md`  
**Occurrences on reference screen:** 1

**Appears in:** page-level KPI area — 5 headline metrics in a horizontal row, with one continuous `SegmentedBar` spanning the full width below all columns.

---

## 1. Purpose

The **KPI strip compound**. KPI Strip assembles a row of `KPIMetric` columns and places one shared `SegmentedBar` beneath them.

The important architectural rule is fixed:

> **The bar belongs to the strip, not to each metric.**

This means KPI Strip is:
- multiple equal-width `KPIMetric` columns
- one shared `SegmentedBar` below
- one vertical wrapper around both

It is the parent compound that turns individual metric columns into one coherent dashboard strip.

---

## 2. Composition

### Compounds and primitives used
- `KPIMetric` — one per column
- `SegmentedBar` — one shared bar below all columns

### How it is composed
Two rows inside a vertical flex wrapper:

1. **metrics row** — multiple `KPIMetric` instances
2. **bar row** — one `SegmentedBar` spanning the full strip width

### Parallel data structures
The strip accepts two parallel arrays:

- `metrics`
- `segments`

By convention:
- `metrics[i]` visually corresponds to `segments[i]`

But this is **conceptual alignment**, not pixel-perfect width alignment.

That distinction matters:
- metric columns are equal-width by default
- bar segments are proportional to values
- therefore visual correspondence is approximate, not exact

If exact shared-width alignment ever becomes a requirement, that is a different, more tightly coupled strip pattern.

---

## 3. Anatomy

```text
┌──────────────────────────────────────────────────┐
│  [KPIMetric]  [KPIMetric]  [KPIMetric]  ...      │
└──────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────┐
│  [         one shared SegmentedBar            ]  │
└──────────────────────────────────────────────────┘
```

### Core rules
- Metrics are equal-width by default
- Bar spans full width
- Gap between metric row and bar is fixed
- Typical count is **3 to 6 metrics**
- Metrics and segments should usually have the same count
- Zero-value metrics are valid

---

## 4. What is intentionally not part of this compound

- **Per-metric color ownership**
- **Pixel-perfect segment-to-column alignment**
- **Interactive drill-down behavior**
- **Legend rendering**
- **Responsive reflow strategy**
- **Animated value/bar transitions**

This compound should stay honest to the reference instead of pretending to solve a more advanced chart-layout problem.

---

## 5. States

Static. No compound-level states.

### Accessibility requirements
- Each `KPIMetric` announces its value + label pair
- `SegmentedBar` requires an `aria-label` describing the bar as a whole
- Color is supplementary; labels above provide the textual meaning

---

## 6. Token dependencies

| Token | Usage |
|---|---|
| `space.3` | Gap between metrics row and bar |
| `size.bar-md` | Default bar height via `SegmentedBar` |

---

## 7. Do / don’t

### Do
- pass metrics and segments in the same conceptual order
- let the strip own the shared bar
- keep columns equal-width unless a future variant explicitly changes that
- use for small KPI sets only

### Don’t
- don’t color individual metrics to match their segment
- don’t force exact metric-to-segment width alignment unless you redesign the architecture
- don’t overload it with too many metrics
- don’t treat the bar as five separate components

---

## 8. Code

```tsx
// design-kit/compounds/KPIStrip.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { KPIMetric } from "./KPIMetric";
import { SegmentedBar, type Segment } from "../primitives/SegmentedBar";

export interface KPIMetricData {
  id: string;
  value: ReactNode;
  label: ReactNode;
}

export interface KPIStripProps extends HTMLAttributes<HTMLDivElement> {
  metrics: KPIMetricData[];
  segments: Segment[];
  /** Required. Describes the bar's overall composition. */
  barAriaLabel: string;
}

export const KPIStrip = forwardRef<HTMLDivElement, KPIStripProps>(
  ({ metrics, segments, barAriaLabel, className, ...props }, ref) => {
    const nodeEnv = (globalThis as { process?: { env?: { NODE_ENV?: string } } })
      .process?.env?.NODE_ENV;

    if (nodeEnv !== "production" && metrics.length !== segments.length) {
      console.warn(
        "[KPIStrip] metrics and segments counts differ. The strip will still render, but correspondence becomes unclear.",
      );
    }

    return (
      <div
        ref={ref}
        className={cn("flex w-full flex-col gap-3", className)}
        {...props}
      >
        <div className="flex w-full">
          {metrics.map((metric) => (
            <KPIMetric
              key={metric.id}
              value={metric.value}
              label={metric.label}
            />
          ))}
        </div>

        <SegmentedBar
          segments={segments}
          aria-label={barAriaLabel}
        />
      </div>
    );
  },
);

KPIStrip.displayName = "KPIStrip";
```

### Notes on the code
- Metrics use equal-width columns via `KPIMetric`
- The shared bar is a sibling row, not a child of any one metric
- A development-time warning helps catch metric/segment count mismatches early
- `value` and `label` are `ReactNode` for flexibility, matching the broader catalog style

---

## 9. Usage examples

### Reference-style KPI strip

```tsx
<KPIStrip
  barAriaLabel="Customer financial composition across 5 categories"
  metrics={[
    { id: "m1", value: "$0,00", label: "0 estimates" },
    { id: "m2", value: "$0,00", label: "Unbilled income" },
    { id: "m3", value: "$600,00", label: "2 overdue invoices" },
    { id: "m4", value: "$600,00", label: "2 overdue invoices" },
    { id: "m5", value: "$0,00", label: "Unbilled income" },
  ]}
  segments={[
    { value: 120, color: "blue", label: "Estimates" },
    { value: 80, color: "magenta", label: "Unbilled income" },
    { value: 600, color: "chartreuse", label: "Overdue invoices" },
    { value: 420, color: "silver", label: "Open balances" },
    { value: 60, color: "orange", label: "Other" },
  ]}
/>
```

### Simpler 3-metric strip

```tsx
<KPIStrip
  barAriaLabel="Revenue breakdown"
  metrics={[
    { id: "m1", value: "$12,400", label: "Direct sales" },
    { id: "m2", value: "$8,200", label: "Partner revenue" },
    { id: "m3", value: "$3,100", label: "Referrals" },
  ]}
  segments={[
    { value: 12400, color: "blue", label: "Direct" },
    { value: 8200, color: "magenta", label: "Partner" },
    { value: 3100, color: "orange", label: "Referrals" },
  ]}
/>
```

---

## 10. Related components

- **KPIMetric** — column unit
- **SegmentedBar** — shared bar beneath all columns
- **MetricBlock** — underlying primitive inside each `KPIMetric`
- **GlassPanel / page shell** — common hosting contexts

---

## 11. Open questions / implementation notes

- **Exact alignment variant:** only add if a real use case requires metrics and segments to share one width system
- **Count mismatch handling:** warning is enough for v1
- **Reference fidelity:** keep remembering that the bar is supplementary, not the primary semantic carrier of the KPI labels

---

**Status:** final packaged







