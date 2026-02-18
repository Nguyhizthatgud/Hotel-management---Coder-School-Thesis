"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Bed,
  Users,
  CalendarCheck2,
  AlertTriangle,
  AlignEndHorizontal,
  BanknoteArrowDown,
  UserCheck,
  UserX,
  Calendar,
  Wrench,
  Sparkles,
  Receipt,
  Key,
  DollarSign
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BookingCalendar from "../components/Dashboard/BookingCalendar";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRoomStore } from "@/stores/useRoomService";
import { useBookingStore } from "@/stores/useBookingService";
import { useTransactionStore } from "@/stores/useTransaction";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useUISlice } from "@/stores/UI/useUIStore";
function Dashboard() {
  const { i18n } = useTranslation();
  const { hotelTheme } = useUISlice();
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
  const { t } = useTranslation();
  const router = useRouter();
  const username = useAuthStore((state) => state.user?.displayName || "Khách");
  const rooms = useRoomStore((state) => state.rooms);
  const bookings = useBookingStore((state) => state.bookings);
  const { transactions, fetchTransactions } = useTransactionStore();
  // get room stats
  React.useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);
  const roomStats = () => {
    // function body
    const totalRooms = rooms.length;
    const checkedInRooms = rooms.filter((room) => room.status === "đang sử dụng").length;
    const availableRooms = rooms.filter((room) => room.status === "còn trống").length;
    return { totalRooms, checkedInRooms, availableRooms };
  };
  // get Booking stats
  const bookingStats = () => {
    // function body
    const totalBookings = bookings.length;
    const totalGuest = bookings
      .filter((booking) => booking.status === "Check-In")
      .reduce((sum, booking) => sum + (booking.guestsCount || 0), 0);
    const pendingArrivals = bookings.filter((booking) => booking.status === "pending").length;
    return { totalBookings, totalGuest, pendingArrivals };
  };
  const occupancyTrendData = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, index) => {
      const dayStart = new Date(today);
      dayStart.setDate(today.getDate() + index);
      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const guestsCount = bookings.reduce((sum, booking) => {
        const checkIn = new Date(booking.checkInDate);
        const checkOut = new Date(booking.checkOutDate);
        const overlapsDay = checkIn <= dayEnd && checkOut >= dayStart;
        return overlapsDay ? sum + (booking.guestsCount || 0) : sum;
      }, 0);

      return {
        day: dayStart.toLocaleDateString(locale, { weekday: "short" }),
        guestsCount
      };
    });
  }, [bookings, locale]);
  const revenueToday = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return transactions.reduce((sum, transaction) => {
      const transactionDate = new Date(transaction.date);
      const isToday = transactionDate >= today && transactionDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
      return isToday ? sum + transaction.amount : sum;
    }, 0);
  }, [transactions]);
  const weeklyRevenueData = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: 7 }, (_, index) => {
      const dayStart = new Date(today);
      dayStart.setDate(today.getDate() - 7 + index);
      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);
      const revenuePerDays = transactions.reduce((sum, transaction) => {
        const transactionDate = new Date(transaction.date);
        const isSameDay = transactionDate >= dayStart && transactionDate <= dayEnd;
        return isSameDay ? sum + transaction.amount : sum;
      }, 0);

      return {
        day: dayStart.toLocaleDateString(locale, { weekday: "short" }),
        revenue: revenuePerDays
      };
    });
  }, [transactions, locale]);

  return (
    <div className="space-y-6 p-3">
      <div>
        <h2 className={hotelTheme === "dark" ? "text-2xl font-bold text-white" : "text-2xl font-bold"}>
          {t("hotelreception_heading")}
        </h2>
        <span className="text-gray-600">
          {t("hotelreception_subheading1")} <strong>{username}</strong> {t("hotelreception_subheading2")}
        </span>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* room stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t("hotelreception_totalRooms")}</CardTitle>
            <Bed className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roomStats().totalRooms}</div>
            <div className="text-xs text-green-600 flex justify-between mt-2">
              <div className="flex items-center gap-1">
                {" "}
                <AlignEndHorizontal className="w-3 h-3 mr-1" />
                {roomStats().checkedInRooms} {t("hotelreception_RoomsInUse")} {roomStats().totalRooms}{" "}
                {t("hotelreception_totalRooms")}
              </div>
              <div>
                {Math.round((roomStats().checkedInRooms / roomStats().totalRooms) * 100)}%{" "}
                {t("hotelreception_occupancyRate")}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* avenue'todays */}
        <Card>
          {" "}
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t("hotelreception_todayRevenue")}</CardTitle>
            <BanknoteArrowDown className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Intl.NumberFormat("vi-VN").format(revenueToday)}đ</div>
            <div className="text-xs text-green-600 flex justify-between mt-2">
              <div className="flex items-center gap-1">
                {" "}
                <AlignEndHorizontal className="w-3 h-3 mr-1" />
                {t("hotelreception_totalRevenueToday")}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Total guest todays */}
        <Card>
          {" "}
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t("hotelreception_guestsCurrentlyStaying")}
            </CardTitle>
            <Users className="w-4 h-4 text-fuchsia-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookingStats().totalGuest}</div>
            <div className="text-xs text-green-600 flex justify-between mt-2">
              <div className="flex items-center gap-1">
                {" "}
                <CalendarCheck2 className="w-3 h-3 mr-1" />
                {bookingStats().pendingArrivals} {t("hotelreception_booking_waiting_confirmation")}{" "}
                {bookingStats().totalBookings} {t("hotelreception_booking_count")}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Maintenance reports */}
        <Card>
          {" "}
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t("hotelreception_maintenance_alerts")}
            </CardTitle>
            <AlertTriangle className="w-4 h-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="relative text-xs text-gray-600 flex flex-col items-center justify-between mt-2">
              <Image
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40"
                src="/assets/img/Error/under_development.svg"
                alt="Features Under Development"
                width={80}
                height={80}
              />
              <div className="">{t("under_development")}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <BookingCalendar />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>{t("hotelreception_RevenueInWeek")}</CardTitle>
            <CardDescription>{t("hotelreception_revenue_trend_past_7_days")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Occupancy Trend */}
        <Card>
          <CardHeader>
            <CardTitle>{t("hotelreception_occupancy_trend")}</CardTitle>
            <CardDescription>{t("occupancy_over_thepastweek")}</CardDescription>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={occupancyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px"
                  }}
                  formatter={(value, name, props) => {
                    if (name === "guestsCount") {
                      return [`${value} ${t("hotelreception_guests")}`, t("guest_count")];
                    }
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="guestsCount"
                  stroke="rgb(185, 160, 16)"
                  strokeWidth={2}
                  dot={{ fill: "rgb(185, 160, 16)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>{t("hotelreception_room_status_distribution")}</CardTitle>
            <CardDescription>{t("hotelreception_room_status_breakdown")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>{t("room_status_in_use")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{roomStats().checkedInRooms}</span>
                <span className="text-gray-500">{t("hotelreception_rooms")}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <span>{t("room_status_available")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{roomStats().availableRooms}</span>
                <span className="text-gray-500">{t("hotelreception_rooms")}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{t("hotelreception_occupancyRate")}</span>
                <span>{Math.round((roomStats().checkedInRooms / roomStats().totalRooms) * 100)}%</span>
              </div>
              <Progress
                value={Math.round((roomStats().checkedInRooms / roomStats().totalRooms) * 100)}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Errors */}
        <Card>
          <CardHeader>
            <CardTitle> {t("hotelreception_maintenance_alerts")}</CardTitle>
            <CardDescription>{t("hotelreception_maintenance_alerts_sub")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative text-xs text-gray-600 flex flex-col items-center justify-between mt-2">
              <Image
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40"
                src="/assets/img/Error/under_development.svg"
                alt="Features Under Development"
                width={80}
                height={80}
              />
              <div className="">{t("under_development")}</div>
            </div>
          </CardContent>
        </Card>
        {/* Quick Actions */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("hotelreception_common_tasks")}</CardTitle>
          <CardDescription>{t("hotelreception_common_tasks_sub")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-4"
              onClick={() => router.push("/hotelreception/bookings")}
            >
              <UserCheck className="size-5" />
              <span className="text-xs">{t("hotelreception_check_in")}</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-4"
              onClick={() => router.push("/hotelreception/bookings")}
            >
              <UserX className="size-5" />
              <span className="text-xs">{t("hotelreception_check_out")}</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-4"
              onClick={() => router.push("/hotelreception/bookings")}
            >
              <Calendar className="size-5" />
              <span className="text-xs">{t("hotelreception_new_reservation")}</span>
            </Button>
            <Button variant="outline" disabled={true} className="h-auto flex-col gap-2 py-4">
              <Wrench className="size-5" />
              <span className="text-xs">{t("hotelreception_report_issue")}</span>
            </Button>
            <Button variant="outline" disabled={true} className="h-auto flex-col gap-2 py-4">
              <Sparkles className="size-5" />
              <span className="text-xs">{t("hotelreception_assign_cleaning")}</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/hotelreception/transactions")}
              className="h-auto flex-col gap-2 py-4"
            >
              <Receipt className="size-5" />
              <span className="text-xs">{t("hotelreception_view_transactions")}</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-4"
              onClick={() => router.push("/hotelreception/rooms")}
            >
              <Key className="size-5" />
              <span className="text-xs">{t("hotelreception_assign_room")}</span>
            </Button>
            <Button variant="outline" disabled={true} className="h-auto flex-col gap-2 py-4">
              <DollarSign className="size-5" />
              <span className="text-xs">{t("hotelreception_generate_report")}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default Dashboard;
