# Segmented Toggle

**Tier:** Compound  
**Path:** `/catalog/compounds/segmented-toggle.md`  
**Occurrences on reference screen:** 1

**Appears in:** left panel header center slot — a small pill-shaped group containing a list-view icon and a grid-view icon, one of which is active.

---

## 1. Purpose

The **mutually exclusive icon selection compound**. Segmented Toggle presents two or more options where exactly one must be selected at all times — visually compact, but semantically closer to a radio group than to a toolbar.

This is **not** an `IconToolbar`. The distinction is fundamental:

- **IconToolbar** — independent actions. Clicking one does not deselect another.
- **SegmentedToggle** — mutually exclusive options. Selecting one makes the others inactive.

If Segmented Toggle drifts toward:
- allowing zero selected options
- allowing multiple selected options simultaneously
- being used for independent actions that do not deselect each other
- growing beyond ~4 options without a different layout strategy

…it is being used for the wrong job.

---

## 2. Composition

### Primitive used
- `CircularIconButton` — one per option

### How it is composed
The compound wraps multiple `CircularIconButton` instances inside a shared pill-shaped surface.

The compound owns:
- which option is selected
- which visual variant each option receives
- the group-level semantics
- the shared outer surface

The primitive still owns:
- button size
- hover/pressed/disabled visuals
- icon rendering
- base button behavior

### Important semantics note
This compound should be understood as a **lightweight radio-style selection group**.

For v1:
- container uses `role="radiogroup"`
- each option uses `role="radio"`
- selected state is expressed with `aria-checked`

Arrow-key navigation is **not yet implemented**, so this is not a full production-grade radio-group widget. Current keyboard behavior relies on standard Tab navigation plus Enter/Space activation.

---

## 3. Anatomy

```text
┌──────────────────────────────────┐
│   shared pill-shaped surface     │
│  ┌────────┐  ┌────────┐          │
│  │  [≡]  │  │  [⊞]   │          │
│  │ light  │  │ glass  │          │
│  │active  │  │inactive│          │
│  └────────┘  └────────┘          │
└──────────────────────────────────┘
```

### Parts
1. **Container** — shared pill-shaped surface
2. **Option buttons** — `CircularIconButton` instances controlled by selection state

### Core rules
- Exactly **one option is selected**
- Selected option uses `variant="light"`
- Unselected options use `variant="glass"`
- The container provides the shared visual surface
- Supports **2 to 4 options**
- All options use the same size (`sm`)

---

## 4. What is intentionally not part of this compound

- **Zero-selection mode**
- **Multi-select mode**
- **Text labels inside options**
- **More than 4 options**
- **Independent action semantics**
- **Full radio-group keyboard management** for v1

If you need text options, use a future `SegmentedControl`, not this compound.

---

## 5. States

| State | Treatment |
|---|---|
| selected | `CircularIconButton.light` + `role="radio"` + `aria-checked="true"` |
| unselected | `CircularIconButton.glass` + `role="radio"` + `aria-checked="false"` |
| hover | inherited from `CircularIconButton` |
| disabled | full group dims and becomes non-interactive |

### Accessibility requirements
- Container uses `role="radiogroup"` with required `aria-label`
- Each option uses `role="radio"`
- Selected state uses `aria-checked`
- Each option still needs its own descriptive `aria-label`
- Current keyboard model is **Tab + Enter/Space**, not arrow-key radio navigation

---

## 6. Token dependencies

| Token | Usage |
|---|---|
| `surface.control` | Container background |
| `border.soft` | Container border |
| `radius.pill` | Container shape |
| `surface.control-inverse` | Selected option background |
| `size.icon-sm` | Option button size |

---

## 7. Code

```tsx
// components/compounds/SegmentedToggle.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CircularIconButton } from "@/components/primitives/CircularIconButton";

export interface ToggleOption {
  value: string;
  icon: ReactNode;
  /** Required for accessibility. Describes the option. */
  label: string;
}

export interface SegmentedToggleProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 2 to 4 options. */
  options: ToggleOption[];
  /** Currently selected value. */
  value: string;
  /** Called when the user selects an option. */
  onChange: (value: string) => void;
  /** Required. Describes what is being toggled. */
  "aria-label": string;
  disabled?: boolean;
}

export const SegmentedToggle = forwardRef<HTMLDivElement, SegmentedToggleProps>(
  ({ options, value, onChange, disabled, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn(
          "inline-flex items-center rounded-full p-1",
          "border border-white/[0.08] bg-white/[0.06]",
          disabled && "pointer-events-none opacity-40",
          className,
        )}
        {...props}
      >
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <CircularIconButton
              key={option.value}
              variant={isSelected ? "light" : "glass"}
              size="sm"
              icon={option.icon}
              aria-label={option.label}
              role="radio"
              aria-checked={isSelected}
              onClick={() => !isSelected && onChange(option.value)}
            />
          );
        })}
      </div>
    );
  },
);

SegmentedToggle.displayName = "SegmentedToggle";
```

### Notes on the code
- The shared container gives the toggle its own pill identity, unlike `IconToolbar`
- `p-1` creates a visible pocket around the buttons without needing a heavier outer shell
- Selection state is expressed with radio semantics, not `aria-pressed`
- Clicking the selected option is a no-op
- Full arrow-key radio navigation is intentionally deferred

---

## 8. Usage examples

### Panel header view toggle

```tsx
import { List, LayoutGrid } from "lucide-react";

const [view, setView] = useState<"list" | "grid">("list");

<SegmentedToggle
  aria-label="View mode"
  value={view}
  onChange={(v) => setView(v as "list" | "grid")}
  options={[
    { value: "list", icon: <List />, label: "List view" },
    { value: "grid", icon: <LayoutGrid />, label: "Grid view" },
  ]}
/>
```

### Three-option toggle

```tsx
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

<SegmentedToggle
  aria-label="Text alignment"
  value={alignment}
  onChange={setAlignment}
  options={[
    { value: "left", icon: <AlignLeft />, label: "Align left" },
    { value: "center", icon: <AlignCenter />, label: "Align center" },
    { value: "right", icon: <AlignRight />, label: "Align right" },
  ]}
/>
```

---

## 9. Related components

- **CircularIconButton** — primitive used for each option
- **IconToolbar** — visually adjacent but semantically different independent-action grouping
- **NavTabGroup** — text-pill counterpart for navigation-level selection
- **PanelHeader** — natural host in the center slot

---

## 10. Open questions / implementation notes

- **Arrow-key navigation:** likely first accessibility upgrade if this kit moves toward stricter compliance
- **Text-option counterpart:** build separately if needed; do not stretch this icon-only pattern
- **2–4 option enforcement:** currently documented, not runtime-enforced; add validation only if misuse becomes common

---

**Status:** draft — awaiting validation

---
---
---

# Customer Identity Block

**Tier:** Compound  
**Path:** `/catalog/compounds/customer-identity-block.md`  
**Occurrences on reference screen:** 1

**Appears in:** invoice detail right panel — large chartreuse avatar (`S` initial, star badge), customer name `Silker`, 3-line address, `Bill To: Anna Sterling` link.

---

## 1. Purpose

The **entity identity compound**. Customer Identity Block presents the core visual identity of one entity: avatar, name, optional address, and optional billing reference.

This is the most visually prominent identity moment inside the invoice detail panel. It should not become a generic profile card or action hub.

If Customer Identity Block drifts toward:
- action buttons inside the block
- multiple entities at once
- logo/icon substitution for the avatar
- additional control surfaces
- becoming a generic user/profile card

…it stops being an identity block and becomes a different pattern.

---

## 2. Composition

### Primitives used
- `AvatarCircle` — primary identity mark
- `KeyValueRow` — optional `Bill To` metadata line

### How it is composed
The block has three vertical zones:

1. **Avatar zone** — `AvatarCircle` at `size="lg"`, optionally with badge
2. **Text zone** — name + optional multi-line address
3. **Reference zone** — optional `KeyValueRow layout="compact"` for billing reference

### What the compound changes
- `AvatarCircle` is always `lg`
- `Bill To` always uses `KeyValueRow layout="compact"`
- The block owns vertical rhythm and left alignment

---

## 3. Anatomy

```text
[AvatarCircle lg]

Name
Address line 1
Address line 2
Address line 3

Bill To:   Anna Sterling
```

### Core rules
- Avatar is always `lg`
- Name is the most prominent text in the block
- Address is quieter supporting text
- `Bill To` row is optional
- Address is optional
- The block is left-aligned
- The block has no surface of its own

---

## 4. What is intentionally not part of this compound

- **Action buttons**
- **Multiple identities**
- **Editable fields**
- **Phone/email/contact metadata beyond the observed pattern**
- **Status indicators beyond the avatar badge**
- **Heading-level enforcement**

This compound is read-only identity display.

---

## 5. States

Static.

### Accessibility requirements
- `AvatarCircle` handles its own accessible naming
- The billing reference link should be descriptive
- The name element should be consumer-selectable, because the compound cannot know document heading level on its own

---

## 6. Token dependencies

| Token | Usage |
|---|---|
| `text.primary` | Name |
| `text.secondary` | Address |
| `font.heading-md` | Name scale intent |
| `font.body-sm` | Address scale intent |
| `size.avatar-lg` | Avatar size |
| `space.3` | Main vertical gap |
| `space.2` | Smaller supporting gap |

---

## 7. Code

```tsx
// components/compounds/CustomerIdentityBlock.tsx
import {
  forwardRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import {
  AvatarCircle,
  type AvatarCircleColor,
} from "@/components/primitives/AvatarCircle";
import { KeyValueRow } from "@/components/primitives/KeyValueRow";

export interface CustomerIdentityBlockProps
  extends HTMLAttributes<HTMLDivElement> {
  /** Entity name. */
  name: string;
  /** Optional name element tag. Defaults to `p`. */
  nameAs?: ElementType;
  /** Optional image URL. */
  avatarSrc?: string;
  /** Identity color. */
  avatarColor?: AvatarCircleColor;
  /** Optional avatar badge. */
  avatarBadge?: ReactNode;
  /** Optional address lines. */
  address?: string[];
  /** Optional billing label. */
  billToLabel?: ReactNode;
  /** Optional billing value, typically a link. */
  billToValue?: ReactNode;
}

export const CustomerIdentityBlock = forwardRef<
  HTMLDivElement,
  CustomerIdentityBlockProps
>(
  (
    {
      name,
      nameAs: NameTag = "p",
      avatarSrc,
      avatarColor = "neutral",
      avatarBadge,
      address,
      billToLabel = "Bill To:",
      billToValue,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        <AvatarCircle
          name={name}
          src={avatarSrc}
          color={avatarColor}
          size="lg"
          badge={avatarBadge}
        />

        <div className="flex flex-col gap-0.5">
          <NameTag className="text-[20px] font-semibold leading-snug text-white">
            {name}
          </NameTag>

          {address && address.length > 0 ? (
            <div className="flex flex-col">
              {address.map((line, index) => (
                <span
                  key={index}
                  className="text-[13px] leading-snug text-white/70"
                >
                  {line}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {billToValue ? (
          <KeyValueRow
            label={billToLabel}
            value={billToValue}
            layout="compact"
          />
        ) : null}
      </div>
    );
  },
);

CustomerIdentityBlock.displayName = "CustomerIdentityBlock";
```

### Notes on the code
- Uses `AvatarCircle`, not the older generic avatar naming
- `nameAs` keeps heading semantics in consumer control without forcing the compound to guess
- `address` stays simple as `string[]` for now
- The compound remains read-only and visually narrow

---

## 8. Usage examples

### Invoice detail identity block

```tsx
import { Star } from "lucide-react";

<CustomerIdentityBlock
  name="Silker"
  avatarColor="chartreuse"
  avatarBadge={
    <div className="flex size-5 items-center justify-center rounded-full bg-[#2D7CF6]">
      <Star className="size-3 fill-white text-white" />
    </div>
  }
  address={[
    "1561 Appleview Town,",
    "Bakers Street,",
    "Chicago, U.S.A",
  ]}
  billToLabel="Bill To:"
  billToValue={
    <a
      href="#anna-sterling"
      className="text-white/80 underline underline-offset-2 hover:text-white"
    >
      Anna Sterling
    </a>
  }
/>
```

### Minimal identity

```tsx
<CustomerIdentityBlock
  name="Firas"
  avatarColor="blue"
/>
```

### With semantic heading

```tsx
<CustomerIdentityBlock
  name="Acme Corp"
  nameAs="h2"
  avatarColor="orange"
  address={["123 Business Ave", "San Francisco, CA 94102"]}
/>
```

---

## 9. Related components

- **AvatarCircle** — identity primitive
- **KeyValueRow** — metadata line for billing reference
- **GlassPanel** — common surface context
- **PanelHeader** — panel-level title/actions above the block

---

## 10. Open questions / implementation notes

- **Address as `ReactNode[]`:** promote only if richer address formatting becomes a real need
- **Additional contact metadata:** keep out unless observed or clearly needed
- **Invoice-detail layout coupling:** the block should stay independent from the right-side metadata stack layout around it

---

**Status:** draft — awaiting validation

---
---
---

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
// components/compounds/KPIMetric.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MetricBlock } from "@/components/primitives/MetricBlock";

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
- **KPIStrip** *(future compound)* — assembles multiple KPI metrics + the shared bar

---

## 10. Open questions / implementation notes

- **Column widths:** keep owned by `KPIStrip`
- **Locale formatting:** keep owned by the consumer
- **Thin-wrapper concern:** acceptable here because the value is in semantic locking, not visual transformation

---

**Status:** draft — awaiting validation
