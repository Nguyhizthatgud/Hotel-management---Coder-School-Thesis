"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HousePlus } from "lucide-react";
import { useUISlice } from "@/stores/UI/useUIStore";
import { Room, RoomSchema } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRoomStore } from "@/stores/useRoomService";

interface AddRoomProps {
  editRoom?: Room | null;
  onClearEditingRoom?: () => void;
}

const AddRoom = ({ editRoom, onClearEditingRoom }: AddRoomProps) => {
  const setIsEditingRoom = useUISlice((state) => state.setIsEditingRoom);
  const isCreateRoom = useUISlice((state) => state.isCreateRoom);
  const setIsCreateRoom = useUISlice((state) => state.setIsCreateRoom);
  const addRoom = useRoomStore((state) => state.addRoom);
  const updateRoom = useRoomStore((state) => state.updateRoom);

  const formCreateRoomData = useForm<Room>({
    resolver: zodResolver(RoomSchema),
    defaultValues: {
      _id: "",
      roomNumber: "",
      roomName: "",
      roomType: "",
      status: "còn trống",
      price: 0,
      capacity: 1,
      amenities: [],
      description: "",
      floor: 1,
      createAt: "",
      updatedAt: "",
      __v: 0
    }
  });
  const roomType = [
    { value: "Phòng đơn", label: "Phòng đơn" },
    { value: "Phòng đôi", label: "Phòng đôi" },
    { value: "Phòng tiêu chuẩn", label: "Phòng suite" },
    { value: "Phòng đặc biệt", label: "Phòng deluxe" },
    { value: "Phòng tổng thống", label: "Phòng presidential" }
  ];
  const statusOptions = [
    { value: "còn trống", label: "Còn trống" },
    { value: "đã đặt trước", label: "Đã đặt trước" },
    { value: "đang sử dụng", label: "Đang sử dụng" },
    { value: "bảo trì", label: "Bảo trì" },
    { value: "đang dọn dẹp", label: "Đang dọn dẹp" }
  ];
  const amenitiesOptions = [
    { value: "WiFi", label: "Wi-Fi", icon: () => <i className="fas fa-wifi" /> },
    { value: "TV", label: "TV", icon: () => <i className="fas fa-tv" /> },
    { value: "Điều hòa", label: "Điều hòa", icon: () => <i className="fas fa-fan" /> },
    {
      value: "Ấm đun nước",
      label: "Ấm đun nước",
      icon: () => <i className="fas fa-glass-martini" />
    },
    {
      value: "Tủ lạnh",
      label: "Tủ lạnh",
      icon: () => <i className="fas fa-snowflake" />
    },
    {
      value: "Dịch vụ giặt ủi",
      label: "Dịch vụ giặt ủi",
      icon: () => <i className="fas fa-dumpster-fire" />
    },
    { value: "Thuê xe", label: "Thuê xe", icon: () => <i className="fas fa-car-side" /> },
    { value: "Dịch vụ phòng", label: "Dịch vụ phòng", icon: () => <i className="fas fa-concierge-bell" /> }
  ];

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = formCreateRoomData.watch("amenities") || [];
    if (currentAmenities.includes(amenity)) {
      formCreateRoomData.setValue(
        "amenities",
        currentAmenities.filter((a) => a !== amenity)
      );
    } else {
      formCreateRoomData.setValue("amenities", [...currentAmenities, amenity]);
    }
  };

  // Populate form when editing a room
  React.useEffect(() => {
    if (editRoom && isCreateRoom) {
      formCreateRoomData.reset(editRoom);
    } else if (!editRoom && isCreateRoom) {
      // Reset to defaults for new room
      formCreateRoomData.reset({
        _id: "",
        roomNumber: "",
        roomName: "",
        roomType: "",
        status: "còn trống",
        price: 0,
        capacity: 1,
        amenities: [],
        description: "",
        floor: 1,
        createAt: "",
        updatedAt: "",
        __v: 0
      });
    }
  }, [editRoom, isCreateRoom, formCreateRoomData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // trigger validation
    const isValid = await formCreateRoomData.trigger();

    if (!isValid) {
      toast.error("Vui lòng điền đầy đủ thông tin phòng đúng định dạng.");
      return;
    }
    if (editRoom) {
      // get the existing room data
      const existingRoom = formCreateRoomData.getValues();
      try {
        await updateRoom(existingRoom);
        toast.success("Cập nhật phòng thành công!");
        setIsEditingRoom(false);
        setIsCreateRoom(false);
        onClearEditingRoom?.();
        formCreateRoomData.reset();
      } catch (error: any) {
        toast.error("Lỗi cập nhật phòng, thử lại nhé!");
      }
      // Update existing room logic here
    } else {
      // add new room
      const newRoom = formCreateRoomData.getValues();
      const { _id, createAt, updatedAt, __v, ...roomData } = newRoom;
      try {
        await addRoom(roomData);
        toast.success("Thêm phòng thành công!");
        setIsCreateRoom(false);
        onClearEditingRoom?.();
        formCreateRoomData.reset();
      } catch (error: any) {
        toast.error("Lỗi thêm phòng mới, thử lại nhé!");
      }
    }
  };
  const handleOpenCreateRoom = (): void => {
    onClearEditingRoom?.();
    setIsCreateRoom(true);
  };

  return (
    <Dialog open={isCreateRoom} onOpenChange={setIsCreateRoom}>
      <DialogTrigger asChild>
        <Button className="" onClick={() => handleOpenCreateRoom()}>
          <HousePlus className="w-4 h-4 mr-2" />
          <span className="hidden md:inline">Thêm phòng mới</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editRoom ? "Chỉnh sửa thông tin phòng" : "Thêm phòng mới"}</DialogTitle>
          <DialogDescription>Điền đầy đủ thông tin phòng. Các trường đánh dấu (*) là bắt buộc.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Số phòng */}
            <div className="space-y-2">
              <Label htmlFor="number">
                Số phòng <span className="text-red-500">*</span>
              </Label>
              <Input
                id="number"
                value={formCreateRoomData.watch("roomNumber")}
                onChange={(e) => formCreateRoomData.setValue("roomNumber", e.target.value)}
                placeholder="Ví dụ: 101"
                required
              />
            </div>

            {/* Tên phòng */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Tên phòng <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formCreateRoomData.watch("roomName")}
                onChange={(e) => formCreateRoomData.setValue("roomName", e.target.value)}
                placeholder="Ví dụ: Phòng Deluxe 101"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Loại phòng */}
            <div className="space-y-2">
              <Label htmlFor="type">
                Loại phòng <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formCreateRoomData.watch("roomType")}
                onValueChange={(value) => formCreateRoomData.setValue("roomType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại phòng" />
                </SelectTrigger>
                <SelectContent>
                  {roomType.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Số lầu */}
            <div className="space-y-2">
              <Label htmlFor="floor">
                Số lầu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="floor"
                type="number"
                min="1"
                value={formCreateRoomData.watch("floor") || 1}
                onChange={(e) => formCreateRoomData.setValue("floor", parseInt(e.target.value) || 1)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Giá phòng */}
            <div className="space-y-2">
              <Label htmlFor="price">
                Giá phòng (VNĐ/đêm) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="10000"
                value={formCreateRoomData.watch("price") || 0}
                onChange={(e) => formCreateRoomData.setValue("price", parseFloat(e.target.value) || 0)}
                placeholder="Ví dụ: 1200000"
                required
              />
            </div>

            {/* Sức chứa */}
            <div className="space-y-2">
              <Label htmlFor="capacity">
                Sức chứa (người) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                value={formCreateRoomData.watch("capacity") || 1}
                onChange={(e) => formCreateRoomData.setValue("capacity", parseInt(e.target.value) || 1)}
                required
              />
            </div>
          </div>

          {/* Tình trạng */}
          <div className="space-y-2">
            <Label htmlFor="status">
              Tình trạng <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formCreateRoomData.watch("status")}
              onValueChange={(value: string) =>
                formCreateRoomData.setValue(
                  "status",
                  value as "Có sẵn" | "đã đặt trước" | "đang sử dụng" | "đang dọn dẹp" | "bảo trì"
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn tình trạng" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tiện ích */}
          <div className="space-y-2">
            <Label>Tiện ích</Label>
            <div className="grid grid-cols-2 gap-3 p-4 border rounded-lg">
              {amenitiesOptions.map((amenity) => {
                const Icon = amenity.icon;
                const isSelected = (formCreateRoomData.watch("amenities") || []).includes(amenity.value);

                return (
                  <button
                    key={amenity.value}
                    type="button"
                    onClick={() => toggleAmenity(amenity.value)}
                    className={`flex items-center gap-2 p-2 rounded-md border transition-colors ${
                      isSelected
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon />
                    <span className="text-sm">{amenity.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ghi chú */}
          <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú phòng</Label>
            <Textarea
              id="description"
              value={formCreateRoomData.watch("description")}
              onChange={(e) => formCreateRoomData.setValue("description", e.target.value)}
              placeholder="Thêm ghi chú về phòng (tùy chọn)..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsCreateRoom(false);
                setIsEditingRoom(false);
                onClearEditingRoom?.();
                formCreateRoomData.reset();
              }}
            >
              Hủy
            </Button>
            <Button type="submit">{editRoom ? "Cập nhật" : "Thêm phòng"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddRoom;
