import path from "path";
import fs from "fs-extra";
import { getConfig } from "./config";

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

  try {
    // For local development, read from the public/h directory
    const registryDir = path.join(process.cwd(), "public/h");
    const indexPath = path.join(registryDir, "index.json");

    if (await fs.pathExists(indexPath)) {
      const data = await fs.readJSON(indexPath);
      return data.components as Component[];
    }

    // If local file doesn't exist, we'll need to fetch from the registry URL
    // For now, we'll return an empty array as we haven't implemented remote fetching yet
    console.warn("Registry index file not found.");
    return [];
  } catch (error) {
    console.error("Error fetching components:", error);
    return [];
  }
}

export async function fetchComponent(name: string): Promise<Component | null> {
  const config = await getConfig();

  if (!config) {
    return null;
  }

  try {
    // For local development, read from the public/h directory
    const componentPath = path.join(process.cwd(), "public/h", `${name}.json`);

    if (await fs.pathExists(componentPath)) {
      const component = await fs.readJSON(componentPath);
      return component as Component;
    }

    console.warn(`Component ${name} not found.`);
    return null;
  } catch (error) {
    console.error(`Error fetching component ${name}:`, error);
    return null;
  }
}
