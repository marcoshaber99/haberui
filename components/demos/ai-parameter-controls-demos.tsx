"use client";

import React, { useState } from "react";
import {
  AIParameterControls,
  AIParameter,
  DEFAULT_PARAMETERS,
  Preset,
} from "@/components/haber-ui/ai-parameter-controls";
import { TabDemo } from "@/components/demos/demo-factory";

// Basic Demo
export function BasicDemo() {
  const [parameters, setParameters] =
    useState<AIParameter[]>(DEFAULT_PARAMETERS);

  const handleParametersChange = (newParams: AIParameter[]) => {
    setParameters(newParams);
    console.log("Parameters updated:", newParams);
  };

  return (
    <TabDemo
      title="Basic Usage"
      preview={
        <AIParameterControls
          parameters={parameters}
          onParametersChange={handleParametersChange}
        />
      }
      code={`import { AIParameterControls, DEFAULT_PARAMETERS } from "@/components/haber-ui/ai-parameter-controls";

const [parameters, setParameters] = useState(DEFAULT_PARAMETERS);

const handleParametersChange = (newParams) => {
  setParameters(newParams);
  console.log("Parameters updated:", newParams);
};

<AIParameterControls 
  parameters={parameters}
  onParametersChange={handleParametersChange}
/>`}
    />
  );
}

// Horizontal Layout
export function HorizontalDemo() {
  const [parameters, setParameters] =
    useState<AIParameter[]>(DEFAULT_PARAMETERS);

  return (
    <TabDemo
      title="Horizontal Layout"
      preview={
        <AIParameterControls
          parameters={parameters}
          onParametersChange={setParameters}
          layout="horizontal"
        />
      }
      code={`import { AIParameterControls, DEFAULT_PARAMETERS } from "@/components/haber-ui/ai-parameter-controls";

const [parameters, setParameters] = useState(DEFAULT_PARAMETERS);

<AIParameterControls 
  parameters={parameters}
  onParametersChange={setParameters}
  layout="horizontal"
/>`}
    />
  );
}

// Custom Parameters Demo
export function CustomParametersDemo() {
  const customParameters: AIParameter[] = [
    {
      name: "temperature",
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.1,
      description: "Controls randomness in the output",
    },
    {
      name: "length",
      value: 250,
      min: 50,
      max: 1000,
      step: 10,
      description: "Controls the length of the generated response",
    },
    {
      name: "creativity",
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.05,
      description: "Balances creative vs. factual responses",
    },
  ];

  const [parameters, setParameters] = useState<AIParameter[]>(customParameters);

  return (
    <TabDemo
      title="Custom Parameters"
      preview={
        <AIParameterControls
          parameters={parameters}
          onParametersChange={setParameters}
          showPresets={false}
        />
      }
      code={`import { AIParameterControls } from "@/components/haber-ui/ai-parameter-controls";

const customParameters = [
  {
    name: "temperature",
    value: 0.5,
    min: 0,
    max: 2,
    step: 0.1,
    description: "Controls randomness in the output",
  },
  {
    name: "length",
    value: 250,
    min: 50,
    max: 1000,
    step: 10,
    description: "Controls the length of the generated response",
  },
  {
    name: "creativity",
    value: 0.7,
    min: 0,
    max: 1,
    step: 0.05,
    description: "Balances creative vs. factual responses",
  },
];

const [parameters, setParameters] = useState(customParameters);

<AIParameterControls 
  parameters={parameters}
  onParametersChange={setParameters}
  showPresets={false}
/>`}
    />
  );
}

// Custom Presets Demo
export function CustomPresetsDemo() {
  const customPresets: Preset[] = [
    {
      name: "Business",
      description: "Professional and concise",
      parameters: {
        temperature: 0.3,
        top_p: 0.85,
        max_tokens: 200,
        frequency_penalty: 0.5,
      },
    },
    {
      name: "Storytelling",
      description: "Creative and engaging narratives",
      parameters: {
        temperature: 1.4,
        top_p: 1.0,
        max_tokens: 800,
        frequency_penalty: 0.1,
      },
    },
    {
      name: "Technical",
      description: "Precise and detailed explanations",
      parameters: {
        temperature: 0.2,
        top_p: 0.7,
        max_tokens: 400,
        frequency_penalty: 0.4,
      },
    },
  ];

  const [parameters, setParameters] =
    useState<AIParameter[]>(DEFAULT_PARAMETERS);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);

  const handlePresetChange = (preset: Preset) => {
    setSelectedPreset(preset);
    console.log("Selected preset:", preset.name);
  };

  return (
    <TabDemo
      title="Custom Presets"
      preview={
        <div className="space-y-4">
          <AIParameterControls
            parameters={parameters}
            onParametersChange={setParameters}
            presets={customPresets}
            onPresetChange={handlePresetChange}
          />

          {selectedPreset && (
            <div className="p-3 text-sm rounded-md bg-muted/50">
              <p className="font-medium">
                Selected Preset: {selectedPreset.name}
              </p>
              <p className="text-muted-foreground">
                {selectedPreset.description}
              </p>
            </div>
          )}
        </div>
      }
      code={`import { AIParameterControls, DEFAULT_PARAMETERS } from "@/components/haber-ui/ai-parameter-controls";

const customPresets = [
  {
    name: "Business",
    description: "Professional and concise",
    parameters: {
      temperature: 0.3,
      top_p: 0.85,
      max_tokens: 200,
      frequency_penalty: 0.5,
    },
  },
  {
    name: "Storytelling",
    description: "Creative and engaging narratives",
    parameters: {
      temperature: 1.4,
      top_p: 1.0,
      max_tokens: 800,
      frequency_penalty: 0.1,
    },
  },
  {
    name: "Technical",
    description: "Precise and detailed explanations",
    parameters: {
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 400,
      frequency_penalty: 0.4,
    },
  },
];

const [parameters, setParameters] = useState(DEFAULT_PARAMETERS);
const [selectedPreset, setSelectedPreset] = useState(null);

const handlePresetChange = (preset) => {
  setSelectedPreset(preset);
  console.log("Selected preset:", preset.name);
};

<AIParameterControls 
  parameters={parameters}
  onParametersChange={setParameters}
  presets={customPresets}
  onPresetChange={handlePresetChange}
/>`}
    />
  );
}

// Props display component
export function PropsTable() {
  return (
    <div className="space-y-6 rounded-lg border p-6">
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">parameters</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">AIParameter[]</span>
        </p>
        <p className="text-sm">
          Array of parameters to display (temperature, top_p, etc.)
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">onParametersChange</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">
            (parameters: AIParameter[]) =&gt; void
          </span>
        </p>
        <p className="text-sm">Called when parameters are changed</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">presets</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">Preset[]</span>
        </p>
        <p className="text-sm">Available parameter presets</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">onPresetChange</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">(preset: Preset) =&gt; void</span>
        </p>
        <p className="text-sm">Called when a preset is selected</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">showReset</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">boolean</span>
        </p>
        <p className="text-sm">Show the reset button. Default: true</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">showPresets</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">boolean</span>
        </p>
        <p className="text-sm">Show the presets selector. Default: true</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">resetLabel</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">string</span>
        </p>
        <p className="text-sm">
          Label for the reset button. Default: &quot;Reset to defaults&quot;
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">parameterClassName</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">string</span>
        </p>
        <p className="text-sm">Custom class for the parameter container</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">layout</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">
            &quot;horizontal&quot; | &quot;vertical&quot;
          </span>
        </p>
        <p className="text-sm">
          Layout direction. Default: &quot;vertical&quot;
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">decimalPlaces</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs">number</span>
        </p>
        <p className="text-sm">
          Number of decimal places to display. Default: 1
        </p>
      </div>
    </div>
  );
}
