import fs from "fs";
import path from "path";
import type { Schema } from "./registry-schema";
import { components } from "./registry-components";

/**
 * Builds the registry by reading component definitions and generating JSON files
 * in the public/h directory for use in the library.
 */

const registryDir = path.join(__dirname, "../public/h");

if (!fs.existsSync(registryDir)) {
  fs.mkdirSync(registryDir);
}

for (const component of components) {
  if (!fs.existsSync(component.path)) {
    console.error(`File not found: ${component.path}`);
    continue;
  }

  try {
    const content = fs.readFileSync(component.path, "utf8");
    const stats = fs.statSync(component.path);
    const lastUpdated = stats.mtime.toISOString();

    const schema = {
      name: component.name,
      type: "registry:ui",
      version: component.version,
      lastUpdated,
      registryDependencies: component.registryDependencies || [],
      dependencies: component.dependencies || [],
      devDependencies: component.devDependencies || [],
      tailwind: component.tailwind || {},
      cssVars: component.cssVars || {
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
  } catch (error) {
    console.error(`Error processing component ${component.name}:`, error);
    continue;
  }
}

console.log("Registry built successfully!");
