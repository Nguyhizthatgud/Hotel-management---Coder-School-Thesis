import { z } from "zod";

export const TransactionSchema = z.object({
  _id: z.string().optional(),
  transactionId: z.string(),
  invoiceId: z.string(),
  bookingId: z.string().optional(),
  date: z.string().or(z.date()),
  time: z.string(),
  guestName: z.string(),
  guestNumber: z.string(),
  guestEmail: z.string(),
  type: z.enum(["charge", "refund", "payment"]),
  category: z.enum(["room_charge", "service_charge", "deposit", "other"]),
  amount: z.number(),
  paymentMethod: z.enum(["cash", "credit-card", "bank-transfer"]),
  status: z.enum(["pending", "completed", "failed", "cancelled"]).default("pending"),
  description: z.string().optional(),
  reservationId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});

export type Transaction = z.infer<typeof TransactionSchema>;

// Type for parsed description (from POS)
export type TransactionDescription = {
  roomNumber: string;
  roomType: string;
  nightsStay: number;
  reservationTotalPrice: number;
  taxAmount: number;
  discountAmount: number;
  serviceTotal: number;
  items: Array<{
    id: string;
    description: string;
    unitPrice: number;
    total: number;
  }>;
  // Cash payment fields
  amountReceived?: number;
  charger?: number;
};
