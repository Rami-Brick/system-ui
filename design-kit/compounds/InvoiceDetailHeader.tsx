// design-kit/compounds/InvoiceDetailHeader.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { MoreHorizontal, X } from "lucide-react";
import { PanelHeader } from "./PanelHeader";
import { IconToolbar } from "./IconToolbar";
import { CircularIconButton } from "../primitives/CircularIconButton";

export interface InvoiceDetailHeaderProps extends HTMLAttributes<HTMLDivElement> {
  recordId: string;
  actions: ReactNode;
  onMore?: () => void;
  onClose?: () => void;
}

export const InvoiceDetailHeader = forwardRef<
  HTMLDivElement,
  InvoiceDetailHeaderProps
>(({ recordId, actions, onMore, onClose, ...props }, ref) => {
  return (
    <PanelHeader
      ref={ref}
      {...props}
      leading={
        <span
          className="text-sm font-medium text-white/70"
          aria-label={`Invoice ${recordId}`}
        >
          {recordId}
        </span>
      }
      trailing={
        <div className="flex items-center gap-1">
          <IconToolbar density="tight" aria-label="Record actions">
            {actions}
          </IconToolbar>

          <CircularIconButton
            icon={<MoreHorizontal />}
            aria-label="More options"
            onClick={onMore}
          />

          <CircularIconButton
            icon={<X />}
            aria-label="Close detail panel"
            onClick={onClose}
          />
        </div>
      }
    />
  );
});

InvoiceDetailHeader.displayName = "InvoiceDetailHeader";


