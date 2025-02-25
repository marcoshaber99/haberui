import fs from "fs";
import path from "path";
import type { Schema } from "./registry-schema";
import { components } from "./registry-components";

/**
 * Extract description from component file using JSDoc comments
 */
function extractDescription(content: string): string {
  // Try finding JSDoc for component, interface, or type
  const jsDocMatch = content.match(/\/\*\*\s*([^*]*(?:\*(?!\/)[^*]*)*)\*\//s);
  if (jsDocMatch && jsDocMatch[1]) {
    return jsDocMatch[1].replace(/\s*\*\s*/g, " ").trim();
  }
  return "";
}

// Create the registry directory if it doesn't exist
const registryDir = path.join(__dirname, "../public/h");
if (!fs.existsSync(registryDir)) {
  fs.mkdirSync(registryDir, { recursive: true });
}

// For each component in our list...
for (const component of components) {
  // First check if the component file exists
  if (!fs.existsSync(component.path)) {
    console.error(`File not found: ${component.path}`);
    continue;
  }

  try {
    // Read the component code
    const content = fs.readFileSync(component.path, "utf8");

    // Get the last time this file was modified
    const stats = fs.statSync(component.path);
    const lastUpdated = stats.mtime.toISOString();

    // Extract a description
    const description = extractDescription(content);

    // Create the JSON schema
    const schema = {
      name: component.name,
      type: "registry:ui",
      version: component.version,
      description,
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
          content, // Component code
          type: "registry:ui",
        },
      ],
    } satisfies Schema;

    // Write the JSON file
    fs.writeFileSync(
      path.join(registryDir, `${component.name}.json`),
      JSON.stringify(schema, null, 2)
    );

    console.log(`✓ Generated ${component.name}.json`);
  } catch (error) {
    console.error(`Error processing component ${component.name}:`, error);
  }
}
