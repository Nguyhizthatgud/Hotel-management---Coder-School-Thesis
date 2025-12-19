import { useAuthStore } from "@/stores/useAuthStore";

const ROOM_SERVICE_URL = process.env.NEXT_PUBLIC_ROOM_SERVICE_URL || "http://localhost:4004";

// call room-service with automatic token injection
export async function callRoomService(path: string, init?: RequestInit) {
  // Get token from auth store
  const token = await useAuthStore.getState().getToken();

  if (!token) {
    throw new Error("No authentication token available");
  }

  const headers = {
    ...(init?.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const response = await fetch(`${ROOM_SERVICE_URL}${path}`, {
    ...init,
    headers
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Room service error: ${response.status} ${errorText}`);
  }

  return response.json();
}

// room service API methods
export const roomService = { 
  // Create a new room
  createRoom: async (roomData: {
    roomNumber: string;
    type: string;
    floor?: number;
    price: number;
    status?: string;
    capacity?: number;
    amenities?: string[];
    description?: string;
  }) => {
    return callRoomService("/api/rooms", {
      method: "POST",
      body: JSON.stringify(roomData)
    });
  },

  // List all rooms for the authenticated user
  listRooms: async (filters?: { status?: string; floor?: number }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.floor) params.append("floor", filters.floor.toString());

    const query = params.toString() ? `?${params.toString()}` : "";
    return callRoomService(`/api/rooms${query}`);
  },

  // Get a specific room by ID
  getRoom: async (roomId: string) => {
    return callRoomService(`/api/rooms/${roomId}`);
  },

  // Update room status
  updateRoomStatus: async (roomId: string, status: string) => {
    return callRoomService(`/api/rooms/${roomId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });
  },

  // Get room summary (statistics)
  getSummary: async () => {
    return callRoomService("/api/rooms/summary");
  },

  // Health check
  healthCheck: async () => {
    return fetch(`${ROOM_SERVICE_URL}/health`).then((r) => r.json());
  }
};

export default roomService;
