import { create } from "zustand";

export const useLoginSignUpStore = create((set) => ({
  login: () => set({ isLogin: true }),
  Logout: () => set({ isLogin: false })
}));
