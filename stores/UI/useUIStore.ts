import { create } from "zustand";

type UIState = {
  isSidebarOpen: boolean;

  propSelection: string; //---> selection for Header dropdown properties
  setPropSelection: (selection: string) => void; //---> set property selection for Header dropdown properties

  isCreateRoom: boolean; // ----> open rooms add dialog
  setIsCreateRoom: (open: boolean) => void; // ---->open set rooms add dialog

  isEditingRoom: boolean; // ----> whether editing an existing room or adding a new one
  setIsEditingRoom: (editing: boolean) => void; // ----> set editing room state

  isCreateBooking: boolean; // ----> open bookings add dialog
  setIsCreateBooking: (open: boolean) => void; // ----> open set bookings add dialog

  isShowBooking: boolean; // ----> open bookings view dialog
  setIsShowBooking: (open: boolean) => void; // ----> open set bookings view dialog

  isDatePickerCIOpen: boolean; // ----> open date picker for Check-In dialog
  setIsDatePickerCIOpen: (open: boolean) => void; // ----> open set date picker for Check-In dialog

  isDatePickerCOOpen: boolean; // ----> open date picker for Check-Out dialog
  setIsDatePickerCOOpen: (open: boolean) => void; // ----> open set date picker for Check-Out dialog

  isEditingBooking: boolean; // ----> whether editing an existing booking or adding a new one
  setIsEditingBooking: (editing: boolean) => void; // ----> set editing booking state

  isConfirmationTicketOpen: boolean; // ----> whether the confirmation booking ticket dialog is open
  setIsConfirmationTicketOpen: (open: boolean) => void; // ----> set confirmation booking ticket dialog state

  isCheckInDialogOpen: boolean; // ----> whether the Check-In dialog is open
  setCheckInDialogOpen: (open: boolean) => void; // ----> set Check-In dialog state
  isCheckOutDialogOpen: boolean; // ----> whether the Check-Out dialog is open
  setCheckOutDialogOpen: (open: boolean) => void; // ----> set Check-Out dialog state

  isPOSCheckoutOpen: boolean; // ----> whether the POS Checkout drawer is open
  setIsPOSCheckoutOpen: (open: boolean) => void; // ----> set POS Checkout drawer state

  isBillOpen: boolean; // ----> whether the Bill dialog is open
  setIsBillOpen: (open: boolean) => void; // ----> set Bill dialog state

  hotelTheme: "light" | "dark"; // ----> hotel reception theme mode
  setHotelTheme: (theme: "light" | "dark") => void; // ----> set hotel reception theme mode

  // Image loading state for pages
  isPageLoading: boolean; // ----> whether page images are loading
  initImageLoading: (totalImages: number) => void; // ----> initialize image loading counter
  onImageLoaded: () => void; // ----> call when each image loads
  resetImageLoading: () => void; // ----> reset loading state for next page
  imageLoadCount: number; // ----> current count of loaded images
  totalImageCount: number; // ----> total images to load on page
};

export const useUISlice = create<UIState>((set) => ({
  isSidebarOpen: false,

  propSelection: "tất cả cơ sở lưu trú", //---> selection for Header dropdown properties
  setPropSelection: (selection: string) => set({ propSelection: selection }), //---> set property selection for Header dropdown properties

  isCreateRoom: false, // ----> open rooms add dialog
  setIsCreateRoom: (open: boolean) => set({ isCreateRoom: open }), // ---->open set rooms add dialog

  isEditingRoom: false, // ----> whether editing an existing room (true) or adding a new one (false)
  setIsEditingRoom: (editing: boolean) => set({ isEditingRoom: editing }), // ----> set editing room state

  isEditingBooking: false, // ----> whether editing an existing booking (true) or adding a new one (false)
  setIsEditingBooking: (editing: boolean) => set({ isEditingBooking: editing }), // ----> set editing booking state

  isShowBooking: false, // ----> open bookings view dialog
  setIsShowBooking: (open: boolean) => set({ isShowBooking: open }), // ----> open set bookings view dialog

  isCreateBooking: false, // ----> open bookings add dialog
  setIsCreateBooking: (open: boolean) => set({ isCreateBooking: open }), // ----> open set bookings add dialog

  isDatePickerCIOpen: false, // ----> open date picker for Check-In dialog
  setIsDatePickerCIOpen: (open: boolean) => set({ isDatePickerCIOpen: open }), // ----> open set date picker for Check-In dialog

  isDatePickerCOOpen: false, // ----> open date picker for Check-Out dialog
  setIsDatePickerCOOpen: (open: boolean) => set({ isDatePickerCOOpen: open }), // ----> open set date picker for Check-Out dialog

  isConfirmationTicketOpen: false, // ----> whether the confirmation booking ticket dialog is open
  setIsConfirmationTicketOpen: (open: boolean) => set({ isConfirmationTicketOpen: open }), // ----> set confirmation booking ticket dialog state

  isCheckInDialogOpen: false, // ----> whether the Check-In dialog is open
  setCheckInDialogOpen: (open: boolean) => set({ isCheckInDialogOpen: open }), // ----> set Check-In dialog state

  isCheckOutDialogOpen: false, // ----> whether the Check-Out dialog is open
  setCheckOutDialogOpen: (open: boolean) => set({ isCheckOutDialogOpen: open }), // ----> set Check-Out dialog state

  isPOSCheckoutOpen: false, // ----> whether the POS Checkout drawer is open
  setIsPOSCheckoutOpen: (open: boolean) => set({ isPOSCheckoutOpen: open }), // ----> set POS Checkout drawer state
  isBillOpen: false, // ----> whether the Bill dialog is open
  setIsBillOpen: (open: boolean) => set({ isBillOpen: open }), // ----> set Bill dialog state

  hotelTheme: "light", // ----> hotel reception theme mode
  setHotelTheme: (theme: "light" | "dark") => set({ hotelTheme: theme }), // ----> set hotel reception theme mode

  // Image loading state
  isPageLoading: false,
  imageLoadCount: 0,
  totalImageCount: 0,

  initImageLoading: (totalImages: number) =>
    set({
      isPageLoading: true,
      imageLoadCount: 0,
      totalImageCount: totalImages
    }),

  onImageLoaded: () =>
    set((state) => {
      const newCount = state.imageLoadCount + 1;
      const isLoaded = newCount >= state.totalImageCount;
      return {
        imageLoadCount: newCount,
        isPageLoading: !isLoaded // Stop loading when all images are done
      };
    }),

  resetImageLoading: () =>
    set({
      isPageLoading: false,
      imageLoadCount: 0,
      totalImageCount: 0
    })
}));
