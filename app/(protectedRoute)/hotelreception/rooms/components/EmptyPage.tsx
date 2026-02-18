import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, DollarSign, Plus, Search, Wifi } from "lucide-react";
import React from "react";
import { useUISlice } from "@/stores/UI/useUIStore";
import AddRoom from "./AddRoom";
import { useTranslation } from "react-i18next";
const EmptyPage = () => {
  const { t } = useTranslation();
  const setIsCreateRoom = useUISlice((state) => state.setIsCreateRoom);

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="rounded-full bg-gray-100 p-6 mb-4">
          <Bed className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{t("empty_page_title")}</h3>
        <p className="text-gray-600 text-center mb-6 max-w-md">{t("empty_page_message")}</p>
        <Button onClick={() => setIsCreateRoom(true)}>
          <AddRoom />
        </Button>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Wifi className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium">{t("empty_page_amenities")}</p>
            <p className="text-xs text-gray-600 mt-1">{t("empty_page_amenities_description")}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium">{t("empty_page_flexible_pricing")}</p>
            <p className="text-xs text-gray-600 mt-1">{t("empty_page_flexible_pricing_description")}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Search className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium">{t("empty_page_maintenance_tracking")}</p>
            <p className="text-xs text-gray-600 mt-1">{t("empty_page_maintenance_tracking_description")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyPage;
