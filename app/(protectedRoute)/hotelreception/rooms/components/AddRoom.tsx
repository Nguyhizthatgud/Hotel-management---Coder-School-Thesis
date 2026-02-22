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
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
    { value: "Phòng tiêu chuẩn", label: "Phòng tiêu chuẩn" },
    { value: "Phòng đặc biệt", label: "Phòng đặc biệt" },
    { value: "Phòng tổng thống", label: "Phòng tổng thống" }
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
      toast.error(t("rooms_add_room_form_invalid_toast"));
      return;
    }
    if (editRoom) {
      // get the existing room data
      const existingRoom = formCreateRoomData.getValues();
      try {
        await updateRoom(existingRoom);
        toast.success(t("rooms_update_room_success_toast"));
        setIsEditingRoom(false);
        setIsCreateRoom(false);
        onClearEditingRoom?.();
        formCreateRoomData.reset();
      } catch (_error: any) {
        toast.error(t("rooms_update_room_error_toast"));
      }
      // Update existing room logic here
    } else {
      // add new room
      const newRoom = formCreateRoomData.getValues();
      const { _id, createAt: _createAt, updatedAt: _updatedAt, __v, ...roomData } = newRoom;
      try {
        await addRoom(roomData);
        toast.success(t("rooms_add_room_success_toast"));
        setIsCreateRoom(false);
        onClearEditingRoom?.();
        formCreateRoomData.reset();
      } catch (_error: any) {
        toast.error(t("rooms_add_room_error_toast"));
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
          <span className="hidden md:inline">{t("rooms_add_room_button_label")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editRoom ? t("rooms_edit_room_title") : t("rooms_add_room_title")}</DialogTitle>
          <DialogDescription>{t("rooms_add_room_description")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Số phòng */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-2"
            >
              <Label htmlFor="number" className="font-bold">
                {t("rooms_add_room_number_label")}
                {""}
                <span className="text-red-500">*</span>
              </Label>
              <Input id="number" placeholder="Ví dụ: 101" {...formCreateRoomData.register("roomNumber")} />
              {formCreateRoomData.formState.errors.roomNumber && (
                <p className="text-sm text-red-500">{formCreateRoomData.formState.errors.roomNumber.message}</p>
              )}
            </motion.div>

            {/* Tên phòng */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-2"
            >
              <Label htmlFor="name" className="font-bold">
                {t("rooms_add_room_name_label")}
                {""} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder={t("rooms_add_room_name_placeholder")}
                {...formCreateRoomData.register("roomName")}
              />
              {formCreateRoomData.formState.errors.roomName && (
                <p className="text-sm text-red-500">{formCreateRoomData.formState.errors.roomName.message}</p>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Loại phòng */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-2"
            >
              <Label htmlFor="type" className="font-bold">
                {t("rooms_add_room_type_label")}
                {""} <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formCreateRoomData.watch("roomType")}
                onValueChange={(value) => formCreateRoomData.setValue("roomType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("rooms_add_room_type_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {roomType.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formCreateRoomData.formState.errors.roomType && (
                <p className="text-sm text-red-500">{formCreateRoomData.formState.errors.roomType.message}</p>
              )}
            </motion.div>

            {/* Số lầu */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-2"
            >
              <Label htmlFor="floor" className="font-bold">
                {t("rooms_add_room_floor_label")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="floor"
                type="number"
                min="1"
                placeholder={t("rooms_add_room_floor_placeholder")}
                {...formCreateRoomData.register("floor", { valueAsNumber: true })}
              />
              {formCreateRoomData.formState.errors.floor && (
                <p className="text-sm text-red-500">{formCreateRoomData.formState.errors.floor.message}</p>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Giá phòng */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-2"
            >
              <Label htmlFor="price" className="font-bold">
                {t("rooms_add_room_price_label")} (VNĐ/đêm) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="10000"
                placeholder={t("rooms_add_room_price_placeholder")}
                {...formCreateRoomData.register("price", { valueAsNumber: true })}
              />
              {formCreateRoomData.formState.errors.price && (
                <p className="text-sm text-red-500">{formCreateRoomData.formState.errors.price.message}</p>
              )}
            </motion.div>

            {/* Sức chứa */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-2"
            >
              <Label htmlFor="capacity" className="font-bold">
                {t("rooms_add_room_capacity_label")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                placeholder={t("rooms_add_room_capacity_placeholder")}
                {...formCreateRoomData.register("capacity", { valueAsNumber: true })}
              />
              {formCreateRoomData.formState.errors.capacity && (
                <p className="text-sm text-red-500">{formCreateRoomData.formState.errors.capacity.message}</p>
              )}
            </motion.div>
          </motion.div>

          {/* Tình trạng */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-2"
          >
            <Label htmlFor="status" className="font-bold">
              {t("rooms_add_room_status_label")} <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formCreateRoomData.watch("status")}
              onValueChange={(value: string) =>
                formCreateRoomData.setValue(
                  "status",
                  value as "còn trống" | "đã đặt trước" | "đang sử dụng" | "bảo trì" | "đang dọn dẹp"
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t("rooms_add_room_status_placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formCreateRoomData.formState.errors.status && (
              <p className="text-sm text-red-500">{formCreateRoomData.formState.errors.status.message}</p>
            )}
          </motion.div>

          {/* Tiện ích */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="space-y-2"
          >
            <Label className="font-bold">Tiện ích</Label>
            <div className="grid grid-cols-2 gap-3 p-4 border rounded-lg">
              {amenitiesOptions.map((amenity) => {
                const Icon = amenity.icon;
                const isSelected = (formCreateRoomData.watch("amenities") || []).includes(amenity.value);

                return (
                  <motion.button
                    key={amenity.value}
                    type="button"
                    onClick={() => toggleAmenity(amenity.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 p-2 rounded-md border transition-colors ${
                      isSelected
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon />
                    <span className="text-sm">{amenity.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Ghi chú */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            className="space-y-2"
          >
            <Label htmlFor="notes" className="font-bold">
              {t("rooms_add_room_description_label")}
            </Label>
            <Textarea
              id="description"
              value={formCreateRoomData.watch("description")}
              onChange={(e) => formCreateRoomData.setValue("description", e.target.value)}
              placeholder={t("rooms_add_room_description_placeholder")}
              rows={3}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
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
                {t("rooms_add_room_cancel_button")}
              </Button>
              <Button type="submit">
                {editRoom ? t("rooms_add_room_update_button") : t("rooms_add_room_add_button")}
              </Button>
            </DialogFooter>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddRoom;
