# haber-ui

![haber-ui](public/og.png)

Modern React components for modern AI applications. Built with Tailwind CSS.

Visit the [documentation](https://www.haberui.com/docs/installation) for more information.

## Install

```bash
# Install the CLI
npm install -g haber-cli

# Initialize in your project
haber init

# Add components
haber add thinking-state
```

## Using components with shadcn/ui dependencies

Some HaberUI components are built on top of shadcn/ui components. When you install these components, the CLI will automatically install the required shadcn/ui components.

If you haven't set up shadcn/ui yet, you may need to initialize it first:

```bash
npx shadcn@latest init
```

This only needs to be done once in your project.

## Available Components

- **ThinkingState**: A beautiful loading indicator with customizable messages and animations
- **AISentimentAnalyzer**: A flexible sentiment analysis component that works with any backend service

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT License
