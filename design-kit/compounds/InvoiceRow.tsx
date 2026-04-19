// design-kit/compounds/InvoiceRow.tsx
import { forwardRef, type HTMLAttributes } from "react";
import { MoreHorizontal, ArrowUpRight } from "lucide-react";
import { cn } from "../utils/cn";
import {
  AvatarCircle,
  type AvatarCircleColor,
} from "../primitives/AvatarCircle";
import { PillButton } from "../primitives/PillButton";
import { CircularIconButton } from "../primitives/CircularIconButton";

export interface InvoiceRowProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  avatarColor?: AvatarCircleColor;
  avatarSrc?: string;
  phone: string;
  balance: string;
  defaultAction: string;
  selectedAction: string;
  isSelected?: boolean;
  onAction?: () => void;
  onMore?: () => void;
  onOpen?: () => void;
}

export const InvoiceRow = forwardRef<HTMLDivElement, InvoiceRowProps>(
  (
    {
      name,
      avatarColor = "neutral",
      avatarSrc,
      phone,
      balance,
      defaultAction,
      selectedAction,
      isSelected = false,
      onAction,
      onMore,
      onOpen,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-selected={isSelected ? "true" : "false"}
        className={cn(
          "grid items-center gap-4 rounded-2xl px-3 py-2.5 transition-colors duration-150",
          "grid-cols-[8px_36px_1fr_80px_auto]",
          isSelected ? "bg-white/[0.18]" : "bg-transparent",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "size-2 rounded-full bg-white transition-opacity duration-150",
            isSelected ? "opacity-100" : "opacity-0",
          )}
        />

        <AvatarCircle
          name={name}
          src={avatarSrc}
          color={avatarColor}
          size="md"
        />

        <div className="min-w-0 flex flex-col gap-0.5">
          <span className="truncate text-sm font-medium text-white">{name}</span>
          <span className="truncate text-xs text-white/60">{phone}</span>
        </div>

        <span className="text-right text-sm font-medium tabular-nums text-white">
          {balance}
        </span>

        <div className="flex items-center gap-2">
          <PillButton variant="light" size="sm" onClick={onAction}>
            {isSelected ? selectedAction : defaultAction}
          </PillButton>

          <CircularIconButton
            variant="glass"
            size="sm"
            icon={<MoreHorizontal />}
            aria-label="More options"
            onClick={onMore}
          />

          <CircularIconButton
            variant="glass"
            size="sm"
            icon={<ArrowUpRight />}
            aria-label={`Open ${name}'s invoice`}
            onClick={onOpen}
          />
        </div>
      </div>
    );
  },
);

InvoiceRow.displayName = "InvoiceRow";


