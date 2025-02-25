import path from "path";
import type { Schema } from "./registry-schema";

type ComponentDefinition = {
  name: string;
  path: string;
  version: string;
  additionalFiles?: Array<{
    name: string;
    path: string;
  }>;
} & Partial<
  Pick<
    Schema,
    | "dependencies"
    | "devDependencies"
    | "registryDependencies"
    | "cssVars"
    | "tailwind"
  >
>;

export const components: ComponentDefinition[] = [
  {
    name: "thinking-state",
    path: path.join(__dirname, "../components/haber-ui/thinking-state.tsx"),
    version: "1.0.0",
    registryDependencies: [],
    dependencies: [],
    devDependencies: [],
  },
  {
    name: "ai-feedback-collector",
    path: path.join(
      __dirname,
      "../components/haber-ui/ai-feedback-collector.tsx"
    ),
    version: "1.0.0",
    registryDependencies: [],
    dependencies: ["lucide-react"],
    devDependencies: [],
  },
  {
    name: "ai-parameter-controls",
    path: path.join(
      __dirname,
      "../components/haber-ui/ai-parameter-controls.tsx"
    ),
    version: "1.0.0",
    registryDependencies: ["slider", "input", "button", "tooltip", "select"],
    dependencies: ["lucide-react"],
    devDependencies: [],
  },
  {
    name: "token-counter",
    path: path.join(__dirname, "../components/haber-ui/token-counter.tsx"),
    version: "1.0.0",
    registryDependencies: ["progress", "tooltip"],
    dependencies: ["lucide-react"],
    devDependencies: [],
  },
];
