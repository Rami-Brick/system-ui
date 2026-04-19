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
      <table className="w-full border-separate border-spacing-y-2 table-fixed">
        <colgroup>
          <col className="w-6" />
          <col />
          <col className="w-12" />
          <col className="w-[52px]" />
          <col className="w-[60px]" />
        </colgroup>

        <thead>
          <tr>
            {["#", "Item & Description", "Qty", "Rate", "Amount"].map((col, i) => (
              <th
                key={col}
                scope="col"
                className={cn(
                  "pb-1 text-[11px] font-medium text-white/[0.46]",
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
              <td className="text-right text-xs font-semibold text-white/[0.46]">
                {item.number}
              </td>
              <td className="text-left text-xs text-white/[0.72]">
                {item.description}
              </td>
              <td className="text-right text-xs text-white/[0.72]">{item.qty}</td>
              <td className="text-right text-xs text-white/[0.72]">{item.rate}</td>
              <td className="text-right text-xs font-semibold text-white">
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


