"use client";

import React, { useState } from "react";
import { FeatureToggle } from "@/components/haber-ui/feature-toggle";
import { TabDemo } from "@/components/demos/demo-factory";
import { Globe, Sparkles, BrainCircuit, Bot, Search, Zap } from "lucide-react";
import { TypeTable } from "fumadocs-ui/components/type-table";

// Basic Demo
export function BasicDemo() {
  const [searchActive, setSearchActive] = useState(false);
  const [deepResearchActive, setDeepResearchActive] = useState(false);

  return (
    <TabDemo
      title="Basic Usage"
      preview={
        <div className="flex flex-wrap gap-3 p-4 bg-card rounded-lg">
          <FeatureToggle
            active={searchActive}
            onActiveChange={setSearchActive}
            icon={<Globe className="size-4" />}
          >
            Search
          </FeatureToggle>
          <FeatureToggle
            active={deepResearchActive}
            onActiveChange={setDeepResearchActive}
            icon={<Sparkles className="size-4" />}
          >
            Deep research
          </FeatureToggle>
        </div>
      }
      code={`import { FeatureToggle } from "@/components/haber-ui/feature-toggle";
import { Globe, Sparkles } from "lucide-react";

// In your component
const [searchActive, setSearchActive] = useState(false);
const [deepResearchActive, setDeepResearchActive] = useState(false);

return (
  <div className="flex gap-3">
    <FeatureToggle
      active={searchActive}
      onActiveChange={setSearchActive}
      icon={<Globe className="size-4" />}
    >
      Search
    </FeatureToggle>
    <FeatureToggle
      active={deepResearchActive}
      onActiveChange={setDeepResearchActive}
      icon={<Sparkles className="size-4" />}
    >
      Deep research
    </FeatureToggle>
  </div>
)`}
    />
  );
}

// Colors Demo
export function ColorsDemo() {
  const [activeToggles, setActiveToggles] = useState({
    research: false,
    agent: false,
    analyze: false,
    chat: false,
  });

  const toggleFeature = (feature: keyof typeof activeToggles) => {
    setActiveToggles((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  return (
    <TabDemo
      title="Color Variants"
      preview={
        <div className="flex flex-wrap gap-3 p-4 bg-card rounded-lg">
          <FeatureToggle
            active={activeToggles.research}
            onActiveChange={() => toggleFeature("research")}
            icon={<Search className="size-4" />}
            colorScheme="blue"
          >
            Research
          </FeatureToggle>
          <FeatureToggle
            active={activeToggles.agent}
            onActiveChange={() => toggleFeature("agent")}
            icon={<BrainCircuit className="size-4" />}
            colorScheme="purple"
          >
            Agent
          </FeatureToggle>
          <FeatureToggle
            active={activeToggles.analyze}
            onActiveChange={() => toggleFeature("analyze")}
            icon={<Zap className="size-4" />}
            colorScheme="amber"
          >
            Analyze
          </FeatureToggle>
          <FeatureToggle
            active={activeToggles.chat}
            onActiveChange={() => toggleFeature("chat")}
            icon={<Bot className="size-4" />}
            colorScheme="green"
          >
            AI chat
          </FeatureToggle>
        </div>
      }
      code={`import { FeatureToggle } from "@/components/haber-ui/feature-toggle";
import { Search, BrainCircuit, Zap, Bot } from "lucide-react";

// Different color variants
<FeatureToggle
  active={active}
  onActiveChange={setActive}
  icon={<Search className="size-4" />}
  colorScheme="blue"
>
  Research
</FeatureToggle>

<FeatureToggle 
  colorScheme="purple" 
  icon={<BrainCircuit className="size-4" />}
>
  Agent
</FeatureToggle>

<FeatureToggle 
  colorScheme="amber" 
  icon={<Zap className="size-4" />}
>
  Analyze
</FeatureToggle>

<FeatureToggle 
  colorScheme="green" 
  icon={<Bot className="size-4" />}
>
  AI chat
</FeatureToggle>`}
    />
  );
}

// Sizes Demo
export function SizesDemo() {
  const [activeSize, setActiveSize] = useState<string | null>(null);

  return (
    <TabDemo
      title="Size Variants"
      preview={
        <div className="flex flex-col gap-4 p-4 bg-card rounded-lg">
          <div className="flex flex-wrap items-center gap-3">
            <FeatureToggle
              active={activeSize === "sm"}
              onActiveChange={() =>
                setActiveSize(activeSize === "sm" ? null : "sm")
              }
              icon={<Search className="size-3" />}
              size="sm"
            >
              Small
            </FeatureToggle>
            <FeatureToggle
              active={activeSize === "md"}
              onActiveChange={() =>
                setActiveSize(activeSize === "md" ? null : "md")
              }
              icon={<Search className="size-4" />}
              size="md"
            >
              Medium
            </FeatureToggle>
            <FeatureToggle
              active={activeSize === "lg"}
              onActiveChange={() =>
                setActiveSize(activeSize === "lg" ? null : "lg")
              }
              icon={<Search className="size-5" />}
              size="lg"
            >
              Large
            </FeatureToggle>
          </div>
        </div>
      }
      code={`import { FeatureToggle } from "@/components/haber-ui/feature-toggle";
import { Search } from "lucide-react";

// Different size variants
<FeatureToggle 
  size="sm" 
  icon={<Search className="size-3" />}
>
  Small
</FeatureToggle>

<FeatureToggle 
  size="md" 
  icon={<Search className="size-4" />}
>
  Medium
</FeatureToggle>

<FeatureToggle 
  size="lg" 
  icon={<Search className="size-5" />}
>
  Large
</FeatureToggle>`}
    />
  );
}

// Variants Demo
export function VariantsDemo() {
  const [activeVariant, setActiveVariant] = useState<string | null>(null);

  return (
    <TabDemo
      title="Style Variants"
      preview={
        <div className="flex flex-col gap-4 p-4 bg-card rounded-lg">
          <div className="flex flex-wrap items-center gap-3">
            <FeatureToggle
              active={activeVariant === "default"}
              onActiveChange={() =>
                setActiveVariant(activeVariant === "default" ? null : "default")
              }
              icon={<Sparkles className="size-4" />}
              variant="default"
              colorScheme="purple"
            >
              Default
            </FeatureToggle>
            <FeatureToggle
              active={activeVariant === "outline"}
              onActiveChange={() =>
                setActiveVariant(activeVariant === "outline" ? null : "outline")
              }
              icon={<Sparkles className="size-4" />}
              variant="outline"
              colorScheme="purple"
            >
              Outline
            </FeatureToggle>
            <FeatureToggle
              active={activeVariant === "solid"}
              onActiveChange={() =>
                setActiveVariant(activeVariant === "solid" ? null : "solid")
              }
              icon={<Sparkles className="size-4" />}
              variant="solid"
              colorScheme="purple"
              className="border border-purple-300/30 dark:border-purple-900/30 bg-purple-100/30 dark:bg-purple-900/20"
            >
              Solid
            </FeatureToggle>
          </div>
        </div>
      }
      code={`import { FeatureToggle } from "@/components/haber-ui/feature-toggle";
import { Sparkles } from "lucide-react";

// Different style variants
<FeatureToggle 
  variant="default" 
  colorScheme="purple" 
  icon={<Sparkles className="size-4" />}
>
  Default
</FeatureToggle>

<FeatureToggle 
  variant="outline" 
  colorScheme="purple" 
  icon={<Sparkles className="size-4" />}
>
  Outline
</FeatureToggle>

<FeatureToggle 
  variant="solid" 
  colorScheme="purple" 
  icon={<Sparkles className="size-4" />}
  className="border border-purple-300/30 dark:border-purple-900/30 bg-purple-100/30 dark:bg-purple-900/20"
>
  Solid
</FeatureToggle>`}
    />
  );
}

// Group Demo
export function GroupDemo() {
  const [activeMode, setActiveMode] = useState<string>("chat");

  const handleModeChange = (mode: string) => {
    setActiveMode(mode);
  };

  return (
    <TabDemo
      title="Toggle Group"
      preview={
        <div className="p-4 bg-card rounded-lg">
          <div className="p-3 rounded-lg border bg-muted/30">
            <div className="flex flex-wrap gap-2 mb-4">
              <FeatureToggle
                active={activeMode === "chat"}
                onActiveChange={() => handleModeChange("chat")}
                icon={<Bot className="size-4" />}
                colorScheme="blue"
              >
                Chat
              </FeatureToggle>
              <FeatureToggle
                active={activeMode === "search"}
                onActiveChange={() => handleModeChange("search")}
                icon={<Search className="size-4" />}
                colorScheme="blue"
              >
                Search
              </FeatureToggle>
              <FeatureToggle
                active={activeMode === "agent"}
                onActiveChange={() => handleModeChange("agent")}
                icon={<BrainCircuit className="size-4" />}
                colorScheme="blue"
              >
                Agent
              </FeatureToggle>
            </div>
            <div className="h-20 flex items-center justify-center rounded border text-sm text-muted-foreground">
              Active mode:{" "}
              <span className="ml-2 text-blue-600 dark:text-blue-400 font-medium">
                {activeMode}
              </span>
            </div>
          </div>
        </div>
      }
      code={`import { FeatureToggle } from "@/components/haber-ui/feature-toggle";
import { Bot, Search, BrainCircuit } from "lucide-react";

// Mode selector with mutually exclusive toggles
const [activeMode, setActiveMode] = useState("chat");

const handleModeChange = (mode) => {
  setActiveMode(mode);
};

return (
  <div className="flex gap-2">
    <FeatureToggle
      active={activeMode === "chat"}
      onActiveChange={() => handleModeChange("chat")}
      icon={<Bot className="size-4" />}
      colorScheme="blue"
    >
      Chat
    </FeatureToggle>
    
    <FeatureToggle
      active={activeMode === "search"}
      onActiveChange={() => handleModeChange("search")}
      icon={<Search className="size-4" />}
      colorScheme="blue"
    >
      Search
    </FeatureToggle>
    
    <FeatureToggle
      active={activeMode === "agent"}
      onActiveChange={() => handleModeChange("agent")}
      icon={<BrainCircuit className="size-4" />}
      colorScheme="blue"
    >
      Agent
    </FeatureToggle>
  </div>
);`}
    />
  );
}

// Input Integration Demo
export function InputIntegrationDemo() {
  const [searchActive, setSearchActive] = useState(false);
  const [researchActive, setResearchActive] = useState(false);
  const [input, setInput] = useState("");

  return (
    <TabDemo
      title="Input Integration"
      preview={
        <div className="p-4 bg-card rounded-lg">
          <div className="relative">
            <div className="flex gap-1.5 absolute bottom-full mb-2">
              <FeatureToggle
                active={searchActive}
                onActiveChange={setSearchActive}
                icon={<Search className="size-3.5" />}
                size="sm"
              >
                Search
              </FeatureToggle>
              <FeatureToggle
                active={researchActive}
                onActiveChange={setResearchActive}
                icon={<Sparkles className="size-3.5" />}
                size="sm"
                colorScheme="purple"
              >
                Research
              </FeatureToggle>
            </div>
            <div className="flex rounded-lg border bg-card overflow-hidden">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  searchActive
                    ? "Search the web..."
                    : researchActive
                      ? "Ask a research question..."
                      : "Message..."
                }
                className="flex-1 bg-transparent border-0 py-3 px-4 text-sm focus:outline-none"
              />
              <button className="bg-primary text-primary-foreground px-4 text-sm font-medium">
                Send
              </button>
            </div>
          </div>
        </div>
      }
      code={`import { FeatureToggle } from "@/components/haber-ui/feature-toggle";
import { Search, Sparkles } from "lucide-react";

const [searchActive, setSearchActive] = useState(false);
const [researchActive, setResearchActive] = useState(false);
const [input, setInput] = useState("");

return (
  <div className="relative">
    <div className="flex gap-1.5 absolute bottom-full mb-2">
      <FeatureToggle
        active={searchActive}
        onActiveChange={setSearchActive}
        icon={<Search className="size-3.5" />}
        size="sm"
      >
        Search
      </FeatureToggle>
      
      <FeatureToggle
        active={researchActive}
        onActiveChange={setResearchActive}
        icon={<Sparkles className="size-3.5" />}
        size="sm"
        colorScheme="purple"
      >
        Research
      </FeatureToggle>
    </div>
    
    <div className="flex rounded-lg border bg-card overflow-hidden">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          searchActive 
            ? "Search the web..." 
            : researchActive 
              ? "Ask a research question..." 
              : "Message..."
        }
        className="flex-1 bg-transparent border-0 py-3 px-4 text-sm focus:outline-none"
      />
      <button className="bg-primary text-primary-foreground px-4 text-sm font-medium">
        Send
      </button>
    </div>
  </div>
);`}
    />
  );
}

// Props Table
export function PropsTable() {
  return (
    <TypeTable
      type={{
        active: {
          description: "Current state of the toggle",
          type: "boolean",
          default: "false",
        },
        onActiveChange: {
          description: "Called when the toggle state changes",
          type: "(active: boolean) => void",
        },
        icon: {
          description: "Icon to display before the label",
          type: "React.ReactNode",
        },
        variant: {
          description: "Visual style variant",
          type: '"default" | "outline" | "solid"',
          default: '"default"',
        },
        size: {
          description: "Size variant",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
        },
        colorScheme: {
          description: "Color theme when active",
          type: '"blue" | "purple" | "green" | "amber" | "rose"',
          default: '"blue"',
        },
        activeClassName: {
          description: "Classes applied to active state",
          type: "string",
        },
        inactiveClassName: {
          description: "Classes applied to inactive state",
          type: "string",
        },
        iconClassName: {
          description: "Classes applied to the icon",
          type: "string",
        },
      }}
    />
  );
}
