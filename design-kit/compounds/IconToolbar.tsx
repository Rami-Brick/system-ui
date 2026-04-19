// design-kit/compounds/IconToolbar.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

const iconToolbar = cva("flex flex-row items-center", {
  variants: {
    density: {
      default: "gap-2",
      tight: "gap-1",
    },
  },
  defaultVariants: {
    density: "default",
  },
});

export interface IconToolbarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconToolbar> {
  /**
   * Required. Describes the purpose of the grouped actions.
   * Examples: "Page actions", "Invoice actions", "List management actions"
   */
  "aria-label": string;
  /** Expected children: CircularIconButton instances. */
  children: ReactNode;
}

export const IconToolbar = forwardRef<HTMLDivElement, IconToolbarProps>(
  ({ density, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="toolbar"
        aria-orientation="horizontal"
        className={cn(iconToolbar({ density }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

IconToolbar.displayName = "IconToolbar";


