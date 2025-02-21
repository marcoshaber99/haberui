"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";

// Navigation data remains the same
const navigation = {
  main: [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs" },
        { title: "Installation", href: "/docs/installation" },
      ],
    },
  ],
  components: [
    {
      title: "Components",
      items: [
        {
          title: "Sentiment",
          href: "/docs/components/ai-sentiment-analyzer",
          badge: "new",
        },
      ],
    },
  ],
};

// Helper component for the navigation content
function NavigationContent({ pathname }: { pathname: string }) {
  return (
    <>
      <SidebarHeader className="border-b px-6 py-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex items-center gap-3 px-2">
                <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/90 to-purple-600/90 ring-1 ring-blue-500/20">
                  <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={15}
                    height={15}
                    priority
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold tracking-tight text-xl">
                    haber-ui
                  </p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-4 py-4">
        {/* Main Navigation */}
        {navigation.main.map((section) => (
          <SidebarGroup key={section.title} className="pb-6">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <p className="mb-2 px-4 font-medium text-muted-foreground">
                    {section.title}
                  </p>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {section.items.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === item.href}
                        className="w-full rounded-md px-4 py-2 text-sm hover:bg-accent"
                      >
                        <Link href={item.href}>{item.title}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        ))}

        {/* Components Navigation */}
        {navigation.components.map((section) => (
          <SidebarGroup key={section.title} className="pb-6">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <p className="mb-2 px-4 text-lg font-medium text-muted-foreground">
                    {section.title}
                  </p>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {section.items.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === item.href}
                        className="w-full rounded-md px-4 py-3 text-sm hover:bg-accent flex items-center justify-between gap-2"
                      >
                        <Link
                          href={item.href}
                          className="flex items-center justify-between w-full"
                        >
                          <span className="truncate">{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant={
                                item.badge === "new" ? "default" : "secondary"
                              }
                              className="ml-2 h-5 px-1.5 border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 
                                       border-emerald-500/20 dark:border-emerald-400/30
                                       shadow-[0_0_10px_rgba(16,185,129,0.1)]
                                       dark:shadow-[0_0_10px_rgba(52,211,153,0.2)]
                                       dark:bg-emerald-400/10"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        ))}

        <div className="mt-auto border-t px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Switch theme</p>
            <ModeToggle />
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex md:w-[280px] shrink-0">
        <NavigationContent pathname={pathname} />
      </Sidebar>

      {/* Mobile Sheet */}
      <Sheet>
        <SheetTrigger className="md:hidden">
          <span className="sr-only">Open navigation menu</span>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0 overflow-y-auto">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <NavigationContent pathname={pathname} />
        </SheetContent>
      </Sheet>
    </>
  );
}
