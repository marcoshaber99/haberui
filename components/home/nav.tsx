"use client";

import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function Nav() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <div className="mx-auto max-w-fit">
        <div className="flex items-center gap-4 sm:gap-6 rounded-full border-2 bg-background/75 px-4 sm:px-6 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <Image
              src="/logo.svg"
              alt="Logo"
              width={10}
              height={14}
              className="dark:invert-0 invert"
            />
            <span className="hidden sm:inline">haber-ui</span>
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
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
