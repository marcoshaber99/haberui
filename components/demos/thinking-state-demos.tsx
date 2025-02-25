// components/demos/thinking-state-demos.tsx
"use client";
import React from "react";
import { ThinkingState } from "@/components/haber-ui/thinking-state";
import { TabDemo } from "@/components/demos/demo-factory";

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
          className="text-blue-500"
          messages={[
            "Loading data...",
            "Crunching numbers...",
            "Almost ready...",
          ]}
        />
      }
      code={`<ThinkingState
  variant="dots"
  className="text-blue-500"
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
  return (
    <TabDemo
      title="Completion State"
      preview={
        <ThinkingState
          isComplete
          completionMessage="Successfully loaded!"
          className="text-green-500"
        />
      }
      code={`<ThinkingState
  isComplete
  completionMessage="Successfully loaded!"
  className="text-green-500"
/>`}
    />
  );
}

export function PropsTable() {
  return (
    <div className="space-y-6 rounded-lg border p-6">
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">messages</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">
            (string | ((index: number) =&gt; string) | ReactNode)[]
          </span>
        </p>
        <p className="text-sm">
          Messages to cycle through. Can be strings, functions, or React
          components.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">variant</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">
            &quot;pulse&quot; | &quot;dots&quot; | &quot;bars&quot; |
            &quot;bounce&quot;
          </span>
        </p>
        <p className="text-sm">Animation style. Default: pulse</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">mode</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">
            &quot;random&quot; | &quot;sequential&quot;
          </span>
        </p>
        <p className="text-sm">Message cycling order. Default: sequential</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">interval</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">number</span>
        </p>
        <p className="text-sm">
          Time between message changes in ms. Default: 2000
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">isComplete</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">boolean</span>
        </p>
        <p className="text-sm">Show completion state. Default: false</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">completionMessage</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">
            string | ((index: number) =&gt; string) | ReactNode
          </span>
        </p>
        <p className="text-sm">
          Message to show when complete. Default: &quot;Done!&quot;
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">ariaLabel</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">string</span>
        </p>
        <p className="text-sm">
          Screen reader label. Default: &quot;Loading indicator&quot;
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">className</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">string</span>
        </p>
        <p className="text-sm">Additional CSS classes</p>
      </div>
    </div>
  );
}
