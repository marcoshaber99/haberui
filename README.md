<div align="center">
  <img src="public/logo.svg" alt="haber-ui logo" width="100" height="100" />
</div>

# haber-ui

A collection of React components built with Tailwind CSS and shadcn/ui.

## Prerequisites

- Node.js 14.6.0 or newer
- Next.js project with Tailwind CSS
- Package manager (npm, pnpm, or yarn)

## Installation

1. Set up shadcn/ui in your project:

```bash
npx shadcn@latest init
```

2. Install components:

```shellscript
npx shadcn@latest add --from=https://haber-ui.vercel.app/h haber-button
```

## Usage

```typescriptreact
import { HaberButton } from "@/components/ui/haber-button"

export default function App() {
  return <HaberButton>Click me</HaberButton>
}
```

## Available Components

- `HaberButton` - Enhanced button component with gradient variant

## Documentation

Visit [https://haber-ui.vercel.app](https://haber-ui.vercel.app) for detailed documentation and examples.

## License

MIT
