import Link from "next/link";
import { Github } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="w-full flex flex-col items-center px-4 py-48">
      <Link
        href="/docs/components/ai-sentiment-analyzer"
        className="mb-8 rounded-full bg-green-600/70 text-white px-4 py-2 text-xs sm:px-6 sm:py-2.5 sm:text-sm hover:bg-blue-600/80 transition-colors"
      >
        Check out our newest component!
      </Link>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <div className="space-y-6">
          <h1 className="mx-auto max-w-[800px] text-center text-6xl font-serif font-medium tracking-tight md:text-7xl lg:text-8xl">
            Start building
            <br />
            your app now
          </h1>
          <p className="mx-auto max-w-[600px] text-center text-xl text-muted-foreground/80">
            An open source component library optimized for fast development,
            easy maintenance, and accessibility. Just import and go—no
            configuration required.
          </p>
        </div>
        <div className="mt-8 flex gap-6">
          <Link href="/docs">
            <Button size="lg" className="rounded-full">
              Get started →
            </Button>
          </Link>
          <a
            href="https://github.com/marcoshaber99/haberui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-muted-foreground"
          >
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
