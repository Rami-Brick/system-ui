# Invoice Row

**Tier:** Compound  
**Path:** `/catalog/compounds/invoice-row.md`  
**Occurrences on reference screen:** 7+ rows (1 selected, rest default)

**Appears in:** left panel body — each row in the `All Invoices` list, containing an avatar, name, phone, open balance, and an action area. One row is visually selected.

---

## 1. Purpose

The **list row compound**. Invoice Row is the repeating unit inside the invoice list panel. It presents one customer's invoice summary with identity, contact info, balance, and a context-sensitive action set.

This is one of the densest compounds in the catalog because it combines:
- identity
- summary information
- controlled selected styling
- one primary action
- two secondary actions

If Invoice Row drifts toward:
- owning business logic
- managing its own selected state
- becoming a generic card outside list contexts
- growing multiple competing primary actions
- becoming fully interactive across the whole row by default

…it stops being a clean list-row pattern.

---

## 2. Composition

### Primitives used
- `AvatarCircle` — `size="md"`
- `PillButton` — primary row action
- `CircularIconButton` × 2 — secondary row actions

### How it is composed

```text
┌────────────────────────────────────────────────────────────────────────┐
│ [●] [Avatar]  Anna Sterling   (650) 555-1234   $222.81   [Action] ⋯ ↗ │
└────────────────────────────────────────────────────────────────────────┘
```

Five layout regions:
1. **Selection indicator slot** — reserved space for the dot
2. **Avatar slot**
3. **Info slot** — name + phone
4. **Balance slot**
5. **Actions slot** — pill + 2 icon buttons

### What the compound changes
- `AvatarCircle` is always `md`
- `PillButton` is always `light` + `sm`
- Secondary icon buttons are always `glass` + `sm`
- Selected state changes row surface + selection dot + pill label

The compound owns the row layout and the selected visual treatment. The parent owns which row is selected.

---

## 3. Anatomy — default state

```text
┌────────────────────────────────────────────────────────────────────────┐
│     [○]  Anna Sterling    (650) 555-1234    $222.81  [Receive payment] ⋯ ↗ │
└────────────────────────────────────────────────────────────────────────┘
```

## 3b. Anatomy — selected state

```text
┌────────────────────────────────────────────────────────────────────────┐
│ [●] [○]  Anna Sterling    (650) 555-1234    $222.81  [Create invoice] ⋯ ↗ │
│      bg: surface.glass-selected                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Core rules
- Row stays on one line
- Selection dot appears only in selected state
- Avatar color is identity-driven, not state-driven
- Primary action label changes by state
- The row itself is **not automatically interactive**
- Selection remains **controlled by the parent**

---

## 4. Selection indicator

The leftmost dot is purely visual:
- small filled circle
- visible only in selected state
- `aria-hidden="true"`
- fixed-width slot so layout does not shift

It indicates current visual selection but is not itself announced or interactive.

---

## 5. What is intentionally not part of this compound

- **Internal selected-state management**
- **Whole-row click behavior by default**
- **Hover surface behavior by default**
- **Checkbox or multiselect patterns**
- **Inline editing**
- **Skeleton/loading state**
- **Drag-and-drop behavior**

If you need row selection by clicking the whole row, add that at the list composition level instead of baking it into this compound.

---

## 6. States

| State | Surface | Dot | Action label |
|---|---|---|---|
| `default` | transparent | hidden | `defaultAction` |
| `selected` | `surface.glass-selected` | visible | `selectedAction` |

### Accessibility note
This compound does **not** hardcode `role="row"` or `aria-selected` in v1.

Why:
- the row is not inherently a grid row everywhere it may be used
- `aria-selected` only makes sense inside the correct parent selection model
- the parent list/grid owns the selection semantics

So this compound provides the **visual selected state**, while semantic selection should be added by the parent context if needed.

---

## 7. Token dependencies

| Token | Usage |
|---|---|
| `surface.glass-selected` | Selected row background |
| `text.primary` | Name, balance, dot |
| `text.secondary` | Phone |
| `size.avatar-md` | Avatar size |
| `space.2` | Internal action gap |
| `space.4` | Major column gap |

---

## 8. Do / don’t

### Do
- always pass both `defaultAction` and `selectedAction`
- let the parent control `isSelected`
- keep avatar color stable per customer/entity
- keep the row dense and single-line
- add row-level selection semantics only at the parent level if the surrounding list model supports them

### Don’t
- don’t make the row manage its own selection
- don’t add more than one primary action pill
- don’t replace `AvatarCircle` with another primitive
- don’t hardcode grid/list semantics unless the parent structure justifies them

---

## 9. Code

```tsx
// design-kit/compounds/InvoiceRow.tsx
import { forwardRef, type HTMLAttributes } from "react";
import { MoreHorizontal, ArrowUpRight } from "lucide-react";
import { cn } from "../utils/cn";
import {
  AvatarCircle,
  type AvatarCircleColor,
} from "../primitives/AvatarCircle";
import { PillButton } from "../primitives/PillButton";
import { CircularIconButton } from "../primitives/CircularIconButton";

export interface InvoiceRowProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  avatarColor?: AvatarCircleColor;
  avatarSrc?: string;
  phone: string;
  balance: string;
  defaultAction: string;
  selectedAction: string;
  isSelected?: boolean;
  onAction?: () => void;
  onMore?: () => void;
  onOpen?: () => void;
}

export const InvoiceRow = forwardRef<HTMLDivElement, InvoiceRowProps>(
  (
    {
      name,
      avatarColor = "neutral",
      avatarSrc,
      phone,
      balance,
      defaultAction,
      selectedAction,
      isSelected = false,
      onAction,
      onMore,
      onOpen,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-selected={isSelected ? "true" : "false"}
        className={cn(
          "grid items-center gap-4 rounded-2xl px-3 py-2.5 transition-colors duration-150",
          "grid-cols-[8px_36px_1fr_80px_auto]",
          isSelected ? "bg-white/[0.18]" : "bg-transparent",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "size-2 rounded-full bg-white transition-opacity duration-150",
            isSelected ? "opacity-100" : "opacity-0",
          )}
        />

        <AvatarCircle
          name={name}
          src={avatarSrc}
          color={avatarColor}
          size="md"
        />

        <div className="min-w-0 flex flex-col gap-0.5">
          <span className="truncate text-sm font-medium text-white">{name}</span>
          <span className="truncate text-xs text-white/60">{phone}</span>
        </div>

        <span className="text-right text-sm font-medium tabular-nums text-white">
          {balance}
        </span>

        <div className="flex items-center gap-2">
          <PillButton variant="light" size="sm" onClick={onAction}>
            {isSelected ? selectedAction : defaultAction}
          </PillButton>

          <CircularIconButton
            variant="glass"
            size="sm"
            icon={<MoreHorizontal />}
            aria-label="More options"
            onClick={onMore}
          />

          <CircularIconButton
            variant="glass"
            size="sm"
            icon={<ArrowUpRight />}
            aria-label={`Open ${name}'s invoice`}
            onClick={onOpen}
          />
        </div>
      </div>
    );
  },
);

InvoiceRow.displayName = "InvoiceRow";
```

### Notes on the code
- Uses the final `AvatarCircle` primitive name consistently
- Keeps semantic selection out of the row itself; parent owns that
- `data-selected` is available for composition/debugging without implying ARIA semantics
- `truncate` and `tabular-nums` protect the dense row layout
- `rounded-2xl` gives the row a softer sub-surface than the surrounding panel

---

## 10. Usage examples

### Default row

```tsx
<InvoiceRow
  name="Anna Sterling"
  avatarColor="magenta"
  phone="(650) 555 - 1234"
  balance="$222.81"
  defaultAction="Receive payment"
  selectedAction="Create invoice"
  onAction={handleAction}
  onMore={handleMore}
  onOpen={handleOpen}
/>
```

### Selected row

```tsx
<InvoiceRow
  name="Anna Sterling"
  avatarColor="magenta"
  phone="(650) 555 - 1234"
  balance="$222.81"
  defaultAction="Receive payment"
  selectedAction="Create invoice"
  isSelected
  onAction={handleAction}
  onMore={handleMore}
  onOpen={handleOpen}
/>
```

### Parent-controlled list

```tsx
const [selectedId, setSelectedId] = useState<string | null>("row-3");

<div className="flex flex-col gap-1">
  {invoices.map((invoice) => (
    <InvoiceRow
      key={invoice.id}
      name={invoice.name}
      avatarColor={colorForUser(invoice.id)}
      phone={invoice.phone}
      balance={invoice.balance}
      defaultAction="Receive payment"
      selectedAction="Create invoice"
      isSelected={selectedId === invoice.id}
      onOpen={() => setSelectedId(invoice.id)}
      onAction={() => handleAction(invoice.id)}
      onMore={() => handleMore(invoice.id)}
    />
  ))}
</div>
```

---

## 11. Related components

- **AvatarCircle** — identity primitive
- **PillButton** — primary action
- **CircularIconButton** — secondary row actions
- **GlassPanel** — common list surface
- **PanelHeader** — sits above the row list

---

## 12. Open questions / implementation notes

- **Whole-row selection behavior:** keep parent-owned unless repeated enough to justify a separate interactive row variant
- **Hover surface:** add only if readability or discoverability actually needs it
- **Responsive behavior:** still intentionally out of scope
- **Action pill density:** validate during assembly that `size="sm"` feels correct in context

---

**Status:** final packaged

---
---
---







