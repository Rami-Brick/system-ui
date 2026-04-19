# Glass Panel

**Tier:** Primitive (foundational)  
**Path:** `/catalog/primitives/glass-panel.md`  
**Occurrences on reference screen:** 2 direct + ambient glow backdrop

**Appears in:** left `All Invoices` list panel (`glass` variant) · right `INV-00120` detail panel (`raised` variant) · implied selected-row sub-surface (via `surface.glass-selected`, handled elsewhere).

---

## 1. Purpose

The **surface primitive** of the system. Every major content region on the reference screen sits on a Glass Panel.

Its job is to create **layered contrast without hard separation**. Instead of using solid cards, heavy shadows, or obvious borders, this design creates depth through translucent frosted planes stacked over a dark atmospheric canvas.

If this component drifts toward:
- solid opaque fills
- generic card styling
- harsh borders
- inconsistent radii
- flat translucency with no frosted feel

…the whole kit loses its premium, layered character and starts reading like a generic dark dashboard.

---

## 2. Anatomy

```text
┌──────────────────────────────────────────────┐
│        ambient glow (external, optional)     │
│    ┌────────────────────────────────────┐    │
│    │   soft 1px edge                    │    │
│    │   ┌────────────────────────────┐   │    │  <div> / <section> / <aside>
│    │   │  translucent frosted body  │   │    │    {children}
│    │   │  (consumer controls padding)│  │    │
│    │   └────────────────────────────┘   │    │
│    └────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

### Parts
1. **Container** — semantic wrapper (`<div>` by default, polymorphic via `asChild`)
2. **Surface** — translucent body with frosted blur treatment
3. **Edge** — soft 1px border that defines the panel without boxing it
4. **Ambient glow** *(external, optional)* — large blurred color field placed *behind* the panel

### Core rules
- Shape is **always a large-radius rounded rectangle**
- Surface is **always translucent**
- Edge is **always soft**
- Frosted blur is part of the intended look; reduce only when performance constraints make it necessary
- Padding is **not** built into the primitive

---

## 3. Variants

Two variants mirror the observed surface hierarchy on the reference screen.

### `glass` — base translucent surface

**Used for:** primary content panels, list views, secondary regions.  
**Reference:** left `All Invoices` panel.

- Background: `rgba(255,255,255,0.04)` → `surface.glass`
- Border: 1px `rgba(255,255,255,0.08)` → `border.soft`
- Blur: `effect.blur.panel`
- Visual role: default content container; quiet and atmospheric

This is the system default.

---

### `raised` — emphasized translucent surface

**Used for:** detail views, active regions, foreground-emphasis panels.  
**Reference:** right `INV-00120` detail panel.

- Background: `rgba(255,255,255,0.07)` → `surface.glass-raised`
- Border: 1px `rgba(255,255,255,0.08)` → `border.soft`
- Blur: `effect.blur.panel`
- Visual role: slightly more opaque / more forward than `glass`

The difference between `glass` and `raised` should stay **subtle**. This is gentle layering, not loud stacking.

---

## 4. What is intentionally not part of this primitive

The following responsibilities belong elsewhere:

- **Headers / titles / actions** — future `PanelHeader` compound
- **Padding** — controlled by the consumer (`p-6`, `p-8`, etc.)
- **Scrolling** — controlled by layout/composition
- **Interactivity** — clickable panels should be handled at composition level
- **Ambient glow** — external pattern, not a built-in prop
- **Selected row sub-surfaces** — handled by compounds such as `InvoiceRow`

This primitive should remain a **surface**, not a miniature layout system.

---

## 5. Layout and density expectations

Glass Panel does not define width, height, or internal spacing, but it is expected to support two common density profiles in this kit:

### Tighter density
Used for list panels, tables, row-heavy surfaces.
- Typical padding: `p-6` or `px-6 py-4`
- Feels structured and efficient

### Looser density
Used for detail views and content-rich regions.
- Typical padding: `p-8`
- Feels calmer and more premium

The primitive itself does not encode these modes; they are composition-level choices.

---

## 6. Size and radius model

Glass Panel does **not** expose a `size` prop. Panels are sized by layout, not by token tiers.

### Token-driven
- **Radius** — fixed to `radius.panel`
- **Border width** — fixed at 1px
- **Blur treatment** — from `effect.blur.panel`

### Consumer-controlled
- width
- height
- grid/flex placement
- internal padding
- overflow/scrolling

### Radius decision
For consistency, this primitive should lock to **28px** radius in implementation rather than leaving the final shape ambiguous.

That means the code should prefer:
- `rounded-[28px]`

…instead of relying on a nearby utility like `rounded-3xl` and treating the exact radius as still undecided.

---

## 7. States

Glass Panel is a **static surface primitive**.

### Observed vs inferred
- **Observed in screenshot:** `glass`, `raised`
- **Not applicable:** hover, pressed, focus-visible, disabled

### Accessibility requirements
- Prefer semantic elements via `asChild` when the panel represents a real document region
- Default `<div>` is fine for purely structural surfaces
- Contrast should be evaluated against the panel’s translucent surface, not only the page background

---

## 8. Ambient glow — documented pattern

The reference screen shows a green/teal glow behind the left panel. This is an **environmental pattern**, not a panel prop.

### How it works
A blurred color field sits *behind* the panel inside the same relative container. The panel’s frosted treatment softens and refracts it visually.

```tsx
<div className="relative">
  <div
    aria-hidden="true"
    className="absolute -inset-8 -z-10 rounded-[40px] bg-[rgba(154,255,90,0.10)] blur-3xl"
  />

  <GlassPanel className="p-6">
    {/* content */}
  </GlassPanel>
</div>
```

### Ambient glow rules
- Use sparingly — usually once per page
- Prefer cool greens/teals from the atmosphere tokens
- Keep glow behind the panel
- Mark it `aria-hidden`

---

## 9. Nesting guidance

### Safe pattern
- `raised` inside `glass` can read well as a focused sub-region inside a broader surface

### Caution pattern
- `glass` inside `raised` is **not forbidden**, but should be treated with caution
- In many cases it can feel like the inner surface is visually sinking rather than clarifying hierarchy
- Use it only when the hierarchy has been intentionally tested and still reads clearly

### Avoid
- deep panel stacks
- tiny inline “glass cards” that inherit the full panel radius/blur treatment
- more than two visible depth levels on one screen unless there is a very strong reason

---

## 10. Token dependencies

| Token | Usage |
|---|---|
| `surface.glass` | Background of `glass` |
| `surface.glass-raised` | Background of `raised` |
| `border.soft` | Panel edge |
| `radius.panel` | Corner radius |
| `effect.blur.panel` | Frosted blur treatment |
| `glow.green` / `glow.teal` | Ambient glow pattern |

---

## 11. Do / don’t

### Do
- use `glass` as the default
- use `raised` only for genuinely more foreground surfaces
- let parents control layout and spacing
- use semantic elements via `asChild` when appropriate
- keep the hierarchy subtle

### Don’t
- don’t replace translucency with a solid fill
- don’t use hard borders or heavy card shadows
- don’t bake padding into the primitive
- don’t over-stack panel layers
- don’t use Glass Panel for small inline elements where the blur/radius treatment becomes too heavy

---

## 12. Code

```tsx
// design-kit/primitives/GlassPanel.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils/cn";

const glassPanel = cva(
  [
    "rounded-[28px] border border-white/[0.08]",
    // Blur is part of the intended look, but may be reduced later if profiling demands it.
    "backdrop-blur-xl",
  ],
  {
    variants: {
      variant: {
        glass: "bg-white/[0.04]",
        raised: "bg-white/[0.07]",
      },
    },
    defaultVariants: {
      variant: "glass",
    },
  },
);

export interface GlassPanelProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassPanel> {
  /**
   * Pragmatic polymorphism:
   * when true, the panel renders as its single child element via Radix Slot.
   * Typing remains HTMLDivElement-based for simplicity.
   */
  asChild?: boolean;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ asChild, variant, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(glassPanel({ variant }), className)}
        {...props}
      />
    );
  },
);

GlassPanel.displayName = "GlassPanel";
```

### Notes on the code
- Locks the radius to **28px** for consistency with the audit
- Keeps blur in the primitive because it is part of the visual identity
- Uses Radix `Slot` for pragmatic semantic polymorphism
- Keeps typing intentionally simple even with `asChild`
- Leaves padding, overflow, and layout entirely to the consumer

---

## 13. Usage examples

### Default list panel

```tsx
<GlassPanel className="p-6">
  {/* list content */}
</GlassPanel>
```

### Raised detail panel

```tsx
<GlassPanel variant="raised" className="p-8">
  {/* detail content */}
</GlassPanel>
```

### Semantic panel

```tsx
<GlassPanel asChild className="p-6">
  <aside aria-labelledby="invoice-detail-title">
    <h2 id="invoice-detail-title">Invoice INV-00120</h2>
    {/* ... */}
  </aside>
</GlassPanel>
```

### Panel with ambient glow

```tsx
<div className="relative">
  <div
    aria-hidden="true"
    className="absolute -inset-8 -z-10 rounded-[40px] bg-[rgba(154,255,90,0.10)] blur-3xl"
  />
  <GlassPanel className="p-6">
    {/* content */}
  </GlassPanel>
</div>
```

### Safe nested hierarchy

```tsx
<GlassPanel className="p-6">
  <GlassPanel variant="raised" className="p-4">
    {/* focused sub-region */}
  </GlassPanel>
</GlassPanel>
```

### Avoid overusing as tiny inline cards

```tsx
// Avoid this pattern unless you deliberately want a heavy glass treatment on a very small element.
<div className="flex gap-2">
  <GlassPanel className="px-3 py-2">Small tag-like thing</GlassPanel>
  <GlassPanel className="px-3 py-2">Another tiny card</GlassPanel>
</div>
```

---

## 14. Related components

- **PanelHeader** — title + actions inside a Glass Panel
- **CircularIconButton** — common panel header action primitive
- **PillButton** — common panel header / row action primitive
- **AvatarCircle** — common identity primitive displayed inside panels
- **SelectedRow** *(future compound)* — sub-surface treatment inside panels

---

## 15. Open questions / implementation notes

- **Blur performance at scale:** if a page uses many Glass Panels, reduce blur strength or disable on constrained devices after profiling
- **Ambient glow promotion:** only turn glow into a primitive if it repeats enough to justify it
- **Selected sub-surface:** still belongs to compounds, not here
- **Light theme:** out of scope unless it becomes a real requirement

---

**Status:** final packaged





