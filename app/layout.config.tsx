import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/marcoshaber99/haberui",
  nav: {
    title: (
      <span className="flex items-center gap-2">
        <Image src="/logo.svg" alt="haber-ui" width={12} height={12} />
        haber-ui
      </span>
    ),
  },
};
