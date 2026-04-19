# Top Nav

**Tier:** Compound  
**Path:** `/catalog/compounds/top-nav.md`  
**Occurrences on reference screen:** 1

**Appears in:** application top bar — brand lockup left, `NavTabGroup` center, utility icon buttons + user avatar right.

---

## 1. Purpose

The **application navigation bar compound**. Top Nav orients the user at application scope:
- brand on the left
- navigation in the center
- global utilities and user identity on the right

This is the outermost navigational structure in the kit. It should appear once per page layout, not per panel.

---

## 2. Composition

### Compounds and primitives used
- `NavTabGroup` — center navigation
- `CircularIconButton` — utilities
- `AvatarCircle` — current user identity, typically wrapped in a button

### How it is composed
Three horizontal regions inside one row:
1. **brand**
2. **center navigation**
3. **trailing utilities + user**

### Important alignment note
Like `PanelHeader`, the center region is centered within the **remaining space** between brand and trailing content. It is not guaranteed to be optically centered against the full viewport width if the side regions differ in width.

That is acceptable for this reference pattern.

---

## 3. Anatomy

```text
┌──────────────────────────────────────────────────────────────────────┐
│  [Brand]     Overview  [ Customers ]  Marketing     [↗] [🔔] [👤]   │
└──────────────────────────────────────────────────────────────────────┘
```

### Core rules
- Single horizontal row
- Brand anchors left
- Navigation occupies the center region
- Utilities + user anchor right
- Avatar is the rightmost element
- Top Nav has no heavy border/shadow by default
- Utility count should stay small (typically 2–3)

---

## 4. Brand slot

The brand slot is intentionally project-specific.

Allowed:
- logo mark
- wordmark
- logo + wordmark combination

Not owned by the kit:
- the actual brand definition
- whether it links home
- exact logo artwork

### Brand guidance
- Keep it visually compact
- Avoid crowding the center navigation
- If interactive, the consumer wraps it appropriately

---

## 5. What is intentionally not part of this compound

- **Brand definition**
- **Routing ownership**
- **Search bar by default**
- **Notification badge logic**
- **Dropdown menu logic**
- **Mobile collapse behavior**
- **Sticky positioning**

This compound should stay a desktop-first structural header.

---

## 6. States

Static at the compound level. Navigation state belongs to `NavTabGroup`; utility/user interactions belong to their own controls.

### Accessibility requirements
- Use `<header role="banner">` at page-layout level
- `NavTabGroup` provides its own `<nav>`
- Utility buttons need descriptive labels
- User avatar button should expose a descriptive label such as `User menu - {name}`

---

## 7. Token dependencies

Inherited from constituent components. No new tokens.

---

## 8. Code

```tsx
// design-kit/compounds/TopNav.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { NavTabGroup, type NavTab } from "./NavTabGroup";
import {
  AvatarCircle,
  type AvatarCircleColor,
} from "../primitives/AvatarCircle";

export interface TopNavProps extends HTMLAttributes<HTMLDivElement> {
  brand: ReactNode;
  tabs: NavTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  navAriaLabel: string;
  utilities?: ReactNode;
  userName: string;
  userAvatarSrc?: string;
  userAvatarColor?: AvatarCircleColor;
  onUserClick?: () => void;
}

export const TopNav = forwardRef<HTMLDivElement, TopNavProps>(
  (
    {
      brand,
      tabs,
      activeTab,
      onTabChange,
      navAriaLabel,
      utilities,
      userName,
      userAvatarSrc,
      userAvatarColor = "chartreuse",
      onUserClick,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full items-center justify-between gap-4 px-6 py-3",
          className,
        )}
        {...props}
      >
        <div className="flex shrink-0 items-center">
          {brand}
        </div>

        <div className="flex flex-1 items-center justify-center">
          <NavTabGroup
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
            aria-label={navAriaLabel}
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {utilities}

          <button
            type="button"
            onClick={onUserClick}
            aria-label={`User menu - ${userName}`}
            className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <AvatarCircle
              name={userName}
              src={userAvatarSrc}
              color={userAvatarColor}
              size="md"
            />
          </button>
        </div>
      </div>
    );
  },
);

TopNav.displayName = "TopNav";
```

### Notes on the code
- Uses the final `AvatarCircle` primitive import consistently
- Keeps the avatar interactive by wrapping it in a button rather than making the primitive itself interactive
- Centers navigation within remaining space, not absolute viewport center
- Leaves brand and utilities flexible

---

## 9. Usage examples

### Reference-style top nav

```tsx
import { Send, Bell } from "lucide-react";

<header role="banner">
  <TopNav
    brand={
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-full bg-white/10">
          <span className="text-xs font-bold text-white">S</span>
        </div>
        <span className="text-sm font-medium text-white">salesforce</span>
      </div>
    }
    tabs={[
      { id: "overview", label: "Overview" },
      { id: "customers", label: "Customers" },
      { id: "marketing", label: "Marketing" },
    ]}
    activeTab={activeTab}
    onTabChange={setActiveTab}
    navAriaLabel="Main navigation"
    utilities={
      <>
        <CircularIconButton icon={<Send />} aria-label="Share" />
        <CircularIconButton icon={<Bell />} aria-label="Notifications" />
      </>
    }
    userName="Firas"
    userAvatarColor="chartreuse"
    onUserClick={openUserMenu}
  />
</header>
```

### Minimal top nav

```tsx
<header role="banner">
  <TopNav
    brand={<span className="text-sm font-bold text-white">Xledger</span>}
    tabs={[
      { id: "dashboard", label: "Dashboard" },
      { id: "transactions", label: "Transactions" },
      { id: "reports", label: "Reports" },
    ]}
    activeTab="dashboard"
    onTabChange={setTab}
    navAriaLabel="Main navigation"
    userName="Firas"
    userAvatarColor="blue"
  />
</header>
```

---

## 10. Related components

- **NavTabGroup** — center navigation
- **AvatarCircle** — user identity primitive
- **CircularIconButton** — utility actions
- **AvatarButton** *(future compound)* — likely future extraction of the avatar-button pattern seen here

---

## 11. Open questions / implementation notes

- **AvatarButton extraction:** now that this pattern appears here explicitly, promote it later only if it repeats enough
- **Sticky behavior:** still belongs at page-layout level
- **Notification badges:** still caller-owned
- **Large brands:** if a brand routinely crowds nav, solve at project level rather than complicating the compound

---

**Status:** final packaged







