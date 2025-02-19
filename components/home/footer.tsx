import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function Footer() {
  return (
    <footer className="bg-background/50 py-6 backdrop-blur supports-[backdrop-filter]:bg-background/30">
      <div className="mx-auto max-w-fit">
        <div className="flex items-center gap-6 bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1">
              <Link href="/" className="text-sm font-medium">
                © 2025 haber-ui
              </Link>
              <span className="text-xs text-muted-foreground">
                By Marco Haber
              </span>
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
