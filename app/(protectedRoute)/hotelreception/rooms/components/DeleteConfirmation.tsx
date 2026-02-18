"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Room } from "@/types/room";
import React from "react";
import getStatusColor from "./StatusBadge";
import { useRoomStore } from "@/stores/useRoomService";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
interface DeleteConfirmationProps {
  room: Room | null;
  onOpenChange: (open: boolean) => void;
}

const DeleteConfirmation = ({ room, onOpenChange }: DeleteConfirmationProps) => {
  const deleteRoom = useRoomStore((state) => state.deleteRoom);
  const { t } = useTranslation();
  const confirmDelete = async () => {
    if (room) {
      try {
        await deleteRoom(room._id);
        toast.success("Xóa phòng thành công");
        onOpenChange(false);
      } catch (error: any) {
        toast.error("Lỗi xóa phòng, thử lại nhé!");
      }
    }
  };
  return (
    <AlertDialog open={!!room} onOpenChange={(open) => onOpenChange(open)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("rooms_delete_confirmation_title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("rooms_delete_confirmation_description")}</AlertDialogDescription>
        </AlertDialogHeader>

        {room && (
          <div className="my-4 p-4 bg-gray-50 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t("rooms_room_number")}:</span>
              <span className="font-medium">{room.roomNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t("rooms_room_name")}:</span>
              <span className="font-medium">{room.roomName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t("rooms_type")}:</span>
              <span className="font-medium">{room.roomType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t("rooms_floor")}:</span>
              <span className="font-medium">{room.floor}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t("rooms_price")}:</span>
              <span className="font-medium text-blue-600">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND"
                }).format(room.price)}
                /đêm
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t("rooms_status")}:</span>
              {getStatusColor(room.status)}
            </div>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>{t("rooms_cancel_button")}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
            {t("rooms_delete_button")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
