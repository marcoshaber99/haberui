import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import inquirer from "inquirer";
import { CONFIG_FILE } from "../utils/constants";

interface InitOptions {
  cwd?: string;
}

export async function init(options: InitOptions): Promise<void> {
  const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd();
  const configPath = path.join(cwd, CONFIG_FILE);

  // Check if config already exists
  const exists = await fs.pathExists(configPath);

  if (exists) {
    const { overwrite } = await inquirer.prompt({
      type: "confirm",
      name: "overwrite",
      message: `${CONFIG_FILE} already exists. Overwrite?`,
      default: false,
    });

    if (!overwrite) {
      console.log(chalk.yellow("Initialization canceled."));
      return;
    }
  }

  // Get configuration values from user
  const { style, tailwind, componentDir, importPath } = await inquirer.prompt([
    {
      type: "list",
      name: "style",
      message: "Which styling solution do you want to use?",
      choices: [
        { name: "Tailwind CSS", value: "tailwind" },
        { name: "CSS Modules", value: "css" },
      ],
      default: "tailwind",
    },
    {
      type: "confirm",
      name: "tailwind",
      message: "Would you like to use Tailwind CSS?",
      default: true,
      when: (answers) => answers.style === "tailwind",
    },
    {
      type: "input",
      name: "componentDir",
      message: "Where would you like to install the components?",
      default: "components/haber-ui",
    },
    {
      type: "input",
      name: "importPath",
      message: "What import alias would you like to use?",
      default: "@/components/haber-ui",
    },
  ]);

  // Create config file
  const config = {
    $schema: "https://haberui.com/schema.json",
    style: style || "tailwind",
    tailwind: tailwind !== false,
    componentDir,
    importPath,
    registry: "https://haberui.com/h",
  };

  await fs.writeJSON(configPath, config, { spaces: 2 });

  console.log(chalk.green(`✓ Created ${CONFIG_FILE} file.`));
  console.log(
    `You can now add components using: ${chalk.cyan("haber add <component>")}`
  );
}
