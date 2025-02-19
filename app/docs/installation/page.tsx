import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function InstallationPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
        Installation
      </h1>
      <p className="text-xl text-muted-foreground">
        How to install and set up haber-ui in your project.
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Prerequisites</h2>
        <p>Before you start, make sure you have the following installed:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Node.js 14.6.0 or newer</li>
          <li>A Next.js project set up with Tailwind CSS</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Setting up shadcn/ui
        </h2>
        <p>
          haber-ui is built on top of shadcn/ui. If you haven&apos;t already set
          up shadcn/ui in your project, follow these steps:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Run the shadcn/ui init command:</li>
          <pre className="bg-zinc-950 p-4 rounded-md overflow-x-auto">
            <code className="text-sm text-zinc-100">
              npx shadcn@latest init
            </code>
          </pre>
          <li>Follow the prompts to set up your project</li>
        </ol>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Installing haber-ui components
        </h2>
        <p>
          To install haber-ui components, you&apos;ll use the shadcn CLI with
          our custom registry. Here&apos;s how to install the HaberButton
          component:
        </p>
        <Tabs defaultValue="npm" className="w-full">
          <TabsList>
            <TabsTrigger value="npm">npm</TabsTrigger>
            <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            <TabsTrigger value="yarn">yarn</TabsTrigger>
          </TabsList>
          <TabsContent value="npm">
            <pre className="bg-zinc-950 p-4 rounded-md overflow-x-auto">
              <code className="text-sm text-zinc-100">
                npx shadcn@latest add
                https://raw.githubusercontent.com/yourusername/haber-ui/main/registry/haber-button.json
              </code>
            </pre>
          </TabsContent>
          <TabsContent value="pnpm">
            <pre className="bg-zinc-950 p-4 rounded-md overflow-x-auto">
              <code className="text-sm text-zinc-100">
                pnpm dlx shadcn@latest add
                https://raw.githubusercontent.com/yourusername/haber-ui/main/registry/haber-button.json
              </code>
            </pre>
          </TabsContent>
          <TabsContent value="yarn">
            <pre className="bg-zinc-950 p-4 rounded-md overflow-x-auto">
              <code className="text-sm text-zinc-100">
                yarn dlx shadcn-ui@latest add
                https://raw.githubusercontent.com/yourusername/haber-ui/main/registry/haber-button.json
              </code>
            </pre>
          </TabsContent>
        </Tabs>
        <p>
          This will install the HaberButton component and its dependencies in
          your project.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <p>
          Now that you have installed haber-ui, you can start exploring and
          using the various components in your project. Check out the individual
          component documentation for more details on usage and customization
          options.
        </p>
      </div>
    </div>
  );
}
