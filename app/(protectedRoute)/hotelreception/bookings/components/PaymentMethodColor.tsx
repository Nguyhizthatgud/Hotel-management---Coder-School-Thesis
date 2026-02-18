import { Badge } from "@/components/ui/badge";
const PaymentMethodColor = (state: string) => {
  switch (state) {
    case "Credit Card":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Credit Card</Badge>;
    case "Cash":
      return <Badge className="b`g-green-100 text-green-800 border-green-200">Tiền mặt</Badge>;
    case "Bank Transfer":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Bank Chuyển khoản</Badge>;
    case "E-Wallet":
      return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Ví điện tử</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Thanh toán khi trả phòng</Badge>;
  }
};
export default PaymentMethodColor;
