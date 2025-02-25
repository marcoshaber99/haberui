import { CodeBlock } from "@/components/ui/code-block";
import { CommandBox } from "@/components/ui/command-box";
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
        <h2 className="text-2xl font-bold tracking-tight">
          Installation Steps
        </h2>
        <ol className="list-decimal list-inside space-y-8 text-muted-foreground">
          <li className="flex gap-2">
            <span>1.</span>
            <div className="flex-1">
              <p>Set up shadcn/ui (if not already done)</p>

              <CommandBox command="npx shadcn@latest init" />
            </div>
          </li>

          <li className="flex gap-2">
            <span>2.</span>
            <div className="flex-1">
              <p>Install haber-ui components</p>
              <CommandBox command='npx shadcn@latest add "https://haberui.com/h/thinking-state.json"' />
              <p className="mt-2">
                Replace with the specific component you want to install.
              </p>
            </div>
          </li>

          <li className="flex gap-2">
            <span>3.</span>
            <div className="flex-1">
              <p>Use the component in your application</p>
              <p className="mt-2">Import and use the component in your code:</p>
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
          </li>
        </ol>
      </div>
    </div>
  );
}
