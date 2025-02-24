"use client";

import React from "react";
import { ThinkingState } from "@/components/haber-ui/thinking-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";

export default function ThinkingStatePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          ThinkingState
        </h1>
        <p className="text-lg text-muted-foreground">
          A beautiful loading indicator with customizable messages and
          animations. Perfect for AI-powered applications.
        </p>
      </div>

      <Tabs defaultValue="preview" className="relative mt-6 w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent
          value="preview"
          className="space-y-6 rounded-md border p-6"
        >
          <div className="flex flex-col gap-8">
            <div className="space-y-3">
              <p className="text-sm font-medium">Pulse Variant (Default)</p>
              <ThinkingState aria-label="Processing your request" />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Dots Variant</p>
              <ThinkingState
                variant="dots"
                className="text-blue-500"
                messages={[
                  "Loading data...",
                  "Crunching numbers...",
                  "Almost ready...",
                ]}
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Bars Variant</p>
              <ThinkingState
                variant="bars"
                messages={[
                  "Generating response...",
                  "Training model...",
                  "Fine-tuning...",
                ]}
                mode="random"
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Bounce Variant</p>
              <ThinkingState
                variant="bounce"
                messages={["Please wait...", "Working on it..."]}
                interval={1500}
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Dynamic Messages</p>
              <ThinkingState
                messages={[
                  (index) => `Step ${index + 1}/3: Processing...`,
                  <span key="custom" className="flex items-center gap-2">
                    Loading <span className="text-blue-500">important</span>{" "}
                    data
                  </span>,
                  "Almost there...",
                ]}
                interval={1500}
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Completion State</p>
              <ThinkingState
                isComplete
                completionMessage="Successfully loaded!"
                className="text-green-500"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="rounded-md border bg-muted p-6">
          <CodeBlock
            language="tsx"
            code={`// Pulse Variant (Default)
<ThinkingState ariaLabel="Processing your request" />

// Dots Variant
<ThinkingState
  variant="dots"
  className="text-blue-500"
  messages={[
    "Loading data...",
    "Crunching numbers...",
    "Almost ready...",
  ]}
/>

// Bars Variant
<ThinkingState
  variant="bars"
  messages={[
    "Generating response...",
    "Training model...",
    "Fine-tuning...",
  ]}
  mode="random"
/>

// Bounce Variant
<ThinkingState
  variant="bounce"
  messages={["Please wait...", "Working on it..."]}
  interval={1500}
/>

// Dynamic Messages
<ThinkingState
  messages={[
    (index) => \`Step \${index + 1}/3: Processing...\`,
    '<span className="flex items-center gap-2">Loading <span className="text-blue-500">important</span> data</span>',
    "Almost there...",
  ]}
  interval={1500}
/>

// Completion State
<ThinkingState
  isComplete
  completionMessage="Successfully loaded!"
  className="text-green-500"
/>`}
          />
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Installation
        </h2>
        <p className="text-muted-foreground">
          Install the component using the CLI:
        </p>
        <CodeBlock
          language="bash"
          code={`npx shadcn@latest add "https://haberui.com/h/thinking-state.json"`}
        />
        <p className="text-sm text-muted-foreground mt-2">
          That&apos;s it! No additional configuration needed.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Props
        </h2>
        {/* Mobile view - Cards */}
        <div className="lg:hidden space-y-4">
          {[
            {
              name: "messages",
              type: "(string | ((index: number) => string) | ReactNode)[]",
              description:
                "Messages to cycle through. Can be strings, functions, or React components.",
            },
            {
              name: "variant",
              type: '"pulse" | "dots" | "bars" | "bounce"',
              description: "Animation style. Default: pulse",
            },
            {
              name: "mode",
              type: '"random" | "sequential"',
              description: "Message cycling order. Default: sequential",
            },
            {
              name: "interval",
              type: "number",
              description: "Time between message changes in ms. Default: 2000",
            },
            {
              name: "isComplete",
              type: "boolean",
              description: "Show completion state. Default: false",
            },
            {
              name: "completionMessage",
              type: "string | ((index: number) => string) | ReactNode",
              description: "Message to show when complete. Default: Done!",
            },
            {
              name: "ariaLabel",
              type: "string",
              description: "Screen reader label. Default: Loading indicator",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes",
            },
          ].map((prop) => (
            <div key={prop.name} className="rounded-lg border p-4 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                  {prop.name}
                </code>
                <div className="text-sm text-muted-foreground font-mono">
                  {prop.type}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {prop.description}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop view - Table */}
        <div className="hidden lg:block rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-4 text-left text-sm font-medium">Prop</th>
                <th className="p-4 text-left text-sm font-medium">Type</th>
                <th className="p-4 text-left text-sm font-medium">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    messages
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  (string | ((index: number) =&gt; string) | ReactNode)[]
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Messages to cycle through. Can be strings, functions, or React
                  components.
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    variant
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  &quot;pulse&quot; | &quot;dots&quot; | &quot;bars&quot; |
                  &quot;bounce&quot;
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Animation style. Default: pulse
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    mode
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  &quot;random&quot; | &quot;sequential&quot;
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Message cycling order. Default: sequential
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    interval
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  number
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Time between message changes in ms. Default: 2000
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    isComplete
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  boolean
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Show completion state. Default: false
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    completionMessage
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  string | ((index: number) =&gt; string) | ReactNode
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Message to show when complete. Default: Done!
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    ariaLabel
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  string
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Screen reader label. Default: Loading indicator
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    className
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  string
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Additional CSS classes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
