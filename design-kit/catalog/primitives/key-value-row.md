# Key Value Row

**Tier:** Primitive (foundational)  
**Path:** `/catalog/primitives/key-value-row.md`  
**Occurrences on reference screen:** 3 direct (invoice detail metadata stack) + similar patterns elsewhere

**Appears in:** invoice detail right-aligned metadata stack — `Invoice Date: 09/08/2018`, `Terms: Net 15`, `Due Date: 24/08/2018`. Also suitable for future read-only metadata layouts where short descriptive text is paired with a short value.

---

## 1. Purpose

The **inline label/value primitive** of the system. Used wherever the interface needs to present a short descriptive key paired with a short value on the same line.

This primitive exists because **Metric Block** is intentionally narrow — it handles stacked headline stats only. The invoice-detail metadata pattern is different enough in rhythm, hierarchy, and use case to deserve its own primitive.

The distinction:

- **Metric Block** → headline data; value is visually dominant
- **Key Value Row** → metadata; both sides stay quiet, with the value only **slightly** more prominent

If Key Value Row drifts toward:
- headline-like values
- stacked layouts
- long/wrapping content
- action-row behavior
- containering multiple controls

…it stops being a metadata primitive.

---

## 2. Anatomy

```text
┌──────────────────────────────────────────┐
│  Invoice Date:            09/08/2018     │
│      ↑                         ↑         │
│    label (muted)          value (clearer)│
└──────────────────────────────────────────┘
```

### Parts
1. **Container** — horizontal row
2. **Label** — short descriptive key
3. **Value** — short answer / metadata value

### Core rules
- Label and value stay **on one line**
- Label is on the **left** and value on the **right** in LTR layouts
- The value is **clearer**, not dramatically louder
- This primitive is for **short metadata**
- Overflow is a signal that the wrong primitive is being used

---

## 3. Data model

Both label and value accept `ReactNode`.

```ts
interface KeyValueRowProps {
  label: ReactNode;
  value: ReactNode;
}
```

This allows lightweight richness where needed:
- plain strings
- emphasized text fragments
- a small inline badge
- a lightweight text link

### Important boundary
Lightweight inline interactivity in the **value** is acceptable when it still reads as metadata.  
Examples:
- a text link such as `Anna Sterling`
- a small badge paired with text

Not acceptable:
- button groups
- menus
- full form controls
- turning the row into an action container

---

## 4. What is intentionally not part of this primitive

- **Stacked layouts** — use `MetricBlock`
- **Headline or emphasized values** — use `MetricBlock`
- **Multi-value rows** — different primitive or compound
- **Form field semantics** — separate form primitives
- **Icon-only labels or values** — this pattern is text-led
- **Automatic punctuation/separators** — punctuation belongs to content, not the component
- **Independent visual treatment per side** — the base hierarchy should remain consistent

### Styling rule
Consumers should not override the **base label/value hierarchy**.  
Richer content **inside the value node** is allowed, as long as the row still reads as metadata and not as a mini layout system.

---

## 5. Layout modes

The row supports two layout behaviors.

### `compact` — shrink to content (default)

Used for the reference-screen metadata stack, where the parent aligns a vertical set of rows to the right.

```tsx
<div className="flex flex-col items-end gap-2">
  <KeyValueRow label="Invoice Date:" value="09/08/2018" />
  <KeyValueRow label="Terms:" value="Net 15" />
  <KeyValueRow label="Due Date:" value="24/08/2018" />
</div>
```

### `between` — full-width split row

Used when the row fills its parent and the two sides should push apart.

```tsx
<div className="flex flex-col gap-2 w-full">
  <KeyValueRow layout="between" label="Created" value="09/08/2018" />
  <KeyValueRow layout="between" label="Status" value="Paid" />
</div>
```

This is more than a width toggle — it is a layout behavior switch.

---

## 6. States

Key Value Row is **static** — no hover, pressed, focus, or disabled states.

### Observed vs inferred
- **Observed in screenshot:** right-aligned metadata rows
- **Not applicable:** hover, pressed, focus-visible, disabled

### Accessibility requirements
- Label and value live in one container and are announced together naturally
- No special ARIA is needed in the default case
- If a whole stack is truly a definition list, wrap it at the composition level with `<dl>`, `<dt>`, and `<dd>`

---

## 7. Typography

One typographic treatment only.

| Part | Size | Weight | Color |
|---|---|---|---|
| Label | 12px | 400 | `text.tertiary` |
| Value | 12px | 500 | `text.secondary` |

### Typography rules
- Same size on both sides is intentional
- Hierarchy comes from **contrast and weight**, not size
- Value should not jump to `text.primary` unless the pattern is no longer metadata
- Punctuation, such as a colon, belongs to the passed label content when desired

---

## 8. Token dependencies

| Token | Usage |
|---|---|
| `text.tertiary` | Label color |
| `text.secondary` | Value color |
| `font.body-sm` | Base type size |

---

## 9. Do / don’t

### Do
- use for short metadata pairs
- keep both sides short
- use `compact` for reference-style metadata stacks
- use `between` for full-width settings-style rows
- include punctuation in the label only when the surrounding convention calls for it
- allow lightweight inline value content when it still reads as metadata

### Don’t
- don’t use this for headline data
- don’t let either side wrap
- don’t turn the row into an action container
- don’t use it for form controls
- don’t override the base hierarchy so the value becomes loud or promotional
- don’t hide overflow problems; if it overflows, use a different pattern

---

## 10. Code

```tsx
// design-kit/primitives/KeyValueRow.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

const keyValueRow = cva(
  "flex flex-row items-baseline gap-3 text-xs leading-snug whitespace-nowrap",
  {
    variants: {
      layout: {
        compact: "",
        between: "w-full justify-between",
      },
    },
    defaultVariants: {
      layout: "compact",
    },
  },
);

export interface KeyValueRowProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof keyValueRow> {
  /** Short descriptive key. */
  label: ReactNode;
  /** Short metadata value. */
  value: ReactNode;
}

export const KeyValueRow = forwardRef<HTMLDivElement, KeyValueRowProps>(
  ({ label, value, layout, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(keyValueRow({ layout }), className)}
        {...props}
      >
        <span className="text-white/[0.46] font-normal">{label}</span>
        <span className="text-white/[0.72] font-medium">{value}</span>
      </div>
    );
  },
);

KeyValueRow.displayName = "KeyValueRow";
```

### Notes on the code
- `items-baseline` keeps text alignment visually correct
- `whitespace-nowrap` enforces the intended single-line constraint
- `layout="compact" | "between"` describes behavior more clearly than `fillWidth`
- Colors and weights are intentionally fixed because this primitive has one typographic treatment
- Overflow is allowed to fail visibly rather than being silently hidden, because that signals the wrong pattern choice

---

## 11. Usage examples

### Reference-style metadata stack

```tsx
<div className="flex flex-col items-end gap-2">
  <KeyValueRow label="Invoice Date:" value="09/08/2018" />
  <KeyValueRow label="Terms:" value="Net 15" />
  <KeyValueRow label="Due Date:" value="24/08/2018" />
</div>
```

### Full-width settings row

```tsx
<div className="flex flex-col gap-3">
  <KeyValueRow layout="between" label="Account type" value="Business" />
  <KeyValueRow layout="between" label="Billing email" value="finance@silker.com" />
  <KeyValueRow layout="between" label="Last login" value="2 hours ago" />
</div>
```

### Value as a lightweight text link

```tsx
<KeyValueRow
  label="Bill To:"
  value={
    <a href="#anna-sterling" className="underline underline-offset-2 hover:text-white">
      Anna Sterling
    </a>
  }
/>
```

### Value with small badge content

```tsx
<KeyValueRow
  layout="between"
  label="Status"
  value={
    <span className="inline-flex items-center gap-1.5">
      <span className="size-1.5 rounded-full bg-[#E8F21D]" />
      Paid
    </span>
  }
/>
```

---

## 12. Related components

- **MetricBlock** — stacked counterpart for headline stats
- **MetadataStack** — vertical arrangement of multiple Key Value Rows
- **PillStat** — display pill for labeled values needing more visual weight

---

## 13. Open questions / implementation notes

- **`<dl>` semantics:** still better handled at the composition level than forced here
- **Size variants:** intentionally omitted for now; add only if a real second size appears
- **Truncation:** intentionally not built in; if truncation becomes necessary, add it explicitly rather than encouraging ad hoc overrides
- **Future `asChild`:** only add if there is a real need to support semantic wrappers cleanly

---

**Status:** final packaged





