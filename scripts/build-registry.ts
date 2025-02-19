import fs from "fs";
import path from "path";
import type { Schema } from "./registry-schema";
import { components } from "./registry-components";

const registryDir = path.join(__dirname, "../public/h");

if (!fs.existsSync(registryDir)) {
  fs.mkdirSync(registryDir, { recursive: true });
}

// Generate individual component JSON files
for (const component of components) {
  const content = fs.readFileSync(component.path, "utf8");
  const schema: Schema = {
    style: "default",
    name: component.name,
    type: "registry:ui",
    registryDependencies: component.registryDependencies || [],
    dependencies: component.dependencies || [],
    files: [
      {
        name: path.basename(component.path),
        content,
        type: "registry:ui",
      },
    ],
  };
  fs.writeFileSync(
    path.join(registryDir, `${component.name}.json`),
    JSON.stringify(schema, null, 2)
  );
}

console.log("Registry built successfully!");
