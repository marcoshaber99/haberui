export type RegistryType = "registry:ui";

export interface RegistryFile {
  name: string;
  content: string;
  type: RegistryType;
}

export interface Schema {
  style: string;
  name: string;
  type: RegistryType;
  files: RegistryFile[];
  dependencies?: string[];
  registryDependencies?: string[];
}
