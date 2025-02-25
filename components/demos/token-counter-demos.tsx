"use client";

import React, { useState } from "react";
import { TokenCounter } from "@/components/haber-ui/token-counter";
import { TabDemo } from "@/components/demos/demo-factory";
import { Textarea } from "@/components/ui/textarea";

// Basic Demo
export function BasicDemo() {
  const [text, setText] = useState(
    "Type here to see the token counter in action..."
  );

  return (
    <TabDemo
      title="Basic Usage"
      preview={
        <div className="space-y-2 w-full">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-32 w-full resize-none"
            placeholder="Type some text to count tokens..."
          />
          <div className="flex justify-end">
            <TokenCounter text={text} />
          </div>
        </div>
      }
      code={`import { TokenCounter } from "@/components/haber-ui/token-counter";

const [text, setText] = useState("");

<Textarea
  value={text}
  onChange={(e) => setText(e.target.value)}
  className="min-h-32 resize-none"
  placeholder="Type some text to count tokens..."
/>

<TokenCounter text={text} />`}
    />
  );
}

// With Progress and Limit
export function WithLimitDemo() {
  const [text, setText] = useState(
    "This is a sample text that will show how the token counter works with a small limit to demonstrate the warning and error states. Try adding more text to see how the counter changes color and shows warnings as you approach and exceed the token limit."
  );

  return (
    <TabDemo
      title="With Token Limit"
      preview={
        <div className="relative space-y-2 w-full">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-32 w-full resize-none"
            placeholder="Type some text to count tokens..."
          />
          <div className="flex justify-end">
            <TokenCounter
              text={text}
              maxTokens={50}
              warningThreshold={0.8}
              showWarning={true}
              showProgress={true}
            />
          </div>
        </div>
      }
      code={`import { TokenCounter } from "@/components/haber-ui/token-counter";

const [text, setText] = useState("");

<Textarea
  value={text}
  onChange={(e) => setText(e.target.value)}
  className="min-h-32 resize-none"
  placeholder="Type some text to count tokens..."
/>

<TokenCounter
  text={text}
  maxTokens={50}
  warningThreshold={0.8}
  showWarning={true}
  showProgress={true}
/>`}
    />
  );
}

// Positioned Demo
export function PositionedDemo() {
  const [text, setText] = useState(
    "The token counter can be positioned in different corners of your input element. This example demonstrates the top-right position."
  );

  return (
    <TabDemo
      title="Positioned Counter"
      preview={
        <div className="relative w-full">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-32 w-full resize-none pt-8"
            placeholder="Type some text to count tokens..."
          />
          <TokenCounter
            text={text}
            maxTokens={100}
            position="top-right"
            className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm"
          />
        </div>
      }
      code={`import { TokenCounter } from "@/components/haber-ui/token-counter";

const [text, setText] = useState("");

<div className="relative">
  <Textarea
    value={text}
    onChange={(e) => setText(e.target.value)}
    className="min-h-32 resize-none pt-8"
    placeholder="Type some text to count tokens..."
  />
  <TokenCounter 
    text={text} 
    maxTokens={100}
    position="top-right"
    className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm"
  />
</div>`}
    />
  );
}

// Different Tokenizers Demo
export function TokenizerDemo() {
  const [text, setText] = useState(
    "Different AI models tokenize text differently. This component provides approximations for common models."
  );

  return (
    <TabDemo
      title="Different Tokenizers"
      preview={
        <div className="space-y-4 w-full">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-24 w-full resize-none"
            placeholder="Type some text to compare tokenizers..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border rounded-md p-3 flex flex-col gap-1">
              <span className="text-sm font-medium">GPT-3.5</span>
              <TokenCounter text={text} tokenizer="gpt3" maxTokens={4096} />
            </div>

            <div className="border rounded-md p-3 flex flex-col gap-1">
              <span className="text-sm font-medium">GPT-4</span>
              <TokenCounter text={text} tokenizer="gpt4" maxTokens={8192} />
            </div>

            <div className="border rounded-md p-3 flex flex-col gap-1">
              <span className="text-sm font-medium">Claude</span>
              <TokenCounter text={text} tokenizer="claude" maxTokens={100000} />
            </div>

            <div className="border rounded-md p-3 flex flex-col gap-1">
              <span className="text-sm font-medium">LLaMA</span>
              <TokenCounter text={text} tokenizer="llama" maxTokens={4096} />
            </div>
          </div>
        </div>
      }
      code={`import { TokenCounter } from "@/components/haber-ui/token-counter";

<div className="grid grid-cols-2 gap-3">
  <div className="border rounded-md p-3">
    <span className="text-sm font-medium">GPT-3.5</span>
    <TokenCounter text={text} tokenizer="gpt3" maxTokens={4096} />
  </div>
  
  <div className="border rounded-md p-3">
    <span className="text-sm font-medium">GPT-4</span>
    <TokenCounter text={text} tokenizer="gpt4" maxTokens={8192} />
  </div>
  
  <div className="border rounded-md p-3">
    <span className="text-sm font-medium">Claude</span>
    <TokenCounter text={text} tokenizer="claude" maxTokens={100000} />
  </div>
  
  <div className="border rounded-md p-3">
    <span className="text-sm font-medium">LLaMA</span>
    <TokenCounter text={text} tokenizer="llama" maxTokens={4096} />
  </div>
</div>`}
    />
  );
}

// Custom Tokenizer Demo
export function CustomTokenizerDemo() {
  const [text, setText] = useState(
    "You can also provide a custom tokenizer function for precise counting with specific models."
  );

  // Custom tokenizer that counts words instead of tokens
  const wordCounter = (text: string) => {
    return text.split(/\s+/).filter(Boolean).length;
  };

  return (
    <TabDemo
      title="Custom Tokenizer"
      preview={
        <div className="space-y-3 w-full">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-24 w-full resize-none"
            placeholder="Type some text..."
          />

          <div className="flex justify-between">
            <div>
              <TokenCounter
                text={text}
                tokenizer="custom"
                customTokenCounter={wordCounter}
                label="words"
              />
            </div>

            <div>
              <TokenCounter text={text} />
            </div>
          </div>
        </div>
      }
      code={`import { TokenCounter } from "@/components/haber-ui/token-counter";

// Custom tokenizer that counts words instead of tokens
const wordCounter = (text: string) => {
  return text.split(/\\s+/).filter(Boolean).length;
};

<div className="flex justify-between">
  <TokenCounter 
    text={text} 
    tokenizer="custom" 
    customTokenCounter={wordCounter}
    label="words"
  />
  
  <TokenCounter text={text} />
</div>`}
    />
  );
}

// Props display component
export function PropsTable() {
  return (
    <div className="space-y-6 rounded-lg border p-6">
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">text</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">string</span>
        </p>
        <p className="text-sm">The text to count tokens from</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">maxTokens</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">number</span>
        </p>
        <p className="text-sm">Maximum token limit. Default: 4096</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">tokenizer</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">
            &quot;gpt3&quot; | &quot;gpt4&quot; | &quot;claude&quot; |
            &quot;llama&quot; | &quot;custom&quot;
          </span>
        </p>
        <p className="text-sm">
          The tokenizer to use. Default: &quot;gpt3&quot;
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">customTokenCounter</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">(text: string) =&gt; number</span>
        </p>
        <p className="text-sm">
          Custom function to count tokens (used with
          tokenizer=&quot;custom&quot;)
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">showWarning</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">boolean</span>
        </p>
        <p className="text-sm">
          Show warning when approaching token limit. Default: true
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">warningThreshold</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">number</span>
        </p>
        <p className="text-sm">
          Percentage (0-1) of max tokens that triggers warning. Default: 0.85
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">position</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">
            &quot;top-right&quot; | &quot;top-left&quot; |
            &quot;bottom-right&quot; | &quot;bottom-left&quot; |
            &quot;inline&quot;
          </span>
        </p>
        <p className="text-sm">
          Position of the counter. Default: &quot;inline&quot;
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">showProgress</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">boolean</span>
        </p>
        <p className="text-sm">Show progress bar. Default: true</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">label</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">string</span>
        </p>
        <p className="text-sm">
          Label for token count. Default: &quot;tokens&quot;
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">progressClassName</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">string</span>
        </p>
        <p className="text-sm">Custom class for progress bar</p>
      </div>
    </div>
  );
}
