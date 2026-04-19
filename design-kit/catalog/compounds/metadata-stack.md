# Metadata Stack

**Tier:** Compound  
**Path:** `/catalog/compounds/metadata-stack.md`  
**Occurrences on reference screen:** 1

**Appears in:** invoice detail right panel — vertical stack of `Invoice Date: 09/08/2018`, `Terms: Net 15`, `Due Date: 24/08/2018`, right-aligned.

---

## 1. Purpose

The **vertical metadata display compound**. Metadata Stack arranges multiple `KeyValueRow` instances into one consistent vertical cluster.

Its value is deliberately small and precise:

1. **consistent row spacing**
2. **consistent stack alignment**
3. **prevention of ad hoc metadata grouping**

This is a simple compound on purpose. It should not become a generic vertical list container.

---

## 2. Composition

### Primitive used
- `KeyValueRow` — one per item, always in `layout="compact"`

### How it’s composed
The compound maps an `items` data array to `KeyValueRow` instances inside a vertical flex column.

The compound owns:
- row gap
- stack alignment
- the fact that all rows use `layout="compact"`

It does not own:
- title/heading content
- surrounding surface
- semantic definition-list markup
- non-metadata children

---

## 3. Anatomy

```text
┌──────────────────────────────────────────┐
│  Invoice Date:            09/08/2018     │
│  Terms:                       Net 15     │
│  Due Date:                24/08/2018     │
└──────────────────────────────────────────┘
        rows aligned as one metadata block
```

### Core rules
- Rows are always `KeyValueRow layout="compact"`
- Gap is fixed to `gap-2` (8px)
- Default alignment is `right`
- Left alignment is allowed for settings-style contexts
- No dividers
- No mixed content types

---

## 4. What is intentionally not part of this compound

- **Section title or heading**
- **Dividers**
- **Mixed content rows**
- **Interactive rows**
- **Automatic semantic `<dl>` output**

If those are needed, they belong to surrounding composition or to a different pattern.

---

## 5. States

Static. No compound-level states.

### Accessibility note
If the stack is truly functioning like a semantic definition list, wrap it at the composition level with `<dl>`, `<dt>`, and `<dd>`. This compound intentionally does not force that structure.

---

## 6. Token dependencies

| Value | Tailwind | Token |
|---|---|---|
| Row gap | `gap-2` | `space.2` (8px) |

---

## 7. Code

```tsx
// design-kit/compounds/MetadataStack.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { KeyValueRow } from "../primitives/KeyValueRow";

export interface MetadataItem {
  id: string;
  label: ReactNode;
  value: ReactNode;
}

export interface MetadataStackProps extends HTMLAttributes<HTMLDivElement> {
  items: MetadataItem[];
  /** Right matches the reference. */
  align?: "left" | "right";
}

export const MetadataStack = forwardRef<HTMLDivElement, MetadataStackProps>(
  ({ items, align = "right", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2",
          align === "right" ? "items-end" : "items-start",
          className,
        )}
        {...props}
      >
        {items.map((item) => (
          <KeyValueRow
            key={item.id}
            label={item.label}
            value={item.value}
            layout="compact"
          />
        ))}
      </div>
    );
  },
);

MetadataStack.displayName = "MetadataStack";
```

### Notes on the code
- Uses a data array instead of children to keep the pattern pure
- Defaults to right alignment because that is the reference pattern
- Keeps the compound intentionally small

---

## 8. Usage examples

### Invoice detail metadata

```tsx
<MetadataStack
  items={[
    { id: "date", label: "Invoice Date:", value: "09/08/2018" },
    { id: "terms", label: "Terms:", value: "Net 15" },
    { id: "due", label: "Due Date:", value: "24/08/2018" },
  ]}
/>
```

### Left-aligned settings metadata

```tsx
<MetadataStack
  align="left"
  items={[
    { id: "type", label: "Account type", value: "Business" },
    { id: "email", label: "Billing email", value: "finance@silker.com" },
    { id: "login", label: "Last login", value: "2 hours ago" },
  ]}
/>
```

---

## 9. Related components

- **KeyValueRow** — only primitive used here
- **PanelHeader** — likely title/header above the stack
- **GlassPanel** — common surface context

---

## 10. Open questions / implementation notes

- **Semantic `<dl>` mode:** add only if it becomes a repeated real requirement
- **Additional sizes:** do not add unless a second density actually appears
- **Truncation behavior:** if truncation becomes necessary, treat it as an explicit extension rather than implicit overflow hiding

---

**Status:** final packaged

---
---
---







