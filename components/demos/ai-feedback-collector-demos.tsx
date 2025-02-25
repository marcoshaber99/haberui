"use client";
import React from "react";
import { AIFeedbackCollector } from "@/components/haber-ui/ai-feedback-collector";
import { Angry, Smile } from "lucide-react";
import { TabDemo } from "@/components/demos/demo-factory";

const handleFeedback = async (feedback: {
  type: "positive" | "negative" | null;
  comment?: string;
}) => {
  console.log("Feedback received:", feedback);
  return new Promise<void>((resolve) => setTimeout(resolve, 500));
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
        />
      }
      code={`<AIFeedbackCollector
  onFeedback={handleFeedback}
  allowComments={true}
  promptText="Did this answer help you?"
/>`}
    />
  );
}

export function CustomStyleDemo() {
  return (
    <TabDemo
      title="Custom Styling"
      preview={
        <AIFeedbackCollector
          negativeIcon={<Angry className="w-5 h-5 text-red-500" />}
          positiveIcon={<Smile className="w-5 h-5 text-green-500" />}
          onFeedback={handleFeedback}
          promptText="Rate this response"
          thanksText="Thank you for helping us improve!"
          buttonClassName="hover:bg-blue-400"
          activeButtonClassName="bg-blue-400 text-blue-600"
        />
      }
      code={`import { Angry, Smile } from "lucide-react";

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
  );
}
// Props display component remains the same
export function PropsTable() {
  return (
    <div className="space-y-6 rounded-lg border p-6">
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">onFeedback</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">
            (feedback: {`{`} type: &quot;positive&quot; | &quot;negative&quot; |
            null; comment?: string {`}`}) =&gt; void | Promise&lt;void&gt;
          </span>
        </p>
        <p className="text-sm">Function called when feedback is submitted</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">allowComments</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">boolean</span>
        </p>
        <p className="text-sm">
          Allow users to add comments with their feedback. Default: false
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">promptText</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">string</span>
        </p>
        <p className="text-sm">
          Text shown for the feedback prompt. Default: &quot;Was this response
          helpful?&quot;
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">thanksText</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">string</span>
        </p>
        <p className="text-sm">
          Text shown after feedback is submitted. Default: &quot;Thanks for your
          feedback!&quot;
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">positiveIcon</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">ReactNode</span>
        </p>
        <p className="text-sm">
          Custom icon for positive feedback. Default: ThumbsUp
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">negativeIcon</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">ReactNode</span>
        </p>
        <p className="text-sm">
          Custom icon for negative feedback. Default: ThumbsDown
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">buttonClassName</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">string</span>
        </p>
        <p className="text-sm">Custom classes for the buttons</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">activeButtonClassName</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">string</span>
        </p>
        <p className="text-sm">Custom classes for active (selected) buttons</p>
      </div>
    </div>
  );
}
