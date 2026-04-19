// design-kit/primitives/GlassPanel.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils/cn";

const glassPanel = cva(
  [
    "rounded-[28px] border border-white/[0.08]",
    // Blur is part of the intended look, but may be reduced later if profiling demands it.
    "backdrop-blur-xl",
  ],
  {
    variants: {
      variant: {
        glass: "bg-white/[0.04]",
        raised: "bg-white/[0.07]",
      },
    },
    defaultVariants: {
      variant: "glass",
    },
  },
);

export interface GlassPanelProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassPanel> {
  /**
   * Pragmatic polymorphism:
   * when true, the panel renders as its single child element via Radix Slot.
   * Typing remains HTMLDivElement-based for simplicity.
   */
  asChild?: boolean;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ asChild, variant, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(glassPanel({ variant }), className)}
        {...props}
      />
    );
  },
);

GlassPanel.displayName = "GlassPanel";

