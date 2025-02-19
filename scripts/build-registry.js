/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

const registryDir = path.join(__dirname, "..", "registry");

// Read the registry.json file
const registryPath = path.join(registryDir, "registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));

// Process each component
registry.components.forEach((component) => {
  const componentPath = path.join(process.cwd(), component.files[0]);
  const componentContent = fs.readFileSync(componentPath, "utf8");

  // Create or update the component JSON file
  const componentJsonPath = path.join(registryDir, `${component.name}.json`);
  const componentJson = {
    name: component.name,
    type: component.type,
    registryDependencies: component.registryDependencies,
    files: [
      {
        name: path.basename(component.files[0]),
        content: componentContent,
      },
    ],
  };

  fs.writeFileSync(componentJsonPath, JSON.stringify(componentJson, null, 2));
});

console.log("Registry built successfully!");
