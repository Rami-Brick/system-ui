// design-kit/primitives/KeyValueRow.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

const keyValueRow = cva(
  "flex flex-row items-baseline gap-3 text-xs leading-snug whitespace-nowrap",
  {
    variants: {
      layout: {
        compact: "",
        between: "w-full justify-between",
      },
    },
    defaultVariants: {
      layout: "compact",
    },
  },
);

export interface KeyValueRowProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof keyValueRow> {
  /** Short descriptive key. */
  label: ReactNode;
  /** Short metadata value. */
  value: ReactNode;
}

export const KeyValueRow = forwardRef<HTMLDivElement, KeyValueRowProps>(
  ({ label, value, layout, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(keyValueRow({ layout }), className)}
        {...props}
      >
        <span className="text-white/[0.46] font-normal">{label}</span>
        <span className="text-white/[0.72] font-medium">{value}</span>
      </div>
    );
  },
);

KeyValueRow.displayName = "KeyValueRow";

