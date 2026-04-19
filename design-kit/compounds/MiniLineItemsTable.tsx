// design-kit/compounds/MiniLineItemsTable.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

export interface LineItem {
  id: string;
  number: number;
  description: ReactNode;
  qty: string;
  rate: string;
  amount: string;
}

export interface MiniLineItemsTableProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  items: LineItem[];
  /** Accessible caption-like label for surrounding context if needed. */
  "aria-label"?: string;
}

export const MiniLineItemsTable = forwardRef<
  HTMLDivElement,
  MiniLineItemsTableProps
>(({ items, className, ...props }, ref) => {
  if (!items.length) return null;

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      <table className="w-full table-fixed border-separate border-spacing-y-2">
        <colgroup>
          <col className="w-6" />
          <col />
          <col className="w-11" />
          <col className="w-[76px]" />
          <col className="w-[78px]" />
        </colgroup>

        <thead>
          <tr>
            {["#", "Item & Description", "Qty", "Rate", "Amount"].map((col, i) => (
              <th
                key={col}
                scope="col"
                className={cn(
                  "whitespace-nowrap pb-1 text-[10px] font-medium text-white/[0.46]",
                  i === 1 ? "text-left" : "text-right",
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="whitespace-nowrap text-right text-[11px] font-semibold text-white/[0.46]">
                {item.number}
              </td>
              <td className="truncate pr-3 text-left text-[11px] text-white/[0.72]">
                {item.description}
              </td>
              <td className="whitespace-nowrap text-right text-[11px] tabular-nums text-white/[0.72]">{item.qty}</td>
              <td className="whitespace-nowrap pl-3 text-right text-[11px] tabular-nums text-white/[0.72]">{item.rate}</td>
              <td className="whitespace-nowrap pl-3 text-right text-[11px] font-semibold tabular-nums text-white">
                {item.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

MiniLineItemsTable.displayName = "MiniLineItemsTable";


