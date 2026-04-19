// design-kit/compounds/TotalsGroup.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { PillStat } from "../primitives/PillStat";

type PillStatVariant = "light" | "muted" | "accent";

const VARIANT_MAP: Record<number, PillStatVariant[]> = {
  1: ["accent"],
  2: ["light", "accent"],
  3: ["light", "muted", "accent"],
};

export interface TotalItem {
  id: string;
  label: ReactNode;
  value: ReactNode;
}

export interface TotalsGroupProps extends HTMLAttributes<HTMLDivElement> {
  totals: [TotalItem] | [TotalItem, TotalItem] | [TotalItem, TotalItem, TotalItem];
}

export const TotalsGroup = forwardRef<HTMLDivElement, TotalsGroupProps>(
  ({ totals, className, ...props }, ref) => {
    const variants = VARIANT_MAP[totals.length] ?? VARIANT_MAP[3];

    return (
      <div
        ref={ref}
        className={cn("flex w-full items-stretch gap-2", className)}
        {...props}
      >
        {totals.map((item, index) => {
          const variant = variants[index];
          const isEmphasis = index === totals.length - 1;

          return (
            <PillStat
              key={item.id}
              variant={variant}
              label={item.label}
              value={item.value}
              className={isEmphasis ? "flex-[1.5]" : "flex-1"}
            />
          );
        })}
      </div>
    );
  },
);

TotalsGroup.displayName = "TotalsGroup";


