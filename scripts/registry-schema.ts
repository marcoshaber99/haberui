export type RegistryType = "registry:ui";

/**
 * Represents a file in the registry
 */
export interface RegistryFile {
  path: string; // Relative path of the file
  content: string; // File contents
  type: RegistryType; // Type of registry entry
}

/**
 * Tailwind configuration for a component
 */
export interface TailwindConfig {
  config?: Record<string, object>;
}

/**
 * CSS variables for light/dark themes
 */
export interface CssVars {
  light: Record<string, string>;
  dark: Record<string, string>;
}

/**
 * Main schema for registry components
 */
export interface Schema {
  name: string; // The name of the component
  type: RegistryType; // The type of the registry entry
  version: string; // The version of the component (semver)
  description?: string; // Component description
  lastUpdated: string; // ISO timestamp of last modification
  registryDependencies?: string[]; // Dependencies on other registry components
  dependencies?: string[]; // Runtime dependencies
  devDependencies?: string[]; // Development dependencies
  tailwind?: TailwindConfig; // Tailwind configuration
  cssVars?: CssVars; // CSS variables for light/dark themes
  files: RegistryFile[]; // Files associated with the component
}
