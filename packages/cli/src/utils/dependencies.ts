import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs-extra";
import { Component } from "./registry";
import { Config } from "./config";

const execAsync = promisify(exec);

// Add a timeout function for commands
function execWithTimeout(command: string, timeoutMs = 60000): Promise<string> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Command timed out after ${timeoutMs}ms: ${command}`));
    }, timeoutMs);

    execAsync(command)
      .then(({ stdout }) => {
        clearTimeout(timeout);
        resolve(stdout);
      })
      .catch((error) => {
        clearTimeout(timeout);
        reject(error);
      });
  });
}

// Check if shadcn is initialized
async function isShadcnInitialized(): Promise<boolean> {
  return fs.pathExists("components.json");
}

export async function installDependencies(
  component: Component,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config: Config
): Promise<void> {
  const dependencies = component.dependencies || [];
  const devDependencies = component.devDependencies || [];

  // Install registry dependencies
  if (component.registryDependencies?.length) {
    // Check if these are shadcn components
    const shadcnDeps = component.registryDependencies.filter((dep) =>
      isShadcnComponent(dep)
    );

    const haberDeps = component.registryDependencies.filter(
      (dep) => !isShadcnComponent(dep)
    );

    // If we have shadcn dependencies, check if shadcn is initialized
    if (shadcnDeps.length > 0) {
      const hasShadcn = await isShadcnInitialized();

      if (!hasShadcn) {
        console.log(
          "This component has shadcn/ui dependencies, but shadcn/ui is not initialized."
        );
        console.log(
          "Please run 'npx shadcn-ui@latest init' first, then try installing the component again."
        );
        console.log(
          "Continuing with installation, but some dependencies may not be installed correctly."
        );
      } else {
        // Install shadcn dependencies
        for (const dep of shadcnDeps) {
          console.log(`Installing shadcn dependency: ${dep}`);
          try {
            await execWithTimeout(
              `npx shadcn-ui@latest add ${dep} --yes`,
              120000
            );
            console.log(`✓ Installed ${dep}`);
          } catch (error) {
            console.warn(error);
            console.warn(
              `⚠️ Failed to install shadcn dependency ${dep}. You may need to install it manually.`
            );
            console.warn(`Run: npx shadcn-ui@latest add ${dep}`);
          }
        }
      }
    }

    // Install haber dependencies
    for (const dep of haberDeps) {
      console.log(`Installing haber-ui dependency: ${dep}`);
      try {
        await execWithTimeout(`npx haber-cli add ${dep} --yes`, 120000);
        console.log(`✓ Installed ${dep}`);
      } catch (error) {
        console.warn(error);
        console.warn(
          `⚠️ Failed to install haber-ui dependency ${dep}. You may need to install it manually.`
        );
        console.warn(`Run: npx haber-cli add ${dep}`);
      }
    }
  }

  // Check package manager used in the project
  const packageManager = await detectPackageManager();

  // Install npm dependencies if needed
  if (dependencies.length > 0) {
    console.log(`Installing npm dependencies: ${dependencies.join(", ")}`);
    const installCmd = getInstallCommand(packageManager, dependencies, false);
    try {
      await execWithTimeout(installCmd, 180000);
      console.log(`✓ Installed npm dependencies`);
    } catch (error) {
      console.warn(error);
      console.warn(
        `⚠️ Failed to install npm dependencies. You may need to install them manually.`
      );
      console.warn(`The required dependencies are: ${dependencies.join(", ")}`);
    }
  }

  // Install dev dependencies if needed
  if (devDependencies.length > 0) {
    console.log(
      `Installing npm dev dependencies: ${devDependencies.join(", ")}`
    );
    const installCmd = getInstallCommand(packageManager, devDependencies, true);
    try {
      await execWithTimeout(installCmd, 180000);
      console.log(`✓ Installed npm dev dependencies`);
    } catch (error) {
      console.warn(error);
      console.warn(
        `⚠️ Failed to install npm dev dependencies. You may need to install them manually.`
      );
      console.warn(
        `The required dev dependencies are: ${devDependencies.join(", ")}`
      );
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

async function detectPackageManager(): Promise<"npm" | "yarn" | "pnpm"> {
  try {
    // Check for lock files to determine package manager
    const hasYarnLock = await fs.pathExists("yarn.lock");
    if (hasYarnLock) return "yarn";

    const hasPnpmLock = await fs.pathExists("pnpm-lock.yaml");
    if (hasPnpmLock) return "pnpm";

    return "npm";
  } catch (error) {
    console.warn(
      `⚠️ Failed to detect package manager. Defaulting to npm. Error: ${error}`
    );
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
