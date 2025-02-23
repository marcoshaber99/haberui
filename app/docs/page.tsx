export default function DocsPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
        Introduction
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Build beautiful, accessible interfaces with ease using{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          haber-ui
        </code>
        . This guide helps you install and use our components in your Next.js
        projects.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        What is haber-ui?
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          haber-ui
        </code>{" "}
        is a collection of ready-to-use React components styled with Tailwind
        CSS. Designed for accessibility and customization, these components let
        you create functional UIs quickly without sacrificing quality.
      </p>
    </div>
  );
}
