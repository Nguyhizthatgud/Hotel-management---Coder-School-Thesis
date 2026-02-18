import { Badge } from "@/components/ui/badge";
const PaymentStatusColor = (status: "Đã thanh toán" | "Chưa thanh toán" | "Thanh toán một phần") => {
  switch (status) {
    case "Đã thanh toán":
      return (
        <Badge className="text-green-800 bg-green-100 border-green-300 group hover:bg-green-200">Đã thanh toán</Badge>
      );
    case "Chưa thanh toán":
      return (
        <Badge className="text-yellow-800 bg-yellow-100 border-yellow-300 group hover:bg-yellow-200">
          Chưa thanh toán
        </Badge>
      );
    case "Thanh toán một phần":
      return (
        <Badge className="text-blue-800 bg-blue-100 border-blue-300 group hover:bg-blue-200">Thanh toán một phần</Badge>
      );
    default:
      return (
        <span className="px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
          Hủy thanh toán
        </span>
      );
  }
};
export default PaymentStatusColor;
