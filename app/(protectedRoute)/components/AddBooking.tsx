"use client";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { Bookings, BookingSchema } from "@/types/booking";
import { useUISlice } from "@/stores/UI/useUIStore";
import { useBookingStore } from "@/stores/useBookingService";
import { useRoomStore } from "@/stores/useRoomService";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface AddBookingProps {
  editingBooking?: Bookings | null;
  onClearEditingBooking?: () => void;
  date?: string | Date;
  hideTrigger?: boolean;
}

const AddBooking = ({ editingBooking, onClearEditingBooking }: AddBookingProps) => {
  const setIsEditingBooking = useUISlice((state) => state.setIsEditingBooking);
  const isCreateBooking = useUISlice((state) => state.isCreateBooking);
  const setIsCreateBooking = useUISlice((state) => state.setIsCreateBooking);

  const rooms = useRoomStore((state) => state.rooms);
  const fetchRooms = useRoomStore((state) => state.fetchRooms);
  const setRoomId = useBookingStore((state) => state.setRoomId);
  const setRoomPrice = useBookingStore((state) => state.setRoomPrice);
  const addBooking = useBookingStore((state) => state.addBooking);
  const updateBooking = useBookingStore((state) => state.updateBooking);

  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const isDatePickerCIOpen = useUISlice((state) => state.isDatePickerCIOpen);
  const setIsDatePickerCIOpen = useUISlice((state) => state.setIsDatePickerCIOpen);
  const isDatePickerCOOpen = useUISlice((state) => state.isDatePickerCOOpen);
  const setIsDatePickerCOOpen = useUISlice((state) => state.setIsDatePickerCOOpen);

  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedAdults, setSelectedAdults] = useState<number>(1);
  const { t } = useTranslation();
  const uniqueRoomTypes = useMemo(() => Array.from(new Set(rooms.map((room) => room.roomType))), [rooms]);

  const selectedRoomData = useMemo(() => rooms.find((room) => room._id === selectedRoom), [rooms, selectedRoom]);
  const capacity = selectedRoomData?.capacity || 1;
  const adultOptions = useMemo(() => Array.from({ length: capacity }, (_, i) => i + 1), [capacity]);
  const remainingCapacity = Math.max(0, capacity - selectedAdults);
  const childrenOptions = Array.from({ length: remainingCapacity + 1 }, (_, i) => i);
  const bookings = useBookingStore((state) => state.bookings);

  const calcNights = (start?: Date, end?: Date) => {
    if (!start || !end) return 1;
    const ms = end.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
    return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  };

  // Get disabled dates based on room bookings
  const getDisabledDates = (roomId?: string) => {
    if (!roomId) return (_date: Date) => false;

    const disabledDates: Date[] = [];

    bookings.forEach((booking) => {
      if (booking.roomId === roomId && (booking.status === "confirmed" || booking.status === "Check-In")) {
        const startDate = new Date(booking.checkInDate);
        const endDate = new Date(booking.checkOutDate);
        const current = new Date(startDate);
        while (current < endDate) {
          disabledDates.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }
      }
    });

    return (date: Date) => {
      return disabledDates.some((disabledDate) => disabledDate.toDateString() === date.toDateString());
    };
  };

  // checking room availability
  const isRoomAvailable = (roomId: string) => {
    if (!checkInDate || !checkOutDate) return true; // if dates not selected, assume available
    return !bookings.some(
      (booking) =>
        booking.roomId === roomId &&
        booking.status === "confirmed" &&
        new Date(booking.checkInDate) < new Date(checkOutDate) &&
        new Date(booking.checkOutDate) > new Date(checkInDate)
    );
  };
  // fetch rooms only when dialog opens
  useEffect(() => {
    if (isCreateBooking && rooms.length === 0) {
      fetchRooms();
    }
  }, [isCreateBooking, rooms.length, fetchRooms]);

  // update room details when selected room changes
  useEffect(() => {
    if (selectedRoomData) {
      setRoomId(selectedRoomData._id);
      setRoomPrice(selectedRoomData.price);
    }
  }, [selectedRoomData, setRoomId, setRoomPrice]);

  const bookingSource = ["Agoda", "Expedia", "小红书", "Booking.com", "Trivago", "Traveloka", "mobile", "trực tiếp"];
  const formCreateBookingData = useForm<Bookings>({
    resolver: zodResolver(BookingSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      _id: "",
      bookId: "",
      guestName: "",
      guestEmail: "",
      guestNumber: "",
      guestAdult: 1,
      guestChildren: 0,
      paymentStatus: "Chưa thanh toán",
      roomType: "",
      roomName: "",
      checkInDate: "",
      checkOutDate: "",
      bookingSource: "",
      description: ""
    }
  });

  useEffect(() => {
    if (editingBooking && isCreateBooking) {
      formCreateBookingData.reset(editingBooking);
    } else if (isCreateBooking) {
      // Reset form data
      formCreateBookingData.reset();
      // Reset local state
      setCheckInDate(undefined);
      setCheckOutDate(undefined);
      setSelectedRoomType(null);
      setSelectedRoom(null);
      setSelectedAdults(1);
    }
  }, [editingBooking, isCreateBooking, formCreateBookingData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRoom) {
      formCreateBookingData.setError("roomId", { type: "manual", message: "Vui lòng chọn phòng" });
      toast.error(t("booking_toast_form_room_required"));
      return;
    }

    if (!selectedRoomData) {
      toast.error(t("booking_toast_room_not_found"));
      return;
    }

    // sync stateful fields before validation
    const childrenCount = formCreateBookingData.getValues("guestChildren") || 0;
    formCreateBookingData.setValue("guestAdult", selectedAdults);
    formCreateBookingData.setValue("guestChildren", childrenCount);
    formCreateBookingData.setValue("guestsCount", selectedAdults + childrenCount);
    formCreateBookingData.setValue("checkInDate", checkInDate ? checkInDate.toISOString() : "");
    formCreateBookingData.setValue("checkOutDate", checkOutDate ? checkOutDate.toISOString() : "");
    formCreateBookingData.setValue("roomType", selectedRoomData?.roomType || selectedRoomType || "");
    formCreateBookingData.setValue("roomName", selectedRoomData?.roomName || "");
    formCreateBookingData.setValue("roomNumber", selectedRoomData?.roomNumber || selectedRoomData?._id || "");
    formCreateBookingData.setValue("bookingSource", formCreateBookingData.watch("bookingSource") || "Trực tiếp");
    formCreateBookingData.setValue("paymentStatus", formCreateBookingData.watch("paymentStatus") || "Chưa thanh toán");
    formCreateBookingData.setValue("bookId", formCreateBookingData.watch("bookId") || Date.now().toString());

    // trigger validation
    const isValid = await formCreateBookingData.trigger();
    if (!isValid) {
      const errors = formCreateBookingData.formState.errors;
      const errorMessages = Object.entries(errors)
        .map(([_key, error]: any) => error?.message)
        .filter(Boolean)
        .join(", ");
      toast.error(errorMessages || t("booking_toast_form_error"));
      return;
    }
    if (editingBooking) {
      // update existing booking
      await updateBooking({
        ...editingBooking,
        checkInDate: checkInDate?.toISOString() || editingBooking.checkInDate,
        checkOutDate: checkOutDate?.toISOString() || editingBooking.checkOutDate
      });
      toast.success(t("booking_toast_update_success"));
      setIsEditingBooking(false);
      setIsCreateBooking(false);
      onClearEditingBooking?.();
      formCreateBookingData.reset();
    } else {
      const guestChildren = formCreateBookingData.getValues("guestChildren") || 0;
      const nights = calcNights(checkInDate, checkOutDate);
      const roomPrice = selectedRoomData?.price || 0;
      const totalPrice = roomPrice * nights;
      // Create new booking payload aligned with backend expectations
      await addBooking({
        checkInDate: checkInDate?.toISOString() || "",
        checkOutDate: checkOutDate?.toISOString() || "",
        guestName: formCreateBookingData.getValues("guestName") || "",
        guestNumber: formCreateBookingData.getValues("guestNumber") || "",
        guestEmail: formCreateBookingData.getValues("guestEmail") || "",
        guestAdult: selectedAdults,
        guestChildren,
        guestsCount: selectedAdults + guestChildren,
        roomId: selectedRoom,
        roomType: selectedRoomData.roomType,
        roomName: selectedRoomData.roomName,
        roomNumber: selectedRoomData.roomNumber,
        roomPrice,
        totalPrice,
        bookingSource: formCreateBookingData.getValues("bookingSource") || "Trực tiếp",
        paymentStatus: formCreateBookingData.getValues("paymentStatus") || "Chưa thanh toán",
        description: formCreateBookingData.getValues("description") || ""
      } as any);
      toast.success(t("booking_toast_create_success"));
      setIsCreateBooking(false);
      formCreateBookingData.reset();
    }
  };
  return (
    <div>
      <Dialog open={isCreateBooking} onOpenChange={setIsCreateBooking}>
        <DialogContent className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              mass: 0.8
            }}
          >
            <DialogHeader>
              <DialogTitle>Tạo đặt phòng mới</DialogTitle>
              <DialogDescription>Tạo đặt phòng mới cho khách. Các trường đánh dấu (*) là bắt buộc. </DialogDescription>
            </DialogHeader>
            <form id="booking-form" onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  delay: 0.05
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="guestName" className="font-bold">
                    Tên khách hàng <span className="text-red-500">*</span>
                  </Label>

                  <Input id="guestName" placeholder="Tên khách hàng" {...formCreateBookingData.register("guestName")} />

                  {formCreateBookingData.formState.errors.guestName && (
                    <p className="text-red-500 text-xs mt-1">
                      {formCreateBookingData.formState.errors.guestName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="font-bold">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="customer_apache@email.com"
                    {...formCreateBookingData.register("guestEmail")}
                  />
                  {formCreateBookingData.formState.errors.guestEmail && (
                    <p className="text-red-500 text-xs mt-1">
                      {formCreateBookingData.formState.errors.guestEmail.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone" className="font-bold">
                    Số điện thoại <span className="text-red-500">*</span>
                  </Label>
                  <Input id="phone" placeholder="+(084) 987654321" {...formCreateBookingData.register("guestNumber")} />
                  {formCreateBookingData.formState.errors.guestNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {formCreateBookingData.formState.errors.guestNumber.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="roomType" className="font-bold">
                    Loại phòng <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={setSelectedRoomType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại phòng đặt" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueRoomTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  delay: 0.1
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="checkInDate" className="font-bold">
                    Check-in <span className="text-red-500">*</span>
                  </Label>
                  <Popover open={isDatePickerCIOpen} onOpenChange={setIsDatePickerCIOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkInDate ? format(checkInDate, "PPP", { locale: vi }) : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                      <Calendar
                        className="w-full rounded-md border shadow-sm"
                        mode="single"
                        selected={checkInDate}
                        onSelect={(date) => {
                          setCheckInDate(date);
                          formCreateBookingData.setValue("checkInDate", date ? date.toISOString() : "");
                          setIsDatePickerCIOpen(false);
                        }}
                        disabled={(date) => {
                          // Disable past dates
                          if (date < new Date()) return true;
                          // Disable occupied dates for selected room
                          return selectedRoom ? getDisabledDates(selectedRoom)(date) : false;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="checkOutDate" className="font-bold">
                    Check-out <span className="text-red-500">*</span>
                  </Label>
                  <Popover open={isDatePickerCOOpen} onOpenChange={setIsDatePickerCOOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOutDate ? format(checkOutDate, "PPP", { locale: vi }) : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                      <Calendar
                        className="w-full rounded-md border shadow-sm"
                        mode="single"
                        selected={checkOutDate}
                        onSelect={(date) => {
                          setCheckOutDate(date);
                          formCreateBookingData.setValue("checkOutDate", date ? date.toISOString() : "");
                          setIsDatePickerCOOpen(false);
                        }}
                        disabled={(date) => {
                          // Checkout date must be after checkin date
                          if (checkInDate && date <= checkInDate) return true;
                          // Disable occupied dates for selected room
                          return selectedRoom ? getDisabledDates(selectedRoom)(date) : false;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="font-semibold" htmlFor="adults">
                      Người lớn <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={selectedAdults.toString()}
                      onValueChange={(value) => {
                        const num = parseInt(value);
                        setSelectedAdults(num);
                        formCreateBookingData.setValue("guestAdult", num);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="1" />
                      </SelectTrigger>
                      <SelectContent>
                        {adultOptions.map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {capacity && selectedAdults > capacity && (
                      <p className="text-red-500 text-xs mt-1">
                        Số lượng người lớn không được vượt quá sức chứa của phòng ({capacity}).
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="children" className="font-semibold">
                      Trẻ em
                    </Label>
                    <Select
                      value={formCreateBookingData.watch("guestChildren")?.toString() || "0"}
                      onValueChange={(value) => formCreateBookingData.setValue("guestChildren", parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent>
                        {childrenOptions.map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="source" className="font-bold">
                    Kênh đặt phòng
                  </Label>
                  <Select
                    value={formCreateBookingData.watch("bookingSource") || ""}
                    onValueChange={(value) => formCreateBookingData.setValue("bookingSource", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nguồn đặt phòng" />
                    </SelectTrigger>
                    <SelectContent>
                      {bookingSource.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
              {/* Chọn phòng */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-4"
              >
                <Label htmlFor="roomName" className="font-bold">
                  Chọn phòng
                </Label>
                <Select value={selectedRoom ?? undefined} onValueChange={setSelectedRoom}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phòng" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms
                      .filter((room) => room.roomType === selectedRoomType)
                      .filter((room) => isRoomAvailable(room._id))
                      .map((room) => (
                        <SelectItem key={room._id} value={room._id}>
                          {room.roomName}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </motion.div>
              {/* Thanh toán */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-4"
              >
                <Label htmlFor="paymentMethods" className="font-bold">
                  Phương thức thanh toán
                </Label>
                <Select
                  value={formCreateBookingData.watch("paymentStatus") || ""}
                  onValueChange={(value) =>
                    formCreateBookingData.setValue(
                      "paymentStatus",
                      value as "Đã thanh toán" | "Chưa thanh toán" | "Thanh toán một phần"
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tình Trạng Thanh Toán" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Chưa thanh toán">Chưa thanh toán</SelectItem>
                    <SelectItem value="Đã thanh toán">Đã thanh toán</SelectItem>
                    <SelectItem value="Thanh toán một phần">Thanh toán một phần</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Ghi chú */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  delay: 0.15
                }}
                className="space-y-2 col-span-2"
              >
                <Label htmlFor="notes" className="font-bold">
                  Ghi chú phòng
                </Label>
                <Textarea
                  id="description"
                  placeholder="Thêm ghi chú về đặt Phòng (tùy chọn)..."
                  rows={3}
                  {...formCreateBookingData.register("description")}
                />
              </motion.div>
            </form>
            <DialogFooter className="flex gap-2 pt-4">
              <Button type="submit" form="booking-form" className="flex-1">
                Tạo đặt phòng
              </Button>
              <Button variant="outline" onClick={() => setIsCreateBooking(false)}>
                Hủy bỏ
              </Button>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddBooking;
