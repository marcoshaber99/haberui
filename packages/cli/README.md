# HaberUI CLI

A command-line interface for adding HaberUI components to your React projects.

## Installation

```bash
# Using npm
npm install -g haber-cli

# Using yarn
yarn global add haber-cli

# Using pnpm
pnpm add -g haber-cli
```

Or use without installing globally:

```bash
npx haber-cli <command>
```

## Usage

### Initialize a project

Set up HaberUI configuration in your project:

```bash
haber init
```

This creates a haber.json file with your preferences for component installation.

### List available components

View all components available for installation:

```bash
haber list
```

### Add a component

Install a specific component:

```bash
haber add <component-name>
```

For example:

```bash
haber add thinking-state
```

## Commands

| Command                 | Description                      |
| ----------------------- | -------------------------------- |
| `haber init`            | Initialize HaberUI configuration |
| `haber list`            | List all available components    |
| `haber add <component>` | Add a component to your project  |

## Configuration

The `haber.json` file contains your project configuration:

```json
{
  "$schema": "https://haberui.com/h/schema.json",
  "style": "tailwind",
  "tailwind": true,
  "componentDir": "components/haber-ui",
  "importPath": "@/components/haber-ui",
  "registry": "https://haberui.com/h"
}
```

| Option         | Description                        |
| -------------- | ---------------------------------- |
| `style`        | Styling solution (tailwind or css) |
| `tailwind`     | Whether to use Tailwind CSS        |
| `componentDir` | Where components will be installed |
| `importPath`   | Import alias for components        |
| `registry`     | Component registry URL             |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
