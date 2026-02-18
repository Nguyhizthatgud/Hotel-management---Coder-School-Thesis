"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
const CustomerManagement = () => {
  const { t } = useTranslation();
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("maintenance_title")}</h1>
          <p className="text-sm text-muted-foreground italic">{t("maintenance_description")}</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t("maintenance_add_plan")}
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
            <span className="text-muted-foreground italic">{t("maintenance_under_development")}</span>
          </div>{" "}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerManagement;
