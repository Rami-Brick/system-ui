# Mini Line-Items Table

**Tier:** Compound  
**Path:** `/catalog/compounds/mini-line-items-table.md`  
**Occurrences on reference screen:** 1

**Appears in:** invoice detail right panel — a compact read-only table with columns `#`, `Item & Description`, `Qty`, `Rate`, `Amount`, and 2 data rows (`Onyx Vase`, `Rosewood Frame`).

---

## 1. Purpose

The **read-only line items compound**. Mini Line-Items Table presents a short list of invoice line items in a compact, scannable format: one header row followed by a small number of data rows, visually soft and without heavy table chrome.

This is **not** a general-purpose data table. It has:
- no sorting
- no selection
- no inline editing
- no pagination
- no sticky header

It is specifically the pattern used when a record detail panel needs to show a short list of line items, usually in the range of **2–8 rows**.

If Mini Line-Items Table drifts toward:
- sortable columns
- row selection
- inline editing
- large datasets
- non-line-item schemas

…it has outgrown its role and should become a real table pattern instead.

---

## 2. Composition

### No primitive reuse
This compound introduces its own internal structure.

That is appropriate here: invoice line-item rows do not map cleanly to `KeyValueRow`, `MetricBlock`, or any other existing primitive.

### Important implementation decision
For the improved version of this compound, the preferred implementation is a **real semantic `<table>`**, not a CSS-grid table imitation.

Why:
- the content is genuinely tabular
- the schema is fixed
- accessibility is better by default
- the visual style can still remain soft and minimal with CSS

So the compound is:

- one semantic `<table>`
- one `<thead>`
- one `<tbody>`
- fixed invoice-specific columns
- minimal borders and no heavy grid lines

---

## 3. Anatomy

```text
┌──────────────────────────────────────────────────────┐
│  #    Item & Description         Qty   Rate  Amount  │
│  1    Onyx Vase                 2.00  20.00  40.00   │
│  2    Rosewood Frame            1.00  40.00  40.00   │
└──────────────────────────────────────────────────────┘
```

### Core rules
- Column order is fixed: `#` · `Item & Description` · `Qty` · `Rate` · `Amount`
- `Item & Description` is the widest column
- `#`, `Qty`, `Rate`, and `Amount` are narrow numeric columns
- Numeric columns are right-aligned
- `Amount` is the strongest value in each row
- Visual separation comes from spacing and soft tone, not from hard table borders
- Empty input renders `null`; the parent owns the empty state

---

## 4. Column structure

| Column | Width intent | Alignment | Typography |
|---|---|---|---|
| `#` | narrow | right | `text.tertiary`, small |
| `Item & Description` | flexible / widest | left | `text.secondary`, body-sm |
| `Qty` | narrow | right | `text.secondary`, body-sm |
| `Rate` | narrow | right | `text.secondary`, body-sm |
| `Amount` | narrow | right | `text.primary`, body-sm, slightly bolder |

---

## 5. What is intentionally not part of this compound

- **Sorting**
- **Row selection**
- **Inline editing**
- **Totals row** — use `TotalsGroup` below as a sibling
- **Column customization**
- **Pagination**
- **Built-in empty state**
- **Hover highlighting by default**

This compound should stay fixed, read-only, and invoice-specific.

---

## 6. Data model

```ts
interface LineItem {
  id: string;
  /** Row number shown in the # column. Usually 1-based. */
  number: number;
  /** Item description. */
  description: ReactNode;
  /** Pre-formatted quantity string. */
  qty: string;
  /** Pre-formatted rate string. */
  rate: string;
  /** Pre-formatted amount string. */
  amount: string;
}
```

### Formatting rule
All values are pre-formatted before they reach the component. This compound does **not** own locale, currency, or decimal formatting.

---

## 7. States

Static. No hover, selection, or interactive states by default.

### Accessibility requirements
A native semantic table is used:
- `<table>`
- `<thead>`
- `<tbody>`
- `<tr>`
- `<th scope="col">`
- `<td>`

No ARIA table-role compensation is needed because native table semantics already provide the correct structure.

---

## 8. Token dependencies

| Token | Usage |
|---|---|
| `text.tertiary` | Header labels, row numbers |
| `text.secondary` | Description, qty, rate |
| `text.primary` | Amount column |
| `font.body-sm` | Table text |
| `space.2` | Vertical row rhythm |
| `space.3` | Horizontal column rhythm |

---

## 9. Do / don’t

### Do
- use for short read-only invoice line-item lists
- pass pre-formatted values
- pair with `TotalsGroup` below
- keep the schema fixed

### Don’t
- don’t use for interactive or sortable data
- don’t extend it into a general-purpose table
- don’t embed totals inside it
- don’t overload it with more columns unless the invoice schema itself changes materially

---

## 10. Code

```tsx
// components/compounds/MiniLineItemsTable.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface LineItem {
  id: string;
  number: number;
  description: ReactNode;
  qty: string;
  rate: string;
  amount: string;
}

export interface MiniLineItemsTableProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  items: LineItem[];
  /** Accessible caption-like label for surrounding context if needed. */
  "aria-label"?: string;
}

export const MiniLineItemsTable = forwardRef<
  HTMLDivElement,
  MiniLineItemsTableProps
>(({ items, className, ...props }, ref) => {
  if (!items.length) return null;

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      <table className="w-full border-separate border-spacing-y-2 table-fixed">
        <colgroup>
          <col className="w-6" />
          <col />
          <col className="w-12" />
          <col className="w-[52px]" />
          <col className="w-[60px]" />
        </colgroup>

        <thead>
          <tr>
            {["#", "Item & Description", "Qty", "Rate", "Amount"].map((col, i) => (
              <th
                key={col}
                scope="col"
                className={cn(
                  "pb-1 text-[11px] font-medium text-white/[0.46]",
                  i === 1 ? "text-left" : "text-right",
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="text-right text-xs font-semibold text-white/[0.46]">
                {item.number}
              </td>
              <td className="text-left text-xs text-white/[0.72]">
                {item.description}
              </td>
              <td className="text-right text-xs text-white/[0.72]">{item.qty}</td>
              <td className="text-right text-xs text-white/[0.72]">{item.rate}</td>
              <td className="text-right text-xs font-semibold text-white">
                {item.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

MiniLineItemsTable.displayName = "MiniLineItemsTable";
```

### Notes on the code
- Uses a real semantic table for the best accessibility baseline
- `border-separate border-spacing-y-2` creates soft row separation without hard borders
- `colgroup` locks the invoice-specific column rhythm
- `description` is `ReactNode` in case richer read-only formatting is ever needed
- The outer wrapper stays minimal and only exists for composition/ref use

---

## 11. Usage examples

### Invoice detail line items

```tsx
<MiniLineItemsTable
  items={[
    {
      id: "item-1",
      number: 1,
      description: "Onyx Vase",
      qty: "2.00",
      rate: "20.00",
      amount: "40.00",
    },
    {
      id: "item-2",
      number: 2,
      description: "Rosewood Frame",
      qty: "1.00",
      rate: "40.00",
      amount: "40.00",
    },
  ]}
/>
```

### Table + totals composition

```tsx
<div className="flex flex-col gap-4">
  <MiniLineItemsTable items={lineItems} />
  <TotalsGroup
    totals={[
      { id: "subtotal", label: "Sub Total", value: "$80.00" },
      { id: "total", label: "Total", value: "$80.00" },
      { id: "balance", label: "Balance Due", value: "$80.00" },
    ]}
  />
</div>
```

---

## 12. Related components

- **TotalsGroup** — sibling directly below this table
- **GlassPanel (raised)** — common surface context
- **MetadataStack** — sibling metadata pattern in the same detail panel

---

## 13. Open questions / implementation notes

- **Hover row readability:** add only if a denser row count ever makes it necessary
- **Schema changes:** if the invoice schema changes materially, consider a different compound rather than weakening this one
- **Description richness:** `ReactNode` is supported, but keep it read-only and simple

---

**Status:** draft — awaiting validation

---
---
---

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
// components/compounds/KPIStrip.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { KPIMetric } from "@/components/compounds/KPIMetric";
import { SegmentedBar, type Segment } from "@/components/primitives/SegmentedBar";

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
    if (process.env.NODE_ENV !== "production" && metrics.length !== segments.length) {
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

**Status:** draft — awaiting validation
