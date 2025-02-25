import fs from "fs";
import path from "path";
import { components } from "./registry-components";

// Create the registry directory if it doesn't exist
const registryDir = path.join(__dirname, "../public/h");
if (!fs.existsSync(registryDir)) {
  fs.mkdirSync(registryDir, { recursive: true });
}

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

// Generate the index file containing metadata about all components
const componentMetadata = components.map((component) => {
  let description = "";
  try {
    const content = fs.readFileSync(component.path, "utf8");
    description = extractDescription(content);
  } catch (error) {
    console.warn(`Could not read ${component.name} for description:`, error);
  }

  return {
    name: component.name,
    version: component.version,
    description,
    registryDependencies: component.registryDependencies || [],
    dependencies: component.dependencies || [],
    devDependencies: component.devDependencies || [],
  };
});

// Write the index file
fs.writeFileSync(
  path.join(registryDir, "index.json"),
  JSON.stringify({ components: componentMetadata }, null, 2)
);

// Create schema file for configuration validation
const schemaContent = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "HaberUI Configuration",
  type: "object",
  properties: {
    $schema: {
      type: "string",
    },
    style: {
      type: "string",
      enum: ["tailwind", "css"],
      description: "The styling solution to use",
    },
    tailwind: {
      type: "boolean",
      description: "Whether to use Tailwind CSS",
    },
    componentDir: {
      type: "string",
      description: "Directory where components will be installed",
    },
    importPath: {
      type: "string",
      description: "Import alias for the components",
    },
  },
  required: ["style", "tailwind", "componentDir", "importPath"],
};

fs.writeFileSync(
  path.join(registryDir, "schema.json"),
  JSON.stringify(schemaContent, null, 2)
);

console.log(
  `✓ Generated index.json with ${componentMetadata.length} components`
);
console.log(`✓ Generated schema.json for configuration validation`);
