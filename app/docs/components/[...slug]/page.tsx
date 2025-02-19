import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ComponentPageProps {
  params: {
    slug: string[];
  };
}

export default function ComponentPage({ params }: ComponentPageProps) {
  // This would normally fetch your component documentation
  // For now we'll just show a basic layout
  if (!params.slug) notFound();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          {params.slug[params.slug.length - 1]
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h1>
        <p className="text-zinc-400">
          A description of the {params.slug[params.slug.length - 1]} component.
        </p>
      </div>

      <Tabs defaultValue="preview" className="relative w-full">
        <TabsList className="w-full justify-start rounded-none border-b border-zinc-800 bg-transparent p-0">
          <TabsTrigger
            value="preview"
            className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-zinc-400 shadow-none transition-none data-[state=active]:border-b-emerald-500 data-[state=active]:text-zinc-50"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-zinc-400 shadow-none transition-none data-[state=active]:border-b-emerald-500 data-[state=active]:text-zinc-50"
          >
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="preview"
          className="rounded-lg border border-zinc-800 p-6"
        >
          {/* Component preview would go here */}
          <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed border-zinc-800 bg-zinc-900/50 p-8 text-zinc-400">
            Component Preview
          </div>
        </TabsContent>
        <TabsContent
          value="code"
          className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
        >
          <pre className="text-sm text-zinc-400">
            {`// Component code would go here
export default function Component() {
  return (
    <div>Component</div>
  )
}`}
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  );
}
