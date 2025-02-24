// app/docs/installation/page.tsx
import { CommandBox } from "@/components/ui/command-box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";

export default function InstallationPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
        Installation
      </h1>
      <p className="text-xl text-muted-foreground">
        A quick guide to set up haber-ui in your Next.js project.
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Prerequisites</h2>
        <p className="text-muted-foreground">
          Before you install haber-ui, make sure you have the following:
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>
            Node.js 14.6.0 or newer: Required to run the installation commands
            and use the components.
          </li>
          <li>
            A package manager: Use npm, pnpm, or yarn—whichever you prefer.
          </li>
          <li>
            A Next.js project with Tailwind CSS: haber-ui is built for Next.js
            and relies on Tailwind CSS for styling.
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Installation Steps
        </h2>
        <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
          <li className="flex gap-2">
            <span>1.</span>
            <div className="flex-1">
              <p>Install the HaberUI CLI</p>
              <p className="mt-2">First, install the HaberUI CLI globally:</p>
              <Tabs defaultValue="npm" className="mt-2">
                <TabsList>
                  <TabsTrigger value="npm">npm</TabsTrigger>
                  <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                  <TabsTrigger value="yarn">yarn</TabsTrigger>
                </TabsList>
                <TabsContent value="npm">
                  <CommandBox command="npm install -g haber-cli" />
                </TabsContent>
                <TabsContent value="pnpm">
                  <CommandBox command="pnpm add -g haber-cli" />
                </TabsContent>
                <TabsContent value="yarn">
                  <CommandBox command="yarn global add haber-cli" />
                </TabsContent>
              </Tabs>
              <p className="mt-2">
                Alternatively, you can use npx to run the CLI without installing
                it:
              </p>
              <CommandBox command="npx haber-cli" />
            </div>
          </li>

          <li className="flex gap-2">
            <span>2.</span>
            <div className="flex-1">
              <p>Initialize HaberUI in your project</p>
              <p className="mt-2">Set up the configuration for your project:</p>
              <CommandBox command="haber init" />
              <p className="mt-2">
                This will ask you a few questions and create a haber.json file
                in your project.
              </p>
            </div>
          </li>

          <li className="flex gap-2">
            <span>3.</span>
            <div className="flex-1">
              <p>Install HaberUI components</p>
              <p className="mt-2">List available components:</p>
              <CommandBox command="haber list" />
              <p className="mt-2">Install a specific component:</p>
              <CommandBox command="haber add thinking-state" />
              <p className="mt-2">
                The component will be installed to your project and any
                dependencies will be automatically added.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Using Components</h2>
        <p className="text-muted-foreground">
          After installation, you can import and use the components in your
          project:
        </p>
        <CodeBlock
          language="tsx"
          code={`import { ThinkingState } from "@/components/haber-ui/thinking-state";

export default function MyComponent() {
  return (
    <ThinkingState 
      variant="pulse" 
      messages={["Processing data...", "Almost done..."]} 
    />
  );
}`}
        />
      </div>
    </div>
  );
}
