import { z } from 'zod';

export const customerSchema = z.object({
    uid: z.string().min(1, "UID is required"),
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(1, "First name is required").max(30),
    lastName: z.string().min(1, "Last name is required").max(30),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(15)
});