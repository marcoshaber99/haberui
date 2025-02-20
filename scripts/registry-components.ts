import path from "path";
import type { Schema } from "./registry-schema";

/**
 * Defines a UI component in the registry
 */
type ComponentDefinition = {
  name: string; // Component name
  path: string; // Path to the component file
  version: string; // Component version (semver)
} & Partial<
  Pick<
    Schema,
    | "dependencies" // Runtime dependencies
    | "devDependencies" // Development dependencies
    | "registryDependencies" // Dependencies on other registry components
    | "cssVars" // CSS variables for light/dark themes
    | "tailwind" // Tailwind configuration
  >
>;

export const components: ComponentDefinition[] = [
  {
    name: "gradient-blob",
    path: path.join(__dirname, "../components/haber-ui/gradient-blob.tsx"),
    version: "1.0.0",
    registryDependencies: [],
    dependencies: [],
    devDependencies: [],
  },
];
