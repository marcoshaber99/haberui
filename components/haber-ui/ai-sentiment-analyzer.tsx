"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, ThumbsUp, ThumbsDown, Meh } from "lucide-react";

interface AISentimentAnalyzerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onAnalyze: (text: string) => Promise<number>;
}

const AISentimentAnalyzer = React.forwardRef<
  HTMLDivElement,
  AISentimentAnalyzerProps
>(({ className, onAnalyze, ...props }, ref) => {
  const [text, setText] = React.useState("");
  const [sentiment, setSentiment] = React.useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    // Basic validation for extremely short random input
    if (text.trim().length < 4) {
      console.warn("Text too short for meaningful sentiment analysis");
      setSentiment(0); // Neutral for very short input
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await onAnalyze(text);
      setSentiment(result);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSentimentIcon = () => {
    if (sentiment === null) return null;
    if (sentiment > 0.5) return <ThumbsUp className="w-6 h-6 text-green-500" />;
    if (sentiment < -0.5)
      return <ThumbsDown className="w-6 h-6 text-red-500" />;
    return <Meh className="w-6 h-6 text-yellow-500" />;
  };

  const getSentimentText = () => {
    if (sentiment === null) return "";
    if (sentiment > 0.5) return "Positive";
    if (sentiment < -0.5) return "Negative";
    return "Neutral";
  };

  return (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
      <Textarea
        placeholder="Enter text to analyze sentiment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[100px]"
      />
      <div className="flex items-center justify-between">
        <Button onClick={handleAnalyze} disabled={isAnalyzing || !text.trim()}>
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Sentiment"
          )}
        </Button>
        {sentiment !== null && (
          <div className="flex items-center space-x-2">
            {getSentimentIcon()}
            <span className="font-medium">{getSentimentText()}</span>
          </div>
        )}
      </div>
    </div>
  );
});

AISentimentAnalyzer.displayName = "AISentimentAnalyzer";

export { AISentimentAnalyzer };
