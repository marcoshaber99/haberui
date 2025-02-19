import path from "path";

type ComponentDefinition = {
  name: string;
  path: string;
  dependencies?: string[];
  registryDependencies?: string[];
};

export const components: ComponentDefinition[] = [
  {
    name: "haber-button",
    path: path.join(__dirname, "../components/haber-ui/haber-button.tsx"),
    registryDependencies: ["button"],
    dependencies: ["class-variance-authority"],
  },
];
