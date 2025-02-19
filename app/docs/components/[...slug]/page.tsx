import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ComponentPage({ params, searchParams }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  if (!resolvedParams.slug || resolvedParams.slug.length === 0) notFound();

  const componentName = resolvedParams.slug[resolvedParams.slug.length - 1]
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          {componentName}
        </h1>
        <p className="text-zinc-400">
          A brief description of the {componentName} component.
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
          <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed border-zinc-800 bg-zinc-900/50 p-8 text-zinc-400">
            {componentName} Preview
          </div>
        </TabsContent>
        <TabsContent
          value="code"
          className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
        >
          <pre className="text-sm text-zinc-400 overflow-x-auto">
            <code className="text-[13px] md:text-sm whitespace-pre-wrap break-words">
              {`import { ${componentName} } from "@/components/ui/${resolvedParams.slug
                .join("-")
                .toLowerCase()}"

export default function Example() {
  return <${componentName} />
}`}
            </code>
          </pre>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Installation
        </h2>
        <pre className="rounded-lg bg-zinc-900/50 p-4 text-zinc-400 overflow-x-auto">
          <code className="text-[13px] md:text-sm whitespace-pre-wrap break-words">
            {`npx shadcn@latest add "https://haberui.vercel.app/h/${resolvedParams.slug
              .join("-")
              .toLowerCase()}.json"`}
          </code>
        </pre>
      </div>
    </div>
  );
}
