import { z } from "zod";
export const residenceRegistrationSchema = z.object({
  arrivalTime: z.string().optional(),
  idCardType: z.enum(["passport", "id_card", "driver_license"]).optional(),
  idCardNumber: z
    .string()
    .min(5, "Mời nhập mã cá nhân")
    .max(12, "Mời nhập mã cá nhân hợp lệ")
    .regex(/^\d+$/, "Số định danh phải chỉ chứa chữ số"), // Add this line
  idBirthDate: z.string().optional(),
  idCardIssuedDate: z.string().optional(),
  idCardExpiryDate: z.string().optional(),
  residenceFullName: z.string().min(1, "Vui lòng nhập tên khách hàng (theo giấy tờ tùy thân)"),
  residenceAddress: z.string().min(1, "Vui lòng nhập địa chỉ thường trú (theo giấy tờ tùy thân)"),
  residenceCountry: z.string().default("Việt Nam").optional(),
  registrationNotes: z.string().optional(),
  registrationStatus: z.enum(["not_registered", "registered", "pending"]).default("pending").optional()
});
export const BookingSchema = z.object({
  _id: z.string().optional(),
  bookId: z.string().min(1, "Mã đặt phòng không được rỗng"),
  bookingSource: z.string().min(1, "Vui lòng chọn kênh đặt phòng"),
  status: z.enum(["pending", "confirmed", "Check-In", "Check-Out", "completed"]).optional(),
  guestName: z.string().min(1, "Hãy nhập tên khách"),
  guestNumber: z.string().min(1, "Hãy nhập số điện thoại khách"),
  guestEmail: z.string().email("Hãy nhập email khách hợp lệ"),
  guestAdult: z.number().min(1, "Số lượng người lớn phải lớn hơn hoặc bằng 1"),
  guestChildren: z.number().min(0, "Số lượng trẻ em phải lớn hơn hoặc bằng 0").optional(),
  guestsCount: z.number(),
  checkInDate: z.string().min(1, "Vui lòng chọn ngày check-in"),
  checkOutDate: z.string().min(1, "Vui lòng chọn ngày check-out"),
  roomId: z.string().optional(),
  roomType: z.string().min(1, "Vui lòng chọn loại phòng"),
  roomNumber: z.string().min(1, "Số phòng không được rỗng"),
  roomName: z.string().min(1, "Tên phòng không được rỗng"),
  roomPrice: z.number().optional(),
  totalPrice: z.number().optional(),
  paymentStatus: z.enum(["Đã thanh toán", "Chưa thanh toán", "Thanh toán một phần"]),
  description: z.string().max(500, "Mô tả phải có tối đa 500 ký tự").optional(),

  // temporary residence registration fields
  residenceRegistrationInfo: residenceRegistrationSchema.optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number().optional()
});

export type Bookings = z.infer<typeof BookingSchema>;
