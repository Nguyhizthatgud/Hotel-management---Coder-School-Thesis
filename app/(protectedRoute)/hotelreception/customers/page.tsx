"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Edit, Trash2, Mail, Phone, MapPin, Calendar, User, Star } from "lucide-react";

const CustomerManagement = () => {
  const customers = [
    {
      id: "C001",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      joinDate: "2024-01-15",
      totalBookings: 8,
      totalSpent: 3250.75,
      status: "vip",
      lastVisit: "2025-01-20",
      preferences: ["Non-smoking", "High floor", "King bed"],
      avatar: null
    },
    {
      id: "C002",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      joinDate: "2024-03-22",
      totalBookings: 3,
      totalSpent: 1125.5,
      status: "regular",
      lastVisit: "2025-01-18",
      preferences: ["Quiet room", "Ground floor", "Twin beds"],
      avatar: null
    },
    {
      id: "C003",
      name: "Mike Wilson",
      email: "mike.wilson@email.com",
      phone: "+1 (555) 456-7890",
      address: "789 Pine Rd, Chicago, IL 60601",
      joinDate: "2023-11-08",
      totalBookings: 12,
      totalSpent: 4875.25,
      status: "vip",
      lastVisit: "2025-01-25",
      preferences: ["Balcony", "High floor", "Queen bed"],
      avatar: null
    },
    {
      id: "C004",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 321-0987",
      address: "321 Elm St, Miami, FL 33101",
      joinDate: "2024-07-12",
      totalBookings: 1,
      totalSpent: 185.0,
      status: "new",
      lastVisit: "2025-01-10",
      preferences: ["Pool view", "First floor"],
      avatar: null
    }
  ];

  const bookingHistory = [
    {
      id: "B001",
      customerId: "C001",
      bookingNumber: "BK-2025-001",
      checkIn: "2025-01-20",
      checkOut: "2025-01-22",
      room: "Suite 301",
      total: 450.0,
      status: "completed"
    },
    {
      id: "B002",
      customerId: "C001",
      bookingNumber: "BK-2024-089",
      checkIn: "2024-12-15",
      checkOut: "2024-12-18",
      room: "Deluxe 205",
      total: 675.0,
      status: "completed"
    },
    {
      id: "B003",
      customerId: "C002",
      bookingNumber: "BK-2025-002",
      checkIn: "2025-01-18",
      checkOut: "2025-01-20",
      room: "Standard 102",
      total: 300.0,
      status: "completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vip":
        return "bg-purple-100 text-purple-800";
      case "regular":
        return "bg-blue-100 text-blue-800";
      case "new":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Customer Management</h1>
          <p className="text-muted-foreground">Manage customer profiles and track their history</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="customers">Customer List</TabsTrigger>
          <TabsTrigger value="profiles">Customer Profiles</TabsTrigger>
          <TabsTrigger value="history">Booking History</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Database</CardTitle>
              <CardDescription>View and manage all customer information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search customers..." className="pl-9" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customers) => (
                    <TableRow key={customers.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage />
                            <AvatarFallback>{getInitials(customers.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customers.name}</div>
                            <div className="text-sm text-muted-foreground">ID: {customers.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-3 h-3" />
                            {customers.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-3 h-3" />
                            {customers.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(customers.status)}>{customers.status}</Badge>
                      </TableCell>
                      <TableCell>{customers.totalBookings}</TableCell>
                      <TableCell>${customers.totalSpent.toFixed(2)}</TableCell>
                      <TableCell>{customers.lastVisit}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <User className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profiles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customers.map((customers) => (
              <Card key={customers.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage />
                      <AvatarFallback>{getInitials(customers.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{customers.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(customers.status)}>{customers.status}</Badge>
                        {customers.status === "vip" && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {customers.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {customers.phone}
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      {customers.address}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      Joined: {customers.joinDate}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{customers.totalBookings}</p>
                      <p className="text-sm text-muted-foreground">Total Bookings</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">${customers.totalSpent.toFixed(0)}</p>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Preferences</h4>
                    <div className="flex flex-wrap gap-1">
                      {customers.preferences.map((pref) => (
                        <Badge key={pref} variant="secondary" className="text-xs">
                          {pref}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      Book
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
              <CardDescription>Complete booking history for all customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search bookings..." className="pl-9" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingHistory.map((booking) => {
                    const customer = customers.find((c) => c.id === booking.customerId);
                    return (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.bookingNumber}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {customer ? getInitials(customer.name) : "N/A"}
                              </AvatarFallback>
                            </Avatar>
                            {customer?.name || "Unknown"}
                          </div>
                        </TableCell>
                        <TableCell>{booking.checkIn}</TableCell>
                        <TableCell>{booking.checkOut}</TableCell>
                        <TableCell>{booking.room}</TableCell>
                        <TableCell>${booking.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerManagement;
