import axiosInstance from "./config/axios.js";

const ROOM_SERVICE_URL = process.env.NEXT_PUBLIC_ROOM_SERVICE_URL || "http://localhost:4004";

// Rely on axios interceptors for token injection and 401 handling

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
  }) => axiosInstance.post(`${ROOM_SERVICE_URL}/api/rooms`, roomData).then((r) => r.data),

  // List all rooms for the authenticated user
  listRooms: async (filters?: { status?: string; floor?: number }) =>
    axiosInstance.get(`${ROOM_SERVICE_URL}/api/rooms`, { params: filters }).then((r) => r.data),

  // Get a specific room by ID
  getRoom: async (roomId: string) => axiosInstance.get(`${ROOM_SERVICE_URL}/api/rooms/${roomId}`).then((r) => r.data),

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
  ) => axiosInstance.patch(`${ROOM_SERVICE_URL}/api/rooms/${roomId}/status`, updateData).then((r) => r.data),

  // Delete a room by ID
  deleteRoom: async (roomId: string) =>
    axiosInstance.delete(`${ROOM_SERVICE_URL}/api/rooms/${roomId}`).then((r) => r.data),

  // Get room summary (statistics)
  getSummary: async () => axiosInstance.get(`${ROOM_SERVICE_URL}/api/rooms/summary`).then((r) => r.data),

  // Health check (no auth required)
  healthCheck: async () => axiosInstance.get(`${ROOM_SERVICE_URL}/health`).then((r) => r.data)
};
