# KPI Metric

**Tier:** Compound  
**Path:** `/catalog/compounds/kpi-metric.md`  
**Occurrences on reference screen:** 5

**Appears in:** KPI strip — each column in the top stats row.

---

## 1. Purpose

The **single KPI column compound**. KPI Metric locks `MetricBlock` into the exact configuration used by the KPI strip.

Its purpose is intentionally small:
- one metric per column
- always stacked
- always `size="lg"`
- always left-aligned
- width owned by the parent strip

This compound exists mostly for semantic clarity and for preventing repeated loose `MetricBlock` configuration in the KPI strip.

---

## 2. Composition

### Primitive used
- `MetricBlock`

### How it is composed
KPI Metric is a thin wrapper around `MetricBlock` with fixed configuration:

- `size="lg"`
- `align="left"`

It sits inside a flex column wrapper so the parent `KPIStrip` can control column width independently.

### Important architectural rule
The **SegmentedBar belongs to the strip, not to the metric**.

A KPI Metric does **not** own a bar segment. It sits above a bar that spans the full strip width. This distinction should remain fixed.

---

## 3. Anatomy

```text
┌────────────────────────────┐
│  $600,00                   │
│  2 overdue invoices        │
└────────────────────────────┘
      one metric column
```

### Core rules
- Always uses `MetricBlock size="lg"`
- Always left-aligned
- Default wrapper width is `flex-1`
- No color prop
- No bar ownership
- No interactivity

---

## 4. What is intentionally not part of this compound

- **Segmented bar rendering**
- **Column-width strategy**
- **Trend/delta indicators**
- **Click/drill-down behavior**
- **Number formatting**

If those change, they belong to `KPIStrip` or to a future adjacent primitive, not here.

---

## 5. States

Static. No compound-level states.

---

## 6. Token dependencies

Inherited from `MetricBlock`. No new tokens.

---

## 7. Code

```tsx
// design-kit/compounds/KPIMetric.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { MetricBlock } from "../primitives/MetricBlock";

export interface KPIMetricProps extends HTMLAttributes<HTMLDivElement> {
  value: ReactNode;
  label: ReactNode;
}

export const KPIMetric = forwardRef<HTMLDivElement, KPIMetricProps>(
  ({ value, label, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-1 flex-col", className)}
        {...props}
      >
        <MetricBlock
          value={value}
          label={label}
          size="lg"
          align="left"
        />
      </div>
    );
  },
);

KPIMetric.displayName = "KPIMetric";
```

### Notes on the code
- This is intentionally a thin wrapper
- The wrapper exists so parent compounds can control width without mutating `MetricBlock`
- Its main value is semantic clarity and locked configuration

---

## 8. Usage examples

### Single KPI metric

```tsx
<KPIMetric value="$600,00" label="2 overdue invoices" />
```

### Preview inside a KPI row

```tsx
<div className="flex w-full gap-4">
  <KPIMetric value="$0,00" label="0 estimates" />
  <KPIMetric value="$0,00" label="Unbilled income" />
  <KPIMetric value="$600,00" label="2 overdue invoices" />
  <KPIMetric value="$600,00" label="2 overdue invoices" />
  <KPIMetric value="$0,00" label="Unbilled income" />
</div>
```

---

## 9. Related components

- **MetricBlock** — underlying primitive
- **SegmentedBar** — sibling visualization below all KPI metrics
- **KPIStrip** — assembles multiple KPI metrics + the shared bar

---

## 10. Open questions / implementation notes

- **Column widths:** keep owned by `KPIStrip`
- **Locale formatting:** keep owned by the consumer
- **Thin-wrapper concern:** acceptable here because the value is in semantic locking, not visual transformation

---

**Status:** final packaged







