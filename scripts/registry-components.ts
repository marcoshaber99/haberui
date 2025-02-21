import path from "path";
import type { Schema } from "./registry-schema";

type ComponentDefinition = {
  name: string;
  path: string;
  version: string;
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
    name: "ai-sentiment-analyzer",
    path: path.join(
      __dirname,
      "../components/haber-ui/ai-sentiment-analyzer.tsx"
    ),
    version: "1.0.0",
    registryDependencies: ["textarea", "button"],
    dependencies: ["lucide-react"],
    devDependencies: [],
  },
];
