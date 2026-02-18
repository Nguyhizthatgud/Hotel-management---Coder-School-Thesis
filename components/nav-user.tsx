"use client";

import { BellIcon, CreditCardIcon, LogOutIcon, MoreVerticalIcon, UserCircleIcon } from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/useAuthStore";
export function NavUser({
  user
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  const fallbackText = React.useMemo(() => {
    const fromName = (user.name || "").trim();
    return fromName.length > 0 ? fromName.charAt(0).toUpperCase() : "G";
  }, [user.name]);

  const avatarSrc = React.useMemo(() => {
    const avatarStr = String(user.avatar || "");
    if (avatarStr.trim().length > 0) return avatarStr;
    const seed = encodeURIComponent(user.name || user.email || "guest");
    return `https://ui-avatars.com/api/?name=${seed}&background=random&color=fff&bold=true`;
  }, [user.avatar, user.name, user.email]);
  const logout = useAuthStore((state) => state.logout);
  const { t, i18n } = useTranslation();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="h-8 w-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-semibold">
                {fallbackText}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="h-8 w-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-semibold">
                  {fallbackText}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Button variant="ghost" className="w-full justify-start p-1">
                  <UserCircleIcon />
                  {t("userAccount")}
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="ghost" className="w-full justify-start p-1">
                  <CreditCardIcon />
                  {t("billing")}
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="ghost" className="w-full justify-start p-1">
                  <BellIcon />
                  {t("Notifications")}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant="ghost"
                className="w-full justify-start p-1 text-red-600"
                onClick={async () => {
                  await logout();
                }}
              >
                <LogOutIcon />
                {t("LogOut")}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
