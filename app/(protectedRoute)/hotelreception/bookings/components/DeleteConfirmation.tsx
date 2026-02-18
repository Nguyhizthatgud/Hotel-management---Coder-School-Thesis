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
import { Bookings } from "@/types/booking";
import React from "react";

import { useBookingStore } from "@/stores/useBookingService";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
interface DeleteConfirmationProps {
  booking: Bookings | null;
  onOpenChange: (open: boolean) => void;
}

const DeleteConfirmation = ({ booking, onOpenChange }: DeleteConfirmationProps) => {
  const deleteBooking = useBookingStore((state) => state.deleteBooking);
  const { t } = useTranslation();
  const confirmDelete = async () => {
    if (booking) {
      try {
        await deleteBooking(booking.bookId);
        toast.success(t("booking_toast_delete_success"));
        onOpenChange(false);
      } catch (error: any) {
        toast.error(t("booking_toast_delete_error"));
      }
    }
  };
  return (
    <AlertDialog open={!!booking} onOpenChange={(open) => onOpenChange(open)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("delete_confirmation_title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("delete_confirmation_description")}</AlertDialogDescription>
        </AlertDialogHeader>

        {booking && (
          <div className="my-4 p-4 bg-gray-50 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t("delete_booking_id")}:</span>
              <span className="font-medium">{booking.bookId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t("delete_guest_name")}:</span>
              <span className="font-medium">{booking.guestName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t("delete_room_type")}:</span>
              <span className="font-medium">{booking.roomType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t("delete_room_price")}:</span>
              <span className="font-medium text-blue-600">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND"
                }).format(booking.roomPrice || 0)}
                /đêm
              </span>
            </div>
            {/* <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Trạng thái:</span>
              {getStatusColor(booking.status)}
            </div> */}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>{t("delete_cancel_button")}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
            {t("delete_confirmation_button")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
