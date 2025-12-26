import { create } from "zustand";

type UIState = {
  isSidebarOpen: boolean;

  propSelection: string; //---> selection for Header dropdown properties
  setPropSelection: (selection: string) => void; //---> set property selection for Header dropdown properties

  isCreateRoom: boolean; // ----> open rooms add dialog
  setIsCreateRoom: (open: boolean) => void; // ---->open set rooms add dialog

  isEditingRoom: boolean; // ----> whether editing an existing room or adding a new one
  setIsEditingRoom: (editing: boolean) => void; // ----> set editing room state
};

export const useUISlice = create<UIState>((set) => ({
  isSidebarOpen: false,

  propSelection: "tất cả cơ sở lưu trú", //---> selection for Header dropdown properties
  setPropSelection: (selection: string) => set({ propSelection: selection }), //---> set property selection for Header dropdown properties

  isCreateRoom: false, // ----> open rooms add dialog
  setIsCreateRoom: (open: boolean) => set({ isCreateRoom: open }), // ---->open set rooms add dialog

  isEditingRoom: false, // ----> whether editing an existing room (true) or adding a new one (false)
  setIsEditingRoom: (editing: boolean) => set({ isEditingRoom: editing }) // ----> set editing room state
}));
