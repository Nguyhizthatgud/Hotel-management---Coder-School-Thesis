"use client";
import React from "react";
import { useState } from "react";
import { motion, Transition } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Receipt,
  Calendar,
  Search,
  Download,
  Eye,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Clock,
  RotateCcw
} from "lucide-react";
import { useTransactionStore } from "@/stores/useTransaction";
import { useBookingStore } from "@/stores/useBookingService";
import { useTranslation } from "react-i18next";
import SkeletonHoldingContent from "./components/SkeletonHoldingContent";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

const Transactions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { loading, transactions, fetchTransactions } = useTransactionStore();
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  React.useEffect(() => {
    setIsMounted(true);
    fetchTransactions();
  }, [fetchTransactions]);

  const { bookings, fetchBookings } = useBookingStore();
  const totalTransactionsAmountPerMonth = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const totalTransaction = transactions.reduce((sum, transaction) => {
      const transactionDate = new Date(transaction.date);
      const isThisMonth =
        transactionDate.getMonth() === today.getMonth() && transactionDate.getFullYear() === today.getFullYear();
      return isThisMonth ? sum + transaction.amount : sum;
    }, 0);
    return totalTransaction;
  };
  const fundingAmount = () => {
    const totalRefunded = transactions.reduce((sum, transaction) => {
      try {
        const description = JSON.parse(transaction.description || "{}");
        const changer = Number(description.changer || 0);
        return sum + changer;
      } catch (error) {
        console.error("Error parsing transaction description:", error);
        return sum;
      }
    }, 0);
    return totalRefunded;
  };

  const totalRevenue = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0);

  const pendingRevenue = React.useMemo(() => {
    // Pending from existing transactions
    const pendingTransactions = transactions
      .filter((t) => t.status === "pending")
      .reduce((sum, t) => sum + t.amount, 0);

    // Pending from unpaid bookings
    const pendingBookings = bookings
      .filter((b) => b.paymentStatus !== "Đã thanh toán")
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    return pendingTransactions + pendingBookings;
  }, [transactions, bookings]);
  const avgTransactionValue = totalRevenue / transactions.filter((t) => t.status === "completed").length;
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
  const revenueBreakdown = React.useMemo(() => {
    const roomChargeAmount = transactions.reduce((sum, transaction) => {
      try {
        const description = JSON.parse(transaction.description || "{}");
        const reservationTotalPrice = Number(description.reservationTotalPrice || 0);
        return sum + reservationTotalPrice;
      } catch (error) {
        console.error("Error parsing transaction description:", error);
        return sum;
      }
    }, 0);

    const serviceAmount = transactions.reduce((sum, transaction) => {
      try {
        const description = JSON.parse(transaction.description || "{}");
        const serviceTotal = Number(description.serviceTotal || 0);
        return sum + serviceTotal;
      } catch (error) {
        console.error("Error parsing transaction description:", error);
        return sum;
      }
    }, 0);
    const total = roomChargeAmount + serviceAmount;

    return [
      {
        name: t("transactions_room_charges"),
        value: roomChargeAmount,
        percentage: total > 0 ? ((roomChargeAmount / total) * 100).toFixed(1) : 0
      },
      {
        name: t("transactions_service_amount"),
        value: serviceAmount,
        percentage: total > 0 ? ((serviceAmount / total) * 100).toFixed(1) : 0
      }
    ];
  }, [transactions, t]);

  const revenueData = React.useMemo(() => {
    const monthsData = [];
    const today = new Date();
    // 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = date.toLocaleDateString(locale, { month: "short" });
      const year = date.getFullYear();
      const month = date.getMonth();

      // Filter transactions for this month
      const monthTransactions = transactions.filter((t) => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === month && transactionDate.getFullYear() === year;
      });

      const revenue = monthTransactions.reduce((sum, t) => sum + t.amount, 0);

      monthsData.push({
        month: monthName,
        revenue: revenue,
        transactions: monthTransactions.length
      });
    }

    return monthsData;
  }, [transactions, locale]);

  const handleReloadPage = async () => {
    await fetchTransactions();
    await fetchBookings();
  };

  const filteredTransactions = React.useMemo(() => {
    return transactions.filter((transaction) => {
      if (statusFilter !== "all" && transaction.status !== statusFilter) {
        return false;
      }
      if (typeFilter !== "all" && transaction.category !== typeFilter) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          transaction.guestName?.toLowerCase().includes(query) ||
          transaction.transactionId?.toLowerCase().includes(query) ||
          transaction.reservationId?.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [transactions, searchQuery, statusFilter, typeFilter]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const formattedValue = new Intl.NumberFormat("vi-VN").format(value);
      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "8px 12px"
          }}
          className="dark:bg-slate-950! dark:border-slate-700!"
        >
          <p className="text-sm font-medium dark:text-white">{`${formattedValue}đ`}</p>
        </div>
      );
    }
    return null;
  };

  if (!isMounted) {
    return <SkeletonHoldingContent />;
  }

  if (loading) {
    return <SkeletonHoldingContent />;
  }

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      } as Transition
    }
  };

  const itemVariants = {
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

  return (
    <motion.div className="space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
      {/* Header */}
      <motion.div className="flex items-center justify-between" variants={headerVariants}>
        <div>
          <h2 className="text-2xl font-bold">{t("transactions_title")}</h2>
          <p className="text-muted-foreground">{t("transactions_subheading")}</p>
        </div>
        <div className="flex gap-2">
          <Button className="mr-2" variant="ghost" onClick={handleReloadPage}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {t("transactions_download_report")}
          </Button>
        </div>
      </motion.div>

      {/* Revenue Overview Cards */}
      <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center justify-between">
                <span>{t("transactions_total_revenue")}</span>
                <DollarSign className="size-4 text-green-600" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-2xl font-semibold">
                  {new Intl.NumberFormat("vi-VN").format(totalTransactionsAmountPerMonth())}đ
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <ArrowUpRight className="size-3" />
                  <span>
                    {Math.round((totalRevenue / totalTransactionsAmountPerMonth()) * 100)}%{" "}
                    {t("transactions_per_month")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center justify-between">
                <span>{t("transactions_expected_revenue")}</span>
                <Clock className="size-4 text-yellow-600" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-2xl font-semibold">{new Intl.NumberFormat("vi-VN").format(pendingRevenue)}đ</div>
                <div className="text-xs text-orange-300">
                  {t("transactions_pending_transactions")} {transactions.filter((t) => t.status === "pending").length}{" "}
                  {t("transactions_expected_revenue_description")}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center justify-between">
                <span>{t("transactions_refund")}</span>
                <TrendingDown className="size-4 text-red-600" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-2xl font-semibold">{new Intl.NumberFormat("vi-VN").format(fundingAmount())}đ</div>
                <div className="text-xs text-red-600">
                  {t("transactions_pending_transactions")} {transactions.length}{" "}
                  {t("transactions_pending_transaction1")}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center justify-between">
                <span>{t("transactions_avg_transaction")}</span>
                <Wallet className="size-4 text-blue-600" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-2xl font-semibold">
                  {new Intl.NumberFormat("vi-VN").format(avgTransactionValue)}đ
                </div>

                <div className="flex items-center gap-1 text-xs text-green-600">
                  <span>
                    {transactions.filter((t) => t.status === "completed").length}{" "}
                    {t("transactions_completed_transactions")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={containerVariants}>
        {/* Revenue Trend Chart */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>{t("transactions_revenue_trend")}</CardTitle>
              <CardDescription>{t("transactions_monthly_revenue_last_6_months")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 4 }}
                    name={t("transactions_revenue_title_for_chart")}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue by Category */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>{t("transactions_revenue_breakdown")}</CardTitle>
              <CardDescription>{t("transactions_revenue_breakdown_description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px"
                    }}
                    formatter={(value) => new Intl.NumberFormat("vi-VN").format(Number(value)) + "đ"}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {revenueBreakdown.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="ml-auto font-medium">{new Intl.NumberFormat("vi-VN").format(item.value)}đ</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Transactions List */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("transactions_recent_transactions")}</CardTitle>
                <CardDescription>{t("transactions_complete_history")}</CardDescription>
              </div>
              <Badge variant="secondary">
                {filteredTransactions.length} {t("transactions_total_transactions")}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <div className="flex items-center gap-2 flex-1 min-w-[250px]">
                <Search className="size-4 text-muted-foreground" />
                <Input
                  placeholder={t("transactions_search_placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="size-4 mr-2" />
                  <SelectValue placeholder={t("transactions_filter_status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("transactions_status_all")}</SelectItem>
                  <SelectItem value="completed">{t("transactions_status_completed")}</SelectItem>
                  <SelectItem value="pending">{t("transactions_status_pending")}</SelectItem>
                  <SelectItem value="refunded">{t("transactions_status_refunded")}</SelectItem>
                  <SelectItem value="cancelled">{t("transactions_status_cancelled")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transactions Table */}
            <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate="visible">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 rounded-lg bg-muted">
                      <Receipt className="size-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{transaction.transactionId}</span>
                        <Badge variant="outline">{t(`transactions_status_${transaction.status}`)}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.guestName} • {transaction.reservationId}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(transaction.date).toLocaleDateString("vi-VN")} at {transaction.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        {new Intl.NumberFormat("vi-VN").format(transaction.amount)}đ
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {t("transactions_payment_method")}{" "}
                        {transaction.paymentMethod
                          ? transaction.paymentMethod === "cash"
                            ? t("transactions_payment_method_cash")
                            : t("transactions_payment_method_card")
                          : t("transactions_payment_method_unknown")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <Receipt className="size-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{t("transactions_no_transactions_found")}</h3>
                <p className="text-muted-foreground">{t("transactions_adjust_filters_or_query")}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Transactions;
