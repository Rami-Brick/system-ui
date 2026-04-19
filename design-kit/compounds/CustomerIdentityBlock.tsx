// design-kit/compounds/CustomerIdentityBlock.tsx
import {
  forwardRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";
import {
  AvatarCircle,
  type AvatarCircleColor,
} from "../primitives/AvatarCircle";
import { KeyValueRow } from "../primitives/KeyValueRow";

export interface CustomerIdentityBlockProps
  extends HTMLAttributes<HTMLDivElement> {
  /** Entity name. */
  name: string;
  /** Optional name element tag. Defaults to `p`. */
  nameAs?: ElementType;
  /** Optional image URL. */
  avatarSrc?: string;
  /** Identity color. */
  avatarColor?: AvatarCircleColor;
  /** Optional avatar badge. */
  avatarBadge?: ReactNode;
  /** Optional address lines. */
  address?: string[];
  /** Optional billing label. */
  billToLabel?: ReactNode;
  /** Optional billing value, typically a link. */
  billToValue?: ReactNode;
}

export const CustomerIdentityBlock = forwardRef<
  HTMLDivElement,
  CustomerIdentityBlockProps
>(
  (
    {
      name,
      nameAs: NameTag = "p",
      avatarSrc,
      avatarColor = "neutral",
      avatarBadge,
      address,
      billToLabel = "Bill To:",
      billToValue,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        <AvatarCircle
          name={name}
          src={avatarSrc}
          color={avatarColor}
          size="lg"
          badge={avatarBadge}
        />

        <div className="flex flex-col gap-0.5">
          <NameTag className="text-[20px] font-semibold leading-snug text-white">
            {name}
          </NameTag>

          {address && address.length > 0 ? (
            <div className="flex flex-col">
              {address.map((line, index) => (
                <span
                  key={index}
                  className="text-[13px] leading-snug text-white/70"
                >
                  {line}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {billToValue ? (
          <KeyValueRow
            label={billToLabel}
            value={billToValue}
            layout="compact"
          />
        ) : null}
      </div>
    );
  },
);

CustomerIdentityBlock.displayName = "CustomerIdentityBlock";


