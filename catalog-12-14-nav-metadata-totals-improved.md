# Nav Tab Group

**Tier:** Compound  
**Path:** `/catalog/compounds/nav-tab-group.md`  
**Occurrences on reference screen:** 1

**Appears in:** top navigation center — `Overview` (ghost/inactive), `Customers` (light/active), `Marketing` (ghost/inactive).

---

## 1. Purpose

The **horizontal navigation tab compound**. Nav Tab Group arranges a small set of `PillButton` instances into a page-navigation row with one clearly active destination.

Its value over raw `PillButton` instances:

1. **active-state ownership** — the compound decides which tab is active and applies the correct visual treatment
2. **navigation semantics** — the group is announced as navigation, not as unrelated buttons
3. **consistent spacing** — tab spacing is a system rule, not a per-instance decision

If Nav Tab Group drifts toward:
- routing ownership
- panel/content-tab behavior
- very large tab counts
- non-navigation uses such as filters or segmented settings

…it stops being a clear page-navigation pattern.

---

## 2. Composition

### Primitive used
- `PillButton` — `variant="light"` for active, `variant="ghost"` for inactive

### How it’s composed
The compound maps a `tabs` array to `PillButton` instances inside a native `<nav>` container.

The compound owns:
- which tab is active
- which variant each tab receives
- `aria-current="page"` on the active item
- group spacing

The consumer owns:
- routing or URL changes
- the meaning of each tab
- whether clicks update local state, app state, or navigation

### Important implementation note
This v1 version is **button-oriented**, because the reference pattern behaves like an in-app navigation state switch. If future use cases require true anchor/link rendering for page navigation, add an anchor-friendly or `asChild` version later rather than overloading this first version.

---

## 3. Anatomy

```text
<nav aria-label="...">
┌────────────────────────────────────────────────┐
│  Overview    [ Customers ]    Marketing        │
│     ↑              ↑              ↑            │
│   ghost          light          ghost          │
│  inactive        active         inactive       │
└────────────────────────────────────────────────┘
```

### Core rules
- Exactly **one tab is active**
- Active tab uses `PillButton variant="light"`
- Inactive tabs use `PillButton variant="ghost"`
- Gap is fixed to `gap-1` (4px)
- Container is always `<nav>` with `aria-label`
- Default tab size is `md`
- Tab order should follow stable information architecture, not temporary usage frequency

---

## 4. What is intentionally not part of this compound

- **Routing** — the compound emits `onTabChange`; navigation behavior belongs to the consumer
- **Panel/content tabs** — use a different compound when tabs control content regions below them
- **Icons in tabs** — not observed on the reference
- **Overflow/scrolling strategy**
- **Vertical orientation**
- **Large navigation sets** — if the group grows past roughly 5 visible tabs, it is probably the wrong navigation pattern

This should stay a small, legible page-navigation row.

---

## 5. States

| State | Treatment |
|---|---|
| active | `PillButton.light` + `aria-current="page"` |
| inactive | `PillButton.ghost` |
| hover | inherited from `PillButton` |
| disabled | allowed, but should be rare in actual navigation |

### Accessibility requirements
- Use native `<nav>`
- `aria-label` is required
- Active item gets `aria-current="page"`
- Tab text itself serves as the accessible label

---

## 6. Token dependencies

| Value | Tailwind | Token |
|---|---|---|
| Tab gap | `gap-1` | `space.1` (4px) |

---

## 7. Code

```tsx
// components/compounds/NavTabGroup.tsx
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/primitives/PillButton";

export interface NavTab {
  /** Unique identifier. */
  id: string;
  /** Visible label. */
  label: string;
  /** Rarely needed. Prefer hiding unavailable destinations instead. */
  disabled?: boolean;
}

export interface NavTabGroupProps
  extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  tabs: NavTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  /** Required. Describes the navigation group. */
  "aria-label": string;
}

export const NavTabGroup = forwardRef<HTMLElement, NavTabGroupProps>(
  ({ tabs, activeTab, onTabChange, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <PillButton
              key={tab.id}
              variant={isActive ? "light" : "ghost"}
              onClick={() => !isActive && !tab.disabled && onTabChange(tab.id)}
              aria-current={isActive ? "page" : undefined}
              disabled={tab.disabled}
            >
              {tab.label}
            </PillButton>
          );
        })}
      </nav>
    );
  },
);

NavTabGroup.displayName = "NavTabGroup";
```

### Notes on the code
- Native `<nav>` is preferred over synthetic navigation roles
- The compound owns visual active state completely
- Clicking the active tab is a no-op
- This version is intentionally button-based; link rendering can be added later if a real need appears

---

## 8. Usage example

```tsx
const [activeTab, setActiveTab] = useState("customers");

<NavTabGroup
  aria-label="Main navigation"
  tabs={[
    { id: "overview", label: "Overview" },
    { id: "customers", label: "Customers" },
    { id: "marketing", label: "Marketing" },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

---

## 9. Related components

- **PillButton** — only primitive used here
- **TopNav** *(future compound)* — hosts this group in the full navigation bar
- **SegmentedToggle / TabPanel** *(future compounds)* — for non-navigation tab-like interfaces

---

## 10. Open questions / implementation notes

- **Anchor-friendly rendering:** likely future enhancement if true link navigation becomes common
- **Disabled tab usage:** should stay rare
- **Large nav sets:** switch patterns rather than stretching this compound too far

---

**Status:** draft — awaiting validation

---
---
---

# Metadata Stack

**Tier:** Compound  
**Path:** `/catalog/compounds/metadata-stack.md`  
**Occurrences on reference screen:** 1

**Appears in:** invoice detail right panel — vertical stack of `Invoice Date: 09/08/2018`, `Terms: Net 15`, `Due Date: 24/08/2018`, right-aligned.

---

## 1. Purpose

The **vertical metadata display compound**. Metadata Stack arranges multiple `KeyValueRow` instances into one consistent vertical cluster.

Its value is deliberately small and precise:

1. **consistent row spacing**
2. **consistent stack alignment**
3. **prevention of ad hoc metadata grouping**

This is a simple compound on purpose. It should not become a generic vertical list container.

---

## 2. Composition

### Primitive used
- `KeyValueRow` — one per item, always in `layout="compact"`

### How it’s composed
The compound maps an `items` data array to `KeyValueRow` instances inside a vertical flex column.

The compound owns:
- row gap
- stack alignment
- the fact that all rows use `layout="compact"`

It does not own:
- title/heading content
- surrounding surface
- semantic definition-list markup
- non-metadata children

---

## 3. Anatomy

```text
┌──────────────────────────────────────────┐
│  Invoice Date:            09/08/2018     │
│  Terms:                       Net 15     │
│  Due Date:                24/08/2018     │
└──────────────────────────────────────────┘
        rows aligned as one metadata block
```

### Core rules
- Rows are always `KeyValueRow layout="compact"`
- Gap is fixed to `gap-2` (8px)
- Default alignment is `right`
- Left alignment is allowed for settings-style contexts
- No dividers
- No mixed content types

---

## 4. What is intentionally not part of this compound

- **Section title or heading**
- **Dividers**
- **Mixed content rows**
- **Interactive rows**
- **Automatic semantic `<dl>` output**

If those are needed, they belong to surrounding composition or to a different pattern.

---

## 5. States

Static. No compound-level states.

### Accessibility note
If the stack is truly functioning like a semantic definition list, wrap it at the composition level with `<dl>`, `<dt>`, and `<dd>`. This compound intentionally does not force that structure.

---

## 6. Token dependencies

| Value | Tailwind | Token |
|---|---|---|
| Row gap | `gap-2` | `space.2` (8px) |

---

## 7. Code

```tsx
// components/compounds/MetadataStack.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { KeyValueRow } from "@/components/primitives/KeyValueRow";

export interface MetadataItem {
  id: string;
  label: ReactNode;
  value: ReactNode;
}

export interface MetadataStackProps extends HTMLAttributes<HTMLDivElement> {
  items: MetadataItem[];
  /** Right matches the reference. */
  align?: "left" | "right";
}

export const MetadataStack = forwardRef<HTMLDivElement, MetadataStackProps>(
  ({ items, align = "right", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2",
          align === "right" ? "items-end" : "items-start",
          className,
        )}
        {...props}
      >
        {items.map((item) => (
          <KeyValueRow
            key={item.id}
            label={item.label}
            value={item.value}
            layout="compact"
          />
        ))}
      </div>
    );
  },
);

MetadataStack.displayName = "MetadataStack";
```

### Notes on the code
- Uses a data array instead of children to keep the pattern pure
- Defaults to right alignment because that is the reference pattern
- Keeps the compound intentionally small

---

## 8. Usage examples

### Invoice detail metadata

```tsx
<MetadataStack
  items={[
    { id: "date", label: "Invoice Date:", value: "09/08/2018" },
    { id: "terms", label: "Terms:", value: "Net 15" },
    { id: "due", label: "Due Date:", value: "24/08/2018" },
  ]}
/>
```

### Left-aligned settings metadata

```tsx
<MetadataStack
  align="left"
  items={[
    { id: "type", label: "Account type", value: "Business" },
    { id: "email", label: "Billing email", value: "finance@silker.com" },
    { id: "login", label: "Last login", value: "2 hours ago" },
  ]}
/>
```

---

## 9. Related components

- **KeyValueRow** — only primitive used here
- **PanelHeader** — likely title/header above the stack
- **GlassPanel** — common surface context

---

## 10. Open questions / implementation notes

- **Semantic `<dl>` mode:** add only if it becomes a repeated real requirement
- **Additional sizes:** do not add unless a second density actually appears
- **Truncation behavior:** if truncation becomes necessary, treat it as an explicit extension rather than implicit overflow hiding

---

**Status:** draft — awaiting validation

---
---
---

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
// components/compounds/TotalsGroup.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PillStat } from "@/components/primitives/PillStat";

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

**Status:** draft — awaiting validation
