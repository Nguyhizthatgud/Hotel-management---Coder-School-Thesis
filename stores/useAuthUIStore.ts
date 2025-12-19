import { create } from "zustand";
import { AuthUIType } from "@/types";

export const useAuthUIStore = create<AuthUIType>((set) => ({
  // state
  isLogin: true,
  isTopButton: true,
  isSignup: false,
  isSubmitSuccess: false,
  isOpen: false,
  isAvatar: false,
  // actions
  switchToLogin: () => set({ isLogin: true, isSignup: false }),
  switchToSignup: () => set({ isLogin: false, isSignup: true }),
  submittingSuccess: (value: boolean) => set({ isSubmitSuccess: value, isOpen: !value }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}));
