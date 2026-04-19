// design-kit/primitives/PillStat.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

const pillStat = cva(
  "inline-flex h-12 items-center justify-between gap-4 rounded-full px-5",
  {
    variants: {
      variant: {
        light: "bg-white/95",
        muted: "bg-[#C7C9CE]",
        accent: "bg-[#DFFF2F]",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  },
);

const label = cva("text-[13px] font-medium", {
  variants: {
    variant: {
      light: "text-black/55",
      muted: "text-black/55",
      accent: "text-black/70",
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

const value = cva("text-[14px] text-black tracking-tight", {
  variants: {
    variant: {
      light: "font-semibold",
      muted: "font-semibold",
      accent: "font-bold",
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

export interface PillStatProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof pillStat> {
  /** Short descriptor. */
  label: ReactNode;
  /** Presented value. Optimized primarily for numeric/amount content. */
  value: ReactNode;
}

export const PillStat = forwardRef<HTMLDivElement, PillStatProps>(
  ({ label: labelNode, value: valueNode, variant, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pillStat({ variant }), className)}
        {...props}
      >
        <span className={label({ variant })}>{labelNode}</span>
        <span className={value({ variant })}>{valueNode}</span>
      </div>
    );
  },
);

PillStat.displayName = "PillStat";

