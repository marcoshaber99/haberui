import Link from "next/link";
import { Github } from "lucide-react";
import { HaberButton } from "@/components/haber-button";

export function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-24 px-4">
      <div className="relative flex flex-col items-center gap-4 text-center">
        <div className="space-y-6">
          <h1 className="mx-auto max-w-[800px] bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl">
            Build faster with beautiful components
          </h1>
          <p className="mx-auto max-w-[600px] text-center text-lg text-muted-foreground">
            Premium UI components built with React and Tailwind CSS. Save time
            and ship your next project faster.
          </p>
        </div>
        <div className="mt-6 flex gap-6">
          <Link href="/docs">
            <HaberButton size="lg" variant="gradient">
              Browse components
            </HaberButton>
          </Link>
          <a
            href="https://github.com/marcoshaber99/haberui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
