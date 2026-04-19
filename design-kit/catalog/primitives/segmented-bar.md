# Segmented Bar

**Tier:** Primitive (foundational)  
**Path:** `/catalog/primitives/segmented-bar.md`  
**Occurrences on reference screen:** 1

**Appears in:** KPI strip — one long horizontally segmented rounded bar underneath the 5 metric blocks, with blue / magenta / chartreuse / silver / orange segments of varying widths.

---

## 1. Purpose

The **proportional composition primitive** of the system. Segmented Bar shows how a total breaks down across categories, using colored segments whose widths represent each category's share.

This is a data-visualization primitive. Its job is to turn a set of values into a single horizontal pill where:

- **Segment width = relative proportion** of that category within the total
- **Segment color = category identity** from the identity palette
- **The bar as a whole = one readable unit**, not a loose collection of shapes

If this component drifts toward:
- progress-bar usage
- decorative multicolor pills with arbitrary widths
- custom colors outside the identity palette
- segments with their own borders, gaps, or rounded corners

…it stops being a proportional chart and becomes generic decoration.

---

## 2. Anatomy

```text
single pill silhouette
┌────────────────────────────────────────────────────────────────┐
│ blue      │ magenta │ chartreuse │   silver         │ orange   │
└────────────────────────────────────────────────────────────────┘
   ↑ segments butt directly against each other
   ↑ no internal gaps
   ↑ no internal borders
   ↑ no internal radius per segment
```

### Parts
1. **Container** — pill-shaped wrapper with fixed height and clipped overflow
2. **Segments** — colored proportional bands rendered in the order provided

### Core rules
- The outer shape is **always one pill**
- Segments **butt directly against each other**
- Segments have **no gaps, no borders, and no internal radius**
- Segment widths are **computed from values**, never passed as widths directly
- Segment colors come from the **identity palette**
- Empty or all-zero data renders an **empty pill-shaped track**, not nothing

---

## 3. Data model

Segmented Bar accepts an ordered array of segment objects:

```ts
interface Segment {
  /** Raw non-negative finite value. */
  value: number;
  /** Color key from the identity palette. */
  color: SegmentColor;
  /** Optional label for accessibility context and future legends/tooltips. */
  label?: string;
}
```

The component:
1. Filters out invalid or non-positive values
2. Sums the remaining values to get a total
3. Computes each segment width as `(value / total) * 100%`
4. Renders segments in the order provided

### Data rules
- Values must be **finite numbers**
- Values must be **greater than or equal to 0**
- Negative values are **invalid** for this primitive
- Segment order is **stable** and consumer-controlled
- Zero-value segments are skipped
- Empty or all-zero input renders the empty track state

---

## 4. What is intentionally not part of this primitive

These related concerns belong elsewhere:

- **Progress bars** — different semantic; build separately if needed
- **Labels above/below the bar** — belongs to `KPIStrip` or surrounding composition
- **Hover tooltips** — future compound concern, not part of this primitive
- **Legend** — separate composition
- **Animation** — out of scope until there is a real requirement
- **Non-proportional sizing tricks** such as minimum widths — they would distort the data

This primitive should stay honest and narrowly focused.

---

## 5. Sizes

| Size | Height | Typical uses |
|---|---:|---|
| `sm` | 4px | Dense inline breakdowns |
| `md` | 10px | Default KPI/dashboard bar |
| `lg` | 16px *(visually provisional)* | Emphasized/hero breakdowns |

**Default size:** `md`

### Sizing rules
- Height is the only size-controlled dimension
- Width is controlled entirely by the parent
- Do not invent custom heights
- `lg` should be visually validated during full-screen assembly before it becomes canonical

---

## 6. States

Segmented Bar is a **static display primitive**.

### Observed vs inferred
- **Observed in screenshot:** one `md` bar with 5 segments
- **Not applicable:** hover, pressed, focus-visible, disabled

### Accessibility requirements
- The container is announced as one summarized unit via `role="img"` + `aria-label`
- The `aria-label` should describe the overall composition, not attempt to encode full data detail
- Individual segments are `aria-hidden`
- Color alone is not enough for comprehension; surrounding UI should provide labels or a legend where needed

---

## 7. Color system

Segments use the same **identity palette** as `AvatarCircle`.

| Color key | Hex | Matches |
|---|---|---|
| `blue` | `#2D7CF6` | Avatar ring blue |
| `magenta` | `#D94BF4` | Avatar ring magenta |
| `chartreuse` | `#E8F21D` | Avatar ring chartreuse |
| `silver` | `#D7D9DF` | Avatar ring silver |
| `orange` | `#FF9A18` | Avatar ring orange |
| `cyan` | `#38D3D3` | Avatar ring cyan |

### Color rules
- Use the same color for the same category across a page
- Do **not** use `accent.primary` here
- Avoid adjacent similar hues when category clarity matters

---

## 8. Token dependencies

| Token | Usage |
|---|---|
| `identity.blue` / `magenta` / `chartreuse` / `silver` / `orange` / `cyan` | Segment colors |
| `surface.control` | Empty-state track color |
| `radius.pill` | Pill silhouette |
| `size.bar-sm` / `md` / `lg` | Bar heights |

Bar-height tokens are included in `tokens/index.ts` and exposed by the Tailwind preset.

---

## 9. Do / don’t

### Do
- use this for true proportional compositions
- keep colors stable per category
- pass meaningful labels even if the primitive does not surface them directly yet
- allow tiny values to become tiny slivers if that is what the data says
- use the empty track state for no-data situations

### Don’t
- don’t use this for progress bars
- don’t hand-pick widths decoratively
- don’t use `accent.primary` as a segment color
- don’t rely on color alone to communicate category meaning
- don’t force minimum widths that would misrepresent the data
- don’t pass negative or non-finite values

---

## 10. Code

```tsx
// design-kit/primitives/SegmentedBar.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils/cn";

const SEGMENT_COLORS = {
  blue: "bg-[#2D7CF6]",
  magenta: "bg-[#D94BF4]",
  chartreuse: "bg-[#E8F21D]",
  silver: "bg-[#D7D9DF]",
  orange: "bg-[#FF9A18]",
  cyan: "bg-[#38D3D3]",
} as const;

export type SegmentColor = keyof typeof SEGMENT_COLORS;

export interface Segment {
  value: number;
  color: SegmentColor;
  label?: string;
}

const segmentedBar = cva(
  "relative flex w-full overflow-hidden rounded-full bg-white/[0.06]",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2.5",
        lg: "h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface SegmentedBarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof segmentedBar> {
  /** Ordered segments. Widths are computed from the sum of valid values. */
  segments: Segment[];
  /** Accessible summary of the composition as a whole. */
  "aria-label": string;
}

export const SegmentedBar = forwardRef<HTMLDivElement, SegmentedBarProps>(
  ({ segments, size, className, ...props }, ref) => {
    const validSegments = segments.filter(
      (s) => Number.isFinite(s.value) && s.value > 0,
    );
    const total = validSegments.reduce((sum, s) => sum + s.value, 0);
    const hasData = total > 0;

    return (
      <div
        ref={ref}
        role="img"
        className={cn(segmentedBar({ size }), className)}
        {...props}
      >
        {hasData &&
          validSegments.map((segment, index) => {
            const widthPercent = (segment.value / total) * 100;
            return (
              <div
                key={`${segment.color}-${index}`}
                className={cn("h-full", SEGMENT_COLORS[segment.color])}
                style={{ width: `${widthPercent}%` }}
                aria-hidden="true"
              />
            );
          })}
      </div>
    );
  },
);

SegmentedBar.displayName = "SegmentedBar";
```

### Notes on the code
- `overflow-hidden` + `rounded-full` clips the whole bar to one clean pill silhouette
- The empty-state track uses `bg-white/[0.06]`, matching the quiet surface language
- Invalid, zero, and negative values are filtered out before width calculation
- The primitive intentionally does **not** expose browser tooltips or custom hover behavior
- Widths are resolved via inline style because percentages are data-driven

---

## 11. Usage examples

### KPI strip bar

```tsx
<SegmentedBar
  aria-label="Customer financial composition across 5 categories"
  segments={[
    { value: 120, color: "blue", label: "Estimates" },
    { value: 80, color: "magenta", label: "Unbilled income" },
    { value: 600, color: "chartreuse", label: "Overdue invoices" },
    { value: 420, color: "silver", label: "Open balances" },
    { value: 60, color: "orange", label: "Other" },
  ]}
/>
```

### Small inline bar

```tsx
<SegmentedBar
  size="sm"
  aria-label="Task completion breakdown"
  segments={[
    { value: 12, color: "chartreuse", label: "Complete" },
    { value: 3, color: "orange", label: "In progress" },
    { value: 5, color: "silver", label: "Not started" },
  ]}
/>
```

### Empty state

```tsx
<SegmentedBar
  aria-label="Revenue composition (no data yet)"
  segments={[]}
/>
```

### Large emphasized composition

```tsx
<SegmentedBar
  size="lg"
  aria-label="Revenue by channel"
  segments={[
    { value: 45000, color: "blue", label: "Direct" },
    { value: 28000, color: "magenta", label: "Partner" },
    { value: 12000, color: "orange", label: "Referral" },
  ]}
/>
```

---

## 12. Related components

- **AvatarCircle** — shares the identity palette
- **MetricBlock** — often sits above Segmented Bar in KPI contexts
- **KPIStrip** — composes Metric Blocks + Segmented Bar
- **ProgressBar** *(future primitive, if ever needed)* — semantically different single-value bar

---

## 13. Open questions / implementation notes

- **Bar-height tokens:** keep `SegmentedBar` sizes aligned with `size.bar-*`
- **Tooltip composition:** keep outside this primitive if needed later
- **Animation:** add only when a real requirement appears
- **Per-segment accessibility:** if needed later, pair with a visually hidden list or nearby textual summary rather than overloading this primitive
- **`lg` validation:** confirm during full assembly that 16px still fits the system’s restraint

---

**Status:** final packaged





