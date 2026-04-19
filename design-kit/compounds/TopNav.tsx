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


