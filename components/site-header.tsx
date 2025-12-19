import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/useAuthStore";

export function SiteHeader() {
  const displayName = useAuthStore((state) => state.user?.displayName);
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">Mô hình quản lý</h1>
        <div className="flex w-full max-w-sm items-center gap-2">
          <Controller
            name="email"
            control={useForm().control}
            render={({ field }) => <Input {...field} type="email" placeholder="Email" />}
          />
          <Input type="email" placeholder="Email" />
        </div>
        <Avatar>
          <Avatar className="text-2xl p-2 cursor-pointer">{displayName?.charAt(0).toUpperCase()}</Avatar>
        </Avatar>
      </div>
    </header>
  );
}
