import { create } from "zustand";

type UIState = {
  isSidebarOpen: boolean;
  propSelection: string;
  setPropSelection: (selection: string) => void;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

export const useUISlice = create<UIState>((set) => ({
  isSidebarOpen: false,
  propSelection: "tất cả cơ sở lưu trú",
  setPropSelection: (selection: string) => set({ propSelection: selection }),
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
}));
