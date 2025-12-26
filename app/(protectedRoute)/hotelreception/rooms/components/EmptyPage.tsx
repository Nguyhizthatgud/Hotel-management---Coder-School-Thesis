import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, DollarSign, Plus, Search, Wifi } from "lucide-react";
import React from "react";
import { useUISlice } from "@/stores/UI/useUIStore";
import AddRoom from "./AddRoom";
const EmptyPage = () => {
  const setIsCreateRoom = useUISlice((state) => state.setIsCreateRoom);

  return (
    <Card className="border-dashed border-2 bg-linear-to-br from-amber-50 via-white to-amber-50 shadow-lg rounded-lg">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="rounded-full bg-gray-100 p-6 mb-4">
          <Bed className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Chưa có phòng nào</h3>
        <p className="text-gray-600 text-center mb-6 max-w-md">
          Bắt đầu bằng cách thêm phòng đầu tiên cho khách sạn của bạn. Bạn có thể quản lý thông tin phòng, giá cả và
          tiện ích một cách dễ dàng.
        </p>
        <Button onClick={() => setIsCreateRoom(true)}>
          <AddRoom />
        </Button>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Wifi className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Quản lý tiện ích</p>
            <p className="text-xs text-gray-600 mt-1">WiFi, Gym, Bãi đỗ xe...</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Thiết lập giá</p>
            <p className="text-xs text-gray-600 mt-1">Linh hoạt theo từng phòng</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Search className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Theo dõi trạng thái</p>
            <p className="text-xs text-gray-600 mt-1">Có sẵn, Đã đặt, Bảo trì</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyPage;
