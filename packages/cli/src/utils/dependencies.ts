import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs-extra";
import { Component } from "./registry";
import { Config } from "./config";

const execAsync = promisify(exec);

export async function installDependencies(
  component: Component,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config: Config
): Promise<void> {
  const dependencies = component.dependencies || [];
  const devDependencies = component.devDependencies || [];

  // Install registry dependencies like shadcn components
  if (component.registryDependencies?.length) {
    for (const dep of component.registryDependencies) {
      console.log(`Installing shadcn dependency: ${dep}`);
      try {
        // Check if it's a shadcn component
        if (isShadcnComponent(dep)) {
          // Run shadcn add command
          await execAsync(`npx shadcn@latest add ${dep} --yes`);
        } else {
          // It's a haber-ui component
          await execAsync(`haber add ${dep} --yes`);
        }
      } catch (error) {
        console.warn(`Warning: Failed to install dependency ${dep}`, error);
      }
    }
  }

  // Function to check if a component is from shadcn
  function isShadcnComponent(name: string): boolean {
    // List of common shadcn components
    const shadcnComponents = [
      "accordion",
      "alert",
      "alert-dialog",
      "aspect-ratio",
      "avatar",
      "badge",
      "button",
      "calendar",
      "card",
      "checkbox",
      "collapsible",
      "combobox",
      "command",
      "context-menu",
      "dialog",
      "dropdown-menu",
      "form",
      "hover-card",
      "input",
      "label",
      "menubar",
      "navigation-menu",
      "popover",
      "progress",
      "radio-group",
      "scroll-area",
      "select",
      "separator",
      "sheet",
      "skeleton",
      "slider",
      "switch",
      "table",
      "tabs",
      "textarea",
      "toast",
      "toggle",
      "tooltip",
    ];

    return shadcnComponents.includes(name);
  }

  // Check package manager used in the project
  const packageManager = await detectPackageManager();

  // Install dependencies if needed
  if (dependencies.length > 0) {
    console.log(`Installing dependencies: ${dependencies.join(", ")}`);
    const installCmd = getInstallCommand(packageManager, dependencies, false);
    await execAsync(installCmd);
  }

  // Install dev dependencies if needed
  if (devDependencies.length > 0) {
    console.log(`Installing dev dependencies: ${devDependencies.join(", ")}`);
    const installCmd = getInstallCommand(packageManager, devDependencies, true);
    await execAsync(installCmd);
  }
}

async function detectPackageManager(): Promise<"npm" | "yarn" | "pnpm"> {
  try {
    // Check for lock files to determine package manager
    const hasYarnLock = await fs.pathExists("yarn.lock");
    if (hasYarnLock) return "yarn";

    const hasPnpmLock = await fs.pathExists("pnpm-lock.yaml");
    if (hasPnpmLock) return "pnpm";

    return "npm";
  } catch (error) {
    console.log(error);
    return "npm"; // Default to npm if detection fails
  }
}

function getInstallCommand(
  packageManager: "npm" | "yarn" | "pnpm",
  packages: string[],
  isDev: boolean
): string {
  const pkgList = packages.join(" ");

  switch (packageManager) {
    case "yarn":
      return `yarn add ${isDev ? "--dev " : ""}${pkgList}`;
    case "pnpm":
      return `pnpm add ${isDev ? "--save-dev " : ""}${pkgList}`;
    case "npm":
    default:
      return `npm install ${isDev ? "--save-dev " : ""}${pkgList}`;
  }
}
