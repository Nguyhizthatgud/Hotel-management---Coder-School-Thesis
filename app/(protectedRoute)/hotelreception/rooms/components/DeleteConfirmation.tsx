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

interface DeleteConfirmationProps {
  room: Room | null;
  onOpenChange: (open: boolean) => void;
}

const DeleteConfirmation = ({ room, onOpenChange }: DeleteConfirmationProps) => {
  const deleteRoom = useRoomStore((state) => state.deleteRoom);

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
          <AlertDialogTitle>Xác nhận xóa phòng</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa phòng này? Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {room && (
          <div className="my-4 p-4 bg-gray-50 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Số phòng:</span>
              <span className="font-medium">{room.roomNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tên phòng:</span>
              <span className="font-medium">{room.roomName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Loại phòng:</span>
              <span className="font-medium">{room.roomType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tầng:</span>
              <span className="font-medium">Tầng {room.floor}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Giá:</span>
              <span className="font-medium text-blue-600">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND"
                }).format(room.price)}
                /đêm
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Trạng thái:</span>
              {getStatusColor(room.status)}
            </div>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
            Xóa phòng
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
