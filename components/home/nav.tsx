import Link from "next/link";
import { Github } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function Nav() {
  return (
    <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
      <div className="flex items-center gap-6 rounded-full border bg-background/95 px-6 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link href="/" className="text-sm font-semibold">
          haber-ui
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/docs"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Documentation
          </Link>
          <Link
            href="/components"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Components
          </Link>
          <div className="flex items-center gap-4 pl-4">
            <a
              href="https://github.com/marcoshaber99/haberui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </a>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}
