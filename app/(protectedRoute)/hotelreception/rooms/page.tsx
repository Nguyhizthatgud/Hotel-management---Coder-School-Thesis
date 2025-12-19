"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BedDouble, Wifi, Car, Coffee, Search, Filter } from "lucide-react";
import AddRoom from "./AddRoom";

const RoomsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const rooms = [
    { id: "101", type: "Standard", status: "available", guest: null, price: 120, amenities: ["wifi", "coffee"] },
    { id: "102", type: "Standard", status: "occupied", guest: "John Smith", price: 120, amenities: ["wifi", "coffee"] },
    {
      id: "103",
      type: "Deluxe",
      status: "maintenance",
      guest: null,
      price: 180,
      amenities: ["wifi", "coffee", "parking"]
    },
    {
      id: "201",
      type: "Suite",
      status: "available",
      guest: null,
      price: 280,
      amenities: ["wifi", "coffee", "parking"]
    },
    {
      id: "202",
      type: "Deluxe",
      status: "occupied",
      guest: "Alice Johnson",
      price: 180,
      amenities: ["wifi", "coffee", "parking"]
    },
    { id: "203", type: "Standard", status: "cleaning", guest: null, price: 120, amenities: ["wifi", "coffee"] },
    {
      id: "301",
      type: "Suite",
      status: "available",
      guest: null,
      price: 280,
      amenities: ["wifi", "coffee", "parking"]
    },
    {
      id: "302",
      type: "Deluxe",
      status: "occupied",
      guest: "Bob Wilson",
      price: 180,
      amenities: ["wifi", "coffee", "parking"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "occupied":
        return "bg-red-100 text-red-800 border-red-200";
      case "maintenance":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "cleaning":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "coffee":
        return <Coffee className="h-4 w-4" />;
      case "parking":
        return <Car className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.guest?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Room Management</h2>
          <p className="text-muted-foreground">Manage and monitor all hotel rooms</p>
        </div>
        <AddRoom />
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="occupied">Occupied</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="cleaning">Cleaning</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BedDouble className="h-5 w-5" />
                    Room {room.id}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{room.type}</p>
                </div>
                <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Price per night</span>
                <span className="font-semibold">${room.price}</span>
              </div>

              {room.guest && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Guest</span>
                  <span className="text-sm font-medium">{room.guest}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Amenities:</span>
                <div className="flex gap-1">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="text-muted-foreground">
                      {getAmenityIcon(amenity)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1">
                  {room.status === "available" ? "Book" : "Manage"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoomsView;
