/**
 * Subscription Card - A sleek, modern card for displaying subscription status
 * with elegant glow effects for SaaS AI applications.
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  XCircle,
  Zap,
} from "lucide-react";

const subscriptionCardVariants = cva(
  "transition-all duration-200 relative overflow-visible",
  {
    variants: {
      status: {
        active: "",
        trial: "",
        expired: "",
        cancelled: "",
        pastDue: "",
      },
      plan: {
        free: "",
        starter: "",
        pro: "",
        enterprise: "",
        custom: "",
      },
      accentColor: {
        blue: [
          // Glow effect for light mode
          "data-[active=true]:shadow-[0_0_20px_1px_rgba(37,99,235,0.15)]",
          // Glow effect for dark mode
          "dark:data-[active=true]:shadow-[0_0_25px_2px_rgba(6,182,212,0.18)]",
          // Border colors
          "data-[active=true]:border-blue-200 dark:data-[active=true]:border-cyan-800",
          // Badge colors
          "[&_[data-plan-badge]]:bg-blue-500/90 [&_[data-plan-badge]]:text-white",
          // Progress bar colors
          "[&_[data-subscription-progress]]:bg-blue-100 dark:[&_[data-subscription-progress]]:bg-blue-950/50",
          "[&_[data-subscription-progress-indicator]]:bg-blue-500",
        ],
        purple: [
          "data-[active=true]:shadow-[0_0_20px_1px_rgba(126,34,206,0.15)]",
          "dark:data-[active=true]:shadow-[0_0_25px_2px_rgba(147,51,234,0.18)]",
          "data-[active=true]:border-purple-200 dark:data-[active=true]:border-purple-800",
          "[&_[data-plan-badge]]:bg-purple-500/90 [&_[data-plan-badge]]:text-white",
          "[&_[data-subscription-progress]]:bg-purple-100 dark:[&_[data-subscription-progress]]:bg-purple-950/50",
          "[&_[data-subscription-progress-indicator]]:bg-purple-500",
        ],
        green: [
          "data-[active=true]:shadow-[0_0_20px_1px_rgba(5,150,105,0.15)]",
          "dark:data-[active=true]:shadow-[0_0_25px_2px_rgba(16,185,129,0.18)]",
          "data-[active=true]:border-green-200 dark:data-[active=true]:border-green-800",
          "[&_[data-plan-badge]]:bg-green-500/90 [&_[data-plan-badge]]:text-white",
          "[&_[data-subscription-progress]]:bg-green-100 dark:[&_[data-subscription-progress]]:bg-green-950/50",
          "[&_[data-subscription-progress-indicator]]:bg-green-500",
        ],
        amber: [
          "data-[active=true]:shadow-[0_0_20px_1px_rgba(217,119,6,0.15)]",
          "dark:data-[active=true]:shadow-[0_0_25px_2px_rgba(245,158,11,0.18)]",
          "data-[active=true]:border-amber-200 dark:data-[active=true]:border-amber-800",
          "[&_[data-plan-badge]]:bg-amber-500/90 [&_[data-plan-badge]]:text-white",
          "[&_[data-subscription-progress]]:bg-amber-100 dark:[&_[data-subscription-progress]]:bg-amber-950/50",
          "[&_[data-subscription-progress-indicator]]:bg-amber-500",
        ],
        rose: [
          "data-[active=true]:shadow-[0_0_20px_1px_rgba(225,29,72,0.15)]",
          "dark:data-[active=true]:shadow-[0_0_25px_2px_rgba(244,63,94,0.18)]",
          "data-[active=true]:border-rose-200 dark:data-[active=true]:border-rose-800",
          "[&_[data-plan-badge]]:bg-rose-500/90 [&_[data-plan-badge]]:text-white",
          "[&_[data-subscription-progress]]:bg-rose-100 dark:[&_[data-subscription-progress]]:bg-rose-950/50",
          "[&_[data-subscription-progress-indicator]]:bg-rose-500",
        ],
      },
      size: {
        sm: "max-w-[280px]",
        md: "max-w-[350px]",
        lg: "max-w-[420px]",
      },
    },
    defaultVariants: {
      accentColor: "blue",
      size: "md",
    },
  }
);

// Status badge variants
const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      status: {
        active:
          "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400 border border-green-200/50 dark:border-green-900/50",
        trial:
          "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/50",
        expired:
          "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/50",
        cancelled:
          "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/50",
        pastDue:
          "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 border border-red-200/50 dark:border-red-900/50",
      },
    },
    defaultVariants: {
      status: "active",
    },
  }
);

export interface SubscriptionCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof subscriptionCardVariants> {
  /**
   * Subscription status
   */
  status?: "active" | "trial" | "expired" | "cancelled" | "pastDue";

  /**
   * Plan name
   */
  planName: string;

  /**
   * Plan description
   */
  planDescription?: string;

  /**
   * Current usage (0-100)
   */
  usagePercentage?: number;

  /**
   * Usage label (e.g. "5,000/10,000 credits used")
   */
  usageLabel?: string;

  /**
   * Date information (renewal, expiry, etc.)
   */
  dateInfo?: string;

  /**
   * Action button
   */
  actionButton?: React.ReactNode;

  /**
   * Whether to show the glow effect
   */
  showGlow?: boolean;

  /**
   * Price information
   */
  priceInfo?: string;

  /**
   * Icon for the plan
   */
  planIcon?: React.ReactNode;
}

export const SubscriptionCard = React.forwardRef<
  HTMLDivElement,
  SubscriptionCardProps
>(
  (
    {
      className,
      status = "active",
      plan,
      accentColor,
      size,
      planName,
      planDescription,
      usagePercentage,
      usageLabel,
      dateInfo,
      actionButton,
      showGlow = true,
      priceInfo,
      planIcon,
      ...props
    },
    ref
  ) => {
    // Map status to appropriate icon
    const statusIcons = {
      active: <CheckCircle2 className="size-3.5" />,
      trial: <Clock className="size-3.5" />,
      expired: <XCircle className="size-3.5" />,
      cancelled: <XCircle className="size-3.5" />,
      pastDue: <CreditCard className="size-3.5" />,
    };

    // Map status to appropriate label
    const statusLabels = {
      active: "Active",
      trial: "Trial",
      expired: "Expired",
      cancelled: "Cancelled",
      pastDue: "Past Due",
    };

    // Default plan icon if not provided
    const defaultPlanIcon = planIcon || <Zap className="size-4" />;

    return (
      <Card
        ref={ref}
        data-active={showGlow}
        className={cn(
          subscriptionCardVariants({ status, plan, accentColor, size }),
          "border",
          className
        )}
        {...props}
      >
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start mb-2">
            <div
              data-plan-badge
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium"
            >
              <span className="mr-1">{defaultPlanIcon}</span>
              {planName}
            </div>

            <div className={cn(statusBadgeVariants({ status }))}>
              {statusIcons[status]}
              <span>{statusLabels[status]}</span>
            </div>
          </div>

          {planDescription && (
            <p className="text-muted-foreground text-sm mt-2">
              {planDescription}
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-4 pb-4">
          {usagePercentage !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Usage</span>
                {usageLabel && (
                  <span className="text-foreground font-medium">
                    {usageLabel}
                  </span>
                )}
              </div>
              <Progress
                data-subscription-progress="true"
                value={usagePercentage}
                className="h-1.5 bg-transparent"
              >
                <div
                  data-subscription-progress-indicator="true"
                  className="h-full"
                  style={{ width: `${usagePercentage}%` }}
                />
              </Progress>
            </div>
          )}

          {(dateInfo || priceInfo) && (
            <div className="pt-1 flex justify-between items-center text-sm">
              {dateInfo && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <CalendarDays className="size-3.5 text-muted-foreground/70" />
                  <span>{dateInfo}</span>
                </div>
              )}

              {priceInfo && <div className="font-medium">{priceInfo}</div>}
            </div>
          )}
        </CardContent>

        {actionButton && (
          <CardFooter className="pt-2">{actionButton}</CardFooter>
        )}
      </Card>
    );
  }
);

SubscriptionCard.displayName = "SubscriptionCard";
