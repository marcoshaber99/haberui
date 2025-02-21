import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-24 px-4">
      <div className="relative flex flex-col items-center gap-4 text-center">
        <div className="space-y-6">
          <h1 className="mx-auto max-w-[800px] bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl">
            Modern UI components for AI-powered apps
          </h1>
          <p className="mx-auto max-w-[600px] text-center text-lg text-muted-foreground">
            A collection of elegant React components designed for modern
            applications. From simple UI elements to AI-ready interfaces.
          </p>
        </div>
        <div className="mt-6 flex gap-6">
          <Link href="/docs">
            <Button>View Components</Button>
          </Link>
          <a
            href="https://github.com/marcoshaber99/haberui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-colors"
          >
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
