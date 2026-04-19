// design-kit/compounds/SegmentedToggle.tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { CircularIconButton } from "../primitives/CircularIconButton";

export interface ToggleOption {
  value: string;
  icon: ReactNode;
  /** Required for accessibility. Describes the option. */
  label: string;
}

export interface SegmentedToggleProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 2 to 4 options. */
  options: ToggleOption[];
  /** Currently selected value. */
  value: string;
  /** Called when the user selects an option. */
  onChange: (value: string) => void;
  /** Required. Describes what is being toggled. */
  "aria-label": string;
  disabled?: boolean;
}

export const SegmentedToggle = forwardRef<HTMLDivElement, SegmentedToggleProps>(
  ({ options, value, onChange, disabled, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn(
          "inline-flex items-center rounded-full p-1",
          "border border-white/[0.08] bg-white/[0.06]",
          disabled && "pointer-events-none opacity-40",
          className,
        )}
        {...props}
      >
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <CircularIconButton
              key={option.value}
              variant={isSelected ? "light" : "glass"}
              size="sm"
              icon={option.icon}
              aria-label={option.label}
              role="radio"
              aria-checked={isSelected}
              onClick={() => !isSelected && onChange(option.value)}
            />
          );
        })}
      </div>
    );
  },
);

SegmentedToggle.displayName = "SegmentedToggle";


