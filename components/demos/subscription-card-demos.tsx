"use client";

import React from "react";
import { SubscriptionCard } from "@/components/haber-ui/subscription-card";
import { TabDemo } from "@/components/demos/demo-factory";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Rocket, Sparkles, Zap, Diamond, Gem } from "lucide-react";

export function BasicDemo() {
  return (
    <TabDemo
      title="Basic Usage"
      preview={
        <div className="flex justify-center p-4 bg-card rounded-lg">
          <SubscriptionCard
            planName="Pro"
            planDescription="Full access to all AI features and API endpoints"
            status="active"
            dateInfo="Renews on May 15, 2024"
            priceInfo="$29/month"
            usagePercentage={65}
            usageLabel="6,500/10,000 credits"
            actionButton={
              <button className="w-full py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">
                Manage Subscription
              </button>
            }
          />
        </div>
      }
      code={`import { SubscriptionCard } from "@/components/haber-ui/subscription-card";

// In your component
<SubscriptionCard
  planName="Pro"
  planDescription="Full access to all AI features and API endpoints"
  status="active"
  dateInfo="Renews on May 15, 2024"
  priceInfo="$29/month"
  usagePercentage={65}
  usageLabel="6,500/10,000 credits"
  actionButton={
    <button className="w-full py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">
      Manage Subscription
    </button>
  }
/>`}
    />
  );
}

export function StatusVariantsDemo() {
  return (
    <TabDemo
      title="Status Variants"
      preview={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-card rounded-lg">
          <SubscriptionCard
            planName="Pro"
            status="active"
            dateInfo="Renews on May 15, 2024"
            usagePercentage={65}
            usageLabel="65% used"
          />
          <SubscriptionCard
            planName="Starter"
            status="trial"
            dateInfo="Trial ends in 7 days"
            usagePercentage={22}
            usageLabel="22% used"
            accentColor="purple"
          />
          <SubscriptionCard
            planName="Enterprise"
            status="pastDue"
            dateInfo="Payment due: Apr 30, 2024"
            usagePercentage={80}
            usageLabel="80% used"
            accentColor="amber"
          />
          <SubscriptionCard
            planName="Basic"
            status="expired"
            dateInfo="Expired on Mar 12, 2024"
            usagePercentage={100}
            usageLabel="Limit reached"
            accentColor="rose"
          />
        </div>
      }
      code={`<SubscriptionCard
  planName="Pro"
  status="active"
  dateInfo="Renews on May 15, 2024"
  usagePercentage={65}
  usageLabel="65% used"
/>

<SubscriptionCard
  planName="Starter"
  status="trial"
  dateInfo="Trial ends in 7 days"
  usagePercentage={22}
  usageLabel="22% used"
  accentColor="purple"
/>

<SubscriptionCard
  planName="Enterprise"
  status="pastDue"
  dateInfo="Payment due: Apr 30, 2024"
  usagePercentage={80}
  usageLabel="80% used"
  accentColor="amber"
/>

<SubscriptionCard
  planName="Basic"
  status="expired"
  dateInfo="Expired on Mar 12, 2024"
  usagePercentage={100}
  usageLabel="Limit reached"
  accentColor="rose"
/>`}
    />
  );
}

export function ColorSchemesDemo() {
  return (
    <TabDemo
      title="Color Schemes"
      preview={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-card rounded-lg">
          <SubscriptionCard
            planName="Basic"
            planIcon={<Rocket className="size-4" />}
            status="active"
            accentColor="blue"
            usagePercentage={45}
          />
          <SubscriptionCard
            planName="Standard"
            planIcon={<Sparkles className="size-4" />}
            status="active"
            accentColor="purple"
            usagePercentage={45}
          />
          <SubscriptionCard
            planName="Pro"
            planIcon={<Zap className="size-4" />}
            status="active"
            accentColor="green"
            usagePercentage={45}
          />
          <SubscriptionCard
            planName="Business"
            planIcon={<Diamond className="size-4" />}
            status="active"
            accentColor="amber"
            usagePercentage={45}
          />
          <SubscriptionCard
            planName="Enterprise"
            planIcon={<Gem className="size-4" />}
            status="active"
            accentColor="rose"
            usagePercentage={45}
          />
        </div>
      }
      code={`import { Rocket, Sparkles, Zap, Diamond, Gem } from "lucide-react";

// Different color schemes
<SubscriptionCard
  planName="Basic"
  planIcon={<Rocket className="size-4" />}
  status="active"
  accentColor="blue"
  usagePercentage={45}
/>

<SubscriptionCard
  planName="Standard"
  planIcon={<Sparkles className="size-4" />}
  status="active"
  accentColor="purple"
  usagePercentage={45}
/>

<SubscriptionCard
  planName="Pro"
  planIcon={<Zap className="size-4" />}
  status="active"
  accentColor="green"
  usagePercentage={45}
/>

<SubscriptionCard
  planName="Business"
  planIcon={<Diamond className="size-4" />}
  status="active"
  accentColor="amber"
  usagePercentage={45}
/>

<SubscriptionCard
  planName="Enterprise"
  planIcon={<Gem className="size-4" />}
  status="active"
  accentColor="rose"
  usagePercentage={45}
/>`}
    />
  );
}

export function AppIntegrationDemo() {
  return (
    <TabDemo
      title="App Integration"
      preview={
        <div className="p-4 border rounded-lg bg-background">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 p-4 space-y-4">
              <h3 className="text-lg font-semibold">Account Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Manage your AI assistant plan and usage
              </p>

              <div className="border-t my-4"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Current Plan:</span>
                  <span className="ml-2 font-medium">Pro</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Billing Cycle:</span>
                  <span className="ml-2 font-medium">Monthly</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Next Invoice:</span>
                  <span className="ml-2 font-medium">May 15, 2024</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="ml-2 font-medium">Visa **** 4242</span>
                </div>
              </div>
            </div>

            <div className="md:max-w-xs">
              <SubscriptionCard
                planName="Pro"
                planDescription="Full AI Assistant access"
                status="active"
                dateInfo="Renews on May 15, 2024"
                priceInfo="$29/month"
                usagePercentage={65}
                usageLabel="6,500/10,000"
                accentColor="green"
                actionButton={
                  <button className="w-full py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium">
                    Manage Plan
                  </button>
                }
              />
            </div>
          </div>
        </div>
      }
      code={`// In your account dashboard
<div className="flex flex-col md:flex-row gap-6">
  <div className="flex-1 p-4">
    {/* Account information */}
    <h3 className="text-lg font-semibold">Account Dashboard</h3>
    {/* Other account details */}
  </div>
  
  <div className="md:max-w-xs">
    <SubscriptionCard
      planName="Pro"
      planDescription="Full AI Assistant access"
      status="active"
      dateInfo="Renews on May 15, 2024"
      priceInfo="$29/month"
      usagePercentage={65}
      usageLabel="6,500/10,000"
      accentColor="green"
      actionButton={
        <button className="w-full py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium">
          Manage Plan
        </button>
      }
    />
  </div>
</div>`}
    />
  );
}

export function PropsTable() {
  return (
    <TypeTable
      type={{
        planName: {
          description: "Name of the subscription plan",
          type: "string",
          required: true,
        },
        planDescription: {
          description: "Description of the plan's features",
          type: "string",
        },
        status: {
          description: "Current subscription status",
          type: '"active" | "trial" | "expired" | "cancelled" | "pastDue"',
          default: '"active"',
        },
        accentColor: {
          description: "Color scheme for the card",
          type: '"blue" | "purple" | "green" | "amber" | "rose"',
          default: '"blue"',
        },
        usagePercentage: {
          description: "Current usage percentage (0-100)",
          type: "number",
        },
        usageLabel: {
          description: "Text label for usage (e.g. '1,500/2,000 credits')",
          type: "string",
        },
        dateInfo: {
          description: "Information about renewal or expiry date",
          type: "string",
        },
        priceInfo: {
          description: "Information about pricing",
          type: "string",
        },
        actionButton: {
          description: "Action button shown in the footer",
          type: "React.ReactNode",
        },
        showGlow: {
          description: "Whether to show the glow effect",
          type: "boolean",
          default: "true",
        },
        planIcon: {
          description: "Icon to display with the plan name",
          type: "React.ReactNode",
        },
        size: {
          description: "Size of the card",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
        },
      }}
    />
  );
}
