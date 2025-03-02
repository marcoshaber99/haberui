/**
 * Feature Toggle - A sleek, modern toggle button for enabling/disabling AI features
 * with an elegant glowing effect when active.
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const featureToggleVariants = cva(
  "inline-flex items-center gap-2 transition-all duration-200 font-medium rounded-full",
  {
    variants: {
      variant: {
        default: "border",
        outline: "border-2",
        solid: "",
      },
      size: {
        sm: "text-xs py-1 px-3",
        md: "text-sm py-1.5 px-4",
        lg: "text-base py-2 px-5",
      },
      colorScheme: {
        blue: [
          // Light mode styles
          "data-[state=on]:text-blue-700 dark:data-[state=on]:text-cyan-300",
          "data-[state=on]:border-blue-400/50 dark:data-[state=on]:border-cyan-500/30",
          "data-[state=on]:bg-blue-50/70 dark:data-[state=on]:bg-cyan-950/30",
          "data-[state=on]:shadow-[0_0_8px_1px_rgba(37,99,235,0.15),inset_0_0_5px_rgba(37,99,235,0.07)] dark:data-[state=on]:shadow-[0_0_10px_1px_rgba(6,182,212,0.2),inset_0_0_5px_rgba(6,182,212,0.1)]",
        ],
        purple: [
          "data-[state=on]:text-purple-700 dark:data-[state=on]:text-purple-300",
          "data-[state=on]:border-purple-400/50 dark:data-[state=on]:border-purple-500/30",
          "data-[state=on]:bg-purple-50/70 dark:data-[state=on]:bg-purple-950/30",
          "data-[state=on]:shadow-[0_0_8px_1px_rgba(126,34,206,0.15),inset_0_0_5px_rgba(126,34,206,0.07)] dark:data-[state=on]:shadow-[0_0_10px_1px_rgba(147,51,234,0.2),inset_0_0_5px_rgba(147,51,234,0.1)]",
        ],
        green: [
          "data-[state=on]:text-green-700 dark:data-[state=on]:text-green-300",
          "data-[state=on]:border-green-400/50 dark:data-[state=on]:border-green-500/30",
          "data-[state=on]:bg-green-50/70 dark:data-[state=on]:bg-green-950/30",
          "data-[state=on]:shadow-[0_0_8px_1px_rgba(5,150,105,0.15),inset_0_0_5px_rgba(5,150,105,0.07)] dark:data-[state=on]:shadow-[0_0_10px_1px_rgba(16,185,129,0.2),inset_0_0_5px_rgba(16,185,129,0.1)]",
        ],
        amber: [
          "data-[state=on]:text-amber-700 dark:data-[state=on]:text-amber-300",
          "data-[state=on]:border-amber-400/50 dark:data-[state=on]:border-amber-500/30",
          "data-[state=on]:bg-amber-50/70 dark:data-[state=on]:bg-amber-950/30",
          "data-[state=on]:shadow-[0_0_8px_1px_rgba(217,119,6,0.15),inset_0_0_5px_rgba(217,119,6,0.07)] dark:data-[state=on]:shadow-[0_0_10px_1px_rgba(245,158,11,0.2),inset_0_0_5px_rgba(245,158,11,0.1)]",
        ],
        rose: [
          "data-[state=on]:text-rose-700 dark:data-[state=on]:text-rose-300",
          "data-[state=on]:border-rose-400/50 dark:data-[state=on]:border-rose-500/30",
          "data-[state=on]:bg-rose-50/70 dark:data-[state=on]:bg-rose-950/30",
          "data-[state=on]:shadow-[0_0_8px_1px_rgba(225,29,72,0.15),inset_0_0_5px_rgba(225,29,72,0.07)] dark:data-[state=on]:shadow-[0_0_10px_1px_rgba(244,63,94,0.2),inset_0_0_5px_rgba(244,63,94,0.1)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      colorScheme: "blue",
    },
  }
);

export interface FeatureToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof featureToggleVariants> {
  /**
   * Current state of the toggle
   */
  active?: boolean;

  /**
   * Called when the toggle state changes
   */
  onActiveChange?: (active: boolean) => void;

  /**
   * Icon to display before the label
   */
  icon?: React.ReactNode;

  /**
   * Classes applied to active state
   */
  activeClassName?: string;

  /**
   * Classes applied to inactive state
   */
  inactiveClassName?: string;

  /**
   * Classes applied to the icon
   */
  iconClassName?: string;
}

export const FeatureToggle = React.forwardRef<
  HTMLButtonElement,
  FeatureToggleProps
>(
  (
    {
      className,
      variant,
      size,
      colorScheme,
      active = false,
      onActiveChange,
      children,
      icon,
      activeClassName,
      inactiveClassName,
      iconClassName,
      ...props
    },
    ref
  ) => {
    // Handle clicking on the toggle
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Call the original onClick if it exists
      props.onClick?.(e);
      // Call the onActiveChange callback
      onActiveChange?.(!active);
    };

    return (
      <button
        ref={ref}
        type="button"
        data-state={active ? "on" : "off"}
        className={cn(
          featureToggleVariants({ variant, size, colorScheme }),
          active
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground/80",
          active
            ? "border-muted/40 bg-background/40"
            : "border-muted/20 bg-transparent",
          active ? activeClassName : inactiveClassName,
          "cursor-pointer",
          className
        )}
        aria-pressed={active}
        onClick={handleClick}
        data-slot="control"
        {...props}
      >
        {icon && (
          <span
            className={cn("flex items-center justify-center", iconClassName)}
            data-slot="icon"
          >
            {icon}
          </span>
        )}
        <span data-slot="text">{children}</span>
      </button>
    );
  }
);

FeatureToggle.displayName = "FeatureToggle";
