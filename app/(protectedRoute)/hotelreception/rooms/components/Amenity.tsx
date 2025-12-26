import { Wifi, Tv, AirVent, Refrigerator, Icon, HandPlatter, KeySquare } from "lucide-react";
import { kettleElectric, coatHanger } from "@lucide/lab";
import React from "react";
const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "WiFi":
      return <Wifi className="h-4 w-4" />;
    case "TV":
      return <Tv className="h-4 w-4" />;
    case "Điều hòa":
      return <AirVent className="h-4 w-4" />;
    case "Tủ lạnh":
      return <Refrigerator className="h-4 w-4" />;
    case "Ấm đun nước":
      return <Icon iconNode={kettleElectric} className="h-4 w-4" />;
    case "Dịch vụ phòng":
      return <HandPlatter className="h-4 w-4" />;
    case "Dịch vụ giặt ủi":
      return <Icon iconNode={coatHanger} className="h-4 w-4" />;
    case "Thuê xe":
      return <KeySquare className="h-4 w-4" />;

    default:
      return null;
  }
};

export { getAmenityIcon };
