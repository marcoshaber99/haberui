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
        Quick guide to set up haber-ui in your project.
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Prerequisites</h2>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Node.js 14.6.0 or newer</li>
          <li>A package manager (npm, yarn, or pnpm)</li>
          <li>Next.js project with Tailwind CSS</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Installation Steps
        </h2>
        <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
          <li>
            <p>Set up shadcn/ui (if not already done):</p>
            <Tabs defaultValue="npm" className="mt-2">
              <TabsList>
                <TabsTrigger value="npm">npm</TabsTrigger>
                <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                <TabsTrigger value="yarn">yarn</TabsTrigger>
              </TabsList>
              <TabsContent value="npm">
                <CommandBox command="npx shadcn@latest init" />
              </TabsContent>
              <TabsContent value="pnpm">
                <CommandBox command="pnpm dlx shadcn@latest init" />
              </TabsContent>
              <TabsContent value="yarn">
                <CommandBox command="yarn dlx shadcn-ui@latest init" />
              </TabsContent>
            </Tabs>
          </li>
          <li>
            <p>Install haber-ui components:</p>
            <Tabs defaultValue="npm" className="mt-2">
              <TabsList>
                <TabsTrigger value="npm">npm</TabsTrigger>
                <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                <TabsTrigger value="yarn">yarn</TabsTrigger>
              </TabsList>
              <TabsContent value="npm">
                <CommandBox command="npx shadcn@latest add --from=https://your-vercel-deployment-url.vercel.app/h haber-button" />
              </TabsContent>
              <TabsContent value="pnpm">
                <CommandBox command="pnpm dlx shadcn@latest add --from=https://your-vercel-deployment-url.vercel.app/h haber-button" />
              </TabsContent>
              <TabsContent value="yarn">
                <CommandBox command="yarn dlx shadcn-ui@latest add --from=https://your-vercel-deployment-url.vercel.app/h haber-button" />
              </TabsContent>
            </Tabs>
          </li>
        </ol>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <p className="text-muted-foreground">
          Import and use haber-ui components in your React components:
        </p>
        <CodeBlock
          language="tsx"
          code={`import { HaberButton } from "@/components/ui/haber-button"

export default function MyComponent() {
  return <HaberButton>Click me</HaberButton>
}`}
        />
      </div>
    </div>
  );
}
