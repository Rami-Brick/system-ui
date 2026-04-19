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
// design-kit/compounds/MiniLineItemsTable.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

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

**Status:** final packaged

---
---
---







