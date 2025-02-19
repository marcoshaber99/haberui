import fs from "fs";
import path from "path";
import type { Schema } from "./registry-schema";
import { components } from "./registry-components";

const registryDir = path.join(__dirname, "../public/h");

if (!fs.existsSync(registryDir)) {
  fs.mkdirSync(registryDir);
}

for (const component of components) {
  const content = fs.readFileSync(component.path, "utf8");
  const schema = {
    name: component.name,
    type: "registry:ui",
    registryDependencies: component.registryDependencies || [],
    dependencies: component.dependencies || [],
    devDependencies: component.devDependencies || [],
    tailwind: {},
    cssVars: {
      light: {},
      dark: {},
    },
    files: [
      {
        path: `${component.name}.tsx`,
        content,
        type: "registry:ui",
      },
    ],
  } satisfies Schema;

  fs.writeFileSync(
    path.join(registryDir, `${component.name}.json`),
    JSON.stringify(schema, null, 2)
  );
}

console.log("Registry built successfully!");
