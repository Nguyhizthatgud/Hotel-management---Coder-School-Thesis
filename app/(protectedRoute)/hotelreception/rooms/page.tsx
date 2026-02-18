"use client";
import React, { useState, useEffect } from "react";
import { motion, Transition } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Edit, Trash2, RotateCcw } from "lucide-react";
import { useRoomStore } from "@/stores/useRoomService";
import { Room } from "@/types";
import Image from "next/image";
import AddRoom from "./components/AddRoom";
import getStatusColor from "./components/StatusBadge";
import { getAmenityIcon } from "./components/Amenity";
import { useUISlice } from "@/stores/UI/useUIStore";
import DeleteConfirmation from "./components/DeleteConfirmation";
import EmptyPage from "./components/EmptyPage";
import HoldingPage from "./components/HoldingPage";
import SkeletonHoldingContent from "./components/SkeletonHoldingContent";
import { useTranslation } from "react-i18next";
// Framer Motion animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    } as Transition
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300
    } as Transition
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.2)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    } as Transition
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300
    } as Transition
  }
};

const filterVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300
    } as Transition
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    } as Transition
  },
  tap: { scale: 0.95 }
};

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
  const [isMounted, setIsMounted] = useState(false);

  const hotelTheme = useUISlice((state) => state.hotelTheme);
  const { t } = useTranslation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // Don't render until client is ready to avoid hydration mismatch
  if (!isMounted) {
    return <SkeletonHoldingContent />;
  }

  if (loading) {
    return <SkeletonHoldingContent />;
  }

  const handleResetPage = async () => {
    // function body
    await fetchRooms();
  };

  return (
    <div className="space-y-6 p-3">
      <motion.div
        className="flex justify-between items-center"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, type: "spring", damping: 20, stiffness: 300 }}
        >
          <h2 className={hotelTheme === "dark" ? "text-3xl font-bold text-white" : "text-3xl font-bold"}>
            {t("rooms_page_title")}
          </h2>
          <p className="text-sm text-muted-foreground italic">{t("rooms_page_subheading")}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isMounted ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ delay: 0.2, type: "spring", damping: 20, stiffness: 300 }}
        >
          <Button
            className={hotelTheme === "dark" ? "mr-2 text-white" : "mr-2"}
            variant="ghost"
            onClick={handleResetPage}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <AddRoom editRoom={editingRoom} onClearEditingRoom={() => setEditingRoom(null)} />
        </motion.div>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="flex w-full gap-4 items-center justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="md:flex md:w-3/4 md:items-center gap-4">
          <motion.div variants={filterVariants}>
            <span className="hidden md:block text-sm text-muted-foreground">{t("rooms_search_placeholder1")}:</span>
          </motion.div>
          <motion.div className="relative flex-1 pb-2 md:pb-0" variants={filterVariants}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("rooms_search_placeholder2")}
              className="pl-10"
              value={searchQuery ?? ""}
              onChange={(e) => setSearchQuery?.(e.target.value)}
            />
          </motion.div>
          <motion.div variants={filterVariants}>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t("rooms_status_placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="còn trống">Có sẵn</SelectItem>
                <SelectItem value="đang sử dụng">Đang sử dụng</SelectItem>
                <SelectItem value="bảo trì">Bảo trì</SelectItem>
                <SelectItem value="đang dọn dẹp">Đang dọn dẹp</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>

        <motion.div className="text-sm text-muted-foreground justify-items-end-safe" variants={filterVariants}>
          {t("rooms_displayed")}
          <span className="font-semibold">
            {" "}
            {filteredRooms?.length} {t("rooms_total")}
          </span>{" "}
          <span className="font-semibold">{rooms.length}</span>
        </motion.div>
      </motion.div>
      {/* inline error */}
      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 text-red-700 p-3 text-sm">
          {t("rooms_error")}: <span className="font-medium">{String(error)}</span>.
        </div>
      )}
      {/* Room Grid */}
      {filteredRooms?.length === 0 ? (
        error ? (
          <HoldingPage />
        ) : rooms.length === 0 ? (
          <EmptyPage />
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <Image src="/assets/img/Error/Search_brown.svg" alt="No rooms found" width={150} height={150} />
            <p className="text-muted-foreground text-lg mb-4">{t("rooms_no_results")}</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
              }}
              className={hotelTheme === "dark" ? "text-white" : ""}
            >
              {t("rooms_reset_filters_button")}
            </Button>
          </motion.div>
        )
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredRooms?.map((room, index) => (
            <motion.div key={room._id} variants={cardVariants} whileHover="hover" custom={index}>
              <Card className="flex flex-col justify-between h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {t("rooms_room_number")} {room.roomNumber}
                    </CardTitle>
                    {getStatusColor(room.status)}
                  </div>
                  <CardDescription>{room.roomName}</CardDescription>
                  <CardDescription className="text-sm text-muted-foreground">ID: {room._id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t("rooms_type")}:</span>
                      <span className="text-sm font-medium">{room.roomType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t("rooms_floor")}:</span>
                      <span className="text-sm font-medium"> {room.floor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t("rooms_capacity")}:</span>
                      <span className="text-sm font-medium">
                        {room.capacity} {t("rooms_people")}
                      </span>
                    </div>

                    <div className="text-xl font-bold text-orange-600">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND"
                      }).format(room.price)}
                      /{t("rooms_night")}
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

                    {room.description && (
                      <p className="text-xs text-gray-500 italic line-clamp-2">{room.description}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setEditingRoom(room);
                      setIsEditingRoom(true);
                      setIsCreateRoom(true);
                    }}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    {t("rooms_edit_button")}
                  </Button>
                  <Button
                    variant="destructive"
                    className="bg-orange-500"
                    size="sm"
                    disabled={room.status === "đang sử dụng"}
                    style={room.status === "đang sử dụng" ? { cursor: "not-allowed", opacity: 0.6 } : {}}
                    w-full
                    onClick={() => {
                      setDeletingRoom(room);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
      <DeleteConfirmation room={deletingRoom} onOpenChange={(open) => !open && setDeletingRoom(null)} />
    </div>
  );
};

export default RoomsView;
