"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBookingStore } from "@/stores/useBookingService";
import { useRoomStore } from "@/stores/useRoomService";
import { Bed } from "lucide-react";

import React from "react";
import { useTranslation } from "react-i18next";

import { Bookings } from "@/types";

// Get current time formatted as HH:MM
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// Calculate current time as percentage of 24 hours (0-100)
const getCurrentTimePercentage = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  // Total seconds in current day so far / total seconds in a day
  const secondsToday = hours * 3600 + minutes * 60 + seconds;
  const totalSecondsInDay = 24 * 3600;
  return (secondsToday / totalSecondsInDay) * 100;
};
const BookingCalendar = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const rooms = useRoomStore((state) => state.rooms);
  const bookings = useBookingStore((state) => state.bookings);
  const fetchRooms = useRoomStore((state) => state.fetchRooms);
  const fetchBookings = useBookingStore((state) => state.fetchBookings);

  // state for navigation and filters
  const [calendarOffset, setCalendarOffset] = React.useState(0);
  const [roomPage, setRoomPage] = React.useState(0);
  const [gridHeight, setGridHeight] = React.useState(0);
  const [currentTimePercent, setCurrentTimePercent] = React.useState(getCurrentTimePercentage());
  const gridRef = React.useRef<HTMLDivElement>(null);
  const roomsPerPage = 10;

  // Generate visible dates (7 days starting from offset)
  const locale = React.useMemo(() => {
    switch (i18n.language) {
      case "vi":
        return "vi-VN";
      case "cn":
        return "zh-CN";
      case "en":
      default:
        return "en-US";
    }
  }, [i18n.language]);

  const visibleDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to midnight

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + calendarOffset + i);

      dates.push({
        date: date,
        dayName: date.toLocaleDateString(locale, { weekday: "short" }),
        month: date.toLocaleDateString(locale, { month: "short" }),
        day: date.getDate(),
        isToday: date.toDateString() === new Date().toDateString()
      });
    }
    return dates;
  }, [calendarOffset, locale]);

  // match booking with room
  const roomsWithBookings = React.useMemo(() => {
    return rooms.map((room) => {
      const roomBookings = bookings.filter((booking) => booking.roomId === room._id);
      return {
        ...room,
        bookings: roomBookings
      };
    });
  }, [rooms, bookings]);

  // filter rooms
  const filteredRooms = useRoomStore((state) => state.filteredRooms);
  const safeFilteredRooms = React.useMemo(() => filteredRooms ?? [], [filteredRooms]);

  // pagination
  const paginatedRooms = React.useMemo(() => {
    const start = roomPage * roomsPerPage;
    return roomsWithBookings.slice(start, start + roomsPerPage);
  }, [roomsWithBookings, roomPage]);

  const totalPages = Math.ceil(safeFilteredRooms.length / roomsPerPage);

  // Check if booking covers a specific date
  const getBookingForDate = (bookings: Bookings[] = [], date: Date) => {
    return bookings.find((booking) => {
      const checkIn = new Date(booking.checkInDate);
      const checkOut = new Date(booking.checkOutDate);
      checkIn.setHours(0, 0, 0, 0);
      checkOut.setHours(0, 0, 0, 0);
      return date >= checkIn && date < checkOut;
    });
  };

  // Helper: Check if date is booking start
  const isBookingStart = (booking: any, date: Date) => {
    const checkIn = new Date(booking.checkInDate);
    checkIn.setHours(0, 0, 0, 0);
    return date.getTime() === checkIn.getTime();
  };

  // Check if date is booking end (last night)
  const isBookingEnd = (booking: any, date: Date) => {
    const checkOut = new Date(booking.checkOutDate);
    checkOut.setHours(0, 0, 0, 0);
    checkOut.setDate(checkOut.getDate() - 1); // Last night of stay
    return date.getTime() === checkOut.getTime();
  };

  // fetch data only once on mount with safeguards
  React.useEffect(() => {
    // only fetch if we don't have data and not currently loading
    fetchRooms();
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty deps - only run once on mount

  // Measure grid height when layout changes
  React.useEffect(() => {
    if (gridRef.current) {
      const height = gridRef.current.offsetHeight;
      setGridHeight(height);
    }
  }, [paginatedRooms, visibleDates]);

  // Update time indicator position every minute
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimePercent(getCurrentTimePercentage());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      {/* calendar header */}
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{t("calendar_header")}</CardTitle>
            <CardDescription>{t("calendar_subheader")}</CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="text-xs sm:text-sm text-muted-foreground">
              {safeFilteredRooms.length} {t("calendar_room_in_use")}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setCalendarOffset(calendarOffset - 7)}>
                <ChevronLeft className="size-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCalendarOffset(0)} disabled={calendarOffset === 0}>
                {t("calendar_today_button")}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCalendarOffset(calendarOffset + 7)}>
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      {/* bocking calendar */}
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[520px] sm:min-w-[600px]" ref={gridRef}>
            {/* Calendar Header */}
            <div className="grid grid-cols-8 gap-1 sm:gap-2 mb-2">
              <div className="text-xs font-medium text-muted-foreground">{t("calendar_top_norch")}</div>
              {visibleDates.map((dateInfo, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`text-xs font-medium ${dateInfo.isToday ? "text-orange-600" : "text-muted-foreground"}`}
                  >
                    {dateInfo.dayName}
                  </div>
                  <div
                    className={`text-xs ${dateInfo.isToday ? "text-orange-600 font-semibold" : "text-muted-foreground"}`}
                  >
                    {dateInfo.day}, {dateInfo.month}
                  </div>
                </div>
              ))}
            </div>

            {/* calendar grid */}
            {paginatedRooms?.length > 0 ? (
              <div className="space-y-1 relative">
                {/* Time indicator overlay */}
                {visibleDates.some((d) => d.isToday) && (
                  <>
                    {/* Time label */}
                    <div
                      className="absolute -top-2 z-20"
                      style={{
                        left: `calc(${((visibleDates.findIndex((d) => d.isToday) + 1) / 8) * 100}% + ${currentTimePercent / 8}%)`,
                        transform: "translateX(-50%)"
                      }}
                    >
                      <div className="bg-orange-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap">
                        {getCurrentTime()}
                      </div>
                    </div>
                    {/* Vertical line through grid */}
                    <div
                      className="absolute top-0 w-0.5 bg-orange-500 opacity-25 z-10"
                      style={{
                        left: `calc(${((visibleDates.findIndex((d) => d.isToday) + 1) / 8) * 100}% + ${currentTimePercent / 8}%)`,
                        transform: "translateX(-50%)",
                        height: "100%"
                      }}
                    />
                  </>
                )}
                {paginatedRooms?.map((room, roomIndex) => (
                  <div key={roomIndex} className="grid grid-cols-8 gap-1 sm:gap-2 items-center">
                    {/* Room Number */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 min-w-max">
                      <span className="text-xs sm:text-sm font-medium">{room.roomNumber}</span>
                      <Badge variant="outline" className="text-[9px] sm:text-xs hidden sm:inline-flex">
                        {room.roomType}
                      </Badge>
                    </div>

                    {/* date Cells */}
                    {visibleDates.map((dateInfo, dateIndex) => {
                      const booking = getBookingForDate(room.bookings, dateInfo.date);
                      const isBooked = booking !== undefined;
                      const isStart = booking && isBookingStart(booking, dateInfo.date);
                      const isEnd = booking && isBookingEnd(booking, dateInfo.date);

                      // Đetermine border radius for grouped cells
                      const borderRadius = isBooked
                        ? isStart && isEnd
                          ? "rounded" // a day booking
                          : isStart
                            ? "rounded-l" // multi-day booking
                            : isEnd
                              ? "rounded-r" // end of multi-day booking
                              : "rounded-none" // middle of multi-day booking
                        : "rounded";

                      const isOccupied =
                        booking?.status === "Check-In" ||
                        booking?.status === "Check-Out" ||
                        booking?.status === "completed";
                      return (
                        <div
                          key={dateIndex}
                          className={`h-10 sm:h-12 border flex items-center px-1 transition-all relative group overflow-hidden ${borderRadius} ${
                            isBooked
                              ? isOccupied
                                ? "bg-orange-500 border-orange-700 cursor-pointer hover:bg-orange-600 text-white"
                                : "bg-purple-500 border-purple-700 cursor-pointer hover:bg-purple-600 text-white"
                              : dateInfo.isToday
                                ? "bg-orange-50 border-orange-200"
                                : "bg-muted/30 border-muted hover:bg-muted/50 cursor-pointer"
                          }`}
                          title={
                            isBooked
                              ? `${booking?.guestName} - ${isOccupied ? t("calendar_legend_3") : t("calendar_legend_2")}`
                              : t("calendar_legend_1")
                          }
                        >
                          {/* guét name*/}
                          {booking && isStart && (
                            <div className="text-[10px] font-semibold truncate w-full text-center">
                              {booking.guestName} - {booking.guestNumber}
                            </div>
                          )}

                          {/* checkin log */}
                          {isBooked && isStart && (
                            <div className="absolute top-0.5 left-0.5">
                              <div className="size-2 rounded-full bg-white opacity-75" />
                            </div>
                          )}

                          {/* checkout log */}
                          {isBooked && isEnd && (
                            <div className="absolute top-0.5 right-0.5">
                              <div className="size-2 rounded-full bg-white opacity-75" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Bed className="size-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm">No rooms match your filters</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {roomPage * roomsPerPage + 1}-
                  {Math.min((roomPage + 1) * roomsPerPage, safeFilteredRooms.length)} of {safeFilteredRooms.length}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRoomPage(Math.max(0, roomPage - 1))}
                    disabled={roomPage === 0}
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Page {roomPage + 1} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRoomPage(Math.min(totalPages - 1, roomPage + 1))}
                    disabled={roomPage === totalPages - 1}
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-muted border border-muted" />
                <span className="text-xs text-muted-foreground">{t("calendar_legend_1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-purple-500 border border-purple-600" />
                <span className="text-xs text-muted-foreground">{t("calendar_legend_2")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-500 border border-amber-600" />
                <span className="text-xs text-muted-foreground">{t("calendar_legend_3")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-50 border border-orange-200" />
                <span className="text-xs text-muted-foreground">{t("calendar_legend_4")}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
