// design-kit/primitives/MetricBlock.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

const metricBlock = cva("flex flex-col gap-1", {
  variants: {
    align: {
      left: "items-start text-left",
      right: "items-end text-right",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

const metricValue = cva("text-white font-semibold tracking-tight leading-none", {
  variants: {
    size: {
      sm: "text-[18px]",
      md: "text-[22px]",
      lg: "text-[32px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const metricLabel = cva("text-white/[0.46] font-normal leading-snug", {
  variants: {
    size: {
      sm: "text-[11px]",
      md: "text-xs",
      lg: "text-[13px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface MetricBlockProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof metricBlock> {
  /** Headline value. Accepts formatted ReactNode content. */
  value: ReactNode;
  /** Quiet descriptor for the value. */
  label: ReactNode;
  /** Size tier controlling both value and label. */
  size?: "sm" | "md" | "lg";
}

export const MetricBlock = forwardRef<HTMLDivElement, MetricBlockProps>(
  ({ value, label, align, size = "md", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(metricBlock({ align }), className)}
        {...props}
      >
        <span className={metricValue({ size })}>{value}</span>
        <span className={metricLabel({ size })}>{label}</span>
      </div>
    );
  },
);

MetricBlock.displayName = "MetricBlock";

