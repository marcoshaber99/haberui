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

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen overflow-hidden">
        <DocsSidebar />
        <SidebarInset className="flex min-w-0 w-full flex-col">
          <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 backdrop-blur">
            <div className="flex items-center gap-2 px-4 sm:px-6">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink
                      href="/docs"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Docs
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block text-muted-foreground/50" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-foreground truncate">
                      Components
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 sm:px-6 py-6 max-w-[90rem]">
              <div className="mx-auto w-full max-w-4xl pl-6">{children}</div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
