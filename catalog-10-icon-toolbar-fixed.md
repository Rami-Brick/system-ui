# Icon Toolbar

**Tier:** Compound  
**Path:** `/catalog/compounds/icon-toolbar.md`  
**Occurrences on reference screen:** 2

**Appears in:**
- page header — 9-icon horizontal toolbar (flask, paper plane, calendar, database, phone, plus, star, share, search)
- left panel header — 3-icon right-aligned action group (refresh, upload, edit)
- right panel detail header — 4-icon action group (paperclip, send, upload, edit)

---

## 1. Purpose

The **grouped icon action compound**. Icon Toolbar wraps a set of `CircularIconButton` instances into a semantically meaningful, consistently spaced horizontal row.

Its value is not in inventing a new visual treatment. The buttons already look correct on their own. Its value is in:

1. **consistent spacing** — toolbar spacing should not be a one-off `gap-*` decision
2. **group semantics** — a set of related icon-only actions should be announced as a group, not as a random sequence of isolated buttons
3. **ordering discipline** — the toolbar should present actions in a stable, intentional sequence

If Icon Toolbar drifts toward:
- mixing icon buttons with pill buttons in the same instance
- carrying its own surface (background, border, pill outline)
- being used for single-button cases
- arbitrary per-button spacing overrides
- becoming a dumping ground for too many unrelated actions

…it stops being a system pattern and becomes ad hoc grouping.

---

## 2. Composition

### Primitive used
- `CircularIconButton` (one per action)

### How they’re composed
The compound wraps buttons in a lightweight horizontal container with:

- a token-driven gap
- a required `aria-label`
- an explicit horizontal orientation
- optional toolbar semantics via `role="toolbar"`

### Important semantics note
This compound is intended as a **lightweight grouped action row**.

By default, it uses `role="toolbar"` because the actions are related and benefit from grouped announcement. However, this kit does **not** currently implement full ARIA toolbar keyboard behavior such as arrow-key navigation between items.

So the current pattern should be understood as:

> **semantic grouping with standard Tab navigation, not a fully managed roving-tabindex toolbar widget.**

If stricter production-grade toolbar semantics become necessary later, this is the place to add them.

### What the compound changes
The buttons keep:
- their own variants
- their own sizes
- their own states
- their own `aria-label`s

The compound adds only:
- grouping semantics
- spacing rules
- ordering discipline

---

## 3. Anatomy

```text
role="toolbar" aria-label="..."
┌───────────────────────────────────────────┐
│  [○]   [○]   [○]   [○]   [○]   [○]   [○] │
│   ↑     ↑              gap (token-driven) │
│  CIB   CIB                                │
└───────────────────────────────────────────┘
```

### Parts
1. **Container** — grouped horizontal wrapper
2. **Buttons** — `CircularIconButton` instances provided as children

### Core rules
- All buttons in one toolbar should use the **same size**
- Variants should usually stay consistent within one toolbar instance
- The toolbar carries **no visual surface of its own**
- Toolbars are **horizontal**
- Minimum 2 buttons
- Button order should follow either:
  - most-used / most-important → less-used
  - or a natural task flow from left to right

---

## 4. Density variants

Two density levels are currently needed.

### `default`
**Used for:** the looser 9-icon page header toolbar.
- Gap: `8px` (`gap-2`)
- Best for exploratory or broader page-level action groups

### `tight`
**Used for:** compact panel-local action groups.
- Gap: `4px` (`gap-1`)
- Best for tightly related record/list actions

**Default:** `default`

### Density rule
Choose density based on **relationship and context**, not raw button count.

---

## 5. What is intentionally not part of this compound

- **Visual grouping surface** — no outer pill, border, or background
- **Mixed button families** — if text buttons appear, this is a different compound
- **Dividers** between buttons or subgroups
- **Overflow/collapse logic**
- **Full ARIA toolbar keyboard management**
- **Active-tool state management**
- **Very large heterogeneous action sets** — if the group gets too long or too semantically mixed, split it into smaller groups or a different compound

This compound should stay simple and focused.

---

## 6. States

Icon Toolbar is primarily a **container**. Visual states belong to the buttons inside it.

| State | Treatment |
|---|---|
| default | transparent container, grouped buttons at rest |
| disabled group | pass `disabled` to each button individually; the container does not disable children by itself |

### Accessibility requirements
- `aria-label` is required
- `aria-orientation="horizontal"` should be explicit
- `role="toolbar"` is used as a lightweight grouping semantic
- each button inside still needs its own `aria-label`

---

## 7. Token dependencies

No new tokens.

| Value | Tailwind class | Token mapping |
|---|---|---|
| `default` gap | `gap-2` | `space.2` (8px) |
| `tight` gap | `gap-1` | `space.1` (4px) |

---

## 8. Do / don’t

### Do
- give the group a meaningful `aria-label`
- keep button size consistent within one toolbar
- use `tight` for local contextual action groups
- use `default` for broader page-level toolbars
- order buttons intentionally
- keep the group horizontal

### Don’t
- don’t add an outer background or pill around the toolbar
- don’t mix `PillButton` with icon buttons here
- don’t use a toolbar for a single button
- don’t override gap per item
- don’t let the group grow into an overstuffed action dump
- don’t claim full toolbar keyboard behavior until it actually exists

---

## 9. Code

```tsx
// components/compounds/IconToolbar.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const iconToolbar = cva("flex flex-row items-center", {
  variants: {
    density: {
      default: "gap-2",
      tight: "gap-1",
    },
  },
  defaultVariants: {
    density: "default",
  },
});

export interface IconToolbarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconToolbar> {
  /**
   * Required. Describes the purpose of the grouped actions.
   * Examples: "Page actions", "Invoice actions", "List management actions"
   */
  "aria-label": string;
  /** Expected children: CircularIconButton instances. */
  children: ReactNode;
}

export const IconToolbar = forwardRef<HTMLDivElement, IconToolbarProps>(
  ({ density, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="toolbar"
        aria-orientation="horizontal"
        className={cn(iconToolbar({ density }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

IconToolbar.displayName = "IconToolbar";
```

### Notes on the code
- The compound is intentionally minimal
- Buttons keep their own behavior; the container only adds grouping and spacing
- Children are documented rather than strongly typed to a specific component
- Full arrow-key toolbar behavior is intentionally out of scope for v1

---

## 10. Usage examples

### 9-icon page header toolbar

```tsx
import {
  FlaskConical, Send, Calendar, Database,
  Phone, Plus, Star, Share2, Search
} from "lucide-react";

<IconToolbar aria-label="Page actions">
  <CircularIconButton icon={<FlaskConical />} aria-label="Lab" />
  <CircularIconButton icon={<Send />} aria-label="Send" />
  <CircularIconButton icon={<Calendar />} aria-label="Calendar" />
  <CircularIconButton icon={<Database />} aria-label="Database" />
  <CircularIconButton icon={<Phone />} aria-label="Phone" />
  <CircularIconButton icon={<Plus />} aria-label="Add" />
  <CircularIconButton icon={<Star />} aria-label="Favorite" />
  <CircularIconButton icon={<Share2 />} aria-label="Share" />
  <CircularIconButton icon={<Search />} aria-label="Search" />
</IconToolbar>
```

### Left panel header action group (tight, light variant)

```tsx
import { RefreshCw, Upload, Pencil } from "lucide-react";

<IconToolbar density="tight" aria-label="List management actions">
  <CircularIconButton variant="light" icon={<RefreshCw />} aria-label="Refresh list" />
  <CircularIconButton variant="light" icon={<Upload />} aria-label="Upload" />
  <CircularIconButton variant="light" icon={<Pencil />} aria-label="Edit list" />
</IconToolbar>
```

### Right panel detail header actions (tight, default/glass-style variants)

```tsx
import { Paperclip, Send, Upload, Pencil } from "lucide-react";

<IconToolbar density="tight" aria-label="Invoice record actions">
  <CircularIconButton icon={<Paperclip />} aria-label="Attach file" />
  <CircularIconButton icon={<Send />} aria-label="Send invoice" />
  <CircularIconButton icon={<Upload />} aria-label="Upload" />
  <CircularIconButton icon={<Pencil />} aria-label="Edit invoice" />
</IconToolbar>
```

### Disabled grouped actions

```tsx
import { RefreshCw, Upload, Pencil } from "lucide-react";

<IconToolbar aria-label="Record actions" aria-disabled="true">
  <CircularIconButton icon={<RefreshCw />} aria-label="Refresh" disabled />
  <CircularIconButton icon={<Upload />} aria-label="Upload" disabled />
  <CircularIconButton icon={<Pencil />} aria-label="Edit" disabled />
</IconToolbar>
```

---

## 11. Related components

- **CircularIconButton** — the only primitive used here
- **PanelHeader** *(future compound)* — natural host for tight toolbars
- **NavTabGroup** *(future compound)* — analogous grouping pattern for pill-based navigation, not icon-only actions

---

## 12. Open questions / implementation notes

- **Arrow-key navigation:** add only if production accessibility requirements justify roving tabindex complexity
- **Mixed variants in one toolbar:** currently guidance-only, not enforced; document explicitly later only if a real mixed pattern is needed
- **Segmented toggle:** visually adjacent but behaviorally different; keep separate
- **Vertical toolbars:** out of scope until a real need appears

---

**Status:** draft — awaiting validation
