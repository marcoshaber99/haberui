import fs from "fs"; // For working with files
import path from "path"; // For handling file paths
import type { Schema } from "./registry-schema"; // The type that defines what our JSON should look like
import { components } from "./registry-components"; // The list of components we want to add to our registry

// Create the directory where we'll store our JSON files if it doesn't exist
const registryDir = path.join(__dirname, "../public/h");
if (!fs.existsSync(registryDir)) {
  fs.mkdirSync(registryDir);
}

// For each component in our list...
for (const component of components) {
  // First check if the component file exists
  if (!fs.existsSync(component.path)) {
    console.error(`File not found: ${component.path}`);
    continue;
  }

  try {
    // Read the actual component code from its file
    const content = fs.readFileSync(component.path, "utf8");

    // Get the last time this file was modified
    const stats = fs.statSync(component.path);
    const lastUpdated = stats.mtime.toISOString();

    // Create the JSON schema for this component
    const schema = {
      name: component.name,
      type: "registry:ui",
      version: component.version,
      lastUpdated,
      // These arrays can be empty or filled with dependencies
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
          content, // This is the actual component code we read earlier
          type: "registry:ui",
        },
      ],
    } satisfies Schema;

    // Write this JSON to a file named after the component
    fs.writeFileSync(
      path.join(registryDir, `${component.name}.json`),
      JSON.stringify(schema, null, 2)
    );
  } catch (error) {
    console.error(`Error processing component ${component.name}:`, error);
    continue;
  }
}
