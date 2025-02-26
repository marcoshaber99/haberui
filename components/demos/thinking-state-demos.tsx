"use client";

import React, { useState, useEffect } from "react";
import { ThinkingState } from "@/components/haber-ui/thinking-state";
import { TabDemo } from "@/components/demos/demo-factory";
import { TypeTable } from "fumadocs-ui/components/type-table";

export function PulseVariantDemo() {
  return (
    <TabDemo
      title="Pulse Variant (Default)"
      preview={<ThinkingState aria-label="Processing your request" />}
      code={`<ThinkingState aria-label="Processing your request" />`}
    />
  );
}

export function DotsVariantDemo() {
  return (
    <TabDemo
      title="Dots Variant"
      preview={
        <ThinkingState
          variant="dots"
          colorScheme="blue"
          messages={[
            "Loading data...",
            "Crunching numbers...",
            "Almost ready...",
          ]}
        />
      }
      code={`<ThinkingState
  variant="dots"
  colorScheme="blue"
  messages={[
    "Loading data...",
    "Crunching numbers...",
    "Almost ready...",
  ]}
/>`}
    />
  );
}

export function BarsVariantDemo() {
  return (
    <TabDemo
      title="Bars Variant"
      preview={
        <ThinkingState
          variant="bars"
          messages={[
            "Generating response...",
            "Training model...",
            "Fine-tuning...",
          ]}
          mode="random"
        />
      }
      code={`<ThinkingState
  variant="bars"
  messages={[
    "Generating response...",
    "Training model...",
    "Fine-tuning...",
  ]}
  mode="random"
/>`}
    />
  );
}

export function BounceVariantDemo() {
  return (
    <TabDemo
      title="Bounce Variant"
      preview={
        <ThinkingState
          variant="bounce"
          messages={["Please wait...", "Working on it..."]}
          interval={1500}
        />
      }
      code={`<ThinkingState
  variant="bounce"
  messages={["Please wait...", "Working on it..."]}
  interval={1500}
/>`}
    />
  );
}

export function ColorSchemesDemo() {
  return (
    <TabDemo
      title="Color Schemes"
      preview={
        <div className="flex flex-col gap-3">
          <ThinkingState variant="pulse" colorScheme="default" />
          <ThinkingState variant="pulse" colorScheme="blue" />
          <ThinkingState variant="pulse" colorScheme="purple" />
          <ThinkingState variant="pulse" colorScheme="green" />
          <ThinkingState variant="pulse" colorScheme="amber" />
          <ThinkingState variant="pulse" colorScheme="rose" />
        </div>
      }
      code={`<ThinkingState variant="pulse" colorScheme="default" />
<ThinkingState variant="pulse" colorScheme="blue" />
<ThinkingState variant="pulse" colorScheme="purple" />
<ThinkingState variant="pulse" colorScheme="green" />
<ThinkingState variant="pulse" colorScheme="amber" />
<ThinkingState variant="pulse" colorScheme="rose" />`}
    />
  );
}

export function SizesDemo() {
  return (
    <TabDemo
      title="Size Variants"
      preview={
        <div className="flex flex-col gap-3">
          <ThinkingState size="sm" variant="dots" />
          <ThinkingState size="md" variant="dots" />
          <ThinkingState size="lg" variant="dots" />
        </div>
      }
      code={`<ThinkingState size="sm" variant="dots" />
<ThinkingState size="md" variant="dots" />
<ThinkingState size="lg" variant="dots" />`}
    />
  );
}

export function DynamicMessagesDemo() {
  return (
    <TabDemo
      title="Dynamic Messages"
      preview={
        <ThinkingState
          messages={[
            (index) => `Step ${index + 1}/3: Processing...`,
            <span key="custom" className="flex items-center gap-2">
              Loading <span className="text-blue-500">important</span> data
            </span>,
            "Almost there...",
          ]}
          interval={1500}
        />
      }
      code={`<ThinkingState
  messages={[
    (index) => \`Step \${index + 1}/3: Processing...\`,
    <span className="flex items-center gap-2">
      Loading <span className="text-blue-500">important</span> data
    </span>,
    "Almost there...",
  ]}
  interval={1500}
/>`}
    />
  );
}

export function CompletionStateDemo() {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsComplete(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TabDemo
      title="Completion State"
      preview={
        <div className="space-y-3">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setIsComplete(!isComplete)}
              className="px-3 py-1 text-xs rounded bg-secondary"
            >
              Toggle completion
            </button>
            <span className="text-sm text-muted-foreground">
              {isComplete ? "Complete" : "Processing..."}
            </span>
          </div>
          <ThinkingState
            isComplete={isComplete}
            completionMessage="Successfully loaded!"
            colorScheme="green"
          />
        </div>
      }
      code={`// In your component
const [isComplete, setIsComplete] = useState(false);

// Toggle completion state or set it based on your process
// setIsComplete(true);

<ThinkingState
  isComplete={isComplete}
  completionMessage="Successfully loaded!"
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
              Hello! How can I help you today?
            </div>
            <div className="p-3 rounded-lg bg-primary/10 text-sm ml-auto">
              Can you analyze this data and create a visualization?
            </div>
            <div className="p-3 rounded-lg bg-background">
              <ThinkingState
                variant="bars"
                colorScheme="blue"
                messages={[
                  "Reading data...",
                  "Analyzing patterns...",
                  "Preparing visualization...",
                  "Almost finished...",
                ]}
                size="sm"
              />
            </div>
          </div>
        </div>
      }
      code={`<div className="p-3 rounded-lg bg-background">
  <ThinkingState 
    variant="bars" 
    colorScheme="blue"
    messages={[
      "Reading data...",
      "Analyzing patterns...",
      "Preparing visualization...",
      "Almost finished..."
    ]}
    size="sm"
  />
</div>`}
    />
  );
}

export function PropsTable() {
  return (
    <TypeTable
      type={{
        messages: {
          description:
            "Array of messages or message generators to cycle through",
          type: "(string | ((index: number) => string) | React.ReactNode)[]",
          default: '["Thinking...", "Processing...", "Almost there..."]',
        },
        variant: {
          description: "Animation variant",
          type: '"pulse" | "dots" | "bars" | "bounce"',
          default: '"pulse"',
        },
        size: {
          description: "Size variant",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
        },
        colorScheme: {
          description: "Color theme for the indicator",
          type: '"default" | "blue" | "purple" | "green" | "amber" | "rose"',
          default: '"default"',
        },
        mode: {
          description: "How messages should cycle",
          type: '"random" | "sequential"',
          default: '"sequential"',
        },
        interval: {
          description: "Time between message changes in ms",
          type: "number",
          default: "2000",
        },
        isComplete: {
          description: "Whether the process is complete",
          type: "boolean",
          default: "false",
        },
        completionMessage: {
          description: "Message to show when complete",
          type: "string | ((index: number) => string) | React.ReactNode",
          default: '"Done!"',
        },
        animationClassName: {
          description: "Classes to apply to the animation container",
          type: "string",
        },
        messageClassName: {
          description: "Classes to apply to the message text",
          type: "string",
        },
        ariaLabel: {
          description: "Accessible label for the loading indicator",
          type: "string",
          default: '"Loading indicator"',
        },
      }}
    />
  );
}
