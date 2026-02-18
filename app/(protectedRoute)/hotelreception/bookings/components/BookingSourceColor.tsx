import { Badge } from "@/components/ui/badge";
const BookingSourceColor = (bookingState: string) => {
  switch (bookingState) {
    case "Agoda":
      return <Badge className="bg-purple-100 text-purple-800 border-purple-200 group hover:bg-purple-200">Agoda</Badge>;

    case "Expedia":
      return (
        <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 group hover:bg-indigo-200">Expedia</Badge>
      );
    case "Booking.com":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200 group hover:bg-blue-200">Booking.com</Badge>;
    case "Traveloka":
      return <Badge className="bg-sky-100 text-sky-800 border-sky-200 group hover:bg-sky-200">Traveloka</Badge>;
    case "Trivago":
      return <Badge className="bg-red-100 text-red-800 border-red-200 group hover:bg-red-200">Trivago</Badge>;
    case "小红书":
      return <Badge className="bg-pink-100 text-pink-800 border-pink-200 group hover:bg-pink-200">小红书</Badge>;
    case "mobile":
      return <Badge className="bg-green-100 text-green-800 border-green-200 group hover:bg-green-200">Mobile</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200 group hover:bg-gray-200">trực tiếp</Badge>;
  }
};

export default BookingSourceColor;
