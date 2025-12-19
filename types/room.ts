import { z } from "zod";

export const RoomSchema = z.object({
    roomNumber: z.string().min(1, "Room number is required"),
    bedType: z.string().min(1, "Room type is required"),
    roomFloor: z.number().min(1, "Room floor must be at least 1"),
    roomFacilities: z.array(z.string()).optional(),
    pricePerNight: z.number().min(0, "Price per night must be non-negative"),
    isAvailable: z.boolean().default(true)
});
