import axiosInstance from "./config/axios.js";

// All requests go through API Gateway (http://localhost:4001/api)
// Gateway forwards to booking-service on port 4003
export const bookingService = {
  // Create a new booking
  createBooking: async (bookingData: any) => axiosInstance.post(`/bookings`, bookingData).then((r) => r.data),

  // List all bookings for the authenticated user
  listBookings: async (filter?: { status?: string; checkInDate?: string; checkOutDate?: string }) =>
    axiosInstance.get(`/bookings`, { params: filter }).then((r) => r.data),

  // Get a specific booking by ID
  getBooking: async (bookingId: string) => axiosInstance.get(`/bookings/${bookingId}`).then((r) => r.data),
  // Update booking fields
  updateBooking: async (
    bookingId: string,
    updateData: Partial<{
      status: string;
      bookingStatus: string; // alias supported by backend
      guestName: string;
      guestNumber: string;
      guestEmail: string;
      guestAdult: number;
      guestChildren: number;
      paymentStatus: string;
      bookingSource: string;
      description: string;
      residenceRegistrationInfo: any;
    }>
  ) => axiosInstance.patch(`/bookings/${bookingId}`, updateData).then((r) => r.data),
  // Delete a booking by ID
  deleteBooking: async (bookingId: string) => axiosInstance.delete(`/bookings/${bookingId}`).then((r) => r.data),

  // Confirm a booking and clean up competing reservations
  confirmBooking: async (bookingId: string) =>
    axiosInstance.patch(`/bookings/${bookingId}/confirm`).then((r) => r.data),
  // Check-in guest with registration data
  checkInGuest: async (bookingId: string, registrationData: any) =>
    axiosInstance
      .patch(`/bookings/${bookingId}/check-in`, { residenceRegistrationInfo: registrationData })
      .then((r) => r.data)
};

export default bookingService;
