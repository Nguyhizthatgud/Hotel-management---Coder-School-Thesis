import axiosInstance from "./config/axios.js";

// requests go through API Gateway (http://localhost:4001/api)
// gateway forwards to room-service on port 4004

// Room service API methods using axios directly
export const roomService = {
  // Create a new room
  createRoom: async (roomData: {
    _id?: string;
    roomName: string;
    roomNumber: string;
    roomType: string;
    floor?: number;
    price: number;
    status?: string;
    capacity?: number;
    amenities?: string[];
    description?: string;
  }) => axiosInstance.post(`/rooms`, roomData).then((r) => r.data),

  // List all rooms for the authenticated user
  listRooms: async (filters?: { status?: string; floor?: number }) =>
    axiosInstance.get(`/rooms`, { params: filters }).then((r) => r.data),

  // Get a specific room by ID
  getRoom: async (roomId: string) => axiosInstance.get(`/rooms/${roomId}`).then((r) => r.data),

  // Update room (status and other fields)
  updateRoomStatus: async (
    roomId: string,
    updateData: Partial<{
      roomName: string;
      roomNumber: string;
      roomType: string;
      floor: number;
      price: number;
      status: string;
      capacity: number;
      amenities: string[];
      description: string;
    }>
  ) => axiosInstance.patch(`/rooms/${roomId}/status`, updateData).then((r) => r.data),

  // Delete a room by ID
  deleteRoom: async (roomId: string) => axiosInstance.delete(`/rooms/${roomId}`).then((r) => r.data),

  // Get room summary (statistics)
  getSummary: async () => axiosInstance.get(`/rooms/summary`).then((r) => r.data),

  // Health check (no auth required)
  healthCheck: async () => axiosInstance.get(`/health`).then((r) => r.data)
};
