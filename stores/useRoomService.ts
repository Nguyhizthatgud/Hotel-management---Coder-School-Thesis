import { create } from "zustand";
import { roomService } from "@/services/roomService";
import { Room } from "@/types";

type RoomStore = {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  fetchRooms: () => Promise<void>;
};
export const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: [],
  loading: false,
  error: null,
  fetchRooms: async () => {
    set({ loading: true, error: null });
    try {
      const rooms = await roomService.listRooms();
      set({ rooms, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  getRoomById: (id: string) => {
    const { rooms } = get();
    return rooms.find((room) => room.id === id) || null;
  },
  getRoomByName: (name: string) => {
    const { rooms } = get();
    return rooms.find((room) => room.roomName === name) || null;
  }
}));
