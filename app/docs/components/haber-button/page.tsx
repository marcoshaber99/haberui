import { HaberButton } from "@/components/haber-ui/haber-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommandBox } from "@/components/ui/command-box";
import { CodeBlock } from "@/components/ui/code-block";

export default function ButtonPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          HaberButton
        </h1>
        <p className="text-lg text-muted-foreground">
          A specialized gradient button component with modern hover effects and
          dynamic shadows.
        </p>
      </div>

      <Tabs defaultValue="preview" className="relative mt-6 w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="preview"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Code
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="preview"
          className="space-y-6 rounded-md border p-6"
        >
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Gradient Variants</h3>
            <div className="flex flex-wrap gap-4">
              <HaberButton variant="default">Default</HaberButton>
              <HaberButton variant="royal">Royal</HaberButton>
              <HaberButton variant="emerald">Emerald</HaberButton>
              <HaberButton variant="sunset">Sunset</HaberButton>
              <HaberButton variant="cosmic">Cosmic</HaberButton>
              <HaberButton variant="ocean">Ocean</HaberButton>
              <HaberButton variant="obsidian">Obsidian</HaberButton>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <HaberButton size="sm">Small</HaberButton>
              <HaberButton>Default</HaberButton>
              <HaberButton size="lg">Large</HaberButton>
              <HaberButton size="xl">Extra Large</HaberButton>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="rounded-md border bg-muted p-6">
          <CodeBlock
            language="tsx"
            code={`import { HaberButton } from "@/components/haber-ui/haber-button"

export default function Example() {
  return (
    <>
      {/* Gradient Variants */}
      <HaberButton variant="default">Default</HaberButton>
      <HaberButton variant="royal">Royal</HaberButton>
      <HaberButton variant="emerald">Emerald</HaberButton>
      <HaberButton variant="sunset">Sunset</HaberButton>
      <HaberButton variant="cosmic">Cosmic</HaberButton>
      <HaberButton variant="ocean">Ocean</HaberButton>
      <HaberButton variant="obsidian">Obsidian</HaberButton>

      {/* Sizes */}
      <HaberButton size="sm">Small</HaberButton>
      <HaberButton>Default</HaberButton>
      <HaberButton size="lg">Large</HaberButton>
      <HaberButton size="xl">Extra Large</HaberButton>
    </>
  )
}`}
          />
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Installation
        </h2>
        <CommandBox command='npx shadcn@latest add "https://haberui.vercel.app/h/haber-button.json"' />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Props
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <code className="rounded bg-muted px-1 py-0.5 text-sm">
              variant
            </code>
            : default, royal, emerald, sunset, cosmic, ocean, obsidian
          </li>
          <li>
            <code className="rounded bg-muted px-1 py-0.5 text-sm">size</code>:
            sm, default, lg, xl
          </li>
          <li>
            <code className="rounded bg-muted px-1 py-0.5 text-sm">
              asChild
            </code>
            : boolean
          </li>
        </ul>
      </div>
    </div>
  );
}
