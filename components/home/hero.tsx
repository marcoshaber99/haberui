import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="w-full flex flex-col items-center px-4 py-8 sm:py-12">
      <Link
        href="/docs/components/thinking-state"
        className="mb-8 rounded-full bg-slate-600/70 text-white px-4 py-2 text-xs sm:text-sm hover:bg-slate-600/80 transition-colors"
      >
        Check out our newest component!
      </Link>
      <div className="relative flex flex-col items-center gap-4 text-center max-w-[800px]">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight">
            React Components
            <br />
            for AI Apps
          </h1>
          <p className="mx-auto max-w-[600px] text-base sm:text-lg md:text-xl text-muted-foreground/80">
            A collection of React components designed for building AI
            applications.
          </p>
        </div>
        <div className="mt-4 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Link href="/docs">
            <Button className="rounded-full w-full sm:w-auto">
              Get started →
            </Button>
          </Link>
          <a
            href="https://github.com/marcoshaber99/haberui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-sm transition-colors hover:text-muted-foreground"
          >
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
