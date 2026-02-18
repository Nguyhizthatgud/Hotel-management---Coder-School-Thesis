"use client";
import React from "react";
import { ArrowRightToLine, Bell, BellIcon, PlusCircleIcon, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";
import { useBookingStore } from "@/stores/useBookingService";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useTranslation } from "react-i18next";
import Link from "next/link";
export function NavMain({
  items,
  onSidebarButtonClick,
  onCreateNewBooking
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
  onSidebarButtonClick?: (url: string) => void;
  onCreateNewBooking?: () => void;
}) {
  const pathname = usePathname();
  const getBookingsStateCount = useBookingStore((state) => state.getBookingsStateCount);
  const bookingsStateCount = useBookingStore((state) => state.bookingsStateCount);

  React.useEffect(() => {
    getBookingsStateCount();
  }, [getBookingsStateCount]);
  const { t } = useTranslation();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              onClick={onCreateNewBooking}
              className="bg-orange-400/90 text-white hover:bg-orange-500/80 active:scale-95 
             transition-transform duration-300"
            >
              <PlusCircleIcon className="w-4 h-4" />
              <span>{t("sidebar_createroom_button")}</span>
            </SidebarMenuButton>
            {bookingsStateCount.pending > 0 ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0 relative"
                    variant="outline"
                  >
                    <BellIcon />
                    <Badge className="absolute -top-1 -right-1 rounded-full bg-red-500 text-xs w-4 h-5 flex items-center justify-center hover:scale-110 transition-transform hover:bg-red-600">
                      <span className="text-xs">{bookingsStateCount.pending}</span>
                    </Badge>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs p-0 bg-card text-card-foreground border shadow-lg">
                  <div className="max-h-[200px] overflow-y-auto">
                    <div className="p-3 border-b last:border-b-0 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            {t("sidebar_bookings_report1")}{" "}
                            <span className="font-semibold text-orange-500">{bookingsStateCount.pending}</span>{" "}
                            {t("sidebar_bookings_report2")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 border-t">
                    <Link href="/hotelreception/bookings">
                      {" "}
                      <button className="w-full group text-xs text-primary hover:underline py-1">
                        <div className="flex items-center justify-center">
                          {t("sidebar_bookings_report_bottom")}{" "}
                          <ArrowRightToLine className="w-4 h-4 hidden group-hover:inline-block ml-1" />
                        </div>
                      </button>
                    </Link>
                  </div>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button
                size="icon"
                className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0 relative"
                variant="outline"
              >
                <BellIcon />
              </Button>
            )}
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
                    ${isActive ? "bg-orange-300/30!  font-semibold shadow-md" : "hover:bg-orange-100"}
                
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
