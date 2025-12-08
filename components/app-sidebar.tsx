"use client";

import * as React from "react";
import Link from "next/link";
import {
  UsersIcon,
  ConciergeBellIcon,
  ContactIcon,
  CircleDollarSignIcon,
  BookmarkCheckIcon,
  DoorClosedIcon
} from "lucide-react";
import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { SiApachepulsar } from "react-icons/si";
import { useRouter } from "next/navigation";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg"
  },
  navMain: [
    {
      title: "Lễ Tân",
      url: "/hotelreception",
      icon: ConciergeBellIcon
    },
    {
      title: "Khách Hàng",
      url: "/customers",
      icon: UsersIcon
    },
    {
      title: "Phòng Ở",
      url: "/rooms",
      icon: DoorClosedIcon
    },
    {
      title: "Đặt Phòng",
      url: "/bookings",
      icon: BookmarkCheckIcon
    },
    {
      title: "Nhân Viên",
      url: "/staff",
      icon: ContactIcon
    },
    {
      title: "Chi Tiết Giao Dịch",
      url: "/transactions",
      icon: CircleDollarSignIcon
    }
  ],
  navClouds: [],
  navSecondary: [],
  documents: []
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const handleSiderbarClick = (url: string) => {
    router.push(url);
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5 !gap-1">
              <Link href="/" className="flex items-center gap-2">
                <SiApachepulsar className="!w-10 !h-10 text-orange-400" />
                <div className="page-content text-2xl cursor-pointer">
                  <span className="text-orange-400">A</span>
                  <span className="">pache</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} onSidebarButtonClick={handleSiderbarClick} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
