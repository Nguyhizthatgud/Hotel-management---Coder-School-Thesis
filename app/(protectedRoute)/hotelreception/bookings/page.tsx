"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, Variants, Transition } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Search,
  User,
  Phone,
  Mail,
  Eye,
  Trash2,
  CalendarIcon,
  Filter,
  Edit,
  CreditCard,
  DoorOpen,
  Check,
  Key,
  UserRoundCheck,
  UserRoundPen,
  RotateCcw,
  UserX,
  ReceiptText
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import SkeletonHoldingContent from "./components/SkeletonHoldingContent";
import { useBookingStore } from "@/stores/useBookingService";
import BookingSourceColor from "./components/BookingSourceColor";
import PaymentStatusColor from "./components/PaymentStatusColor";
import { useUISlice } from "@/stores/UI/useUIStore";
import { Bookings } from "@/types/booking";
import HoldingPage from "./HoldingPage";
import ConfirmTicket from "./components/ConfirmTicket";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CheckInForm from "./components/CheckInFrom";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import PointOfSales from "../../components/PointOfSales";
import Bill from "../../components/Bill";
import transactionService from "@/services/transactionService";
import { useTranslation } from "react-i18next";
// Framer Motion animation variants with smoother spring physics
const dialogVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      mass: 0.8,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] // Custom easing curve
    } as Transition
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1]
    } as Transition
  }
};

const buttonVariants: Variants = {
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    } as Transition
  }
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
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
    y: -4,
    boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.15)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    } as Transition
  }
};

const headerVariants: Variants = {
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

const filterVariants: Variants = {
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

const BookingManagement = () => {
  // data store actions
  const bookings = useBookingStore((state) => state.bookings);
  const fetchBookings = useBookingStore((state) => state.fetchBookings);
  const deleteBooking = useBookingStore((state) => state.deleteBooking);
  const updateBooking = useBookingStore((state) => state.updateBooking);
  const confirmBooking = useBookingStore((state) => state.confirmBooking);

  //filter actions
  const searchQuery = useBookingStore((state) => state.searchQuery);
  const setSearchQuery = useBookingStore((state) => state.setSearchQuery);
  const paymentStatusFilter = useBookingStore((state) => state.paymentStatusFilter);
  const setPaymentStatusFilter = useBookingStore((state) => state.setPaymentStatusFilter);

  //utils actiosn
  const isShowBooking = useUISlice((state) => state.isShowBooking);
  const setIsShowBooking = useUISlice((state) => state.setIsShowBooking);
  const isConfirmationTicketOpen = useUISlice((state) => state.isConfirmationTicketOpen);
  const setIsConfirmationTicketOpen = useUISlice((state) => state.setIsConfirmationTicketOpen);
  const loading = useBookingStore((state) => state.loading);
  const error = useBookingStore((state) => state.error);
  const setCheckInDialogOpen = useUISlice((state) => state.setCheckInDialogOpen);
  const isPOSCheckoutOpen = useUISlice((state) => state.isPOSCheckoutOpen);
  const setIsPOSCheckoutOpen = useUISlice((state) => state.setIsPOSCheckoutOpen);
  const isBillOpen = useUISlice((state) => state.isBillOpen);
  const setIsBillOpen = useUISlice((state) => state.setIsBillOpen);
  const hotelTheme = useUISlice((state) => state.hotelTheme);

  // form actions
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [editFormData, setEditFormData] = React.useState<Bookings | null>(null);
  const [selectedBooking, setSelectedBooking] = React.useState<Bookings | null>(null);
  const [selectedTransaction, setSelectedTransaction] = React.useState<any | null>(null);
  const [confirmingId, setConfirmingId] = React.useState<string | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>("all");
  useEffect(() => {
    setIsMounted(true);
    fetchBookings();
  }, [fetchBookings]);
  const { t } = useTranslation();
  const bookingsToDisplay = React.useMemo(() => {
    let filtered = bookings;

    // Filter by active tab (booking status)
    if (activeTab !== "all") {
      filtered = filtered.filter((booking) => booking.status === activeTab);
    }

    // Filter by payment status
    if (paymentStatusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.paymentStatus === paymentStatusFilter);
    }
    // Filter by search query (guest name, email, or bookId)
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.guestName.toLowerCase().includes(lowercasedQuery) ||
          booking.guestEmail.toLowerCase().includes(lowercasedQuery) ||
          booking.bookId.toLowerCase().includes(lowercasedQuery)
      );
    }

    return filtered;
  }, [bookings, activeTab, paymentStatusFilter, searchQuery]);

  const calcNights = (startISO?: string, endISO?: string) => {
    if (!startISO || !endISO) return 1;
    const start = new Date(startISO);
    const end = new Date(endISO);
    const ms = new Date(end).setHours(0, 0, 0, 0) - new Date(start).setHours(0, 0, 0, 0);
    const nights = Math.ceil(ms / (1000 * 60 * 60 * 24));
    return Math.max(1, nights);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handlerOpenViewDetails = (reservation: Bookings) => {
    setSelectedBooking(reservation);
    setIsShowBooking(true);
  };

  const handleEditBooking = (reservation?: Bookings) => {
    const bookingToEdit = reservation || selectedBooking;
    if (!bookingToEdit) return;
    setEditFormData(bookingToEdit);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditFormData(null);
  };

  const handleCloseDialog = () => {
    setIsShowBooking(false);
    setIsEditMode(false);
    setSelectedBooking(null);
    setEditFormData(null);
  };

  const handleSaveEdit = async () => {
    if (!editFormData) return;
    try {
      await updateBooking(editFormData);
      toast.success(t("booking_toast_update_success"));
      setIsEditMode(false);
      setIsShowBooking(false);
      setEditFormData(null);
    } catch (_error) {
      toast.error(t("booking_toast_form_error"));
    }
  };
  const handleConfirmBooking = async (reservation: Bookings) => {
    setConfirmingId(reservation.bookId);
    console.log("Confirming booking status: ", reservation.status);
    try {
      const confirmed = await confirmBooking(reservation.bookId);
      if (confirmed) {
        setSelectedBooking(confirmed);
      }
      toast.success(t("booking_toast_update_success"));
      setIsConfirmationTicketOpen(true);
    } catch (_error) {
      toast.error(t("booking_toast_form_error"));
    } finally {
      setConfirmingId(null); // Reset after success or error
    }
  };

  const handleDeleteBooking = async (reservation: Bookings) => {
    try {
      await deleteBooking(reservation.bookId);
      toast.success(t("booking_toast_delete_success"));
      setIsShowBooking(false);
    } catch (_error) {
      toast.error(t("booking_toast_delete_error"));
    }
  };

  const handleCheckIn = (reservation: Bookings) => {
    setSelectedBooking(reservation);
    setCheckInDialogOpen(true);
  };
  const handleReceiptTicket = async (reservation: Bookings) => {
    setSelectedBooking(reservation);
    if (reservation.paymentStatus === "Đã thanh toán") {
      // fetch transaction data
      try {
        const transactions = await transactionService.listTransactions();
        const bookingTransaction = transactions.find(
          (txn: any) =>
            txn.bookingId === reservation.bookId ||
            txn.reservationId === reservation.bookId ||
            txn.invoiceId === reservation.bookId
        );
        if (bookingTransaction) {
          setSelectedTransaction(bookingTransaction);
        }
      } catch (error) {
        console.error("Failed to fetch transaction:", error);
      }
      setIsPOSCheckoutOpen(false);
      setIsBillOpen(true);
      return;
    } else {
      setIsPOSCheckoutOpen(true);
    }
  };
  const handleCheckOut = async (reservation: Bookings) => {
    if (!reservation) return;
    if (reservation.paymentStatus !== "Đã thanh toán") {
      setIsPOSCheckoutOpen(true);
      return;
    }

    // Proceed with checkout and delete booking
    try {
      await deleteBooking(reservation.bookId);
      toast.success(t("booking_toast_checkout_success"));
    } catch (_error) {
      toast.error(t("booking_toast_checkout_error"));
    }
  };
  // Render skeletons until mounted or while loading
  if (!isMounted || loading) {
    return <SkeletonHoldingContent />;
  }

  const handleReloadPage = async () => {
    // function bodys
    await fetchBookings();
  };
  return (
    <>
      <div className="space-y-6 p-3">
        {/* Header */}
        <motion.div
          className="w-full flex flex-row items-center gap-3"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, type: "spring", damping: 20, stiffness: 300 }}
          >
            <h2 className={hotelTheme === "dark" ? "text-2xl font-bold text-white" : "text-2xl font-bold"}>
              {t("bookings_management_heading")}
            </h2>
            <p className="text-sm text-muted-foreground italic">{t("bookings_management_subheading")}</p>
          </motion.div>
          {/* Filters */}
          <motion.div
            className="flex flex-1 flex-row gap-4 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="relative flex-1 pb-2 md:pb-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("bookings_search_placeholder")}
                className="pl-10"
                value={searchQuery ?? ""}
                onChange={(e) => setSearchQuery?.(e.target.value)}
              />
            </motion.div>

            <motion.div variants={filterVariants}>
              <Select value={paymentStatusFilter} onValueChange={(value) => setPaymentStatusFilter(value as any)}>
                <SelectTrigger className="w-40">
                  <Filter className="size-4 mr-2" />
                  <SelectValue placeholder={t("bookings_payment_status_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <span className="text-muted-foreground">{t("bookings_payment_status_all")}</span>
                  </SelectItem>
                  <SelectItem value="Đã thanh toán">{t("bookings_payment_status_paid")}</SelectItem>
                  <SelectItem value="Chưa thanh toán">{t("bookings_payment_status_unpaid")}</SelectItem>
                  <SelectItem value="Thanh toán một phần">{t("bookings_payment_status_partial")}</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>
        </motion.div>{" "}
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <motion.div className="flex items-center justify-between">
            <motion.div>
              <TabsList>
                <TabsTrigger value="all">{t("bookings_payment_status_all")}</TabsTrigger>
                <TabsTrigger value="pending">{t("bookings_payment_status_pending")}</TabsTrigger>
                <TabsTrigger value="Check-In">{t("bookings_payment_status_checkin")}</TabsTrigger>
                <TabsTrigger value="Check-Out">{t("bookings_payment_status_checkout")}</TabsTrigger>
                <TabsTrigger value="confirmed">{t("bookings_payment_status_confirmed")}</TabsTrigger>
              </TabsList>
            </motion.div>
            <motion.div className="flex items-center">
              <Button
                className={hotelTheme === "dark" ? "text-white mr-2" : "mr-2"}
                variant="ghost"
                onClick={handleReloadPage}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <span className="text-muted-foreground text-sm italic">
                {t("bookings_displaying")} {bookingsToDisplay?.length || 0} {t("bookings_of_total")}{" "}
                {bookings.length || null} {t("bookings_reservations")}
              </span>
            </motion.div>
          </motion.div>

          {/* inline error banner (non-blocking) */}
          {error && (
            <div className="rounded-md border border-red-300 bg-red-50 text-red-700 p-3 text-sm">
              {t("bookings_error")} <span className="font-medium">{String(error)}</span>.
            </div>
          )}

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {/* Reservations List */}
            {(bookingsToDisplay?.length ?? bookings.length) === 0 ? (
              error ? (
                // If there is an error and no data, show holding/error page
                <HoldingPage />
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                >
                  <Image src="/assets/img/Error/Search_brown.svg" alt="No bookings found" width={150} height={150} />
                  <p className="text-muted-foreground text-lg mb-4">{t("bookings_no_results_found")}</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setPaymentStatusFilter("all");
                    }}
                  >
                    {t("bookings_clear_filters")}
                  </Button>
                </motion.div>
              )
            ) : (
              <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                {(bookingsToDisplay || bookings).map((reservation, index) => (
                  <motion.div key={reservation.bookId} variants={cardVariants} whileHover="hover" custom={index}>
                    <Card className="relative">
                      {reservation.status === "Check-In" && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-10">
                          <Check className="size-5 text-white" />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <User className="size-4" />
                              {reservation.guestName}
                            </CardTitle>
                            <CardDescription className="">
                              <div className="">
                                {" "}
                                {reservation.bookId} • {reservation.roomType}{" "}
                                {reservation.roomName && `• ${reservation.roomName}`}
                              </div>
                            </CardDescription>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="flex gap-2">
                              {BookingSourceColor(reservation.bookingSource)}{" "}
                              {PaymentStatusColor(reservation.paymentStatus)}
                            </div>
                            <div className="mx-auto text-xs text-muted-foreground">
                              {format(new Date(reservation.createdAt || ""), "dd/MM/yyyy | HH:mm")}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Contact Info */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium italic">{t("bookings_contact_info")}</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2">
                                <Mail className="size-3 text-muted-foreground" />
                                <span>{reservation.guestEmail}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="size-3 text-muted-foreground" />
                                <span>{reservation.guestNumber}</span>
                              </div>
                            </div>
                          </div>

                          {/* Stay Details */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium italic">{t("bookings_stay_details")}</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="size-3 text-muted-foreground" />
                                <span>
                                  {format(new Date(reservation.checkInDate), "dd/MM/yyyy")} -{" "}
                                  {format(new Date(reservation.checkOutDate), "dd/MM/yyyy")}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="size-3 text-muted-foreground" />
                                <span>
                                  {reservation.guestAdult} {t("bookings_adults")} - {reservation.guestChildren}{" "}
                                  {t("bookings_children")}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Billing */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium italic">{t("bookings_billing")}</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2">
                                <CreditCard className="size-3 text-muted-foreground" />
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND"
                                }).format(Number(reservation.roomPrice) || 0)}
                                /{t("bookings_night")} - ({" "}
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND"
                                }).format(
                                  (Number(reservation.totalPrice) || 0) > 0
                                    ? Number(reservation.totalPrice)
                                    : (Number(reservation.roomPrice) || 0) *
                                        calcNights(reservation.checkInDate, reservation.checkOutDate)
                                )}{" "}
                                {t("bookings_total")} )
                              </div>
                              <div className="flex items-center gap-2">
                                <CreditCard className="size-3 text-muted-foreground" />
                                <span>
                                  {t("bookings_status")}: {reservation.paymentStatus}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Special Requests */}
                        {reservation.description && (
                          <div className="mt-4 p-3 bg-muted rounded-lg">
                            <h4 className="text-sm font-medium italic mb-1">{t("bookings_special_requests")}</h4>
                            <p className="text-sm text-muted-foreground">{reservation.description}</p>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between gap-2 mt-4">
                          <div className="flex flex-wrap gap-2">
                            {(reservation.status === "confirmed" || reservation.status === "pending") &&
                              reservation.residenceRegistrationInfo?.registrationStatus !== "registered" && (
                                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                  <Button size="sm" onClick={() => handleCheckIn(reservation)}>
                                    <Key className="size-4" />
                                    {t("bookings_check_in_button")}
                                  </Button>
                                </motion.div>
                              )}

                            {reservation.status === "Check-In" && (
                              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                <Button className="" size="sm" onClick={() => handleCheckOut(reservation)}>
                                  <UserX className="size-4" />
                                  {t("bookings_check_out_button")}
                                </Button>
                              </motion.div>
                            )}
                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                              <Button variant="secondary" size="sm" onClick={() => handleReceiptTicket(reservation)}>
                                <ReceiptText className="size-4" />
                                {reservation.paymentStatus === "Đã thanh toán"
                                  ? t("bookings_receipt_button")
                                  : t("bookings_payment_button")}
                              </Button>
                            </motion.div>
                            {/* details button */}
                            <motion.div
                              variants={buttonVariants}
                              whileHover="hover"
                              whileTap="tap"
                              className="shrink-0"
                            >
                              <Button size="sm" variant="secondary" onClick={() => handlerOpenViewDetails(reservation)}>
                                <Eye className="size-4" />
                                {t("bookings_view_details_button")}
                              </Button>
                            </motion.div>
                            {/* delete button */}
                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteBooking(reservation)}
                                disabled={
                                  reservation.status === "Check-In" ||
                                  reservation.status === "Check-Out" ||
                                  reservation.paymentStatus === "Đã thanh toán"
                                }
                                className="disabled:bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200 disabled:cursor-not-allowed"
                              >
                                <Trash2 className="size-4" />
                                {t("bookings_delete_button")}
                              </Button>
                            </motion.div>
                            {/* booking status sign button */}
                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                              <Button
                                size="sm"
                                className="bg-amber-500 hover:bg-amber-600 disabled:bg-green-300 disabled:text-green-800 disabled:hover:bg-green-300 disabled:cursor-not-allowed"
                                onClick={() => handleConfirmBooking(reservation)}
                                disabled={
                                  confirmingId === reservation.bookId ||
                                  reservation.status === "confirmed" ||
                                  reservation.status === "Check-In"
                                }
                              >
                                {confirmingId === reservation.bookId || reservation.status === "confirmed" ? (
                                  <>
                                    {loading ? (
                                      <RotateCcw className="size-4 animate-spin" />
                                    ) : (
                                      <UserRoundCheck className="size-4" />
                                    )}
                                    {t("bookings_confirm_button")}
                                  </>
                                ) : reservation.status === "Check-In" ? (
                                  <>
                                    <UserRoundCheck className="size-4" />
                                    {t("bookings_checked_in_button")}
                                  </>
                                ) : (
                                  <>
                                    <UserRoundPen className="size-4" />
                                    {t("bookings_confirm_button")}
                                  </>
                                )}
                              </Button>
                            </motion.div>
                          </div>
                          <div>{/* group booking badge */}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
        {/* view+edit reservation dialog */}
        {selectedBooking && (
          <Dialog open={isShowBooking} onOpenChange={handleCloseDialog}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <motion.div initial="hidden" animate="visible" exit="exit">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {isEditMode ? <Edit className="size-5" /> : <Eye className="size-5" />}
                    {isEditMode ? t("bookings_edit_reservation") : t("bookings_view_reservation")}
                  </DialogTitle>
                  <DialogDescription>
                    {isEditMode ? t("bookings_edit_reservation") : t("bookings_complete_reservation_for")}{" "}
                    {selectedBooking?.guestName} - {selectedBooking?.bookId}
                  </DialogDescription>
                </DialogHeader>
                {(isEditMode ? editFormData : selectedBooking) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      stiffness: 250,
                      duration: 0.4
                    }}
                    className="space-y-6"
                  >
                    {/* Status Badges */}
                    <div className="flex gap-2 flex-wrap">
                      {PaymentStatusColor(selectedBooking.paymentStatus)}
                      {""}
                      {BookingSourceColor(selectedBooking.bookingSource)}
                    </div>
                    <Separator />

                    {/* Guest Information */}
                    <div>
                      <h3 className="flex items-center gap-2 mb-3">
                        <User className="size-4" />
                        {t("bookings_guest_information")}
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>{t("bookings_guest_name")}</Label>
                          {isEditMode && editFormData ? (
                            <Input
                              value={editFormData.guestName}
                              onChange={(e) => setEditFormData({ ...editFormData, guestName: e.target.value })}
                            />
                          ) : (
                            <div className="p-2 bg-muted rounded-md text-sm">{selectedBooking.guestName}</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          {isEditMode && editFormData ? (
                            <Input
                              type="email"
                              value={editFormData.guestEmail}
                              onChange={(e) => setEditFormData({ ...editFormData, guestEmail: e.target.value })}
                            />
                          ) : (
                            <div className="p-2 bg-muted rounded-md text-sm flex items-center gap-2">
                              <Mail className="size-3 text-muted-foreground" />
                              {selectedBooking.guestEmail}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label>{t("bookings_guest_phone")}</Label>
                          {isEditMode && editFormData ? (
                            <Input
                              value={editFormData.guestNumber}
                              onChange={(e) => setEditFormData({ ...editFormData, guestNumber: e.target.value })}
                            />
                          ) : (
                            <div className="p-2 bg-muted rounded-md text-sm flex items-center gap-2">
                              <Phone className="size-3 text-muted-foreground" />
                              {selectedBooking.guestNumber}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label>]{t("bookings_id")}</Label>
                          <div className="p-2 bg-muted rounded-md text-sm">{selectedBooking.bookId}</div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Room & Stay Details */}
                    <div>
                      <h3 className="flex items-center gap-2 mb-3">
                        <DoorOpen className="size-2 italic " />
                        {t("bookings_room_stay_details")}
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>{t("bookings_room_type")}</Label>
                          <div className="p-2 bg-muted rounded-md text-sm">{selectedBooking.roomType}</div>
                        </div>
                        {(selectedBooking.roomNumber || selectedBooking.roomName) && (
                          <div className="space-y-2">
                            <Label>{t("bookings_room_number")}</Label>
                            <div className="p-2 bg-muted rounded-md text-sm">
                              {selectedBooking.roomNumber || selectedBooking.roomName}
                            </div>
                          </div>
                        )}
                        <div className="space-y-2">
                          <Label>{t("bookings_check_in_date")}</Label>
                          <div className="p-2 bg-muted rounded-md text-sm flex items-center gap-2">
                            <CalendarIcon className="size-3 text-muted-foreground" />
                            {format(new Date(selectedBooking.checkInDate), "dd/MM/yyyy")}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>{t("bookings_check_out_date")}</Label>
                          <div className="p-2 bg-muted rounded-md text-sm flex items-center gap-2">
                            <CalendarIcon className="size-3 text-muted-foreground" />
                            {format(new Date(selectedBooking.checkOutDate), "dd/MM/yyyy")}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>{t("bookings_guest_adult")}</Label>
                          <div className="p-2 bg-muted rounded-md text-sm">{selectedBooking.guestAdult}</div>
                        </div>
                        <div className="space-y-2">
                          <Label>{t("bookings_guest_children")}</Label>
                          <div className="p-2 bg-muted rounded-md text-sm">{selectedBooking.guestChildren}</div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Billing Information */}
                    <div>
                      <h3 className="flex items-center gap-2 mb-3">
                        <CreditCard className="size-4" />
                        {t("bookings_billing_information")}
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>{t("bookings_total_amount")}</Label>
                          <div className="p-2 bg-muted rounded-md text-sm">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND"
                            }).format(
                              (Number(selectedBooking.totalPrice) || 0) > 0
                                ? Number(selectedBooking.totalPrice)
                                : (Number(selectedBooking.roomPrice) || 0) *
                                    calcNights(selectedBooking.checkInDate, selectedBooking.checkOutDate)
                            )}{" "}
                            {t("bookings_total")}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>{t("bookings_payment_status")}</Label>
                          {isEditMode && editFormData ? (
                            <Select
                              value={editFormData.paymentStatus}
                              onValueChange={(value) =>
                                setEditFormData({
                                  ...editFormData,
                                  paymentStatus: value as Bookings["paymentStatus"]
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Đã thanh toán">{t("bookings_payment_status_paid")}</SelectItem>
                                <SelectItem value="Chưa thanh toán">{t("bookings_payment_status_unpaid")}</SelectItem>
                                <SelectItem value="Thanh toán một phần">
                                  {t("bookings_payment_status_partial")}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="p-2 bg-muted rounded-md text-sm">{selectedBooking.paymentStatus}</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label>{t("bookings_booking_source")}</Label>
                          {isEditMode && editFormData ? (
                            <Select
                              value={editFormData.bookingSource}
                              onValueChange={(value) => setEditFormData({ ...editFormData, bookingSource: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Agoda">Agoda</SelectItem>
                                <SelectItem value="Expedia">Expedia</SelectItem>
                                <SelectItem value="小红书">小红书</SelectItem>
                                <SelectItem value="Booking.com">Booking.com</SelectItem>
                                <SelectItem value="Trivago">Trivago</SelectItem>
                                <SelectItem value="Traveloka">Traveloka</SelectItem>
                                <SelectItem value="mobile">Mobile</SelectItem>
                                <SelectItem value="trực tiếp">Trực tiếp</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="p-2 bg-muted rounded-md text-sm">{selectedBooking.bookingSource}</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label>{t("bookings_created_at")}</Label>
                          <div className="p-2 bg-muted rounded-md text-sm">
                            {format(new Date(selectedBooking.createdAt || ""), "dd/MM/yyyy")}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    {selectedBooking.description && (
                      <>
                        <Separator />
                        <div>
                          <Label className="mb-2 block">{t("bookings_special_requests")}</Label>
                          <div className="p-3 bg-muted rounded-md text-sm">{selectedBooking.description}</div>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                <motion.div className="flex gap-2 pt-4">
                  {isEditMode ? (
                    <>
                      <Button onClick={handleSaveEdit} className="flex-1">
                        {t("bookings_save_changes_button")}
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" className="flex-1">
                        {t("bookings_cancel_button")}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => handleEditBooking()} variant="outline" className="flex-1">
                        <Edit className="size-4 mr-2" />
                        {t("bookings_edit_button")}
                      </Button>
                      <Button onClick={handleCloseDialog} className="flex-1">
                        {t("bookings_close_button")}
                      </Button>
                    </>
                  )}
                </motion.div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
        {/* Check-In Dialog */}
        <CheckInForm selectedBooking={selectedBooking} />
        {/* Confirmation Ticket */}
        <ConfirmTicket
          selectedReservation={selectedBooking}
          isConfirmationTicketOpen={isConfirmationTicketOpen}
          setIsConfirmationTicketOpen={setIsConfirmationTicketOpen}
        />
        {/* POS */}
        <Drawer direction="right" open={isPOSCheckoutOpen} onOpenChange={setIsPOSCheckoutOpen}>
          <DrawerContent className="h-full ml-auto w-[calc(100vw-16rem)] max-w-none rounded-r-none rounded-l-lg">
            <DrawerTitle className="sr-only">{t("bookings_pos_title")}</DrawerTitle>
            <DrawerDescription className="sr-only">{t("bookings_pos_description")}</DrawerDescription>
            {selectedBooking && (
              <PointOfSales reservation={selectedBooking} onClose={() => setIsPOSCheckoutOpen(false)} />
            )}
          </DrawerContent>
        </Drawer>
        {/* Bill Dialog */}
        {selectedBooking && (
          <Dialog open={isBillOpen} onOpenChange={setIsBillOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>HÓA ĐƠN THANH TOÁN</DialogTitle>
                <DialogDescription>
                  Hóa đơn cho {selectedBooking.guestName} - {selectedBooking.bookId}
                  <br />
                  Mã hóa đơn: {selectedTransaction?.transactionId}
                </DialogDescription>
              </DialogHeader>
              <Bill invoice={selectedBooking} transaction={selectedTransaction} />
              <div className="flex gap-2 pt-4">
                <Button onClick={() => window.print()} className="flex-1">
                  In hóa đơn
                </Button>
                <Button onClick={() => setIsBillOpen(false)} variant="outline" className="flex-1">
                  Đóng
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default BookingManagement;
