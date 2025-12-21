import { z } from "zod";

export const RoomSchema = z.object({
  id: z.string().optional(),
  ownerId: z.string().optional(),
  roomName: z.string().min(1, "Room name is required"),
  roomType: z.string().min(1, "Room type is required"),
  floor: z.number().min(1, "Room floor must be at least 1"),
  status: z.enum(["available", "occupied", "cleaning", "maintenance"]).default("available"),
  price: z.number().min(0, "Price must be non-negative"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  amenities: z.array(z.string()).optional(),
  description: z.string().max(500, "Description must be at most 500 characters").optional(),
  isActive: z.boolean().default(true),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number().optional()
});

export type Room = z.infer<typeof RoomSchema>;
