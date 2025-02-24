#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";

// Import our commands
import { add } from "./commands/add";
import { init } from "./commands/init";
import { list } from "./commands/list";

const program = new Command();

console.log(chalk.bold("\n🔷 HaberUI CLI\n"));

program
  .name("haber")
  .description("CLI to add HaberUI components to your project")
  .version("0.1.0");

program
  .command("add")
  .description("Add a component to your project")
  .argument("[component]", "component to add")
  .option("-y, --yes", "skip confirmation prompt", false)
  .option("-o, --overwrite", "overwrite existing component", false)
  .action(add);

program
  .command("init")
  .description("Initialize HaberUI configuration")
  .option("--cwd <cwd>", "the working directory")
  .action(init);

program
  .command("list")
  .description("List all available components")
  .action(list);

program.parse();
