# AvatarCircle

**Tier:** Primitive (foundational)  
**Path:** `/catalog/primitives/avatar-circle.md`  
**Occurrences on reference screen:** 10+

**Appears in:** top nav user avatar · invoice row avatars (7 rows, each with distinct identity ring) · invoice detail main avatar (`Silker` with star badge) · `Bill To` mini avatar (`Anna Sterling`).

---

## 1. Purpose

The **identity primitive** of the system. Used anywhere a person, customer, or entity needs visual representation.

It completes the circular family alongside Circular Icon Button, but with a different semantic role:

- **Circular Icon Button** = action
- **AvatarCircle** = identity

That distinction should stay clean. This primitive itself is **not interactive**. If an avatar needs to open a menu, trigger navigation, or behave like a control, that belongs to a future **`AvatarButton` compound**, not this primitive.

If this component drifts toward:
- generic “round image” usage
- status dots, counters, or decorative circles
- arbitrary colors outside the identity palette
- inconsistent fallback behavior

…it stops functioning as a strong identity marker.

---

## 2. Anatomy

```text
┌─────────────────────────────────┐
│          badge slot (optional)  │
│  ┌───────────────────────┐      │
│  │   identity color ring │      │  <div>
│  │   ┌───────────────┐   │      │    <img /> or
│  │   │ image OR      │   │      │    <span>{initial}</span>
│  │   │ initial text  │   │      │    {badge}
│  │   └───────────────┘   │      │  </div>
│  └───────────────────────┘      │
└─────────────────────────────────┘
```

### Parts
1. **Outer container** — circular wrapper and positioning anchor for badge
2. **Identity surface** — colored ring or full colored fill
3. **Content** — image or initial
4. **Badge** *(optional)* — small decorative/informational layer anchored top-right

### Core rules
- Shape is **always a perfect circle**
- Content is **always image or initial**
- Image mode shows the identity color as a **visible ring**
- Initial mode shows the identity color as a **full fill**
- Badge stays **small and secondary**
- Ring thickness is **fixed**, not consumer-configurable

### Content guidance
- Prefer close-cropped identity photos
- Faces should be centered where possible
- Avoid avatars with too much background clutter; the component should read as identity first, photo second

---

## 3. Modes

AvatarCircle has two visual modes. Consumers do not manually choose the mode; the component resolves it from the data.

### `image` mode

**Triggered when:** `src` is provided and the image has not failed.

**Used for:** invoice row avatars, top nav user photo, `Bill To` mini avatar.

- Photo fills the circle via `object-cover`
- Identity color appears as a **2px ring**
- Works best with close-cropped portraits

### `initial` mode

**Triggered when:** no `src` is provided, or image loading fails.

**Used for:** invoice detail main avatar (`Silker`), any identity without a photo, any broken image fallback.

- Circle fills completely with the identity color
- A single uppercase initial renders centered
- Initial comes from:
  - explicit `initial` prop, if provided
  - otherwise the first non-whitespace character of `name`
  - otherwise `?`

### Fallback principle
A missing or broken image should **silently degrade** into an initial avatar with the same identity color:
- no broken-image icon
- no layout shift
- no need for parent components to manage fallback mode themselves

---

## 4. What is intentionally not part of this primitive

The following belong to adjacent primitives or compounds, not here:

- **Interactivity** — belongs to `AvatarButton`
- **Status indicators** (online/offline/unread) — separate primitive layered on top
- **Stacked avatars** — `AvatarGroup`
- **Selection state** — belongs to row/list compounds, not the avatar itself
- **Logos / brand marks** — separate primitive; not all circles are identities
- **Multi-badge compositions** — one badge maximum

This component should stay narrow and reliable.

---

## 5. Color system

AvatarCircle uses the **identity palette**, which is deliberately separate from accent/emphasis tokens.

| Color key | Hex | Typical use |
|---|---|---|
| `blue` | `#2D7CF6` | Identity ring / fill |
| `magenta` | `#D94BF4` | Identity ring / fill |
| `chartreuse` | `#E8F21D` | Identity ring / fill |
| `silver` | `#D7D9DF` | Quiet identity option |
| `orange` | `#FF9A18` | Warm identity |
| `cyan` | `#38D3D3` | Cool identity |
| `neutral` | `rgba(255,255,255,0.08)` | Default fallback identity |

### Color assignment rules
- Identity color should be **stable**, not randomized each render
- Derive color deterministically from a stable ID if possible
- Use `neutral` when no identity mapping exists
- Avoid placing adjacent avatars with the same color when list clarity matters

### Contrast rule
`silver` is visually useful as a ring, but can be risky as a full-fill initial avatar.  
For safety:
- `silver` initial avatars should use **dark text**
- all other current identity fills can use **light text**

---

## 6. Sizes

| Size | Diameter | Initial text | Typical uses |
|---|---:|---:|---|
| `sm` | 24px | 10px | `Bill To` mini avatar, inline identity |
| `md` | 36px | 14px | Invoice rows, top nav user |
| `lg` | 56px | 22px | Detail panel main avatar |

**Default size:** `md`

### Sizing rules
- Ring thickness stays fixed at `2px`
- Badge size should stay around `35–40%` of avatar diameter
- Initial text size is part of the size tier; do not override casually

---

## 7. Badge slot

The badge accepts any `ReactNode` and anchors it to the top-right corner, slightly outside the avatar edge.

**Observed in the reference:** the `Silker` avatar uses a small blue star badge.

### Badge rules
- One badge maximum
- Keep it small and high-contrast
- Prefer circular or softly rounded badge shapes
- Badge is decorative/informational, not interactive

---

## 8. States

AvatarCircle is primarily a **static display primitive**.

| State | Treatment |
|---|---|
| `rest` | As defined by mode and identity color |
| `error/fallback` | If the image fails, switch to initial mode with same identity color |

### Important note on loading
This primitive currently does **not** define a dedicated loading state such as shimmer or skeleton.  
If `src` exists, the browser attempts to render it immediately. If it fails, the component falls back to initial mode.

That means:
- **error fallback is implemented**
- **explicit loading treatment is not part of this primitive yet**

### Accessibility requirements
- `name` is **required**
- Image mode uses native `<img alt={name}>`
- Initial mode exposes the identity via `role="img"` and `aria-label={name}`
- The visible initial is `aria-hidden="true"`

---

## 9. Token dependencies

| Token | Usage |
|---|---|
| `identity.blue` / `magenta` / `chartreuse` / `silver` / `orange` / `cyan` | Ring / fill color |
| `surface.control` (as `neutral`) | Default fallback identity |
| `text.primary` | Initial text on non-silver fills |
| `text.inverse` | Initial text on `silver` fill |
| `radius.round` | Shape |
| `size.avatar-sm` / `md` / `lg` | Diameter |
| `font.body-sm` / `body-md` / `stat-lg` | Initial sizing |

---

## 10. Do / don’t

### Do
- always pass a real `name`
- let the component own image fallback behavior
- use identity colors consistently per user/entity
- keep avatar content visually clean and close-cropped
- use a separate compound for interactivity

### Don’t
- don’t use this for logos, icons, or decorative dots
- don’t use `accent.primary` here
- don’t make this primitive clickable
- don’t stretch it into an ellipse
- don’t stack multiple badges
- don’t override ring thickness ad hoc

---

## 11. Code

```tsx
// design-kit/primitives/AvatarCircle.tsx
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";

const AVATAR_COLORS = {
  blue: "bg-[#2D7CF6] text-white",
  magenta: "bg-[#D94BF4] text-white",
  chartreuse: "bg-[#E8F21D] text-white",
  silver: "bg-[#D7D9DF] text-black",
  orange: "bg-[#FF9A18] text-white",
  cyan: "bg-[#38D3D3] text-white",
  neutral: "bg-white/[0.08] text-white",
} as const;

export type AvatarCircleColor = keyof typeof AVATAR_COLORS;

const avatarCircle = cva("relative inline-flex shrink-0 rounded-full", {
  variants: {
    size: {
      sm: "size-6",
      md: "size-9",
      lg: "size-14",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const initialText = cva("font-semibold leading-none select-none", {
  variants: {
    size: {
      sm: "text-[10px]",
      md: "text-sm",
      lg: "text-[22px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface AvatarCircleProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof avatarCircle> {
  /** Required. Used for alt text and accessible fallback labeling. */
  name: string;
  /** Optional image URL. Falls back to initial mode on failure. */
  src?: string;
  /** Optional manual initial override. */
  initial?: string;
  /** Identity color from the palette. Defaults to `neutral`. */
  color?: AvatarCircleColor;
  /** Optional decorative badge. */
  badge?: ReactNode;
}

export const AvatarCircle = forwardRef<HTMLDivElement, AvatarCircleProps>(
  (
    {
      name,
      src,
      initial: initialOverride,
      color = "neutral",
      size,
      badge,
      className,
      ...props
    },
    ref,
  ) => {
    const [imageFailed, setImageFailed] = useState(false);

    const showImage = Boolean(src) && !imageFailed;

    const derivedInitial = useMemo(() => {
      const trimmed = name.trim();
      const fallback = trimmed ? trimmed.charAt(0).toUpperCase() : "?";
      return initialOverride?.trim() || fallback;
    }, [name, initialOverride]);

    return (
      <div ref={ref} className={cn(avatarCircle({ size }), className)} {...props}>
        <div
          className={cn(
            "flex h-full w-full items-center justify-center rounded-full",
            AVATAR_COLORS[color],
            showImage && "p-[2px]",
          )}
          role={showImage ? undefined : "img"}
          aria-label={showImage ? undefined : name}
        >
          {showImage ? (
            <img
              src={src}
              alt={name}
              onError={() => setImageFailed(true)}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span aria-hidden="true" className={initialText({ size })}>
              {derivedInitial}
            </span>
          )}
        </div>

        {badge ? <div className="absolute -right-0.5 -top-0.5 z-10">{badge}</div> : null}
      </div>
    );
  },
);

AvatarCircle.displayName = "AvatarCircle";
```

### Notes on the code
- Export name now matches the catalog name: `AvatarCircle`
- Handles image mode and fallback mode in one component
- Keeps fallback semantics accessible without double-reading the visible initial
- Protects `silver` initial mode by switching text to dark automatically
- Fixes initial derivation so empty strings correctly fall back to `?`

---

## 12. Usage examples

### Invoice row avatar

```tsx
<AvatarCircle
  name="Anna Sterling"
  src="/avatars/anna.jpg"
  color="magenta"
/>
```

### Detail avatar with badge

```tsx
import { Star } from "lucide-react";

<AvatarCircle
  name="Silker"
  color="chartreuse"
  size="lg"
  badge={
    <div className="flex size-5 items-center justify-center rounded-full bg-[#2D7CF6]">
      <Star className="size-3 fill-white text-white" />
    </div>
  }
/>
```

### Bill To mini avatar

```tsx
<AvatarCircle
  name="Anna Sterling"
  src="/avatars/anna.jpg"
  color="magenta"
  size="sm"
/>
```

### Broken image fallback

```tsx
<AvatarCircle
  name="Firas Ben Slimane"
  src="/avatars/broken.jpg"
  color="chartreuse"
/>
```

### Deterministic color assignment pattern

```tsx
const AVATAR_COLOR_KEYS = [
  "blue",
  "magenta",
  "chartreuse",
  "silver",
  "orange",
  "cyan",
] as const;

function colorForUser(userId: string): AvatarCircleColor {
  const hash = [...userId].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLOR_KEYS[hash % AVATAR_COLOR_KEYS.length];
}

<AvatarCircle
  name={user.name}
  src={user.avatarUrl}
  color={colorForUser(user.id)}
/>
```

---

## 13. Related components

- **Circular Icon Button** — action counterpart with the same silhouette family
- **Pill Button** — labeled-action counterpart in the button system
- **AvatarButton** *(future compound)* — interactive avatar for menus or profile entry points
- **AvatarGroup** *(future compound)* — stacked/overlapping identity cluster
- **StatusIndicator** *(future primitive)* — online/offline/unread layer placed over an avatar

---

## 14. Open questions / implementation notes

- **Badge offset:** current positioning assumes a small circular badge; revisit only if a second badge pattern emerges
- **Image loading treatment:** explicit loading state is intentionally out of scope for now
- **Deterministic color helper:** likely worth extracting to a shared utility later
- **Multi-letter initials:** still intentionally out of scope for auto-derivation; add only if a real use case emerges

---

**Status:** final packaged






