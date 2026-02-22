import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Banknote, Printer, Receipt, Wallet } from "lucide-react";
import React, { useMemo } from "react";
import { useRoomStore } from "../../../stores/useRoomService";
import { CreditCard } from "lucide-react";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import { Bookings } from "@/types/booking";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import transactionService from "@/services/transactionService";
import { useBookingStore } from "@/stores/useBookingService";
import { useTranslation } from "react-i18next";
type PointOfSalesProps = {
  reservation: Bookings;
  onClose: () => void;
};

const PointOfSales = ({ reservation, onClose }: PointOfSalesProps) => {
  const { rooms, fetchRooms } = useRoomStore();
  const { updateBooking } = useBookingStore();
  const [amountReceived, setAmountReceived] = React.useState(0);
  const [discountType, setDiscountType] = React.useState<"percentage" | "fixed">("percentage");
  const [discount, setDiscount] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = React.useState<"cash" | "card" | "mobile">("cash");

  React.useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);
  const currentPos = useMemo(() => {
    if (reservation && rooms.length > 0) {
      const bookedRoom = rooms.find((room) => room._id === reservation.roomId);
      return {
        guestName: reservation.guestName,
        checkInDate: reservation.checkInDate,
        checkOutDate: reservation.checkOutDate,
        roomId: reservation.roomId,
        roomNumber: bookedRoom ? bookedRoom.roomNumber : "N/A",
        roomType: bookedRoom ? bookedRoom.roomType : "N/A",
        price: bookedRoom ? bookedRoom.price : 0,

        amenities: bookedRoom ? bookedRoom.amenities : [],
        capacity: bookedRoom?.capacity,
        description: bookedRoom?.description,
        status: bookedRoom?.status
      };
    }
  }, [reservation, rooms]);
  const { t } = useTranslation();
  const receiptFormSchema = z.object({
    items: z.array(
      z.object({
        id: z.string(),
        description: z.string(),
        unitPrice: z.number(),
        total: z.number()
      })
    ),
    amountReceived: z.number().optional(),
    charger: z.number().optional()
  });
  // Transform amenities to items with prices
  const items = React.useMemo(() => {
    // Default prices for amenities
    const amenityPrices: Record<string, number> = {
      WiFi: 30,
      TV: 3000,
      "Điều hòa": 3000,
      "Tủ lạnh": 3000,
      "Ấm đun nước": 5000,
      "Dịch vụ phòng": 100000,
      "Dịch vụ giặt ủi": 10000,
      "Thuê xe": 100000
    };
    return (currentPos?.amenities || []).map((amenity, index) => {
      const price = amenityPrices[amenity] || 0;
      return {
        id: `item-${index}`,
        description: amenity,
        unitPrice: price,
        total: price
      };
    });
  }, [currentPos?.amenities]);
  const { register, handleSubmit, control, reset } = useForm<z.infer<typeof receiptFormSchema>>({
    resolver: zodResolver(receiptFormSchema),
    mode: "onChange",
    defaultValues: {
      items: items,
      amountReceived: 0
    }
  });

  // Reset form when items change (amenities from booking change)
  React.useEffect(() => {
    reset({ items: items });
  }, [items, reset]);

  // Watch form values to get real-time updates
  const watchedItems = useWatch({
    control,
    name: "items"
  });

  // Calculate reservation total price (room charge)
  const nights = Math.ceil(
    (new Date(reservation.checkOutDate).getTime() - new Date(reservation.checkInDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  const reservationTotalPrice = reservation.totalPrice || 0;

  // Calculate total from watched form values
  const calculateTotal = React.useMemo(() => {
    return (watchedItems || items).reduce((sum, item) => sum + (item.unitPrice || 0), 0);
  }, [watchedItems, items]);

  // Calculate grand total (room + amenities)
  const grandTotal = reservationTotalPrice + calculateTotal;
  // Calculate change for cash payment
  const changer = amountReceived - grandTotal >= 0 ? amountReceived - grandTotal : 0;

  const discountAmount = discountType === "percentage" ? (grandTotal * discount) / 100 : discount;
  const taxRate = 0.1; // 10% tax
  const taxAmount = (grandTotal - discountAmount) * taxRate;

  // processing

  const transactionId = React.useMemo(() => `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, []);
  const invoiceId = transactionId; // Use transactionId as invoiceId

  // Map payment method to Transaction enum
  const paymentMethodMap: Record<string, string> = {
    cash: "cash",
    card: "credit-card",
    mobile: "bank-transfer"
  };

  const onSubmit = async (data: z.infer<typeof receiptFormSchema>) => {
    const now = new Date();
    const time = now.toLocaleTimeString("vi-VN");
    const finalItems = data.items.map((item) => ({
      ...item,
      total: item.unitPrice
    }));
    const transaction = {
      // Transaction model fields
      reservationId: reservation.bookId,
      transactionId,
      date: now,
      time,
      guestName: reservation.guestName,
      guestNumber: reservation.guestNumber,
      guestEmail: reservation.guestEmail,
      invoiceId: invoiceId,
      type: "charge",
      category: "room_charge",
      amount: grandTotal,
      paymentMethod: paymentMethodMap[paymentMethod],
      status: "completed",
      description: JSON.stringify({
        roomNumber: reservation.roomNumber,
        roomType: reservation.roomType,
        nightsStay: nights,
        reservationTotalPrice,
        taxAmount,
        discountAmount,
        serviceTotal: calculateTotal,
        items: finalItems,
        // Include cash payment details if applicable
        ...(paymentMethod === "cash" && {
          amountReceived,
          changer
        })
      })
    };

    try {
      await transactionService.createTransaction(transaction);

      // Update booking payment status using store method
      await updateBooking({
        ...reservation,
        paymentStatus: "Đã thanh toán"
      });

      toast.success(t("booking_pos_toast_success"));
      onClose();
    } catch (error: any) {
      console.error("Transaction error:", error);
      toast.error(error?.response?.data?.message || t("booking_pos_toast_error"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 p-3 gap-6 overflow-y-scroll">
      {/* Products Section */}
      <div className="col-span-3 space-y-4">
        {/* Search and Filter */}

        <Card>
          <CardHeader>
            <CardTitle>Hóa đơn thanh toán</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Mã hóa đơn #:</span>
              <span className="text-sm font-mono font-semibold">{invoiceId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Ngày:</span>
              <span className="text-sm font-medium">
                {new Date().toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
              </span>
            </div>
            <Separator orientation="horizontal" />
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-sm mb-2 text-gray-700">THÔNG TIN KHÁCH HÀNG</h3>
                <div className="space-y-1 text-sm">
                  <div>
                    <strong>Họ tên:</strong>
                    <span className="float-right">{reservation.guestName}</span>
                  </div>
                  <div>
                    <strong>Điện thoại:</strong> <span className="float-right">{reservation.guestNumber}</span>
                  </div>
                  <div>
                    <strong>Số người:</strong> <span className="float-right">{reservation.guestAdult}</span>
                  </div>
                  {reservation.guestEmail && (
                    <div>
                      <strong>Email:</strong> <span className="float-right">{reservation.guestEmail}</span>
                    </div>
                  )}
                  {reservation.residenceRegistrationInfo?.residenceAddress && (
                    <div>
                      <strong>Địa chỉ:</strong>{" "}
                      <span className="float-right">{reservation.residenceRegistrationInfo.residenceAddress}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-l pl-4">
                <h3 className="font-semibold text-sm mb-2 text-gray-700">THÔNG TIN ĐẶT PHÒNG</h3>
                <div className="space-y-1 text-sm">
                  <div>
                    <strong>Số phòng:</strong> <span className="float-right">{reservation.roomNumber}</span>
                  </div>
                  <div>
                    <strong>Nhận phòng:</strong>
                    <span className="float-right">{new Date(reservation.checkInDate).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div>
                    <strong>Trả phòng:</strong>{" "}
                    <span className="float-right">
                      {new Date(reservation.checkOutDate).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <div>
                    <strong>Số ngày thuê:</strong>{" "}
                    <span className="float-right">
                      {Math.ceil(
                        (new Date(reservation.checkOutDate).getTime() - new Date(reservation.checkInDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      ngày
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-3 lg:col-span-2 space-y-4">
        {/* Product Grid */}
        <Card className="">
          <CardHeader>
            <CardTitle>Hạng mục thanh toán</CardTitle>
            <CardDescription>Chọn dịch vụ để thêm vào hóa đơn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full overflow-y-scroll table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-left text-sm font-medium">STT</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Dịch vụ</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Đơn giá</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Thành tiền</th>
                    <th className="px-4 py-2 text-left text-sm font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-2 text-sm">{index + 1}</td>
                      <td className="px-4 py-2 text-sm">{item.description}</td>
                      <td className="px-4 py-2 text-sm font-bold">
                        <input
                          id={`unitPrice-${index}`}
                          type="number"
                          step="1000"
                          min="0"
                          defaultValue={item.unitPrice}
                          className="w-32 px-2 py-1 border rounded text-left"
                          {...register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                        />
                      </td>
                      <td className="px-4 py-2 text-sm font-medium">
                        {new Intl.NumberFormat("vi-VN").format(watchedItems?.[index]?.unitPrice || 0)}đ
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t font-semibold">
                    <td className="px-6 py-2 text-sm"></td>
                    <td className="px-4 py-2 text-sm">Tiền phòng ({nights} ngày)</td>
                    <td className="px-4 py-2 text-sm font-bold">
                      {new Intl.NumberFormat("vi-VN").format(reservation.totalPrice || 0)}đ
                    </td>
                    <td className="px-4 py-2 text-sm font-medium">
                      {new Intl.NumberFormat("vi-VN").format(reservationTotalPrice)}đ
                    </td>
                    <td className="px-4 py-2"></td>
                  </tr>
                  <tr className="border-t font-semibold">
                    <td className="px-6 py-2 text-sm"></td>
                    <td className="px-4 py-2 text-sm">Thuế VAT (10%):</td>
                    <td className="px-4 py-2 text-sm font-bold"></td>
                    <td className="px-4 py-2 text-sm font-medium">
                      {new Intl.NumberFormat("vi-VN").format(taxAmount)}đ
                    </td>
                    <td className="px-4 py-2"></td>
                  </tr>
                  <tr className="border-t font-semibold">
                    <td className="px-6 py-2 text-sm"></td>
                    <td className="px-4 py-2 text-sm">Chiết khấu:</td>
                    <td className="px-4 py-2 text-sm font-bold">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            step="1"
                            min="0"
                            max="100"
                            value={discountType === "percentage" ? discount : ""}
                            onChange={(e) => {
                              setDiscountType("percentage");
                              setDiscount(Number(e.target.value));
                            }}
                            placeholder="0"
                            className="w-16 px-2 py-1 border rounded text-left"
                          />
                          <span className="text-xs">%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            step="1000"
                            min="0"
                            value={discountType === "fixed" ? discount : ""}
                            onChange={(e) => {
                              setDiscountType("fixed");
                              setDiscount(Number(e.target.value));
                            }}
                            placeholder="0"
                            className="w-24 px-2 py-1 border rounded text-left"
                          />
                          <span className="text-xs">đ</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm font-medium">
                      -{new Intl.NumberFormat("vi-VN").format(discountAmount)}đ
                    </td>
                    <td className="px-4 py-2"></td>
                  </tr>
                  <tr className="border-t-2 bg-yellow-50 font-semibold">
                    <td className="px-6 py-3"></td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3 text-right">Tổng dịch vụ:</td>
                    <td className="px-4 py-3 text-left">{new Intl.NumberFormat("vi-VN").format(calculateTotal)}đ</td>
                    <td className="px-4 py-3"></td>
                  </tr>
                  <tr className="border-t-2 bg-orange-100 font-bold">
                    <td className="px-6 py-3"></td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3 text-right">TỔNG CỘNG:</td>
                    <td className="px-4 py-3 text-left">{new Intl.NumberFormat("vi-VN").format(grandTotal)}đ</td>
                    <td className="px-4 py-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Cart Section */}
      <div className="col-span-3 lg:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Phương thức thanh toán</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as "cash" | "card" | "mobile")}
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="cash">
                  <Banknote className="size-4 mr-1" />
                  <span className="text-xs">Tiền mặt</span>
                </TabsTrigger>
                <TabsTrigger value="card">
                  <CreditCard className="size-4 mr-1" />
                  <span className="text-xs">Thẻ</span>
                </TabsTrigger>
                <TabsTrigger value="mobile">
                  <Wallet className="size-4 mr-1" />
                  <span className="text-xs">E-banking</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="space-y-3 mt-4">
                <div>
                  <Label>Card Number</Label>
                  <Input placeholder="**** **** **** 1234" maxLength={19} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Expiry</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label>CVV</Label>
                    <Input placeholder="123" maxLength={3} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cash" className="space-y-3 mt-4">
                <div>
                  <Label>Thực nhận</Label>
                  <Input
                    value={amountReceived > 0 ? amountReceived : ""}
                    onChange={(e) => setAmountReceived(Number(e.target.value))}
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="đ"
                  />
                </div>
                {amountReceived > 0 && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between font-medium">
                      <span>Trả lại tiền thừa:</span>
                      <span className="text-lg text-green-600 dark:text-green-400">
                        {new Intl.NumberFormat("vi-VN").format(changer)}đ
                      </span>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="mobile" className="space-y-3 mt-4">
                <div>
                  <Label>Mobile Banking</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applepay">Apple Pay</SelectItem>
                      <SelectItem value="googlepay">Google Pay</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input placeholder="+1 (555) 000-0000" />
                </div>
              </TabsContent>
            </Tabs>
            {/* action buttons */}
            <Button
              className="w-full h-12 text-base"
              size="lg"
              disabled={paymentMethod === "cash" && amountReceived < grandTotal}
              type="submit"
            >
              <Receipt className="size-5 mr-2" />
              Thanh toán -{new Intl.NumberFormat("vi-VN").format(grandTotal)}đ
            </Button>
            {paymentMethod === "cash" && amountReceived < grandTotal && (
              <p className="text-sm text-red-600">Số tiền nhận chưa đủ để thanh toán hóa đơn.</p>
            )}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="lg">
                <Printer className="size-4 mr-2" />
                In hóa đơn
              </Button>
              <Button variant="outline" size="lg" onClick={onClose}>
                Hủy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

export default PointOfSales;
