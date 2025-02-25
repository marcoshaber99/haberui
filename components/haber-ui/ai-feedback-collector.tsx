/**
 * A flexible component for collecting user feedback on AI-generated content.
 * Supports thumbs up/down reactions, optional comments, and custom styling.
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ThumbsUp, ThumbsDown, MessageSquare, Check } from "lucide-react";

export type FeedbackType = "positive" | "negative" | null;

export interface AIFeedbackCollectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
   * Text shown for the feedback prompt
   */
  promptText?: string;
  /**
   * Text shown after feedback is submitted
   */
  thanksText?: string;
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
}

export const AIFeedbackCollector = React.forwardRef<
  HTMLDivElement,
  AIFeedbackCollectorProps
>(
  (
    {
      className,
      onFeedback,
      allowComments = false,
      promptText = "Was this response helpful?",
      thanksText = "Thanks for your feedback!",
      positiveIcon,
      negativeIcon,
      buttonClassName,
      activeButtonClassName,
      ...props
    },
    ref
  ) => {
    const [feedbackType, setFeedbackType] = React.useState<FeedbackType>(null);
    const [comment, setComment] = React.useState("");
    const [showCommentField, setShowCommentField] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleFeedbackClick = (type: FeedbackType) => {
      // Toggle off if clicking the same button
      if (feedbackType === type) {
        setFeedbackType(null);
        return;
      }

      setFeedbackType(type);

      // If we don't allow comments, submit immediately
      if (!allowComments) {
        submitFeedback(type);
      } else if (type === "negative") {
        // Show comment field for negative feedback
        setShowCommentField(true);
      } else {
        // Submit positive feedback without comment
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

    const defaultButtonClass = cn(
      "inline-flex items-center justify-center rounded-md p-2 transition-colors",
      "hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      buttonClassName
    );

    const activeButtonClass = cn(
      defaultButtonClass,
      "bg-muted",
      activeButtonClassName
    );

    if (isSubmitted) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center gap-2 text-sm", className)}
          {...props}
        >
          <Check size={16} className="text-green-500" />
          <span>{thanksText}</span>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{promptText}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleFeedbackClick("positive")}
              className={
                feedbackType === "positive"
                  ? activeButtonClass
                  : defaultButtonClass
              }
              disabled={isSubmitting}
              aria-label="Positive feedback"
            >
              {positiveIcon || <ThumbsUp size={16} />}
            </button>
            <button
              onClick={() => handleFeedbackClick("negative")}
              className={
                feedbackType === "negative"
                  ? activeButtonClass
                  : defaultButtonClass
              }
              disabled={isSubmitting}
              aria-label="Negative feedback"
            >
              {negativeIcon || <ThumbsDown size={16} />}
            </button>
          </div>
        </div>

        {allowComments && showCommentField && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Would you like to add a comment?
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What could be improved?"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                disabled={isSubmitting}
              />
              <button
                onClick={handleCommentSubmit}
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

AIFeedbackCollector.displayName = "AIFeedbackCollector";
