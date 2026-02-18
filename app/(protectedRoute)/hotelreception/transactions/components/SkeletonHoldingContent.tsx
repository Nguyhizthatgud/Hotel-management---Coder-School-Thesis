"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonHoldingContent = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Revenue Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>

        {/* Revenue by Category Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-52" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
            <div className="grid grid-cols-2 gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16 ml-auto" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List Skeleton */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters Skeleton */}
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <Skeleton className="h-10 flex-1 min-w-[250px]" />
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
          </div>

          {/* Transaction Items Skeleton */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4 flex-1">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-3 w-96" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="space-y-2 text-right">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-9 w-9" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkeletonHoldingContent;
