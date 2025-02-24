import path from "path";
import fs from "fs-extra";
import { getConfig } from "./config";
import chalk from "chalk";

// Add this at the top - we need to conditionally import 'node-fetch'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let fetch: any;

// Dynamically import node-fetch (prevents issues with ESM/CommonJS)
async function getFetch() {
  if (!fetch) {
    try {
      // Try requiring directly first
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      fetch = require("node-fetch");
    } catch (e) {
      console.error("Error importing node-fetch:", e);
      // If that fails, try dynamic import
      // eslint-disable-next-line @next/next/no-assign-module-variable
      const module = await import("node-fetch");
      fetch = module.default;
    }
  }
  return fetch;
}

export interface Component {
  name: string;
  version: string;
  description?: string;
  files: ComponentFile[];
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tailwind?: any;
}

export interface ComponentFile {
  path: string;
  content: string;
  type: string;
}

export async function getComponents(): Promise<Component[]> {
  const config = await getConfig();

  if (!config) {
    return [];
  }

  // Try local directory first (for development)
  const registryDir = path.join(process.cwd(), "public/h");
  const localIndexPath = path.join(registryDir, "index.json");

  if (await fs.pathExists(localIndexPath)) {
    try {
      const data = await fs.readJSON(localIndexPath);
      return data.components as Component[];
    } catch (error) {
      console.error("Error reading local index:", error);
    }
  }

  // If local file doesn't exist, fetch from registry URL
  try {
    const fetchFn = await getFetch();
    const registryUrl = `${config.registry}/index.json`;

    console.log(`Fetching components from ${chalk.cyan(registryUrl)}...`);

    const response = await fetchFn(registryUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch components: ${response.statusText}`);
    }

    const data = await response.json();
    return data.components as Component[];
  } catch (error) {
    console.error("Error fetching remote components:", error);
    return [];
  }
}

export async function fetchComponent(name: string): Promise<Component | null> {
  const config = await getConfig();

  if (!config) {
    return null;
  }

  // Try local file first (for development)
  const localComponentPath = path.join(
    process.cwd(),
    "public/h",
    `${name}.json`
  );

  if (await fs.pathExists(localComponentPath)) {
    try {
      const component = await fs.readJSON(localComponentPath);
      return component as Component;
    } catch (error) {
      console.error(`Error reading local component ${name}:`, error);
    }
  }

  // If local file doesn't exist, fetch from registry URL
  try {
    const fetchFn = await getFetch();
    const componentUrl = `${config.registry}/${name}.json`;

    const response = await fetchFn(componentUrl);

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Component ${name} not found at ${componentUrl}`);
        return null;
      }
      throw new Error(`Failed to fetch component: ${response.statusText}`);
    }

    const component = await response.json();
    return component as Component;
  } catch (error) {
    console.error(`Error fetching remote component ${name}:`, error);
    return null;
  }
}
