"use client";

import { BellIcon, PlusCircleIcon, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
  onSidebarButtonClick
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
  onSidebarButtonClick?: (url: string) => void;
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-orange-400/90 text-white hover:bg-orange-500/80 active:scale-95 
             transition-transform duration-300"
            >
              <PlusCircleIcon className="w-4 h-4" />
              <span>Tạo Đặt Phòng</span>
            </SidebarMenuButton>
            <Button size="icon" className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0" variant="outline">
              <BellIcon />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => onSidebarButtonClick?.(item.url)}
                  className={`
                    transition-all duration-200
                    ${isActive ? "!bg-orange-300/30  font-semibold shadow-md" : "hover:bg-orange-100"}
                
                  `}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
