import chalk from "chalk";
import ora from "ora";
import { getComponents } from "../utils/registry";

export async function list(): Promise<void> {
  const spinner = ora("Fetching components...").start();

  try {
    const components = await getComponents();

    if (!components || components.length === 0) {
      spinner.info("No components found.");
      return;
    }

    spinner.succeed(`Found ${components.length} components`);

    console.log("\nAvailable components:");

    components.forEach((component) => {
      console.log(
        `${chalk.green("•")} ${chalk.bold(component.name)} ${chalk.dim(
          `v${component.version}`
        )}`
      );
      if (component.description) {
        console.log(`  ${component.description}`);
      }
    });

    console.log(
      `\nRun ${chalk.cyan(
        "haber add <component>"
      )} to add a component to your project.`
    );
  } catch (error) {
    spinner.fail("Failed to fetch components");
    console.error(error);
  }
}
