# Circular Icon Button

**Tier:** Primitive (foundational)  
**Path:** `/catalog/primitives/circular-icon-button.md`  
**Occurrences on reference screen:** 15+

**Appears in:** top nav utilities (share, bell) · page header back button · 9-icon page toolbar · panel header actions (refresh, upload, edit, add) · invoice detail header (paperclip, send, upload, edit, ellipsis, close) · row ellipsis and open-link actions · split CTA `+` appended to primary button.

---

## 1. Purpose

The **core foundational control** of the system.

It is the default answer whenever the interface needs an icon-only action. Its repetition — same silhouette, same sizing logic, same surface grammar — is one of the strongest identity markers of the entire UI.

If this component drifts toward:
- square corners
- inconsistent sizing
- generic component-library styling
- over-decorated shadows or effects

…the whole kit loses its distinctiveness.

---

## 2. Anatomy

```text
┌─────────────────────────────┐
│     focus ring (state)      │
│   ┌─────────────────────┐   │
│   │  circular surface   │   │  <button>
│   │         icon        │   │    <Icon />
│   └─────────────────────┘   │  </button>
└─────────────────────────────┘
```

### Parts
1. **Container** — semantic `<button>` element
2. **Surface** — circular visual body, variant-dependent
3. **Icon** — centered, proportional, inherits `currentColor`
4. **Focus ring** — appears only for keyboard-visible focus states

### Core rules
- Shape is **always a perfect circle**
- Icon is **always optically centered**
- This component is **never stretched into an oval**
- This component is **never used for text labels**

---

## 3. Variants

Three variants cover all observed uses on the reference screen.

### `glass` — dark frosted default

**Used for:** top nav utilities, 9-icon page toolbar, back button, row ellipsis/arrow, detail panel close and ellipsis.

- Background: `rgba(255,255,255,0.06)` → `surface.control`
- Border: subtle 1px white at low opacity
- Icon color: `#FFFFFF` → `text.primary`
- Visual role: low-noise, blends into the dark canvas while preserving shape language

This is the system default.

---

### `light` — white/high-contrast

**Used for:** left panel header `+`, right-side actions (refresh, upload, edit), invoice detail header actions, some emphasized toolbar actions.

- Background: `rgba(255,255,255,0.95)` → `surface.control-inverse`
- No visible border
- Icon color: `#0B0B0B` → `text.inverse`
- Visual role: high-contrast, draws attention to actions that should pop against dark surfaces

---

### `solid` — near-black on light surface

**Used for:** the `+` circle appended to the `New Customer` CTA pill.

- Background: `#0A0B0A` → `bg.app`
- No visible border
- Icon color: `#FFFFFF` → `text.primary`
- Visual role: nested action that must remain legible inside a light parent container

---

## 4. Sizes

| Size | Diameter | Icon size | Typical uses |
|---|---:|---:|---|
| `sm` | 32px | 16px | Row ellipsis, row open-link arrow |
| `md` | 40px | 18px | Top nav utilities, 9-icon toolbar, panel header actions, detail header actions |
| `lg` | 48px | 20px | Back button, page-level emphasized actions |

**Default size:** `md`

### Sizing rules
- Use `md` unless context clearly needs a smaller inline action or a stronger page-level button
- Icon size should scale proportionally with container size
- Do not invent one-off diameters unless a new family is formally added to tokens

---

## 5. States

### State behavior
| State | Treatment |
|---|---|
| `rest` | As defined by variant |
| `hover` | Slight increase in contrast / brightness |
| `pressed` | Slight darkening or compression response |
| `disabled` | `opacity: 0.4`, no hover, not interactive |
| `focus-visible` | 2px ring in `rgba(255,255,255,0.4)`, offset from button edge |

### Observed vs inferred
- **Observed in screenshot:** rest states, high-contrast variant differences
- **Inferred for reusable system:** hover, pressed, disabled, focus-visible

### Accessibility requirements
- Every instance **must** include an `aria-label`
- Icon-only buttons without labels are not acceptable
- Focus-visible treatment must remain clearly visible on dark and light local surfaces

---

## 6. Token dependencies

| Token | Usage |
|---|---|
| `surface.control` | Background of `glass` |
| `surface.control-inverse` | Background of `light` |
| `bg.app` | Background of `solid` |
| `text.primary` | Icon color on `glass` / `solid` |
| `text.inverse` | Icon color on `light` |
| `border.soft` | Border on `glass` |
| `radius.round` | Circular shape |
| `size.icon-sm` / `md` / `lg` | Diameter |
| `effect.blur.control` | Optional frosted treatment, if enabled |

---

## 7. Do / don’t

### Do
- keep the silhouette perfectly circular
- keep the icon optically centered
- keep sizing consistent with token families
- keep the surface visually quiet unless the variant is intentionally high-contrast
- require an `aria-label` every time

### Don’t
- don’t stretch it into an oval
- don’t attach text inside it
- don’t add heavy shadows by default
- don’t let it drift toward stock shadcn button styling
- don’t invent ad hoc colors outside the defined variant set

---

## 8. Code

```tsx
// components/primitives/CircularIconButton.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const circularIconButton = cva(
  [
    "inline-flex items-center justify-center rounded-full shrink-0",
    "transition-[background-color,transform,border-color,color] duration-150",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
    "focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        glass: [
          "bg-white/[0.06] text-white",
          "border border-white/[0.08]",
          // Use blur sparingly; remove if performance becomes an issue at scale.
          "backdrop-blur-sm",
          "hover:bg-white/[0.10]",
          "active:bg-white/[0.04]",
          "active:scale-[0.98]",
          "focus-visible:ring-offset-black",
        ],
        light: [
          "bg-white/95 text-black",
          "hover:bg-white",
          "active:bg-white/85",
          "active:scale-[0.98]",
          "focus-visible:ring-offset-black",
        ],
        solid: [
          "bg-[#0A0B0A] text-white",
          "hover:bg-[#141414]",
          "active:bg-[#050505]",
          "active:scale-[0.98]",
          "focus-visible:ring-offset-white",
        ],
      },
      size: {
        sm: "size-8 [&>svg]:size-4",
        md: "size-10 [&>svg]:size-[18px]",
        lg: "size-12 [&>svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "glass",
      size: "md",
    },
  },
);

export interface CircularIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof circularIconButton> {
  /** Icon node, typically a lucide-react icon. */
  icon: ReactNode;
  /** Required for accessibility. Describes the action performed. */
  "aria-label": string;
}

export const CircularIconButton = forwardRef<
  HTMLButtonElement,
  CircularIconButtonProps
>(({ icon, variant, size, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(circularIconButton({ variant, size }), className)}
      {...props}
    >
      {icon}
    </button>
  );
});

CircularIconButton.displayName = "CircularIconButton";
```

### Notes on the code
- Uses **CVA** for type-safe, composable variants
- Uses `forwardRef` for compatibility with tooltip, dropdown, and popover primitives
- Uses direct SVG targeting so `lucide-react` icons size automatically
- Makes `aria-label` required at the type level
- Keeps blur light and explicit, since many instances on one page may make heavier blur expensive

---

## 9. Usage examples

### Top nav utilities

```tsx
import { Send, Bell } from "lucide-react";

<div className="flex items-center gap-2">
  <CircularIconButton icon={<Send />} aria-label="Share" />
  <CircularIconButton icon={<Bell />} aria-label="Notifications" />
</div>
```

### Panel header actions

```tsx
import { RefreshCw, Upload, Pencil } from "lucide-react";

<div className="flex items-center gap-2">
  <CircularIconButton variant="light" icon={<RefreshCw />} aria-label="Refresh list" />
  <CircularIconButton variant="light" icon={<Upload />} aria-label="Upload invoices" />
  <CircularIconButton variant="light" icon={<Pencil />} aria-label="Edit list" />
</div>
```

### Back button

```tsx
import { ArrowLeft } from "lucide-react";

<CircularIconButton size="lg" icon={<ArrowLeft />} aria-label="Go back" />
```

### Row inline actions

```tsx
import { MoreHorizontal, ArrowUpRight } from "lucide-react";

<div className="flex items-center gap-1">
  <CircularIconButton size="sm" icon={<MoreHorizontal />} aria-label="More actions" />
  <CircularIconButton size="sm" icon={<ArrowUpRight />} aria-label="Open invoice" />
</div>
```

### Nested inside a light split CTA

```tsx
import { Plus } from "lucide-react";

// Temporary composition example.
// In the final catalog, prefer the dedicated Split CTA compound.
<button className="flex items-center gap-2 rounded-full bg-white/95 pl-5 pr-1 py-1 text-black">
  <span className="text-sm font-medium">New Customer</span>
  <CircularIconButton variant="solid" icon={<Plus />} aria-label="Create customer" />
</button>
```

---

## 10. Related components

- **Pill Button** — text-based counterpart in the same shape family
- **Avatar Circle** — shares circular sizing logic, but represents identity rather than action
- **Icon Toolbar** — compound composed from multiple `CircularIconButton` instances
- **Split CTA** — compound that pairs a pill action with this component’s `solid` variant

---

## 11. Open questions / implementation notes

- **Blur performance:** if many instances appear on one page, test whether button-level blur is visually worth the cost. Panel-level blur may already carry enough of the frosted effect.
- **Variant naming scalability:** `glass / light / solid` should scale better than `default / inverted / dark`, but revisit only if a new visual family actually appears.
- **Motion:** subtle press scaling is included. Validate during assembly to ensure it feels crisp, not toy-like.
- **Icon stroke weight:** some icons in the reference feel slightly lighter than default Lucide stroke. Test `strokeWidth={1.75}` later if needed.

---

**Status:** draft — awaiting validation
