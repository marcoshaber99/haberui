/**
 * AI Parameter Controls - A clean, elegant UI for adjusting common AI model parameters
 * with visual controls, helpful tooltips, and preset configurations.
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, Zap } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface AIParameter {
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  description: string;
}

export interface Preset {
  name: string;
  description: string;
  parameters: {
    [key: string]: number;
  };
}

export interface AIParameterControlsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Parameters to display (temperature, top_p, etc)
   */
  parameters: AIParameter[];
  /**
   * Called when parameters are changed
   */
  onParametersChange?: (parameters: AIParameter[]) => void;
  /**
   * Available presets
   */
  presets?: Preset[];
  /**
   * Called when a preset is selected
   */
  onPresetChange?: (preset: Preset) => void;
  /**
   * Show the reset button
   */
  showReset?: boolean;
  /**
   * Show the presets selector
   */
  showPresets?: boolean;
  /**
   * Label for the reset button
   */
  resetLabel?: string;
  /**
   * Custom class for the parameter container
   */
  parameterClassName?: string;
  /**
   * Layout direction
   */
  layout?: "horizontal" | "vertical";
  /**
   * Number of decimal places to display
   */
  decimalPlaces?: number;
}

// Default parameters with descriptions
export const DEFAULT_PARAMETERS: AIParameter[] = [
  {
    name: "temperature",
    value: 0.7,
    min: 0,
    max: 2,
    step: 0.1,
    description:
      "Controls randomness: Lower values are more focused and deterministic, higher values are more creative and varied.",
  },
  {
    name: "top_p",
    value: 0.9,
    min: 0,
    max: 1,
    step: 0.05,
    description:
      "Nucleus sampling: Limits token selection to those with top probability mass. Lower values make output more focused.",
  },
  {
    name: "max_tokens",
    value: 256,
    min: 1,
    max: 4096,
    step: 1,
    description:
      "Maximum length of the generated output in tokens. One token is roughly 4 characters or 0.75 words.",
  },
  {
    name: "frequency_penalty",
    value: 0,
    min: -2,
    max: 2,
    step: 0.1,
    description:
      "Reduces repetition by penalizing tokens based on their frequency. Higher values decrease repetition.",
  },
];

// Default presets
export const DEFAULT_PRESETS: Preset[] = [
  {
    name: "Balanced",
    description: "Default balanced settings for general use",
    parameters: {
      temperature: 0.7,
      top_p: 0.9,
      max_tokens: 256,
      frequency_penalty: 0,
    },
  },
  {
    name: "Creative",
    description: "Settings for more varied and creative outputs",
    parameters: {
      temperature: 1.2,
      top_p: 1.0,
      max_tokens: 512,
      frequency_penalty: 0.2,
    },
  },
  {
    name: "Precise",
    description: "Settings for more focused and deterministic outputs",
    parameters: {
      temperature: 0.3,
      top_p: 0.8,
      max_tokens: 256,
      frequency_penalty: 0.3,
    },
  },
  {
    name: "Efficient",
    description: "Settings optimized for shorter, concise responses",
    parameters: {
      temperature: 0.5,
      top_p: 0.9,
      max_tokens: 128,
      frequency_penalty: 0.5,
    },
  },
];

export const AIParameterControls = React.forwardRef<
  HTMLDivElement,
  AIParameterControlsProps
>(
  (
    {
      className,
      parameters = DEFAULT_PARAMETERS,
      onParametersChange,
      presets = DEFAULT_PRESETS,
      onPresetChange,
      showReset = true,
      showPresets = true,
      resetLabel = "Reset to defaults",
      parameterClassName,
      layout = "vertical",
      decimalPlaces = 1,
      ...props
    },
    ref
  ) => {
    // Store the initial parameter values for reset functionality
    const initialParametersRef = React.useRef<AIParameter[]>([...parameters]);

    // State for parameters
    const [localParameters, setLocalParameters] =
      React.useState<AIParameter[]>(parameters);

    // Update local parameters when props change (but not for user interactions)
    React.useEffect(() => {
      setLocalParameters(parameters);

      // Also update the initial parameters reference if it's the first render
      if (initialParametersRef.current.length === 0) {
        initialParametersRef.current = [...parameters];
      }
    }, [parameters]);

    // Handle parameter change
    const handleParameterChange = (name: string, value: number) => {
      const updatedParameters = localParameters.map((param) =>
        param.name === name ? { ...param, value } : param
      );
      setLocalParameters(updatedParameters);

      if (onParametersChange) {
        onParametersChange(updatedParameters);
      }
    };

    // Handle preset selection
    const handlePresetChange = (presetName: string) => {
      const selectedPreset = presets.find((p) => p.name === presetName);
      if (!selectedPreset) return;

      // Update parameters based on preset
      const updatedParameters = localParameters.map((param) => {
        const presetValue = selectedPreset.parameters[param.name];
        return presetValue !== undefined
          ? { ...param, value: presetValue }
          : param;
      });

      setLocalParameters(updatedParameters);

      if (onParametersChange) {
        onParametersChange(updatedParameters);
      }

      if (onPresetChange) {
        onPresetChange(selectedPreset);
      }
    };

    // Handle reset to defaults
    const handleReset = () => {
      // Reset to the initial parameters that were stored when the component first mounted
      const resetParams = [...initialParametersRef.current];
      setLocalParameters(resetParams);

      if (onParametersChange) {
        onParametersChange(resetParams);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "space-y-4",
          layout === "horizontal"
            ? "sm:space-y-0 sm:space-x-6 sm:flex sm:items-start"
            : "",
          className
        )}
        {...props}
      >
        {/* Preset selector */}
        {showPresets && (
          <div
            className={cn("w-full", layout === "horizontal" ? "sm:w-40" : "")}
          >
            <div className="mb-2 flex items-center">
              <span className="text-sm font-medium">Preset</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Zap className="h-3.5 w-3.5 ml-1.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-80">
                    Quick configuration presets for different use cases
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select onValueChange={handlePresetChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select preset" />
              </SelectTrigger>
              <SelectContent>
                {presets.map((preset) => (
                  <SelectItem key={preset.name} value={preset.name}>
                    <div className="flex flex-col">
                      <span>{preset.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {preset.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Parameter controls */}
        <div
          className={cn(
            "space-y-6",
            layout === "horizontal"
              ? "sm:flex sm:space-y-0 sm:space-x-6 sm:flex-1"
              : ""
          )}
        >
          {localParameters.map((param) => (
            <div
              key={param.name}
              className={cn(
                "space-y-2",
                layout === "horizontal" ? "sm:flex-1" : "",
                parameterClassName
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <label
                    htmlFor={param.name}
                    className="text-sm font-medium capitalize"
                  >
                    {param.name.replace(/_/g, " ")}
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1.5 h-3.5 w-3.5 rounded-full border border-muted-foreground/30 inline-flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                          ?
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-80">
                        {param.description}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-sm text-muted-foreground">
                  {param.name === "max_tokens"
                    ? Math.round(param.value).toLocaleString()
                    : param.value.toFixed(decimalPlaces)}
                </span>
              </div>

              {param.name === "max_tokens" ? (
                <Input
                  id={param.name}
                  type="number"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={param.value}
                  onChange={(e) =>
                    handleParameterChange(
                      param.name,
                      parseFloat(e.target.value)
                    )
                  }
                  className="h-8"
                />
              ) : (
                <Slider
                  id={param.name}
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={[param.value]}
                  onValueChange={(values) =>
                    handleParameterChange(param.name, values[0])
                  }
                />
              )}
            </div>
          ))}
        </div>

        {/* Reset button */}
        {showReset && (
          <div
            className={cn(layout === "horizontal" ? "sm:self-end sm:pb-2" : "")}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="h-8 text-xs"
            >
              <RefreshCw className="mr-1.5 h-3 w-3" />
              {resetLabel}
            </Button>
          </div>
        )}
      </div>
    );
  }
);

AIParameterControls.displayName = "AIParameterControls";
