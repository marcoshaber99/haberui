import path from "path";
import fs from "fs-extra";
import ora from "ora";
import chalk from "chalk";
import inquirer from "inquirer";
import { getConfig } from "../utils/config";
import { fetchComponent } from "../utils/registry";
import { installDependencies } from "../utils/dependencies";
import { getComponentDir } from "../utils/paths";

interface AddOptions {
  yes?: boolean;
  overwrite?: boolean;
}

export async function add(
  componentName: string | undefined,
  options: AddOptions
): Promise<void> {
  // Get project config
  const config = await getConfig();

  if (!config) {
    console.log(
      `${chalk.red("Error:")} Could not find a HaberUI configuration file.`,
      `\nRun ${chalk.green("haber init")} to create one.`
    );
    process.exit(1);
  }

  // If no component is specified, prompt user to select one
  if (!componentName) {
    const { selectedComponent } = await inquirer.prompt({
      type: "input",
      name: "selectedComponent",
      message: "Which component would you like to add?",
    });
    componentName = selectedComponent;
  }

  if (!componentName) {
    console.log(chalk.red("Error: No component specified."));
    process.exit(1);
  }

  const spinner = ora(
    `Adding ${chalk.cyan(componentName)} component...`
  ).start();

  try {
    // Fetch component from registry
    const component = await fetchComponent(componentName);

    if (!component) {
      spinner.fail(`Component ${chalk.cyan(componentName)} not found.`);
      process.exit(1);
    }

    // Create component directory if it doesn't exist
    const componentDir = getComponentDir(config);
    await fs.ensureDir(componentDir);

    // Check if component already exists
    const componentPath = path.join(componentDir, `${componentName}.tsx`);
    const componentExists = await fs.pathExists(componentPath);

    if (componentExists && !options.overwrite && !options.yes) {
      spinner.stop();
      const { overwrite } = await inquirer.prompt({
        type: "confirm",
        name: "overwrite",
        message: `Component ${chalk.cyan(
          componentName
        )} already exists. Overwrite?`,
        default: false,
      });

      if (!overwrite) {
        console.log(chalk.yellow("Installation canceled."));
        process.exit(0);
      }
    }

    // Write component file
    const componentFile = component.files.find(
      (f) => f.path === `${componentName}.tsx`
    );
    if (!componentFile) {
      spinner.fail(
        `Could not find main file for component ${chalk.cyan(componentName)}.`
      );
      process.exit(1);
    }

    await fs.writeFile(componentPath, componentFile.content);

    // Install dependencies if any
    if (
      component.dependencies?.length ||
      component.registryDependencies?.length
    ) {
      spinner.text = "Installing dependencies...";
      await installDependencies(component, config);
    }

    // Update tailwind config if needed
    if (component.tailwind && Object.keys(component.tailwind).length > 0) {
      spinner.text = "Updating Tailwind configuration...";
      // TODO: Implement tailwind config updating
    }

    spinner.succeed(`Added ${chalk.green(componentName)} component.`);

    // Format component name to PascalCase for import example
    const pascalCaseName = componentName
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");

    // Installation success tips
    console.log("\nYou can now import and use this component:");
    console.log(
      chalk.blue(
        `import { ${pascalCaseName} } from "${config.importPath}/${componentName}"`
      )
    );
  } catch (error) {
    spinner.fail(`Failed to add component ${chalk.cyan(componentName)}`);
    console.error(error);
    process.exit(1);
  }
}
