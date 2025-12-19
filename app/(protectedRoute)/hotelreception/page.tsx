"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bed, Users, Calendar, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Tổng phòng",
      value: "120",
      change: "+2.5%",
      icon: Bed,
      color: "blue"
    },
    {
      title: "Khách đang lưu trú",
      value: "89",
      change: "+12%",
      icon: Users,
      color: "green"
    },
    {
      title: "Đặt phòng hôm nay",
      value: "24",
      change: "+8%",
      icon: Calendar,
      color: "orange"
    },
    {
      title: "Doanh thu tháng",
      value: "2.4M VNĐ",
      change: "+15%",
      icon: DollarSign,
      color: "purple"
    }
  ];

  const roomStatus = [
    { status: "Có sẵn", count: 31, color: "bg-green-500" },
    { status: "Đã đặt", count: 89, color: "bg-blue-500" },
    { status: "Bảo trì", count: 5, color: "bg-yellow-500" },
    { status: "Đang dọn", count: 8, color: "bg-orange-500" }
  ];

  const recentErrors = [
    {
      id: 1,
      message: "Lỗi kết nối hệ thống thanh toán",
      time: "10 phút trước",
      severity: "high",
      status: "resolved"
    },
    {
      id: 2,
      message: "Sự cố đồng bộ dữ liệu đặt phòng",
      time: "1 giờ trước",
      severity: "medium",
      status: "investigating"
    },
    {
      id: 3,
      message: "Cảnh báo: Server phản hồi chậm",
      time: "2 giờ trước",
      severity: "low",
      status: "monitoring"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Tổng quan khách sạn</h2>
        <p className="text-gray-600">Theo dõi tình hình hoạt động và các lỗi hệ thống</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <Icon className="w-4 h-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change} so với tháng trước
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Status */}
        <Card>
          <CardHeader>
            <CardTitle>Tình trạng phòng</CardTitle>
            <CardDescription>Phân bố trạng thái các phòng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {roomStatus.map((room, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${room.color}`} />
                  <span>{room.status}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{room.count}</span>
                  <span className="text-gray-500">phòng</span>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Tỷ lệ lấp đầy</span>
                <span>74%</span>
              </div>
              <Progress value={74} className="w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Errors */}
        <Card>
          <CardHeader>
            <CardTitle>Lỗi gần đây</CardTitle>
            <CardDescription>Theo dõi các sự cố hệ thống</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentErrors.map((error) => (
              <div key={error.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {error.status === "resolved" ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : error.status === "investigating" ? (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{error.message}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge
                      variant={
                        error.severity === "high"
                          ? "destructive"
                          : error.severity === "medium"
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {error.severity === "high" ? "Cao" : error.severity === "medium" ? "Trung bình" : "Thấp"}
                    </Badge>
                    <span className="text-xs text-gray-500">{error.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default Dashboard;
