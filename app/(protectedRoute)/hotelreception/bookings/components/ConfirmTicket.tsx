"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Phone, Send } from "lucide-react";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Dialog } from "@/components/ui/dialog";
import React from "react";
import { Bookings } from "@/types";
import { format } from "date-fns";
type ConfirmTicketProps = {
  selectedReservation: Bookings | null;
  isConfirmationTicketOpen: boolean;
  setIsConfirmationTicketOpen: (open: boolean) => void;
};

const ConfirmTicket: React.FC<ConfirmTicketProps> = ({
  selectedReservation,
  isConfirmationTicketOpen,
  setIsConfirmationTicketOpen
}) => {
  return (
    <Dialog open={isConfirmationTicketOpen} onOpenChange={setIsConfirmationTicketOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="size-5" />
            Xác nhận đặt phòng thành công
          </DialogTitle>
          <DialogDescription>Đơn đặt phòng đã được xác nhận thành công</DialogDescription>
          <DialogDescription>
            <span className="text-sm text-muted-foreground italic">
              # Xác nhận đơn đặt phòng sẽ được gửi qua email đã đăng ký.
            </span>
          </DialogDescription>
        </DialogHeader>

        {selectedReservation && (
          <div className="space-y-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Mã Đặt Phòng</div>
              <div className="text-xl font-mono tracking-wider">{selectedReservation.bookId}</div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tên khách hàng</span>
                <span className="font-medium">{selectedReservation.guestName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Loại phòng</span>
                <span className="font-medium">{selectedReservation.roomType}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ngày nhận phòng</span>
                <span className="font-medium">{format(new Date(selectedReservation.checkInDate), "dd/MM/yyyy")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ngày trả phòng</span>
                <span className="font-medium">{format(new Date(selectedReservation.checkOutDate), "dd/MM/yyyy")}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Thông tin khách hàng</span>
                <span className="font-medium">
                  {selectedReservation.guestAdult} khách lớn, {selectedReservation.guestChildren} trẻ em
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Dự chi</span>
                <span className="font-medium text-green-600">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                    Number(selectedReservation.totalPrice) || 0
                  )}
                </span>
              </div>
            </div>

            <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="size-3 text-muted-foreground" />
                <span>{selectedReservation.guestEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3 text-muted-foreground" />
                <span>{selectedReservation.guestNumber}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" size="sm">
                <Send className="size-4 mr-2" />
                Email
              </Button>
              <Button onClick={() => setIsConfirmationTicketOpen(false)} className="flex-1" size="sm">
                <Send className="size-4 mr-2" />
                Đóng
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmTicket;
