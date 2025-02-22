"use client";

import type * as React from "react";
import { DocsSidebar } from "@/components/docs-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const getBreadcrumbItems = () => {
    const items: React.ReactNode[] = [];
    let path = "";

    segments.forEach((segment, index) => {
      path += `/${segment}`;
      const isLast = index === segments.length - 1;
      const title =
        segment === "docs"
          ? "Docs"
          : segment === "components"
          ? "Components"
          : segment
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

      if (isLast) {
        items.push(
          <BreadcrumbItem key={path}>
            <BreadcrumbPage className="text-foreground truncate">
              {title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        );
      } else {
        items.push(
          <BreadcrumbItem key={path} className="hidden md:block">
            <BreadcrumbLink
              href={path}
              className="text-muted-foreground hover:text-foreground"
            >
              {title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
        items.push(
          <BreadcrumbSeparator
            key={`${path}-separator`}
            className="hidden md:block text-muted-foreground/50"
          />
        );
      }
    });

    return items;
  };

  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen overflow-hidden pl-2">
        <DocsSidebar />
        <SidebarInset className="flex min-w-0 w-full flex-col pt-4">
          <header className="sticky top-0 z-50 flex h-[60px] shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-full w-full items-center gap-2 px-4 md:px-8">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mx-2 h-5" />
              <Breadcrumb>
                <BreadcrumbList>{getBreadcrumbItems()}</BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <main className="flex-1">
            <div className="w-full px-4 py-8 md:px-8 md:py-12">{children}</div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
