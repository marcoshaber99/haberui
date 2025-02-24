import path from "path";
import fs from "fs-extra";
import ora from "ora";
import chalk from "chalk";
import inquirer from "inquirer";
import { exec } from "child_process";
import { promisify } from "util";
import { getConfig } from "../utils/config";
import { fetchComponent } from "../utils/registry";
import { installDependencies } from "../utils/dependencies";
import { getComponentDir } from "../utils/paths";

const execAsync = promisify(exec);

interface AddOptions {
  yes?: boolean;
  overwrite?: boolean;
}

// Function to check if a component is from shadcn
function isShadcnComponent(name: string): boolean {
  // List of common shadcn components
  const shadcnComponents = [
    "accordion",
    "alert",
    "alert-dialog",
    "aspect-ratio",
    "avatar",
    "badge",
    "button",
    "calendar",
    "card",
    "checkbox",
    "collapsible",
    "combobox",
    "command",
    "context-menu",
    "dialog",
    "dropdown-menu",
    "form",
    "hover-card",
    "input",
    "label",
    "menubar",
    "navigation-menu",
    "popover",
    "progress",
    "radio-group",
    "scroll-area",
    "select",
    "separator",
    "sheet",
    "skeleton",
    "slider",
    "switch",
    "table",
    "tabs",
    "textarea",
    "toast",
    "toggle",
    "tooltip",
  ];

  return shadcnComponents.includes(name);
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

  let spinner = ora(`Adding ${chalk.cyan(componentName)} component...`).start();

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

      spinner = ora(`Adding ${chalk.cyan(componentName)} component...`).start();
    }

    // Handle shadcn dependencies interactively if any
    if (component.registryDependencies?.length) {
      const shadcnDeps = component.registryDependencies.filter((dep) =>
        isShadcnComponent(dep)
      );

      if (shadcnDeps.length > 0) {
        spinner.stop(); // Stop the spinner to show interactive prompts

        const hasShadcn = await fs.pathExists("components.json");
        if (!hasShadcn) {
          console.log(
            chalk.yellow(
              "\nThis component requires shadcn/ui components, but shadcn/ui is not initialized."
            )
          );
          console.log("You'll need to initialize shadcn/ui first:");
          console.log(chalk.cyan("\nnpx shadcn@latest init\n"));

          const { initShadcn } = await inquirer.prompt({
            type: "confirm",
            name: "initShadcn",
            message: "Would you like to initialize shadcn/ui now?",
            default: true,
          });

          if (initShadcn) {
            console.log(chalk.green("\nRunning shadcn initialization..."));
            try {
              const { stdout, stderr } = await execAsync(
                "npx shadcn@latest init"
              );
              console.log(stdout);
              if (stderr) console.error(stderr);
            } catch (error) {
              console.error(
                chalk.red("Failed to initialize shadcn/ui:"),
                error
              );
              console.log(
                chalk.yellow(
                  "Please try to initialize it manually and then run this command again."
                )
              );
              process.exit(1);
            }
          } else {
            console.log(
              chalk.yellow(
                "\nSkipping shadcn/ui initialization. Some components may not work properly."
              )
            );
          }
        }

        console.log(
          chalk.yellow(
            "\nThis component requires the following shadcn/ui components:"
          )
        );
        shadcnDeps.forEach((dep) => {
          console.log(`  - ${chalk.cyan(dep)}`);
        });

        const { installShadcnDeps } = await inquirer.prompt({
          type: "confirm",
          name: "installShadcnDeps",
          message: "Would you like to install these shadcn/ui components now?",
          default: true,
        });

        if (installShadcnDeps) {
          for (const dep of shadcnDeps) {
            console.log(chalk.green(`\nInstalling ${dep}...`));
            try {
              const { stdout, stderr } = await execAsync(
                `npx shadcn@latest add ${dep}`
              );
              console.log(stdout);
              if (stderr) console.error(stderr);
            } catch (error) {
              console.error(chalk.red(`Failed to install ${dep}:`), error);
              console.log(
                chalk.yellow(
                  `You can install it manually later with: npx shadcn@latest add ${dep}`
                )
              );
            }
          }
        } else {
          console.log(
            chalk.yellow("\nSkipping shadcn/ui components installation.")
          );
          console.log("You can install them later with these commands:");
          shadcnDeps.forEach((dep) => {
            console.log(chalk.cyan(`  npx shadcn@latest add ${dep}`));
          });
        }

        // Restart the spinner for the next operation
        spinner = ora(
          `Adding ${chalk.cyan(componentName)} component...`
        ).start();
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

    // Install regular npm dependencies if any
    if (component.dependencies?.length || component.devDependencies?.length) {
      spinner.text = "Installing npm dependencies...";
      try {
        await installDependencies(component, config);
      } catch (error) {
        console.error(error);
        spinner.warn("Some npm dependencies failed to install automatically.");
        console.warn(
          `You may need to install them manually: ${component.dependencies?.join(
            ", "
          )}`
        );
      }
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
