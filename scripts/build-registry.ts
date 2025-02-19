import fs from "fs";
import path from "path";
import type { Schema } from "./registry-schema";
import { components } from "./registry-components";

const registryDir = path.join(__dirname, "../public/registry");

if (!fs.existsSync(registryDir)) {
  fs.mkdirSync(registryDir, { recursive: true });
}

for (const component of components) {
  const content = fs.readFileSync(component.path, "utf8");
  const schema: Schema = {
    name: component.name,
    type: "components:ui",
    registryDependencies: component.registryDependencies || [],
    dependencies: component.dependencies || [],
    devDependencies: component.devDependencies || [],
    files: [
      {
        name: path.basename(component.path),
        content,
        type: "components:ui",
      },
    ],
  };
  fs.writeFileSync(
    path.join(registryDir, `${component.name}.json`),
    JSON.stringify(schema, null, 2)
  );
}

console.log("Registry built successfully!");
