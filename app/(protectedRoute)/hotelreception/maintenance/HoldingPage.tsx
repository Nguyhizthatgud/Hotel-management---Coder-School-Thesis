"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, Home, AlertCircle } from "lucide-react";

const HoldingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Icon */}
            <div className="rounded-full bg-muted p-6">
              <AlertCircle className="size-12 text-muted-foreground" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h2>Check-In/Out Page</h2>
              <p className="text-muted-foreground">This page is currently unavailable or under construction.</p>
            </div>

            {/* Additional Info */}
            <div className="bg-muted/50 p-4 rounded-lg w-full">
              <p className="text-sm text-muted-foreground">
                The Check-In/Out management system will be available soon. This area will handle guest arrivals,
                departures, and related operations.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full">
              <Button variant="default" className="flex-1">
                <Home className="size-4 mr-2" />
                Go to Dashboard
              </Button>
              <Button variant="outline" className="flex-1">
                <UserCheck className="size-4 mr-2" />
                View Reservations
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HoldingPage;
