import { create } from "zustand";
import { roomService } from "@/services/roomService";
import { Room } from "@/types";

const applyFilters = (rooms: Room[], query: string, status: string): Room[] => {
  let filtered = [...rooms];
  if (status !== "all") {
    filtered = filtered.filter((room) => room.status === status);
  }
  if (query.trim() !== "") {
    const lowerCaseQuery = query.toLowerCase();
    filtered = filtered.filter(
      (room) =>
        room.roomName.toLowerCase().includes(lowerCaseQuery) ||
        room.status.toLowerCase().includes(lowerCaseQuery) ||
        room.roomType.toLowerCase().includes(lowerCaseQuery) ||
        room.price.toString().includes(lowerCaseQuery) ||
        room.roomNumber.toString().includes(lowerCaseQuery) ||
        room.floor.toString().includes(lowerCaseQuery)
    );
  }
  return filtered;
};

type RoomStore = {
  //state
  rooms: Room[];
  loading: boolean;
  error: string | null;
  filteredRooms?: Room[];
  searchQuery: string;
  statusFilter: string;

  //actions
  fetchRooms: () => Promise<void>;
  updateRoom: (_updatedRoom: Room) => Promise<void>;
  addRoom: (_newRoom: Omit<Room, "_id" | "createAt" | "updatedAt">) => Promise<void>;
  deleteRoom: (_roomId: string) => Promise<void>;
  setSearchQuery: (_query: string) => void;
  setStatusFilter: (_status: string) => void;
};
export const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: [],
  loading: false,
  error: null,
  filteredRooms: [],
  searchQuery: "",
  statusFilter: "all",

  fetchRooms: async () => {
    set({ loading: true, error: null });

    try {
      const rooms = await roomService.listRooms();
      set({ rooms, filteredRooms: rooms, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  updateRoom: async (updatedRoom: Room) => {
    set({ loading: true, error: null });
    try {
      const { _id, createAt, updatedAt, __v, ...updateData } = updatedRoom;
      const room = await roomService.updateRoomStatus(_id, updateData);
      const newRooms = get().rooms.map((r) => (r._id === room._id ? room : r));
      const { searchQuery, statusFilter } = get();
      const filteredRooms = applyFilters(newRooms, searchQuery, statusFilter);
      set({ rooms: newRooms, filteredRooms, loading: false });
    } catch (error: any) {
      const message = error?.response?.data?.error || error.message || "Lỗi cập nhật thông tin phòng";
      set({ error: message, loading: false });
      throw error;
    }
  },
  addRoom: async (newRoom) => {
    set({ loading: true, error: null });
    try {
      const createdRoom = await roomService.createRoom(newRoom);
      const newRooms = [...get().rooms, createdRoom];
      const { searchQuery, statusFilter } = get();
      const filteredRooms = applyFilters(newRooms, searchQuery, statusFilter);
      set({ rooms: newRooms, filteredRooms, loading: false });
    } catch (error: any) {
      const message = error?.response?.data?.error || error.message || "Lỗi thêm phòng mới";
      set({ error: message, loading: false });
      throw error;
    }
  },
  deleteRoom: async (roomId: string) => {
    set({ loading: true, error: null });
    try {
      await roomService.deleteRoom(roomId);
      const newRooms = get().rooms.filter((r) => r._id !== roomId);
      const { searchQuery, statusFilter } = get();
      const filteredRooms = applyFilters(newRooms, searchQuery, statusFilter);
      set({ rooms: newRooms, filteredRooms, loading: false });
    } catch (error: any) {
      const message = error?.response?.data?.error || error.message || "Lỗi xóa phòng";
      set({ error: message, loading: false });
      throw error;
    }
  },
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    const { rooms, statusFilter } = get();
    const filteredRooms = applyFilters(rooms, query, statusFilter);
    set({ filteredRooms });
  },
  setStatusFilter: (status: string) => {
    set({ statusFilter: status });
    const { rooms, searchQuery } = get();
    const filteredRooms = applyFilters(rooms, searchQuery, status);
    set({ filteredRooms });
  }
}));
