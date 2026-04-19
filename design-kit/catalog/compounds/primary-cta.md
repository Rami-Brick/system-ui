# Primary CTA

**Tier:** Compound  
**Path:** `/catalog/compounds/primary-cta.md`  
**Occurrences on reference screen:** 1

**Appears in:** page header right-side actions — `New Customer +` (white pill with a dark circular `+` nested at the right edge).

---

## 1. Purpose

The **primary call-to-action compound** of the system.

Primary CTA combines two core shape signals from the kit — the pill and the circle — into one continuous action shape. Its role is narrow but high-importance: it is the treatment reserved for the **single most important action on a page**.

On the reference screen, that action is `New Customer`. On other pages it might be:
- `Send Invoice`
- `Connect Account`
- `Create Project`

The pattern works because it feels more deliberate and weighty than a plain pill button, while still staying inside the system’s established shape language.

If Primary CTA drifts toward:
- multiple instances on the same page
- secondary or tertiary actions
- destructive actions
- detached circle + pill composition
- accent/lime styling
- long labels that make the circle read like an appended extra control

…it stops functioning as the page’s primary action and becomes decoration.

---

## 2. Naming and behavior

The approved name is **Primary CTA** because the component communicates one page-level action. Although the shape has a label area and a trailing circular emphasis area, the behavior is unified:

- one real button
- one click target
- one accessible label
- one action

A future two-action button can exist later as a separate pattern if real product needs justify it, but it should not be folded into this component.

---

## 3. Composition

### Visual sources
Primary CTA is visually derived from:

- `PillButton` with `variant="light"` — the text portion
- `CircularIconButton` with `variant="solid"` — the nested circle treatment

### Important implementation note
In the approved **unified** version of this compound:

- the **pill portion is not rendered via `PillButton` directly**
- the **circle portion is not rendered via `CircularIconButton` directly**

Instead, the compound renders one real `<button>` and recreates the two visual regions inside it.

This is intentional.

Why:
- the whole control triggers **one action**
- nesting an actual button inside a button would be invalid HTML
- the inner circle is **visual emphasis**, not a separate interactive control

So this compound is best understood as:

> **visually derived from existing primitives, implemented as one honest unified button with compound-specific glue styling.**

### What the compound preserves
Even though the inner parts are not directly mounted as primitives in unified mode, the compound preserves their visual logic:

- light pill surface
- dark circular trailing emphasis
- shared rounded silhouette
- consistent height with the underlying button family

---

## 4. Anatomy

```text
┌─────────────────────────────────────────────┐
│                                             │
│   New Customer                    ╭─────╮   │
│   label area                      │  +  │   │
│                                   ╰─────╯   │
│                                             │
└─────────────────────────────────────────────┘
   ↑ one outer button
   ↑ one continuous pill silhouette
   ↑ nested circle is decorative emphasis
```

### Parts
1. **Outer button** — single interactive element
2. **Label region** — light pill body with the action text
3. **Trailing emphasis circle** — dark circular region containing the icon

### Core rules
- The silhouette reads as **one continuous pill**
- The circle is visually **nested**, not adjacent
- The icon is always **trailing** in LTR layouts
- Label and icon must agree semantically
- Only **one Primary CTA per page**

---

## 5. What is intentionally not part of this compound

- **Two-action split behavior** — not part of v1; if needed later, make a separate compound
- **Size variants** — only the observed medium size is approved
- **Accent/lime styling** — reserved for `PillStat.accent`
- **Dark/glass versions** — would weaken the pattern’s primary-action contrast
- **Leading icon layouts** — use `PillButton` for that
- **Menu expansion behavior** — future pattern if needed
- **Loading state** — defer until a real need appears during assembly

This compound should stay singular, obvious, and high-signal.

---

## 6. Content rules

### Label length
Labels should stay short, ideally **1–3 words** in the common case.

Good:
- `New Customer`
- `Send Invoice`
- `Add Entry`

Risky:
- `Create a new customer record`
- `Send this invoice to the selected contact`

If the label gets long enough that the circle starts to read as detached or appended, use a different action pattern.

### Icon rules
- Icon should reinforce the label semantically
- Simple glyphs work best: `+`, send, arrow
- The icon is emphasis, not explanation

---

## 7. States

Primary CTA is a **unified action control**.

### Observed vs inferred
- **Observed in screenshot:** unified behavior, light body, dark trailing circle
- **Inferred for reusable system:** hover, pressed, disabled, focus-visible

### State behavior
- `rest` — light body + dark circle
- `hover` — body brightens slightly, circle brightens with it
- `pressed` — subtle compression, both regions respond together
- `disabled` — full compound dims and becomes non-interactive
- `focus-visible` — one focus ring around the outer silhouette

### Accessibility requirements
- The whole compound is one `<button>`
- One `aria-label` describes the action
- The inner circle is decorative and `aria-hidden`

---

## 8. Token dependencies

Derived from existing primitives; no new tokens required.

| Token | Source | Usage |
|---|---|---|
| `surface.control-inverse` | PillButton `light` | Main body background |
| `text.inverse` | PillButton `light` | Label color |
| `bg.app` | CircularIconButton `solid` | Trailing circle background |
| `text.primary` | CircularIconButton `solid` | Icon color |
| `radius.pill` | Button family | Outer silhouette |
| `size.pill-md` | PillButton | Height baseline |

---

## 9. Do / don’t

### Do
- use for the single most important action on a page
- keep the label short and action-oriented
- keep the circle visually nested
- use a semantically matching icon
- let this remain rare

### Don’t
- don’t use more than one per page
- don’t use for destructive actions
- don’t add accent/lime styling
- don’t detach the circle with a visible gap
- don’t use it when a plain `PillButton` would be enough
- don’t force long labels into it

---

## 10. Code

```tsx
// design-kit/compounds/PrimaryCTA.tsx
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

export interface PrimaryCTAProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Short action label. Keep concise. */
  label: ReactNode;
  /** Decorative trailing emphasis icon. */
  icon: ReactNode;
  /** Required for accessibility. Describes the action performed. */
  "aria-label": string;
}

export const PrimaryCTA = forwardRef<HTMLButtonElement, PrimaryCTAProps>(
  ({ label, icon, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          "group inline-flex h-10 items-center gap-2 rounded-full",
          "bg-white/95 pl-5 pr-1 text-black",
          "transition-[background-color,transform] duration-150",
          "hover:bg-white active:bg-white/85 active:scale-[0.98]",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-white/40 focus-visible:ring-offset-2",
          "focus-visible:ring-offset-black",
          className,
        )}
        {...props}
      >
        <span className="text-sm font-medium whitespace-nowrap">{label}</span>

        <span
          aria-hidden="true"
          className={cn(
            "inline-flex size-8 shrink-0 items-center justify-center rounded-full",
            "bg-[#0A0B0A] text-white [&>svg]:size-[18px]",
            "transition-colors duration-150",
            "group-hover:bg-[#141414]",
          )}
        >
          {icon}
        </span>
      </button>
    );
  },
);

PrimaryCTA.displayName = "PrimaryCTA";
```

### Notes on the code
- The compound is **unified-only** in v1
- No nested interactive elements
- No `@ts-expect-error`
- Height and general proportions stay aligned with the medium pill/button family
- The trailing circle is decorative markup that visually borrows from `CircularIconButton.solid`

---

## 11. Usage examples

### Reference-screen primary action

```tsx
import { Plus } from "lucide-react";

<PrimaryCTA
  label="New Customer"
  icon={<Plus />}
  onClick={handleCreateCustomer}
  aria-label="Create new customer"
/>
```

### Another page-level primary action

```tsx
import { Send } from "lucide-react";

<PrimaryCTA
  label="Send Invoice"
  icon={<Send />}
  onClick={handleSendInvoice}
  aria-label="Send invoice to customer"
/>
```

### Disabled state

```tsx
import { Plus } from "lucide-react";

<PrimaryCTA
  label="New Customer"
  icon={<Plus />}
  onClick={handleCreateCustomer}
  aria-label="Create new customer"
  disabled={!canCreate}
/>
```

---

## 12. Related components

- **PillButton** — use when the action is not important enough to need the primary CTA treatment
- **CircularIconButton** — visual source for the trailing circle treatment
- **PillStat.accent** — display-side emphasis counterpart; can coexist, but intentionally, since both are high-emphasis moments in different semantic channels

---

## 13. Open questions / implementation notes

- **RTL support:** trailing circle should flip when real RTL support becomes necessary
- **Loading state:** intentionally deferred until a real need appears
- **Future split behavior:** if a two-action split button becomes necessary, build it as a separate compound rather than overloading this one
- **Long-label fallback:** if product copy grows, prefer a plain `PillButton` or another CTA pattern instead of stretching this one beyond its visual limits

---

**Status:** final packaged






