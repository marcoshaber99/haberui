"use client";

import React from "react";
import { AIFeedbackCollector } from "@/components/haber-ui/ai-feedback-collector";
import { TabDemo } from "@/components/demos/demo-factory";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Angry, Smile, Star, X } from "lucide-react";

const handleFeedback = async (feedback: {
  type: "positive" | "negative" | null;
  comment?: string;
}) => {
  console.log("Feedback received:", feedback);
  return new Promise<void>((resolve) => setTimeout(resolve, 800));
};

export function BasicDemo() {
  return (
    <TabDemo
      title="Basic Usage"
      preview={<AIFeedbackCollector onFeedback={handleFeedback} />}
      code={`<AIFeedbackCollector onFeedback={handleFeedback} />`}
    />
  );
}

export function CommentsDemo() {
  return (
    <TabDemo
      title="With Comments"
      preview={
        <AIFeedbackCollector
          onFeedback={handleFeedback}
          allowComments={true}
          promptText="Did this answer help you?"
          commentPromptText="Help us improve"
        />
      }
      code={`<AIFeedbackCollector
  onFeedback={handleFeedback}
  allowComments={true}
  promptText="Did this answer help you?"
  commentPromptText="Help us improve"
/>`}
    />
  );
}

export function VariantsDemo() {
  return (
    <TabDemo
      title="Style Variants"
      preview={
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Default</p>
            <AIFeedbackCollector
              variant="default"
              onFeedback={handleFeedback}
            />
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Minimal</p>
            <AIFeedbackCollector
              variant="minimal"
              onFeedback={handleFeedback}
            />
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Card</p>
            <AIFeedbackCollector variant="card" onFeedback={handleFeedback} />
          </div>
        </div>
      }
      code={`<AIFeedbackCollector variant="default" onFeedback={handleFeedback} />
<AIFeedbackCollector variant="minimal" onFeedback={handleFeedback} />
<AIFeedbackCollector variant="card" onFeedback={handleFeedback} />`}
    />
  );
}

export function ColorSchemesDemo() {
  return (
    <TabDemo
      title="Color Schemes"
      preview={
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Default</p>
            <AIFeedbackCollector
              colorScheme="default"
              onFeedback={handleFeedback}
            />
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Blue</p>
            <AIFeedbackCollector
              colorScheme="blue"
              onFeedback={handleFeedback}
            />
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Green</p>
            <AIFeedbackCollector
              colorScheme="green"
              onFeedback={handleFeedback}
            />
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Purple</p>
            <AIFeedbackCollector
              colorScheme="purple"
              onFeedback={handleFeedback}
            />
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Amber</p>
            <AIFeedbackCollector
              colorScheme="amber"
              onFeedback={handleFeedback}
            />
          </div>
        </div>
      }
      code={`<AIFeedbackCollector colorScheme="default" onFeedback={handleFeedback} />
<AIFeedbackCollector colorScheme="blue" onFeedback={handleFeedback} />
<AIFeedbackCollector colorScheme="green" onFeedback={handleFeedback} />
<AIFeedbackCollector colorScheme="purple" onFeedback={handleFeedback} />
<AIFeedbackCollector colorScheme="amber" onFeedback={handleFeedback} />`}
    />
  );
}

export function SizesDemo() {
  return (
    <TabDemo
      title="Size Variants"
      preview={
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Small</p>
            <AIFeedbackCollector size="sm" onFeedback={handleFeedback} />
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">
              Medium (Default)
            </p>
            <AIFeedbackCollector size="md" onFeedback={handleFeedback} />
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Large</p>
            <AIFeedbackCollector size="lg" onFeedback={handleFeedback} />
          </div>
        </div>
      }
      code={`<AIFeedbackCollector size="sm" onFeedback={handleFeedback} />
<AIFeedbackCollector size="md" onFeedback={handleFeedback} />
<AIFeedbackCollector size="lg" onFeedback={handleFeedback} />`}
    />
  );
}

export function CustomIconsDemo() {
  return (
    <TabDemo
      title="Custom Icons"
      preview={
        <div className="flex flex-col gap-4">
          <AIFeedbackCollector
            positiveIcon={<Star className="text-amber-500" />}
            negativeIcon={<X className="text-red-500" />}
            onFeedback={handleFeedback}
            promptText="Rate this response"
          />

          <AIFeedbackCollector
            positiveIcon={<Smile className="text-green-500" />}
            negativeIcon={<Angry className="text-red-500" />}
            onFeedback={handleFeedback}
            promptText="How was this answer?"
            colorScheme="green"
          />
        </div>
      }
      code={`import { Star, X, Smile, Angry } from "lucide-react";

<AIFeedbackCollector
  positiveIcon={<Star className="text-amber-500" />}
  negativeIcon={<X className="text-red-500" />}
  onFeedback={handleFeedback}
  promptText="Rate this response"
/>

<AIFeedbackCollector
  positiveIcon={<Smile className="text-green-500" />}
  negativeIcon={<Angry className="text-red-500" />}
  onFeedback={handleFeedback}
  promptText="How was this answer?"
  colorScheme="green"
/>`}
    />
  );
}

export function ChatIntegrationDemo() {
  return (
    <TabDemo
      title="Chat Integration"
      preview={
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex flex-col gap-3 max-w-md">
            <div className="p-3 rounded-lg bg-background text-sm">
              The GDP of France was approximately €2.5 trillion in 2022, making
              it the 7th largest economy in the world.
            </div>

            <div className="mt-1">
              <AIFeedbackCollector
                size="sm"
                onFeedback={handleFeedback}
                allowComments={true}
                promptText="Was this helpful?"
                commentPromptText="What would improve this answer?"
                colorScheme="blue"
              />
            </div>
          </div>
        </div>
      }
      code={`<div className="mt-1">
  <AIFeedbackCollector
    size="sm"
    onFeedback={handleFeedback}
    allowComments={true}
    promptText="Was this helpful?"
    commentPromptText="What would improve this answer?"
    colorScheme="blue"
  />
</div>`}
    />
  );
}

export function PropsTable() {
  return (
    <TypeTable
      type={{
        variant: {
          description: "Visual style variant",
          type: '"default" | "minimal" | "card"',
          default: '"default"',
        },
        size: {
          description: "Size variant",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
        },
        colorScheme: {
          description: "Color theme for active state",
          type: '"default" | "blue" | "green" | "amber" | "purple"',
          default: '"default"',
        },
        onFeedback: {
          description: "Function called when feedback is submitted",
          type: '(feedback: { type: "positive" | "negative" | null; comment?: string }) => void | Promise<void>',
        },
        allowComments: {
          description: "Allow users to add comments with their feedback",
          type: "boolean",
          default: "false",
        },
        commentsOnNegativeOnly: {
          description: "Only show comment field for negative feedback",
          type: "boolean",
          default: "true",
        },
        promptText: {
          description: "Text for the feedback prompt",
          type: "string",
          default: '"Was this response helpful?"',
        },
        thanksText: {
          description: "Text shown after submission",
          type: "string",
          default: '"Thanks for your feedback!"',
        },
        commentPromptText: {
          description: "Text for the comment field prompt",
          type: "string",
          default: '"Would you like to add a comment?"',
        },
        commentPlaceholder: {
          description: "Placeholder for the comment field",
          type: "string",
          default: '"What could be improved?"',
        },
        commentSubmitText: {
          description: "Text for the comment submit button",
          type: "string",
          default: '"Send"',
        },
        submittingText: {
          description: "Text shown while submitting",
          type: "string",
          default: '"Sending..."',
        },
        positiveIcon: {
          description: "Custom icon for positive feedback",
          type: "React.ReactNode",
          default: "<ThumbsUp />",
        },
        negativeIcon: {
          description: "Custom icon for negative feedback",
          type: "React.ReactNode",
          default: "<ThumbsDown />",
        },
        buttonClassName: {
          description: "Additional classes for the buttons",
          type: "string",
        },
        activeButtonClassName: {
          description: "Additional classes for active buttons",
          type: "string",
        },
        commentFieldClassName: {
          description: "Additional classes for the comment field",
          type: "string",
        },
      }}
    />
  );
}
