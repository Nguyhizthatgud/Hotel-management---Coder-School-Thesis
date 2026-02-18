"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle, HousePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const HoldingPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="max-w-md w-full bg-linear-to-bl from-amber-50 via-white to-amber-50 shadow-lg rounded-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Icon */}
            <div className="rounded-full bg-muted p-6">
              <AlertCircle className="size-12 text-muted-foreground" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{t("holding_page_title")}</h2>
              <p className="text-muted-foreground">{t("holding_page_message")}</p>
            </div>

            {/* Additional Info */}
            <div className="bg-muted/50 p-4 rounded-lg w-full">
              <p className="text-sm text-muted-foreground">{t("holding_page_additional_info")}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full">
              <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white" onClick={() => router.push("/")}>
                <Home className="size-4 mr-2" />
                {t("holding_page_home_button")}
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => router.push("/hotelreception/rooms")}>
                <HousePlus className="size-4 mr-2" />
                {t("holding_page_manage_rooms_button")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HoldingPage;
