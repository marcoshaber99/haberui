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

export async function installDependencies(
  component: Component,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config: Config
): Promise<void> {
  const dependencies = component.dependencies || [];
  const devDependencies = component.devDependencies || [];

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
      throw new Error(
        `Failed to install npm dependencies. You may need to install them manually: ${dependencies.join(
          ", "
        )}`
      );
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
      throw new Error(
        `Failed to install npm dev dependencies. You may need to install them manually: ${devDependencies.join(
          ", "
        )}`
      );
    }
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
