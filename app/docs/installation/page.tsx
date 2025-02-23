import { CommandBox } from "@/components/ui/command-box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <li>
            shadcn-ui: Your project needs shadcn-ui installed and initialized,
            as haber-ui components depend on it.
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
              <p>Set up shadcn-ui (if not already done)</p>
              <p className="mt-2">
                If you haven&apos;t initialized shadcn-ui in your project yet,
                run this command:
              </p>
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
              <p className="mt-2">
                This sets up the necessary configuration for shadcn-ui in your
                Next.js project.
              </p>
            </div>
          </li>
          <li className="flex gap-2">
            <span>2.</span>
            <div className="flex-1">
              <p>Install haber-ui components</p>
              <p className="mt-2">
                Once shadcn-ui is ready, install haber-ui components like this:
              </p>
              <Tabs defaultValue="npm" className="mt-2">
                <TabsList>
                  <TabsTrigger value="npm">npm</TabsTrigger>
                  <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                  <TabsTrigger value="yarn">yarn</TabsTrigger>
                </TabsList>
                <TabsContent value="npm">
                  <CommandBox command='npx shadcn@latest add "https://haberui.com/h/ai-sentiment-analyzer.json"' />
                </TabsContent>
                <TabsContent value="pnpm">
                  <CommandBox command='pnpm dlx shadcn@latest add "https://haberui.com/h/ai-sentiment-analyzer.json"' />
                </TabsContent>
                <TabsContent value="yarn">
                  <CommandBox command='yarn dlx shadcn-ui@latest add "https://haberui.com/h/ai-sentiment-analyzer.json"' />
                </TabsContent>
              </Tabs>
              <p className="mt-2">
                Replace the URL with the specific component you want to install.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
