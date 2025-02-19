import { GradientBlob } from "@/components/haber-ui/gradient-blob";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommandBox } from "@/components/ui/command-box";
import { CodeBlock } from "@/components/ui/code-block";

export default function GradientBlobPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          GradientBlob
        </h1>
        <p className="text-lg text-muted-foreground">
          A beautiful gradient blob component with customizable size and color
          variants.
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
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Color Variants</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-lg border bg-muted/50 p-2">
                  <GradientBlob
                    variant="blue"
                    size="lg"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                  <div className="absolute inset-0 flex items-center justify-center font-medium">
                    Blue
                  </div>
                </div>
                <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-lg border bg-muted/50 p-2">
                  <GradientBlob
                    variant="purple"
                    size="lg"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                  <div className="absolute inset-0 flex items-center justify-center font-medium">
                    Purple
                  </div>
                </div>
                <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-lg border bg-muted/50 p-2">
                  <GradientBlob
                    variant="emerald"
                    size="lg"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                  <div className="absolute inset-0 flex items-center justify-center font-medium">
                    Emerald
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Size Variants</h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-lg border bg-muted/50 p-2">
                  <GradientBlob
                    size="sm"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                  <div className="absolute inset-0 flex items-center justify-center font-medium">
                    Small
                  </div>
                </div>
                <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-lg border bg-muted/50 p-2">
                  <GradientBlob
                    size="md"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                  <div className="absolute inset-0 flex items-center justify-center font-medium">
                    Medium
                  </div>
                </div>
                <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-lg border bg-muted/50 p-2">
                  <GradientBlob
                    size="lg"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                  <div className="absolute inset-0 flex items-center justify-center font-medium">
                    Large
                  </div>
                </div>
                <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-lg border bg-muted/50 p-2">
                  <GradientBlob
                    size="xl"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                  <div className="absolute inset-0 flex items-center justify-center font-medium">
                    Extra Large
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Animation</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-lg border bg-muted/50 p-2">
                  <GradientBlob
                    size="lg"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                  <div className="absolute inset-0 flex items-center justify-center font-medium">
                    Animated (Default)
                  </div>
                </div>
                <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-lg border bg-muted/50 p-2">
                  <GradientBlob
                    size="lg"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={false}
                  />
                  <div className="absolute inset-0 flex items-center justify-center font-medium">
                    Static
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="rounded-md border bg-muted p-6">
          <CodeBlock
            language="tsx"
            code={`import { GradientBlob } from "@/components/haber-ui/gradient-blob"

export default function Example() {
  return (
    <>
      {/* Color Variants */}
      <GradientBlob variant="blue" />
      <GradientBlob variant="purple" />
      <GradientBlob variant="emerald" />

      {/* Size Variants */}
      <GradientBlob size="sm" />
      <GradientBlob size="md" />
      <GradientBlob size="lg" />
      <GradientBlob size="xl" />

      {/* Animation Control */}
      <GradientBlob animate={true} />
      <GradientBlob animate={false} />
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
        <CommandBox command='npx shadcn@latest add "https://haberui.vercel.app/h/gradient-blob.json"' />
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
            : blue, purple, emerald
          </li>
          <li>
            <code className="rounded bg-muted px-1 py-0.5 text-sm">size</code>:
            sm, md, lg, xl
          </li>
          <li>
            <code className="rounded bg-muted px-1 py-0.5 text-sm">
              animate
            </code>
            : boolean - Enable/disable pulse animation (default: true)
          </li>
          <li>
            <code className="rounded bg-muted px-1 py-0.5 text-sm">
              className
            </code>
            : string - Additional CSS classes
          </li>
        </ul>
      </div>
    </div>
  );
}
