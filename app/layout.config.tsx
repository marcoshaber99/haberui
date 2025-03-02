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
      <span className="flex  gap-[2px] ml-1">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={10}
          height={14}
          className="dark:invert-0 invert"
        />
        <span className="translate-y-[1.5px]">aber-ui</span>
      </span>
    ),
  },
};
