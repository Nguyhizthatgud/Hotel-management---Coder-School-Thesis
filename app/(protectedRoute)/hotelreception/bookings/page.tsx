"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Search, Calendar, User, Phone, Mail, Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: "confirmed" | "pending" | "cancelled" | "checked-in" | "checked-out";
  totalAmount: number;
  paymentStatus: "paid" | "pending" | "failed";
  notes?: string;
}

const BookingManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "BK001",
      guestName: "Nguyễn Văn Nam",
      email: "nam.nguyen@email.com",
      phone: "0901234567",
      roomNumber: "101",
      roomType: "Deluxe",
      checkIn: "2024-01-16",
      checkOut: "2024-01-18",
      status: "confirmed",
      totalAmount: 2400000,
      paymentStatus: "paid",
      notes: "Yêu cầu phòng view biển"
    },
    {
      id: "BK002",
      guestName: "Trần Thị Lan",
      email: "lan.tran@email.com",
      phone: "0912345678",
      roomNumber: "205",
      roomType: "Suite",
      checkIn: "2024-01-15",
      checkOut: "2024-01-20",
      status: "checked-in",
      totalAmount: 5000000,
      paymentStatus: "paid"
    },
    {
      id: "BK003",
      guestName: "Lê Minh Tuấn",
      email: "tuan.le@email.com",
      phone: "0923456789",
      roomNumber: "312",
      roomType: "Standard",
      checkIn: "2024-01-17",
      checkOut: "2024-01-19",
      status: "pending",
      totalAmount: 1600000,
      paymentStatus: "pending",
      notes: "Chờ xác nhận thanh toán"
    },
    {
      id: "BK004",
      guestName: "Phạm Thu Hà",
      email: "ha.pham@email.com",
      phone: "0934567890",
      roomNumber: "408",
      roomType: "Deluxe",
      checkIn: "2024-01-12",
      checkOut: "2024-01-15",
      status: "checked-out",
      totalAmount: 3600000,
      paymentStatus: "paid"
    },
    {
      id: "BK005",
      guestName: "Võ Đình Khôi",
      email: "khoi.vo@email.com",
      phone: "0945678901",
      roomNumber: "506",
      roomType: "Presidential",
      checkIn: "2024-01-18",
      checkOut: "2024-01-22",
      status: "cancelled",
      totalAmount: 8000000,
      paymentStatus: "failed",
      notes: "Khách hủy do có việc đột xuất"
    }
  ]);

  const handleStatusChange = (bookingId: string, newStatus: Booking["status"]) => {
    setBookings(bookings.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)));
    toast.success("Cập nhật trạng thái đặt phòng thành công");
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookings(bookings.filter((booking) => booking.id !== bookingId));
    toast.success("Đã xóa đặt phòng thành công");
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomNumber.includes(searchTerm) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Booking["status"]) => {
    const statusConfig = {
      confirmed: { label: "Đã xác nhận", variant: "default" as const },
      pending: { label: "Chờ xử lý", variant: "secondary" as const },
      cancelled: { label: "Đã hủy", variant: "destructive" as const },
      "checked-in": { label: "Đã nhận phòng", variant: "default" as const },
      "checked-out": { label: "Đã trả phòng", variant: "outline" as const }
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPaymentStatusBadge = (status: Booking["paymentStatus"]) => {
    const statusConfig = {
      paid: { label: "Đã thanh toán", variant: "default" as const, color: "text-green-600" },
      pending: { label: "Chờ thanh toán", variant: "secondary" as const, color: "text-yellow-600" },
      failed: { label: "Thanh toán thất bại", variant: "destructive" as const, color: "text-red-600" }
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý đặt phòng</h2>
          <p className="text-gray-600">Theo dõi và quản lý tất cả đặt phòng</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm theo tên khách, mã đặt phòng, số phòng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ xử lý</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="checked-in">Đã nhận phòng</SelectItem>
                <SelectItem value="checked-out">Đã trả phòng</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đặt phòng ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredBookings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đặt phòng</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Phòng</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thanh toán</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.guestName}</div>
                        <div className="text-sm text-gray-500">{booking.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">Phòng {booking.roomNumber}</div>
                        <div className="text-sm text-gray-500">{booking.roomType}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Nhận: {new Date(booking.checkIn).toLocaleDateString("vi-VN")}</div>
                        <div>Trả: {new Date(booking.checkOut).toLocaleDateString("vi-VN")}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>{getPaymentStatusBadge(booking.paymentStatus)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(booking.totalAmount)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setIsDetailsOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        <Select
                          value={booking.status}
                          onValueChange={(value: Booking["status"]) => handleStatusChange(booking.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Chờ xử lý</SelectItem>
                            <SelectItem value="confirmed">Xác nhận</SelectItem>
                            <SelectItem value="checked-in">Nhận phòng</SelectItem>
                            <SelectItem value="checked-out">Trả phòng</SelectItem>
                            <SelectItem value="cancelled">Hủy</SelectItem>
                          </SelectContent>
                        </Select>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc chắn muốn xóa đặt phòng {booking.id}? Hành động này không thể hoàn tác.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteBooking(booking.id)}>Xóa</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Không tìm thấy đặt phòng</h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== "all"
                  ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
                  : "Chưa có đặt phòng nào trong hệ thống"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chi tiết đặt phòng</DialogTitle>
            <DialogDescription>Thông tin chi tiết về đặt phòng {selectedBooking?.id}</DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Thông tin khách hàng</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{selectedBooking.guestName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{selectedBooking.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{selectedBooking.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Thông tin phòng</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      Phòng số: <span className="font-medium">{selectedBooking.roomNumber}</span>
                    </div>
                    <div>
                      Loại phòng: <span className="font-medium">{selectedBooking.roomType}</span>
                    </div>
                    <div>
                      Tổng tiền: <span className="font-medium">{formatCurrency(selectedBooking.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Thời gian lưu trú</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Nhận phòng:</span>
                    <div className="font-medium">{new Date(selectedBooking.checkIn).toLocaleDateString("vi-VN")}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Trả phòng:</span>
                    <div className="font-medium">{new Date(selectedBooking.checkOut).toLocaleDateString("vi-VN")}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-600">Trạng thái đặt phòng:</span>
                  <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                </div>
                <div>
                  <span className="text-gray-600">Trạng thái thanh toán:</span>
                  <div className="mt-1">{getPaymentStatusBadge(selectedBooking.paymentStatus)}</div>
                </div>
              </div>

              {selectedBooking.notes && (
                <div>
                  <h4 className="font-semibold mb-2">Ghi chú</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedBooking.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingManagement;
