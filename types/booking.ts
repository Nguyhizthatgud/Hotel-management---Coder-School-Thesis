import { z } from "zod";
export const BookingSchema = z.object({
    roomtype: z.string().min(1, "Room type is required"),
    deals: z.string().optional(),
    cancelationPolicy: z.string().optional(),
    checkInDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid check-in date" }),
    checkOutDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid check-out date" }),
    numberOfGuests: z.number().min(1, "At least one guest is required"),
    specialRequests: z.string().optional()
    
});