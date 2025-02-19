import path from "path";
import type { Schema } from "./registry-schema";

type ComponentDefinition = Partial<
  Pick<
    Schema,
    | "dependencies"
    | "devDependencies"
    | "registryDependencies"
    | "cssVars"
    | "tailwind"
  >
> & {
  name: string;
  path: string;
};

export const components: ComponentDefinition[] = [
  {
    name: "haber-button",
    path: path.join(__dirname, "../components/haber-ui/haber-button.tsx"),
    registryDependencies: ["button"],
    dependencies: ["class-variance-authority"],
  },
  // Add more haber-ui components here as you create them
];
