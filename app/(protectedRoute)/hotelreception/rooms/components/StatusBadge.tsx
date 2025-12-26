import { Badge } from "@/components/ui/badge";
const getStatusColor = (status: string) => {
  switch (status) {
    case "đang sử dụng":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200 group hover:bg-green-200">Đang sử dụng</Badge>
      );
    case "đang bảo trì":
      return (
        <Badge className="bg-orange-100 text-orange-800 border-orange-200 group hover:bg-orange-200">
          Đang bảo trì
        </Badge>
      );
    case "đã đặt trước":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 group hover:bg-yellow-200">
          Đã đặt trước
        </Badge>
      );
    case "đang dọn dẹp":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200 group hover:bg-blue-200">Đang dọn dẹp</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200 group hover:bg-gray-200">Còn trống</Badge>;
  }
};

export default getStatusColor;
