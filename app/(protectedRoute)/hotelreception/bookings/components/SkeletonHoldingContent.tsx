"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge, Calendar, CreditCard, Edit, Eye, Mail, Phone, Trash2, User } from "lucide-react";
import React from "react";

const SkeletonHoldingContent = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-9 w-48 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
      {/* booking Cards Skeleton */}
      {[...Array(5)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="size-4 text-muted-foreground" />
                  <Skeleton className="w-36 h-5" />
                </CardTitle>
                <CardDescription className="mt-1">
                  <Skeleton className="w-62 h-4" />
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge>
                  <Skeleton className="w-20 h-5" />
                </Badge>
                <Badge>
                  <Skeleton className="w-20 h-5" />
                </Badge>
                <Badge>
                  <Skeleton className="w-20 h-5" />
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Liên Hệ</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="size-3 text-muted-foreground" />
                    <Skeleton className="w-[120px] h-3.5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-3 text-muted-foreground" />
                    <Skeleton className="w-[100px] h-3.5" />
                  </div>
                </div>
              </div>

              {/* Stay Details */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Chi Tiết Lưu Trú</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-3 text-muted-foreground" />
                    <Skeleton className="w-44 h-3.5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="size-3 text-muted-foreground" />
                    <Skeleton className="w-30 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Billing */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Thanh Toán</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <CreditCard className="size-3 text-muted-foreground" />
                    <Skeleton className="w-20 h-3.5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="size-3 text-muted-foreground" />
                    <Skeleton className="w-20 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Special Requests Placeholder */}
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <Skeleton className="w-[150px] h-3.5 mb-1" />
              <Skeleton className="w-full h-[30px]" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" disabled>
                <Eye className="size-4 mr-2" />
                <Skeleton className="w-[60px] h-4" />
              </Button>
              <Button size="sm" variant="outline" disabled>
                <Edit className="size-4 mr-2" />
                <Skeleton className="w-10 h-4" />
              </Button>
              <Button size="sm" disabled>
                <Skeleton className="w-10 h-4" />
              </Button>
              <Button size="sm" variant="outline" disabled>
                <Trash2 className="size-4 mr-2" />
                <Skeleton className="w-10 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SkeletonHoldingContent;
