"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, Home, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
const HoldingPage = () => {
  const router = useRouter();
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
              <h2 className="text-2xl font-bold">404! Ooops... giời ơi toang rồi.</h2>
              <p className="text-muted-foreground">Page tèo rồi! report hỗ dùm em.</p>
            </div>

            {/* Additional Info */}
            <div className="bg-muted/50 p-4 rounded-lg w-full">
              <p className="text-sm text-muted-foreground">
                Mình bình tĩnh thì mọi chuyện sẽ ổn thôi. Hãy kiểm tra lại đường dẫn hoặc quay về trang chủ.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full">
              <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white" onClick={() => router.push("/")}>
                <Home className="size-4 mr-2" />
                Về Trang Chủ
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => router.push("/bookings")}>
                <UserCheck className="size-4 mr-2" />
                Xem Đặt Phòng
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HoldingPage;
