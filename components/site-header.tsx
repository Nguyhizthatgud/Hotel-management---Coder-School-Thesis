"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUISlice } from "@/stores/UI/useUIStore";

export function SiteHeader() {
  const displayName = useAuthStore((state) => state.user?.displayName);
  const propSelection = useUISlice((state) => state.propSelection);
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <div className="font-medium italic ">Mô hình quản lý cho {propSelection} </div>
        <div className="ml-auto flex w-full max-w-sm items-center gap-2">
          <Controller
            name="email"
            control={useForm().control}
            render={({ field }) => <Input {...field} type="email" placeholder="Email" />}
          />
          <Input type="email" placeholder="Email" />
        </div>
        <Avatar className="rounded-lg h-8 w-8">
          <AvatarFallback className="text-sm p-2 cursor-pointer">{displayName?.charAt(0).toUpperCase()} </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
