"use client";

import React from "react";
import { AISentimentAnalyzer } from "@/components/haber-ui/ai-sentiment-analyzer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";

export default function AISentimentAnalyzerPage() {
  const [attemptsLeft, setAttemptsLeft] = React.useState<number | null>(null);
  const [isRandom, setIsRandom] = React.useState(false);

  // Check attempts on page load
  React.useEffect(() => {
    fetch("/api/analyze-sentiment/attempts")
      .then((res) => res.json())
      .then((data) => {
        setAttemptsLeft(data.attemptsLeft);
        setIsRandom(data.isRandom);
      });
  }, []);

  const analyzeSentiment = React.useCallback(async (text: string) => {
    try {
      const response = await fetch("/api/analyze-sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze sentiment");
      }

      const data = await response.json();
      setAttemptsLeft(data.attemptsLeft);
      setIsRandom(data.isRandom);
      return data.score;
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      return 0;
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          AISentimentAnalyzer
        </h1>
        <p className="text-lg text-muted-foreground">
          A flexible sentiment analysis component that works with any backend
          service. Returns scores from -1 (negative) to 1 (positive).
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Scoring</h2>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Above 0.5: Positive</li>
          <li>Between -0.5 and 0.5: Neutral</li>
          <li>Below -0.5: Negative</li>
        </ul>
      </div>

      <Tabs defaultValue="preview" className="relative mt-6 w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <div className="flex flex-col gap-2 mt-2 mb-4">
          <p className="text-sm text-muted-foreground">
            {attemptsLeft === null
              ? "Loading..."
              : `Try the live demo below! (${attemptsLeft} attempts remaining)`}
          </p>
          {isRandom && (
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              Note: You&apos;ve exceeded the limit. Results are now randomized.
            </p>
          )}
        </div>

        <TabsContent
          value="preview"
          className="space-y-6 rounded-md border p-6"
        >
          <AISentimentAnalyzer onAnalyze={analyzeSentiment} showScore />
        </TabsContent>

        <TabsContent value="code" className="rounded-md border bg-muted p-6">
          <CodeBlock
            language="tsx"
            code={`// With OpenAI and score display
const analyzeSentiment = async (text: string) => {
  const response = await fetch('/api/analyze-sentiment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  const data = await response.json();
  return data.score;
};

// Usage
export default function Example() {
  return <AISentimentAnalyzer onAnalyze={analyzeSentiment} showScore />;
}`}
          />
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Installation
        </h2>
        <CodeBlock
          language="bash"
          code={`npx shadcn@latest add "https://haberui.com/h/ai-sentiment-analyzer.json"`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Props
        </h2>
        {/* Mobile view - Cards */}
        <div className="lg:hidden space-y-4">
          {[
            {
              name: "onAnalyze",
              type: "(text: string) => Promise<number>",
              description: "Function that returns sentiment score (-1 to 1)",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes",
            },
            {
              name: "showScore",
              type: "boolean",
              description: "Display raw sentiment score. Default: false",
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
                    onAnalyze
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  (text: string) =&gt; Promise&lt;number&gt;
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Function that returns sentiment score (-1 to 1)
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
              <tr className="border-b">
                <td className="p-4">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
                    showScore
                  </code>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">
                  boolean
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  Display raw sentiment score. Default: false
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
