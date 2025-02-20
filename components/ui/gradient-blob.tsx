import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientBlobProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "blue" | "purple" | "emerald";
  animate?: boolean;
}

const GradientBlob = React.forwardRef<HTMLDivElement, GradientBlobProps>(
  (
    { className, size = "md", variant = "blue", animate = true, ...props },
    ref
  ) => {
    const sizeClasses = {
      sm: "w-32 h-32",
      md: "w-48 h-48",
      lg: "w-64 h-64",
      xl: "w-96 h-96",
    };

    const variantClasses = {
      blue: "bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500",
      purple: "bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500",
      emerald: "bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-500",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-full blur-3xl opacity-70",
          animate !== false && "animate-pulse",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

GradientBlob.displayName = "GradientBlob";

export { GradientBlob };
