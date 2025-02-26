/**
 * ThinkingState - A customizable, animated indicator for loading/thinking states
 * with support for message cycling and completion states.
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";

const thinkingStateVariants = cva(
  "flex items-center text-muted-foreground/80 transition-colors",
  {
    variants: {
      variant: {
        pulse: "",
        dots: "",
        bars: "",
        bounce: "",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      colorScheme: {
        default: "",
        blue: "text-blue-500",
        purple: "text-purple-500",
        green: "text-green-500",
        amber: "text-amber-500",
        rose: "text-rose-500",
      },
    },
    defaultVariants: {
      variant: "pulse",
      size: "md",
      colorScheme: "default",
    },
  }
);

type MessageItem = string | ((index: number) => string) | React.ReactNode;

export interface ThinkingStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof thinkingStateVariants>, "color"> {
  /**
   * Array of messages or message generators to cycle through
   */
  messages?: MessageItem[];

  /**
   * How messages should cycle
   */
  mode?: "random" | "sequential";

  /**
   * Time between message changes in ms
   */
  interval?: number;

  /**
   * Whether the process is complete
   */
  isComplete?: boolean;

  /**
   * Message to show when complete
   */
  completionMessage?: MessageItem;

  /**
   * Accessible label for the loading indicator
   */
  ariaLabel?: string;

  /**
   * Classes to apply to the animation container
   */
  animationClassName?: string;

  /**
   * Classes to apply to the message text
   */
  messageClassName?: string;
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
      size = "md",
      colorScheme = "default",
      mode = "sequential",
      interval = 2000,
      isComplete = false,
      completionMessage = "Done!",
      className,
      animationClassName,
      messageClassName,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const [currentMessage, setCurrentMessage] = React.useState<MessageItem>(
      messages[0]
    );
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isTransitioning, setIsTransitioning] = React.useState(false);
    const [longestMessage, setLongestMessage] = React.useState("");

    // Find the longest message for width calculation
    React.useEffect(() => {
      const allMessages = [...messages, completionMessage];
      let longest = "";

      allMessages.forEach((msg) => {
        const resolvedMsg = typeof msg === "function" ? msg(0) : msg;
        const msgStr = React.isValidElement(resolvedMsg)
          ? "XXXXXXXXXXXXX" // Placeholder for React elements
          : String(resolvedMsg);

        if (msgStr.length > longest.length) {
          longest = msgStr;
        }
      });

      setLongestMessage(longest);
    }, [messages, completionMessage]);

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
        return () => {};
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
          thinkingStateVariants({ variant, size, colorScheme }),
          className
        )}
        role="status"
        aria-label={ariaLabel || "Loading indicator"}
        data-state={isComplete ? "complete" : "loading"}
        data-variant={variant}
        {...props}
      >
        {/* Animation dots container */}
        <div
          className={cn("flex items-center mr-3", animationClassName)}
          aria-hidden="true"
          data-slot="animation"
        >
          {variant === "pulse" && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "size-2 rounded-full bg-current mx-0.5 first:ml-0 last:mr-0"
                  )}
                  initial={{ opacity: 1 }}
                  animate={
                    !isComplete
                      ? {
                          opacity: [1, 0.4, 1],
                        }
                      : { opacity: 1 }
                  }
                  transition={{
                    duration: 1.5,
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </>
          )}

          {variant === "dots" && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "size-2 rounded-full bg-current mx-0.5 first:ml-0 last:mr-0"
                  )}
                  initial={{ y: 0 }}
                  animate={
                    !isComplete
                      ? {
                          y: [0, -4, 0],
                        }
                      : { y: 0 }
                  }
                  transition={{
                    duration: 1.4,
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </>
          )}

          {variant === "bars" && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "h-4 w-1 rounded-full bg-current mx-0.5 first:ml-0 last:mr-0"
                  )}
                  initial={{ scaleY: 1 }}
                  animate={
                    !isComplete
                      ? {
                          scaleY: [1, 0.4, 1],
                          transformOrigin: "center bottom",
                        }
                      : { scaleY: 1 }
                  }
                  transition={{
                    duration: 1.5,
                    times: [0, 0.5, 1], // Control the timing more precisely
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </>
          )}

          {variant === "bounce" && (
            <motion.div
              className={cn("size-4 rounded-full bg-current")}
              initial={{ y: 0 }}
              animate={
                !isComplete
                  ? {
                      y: [0, -10, 0],
                    }
                  : { y: 0 }
              }
              transition={{
                duration: 0.8,
                times: [0, 0.5, 1],
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
        </div>

        {/* Message container with stable width */}
        <div
          className="relative overflow-hidden min-w-28"
          data-slot="message-container"
        >
          {/* Current visible message */}
          <motion.div
            className={cn("font-medium", messageClassName)}
            initial={{ opacity: 1 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            aria-live="polite"
            aria-atomic="true"
            data-slot="message"
          >
            {resolveMessage(currentMessage, currentIndex)}
          </motion.div>

          {/* Hidden element for width measurement */}
          <div
            className="invisible absolute h-0 top-0 whitespace-nowrap"
            aria-hidden="true"
          >
            {longestMessage}
          </div>
        </div>
      </div>
    );
  }
);

ThinkingState.displayName = "ThinkingState";
