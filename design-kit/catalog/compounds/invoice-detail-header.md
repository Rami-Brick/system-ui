# Invoice Detail Header

**Tier:** Compound  
**Path:** `/catalog/compounds/invoice-detail-header.md`  
**Occurrences on reference screen:** 1

**Appears in:** right panel top — `INV-00120` identifying label on the left, 4-icon action toolbar + ellipsis + close on the right.

---

## 1. Purpose

The **record detail panel header compound**. Invoice Detail Header identifies the current record and surfaces its record-level actions.

It is a specialization of `PanelHeader`, with one important semantic difference:

> The leading content is a **record identifier**, not a section heading.

This matters because record identifiers should not be forced into heading semantics.

---

## 2. Composition

### Compounds and primitives used
- `PanelHeader` — structural base
- `IconToolbar` (`density="tight"`) — grouped contextual actions
- `CircularIconButton` × 2 — standalone utility + dismissive actions

### How it is composed
This is a thin wrapper over `PanelHeader`:
- `leading` becomes the record ID label
- `trailing` becomes toolbar + more + close

### Ordering rule
Trailing content should follow:
1. grouped contextual actions
2. standalone utility (`More`)
3. dismissive action (`Close`)

That ordering is part of the pattern.

---

## 3. Anatomy

```text
┌──────────────────────────────────────────────────────────────────────┐
│  INV-00120          [📎][↗][↑][✎]   [⋯]   [×]                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Core rules
- Record ID is not a heading
- Toolbar uses `density="tight"`
- Ellipsis sits between toolbar and close
- Close is always last
- This is still structurally a `PanelHeader`

---

## 4. What is intentionally not part of this compound

- **Section title semantics**
- **Back navigation**
- **Status badge by default**
- **Compound-level edit mode**
- **Panel labeling by itself** — the surrounding panel still needs broader accessible context

---

## 5. States

Static at the compound level. Buttons manage their own states.

### Accessibility requirements
- Record ID should be descriptive enough in context, or have an `aria-label`
- Toolbar still needs its own `aria-label`
- Utility buttons need their own `aria-label`
- The surrounding panel should still be labeled meaningfully at a higher level

---

## 6. Token dependencies

Inherited from `PanelHeader`, `IconToolbar`, and `CircularIconButton`.

---

## 7. Code

```tsx
// design-kit/compounds/InvoiceDetailHeader.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { MoreHorizontal, X } from "lucide-react";
import { PanelHeader } from "./PanelHeader";
import { IconToolbar } from "./IconToolbar";
import { CircularIconButton } from "../primitives/CircularIconButton";

export interface InvoiceDetailHeaderProps extends HTMLAttributes<HTMLDivElement> {
  recordId: string;
  actions: ReactNode;
  onMore?: () => void;
  onClose?: () => void;
}

export const InvoiceDetailHeader = forwardRef<
  HTMLDivElement,
  InvoiceDetailHeaderProps
>(({ recordId, actions, onMore, onClose, ...props }, ref) => {
  return (
    <PanelHeader
      ref={ref}
      {...props}
      leading={
        <span
          className="text-sm font-medium text-white/70"
          aria-label={`Invoice ${recordId}`}
        >
          {recordId}
        </span>
      }
      trailing={
        <div className="flex items-center gap-1">
          <IconToolbar density="tight" aria-label="Record actions">
            {actions}
          </IconToolbar>

          <CircularIconButton
            icon={<MoreHorizontal />}
            aria-label="More options"
            onClick={onMore}
          />

          <CircularIconButton
            icon={<X />}
            aria-label="Close detail panel"
            onClick={onClose}
          />
        </div>
      }
    />
  );
});

InvoiceDetailHeader.displayName = "InvoiceDetailHeader";
```

### Notes on the code
- Keeps the wrapper intentionally thin
- Leaves `actions` flexible as `ReactNode`
- Encodes the right-side ordering directly in the structure
- Delegates spacing/layout to `PanelHeader`

---

## 8. Usage example

```tsx
import { Paperclip, Send, Upload, Pencil } from "lucide-react";

<InvoiceDetailHeader
  recordId="INV-00120"
  actions={
    <>
      <CircularIconButton icon={<Paperclip />} aria-label="Attach file" />
      <CircularIconButton icon={<Send />} aria-label="Send invoice" />
      <CircularIconButton icon={<Upload />} aria-label="Upload document" />
      <CircularIconButton icon={<Pencil />} aria-label="Edit invoice" />
    </>
  }
  onMore={openMenu}
  onClose={closePanel}
/>
```

---

## 9. Related components

- **PanelHeader** — structural base
- **IconToolbar** — grouped record actions
- **CircularIconButton** — all actions here
- **GlassPanel (raised)** — common surface context

---

## 10. Open questions / implementation notes

- **Structured actions API:** only consider later if the action set becomes rigid enough to justify it
- **Trailing micro-pattern:** if toolbar + more + close repeats elsewhere, promote it
- **Accessible context:** record ID alone is not a full panel label; keep broader panel labeling elsewhere

---

**Status:** final packaged

---
---
---







