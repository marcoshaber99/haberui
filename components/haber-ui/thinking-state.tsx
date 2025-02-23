"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ThinkingStateVariant = "pulse" | "dots" | "bars" | "bounce";
export type ThinkingStateMode = "random" | "sequential";

type MessageItem = string | ((index: number) => string) | React.ReactNode;

interface ThinkingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of messages or message generators to cycle through */
  messages?: MessageItem[];
  /** Animation variant */
  variant?: ThinkingStateVariant;
  /** How messages should cycle */
  mode?: ThinkingStateMode;
  /** Time between message changes in ms */
  interval?: number;
  /** Whether the process is complete */
  isComplete?: boolean;
  /** Message to show when complete */
  completionMessage?: MessageItem;
  /** Accessible label for the loading state */
  ariaLabel?: string;
}

const defaultMessages = ["Thinking...", "Processing...", "Almost there..."];

export const ThinkingState = React.forwardRef<
  HTMLDivElement,
  ThinkingStateProps
>(
  (
    {
      messages = defaultMessages,
      variant = "pulse",
      mode = "sequential",
      interval = 2000,
      isComplete = false,
      completionMessage = "Done!",
      className,
      ...props
    },
    ref
  ) => {
    const [currentMessage, setCurrentMessage] = React.useState<MessageItem>(
      messages[0]
    );
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isTransitioning, setIsTransitioning] = React.useState(false);

    const resolveMessage = React.useCallback(
      (message: MessageItem, index: number): React.ReactNode => {
        if (typeof message === "function") {
          return message(index);
        }
        return message;
      },
      []
    );

    React.useEffect(() => {
      if (isComplete) {
        setCurrentMessage(completionMessage);
        return;
      }

      const updateMessage = () => {
        setIsTransitioning(true);

        setTimeout(() => {
          if (mode === "random") {
            let nextIndex;
            do {
              nextIndex = Math.floor(Math.random() * messages.length);
            } while (nextIndex === currentIndex && messages.length > 1);
            setCurrentIndex(nextIndex);
            setCurrentMessage(messages[nextIndex]);
          } else {
            const nextIndex = (currentIndex + 1) % messages.length;
            setCurrentIndex(nextIndex);
            setCurrentMessage(messages[nextIndex]);
          }

          setIsTransitioning(false);
        }, 200);
      };

      const timer = setInterval(updateMessage, interval);
      return () => clearInterval(timer);
    }, [messages, mode, interval, currentIndex, isComplete, completionMessage]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 text-muted-foreground/80",
          className
        )}
        role="status"
        aria-label={props.ariaLabel || "Loading indicator"}
        {...props}
      >
        <div className="flex items-center gap-1" aria-hidden="true">
          {variant === "pulse" && (
            <>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "size-2 rounded-full bg-current",
                    !isComplete && "animate-[pulse_1.5s_ease-in-out_infinite]",
                    {
                      "animation-delay-[200ms]": i === 1,
                      "animation-delay-[400ms]": i === 2,
                    }
                  )}
                  style={{
                    animationName: !isComplete ? "thinking-pulse" : undefined,
                  }}
                />
              ))}
            </>
          )}

          {variant === "dots" && (
            <>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "size-2 rounded-full bg-current",
                    !isComplete && "animate-[bounce_1.4s_ease-in-out_infinite]",
                    {
                      "animation-delay-[200ms]": i === 1,
                      "animation-delay-[400ms]": i === 2,
                    }
                  )}
                  style={{
                    animationName: !isComplete ? "thinking-bounce" : undefined,
                  }}
                />
              ))}
            </>
          )}

          {variant === "bars" && (
            <>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-4 w-1 rounded-full bg-current",
                    !isComplete && "animate-[scale_1.5s_ease-in-out_infinite]",
                    {
                      "animation-delay-[200ms]": i === 1,
                      "animation-delay-[400ms]": i === 2,
                    }
                  )}
                  style={{
                    animationName: !isComplete ? "thinking-scale" : undefined,
                  }}
                />
              ))}
            </>
          )}

          {variant === "bounce" && (
            <div
              className={cn(
                "size-4 rounded-full bg-current",
                !isComplete && "animate-bounce"
              )}
            />
          )}
        </div>

        <span
          className={cn(
            "text-sm font-medium transition-opacity duration-300",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
          aria-live="polite"
          aria-atomic="true"
        >
          {resolveMessage(currentMessage, currentIndex)}
        </span>
      </div>
    );
  }
);

ThinkingState.displayName = "ThinkingState";

// Add styles to document
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes thinking-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    @keyframes thinking-bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    @keyframes thinking-scale {
      0%, 100% { transform: scaleY(1); }
      50% { transform: scaleY(0.4); }
    }
  `;
  document.head.appendChild(style);
}
