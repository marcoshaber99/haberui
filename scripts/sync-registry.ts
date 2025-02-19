import fs from "fs";
import path from "path";
import { components } from "./registry-components";

function updateRegistryComponents() {
  const componentsDir = path.join(process.cwd(), "components", "haber-ui");
  const existingComponents = new Map(
    components.map((c) => [path.basename(c.path), c])
  );

  const newComponents = [];

  const files = fs
    .readdirSync(componentsDir)
    .filter((file) => file.endsWith(".tsx"));

  for (const file of files) {
    if (!existingComponents.has(file)) {
      const name = path.basename(file, ".tsx");
      newComponents.push({
        name,
        path: path.join(__dirname, "../components/haber-ui", file),
        registryDependencies: [],
        dependencies: [],
      });
    }
  }

  if (newComponents.length === 0) {
    console.log("No new haber-ui components to add.");
    return;
  }

  const registryPath = path.join(__dirname, "registry-components.ts");
  const content = fs.readFileSync(registryPath, "utf8");

  const lastComponentIndex = content.lastIndexOf("}");

  const newComponentsString = newComponents
    .map(
      (comp) => `  {
    name: '${comp.name}',
    path: path.join(__dirname, '../components/haber-ui/${path.basename(
      comp.path
    )}'),
    registryDependencies: [],
    dependencies: [],
  }`
    )
    .join(",\n");

  const updatedContent =
    content.slice(0, lastComponentIndex + 1) +
    ",\n" +
    newComponentsString +
    "\n];";

  fs.writeFileSync(registryPath, updatedContent);

  console.log(`Added ${newComponents.length} new haber-ui components:`);
  console.log(newComponents.map((c) => c.name).join(", "));
}

updateRegistryComponents();
