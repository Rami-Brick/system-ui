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
// design-kit/compounds/NavTabGroup.tsx
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils/cn";
import { PillButton } from "../primitives/PillButton";

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
- **TopNav** — hosts this group in the full navigation bar
- **SegmentedToggle / TabPanel** *(future compounds)* — for non-navigation tab-like interfaces

---

## 10. Open questions / implementation notes

- **Anchor-friendly rendering:** likely future enhancement if true link navigation becomes common
- **Disabled tab usage:** should stay rare
- **Large nav sets:** switch patterns rather than stretching this compound too far

---

**Status:** final packaged

---
---
---







