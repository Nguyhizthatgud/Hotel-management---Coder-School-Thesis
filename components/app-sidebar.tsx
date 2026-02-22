"use client";

import * as React from "react";
import Link from "next/link";
import {
  ConciergeBellIcon,
  ContactIcon,
  CircleDollarSignIcon,
  BookmarkCheckIcon,
  DoorClosedIcon,
  Wrench
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
import { useAuthStore } from "@/stores/useAuthStore";
import { useUISlice } from "@/stores/UI/useUIStore";
import { useTranslation } from "react-i18next";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const router = useRouter();
  const handleSiderbarClick = (url: string) => {
    router.push(url);
  };
  const user = useAuthStore((state) => state.user);
  const setIsCreateBooking = useUISlice((state) => state.setIsCreateBooking);

  const data = React.useMemo(
    () => ({
      navMain: [
        {
          title: t("sidebar_dashboard"),
          url: "/hotelreception",
          icon: ConciergeBellIcon
        },
        {
          title: t("sidebar_rooms"),
          url: "/hotelreception/rooms",
          icon: DoorClosedIcon
        },
        {
          title: t("sidebar_bookings"),
          url: "/hotelreception/bookings",
          icon: BookmarkCheckIcon
        },
        {
          title: t("sidebar_maintenances"),
          url: "/hotelreception/maintenance",
          icon: Wrench
        },
        {
          title: t("sidebar_staff"),
          url: "/hotelreception/staff",
          icon: ContactIcon
        },
        {
          title: t("sidebar_transaction"),
          url: "/hotelreception/transactions",
          icon: CircleDollarSignIcon
        }
      ],
      navClouds: [],
      navSecondary: [],
      documents: []
    }),
    [t]
  );

  const navUser = React.useMemo(
    () => ({
      name: user?.displayName || "Khách",
      email: user?.email || "guest@example.com",
      avatar: user?.photoURL || ""
    }),
    [user]
  );

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5! gap-0!">
              <Link href="/" className="flex items-center">
                <svg width={40} height={40} viewBox="0 0 48 48" fill="none">
                  <defs>
                    <linearGradient id="apacheGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#DA7523" />
                      <stop offset="100%" stopColor="#D1AE3C" />
                    </linearGradient>
                  </defs>
                  {/* Feather shape */}
                  <path
                    d="M24 4C24 4 18 8 16 14C14 20 14 28 14 32C14 36 16 42 24 44C32 42 34 36 34 32C34 28 34 20 32 14C30 8 24 4 24 4Z"
                    fill="url(#apacheGradient1)"
                  />
                  {/* Feather details */}
                  <path
                    d="M24 8L20 16M24 8L28 16M24 12L22 20M24 12L26 20M24 16L23 24M24 16L25 24"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  {/* Building outline at bottom */}
                  <rect x="18" y="32" width="12" height="10" fill="white" opacity="0.3" rx="1" />
                  <rect x="20" y="34" width="2" height="3" fill="#DC2626" />
                  <rect x="23" y="34" width="2" height="3" fill="#DC2626" />
                  <rect x="26" y="34" width="2" height="3" fill="#DC2626" />
                </svg>
                <div className=" flex text-xl md:text-xl cursor-pointer mr-7">
                  {" "}
                  <div className="page-content leading-none">
                    <span className="text-orange-400">A</span>pache
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain}
          onSidebarButtonClick={handleSiderbarClick}
          onCreateNewBooking={() => setIsCreateBooking(true)}
        />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
