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
// design-kit/compounds/SegmentedToggle.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { CircularIconButton } from "../primitives/CircularIconButton";

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

**Status:** final packaged

---
---
---







