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
    dependencies: ["class-variance-authority", "motion"],
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
    dependencies: ["lucide-react", "class-variance-authority"],
    devDependencies: [],
  },
  {
    name: "feature-toggle",
    path: path.join(__dirname, "../components/haber-ui/feature-toggle.tsx"),
    version: "1.0.0",
    registryDependencies: [],
    dependencies: ["lucide-react", "class-variance-authority"],
    devDependencies: [],
  },
];
