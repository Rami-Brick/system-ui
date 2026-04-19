# Panel Header

**Tier:** Compound  
**Path:** `/catalog/compounds/panel-header.md`  
**Occurrences on reference screen:** 2

**Appears in:**
- left panel top — `All Invoices` title + circular `+` add button (leading), segmented toggle + 3-icon `IconToolbar` (center + trailing)
- right panel top — `INV-00120` identifying label (leading), 4-icon `IconToolbar` + ellipsis + close buttons (trailing)

---

## 1. Purpose

The **panel top-bar compound**. Panel Header provides the consistent structural layout for the top of a `GlassPanel`-style content region: a leading region for identity, an optional center region for panel-local controls, and an optional trailing region for contextual actions.

Its role is to enforce a repeating structural pattern: panels identify themselves and surface their actions in one place. Without this compound, each panel header becomes a one-off flex row with ad hoc spacing, ordering, and semantics.

If Panel Header drifts toward:
- carrying a visual surface of its own
- hardcoding specific content
- owning panel padding
- becoming a full panel template
- trying to solve responsive overflow internally

…it stops being a structural pattern and becomes a rigid layout component.

---

## 2. Composition

### Primitives and compounds commonly used
- `CircularIconButton` — optional add/primary action in the leading region
- `IconToolbar` — common trailing action group
- `SegmentedToggle` — likely center-slot content
- Any `ReactNode` accepted in all three slots

### Slot model

Panel Header is a **three-slot layout compound**:

```text
[ leading ]      [ center (optional) ]      [ trailing (optional) ]
```

- **`leading`** — always present. Usually a title or short identifying label/ID, optionally paired with one add/create action.
- **`center`** *(optional)* — reserved for panel-local controls such as view toggles or secondary navigation.
- **`trailing`** *(optional)* — contextual actions, usually an `IconToolbar`, sometimes followed by standalone utility buttons.

### Layout behavior
- `leading` anchors left
- `trailing` anchors right
- `center` occupies the remaining space **between** them and centers its own contents within that available space

Important nuance:

> The center slot is centered within the remaining space, not guaranteed to be optically centered against the full panel width if leading and trailing widths differ.

### What the compound changes
The constituent pieces keep their own visual treatment and behavior. Panel Header adds only:
- slot structure
- high-level spacing
- alignment discipline

---

## 3. Anatomy

```text
┌──────────────────────────────────────────────────────────────────────┐
│  All Invoices  [+]          [≡][⊞]          [↺]  [↑]  [✎]          │
│   ↑             ↑             ↑               ↑                      │
│ leading      add action      center         trailing                │
└──────────────────────────────────────────────────────────────────────┘
```

### Parts
1. **Container** — horizontal flex row
2. **Leading slot** — identity/title area, always present
3. **Center slot** *(optional)* — panel-local controls
4. **Trailing slot** *(optional)* — contextual actions

### Core rules
- The **leading slot is always present**, but it may contain either:
  - a true panel title
  - or a short identifying label/ID
- Center and trailing are optional
- Panel Header carries **no visual surface**
- Panel Header does **not own padding**
- The compound is **single-row only**
- Titles/IDs should stay short enough to coexist with actions on one line

---

## 4. Slot specifications

### Leading slot

Always rendered. Typical contents:
- a semantic heading (`<h2>` / `<h3>`) or short identifying label
- optionally one `CircularIconButton.light` for the primary add/create action

Recommended internal spacing:
- `gap-3` (12px)

### Center slot

Optional. Use sparingly. Best suited for:
- segmented toggles
- compact view switches
- panel-local navigation

If content does not clearly belong to panel-local control/navigation, prefer leaving this slot empty.

### Trailing slot

Optional. Typical contents:
- `IconToolbar density="tight"`
- standalone `CircularIconButton` utilities
- or a small flex row that combines both

### Trailing ordering rule
When trailing content mixes grouped actions and standalone utility/dismissive controls, prefer this order:

1. grouped contextual actions first
2. standalone utility actions next
3. dismissive actions such as close last

This matches the right-panel reference pattern and keeps the visual rhythm sensible.

---

## 5. Title typography

Panel Header does not enforce a title subcomponent, but the system has a recommended panel-title treatment.

| Property | Value | Token direction |
|---|---|---|
| Size | 17px | `font.panel-title` |
| Weight | 600 | semibold |
| Color | `text.primary` | |
| Leading | snug | |

In Tailwind: `text-[17px] font-semibold text-white leading-snug`

This is guidance, not enforcement.

`font.panel-title` is included in the typography tokens and closes the gap between `font.body-md` and `font.heading-md`.

---

## 6. What is intentionally not part of this compound

- **Visual separation from panel body** — no divider or bottom border
- **Panel padding** — owned by the parent `GlassPanel`
- **Tabs as a full alternate header model** — different structural pattern
- **Search field integration by default**
- **Collapse/expand affordances**
- **Responsive overflow handling**
- **Panel body layout**

### Context rule
Panel Header is **designed for GlassPanel contexts** and assumes generous surrounding padding. Using it outside that context is possible, but should be deliberate.

---

## 7. States

Panel Header is **static**. Visual states belong to the controls inside it.

### Observed vs inferred
- **Observed:** leading + trailing on both reference panels; center slot on the left panel
- **Inferred:** title-only and label-only leading configurations are both valid

### Accessibility requirements
- Use a semantic heading in the leading slot when the content is truly a section title
- If the header title identifies the parent panel, pair it with `aria-labelledby` on the parent region
- Trailing buttons keep their own `aria-label`s
- `IconToolbar` should describe the action group purpose, not repeat button labels

---

## 8. Token dependencies

No new spacing tokens. One expected new typography token.

| Value | Tailwind | Token |
|---|---|---|
| Leading internal gap | `gap-3` | `space.3` (12px) |
| Slot container gap | `gap-4` | `space.4` (16px) |
| Panel title | `text-[17px] font-semibold` | `font.panel-title` |

---

## 9. Do / don’t

### Do
- always provide leading content
- use semantic headings when appropriate
- use `IconToolbar density="tight"` for grouped trailing actions
- let the parent panel own padding
- keep titles/IDs short
- order trailing actions intentionally

### Don’t
- don’t add borders, backgrounds, or dividers to the header itself
- don’t put multiple primary add buttons in the leading slot
- don’t use the center slot as a generic content dump
- don’t assume the center slot is perfectly globally centered
- don’t rely on this compound to solve overflow or mobile adaptation
- don’t treat it as a standalone surface component

---

## 10. Code

```tsx
// design-kit/compounds/PanelHeader.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

export interface PanelHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Always present.
   * Typically a title or identifying label, optionally paired with an add action.
   */
  leading: ReactNode;
  /**
   * Optional panel-local control/navigation content.
   */
  center?: ReactNode;
  /**
   * Optional contextual actions.
   */
  trailing?: ReactNode;
}

export const PanelHeader = forwardRef<HTMLDivElement, PanelHeaderProps>(
  ({ leading, center, trailing, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex w-full items-center justify-between gap-4", className)}
        {...props}
      >
        <div className="flex shrink-0 items-center gap-3">
          {leading}
        </div>

        {center ? (
          <div className="flex flex-1 items-center justify-center">
            {center}
          </div>
        ) : null}

        {trailing ? (
          <div className="flex shrink-0 items-center gap-2">
            {trailing}
          </div>
        ) : null}
      </div>
    );
  },
);

PanelHeader.displayName = "PanelHeader";
```

### Notes on the code
- Named slots are clearer than `children` for this structure
- `leading` and `trailing` are `shrink-0` so they preserve their content width
- `center` gets the remaining space and centers its own contents within that space
- No padding or visual surface is built in
- The component is intentionally structural, not stylistic

---

## 11. Usage examples

### Left panel header

```tsx
import { Plus, RefreshCw, Upload, Pencil, List, Grid } from "lucide-react";

<PanelHeader
  leading={
    <>
      <h2 className="text-[17px] font-semibold text-white leading-snug">
        All Invoices
      </h2>
      <CircularIconButton
        variant="light"
        size="sm"
        icon={<Plus />}
        aria-label="Add invoice"
      />
    </>
  }
  center={
    <SegmentedToggle
      options={[
        { value: "list", icon: <List /> },
        { value: "grid", icon: <Grid /> },
      ]}
      value="list"
      onChange={setView}
    />
  }
  trailing={
    <IconToolbar density="tight" aria-label="List management actions">
      <CircularIconButton variant="light" icon={<RefreshCw />} aria-label="Refresh" />
      <CircularIconButton variant="light" icon={<Upload />} aria-label="Upload" />
      <CircularIconButton variant="light" icon={<Pencil />} aria-label="Edit" />
    </IconToolbar>
  }
/>
```

### Right panel header

```tsx
import { Paperclip, Send, Upload, Pencil, MoreHorizontal, X } from "lucide-react";

<PanelHeader
  leading={
    <span className="text-sm font-medium text-white/80">INV-00120</span>
  }
  trailing={
    <div className="flex items-center gap-1">
      <IconToolbar density="tight" aria-label="Invoice record actions">
        <CircularIconButton icon={<Paperclip />} aria-label="Attach file" />
        <CircularIconButton icon={<Send />} aria-label="Send invoice" />
        <CircularIconButton icon={<Upload />} aria-label="Upload" />
        <CircularIconButton icon={<Pencil />} aria-label="Edit invoice" />
      </IconToolbar>
      <CircularIconButton icon={<MoreHorizontal />} aria-label="More options" />
      <CircularIconButton icon={<X />} aria-label="Close detail panel" />
    </div>
  }
/>
```

### Minimal header

```tsx
<PanelHeader
  leading={
    <h2 className="text-[17px] font-semibold text-white">
      Recent Activity
    </h2>
  }
/>
```

### Accessible panel labeling

```tsx
<GlassPanel asChild className="p-6">
  <section aria-labelledby="invoices-panel-title">
    <PanelHeader
      leading={
        <>
          <h2
            id="invoices-panel-title"
            className="text-[17px] font-semibold text-white"
          >
            All Invoices
          </h2>
          <CircularIconButton
            variant="light"
            size="sm"
            icon={<Plus />}
            aria-label="Add invoice"
          />
        </>
      }
      trailing={
        <IconToolbar density="tight" aria-label="List actions">
          <CircularIconButton variant="light" icon={<RefreshCw />} aria-label="Refresh" />
        </IconToolbar>
      }
    />
    {/* panel body */}
  </section>
</GlassPanel>
```

---

## 12. Related components

- **GlassPanel** — the context this compound is designed for
- **CircularIconButton** — used in leading and trailing actions
- **IconToolbar** — canonical grouped trailing actions
- **SegmentedToggle** — likely center-slot content
- **InvoiceRow** — typical body content beneath the header

---

## 13. Open questions / implementation notes

- **Trailing micro-pattern:** toolbar + standalone utility buttons may be worth formalizing only if it repeats often
- **Responsive behavior:** still intentionally out of scope for this compound
- **Center slot rarity:** keep rare; if overused, the compound may be carrying too many responsibilities
- **Non-GlassPanel use:** possible, but only when the surrounding layout already provides comparable spacing and calm surface context

---

**Status:** final packaged






