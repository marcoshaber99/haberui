import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const haberButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] text-white shadow-lg hover:shadow-xl",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-500 shadow-blue-500/30 hover:shadow-blue-600/40",
        royal:
          "bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-400 hover:from-purple-700 hover:via-violet-600 hover:to-indigo-500 shadow-purple-500/30 hover:shadow-purple-600/40",
        emerald:
          "bg-gradient-to-r from-emerald-600 via-green-500 to-teal-400 hover:from-emerald-700 hover:via-green-600 hover:to-teal-500 shadow-emerald-500/30 hover:shadow-emerald-600/40",
        sunset:
          "bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 hover:from-orange-600 hover:via-rose-600 hover:to-pink-600 shadow-rose-500/30 hover:shadow-rose-600/40",
        cosmic:
          "bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 hover:from-indigo-700 hover:via-purple-600 hover:to-pink-500 shadow-purple-500/30 hover:shadow-purple-600/40",
        ocean:
          "bg-gradient-to-r from-cyan-600 via-teal-500 to-blue-400 hover:from-cyan-700 hover:via-teal-600 hover:to-blue-500 shadow-cyan-500/30 hover:shadow-cyan-600/40",
        obsidian:
          "bg-gradient-to-r from-zinc-900 via-slate-800 to-zinc-700 hover:from-zinc-800 hover:via-slate-700 hover:to-zinc-600 shadow-zinc-800/30 hover:shadow-zinc-900/40",
      },
      size: {
        sm: "h-9 rounded-md px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-8 text-base",
        xl: "h-12 rounded-md px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface HaberButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof haberButtonVariants> {
  asChild?: boolean;
}

const HaberButton = React.forwardRef<HTMLButtonElement, HaberButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <Button
        className={cn(haberButtonVariants({ variant, size, className }))}
        ref={ref}
        asChild={asChild}
        {...props}
      />
    );
  }
);

HaberButton.displayName = "HaberButton";

export { HaberButton, haberButtonVariants };
