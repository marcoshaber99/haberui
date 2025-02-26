/**
 * A flexible component for collecting user feedback on AI-generated content.
 * Supports thumbs up/down reactions, optional comments, and custom styling.
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ThumbsUp, ThumbsDown, MessageSquare, Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

export type FeedbackType = "positive" | "negative" | null;

const feedbackCollectorVariants = cva("space-y-3", {
  variants: {
    variant: {
      default: "",
      minimal: "",
      card: "",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    colorScheme: {
      default: "",
      blue: "",
      green: "",
      amber: "",
      purple: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    colorScheme: "default",
  },
});

const feedbackButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md p-2 transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-muted focus-visible:ring-1 focus-visible:ring-ring",
        minimal:
          "hover:opacity-80 focus-visible:ring-1 focus-visible:ring-ring",
        card: "bg-card hover:bg-card/80 shadow-sm focus-visible:ring-1 focus-visible:ring-ring",
      },
      size: {
        sm: "p-1",
        md: "p-2",
        lg: "p-3",
      },
      colorScheme: {
        default: "",
        blue: "data-[state=active]:text-blue-500 data-[state=active]:bg-blue-500/10",
        green:
          "data-[state=active]:text-green-500 data-[state=active]:bg-green-500/10",
        amber:
          "data-[state=active]:text-amber-500 data-[state=active]:bg-amber-500/10",
        purple:
          "data-[state=active]:text-purple-500 data-[state=active]:bg-purple-500/10",
      },
      active: {
        true: "bg-muted",
        false: "",
      },
    },
    compoundVariants: [
      {
        colorScheme: "default",
        active: true,
        className: "bg-muted",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      colorScheme: "default",
      active: false,
    },
  }
);

export interface AIFeedbackCollectorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof feedbackCollectorVariants>, "color"> {
  /**
   * Function called when feedback is submitted
   */
  onFeedback?: (feedback: {
    type: FeedbackType;
    comment?: string;
  }) => void | Promise<void>;

  /**
   * Allow users to add comments with their feedback
   */
  allowComments?: boolean;

  /**
   * Only show comment field for negative feedback
   */
  commentsOnNegativeOnly?: boolean;

  /**
   * Text shown for the feedback prompt
   */
  promptText?: string;

  /**
   * Text shown after feedback is submitted
   */
  thanksText?: string;

  /**
   * Text for the comment field prompt
   */
  commentPromptText?: string;

  /**
   * Placeholder text for the comment field
   */
  commentPlaceholder?: string;

  /**
   * Text for the comment submit button
   */
  commentSubmitText?: string;

  /**
   * Text shown while submitting
   */
  submittingText?: string;

  /**
   * Custom icon for positive feedback (default: ThumbsUp)
   */
  positiveIcon?: React.ReactNode;

  /**
   * Custom icon for negative feedback (default: ThumbsDown)
   */
  negativeIcon?: React.ReactNode;

  /**
   * Custom classes for the buttons
   */
  buttonClassName?: string;

  /**
   * Custom classes for active (selected) buttons
   */
  activeButtonClassName?: string;

  /**
   * Custom classes for the comment field
   */
  commentFieldClassName?: string;
}

export const AIFeedbackCollector = React.forwardRef<
  HTMLDivElement,
  AIFeedbackCollectorProps
>(
  (
    {
      className,
      variant = "default",
      size = "md",
      colorScheme = "default",
      onFeedback,
      allowComments = false,
      commentsOnNegativeOnly = true,
      promptText = "Was this response helpful?",
      thanksText = "Thanks for your feedback!",
      commentPromptText = "Would you like to add a comment?",
      commentPlaceholder = "What could be improved?",
      commentSubmitText = "Send",
      submittingText = "Sending...",
      positiveIcon,
      negativeIcon,
      buttonClassName,
      activeButtonClassName,
      commentFieldClassName,
      ...props
    },
    ref
  ) => {
    const [feedbackType, setFeedbackType] = React.useState<FeedbackType>(null);
    const [comment, setComment] = React.useState("");
    const [showCommentField, setShowCommentField] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const commentInputRef = React.useRef<HTMLInputElement>(null);

    // Focus the comment input when it appears
    React.useEffect(() => {
      if (showCommentField && commentInputRef.current) {
        commentInputRef.current.focus();
      }
    }, [showCommentField]);

    const handleFeedbackClick = (type: FeedbackType) => {
      // Toggle off if clicking the same button
      if (feedbackType === type) {
        setFeedbackType(null);
        setShowCommentField(false);
        return;
      }

      setFeedbackType(type);

      // Determine whether to show comments
      if (allowComments) {
        if (commentsOnNegativeOnly) {
          // Only show comments for negative feedback
          if (type === "negative") {
            setShowCommentField(true);
          } else {
            submitFeedback(type);
          }
        } else {
          // Show comments for any feedback
          setShowCommentField(true);
        }
      } else {
        // Submit immediately without comments
        submitFeedback(type);
      }
    };

    const submitFeedback = async (type: FeedbackType, userComment?: string) => {
      if (!onFeedback) return;

      setIsSubmitting(true);

      try {
        await onFeedback({
          type,
          comment: userComment || comment,
        });
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error submitting feedback:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleCommentSubmit = () => {
      submitFeedback(feedbackType, comment);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleCommentSubmit();
      }
    };

    // If feedback was submitted, show the thank you message
    if (isSubmitted) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-2 text-green-500 transition-opacity duration-300",
            size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm",
            className
          )}
          role="status"
          {...props}
        >
          <Check
            size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
            className="shrink-0"
          />
          <span>{thanksText}</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          feedbackCollectorVariants({ variant, size, colorScheme }),
          className
        )}
        data-state={isSubmitting ? "submitting" : "idle"}
        {...props}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "text-muted-foreground",
              variant === "card" && "font-medium text-foreground"
            )}
          >
            {promptText}
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleFeedbackClick("positive")}
              className={cn(
                feedbackButtonVariants({
                  variant,
                  size,
                  colorScheme,
                  active: feedbackType === "positive",
                }),
                buttonClassName,
                feedbackType === "positive" && activeButtonClassName
              )}
              disabled={isSubmitting}
              aria-label="Positive feedback"
              aria-pressed={feedbackType === "positive"}
              data-state={feedbackType === "positive" ? "active" : "inactive"}
            >
              {positiveIcon || (
                <ThumbsUp size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleFeedbackClick("negative")}
              className={cn(
                feedbackButtonVariants({
                  variant,
                  size,
                  colorScheme,
                  active: feedbackType === "negative",
                }),
                buttonClassName,
                feedbackType === "negative" && activeButtonClassName
              )}
              disabled={isSubmitting}
              aria-label="Negative feedback"
              aria-pressed={feedbackType === "negative"}
              data-state={feedbackType === "negative" ? "active" : "inactive"}
            >
              {negativeIcon || (
                <ThumbsDown
                  size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
                />
              )}
            </button>
          </div>
        </div>

        {allowComments && showCommentField && (
          <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
              <MessageSquare
                size={size === "sm" ? 12 : size === "lg" ? 16 : 14}
                className="text-muted-foreground shrink-0"
              />
              <span
                className={cn(
                  "text-muted-foreground",
                  size === "sm"
                    ? "text-xs"
                    : size === "lg"
                      ? "text-base"
                      : "text-sm"
                )}
              >
                {commentPromptText}
              </span>
            </div>

            <div className="flex gap-2">
              <input
                ref={commentInputRef}
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={commentPlaceholder}
                className={cn(
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors",
                  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  commentFieldClassName
                )}
                disabled={isSubmitting}
                aria-label={commentPlaceholder}
              />

              <button
                type="button"
                onClick={handleCommentSubmit}
                className={cn(
                  "inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 font-medium",
                  "text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1",
                  "disabled:pointer-events-none disabled:opacity-50",
                  size === "sm"
                    ? "text-xs px-2"
                    : size === "lg"
                      ? "text-base px-4"
                      : "text-sm px-3"
                )}
                disabled={isSubmitting}
                aria-label={commentSubmitText}
              >
                {isSubmitting ? submittingText : commentSubmitText}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

AIFeedbackCollector.displayName = "AIFeedbackCollector";
