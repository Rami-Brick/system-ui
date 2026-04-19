# Pill Button

**Tier:** Primitive (foundational)  
**Path:** `/catalog/primitives/pill-button.md`  
**Occurrences on reference screen:** 10+

**Appears in:** top nav active item (`Customers`) · inactive nav items (`Overview`, `Marketing`) · page header `Customer Type` · page header `New Customer` CTA (pill portion of the split) · row action buttons (`Receive payment`, `Create invoice`).

---

## 1. Purpose

The **text-action counterpart** to the Circular Icon Button.

Together they define the core button split of the system:

- **Icon-only actions → Circular Icon Button** (circle)
- **Labeled actions → Pill Button** (pill)

This split is intentional and should remain stable. If an action has text, it should almost always become a pill. If it has only a glyph, it should almost always become a circle.

If this component drifts toward:
- square or mildly rounded corners
- inconsistent heights
- too many overlapping variants
- long or wrapping labels
- non-interactive display use

…the pill stops feeling like a deliberate system choice and starts feeling incidental.

---

## 2. Anatomy

```text
┌────────────────────────────────────────┐
│         focus ring (state)             │
│   ┌──────────────────────────────┐     │
│   │  [icon]  label text  [icon]  │     │  <button>
│   │    ↑                  ↑      │     │    {leadingIcon}
│   │  optional           optional │     │    <span>label</span>
│   └──────────────────────────────┘     │    {trailingIcon}
└────────────────────────────────────────┘  </button>
```

### Parts
1. **Container** — semantic `<button>`
2. **Surface** — pill-shaped interactive body
3. **Leading icon** *(optional)* — small glyph before the label
4. **Label** — single-line action text
5. **Trailing icon** *(optional)* — small glyph after the label
6. **Focus ring** — keyboard-visible focus treatment

### Core rules
- Shape is **always fully rounded** (`radius.pill`)
- Height is **always token-driven**
- Label is **single-line only**
- Icons, if present, stay visually subordinate to the label
- This component is **interactive only**
- Display-only pill content belongs to a separate primitive such as **PillStat**

---

## 3. Variants

This primitive should stay intentionally narrow. The reference screen strongly supports three action variants here.

### `light` — white/high-contrast default

**Used for:** active nav item (`Customers`), row action pills (`Receive payment`, `Create invoice`), primary CTA pill portion (`New Customer`).

- Background: `rgba(255,255,255,0.95)` → `surface.control-inverse`
- Text: `#0B0B0B` → `text.inverse`
- Font weight: medium (500)
- No visible border
- Visual role: primary/default labeled action on dark surfaces

This is the system default.

---

### `glass` — dark frosted secondary

**Used for:** `Customer Type` dropdown trigger, and other quiet secondary actions on dark surfaces.

- Background: `rgba(255,255,255,0.06)` → `surface.control`
- Border: subtle 1px white at low opacity → `border.soft`
- Text: `#FFFFFF` → `text.primary`
- Font weight: medium (500)
- Visual role: secondary action that blends into the dark canvas while preserving the pill silhouette

---

### `ghost` — minimal at rest

**Used for:** inactive nav items (`Overview`, `Marketing`).

- Background: transparent at rest
- No visible border
- Text: `rgba(255,255,255,0.80)` → dimmed `text.primary`
- Font weight: medium (500)
- On hover: faint pill background appears
- Visual role: inactive or low-emphasis navigation state, designed to swap cleanly into `light` when active

This is not truly “containerless”; it is better understood as **minimal at rest**.

---

## 4. What is intentionally not part of this primitive

The loud lime/chartreuse pills in the reference screen read more like **display emphasis** than standard action buttons.

That means:

- the totals-row pills (`Sub Total`, `Total`, `Balance Due`) should belong to **PillStat** or another display primitive / compound
- this component should remain focused on **interactive labeled actions**
- if a real product need proves there is a true need for an interactive accent pill, it can be added later as a justified extension, not as a default primitive variant

This keeps the button system cleaner and reduces future overuse of accent.

---

## 5. Sizes

| Size | Height | Padding X | Label | Typical uses |
|---|---:|---:|---|---|
| `sm` | 32px | 12px | `text-xs` | Dense inline contexts |
| `md` | 40px | 20px | `text-sm` | Default: nav, row actions, most CTAs |
| `lg` | 48px | 24px | `text-base` | Hero CTAs, stronger page-level actions |

**Default size:** `md`

### Sizing rules
- Use `md` unless density or emphasis clearly requires `sm` or `lg`
- Height is fixed per size; do not override with ad hoc class names
- Horizontal padding scales with height
- Icon size:
  - `sm` / `md` → `16px`
  - `lg` → `18px`
- Do not invent one-off sizes outside the token family

---

## 6. States

### State behavior

| State | Treatment |
|---|---|
| `rest` | As defined by variant |
| `hover` | Slight increase in contrast / visibility |
| `pressed` | Slight darkening + subtle compression |
| `disabled` | `opacity: 0.4`, no hover, not interactive |
| `focus-visible` | 2px ring in `rgba(255,255,255,0.4)`, offset from edge |

### Observed vs inferred
- **Observed in screenshot:** rest states for `light`, `glass`, and `ghost`; active/inactive nav swap behavior
- **Inferred for reusable system:** hover, pressed, disabled, focus-visible

### Accessibility requirements
- Label text must meet contrast requirements against its background
- Disabled state must be paired with `disabled` and `aria-disabled` where appropriate
- Keyboard focus must remain visible on both dark and light local surfaces
- Labels should stay concise and descriptive

---

## 7. Label and content rules

### Label casing
- Default to **normal UI title/sentence casing**, not all caps
- Preserve product/content casing only when the actual label requires it
- Avoid decorative casing patterns that fight the clean system tone

### Label length
- Prefer short labels
- Pills are actions, not explanatory containers
- If the label starts feeling like a sentence, the component is likely the wrong choice

### Icon usage
- Leading and trailing icons are optional
- Use trailing icons for directional or disclosure cues
- Do not overload a pill with multiple icons unless the pattern is formally documented

---

## 8. Token dependencies

| Token | Usage |
|---|---|
| `surface.control-inverse` | Background of `light` |
| `surface.control` | Background of `glass` |
| `text.primary` | Text on `glass`, `ghost` |
| `text.inverse` | Text on `light` |
| `border.soft` | Border on `glass` |
| `radius.pill` | Shape |
| `size.pill-sm` / `md` / `lg` | Height |
| `font.body-md` / `body-sm` | Label typography |

---

## 9. Do / don’t

### Do
- use `light` as the default action pill
- use `glass` for quiet secondary actions
- use `ghost` mainly in navigation-like active/inactive contexts
- keep labels short and readable
- pair this with Circular Icon Button for Primary CTAs

### Don’t
- don’t use this for display-only stats or totals
- don’t introduce accent styling here unless a real product need proves it is truly needed
- don’t let labels wrap
- don’t invent extra sizes or colors casually
- don’t let it drift toward a generic rounded rectangle button

---

## 10. Code

```tsx
// design-kit/primitives/PillButton.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

const pillButton = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-full shrink-0",
    "font-medium whitespace-nowrap select-none",
    "transition-[background-color,transform,border-color,color] duration-150",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
    "focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        light: [
          "bg-white/95 text-black",
          "hover:bg-white",
          "active:bg-white/85",
          "active:scale-[0.98]",
          "focus-visible:ring-offset-black",
        ],
        glass: [
          "bg-white/[0.06] text-white",
          "border border-white/[0.08]",
          "hover:bg-white/[0.10]",
          "active:bg-white/[0.04]",
          "active:scale-[0.98]",
          "focus-visible:ring-offset-black",
        ],
        ghost: [
          "bg-transparent text-white/80",
          "hover:bg-white/[0.04] hover:text-white",
          "active:bg-white/[0.02]",
          "active:scale-[0.98]",
          "focus-visible:ring-offset-black",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs [&_svg]:size-4",
        md: "h-10 px-5 text-sm [&_svg]:size-4",
        lg: "h-12 px-6 text-base [&_svg]:size-[18px]",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "md",
    },
  },
);

export interface PillButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pillButton> {
  /** Optional icon rendered before the label. */
  leadingIcon?: ReactNode;
  /** Optional icon rendered after the label. */
  trailingIcon?: ReactNode;
}

export const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  (
    { leadingIcon, trailingIcon, children, variant, size, className, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(pillButton({ variant, size }), className)}
        {...props}
      >
        {leadingIcon && <span className="shrink-0">{leadingIcon}</span>}
        <span>{children}</span>
        {trailingIcon && <span className="shrink-0">{trailingIcon}</span>}
      </button>
    );
  },
);

PillButton.displayName = "PillButton";
```

### Notes on the code
- Uses CVA for variant and size consistency
- Keeps API parallel to `CircularIconButton`
- Enforces single-line behavior with `whitespace-nowrap`
- Sizes icons by size tier, including a slightly larger icon on `lg`
- Current focus ring offset assumes a dark local surface; if later compounds place this on light surfaces often, abstract ring-offset behavior into a shared strategy

---

## 11. Usage examples

### Active nav item

```tsx
<PillButton variant="light">Customers</PillButton>
```

### Inactive nav item

```tsx
<PillButton variant="ghost">Overview</PillButton>
```

### Secondary trigger with trailing chevron

```tsx
import { ChevronDown } from "lucide-react";

<PillButton variant="glass" trailingIcon={<ChevronDown />}>
  Customer Type
</PillButton>
```

### Row action

```tsx
<PillButton variant="light" size="md">Receive payment</PillButton>
```

### Hero CTA — pill portion only

The `New Customer +` pattern is a **Primary CTA** compound — a `light` pill paired with a `solid` Circular Icon Button. The pill portion on its own looks like:

```tsx
<PillButton variant="light">New Customer</PillButton>
```

Use `PrimaryCTA` for the full pattern.

---

## 12. Related components

- **Circular Icon Button** — icon-only counterpart in the same shape family
- **Primary CTA** *(compound)* — composes this component’s `light` variant with a `solid` Circular Icon Button
- **PillStat** — display-only pill used for totals and emphasized values
- **Nav Tab Group** *(compound)* — built from `PillButton` instances in `light` / `ghost` states

---

## 13. Open questions / implementation notes

- **Variant naming:** `light / glass / ghost` stays consistent with Circular Icon Button and reads clearly enough for this primitive
- **Focus ring strategy:** if more light-surface use cases appear later, extract ring-offset handling into a shared pattern rather than patching via `className`
- **Large-size icon balance:** `18px` is the current choice for `lg`; validate during assembly
- **Ghost usage limits:** keep this mostly in nav-like contexts unless a clear new pattern emerges

---

**Status:** final packaged





