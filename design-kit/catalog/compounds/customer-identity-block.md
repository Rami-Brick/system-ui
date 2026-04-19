# Customer Identity Block

**Tier:** Compound  
**Path:** `/catalog/compounds/customer-identity-block.md`  
**Occurrences on reference screen:** 1

**Appears in:** invoice detail right panel — large chartreuse avatar (`S` initial, star badge), customer name `Silker`, 3-line address, `Bill To: Anna Sterling` link.

---

## 1. Purpose

The **entity identity compound**. Customer Identity Block presents the core visual identity of one entity: avatar, name, optional address, and optional billing reference.

This is the most visually prominent identity moment inside the invoice detail panel. It should not become a generic profile card or action hub.

If Customer Identity Block drifts toward:
- action buttons inside the block
- multiple entities at once
- logo/icon substitution for the avatar
- additional control surfaces
- becoming a generic user/profile card

…it stops being an identity block and becomes a different pattern.

---

## 2. Composition

### Primitives used
- `AvatarCircle` — primary identity mark
- `KeyValueRow` — optional `Bill To` metadata line

### How it is composed
The block has three vertical zones:

1. **Avatar zone** — `AvatarCircle` at `size="lg"`, optionally with badge
2. **Text zone** — name + optional multi-line address
3. **Reference zone** — optional `KeyValueRow layout="compact"` for billing reference

### What the compound changes
- `AvatarCircle` is always `lg`
- `Bill To` always uses `KeyValueRow layout="compact"`
- The block owns vertical rhythm and left alignment

---

## 3. Anatomy

```text
[AvatarCircle lg]

Name
Address line 1
Address line 2
Address line 3

Bill To:   Anna Sterling
```

### Core rules
- Avatar is always `lg`
- Name is the most prominent text in the block
- Address is quieter supporting text
- `Bill To` row is optional
- Address is optional
- The block is left-aligned
- The block has no surface of its own

---

## 4. What is intentionally not part of this compound

- **Action buttons**
- **Multiple identities**
- **Editable fields**
- **Phone/email/contact metadata beyond the observed pattern**
- **Status indicators beyond the avatar badge**
- **Heading-level enforcement**

This compound is read-only identity display.

---

## 5. States

Static.

### Accessibility requirements
- `AvatarCircle` handles its own accessible naming
- The billing reference link should be descriptive
- The name element should be consumer-selectable, because the compound cannot know document heading level on its own

---

## 6. Token dependencies

| Token | Usage |
|---|---|
| `text.primary` | Name |
| `text.secondary` | Address |
| `font.heading-md` | Name scale intent |
| `font.body-sm` | Address scale intent |
| `size.avatar-lg` | Avatar size |
| `space.3` | Main vertical gap |
| `space.2` | Smaller supporting gap |

---

## 7. Code

```tsx
// design-kit/compounds/CustomerIdentityBlock.tsx
import {
  forwardRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";
import {
  AvatarCircle,
  type AvatarCircleColor,
} from "../primitives/AvatarCircle";
import { KeyValueRow } from "../primitives/KeyValueRow";

export interface CustomerIdentityBlockProps
  extends HTMLAttributes<HTMLDivElement> {
  /** Entity name. */
  name: string;
  /** Optional name element tag. Defaults to `p`. */
  nameAs?: ElementType;
  /** Optional image URL. */
  avatarSrc?: string;
  /** Identity color. */
  avatarColor?: AvatarCircleColor;
  /** Optional avatar badge. */
  avatarBadge?: ReactNode;
  /** Optional address lines. */
  address?: string[];
  /** Optional billing label. */
  billToLabel?: ReactNode;
  /** Optional billing value, typically a link. */
  billToValue?: ReactNode;
}

export const CustomerIdentityBlock = forwardRef<
  HTMLDivElement,
  CustomerIdentityBlockProps
>(
  (
    {
      name,
      nameAs: NameTag = "p",
      avatarSrc,
      avatarColor = "neutral",
      avatarBadge,
      address,
      billToLabel = "Bill To:",
      billToValue,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        <AvatarCircle
          name={name}
          src={avatarSrc}
          color={avatarColor}
          size="lg"
          badge={avatarBadge}
        />

        <div className="flex flex-col gap-0.5">
          <NameTag className="text-[20px] font-semibold leading-snug text-white">
            {name}
          </NameTag>

          {address && address.length > 0 ? (
            <div className="flex flex-col">
              {address.map((line, index) => (
                <span
                  key={index}
                  className="text-[13px] leading-snug text-white/70"
                >
                  {line}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {billToValue ? (
          <KeyValueRow
            label={billToLabel}
            value={billToValue}
            layout="compact"
          />
        ) : null}
      </div>
    );
  },
);

CustomerIdentityBlock.displayName = "CustomerIdentityBlock";
```

### Notes on the code
- Uses the final `AvatarCircle` primitive name consistently
- `nameAs` keeps heading semantics in consumer control without forcing the compound to guess
- `address` stays simple as `string[]` for now
- The compound remains read-only and visually narrow

---

## 8. Usage examples

### Invoice detail identity block

```tsx
import { Star } from "lucide-react";

<CustomerIdentityBlock
  name="Silker"
  avatarColor="chartreuse"
  avatarBadge={
    <div className="flex size-5 items-center justify-center rounded-full bg-[#2D7CF6]">
      <Star className="size-3 fill-white text-white" />
    </div>
  }
  address={[
    "1561 Appleview Town,",
    "Bakers Street,",
    "Chicago, U.S.A",
  ]}
  billToLabel="Bill To:"
  billToValue={
    <a
      href="#anna-sterling"
      className="text-white/80 underline underline-offset-2 hover:text-white"
    >
      Anna Sterling
    </a>
  }
/>
```

### Minimal identity

```tsx
<CustomerIdentityBlock
  name="Firas"
  avatarColor="blue"
/>
```

### With semantic heading

```tsx
<CustomerIdentityBlock
  name="Acme Corp"
  nameAs="h2"
  avatarColor="orange"
  address={["123 Business Ave", "San Francisco, CA 94102"]}
/>
```

---

## 9. Related components

- **AvatarCircle** — identity primitive
- **KeyValueRow** — metadata line for billing reference
- **GlassPanel** — common surface context
- **PanelHeader** — panel-level title/actions above the block

---

## 10. Open questions / implementation notes

- **Address as `ReactNode[]`:** promote only if richer address formatting becomes a real need
- **Additional contact metadata:** keep out unless observed or clearly needed
- **Invoice-detail layout coupling:** the block should stay independent from the right-side metadata stack layout around it

---

**Status:** final packaged

---
---
---







