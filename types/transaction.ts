import { z } from "zod";


export const TransactionSchema = z.object({
  id: z.string().uuid(),
    userId: z.string().uuid(),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
    description: z.string().min(1, "Description is required"),
    type: z.enum(["charge", "payment", "refund"]),
    amount: z.number().refine((val) => val >= 0, { message: "Amount must be non-negative" }),
    balance: z.number()
});