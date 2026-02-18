"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useUISlice } from "@/stores/UI/useUIStore";
const Page = () => {
  const { t } = useTranslation();
  const hotelTheme = useUISlice((state) => state.hotelTheme);
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={hotelTheme === "dark" ? "text-white text-2xl font-bold" : "text-2xl font-bold"}>
            {t("staff_title")}
          </h1>
          <p className="text-sm text-muted-foreground italic">{t("staff_description")}</p>
        </div>
        <Button className={hotelTheme === "dark" ? "bg-gray-700 text-white" : "bg-gray-700 text-white"}>
          <Plus className="w-4 h-4 mr-2" />
          {t("staff_add_button")}
        </Button>
      </div>

      <Tabs defaultValue="customers" className="space-y-4">
        <TabsContent value="customers" className="space-y-4">
          <div className="flex flex-col justify-center items-center">
            <Image
              src="/assets/img/Error/under_development.svg"
              alt="Maintenance Dashboard"
              width={400}
              height={400}
              className="rounded-md"
            />
            <span className="text-muted-foreground italic">{t("staff_under_development")}</span>
          </div>{" "}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
