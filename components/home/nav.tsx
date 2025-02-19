"use client";

import Link from "next/link";
import { Github } from "lucide-react";

export function Nav() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <div className="mx-auto max-w-fit">
        <div className="flex items-center gap-6 rounded-full border-2 bg-background/75 px-6 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Link href="/" className="text-sm font-semibold">
            haber-ui
          </Link>
          <p className="text-muted-foreground transition-colors hover:text-foreground text-sm">
            <Link href="/docs">Docs</Link>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/marcoshaber99/haberui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
