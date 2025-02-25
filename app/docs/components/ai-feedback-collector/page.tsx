"use client";

import React from "react";
import { AIFeedbackCollector } from "@/components/haber-ui/ai-feedback-collector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { Angry, Smile } from "lucide-react";

export default function AIFeedbackCollectorPage() {
  const handleFeedback = async (feedback: {
    type: "positive" | "negative" | null;
    comment?: string;
  }) => {
    console.log("Feedback received:", feedback);
    return new Promise<void>((resolve) => setTimeout(resolve, 500));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          AIFeedbackCollector
        </h1>
        <p className="text-lg text-muted-foreground">
          A flexible component for collecting user feedback on AI-generated
          content. Supports thumbs up/down reactions, optional comments, and
          custom styling.
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
              <p className="text-sm font-medium">
                Basic Feedback (No Comments)
              </p>
              <AIFeedbackCollector onFeedback={handleFeedback} />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">With Comments</p>
              <AIFeedbackCollector
                onFeedback={handleFeedback}
                allowComments={true}
                promptText="Did this answer help you?"
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Custom Styling</p>
              <AIFeedbackCollector
                negativeIcon={<Angry className="w-5 h-5 text-red-500" />}
                positiveIcon={<Smile className="w-5 h-5 text-green-500" />}
                onFeedback={handleFeedback}
                promptText="Rate this response"
                thanksText="Thank you for helping us improve!"
                buttonClassName="hover:bg-blue-400"
                activeButtonClassName="bg-blue-400 text-blue-600"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="rounded-md border bg-muted p-6">
          <CodeBlock
            language="tsx"
            code={`// Basic usage
<AIFeedbackCollector 
  onFeedback={(feedback) => {
    console.log("Feedback received:", feedback);
  }}
/>

// With comments enabled
<AIFeedbackCollector
  onFeedback={handleFeedback}
  allowComments={true}
  promptText="Did this answer help you?"
/>

// Custom styling
<AIFeedbackCollector
  negativeIcon={<Angry className="w-5 h-5 text-red-500" />}
  positiveIcon={<Smile className="w-5 h-5 text-green-500" />}
  onFeedback={handleFeedback}
  promptText="Rate this response"
  thanksText="Thank you for helping us improve!"
  buttonClassName="hover:bg-blue-400"
  activeButtonClassName="bg-blue-400 text-blue-600"
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
          code={`npx shadcn@latest add "https://haberui.com/h/ai-feedback-collector.json"`}
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
              name: "onFeedback",
              type: "(feedback: { type: FeedbackType; comment?: string }) => void | Promise<void>",
              description: "Function called when feedback is submitted",
            },
            {
              name: "allowComments",
              type: "boolean",
              description:
                "Allow users to add comments with their feedback. Default: false",
            },
            {
              name: "promptText",
              type: "string",
              description:
                'Text shown for the feedback prompt. Default: "Was this response helpful?"',
            },
            {
              name: "thanksText",
              type: "string",
              description:
                'Text shown after feedback is submitted. Default: "Thanks for your feedback!"',
            },
            {
              name: "positiveIcon",
              type: "ReactNode",
              description:
                "Custom icon for positive feedback. Default: ThumbsUp",
            },
            {
              name: "negativeIcon",
              type: "ReactNode",
              description:
                "Custom icon for negative feedback. Default: ThumbsDown",
            },
            {
              name: "buttonClassName",
              type: "string",
              description: "Custom classes for the buttons",
            },
            {
              name: "activeButtonClassName",
              type: "string",
              description: "Custom classes for active (selected) buttons",
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
                    onFeedback
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  (feedback: {"{"} type: FeedbackType; comment?: string {"}"})
                  =&gt; void | Promise&lt;void&gt;
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Function called when feedback is submitted
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    allowComments
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  boolean
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Allow users to add comments with their feedback. Default:
                  false
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    promptText
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  string
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Text shown for the feedback prompt. Default: &quot;Was this
                  response helpful?&quot;
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    thanksText
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  string
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Text shown after feedback is submitted. Default: &quot;Thanks
                  for your feedback!&quot;
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    positiveIcon
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  ReactNode
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Custom icon for positive feedback. Default: ThumbsUp
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    negativeIcon
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  ReactNode
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Custom icon for negative feedback. Default: ThumbsDown
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    buttonClassName
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  string
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Custom classes for the buttons
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    activeButtonClassName
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  string
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Custom classes for active (selected) buttons
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Usage Examples
        </h2>
        <h3 className="text-xl font-semibold tracking-tight">
          Basic Integration with AI Chat
        </h3>
        <CodeBlock
          language="tsx"
          code={`import { AIFeedbackCollector } from "@/components/haber-ui/ai-feedback-collector";

export function ChatMessage({ message }) {
  const handleFeedback = async (feedback) => {
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messageId: message.id,
        ...feedback
      })
    });
  };

  return (
    <div className="space-y-2">
      <div className="p-4 rounded-lg bg-muted">
        {message.content}
      </div>
      <AIFeedbackCollector 
        onFeedback={handleFeedback}
        allowComments={true}
      />
    </div>
  );
}`}
        />
      </div>
    </div>
  );
}
