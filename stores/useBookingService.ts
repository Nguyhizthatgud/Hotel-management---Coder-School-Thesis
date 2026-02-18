import { create } from "zustand";
import { bookingService } from "@/services/bookingService";
import { Bookings } from "@/types";


const applyFilters = (
  bookings: Bookings[],
  query: string,
  paymentStatus: string,
  bookingSource: string
): Bookings[] => {
  let filtered = [...bookings];
  if (paymentStatus !== "all") {
    filtered = filtered.filter((booking) => booking.paymentStatus === paymentStatus);
  }
  if (bookingSource !== "all") {
    filtered = filtered.filter((booking) => booking.bookingSource === bookingSource);
  }
  if (query.trim() !== "") {
    const lowerCaseQuery = query.toLowerCase();
    filtered = filtered.filter(
      (booking) =>
        booking.bookId.toLowerCase().includes(lowerCaseQuery) ||
        booking.guestName.toLowerCase().includes(lowerCaseQuery) ||
        booking.guestEmail.toLowerCase().includes(lowerCaseQuery) ||
        booking.roomType.toLowerCase().includes(lowerCaseQuery) ||
        booking.roomNumber.toLowerCase().includes(lowerCaseQuery) ||
        booking.paymentStatus.toLowerCase().includes(lowerCaseQuery) ||
        booking.checkInDate.toLowerCase().includes(lowerCaseQuery) ||
        booking.checkOutDate.toLowerCase().includes(lowerCaseQuery)
    );
  }
  return filtered;
};

type BookingStore = {
  //state
  bookings: Bookings[];
  loading: boolean;
  error: string | null;
  state: string;
  filteredBookings?: Bookings[];
  searchQuery: string;

  paymentStatusFilter: string; // renamed from bookingStatusFilter
  bookingSourceFilter: string;
  roomId?: string;
  roomPrice: number;
  bookingsStateCount: {
    pending: number;
    confirmed: number;
    checkIn: number;
    checkOut: number;
    completed: number;
    total: number;
  };
  //actions
  fetchBookings: () => Promise<void>;
  updateBooking: (_updatedBooking: Bookings) => Promise<void>;
  addBooking: (_newBooking: Omit<Bookings, "_id" | "createAt" | "updatedAt">) => Promise<void>;
  deleteBooking: (_bookingId: string) => Promise<void>;
  confirmBooking: (_bookingId: string) => Promise<Bookings | null>;
  setSearchQuery: (_query: string) => void;
  setPaymentStatusFilter: (_status: string) => void; // Renamed from setBookingStatusFilter
  setBookingSourceFilter: (_source: string) => void;
  setRoomId: (_roomId: string) => void;
  setRoomPrice: (_roomPrice: number) => void;
  getBookingsStateCount: () => void;


};

export const useBookingStore = create<BookingStore>((set, get) => ({
  //state
  bookings: [],
  loading: false,
  error: null,
  state: "",
  filteredBookings: [],
  searchQuery: "",
  paymentStatusFilter: "all", // Renamed from bookingStatusFilter
  bookingSourceFilter: "all",
  roomPrice: 0,
  bookingsStateCount: {
    pending: 0,
    confirmed: 0,
    checkIn: 0,
    checkOut: 0,
    completed: 0,
    total: 0,
  },
  //actions

  setRoomId: (roomId: string) => {
    set({ roomId });
  },
  setRoomPrice: (roomPrice: number) => {
    set({ roomPrice });
  },
  getBookingsStateCount: () => { 
    const bookings = get().bookings;
    const counts = {
      pending: 0,
      confirmed: 0,
      checkIn: 0,
      checkOut: 0,
      completed: 0,
      total: 0
    };
    
    bookings.forEach(booking => {
      if (booking.status === "pending") counts.pending++;
      else if (booking.status === "confirmed") counts.confirmed++;
      else if (booking.status === "Check-In") counts.checkIn++;
      else if (booking.status === "Check-Out") counts.checkOut++;
      else if (booking.status === "completed") counts.completed++;
    });
    
    counts.total = bookings.length;
    set({ bookingsStateCount: counts });
  },
  fetchBookings: async () => {
    set({ loading: true, error: null });
    try {
      const bookings = await bookingService.listBookings();
   
      set({ bookings, filteredBookings: bookings, loading: false });
      get().getBookingsStateCount();
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  updateBooking: async (updatedBooking: Bookings) => {
    set({ loading: true, error: null });
    try {
      const {
        _id: _unusedId,
        createdAt: _createdAt,
        updatedAt: _updatedAt,
        __v: _v,
        ...updateData
      } = updatedBooking as any;
      // map alias bookingStatus -> status if present
      if ("bookingStatus" in updateData && !("status" in updateData)) {
        (updateData as any).status = (updateData as any).bookingStatus;
        delete (updateData as any).bookingStatus;
      }
      const serverUpdated = await bookingService.updateBooking(updatedBooking.bookId, updateData);
      const bookings = get().bookings.map((booking) =>
        booking.bookId === updatedBooking.bookId ? serverUpdated : booking
      );
      const filteredBookings = applyFilters(
        bookings,
        get().searchQuery,
        get().paymentStatusFilter,
        get().bookingSourceFilter
      );
      set({ bookings, filteredBookings, loading: false });
      get().getBookingsStateCount();
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  addBooking: async (newBooking: Omit<Bookings, "_id" | "createAt" | "updatedAt">) => {
    set({ loading: true, error: null });
    try {
      const { __v, ...bookingData } = newBooking;
      const createdBooking = await bookingService.createBooking(bookingData);
      const bookings = [...get().bookings, createdBooking];
      const filteredBookings = applyFilters(
        bookings,
        get().searchQuery,
        get().paymentStatusFilter,
        get().bookingSourceFilter
      );
      set({ bookings, filteredBookings, loading: false });
      get().getBookingsStateCount();
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  deleteBooking: async (bookingId: string) => {
    set({ loading: true, error: null });
    try {
      await bookingService.deleteBooking(bookingId);
      const bookings = get().bookings.filter((booking) => booking.bookId !== bookingId);
      const filteredBookings = applyFilters(
        bookings,
        get().searchQuery,
        get().paymentStatusFilter,
        get().bookingSourceFilter
      );
      set({ bookings, filteredBookings, loading: false });
      get().getBookingsStateCount();
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  confirmBooking: async (bookingId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await bookingService.confirmBooking(bookingId);
      const confirmedBooking = (response as any).booking ?? response;
      const { searchQuery, paymentStatusFilter, bookingSourceFilter } = get();

      let bookings = get().bookings;
      if (confirmedBooking) {
        bookings = bookings.filter((booking) => {
          const overlaps =
            booking.roomId === confirmedBooking.roomId &&
            new Date(booking.checkInDate) < new Date(confirmedBooking.checkOutDate) &&
            new Date(booking.checkOutDate) > new Date(confirmedBooking.checkInDate) &&
            booking.bookId !== confirmedBooking.bookId;
          return !overlaps;
        });

        const existingIndex = bookings.findIndex((booking) => booking.bookId === confirmedBooking.bookId);
        if (existingIndex >= 0) {
          bookings[existingIndex] = confirmedBooking;
        } else {
          bookings = [...bookings, confirmedBooking];
        }
      }

      const filteredBookings = applyFilters(bookings, searchQuery, paymentStatusFilter, bookingSourceFilter);
      set({ bookings, filteredBookings, loading: false });
      get().getBookingsStateCount();
      return confirmedBooking ?? null;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  setSearchQuery: (query: string) => {
    const { bookings, paymentStatusFilter, bookingSourceFilter } = get();
    const filteredBookings = applyFilters(bookings, query, paymentStatusFilter, bookingSourceFilter);
    set({ searchQuery: query, filteredBookings });
  },
  setPaymentStatusFilter: (status: string) => {
    // Renamed from setBookingStatusFilter
    const { bookings, searchQuery, bookingSourceFilter } = get();
    const filteredBookings = applyFilters(bookings, searchQuery, status, bookingSourceFilter);
    set({ paymentStatusFilter: status, filteredBookings });
  },
  setBookingSourceFilter: (source: string) => {
    const { bookings, searchQuery, paymentStatusFilter } = get();
    const filteredBookings = applyFilters(bookings, searchQuery, paymentStatusFilter, source);
    set({ bookingSourceFilter: source, filteredBookings });
  }
}));
