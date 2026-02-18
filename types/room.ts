import { z } from "zod";

export const RoomSchema = z.object({
  _id: z.string(),
  roomNumber: z.string().min(1, "Hãy nhập số phòng"),
  roomName: z.string().min(1, "Hãy nhập tên phòng"),
  roomType: z.string().min(1, "Hãy nhập loại phòng"),
  floor: z.number().min(1, "Tầng phòng phải lớn hơn hoặc bằng 1"),
  status: z.enum(["còn trống", "đã đặt trước", "đang sử dụng", "bảo trì", "đang dọn dẹp"]),
  price: z.number().min(0, "Giá phòng phải lớn hơn hoặc bằng 0"),
  capacity: z.number().min(1, "Sức chứa phải lớn hơn hoặc bằng 1"),
  amenities: z.array(z.string()),
  description: z.string().max(500, "Mô tả phải có tối đa 500 ký tự").optional(),
  createAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number().optional()
});

export type Room = z.infer<typeof RoomSchema>;
