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
        <h2 className="text-2xl font-bold tracking-tight">Prerequisites</h2>
        <p className="text-muted-foreground">
          Before you install haber-ui, make sure you have the following:
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Node.js 14.6.0 or newer</li>
          <li>A Next.js project with Tailwind CSS</li>
          <li>shadcn/ui initialized in your project</li>
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
              <p>Set up shadcn/ui (if not already done)</p>
              <p className="mt-2">
                If you haven&apos;t initialized shadcn/ui in your project yet,
                run this command:
              </p>
              <CommandBox command="npx shadcn@latest init" />
            </div>
          </li>

          <li className="flex gap-2">
            <span>2.</span>
            <div className="flex-1">
              <p>Install haber-ui components</p>
              <p className="mt-2">
                Once shadcn/ui is ready, install haber-ui components:
              </p>
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

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Available Components
        </h2>
        <p className="text-muted-foreground">
          You can install any of these components:
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>
            <code>thinking-state</code> - A loading indicator for AI
            applications
          </li>
          <li>
            <code>ai-sentiment-analyzer</code> - A sentiment analysis component
          </li>
        </ul>
      </div>
    </div>
  );
}
