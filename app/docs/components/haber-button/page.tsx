import { HaberButton } from "@/components/haber-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ButtonPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          HaberButton
        </h1>
        <p className="text-lg text-muted-foreground">
          A versatile button component with multiple variants and sizes.
        </p>
      </div>

      <Tabs defaultValue="preview" className="relative mt-6 w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="preview"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="rounded-md border p-6">
          <div className="flex flex-wrap gap-4">
            <HaberButton>Default</HaberButton>
            <HaberButton variant="destructive">Destructive</HaberButton>
            <HaberButton variant="outline">Outline</HaberButton>
            <HaberButton variant="secondary">Secondary</HaberButton>
            <HaberButton variant="ghost">Ghost</HaberButton>
            <HaberButton variant="link">Link</HaberButton>
            <HaberButton variant="gradient">Gradient</HaberButton>
          </div>
        </TabsContent>
        <TabsContent value="code" className="rounded-md border bg-muted/50 p-6">
          <pre className="text-sm">
            {`import { HaberButton } from "@/components/haber-button"

export default function Example() {
  return (
    <HaberButton>Default</HaberButton>
    <HaberButton variant="destructive">Destructive</HaberButton>
    <HaberButton variant="outline">Outline</HaberButton>
    <HaberButton variant="secondary">Secondary</HaberButton>
    <HaberButton variant="ghost">Ghost</HaberButton>
    <HaberButton variant="link">Link</HaberButton>
    <HaberButton variant="gradient">Gradient</HaberButton>
  )
}`}
          </pre>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Installation
        </h2>
        <p className="text-muted-foreground">
          Install the component using the shadcn CLI:
        </p>
        <pre className="rounded-lg bg-muted p-4">
          npx shadcn@latest add https://your-url/registry/haber-button.json
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <p className="text-muted-foreground">
          Import and use the HaberButton component in your React application:
        </p>
        <pre className="rounded-lg bg-muted p-4">
          {`import { HaberButton } from "@/components/haber-button"

export default function MyComponent() {
  return <HaberButton>Click me</HaberButton>
}`}
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Props
        </h2>
        <p className="text-muted-foreground">
          The HaberButton component accepts the following props:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code className="text-sm bg-muted px-1 py-0.5 rounded">
              variant
            </code>
            : Defines the button&apos;s visual style (default, destructive,
            outline, secondary, ghost, link, gradient)
          </li>
          <li>
            <code className="text-sm bg-muted px-1 py-0.5 rounded">size</code>:
            Sets the button&apos;s size (default, sm, lg, icon)
          </li>
          <li>
            <code className="text-sm bg-muted px-1 py-0.5 rounded">
              asChild
            </code>
            : Boolean to render the button as a child component
          </li>
        </ul>
      </div>
    </div>
  );
}
