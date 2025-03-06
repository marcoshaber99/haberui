"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FlaskConical, FlaskConicalOff } from "lucide-react";
import { FeatureToggle } from "@/components/haber-ui/feature-toggle";
import { ThinkingState } from "@/components/haber-ui/thinking-state";
import { AIFeedbackCollector } from "@/components/haber-ui/ai-feedback-collector";
import { SubscriptionCard } from "@/components/haber-ui/subscription-card";
import { Card, CardContent } from "@/components/ui/card";

export function ComponentShowcase() {
  const [activeFeature, setActiveFeature] = useState(true);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* FeatureToggle */}
        <Card className="group overflow-hidden border-muted/40 hover:border-primary/20 transition-all bg-background/50">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b p-3">
              <h3 className="text-sm font-medium">Feature Toggle</h3>
              <Link
                href="/docs/components/feature-toggle"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                View docs →
              </Link>
            </div>
            <div className="p-6 flex flex-col items-center justify-center space-y-4">
              <FeatureToggle
                active={activeFeature}
                onActiveChange={setActiveFeature}
                variant="outline"
                size="sm"
                colorScheme="purple"
                className="w-28"
                icon={
                  activeFeature ? (
                    <FlaskConical className="mr-1.5 size-3.5" />
                  ) : (
                    <FlaskConicalOff className="mr-1.5 size-3.5" />
                  )
                }
              >
                {activeFeature ? "Enabled" : "Disabled"}
              </FeatureToggle>
              <p className="text-xs text-muted-foreground">
                Toggle for feature flags
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ThinkingState */}
        <Card className="group overflow-hidden border-muted/40 hover:border-primary/20 transition-all bg-background/50">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b p-3">
              <h3 className="text-sm font-medium">Thinking State</h3>
              <Link
                href="/docs/components/thinking-state"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                View docs →
              </Link>
            </div>
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="w-full max-w-xs p-3 border rounded-md bg-background/50">
                <ThinkingState
                  messages={[
                    "Analyzing data...",
                    "Processing request...",
                    "Almost there...",
                  ]}
                  mode="sequential"
                  interval={2000}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Loading indicator for AI operations
              </p>
            </div>
          </CardContent>
        </Card>

        {/* AiFeedbackCollector */}
        <Card className="group overflow-hidden border-muted/40 hover:border-primary/20 transition-all bg-background/50">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b p-3">
              <h3 className="text-sm font-medium">AI Feedback Collector</h3>
              <Link
                href="/docs/components/ai-feedback-collector"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                View docs →
              </Link>
            </div>
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="w-full border rounded-md p-3 bg-background/50">
                <div className="text-xs font-medium mb-1">
                  AI Response Example
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  This is an example of an AI response.
                </p>
                <AIFeedbackCollector
                  onFeedback={(feedback) => {
                    console.log("Feedback:", feedback);
                  }}
                  allowComments={true}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Collect feedback on AI responses
              </p>
            </div>
          </CardContent>
        </Card>

        {/* SubscriptionCard */}
        <Card className="group overflow-hidden border-muted/40 hover:border-primary/20 transition-all bg-background/50">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b p-3">
              <h3 className="text-sm font-medium">Subscription Card</h3>
              <Link
                href="/docs/components/subscription-card"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                View docs →
              </Link>
            </div>
            <div className="p-6 flex flex-col items-center justify-center">
              <SubscriptionCard
                planName="Pro Plan"
                planDescription="For professionals"
                status="active"
                priceInfo="$49/month"
                showGlow={true}
              />
              <p className="text-xs text-muted-foreground mt-4">
                Pricing cards for subscription apps
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-8">
        <Link
          href="/docs"
          className="inline-flex items-center text-sm text-primary hover:underline"
        >
          Explore all components
          <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
