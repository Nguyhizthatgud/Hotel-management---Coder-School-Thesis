import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Key, MapPinHouse, NotebookPen } from "lucide-react";
import React from "react";
import { useUISlice } from "@/stores/UI/useUIStore";

import { Bookings, residenceRegistrationSchema } from "@/types/booking";
import { useBookingStore } from "@/stores/useBookingService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
type Checkinform = {
  selectedBooking?: Bookings | null;
};

type ResidenceRegistration = z.infer<typeof residenceRegistrationSchema>;

const CheckInFrom = ({ selectedBooking }: Checkinform) => {
  const isCheckInDialogOpen = useUISlice((state) => state.isCheckInDialogOpen);
  const setIsCheckInDialogOpen = useUISlice((state) => state.setCheckInDialogOpen);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<ResidenceRegistration>({
    resolver: zodResolver(residenceRegistrationSchema),
    mode: "onBlur",
    defaultValues: {
      idCardType: "passport",
      idCardNumber: "",
      idBirthDate: selectedBooking?.residenceRegistrationInfo?.idBirthDate || "",
      residenceFullName: selectedBooking?.guestName || "",
      residenceAddress: selectedBooking?.residenceRegistrationInfo?.residenceAddress || "",
      residenceCountry: selectedBooking?.residenceRegistrationInfo?.residenceCountry || "Việt Nam",
      idCardIssuedDate: selectedBooking?.residenceRegistrationInfo?.idCardIssuedDate || "",
      idCardExpiryDate: selectedBooking?.residenceRegistrationInfo?.idCardExpiryDate || "",
      registrationNotes: selectedBooking?.residenceRegistrationInfo?.registrationNotes || ""
    }
  });
  const updateBooking = useBookingStore((state) => state.updateBooking);
  const fetchBookings = useBookingStore((state) => state.fetchBookings);
  const onSubmit = async (data: ResidenceRegistration) => {
    // function body
    try {
      //API call
      await updateBooking({
        ...selectedBooking,
        residenceRegistrationInfo: { ...data, registrationStatus: "registered" },
        status: "Check-In"
      } as Bookings);
      toast.success(t("booking_toast_checkin_success"));
      reset();
      setIsCheckInDialogOpen(false);
      // Refresh bookings list to show updated status
      await fetchBookings();
    } catch (error: any) {
      toast.error(t("booking_toast_checkin_error"));
    }
  };
  return (
    <Dialog open={isCheckInDialogOpen} onOpenChange={setIsCheckInDialogOpen}>
      <DialogContent className="max-w-2xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="size-5" />
            Nhận Phòng
          </DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-1 italic">
              <NotebookPen className="w-4 h-4" /> Thủ tục đăng ký nhận phòng cho {selectedBooking?.guestName}
            </div>
          </DialogDescription>
        </DialogHeader>
        {selectedBooking && (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Phòng:</span>{" "}
                  <div className="font-bold">
                    {selectedBooking.roomNumber} - {selectedBooking.roomType}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Ngày nhận phòng:</span>{" "}
                  <span className="font-bold">
                    {format(selectedBooking.checkInDate, "PPP", { locale: vi })} →{" "}
                    {format(selectedBooking.checkOutDate, "ppp", { locale: vi })}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Khách hàng:</span>
                  <div className="font-bold">
                    {" "}
                    {selectedBooking.guestName} <br />
                    {selectedBooking.guestNumber} / {selectedBooking.guestEmail}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Tổng số khách:</span>{" "}
                  <div className="font-bold">
                    {selectedBooking.guestsCount} trên {selectedBooking.guestAdult} người lớn
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <DialogDescription>
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1 italic">
                  {" "}
                  <MapPinHouse className="w-4 h-4" />
                  Thông tin đăng ký tạm trú
                </div>
              </div>
            </DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
              {/* Customer details */}
              <div className="col-span-2 space-y-4 ">
                <Card className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-semibold">
                          <span className="truncate">{selectedBooking.guestName.charAt(0)}</span>
                        </div>
                        <span>{selectedBooking.guestName}</span>
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {/* Full Name */}
                      <div className="col-span-2">
                        <Label className="font-bold">
                          Họ và Tên <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder={selectedBooking?.guestName ?? ""}
                          defaultValue={selectedBooking?.guestName ?? ""}
                          {...register("residenceFullName", { value: selectedBooking?.guestName ?? "" })}
                          className="h-9"
                        />
                        {errors.residenceFullName && (
                          <div className="text-red-500 text-xs! italic pl-1">{errors.residenceFullName.message}</div>
                        )}
                      </div>
                      {/* Gender */}
                      <div>
                        <Label className="font-bold">Giới tính</Label>
                        <Select>
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Nam</SelectItem>
                            <SelectItem value="Female">Nữ</SelectItem>
                            <SelectItem value="Other">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* ID Card type */}
                      <div className="space-y-2 col-span-1">
                        <Label className="font-bold">
                          Loại giấy tờ cá nhân <span className="text-red-500">*</span>
                        </Label>
                        <Controller
                          name="idCardType"
                          control={control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn loại giấy tờ cá nhân" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="passport">Hộ Chiếu</SelectItem>
                                <SelectItem value="id_card">CCCD/CMND</SelectItem>
                                <SelectItem value="driver_license">Bằng lái</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.idCardType && (
                          <div className="text-red-500 text-xs! italic pl-1">Vui lòng chọn loại giấy tờ cá nhân</div>
                        )}
                      </div>
                      {/* Id number */}
                      <div className="col-span-2">
                        <Label className="font-bold">
                          Số định danh cá nhân <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          inputMode="numeric"
                          {...register("idCardNumber", {})}
                          placeholder="Nhập mã định danh cá nhân"
                        />
                        {errors.idCardNumber && (
                          <div className="text-red-500 text-xs! italic pl-1">{errors.idCardNumber.message}</div>
                        )}
                      </div>
                      {/* Address */}
                      <div className="col-span-3 md:col-span-2">
                        <Label className="font-bold">
                          Địa chỉ thường trú <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="Nhập địa chỉ thường trú"
                          {...register("residenceAddress")}
                          className="h-9"
                        />
                        {errors.residenceAddress && (
                          <div className="text-red-500 text-xs! italic pl-1">{errors.residenceAddress.message}</div>
                        )}
                      </div>
                      {/* Nationality */}
                      <div>
                        <Label className="font-bold">
                          Quốc tịch <span className="text-red-500">*</span>
                        </Label>
                        <Input placeholder="e.g., Việt Nam" className="h-9" {...register("residenceCountry")} />
                        {errors.residenceCountry && (
                          <div className="text-red-500 text-xs! italic pl-1">{errors.residenceCountry.message}</div>
                        )}
                      </div>
                      {/* Date of Birth */}
                      <div className="">
                        <Label className="font-bold">Ngày sinh</Label>
                        <Input type="date" className="w-full block" {...register("idBirthDate")} />
                      </div>
                      {/* Issue Date */}
                      <div>
                        <Label className="font-bold">Ngày phát hành</Label>
                        <Input type="date" className="block h-9" {...register("idCardIssuedDate")} />
                      </div>
                      {/* Expiry Date */}
                      <div>
                        <Label className="font-bold">Ngày hết hạn</Label>
                        <Input type="date" className="block h-9" {...register("idCardExpiryDate")} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Notice */}
              <div className="col-span-2 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Lưu Ý:</strong> Khách sử dụng dịch vụ lưu trú phải được đăng ký theo quy định của địa phương.
                  Các trường được đánh dấu * là bắt buộc.
                </p>
              </div>
              {/* Registration notes */}
              <div className="col-span-2 flex flex-col space-y-4">
                <Separator />
                <div className="">
                  <Label className="text-muted-foreground">Lưu ý khi nhận phòng</Label>
                  <Textarea placeholder="" />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" type="submit">
                    <CheckCircle className="size-4 mr-2" />
                    Đăng Ký tạm trú & Nhận Phòng
                  </Button>
                  <Button variant="outline" onClick={() => setIsCheckInDialogOpen(false)}>
                    Hủy
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckInFrom;
