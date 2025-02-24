import path from "path";
import { Config } from "./config";

export function getComponentDir(config: Config, cwd = process.cwd()): string {
  return path.join(cwd, config.componentDir);
}
