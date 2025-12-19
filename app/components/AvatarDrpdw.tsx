import React from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { ArrowRightFromLine, ArrowRightToLine } from "lucide-react";
type AvatarDrpdwProps = {
  trigger?: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  contentClassName?: string;
  triggerClassName?: string;
  open?: boolean; // optional controlled open
  onOpenChange?: (open: boolean) => void;
};
const AvatarDrpdw = ({
  trigger,
  align = "end",
  side = "bottom",
  sideOffset = 8,
  contentClassName,
  triggerClassName,
  open: controlledOpen,
  onOpenChange
}: AvatarDrpdwProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const router = useRouter();
  const isControlled = typeof controlledOpen === "boolean";
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = (value: boolean) => (isControlled ? onOpenChange?.(value) : setUncontrolledOpen(value));
  const user = useAuthStore((state) => state.user);
  const email = useAuthStore((state) => state.user?.email);
  const logout = useAuthStore((state) => state.logout);
  // Keep menu open while hovering content to avoid flicker
  const handleEnter = () => setOpen(true);
  const handleLeave = () => setOpen(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} className={triggerClassName}>
          {trigger ?? <Button variant="outline">Open</Button>}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-56 ${contentClassName ?? ""}`}
        align={align}
        side={side}
        sideOffset={sideOffset}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
        <DropdownMenuLabel className="mb-2 text-sm! font-normal text-muted-foreground">
          <span className="">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="group hover:font-bold" onClick={() => router.push("/hotelreception")}>
            <span>Dashboard</span>
            <DropdownMenuShortcut className="opacity-0 group-hover:opacity-60 transition-opacity">
              <ArrowRightToLine />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="group hover:font-bold">
            <span>Billing</span>
            <DropdownMenuShortcut className="opacity-0 group-hover:opacity-60 transition-opacity">
              <ArrowRightToLine />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="group hover:font-bold">
            <span>Settings</span>
            <DropdownMenuShortcut className="opacity-0 group-hover:opacity-60 transition-opacity">
              <ArrowRightToLine />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="group hover:font-bold" onClick={() => logout()}>
          <span>Log out</span>
          <DropdownMenuShortcut className="opacity-0 group-hover:opacity-60 transition-opacity">
            <ArrowRightFromLine />{" "}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AvatarDrpdw;
