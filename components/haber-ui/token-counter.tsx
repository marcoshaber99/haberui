/**
 * Token Counter - A small, elegant UI component that counts tokens in text
 * for AI applications, with visual indicators for approaching limits.
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface TokenCounterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The text to count tokens from
   */
  text: string;
  /**
   * Maximum token limit
   */
  maxTokens?: number;
  /**
   * The tokenizer to use (defaults to GPT-3.5 approximation)
   */
  tokenizer?: "gpt3" | "gpt4" | "claude" | "llama" | "custom";
  /**
   * Custom function to count tokens (used when tokenizer is 'custom')
   */
  customTokenCounter?: (text: string) => number;
  /**
   * Show warning when approaching token limit
   */
  showWarning?: boolean;
  /**
   * Percentage of max tokens that triggers the warning state
   */
  warningThreshold?: number;
  /**
   * Position of the counter
   */
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "inline";
  /**
   * Show progress bar
   */
  showProgress?: boolean;
  /**
   * Label for token count
   */
  label?: string;
  /**
   * Custom class for progress bar
   */
  progressClassName?: string;
}

// Simple tokenizer functions for different models (approximations)
const tokenizers: Record<string, (text: string) => number> = {
  gpt3: (text: string) => {
    // GPT-3 approximation (roughly 4 chars per token)
    return Math.ceil(text.length / 4);
  },
  gpt4: (text: string) => {
    // GPT-4 approximation (roughly 3.5 chars per token)
    return Math.ceil(text.length / 3.5);
  },
  claude: (text: string) => {
    // Claude approximation (roughly 4 chars per token)
    return Math.ceil(text.length / 4);
  },
  llama: (text: string) => {
    // LLaMA approximation (roughly 4.5 chars per token)
    return Math.ceil(text.length / 4.5);
  },
  // Adding empty custom tokenizer to satisfy TypeScript
  custom: () => 0,
};

export const TokenCounter = React.forwardRef<HTMLDivElement, TokenCounterProps>(
  (
    {
      className,
      text = "",
      maxTokens = 4096,
      tokenizer = "gpt3",
      customTokenCounter,
      showWarning = true,
      warningThreshold = 0.85,
      position = "inline",
      showProgress = true,
      label = "tokens",
      progressClassName,
      ...props
    },
    ref
  ) => {
    // Count tokens
    const tokenCount = React.useMemo(() => {
      if (tokenizer === "custom" && customTokenCounter) {
        return customTokenCounter(text);
      }
      return tokenizers[tokenizer](text);
    }, [text, tokenizer, customTokenCounter]);

    // Calculate percentage of tokens used
    const percentUsed = (tokenCount / maxTokens) * 100;

    // Determine if we should show a warning
    const isApproachingLimit = percentUsed >= warningThreshold * 100;
    const isOverLimit = percentUsed >= 100;

    // Position classes
    const positionClasses = {
      "top-right": "absolute top-2 right-2",
      "top-left": "absolute top-2 left-2",
      "bottom-right": "absolute bottom-2 right-2",
      "bottom-left": "absolute bottom-2 left-2",
      inline: "",
    };

    // Remove unused getColor function since we're using inline styles now

    return (
      <div
        ref={ref}
        className={cn(
          "text-xs flex flex-col gap-1.5",
          positionClasses[position],
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-1.5">
          {(isApproachingLimit || isOverLimit) && showWarning && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle
                    size={12}
                    className={
                      isOverLimit
                        ? "text-red-500 dark:text-red-400"
                        : "text-amber-500 dark:text-amber-400"
                    }
                  />
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs max-w-60">
                  {isOverLimit
                    ? `Exceeded maximum token limit of ${maxTokens.toLocaleString()}`
                    : `Approaching token limit (${Math.round(percentUsed)}% used)`}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <span
            className={cn(
              "font-medium",
              isOverLimit
                ? "text-red-600 dark:text-red-400"
                : isApproachingLimit
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-muted-foreground"
            )}
          >
            {tokenCount.toLocaleString()}
            {maxTokens ? ` / ${maxTokens.toLocaleString()}` : ""} {label}
          </span>
        </div>

        {showProgress && maxTokens > 0 && (
          <Progress
            value={Math.min(percentUsed, 100)}
            className={cn(
              "h-1",
              isOverLimit
                ? "bg-red-100 dark:bg-red-950 [&>div]:bg-red-500 dark:[&>div]:bg-red-400"
                : isApproachingLimit
                  ? "bg-amber-100 dark:bg-amber-950 [&>div]:bg-amber-500 dark:[&>div]:bg-amber-400"
                  : "bg-muted [&>div]:bg-primary",
              progressClassName
            )}
          />
        )}
      </div>
    );
  }
);

TokenCounter.displayName = "TokenCounter";
