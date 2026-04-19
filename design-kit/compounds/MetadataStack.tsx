// design-kit/compounds/MetadataStack.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { KeyValueRow } from "../primitives/KeyValueRow";

export interface MetadataItem {
  id: string;
  label: ReactNode;
  value: ReactNode;
}

export interface MetadataStackProps extends HTMLAttributes<HTMLDivElement> {
  items: MetadataItem[];
  /** Right matches the reference. */
  align?: "left" | "right";
}

export const MetadataStack = forwardRef<HTMLDivElement, MetadataStackProps>(
  ({ items, align = "right", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2",
          align === "right" ? "items-end" : "items-start",
          className,
        )}
        {...props}
      >
        {items.map((item) => (
          <KeyValueRow
            key={item.id}
            label={item.label}
            value={item.value}
            layout="compact"
          />
        ))}
      </div>
    );
  },
);

MetadataStack.displayName = "MetadataStack";


