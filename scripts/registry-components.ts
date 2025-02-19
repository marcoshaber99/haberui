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
    devDependencies: [],
  },
  {
    name: "gradient-blob",
    path: path.join(__dirname, "../components/haber-ui/gradient-blob.tsx"),
    registryDependencies: [],
    dependencies: [],
    devDependencies: [],
  },
];
