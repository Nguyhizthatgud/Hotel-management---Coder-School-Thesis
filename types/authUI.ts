import { z } from "zod";

export const AuthUISchema = z.object({
  // state types
  isSubmitSuccess: z.boolean(),
  isSignup: z.boolean(),
  isLogin: z.boolean(),
  isOpen: z.boolean(),
  // action types
  switchToLogin: () => z.void(),
  switchToSignup: () => z.void(),
  submittingSuccess: () => z.void(),
  open: () => z.void(),
  close: () => z.void()
});

export type AuthUIType = z.infer<typeof AuthUISchema>;
