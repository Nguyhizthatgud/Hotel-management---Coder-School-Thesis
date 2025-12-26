"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Edit, Trash2 } from "lucide-react";
import { useRoomStore } from "@/stores/useRoomService";
import { Room } from "@/types";
import AddRoom from "./components/AddRoom";
import getStatusColor from "./components/StatusBadge";
import { getAmenityIcon } from "./components/Amenity";
import { useUISlice } from "@/stores/UI/useUIStore";
import DeleteConfirmation from "./components/DeleteConfirmation";
import EmptyPage from "./components/EmptyPage";
import HoldingPage from "./components/HoldingPage";
import SkeletonHoldingContent from "./components/SkeletonHoldingContent";
const RoomsView = () => {
  const rooms = useRoomStore((state) => state.rooms);
  const loading = useRoomStore((state) => state.loading);
  const fetchRooms = useRoomStore((state) => state.fetchRooms);
  const filteredRooms = useRoomStore((state) => state.filteredRooms);
  const searchQuery = useRoomStore((state) => state.searchQuery);
  const statusFilter = useRoomStore((state) => state.statusFilter);
  const setSearchQuery = useRoomStore((state) => state.setSearchQuery);
  const setStatusFilter = useRoomStore((state) => state.setStatusFilter);
  const setIsEditingRoom = useUISlice((state) => state.setIsEditingRoom);
  const setIsCreateRoom = useUISlice((state) => state.setIsCreateRoom);
  const error = useRoomStore((state) => state.error);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [deletingRoom, setDeletingRoom] = useState<Room | null>(null);
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  if (loading) {
    return <SkeletonHoldingContent />;
  }

  if (error) {
    return <HoldingPage />;
  }

  if (rooms.length === 0) {
    return (
      <>
        <EmptyPage />
        <AddRoom editRoom={null} onClearEditingRoom={() => {}} />
      </>
    );
  }

  return (
    <div className="space-y-6 p-3">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Quản lý phòng</h2>
          <p className="text-muted-foreground italic">Quản lý và giám sát tất cả các phòng trong khách sạn</p>
        </div>
        <AddRoom editRoom={editingRoom} onClearEditingRoom={() => setEditingRoom(null)} />
      </div>

      {/* Filters */}
      <div className="flex w-full gap-4 items-center justify-between">
        <div className="md:flex md:w-3/4 md:items-center gap-4">
          <div>
            <span className="hidden md:block text-sm text-muted-foreground">Tìm kiếm và lọc phòng:</span>
          </div>
          <div className="relative flex-1 pb-2 md:pb-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm phòng..."
              className="pl-10"
              value={searchQuery ?? ""}
              onChange={(e) => setSearchQuery?.(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Trạng thái hoạt" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="còn trống">Có sẵn</SelectItem>
              <SelectItem value="đang sử dụng">Đang sử dụng</SelectItem>
              <SelectItem value="bảo trì">Bảo trì</SelectItem>
              <SelectItem value="đang dọn dẹp">Đang dọn dẹp</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground justify-items-end-safe">
          Hiển thị<span className="font-semibold"> {filteredRooms?.length} </span> trên tổng số{" "}
          <span className="font-semibold">{rooms.length}</span> phòng
        </div>
      </div>

      {/* Room Grid */}
      {filteredRooms?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-muted-foreground text-lg mb-4">Không tìm thấy phòng nào phù hợp với tìm kiếm</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
            }}
          >
            Xóa bộ lọc
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms?.map((room) => (
            <Card key={room._id} className="hover:shadow-lg transition-shadow flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Phòng {room.roomNumber}</CardTitle>
                  {getStatusColor(room.status)}
                </div>
                <CardDescription>{room.roomName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Loại:</span>
                    <span className="text-sm font-medium">{room.roomType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Lầu:</span>
                    <span className="text-sm font-medium">Tầng {room.floor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sức chứa:</span>
                    <span className="text-sm font-medium">{room.capacity} người</span>
                  </div>

                  <div className="text-xl font-bold text-orange-600">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND"
                    }).format(room.price)}
                    /đêm
                  </div>

                  <div className="flex items-center flex-wrap gap-2">
                    {room.amenities
                      ? room.amenities.slice(0, 8).map((amenity) => (
                          <div key={amenity} className="text-gray-600">
                            {getAmenityIcon(amenity)}
                          </div>
                        ))
                      : null}
                  </div>

                  {room.description && <p className="text-xs text-gray-500 italic line-clamp-2">{room.description}</p>}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setEditingRoom(room);
                    setIsEditingRoom(true);
                    setIsCreateRoom(true);
                  }}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Sửa
                </Button>
                <Button
                  variant="destructive"
                  className="bg-orange-500"
                  size="sm"
                  onClick={() => {
                    setDeletingRoom(room);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <DeleteConfirmation room={deletingRoom} onOpenChange={(open) => !open && setDeletingRoom(null)} />
    </div>
  );
};

export default RoomsView;
