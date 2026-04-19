// design-kit/compounds/NavTabGroup.tsx
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils/cn";
import { PillButton } from "../primitives/PillButton";

export interface NavTab {
  /** Unique identifier. */
  id: string;
  /** Visible label. */
  label: string;
  /** Rarely needed. Prefer hiding unavailable destinations instead. */
  disabled?: boolean;
}

export interface NavTabGroupProps
  extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  tabs: NavTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  /** Required. Describes the navigation group. */
  "aria-label": string;
}

export const NavTabGroup = forwardRef<HTMLElement, NavTabGroupProps>(
  ({ tabs, activeTab, onTabChange, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <PillButton
              key={tab.id}
              variant={isActive ? "light" : "ghost"}
              onClick={() => !isActive && !tab.disabled && onTabChange(tab.id)}
              aria-current={isActive ? "page" : undefined}
              disabled={tab.disabled}
            >
              {tab.label}
            </PillButton>
          );
        })}
      </nav>
    );
  },
);

NavTabGroup.displayName = "NavTabGroup";


