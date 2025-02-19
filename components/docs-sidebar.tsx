"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
          title: "HaberButton",
          href: "/docs/components/haber-button",
          badge: "new",
        },
        { title: "HaberCard", href: "/docs/components/haber-card" },
      ],
    },
  ],
};

// Helper component for the navigation content
function NavigationContent({ pathname }: { pathname: string }) {
  return (
    <>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">haber-ui</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Main Navigation */}
        {navigation.main.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <span className="font-medium">{section.title}</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {section.items.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === item.href}
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
          <SidebarGroup key={section.title}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <span className="font-medium">{section.title}</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {section.items.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === item.href}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center justify-between"
                        >
                          {item.title}
                          {item.badge && (
                            <Badge
                              variant={
                                item.badge === "new" ? "default" : "secondary"
                              }
                              className="bg-emerald-500/20 text-emerald-400"
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
      <Sidebar className="hidden md:flex">
        <NavigationContent pathname={pathname} />
      </Sidebar>

      {/* Mobile Sheet */}
      <Sheet>
        <SheetTrigger className="md:hidden">
          <span className="sr-only">Open navigation menu</span>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <NavigationContent pathname={pathname} />
        </SheetContent>
      </Sheet>
    </>
  );
}
