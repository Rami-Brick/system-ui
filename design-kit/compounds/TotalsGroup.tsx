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
    const gridColumns =
      totals.length === 1
        ? "grid-cols-1"
        : totals.length === 2
          ? "grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]"
          : "grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.25fr)]";

    return (
      <div
        ref={ref}
        className={cn(
          "grid w-full items-stretch gap-2",
          gridColumns,
          className,
        )}
        {...props}
      >
        {totals.map((item, index) => {
          const variant = variants[index];

          return (
            <PillStat
              key={item.id}
              variant={variant}
              label={item.label}
              value={item.value}
            />
          );
        })}
      </div>
    );
  },
);

TotalsGroup.displayName = "TotalsGroup";


