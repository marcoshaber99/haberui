import path from "path";
import fs from "fs-extra";
import { CONFIG_FILE } from "./constants";

export interface Config {
  style: "tailwind" | "css";
  tailwind: boolean;
  componentDir: string;
  importPath: string;
  registry: string;
}

export async function getConfig(cwd = process.cwd()): Promise<Config | null> {
  const configPath = path.join(cwd, CONFIG_FILE);

  try {
    if (await fs.pathExists(configPath)) {
      const config = await fs.readJSON(configPath);
      return config as Config;
    }

    return null;
  } catch (error) {
    console.error("Error reading config:", error);
    return null;
  }
}

export async function updateConfig(
  updates: Partial<Config>,
  cwd = process.cwd()
): Promise<Config | null> {
  const configPath = path.join(cwd, CONFIG_FILE);

  try {
    const currentConfig = await getConfig(cwd);

    if (!currentConfig) {
      return null;
    }

    const updatedConfig = { ...currentConfig, ...updates };
    await fs.writeJSON(configPath, updatedConfig, { spaces: 2 });

    return updatedConfig;
  } catch (error) {
    console.error("Error updating config:", error);
    return null;
  }
}
