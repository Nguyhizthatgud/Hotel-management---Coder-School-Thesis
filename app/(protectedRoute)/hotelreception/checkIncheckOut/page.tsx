"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  UserCheck,
  UserX,
  Calendar,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Clock,
  Key,
  Search,
  Plus,
  DoorOpen,
  Receipt,
  Printer,
  Eye,
  CheckCircle
} from "lucide-react";

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  room: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  status: "checked-in" | "checked-out" | "no-show" | "expected";
  reservationId: string;
  adults: number;
  children: number;
  specialRequests?: string;
  checkInTime?: string;
  checkOutTime?: string;
  roomRate: number;
  totalAmount: number;
  paymentStatus: "paid" | "pending" | "partial";
  identityDocType?: string;
  identityDocNumber?: string;
  keyCardsIssued?: number;
}

const mockGuests: Guest[] = [
  {
    id: "G001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    room: "205",
    roomType: "Standard King",
    checkInDate: "Dec 26, 2024",
    checkOutDate: "Dec 28, 2024",
    status: "checked-in",
    reservationId: "RES001",
    adults: 2,
    children: 0,
    checkInTime: "3:15 PM",
    roomRate: 150,
    totalAmount: 300,
    paymentStatus: "paid",
    specialRequests: "Late check-in requested",
    identityDocType: "Passport",
    identityDocNumber: "P1234567",
    keyCardsIssued: 2
  },
  {
    id: "G002",
    name: "Sarah Johnson",
    email: "s.johnson@email.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    room: "312",
    roomType: "Deluxe Queen",
    checkInDate: "Dec 26, 2024",
    checkOutDate: "Dec 28, 2024",
    status: "expected",
    reservationId: "RES002",
    adults: 1,
    children: 1,
    roomRate: 180,
    totalAmount: 360,
    paymentStatus: "pending"
  },
  {
    id: "G003",
    name: "Mike Wilson",
    email: "mike.w@email.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine St, Chicago, IL 60601",
    room: "158",
    roomType: "Suite",
    checkInDate: "Dec 24, 2024",
    checkOutDate: "Dec 26, 2024",
    status: "checked-in",
    reservationId: "RES003",
    adults: 2,
    children: 2,
    checkInTime: "2:30 PM",
    roomRate: 200,
    totalAmount: 400,
    paymentStatus: "paid",
    identityDocType: "Driver's License",
    identityDocNumber: "DL9876543",
    keyCardsIssued: 2
  },
  {
    id: "G004",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 234-5678",
    address: "321 Elm St, Miami, FL 33101",
    room: "422",
    roomType: "Deluxe King",
    checkInDate: "Dec 27, 2024",
    checkOutDate: "Dec 30, 2024",
    status: "expected",
    reservationId: "RES004",
    adults: 1,
    children: 0,
    roomRate: 175,
    totalAmount: 525,
    paymentStatus: "partial",
    specialRequests: "Room on higher floor preferred"
  },
  {
    id: "G005",
    name: "David Brown",
    email: "d.brown@email.com",
    phone: "+1 (555) 345-6789",
    address: "654 Maple Dr, Boston, MA 02101",
    room: "128",
    roomType: "Standard Queen",
    checkInDate: "Dec 23, 2024",
    checkOutDate: "Dec 26, 2024",
    status: "checked-out",
    reservationId: "RES005",
    adults: 2,
    children: 0,
    checkInTime: "4:00 PM",
    checkOutTime: "11:30 AM",
    roomRate: 140,
    totalAmount: 420,
    paymentStatus: "paid",
    identityDocType: "Passport",
    identityDocNumber: "P7654321",
    keyCardsIssued: 2
  }
];

const statusColors = {
  "checked-in": "bg-green-100 text-green-800 border-green-200",
  "checked-out": "bg-gray-100 text-gray-800 border-gray-200",
  "no-show": "bg-red-100 text-red-800 border-red-200",
  expected: "bg-blue-100 text-blue-800 border-blue-200"
};

const paymentStatusColors = {
  paid: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  partial: "bg-orange-100 text-orange-800 border-orange-200"
};

const CheckInOut = () => {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>(mockGuests);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isWalkInDialogOpen, setIsWalkInDialogOpen] = useState(false);
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  const [isCheckOutDialogOpen, setIsCheckOutDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [checkInFormData, setCheckInFormData] = useState({
    identityDocType: "",
    identityDocNumber: "",
    keyCards: "2",
    depositAmount: "",
    notes: ""
  });
  const [checkOutFormData, setCheckOutFormData] = useState({
    minibarCharges: "",
    roomServiceCharges: "",
    damages: "",
    notes: ""
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    let filtered = guests;

    if (activeTab !== "all") {
      filtered = guests.filter((guest) => guest.status === activeTab);
    }

    if (query) {
      filtered = filtered.filter(
        (guest) =>
          guest.name.toLowerCase().includes(query.toLowerCase()) ||
          guest.room.includes(query) ||
          guest.reservationId.toLowerCase().includes(query.toLowerCase()) ||
          guest.email.toLowerCase().includes(query.toLowerCase()) ||
          guest.phone.includes(query)
      );
    }

    setFilteredGuests(filtered);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    let filtered = guests;

    if (value !== "all") {
      filtered = guests.filter((guest) => guest.status === value);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (guest) =>
          guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guest.room.includes(searchQuery) ||
          guest.reservationId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredGuests(filtered);
  };

  const handleCheckIn = (guest: Guest) => {
    setSelectedGuest(guest);
    setIsCheckInDialogOpen(true);
  };

  const handleCheckOut = (guest: Guest) => {
    setSelectedGuest(guest);
    setIsCheckOutDialogOpen(true);
  };

  const handleViewDetails = (guest: Guest) => {
    setSelectedGuest(guest);
    setIsViewDialogOpen(true);
  };

  const processCheckIn = () => {
    if (selectedGuest) {
      const updatedGuests = guests.map((g) =>
        g.id === selectedGuest.id
          ? {
              ...g,
              status: "checked-in" as const,
              checkInTime: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
              identityDocType: checkInFormData.identityDocType,
              identityDocNumber: checkInFormData.identityDocNumber,
              keyCardsIssued: parseInt(checkInFormData.keyCards)
            }
          : g
      );
      setGuests(updatedGuests);
      setFilteredGuests(updatedGuests);
      setIsCheckInDialogOpen(false);
      setCheckInFormData({
        identityDocType: "",
        identityDocNumber: "",
        keyCards: "2",
        depositAmount: "",
        notes: ""
      });
    }
  };

  const processCheckOut = () => {
    if (selectedGuest) {
      const additionalCharges =
        parseFloat(checkOutFormData.minibarCharges || "0") +
        parseFloat(checkOutFormData.roomServiceCharges || "0") +
        parseFloat(checkOutFormData.damages || "0");

      const updatedGuests = guests.map((g) =>
        g.id === selectedGuest.id
          ? {
              ...g,
              status: "checked-out" as const,
              checkOutTime: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
              totalAmount: g.totalAmount + additionalCharges
            }
          : g
      );
      setGuests(updatedGuests);
      setFilteredGuests(updatedGuests);
      setIsCheckOutDialogOpen(false);
      setCheckOutFormData({
        minibarCharges: "",
        roomServiceCharges: "",
        damages: "",
        notes: ""
      });
    }
  };

  const getTabCounts = () => {
    return {
      all: guests.length,
      expected: guests.filter((g) => g.status === "expected").length,
      "checked-in": guests.filter((g) => g.status === "checked-in").length,
      "checked-out": guests.filter((g) => g.status === "checked-out").length
    };
  };

  const tabCounts = getTabCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Guest Check-In/Out</h2>
          <p className="text-muted-foreground">Manage guest arrivals and departures</p>
        </div>
        <Button onClick={() => setIsWalkInDialogOpen(true)}>
          <Plus className="size-4 mr-2" />
          Walk-in Guest
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Expected Today</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-4 text-blue-600" />
              {tabCounts.expected}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Currently Checked In</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="size-4 text-green-600" />
              {tabCounts["checked-in"]}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Checked Out Today</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <UserX className="size-4 text-gray-600" />
              {tabCounts["checked-out"]}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Guests</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <DoorOpen className="size-4 text-purple-600" />
              {tabCounts.all}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 max-w-md">
        <Search className="size-4 text-muted-foreground" />
        <Input
          placeholder="Search guests, rooms, reservations..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-2">
            All Guests
            <Badge variant="secondary">{tabCounts.all}</Badge>
          </TabsTrigger>
          <TabsTrigger value="expected" className="flex items-center gap-2">
            Expected
            <Badge variant="secondary">{tabCounts.expected}</Badge>
          </TabsTrigger>
          <TabsTrigger value="checked-in" className="flex items-center gap-2">
            Checked In
            <Badge variant="secondary">{tabCounts["checked-in"]}</Badge>
          </TabsTrigger>
          <TabsTrigger value="checked-out" className="flex items-center gap-2">
            Checked Out
            <Badge variant="secondary">{tabCounts["checked-out"]}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredGuests.map((guest) => (
            <Card key={guest.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="size-4" />
                      {guest.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Room {guest.room} • {guest.roomType} • {guest.reservationId}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={`${statusColors[guest.status]} border`} variant="outline">
                      {guest.status.replace("-", " ").toUpperCase()}
                    </Badge>
                    <Badge className={`${paymentStatusColors[guest.paymentStatus]} border`} variant="outline">
                      {guest.paymentStatus.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Contact Information</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="size-3 text-muted-foreground" />
                        <span>{guest.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="size-3 text-muted-foreground" />
                        <span>{guest.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-3 text-muted-foreground" />
                        <span>{guest.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stay Details */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Stay Details</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-3 text-muted-foreground" />
                        <span>
                          {guest.checkInDate} - {guest.checkOutDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCheck className="size-3 text-muted-foreground" />
                        <span>
                          {guest.adults} adults, {guest.children} children
                        </span>
                      </div>
                      {guest.checkInTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="size-3 text-muted-foreground" />
                          <span>Checked in: {guest.checkInTime}</span>
                        </div>
                      )}
                      {guest.checkOutTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="size-3 text-muted-foreground" />
                          <span>Checked out: {guest.checkOutTime}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Billing */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Billing</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <CreditCard className="size-3 text-muted-foreground" />
                        <span>Rate: ${guest.roomRate}/night</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="size-3 text-muted-foreground" />
                        <span>Total: ${guest.totalAmount}</span>
                      </div>
                      {guest.keyCardsIssued && (
                        <div className="flex items-center gap-2">
                          <Key className="size-3 text-muted-foreground" />
                          <span>Key cards: {guest.keyCardsIssued}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                {guest.specialRequests && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <h4 className="text-sm font-medium mb-1">Special Requests</h4>
                    <p className="text-sm text-muted-foreground">{guest.specialRequests}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 flex-wrap">
                  {guest.status === "expected" && (
                    <>
                      <Button size="sm" onClick={() => handleCheckIn(guest)}>
                        <Key className="size-4 mr-2" />
                        Check In
                      </Button>
                      <Button size="sm" variant="outline">
                        <UserX className="size-4 mr-2" />
                        Mark No Show
                      </Button>
                    </>
                  )}
                  {guest.status === "checked-in" && (
                    <>
                      <Button size="sm" onClick={() => handleCheckOut(guest)}>
                        <UserX className="size-4 mr-2" />
                        Check Out
                      </Button>
                      <Button size="sm" variant="outline">
                        <Receipt className="size-4 mr-2" />
                        View Bill
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(guest)}>
                    <Eye className="size-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Printer className="size-4 mr-2" />
                    Print Key Cards
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {filteredGuests.length === 0 && (
        <div className="text-center py-12">
          <UserCheck className="size-12 text-muted-foreground mx-auto mb-4" />
          <h3>No guests found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Walk-in Guest Dialog */}
      <Dialog open={isWalkInDialogOpen} onOpenChange={setIsWalkInDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Walk-in Guest Registration</DialogTitle>
            <DialogDescription>Register a new walk-in guest</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="docType">ID Document Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="license">Driver&apos;s License</SelectItem>
                    <SelectItem value="id">National ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="docNumber">Document Number</Label>
                <Input id="docNumber" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="roomType">Room Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard-king">Standard King - $150/night</SelectItem>
                    <SelectItem value="standard-queen">Standard Queen - $140/night</SelectItem>
                    <SelectItem value="deluxe-king">Deluxe King - $175/night</SelectItem>
                    <SelectItem value="deluxe-queen">Deluxe Queen - $180/night</SelectItem>
                    <SelectItem value="suite">Suite - $200/night</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="room">Room Number</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select available room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="101">Room 101</SelectItem>
                    <SelectItem value="102">Room 102</SelectItem>
                    <SelectItem value="201">Room 201</SelectItem>
                    <SelectItem value="301">Room 301</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="adults">Adults</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="1" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="children">Children</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="0" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="nights">Number of Nights</Label>
                <Input id="nights" type="number" defaultValue="1" min="1" />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={() => setIsWalkInDialogOpen(false)} className="flex-1">
                Check In Guest
              </Button>
              <Button variant="outline" onClick={() => setIsWalkInDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Check-In Dialog */}
      <Dialog open={isCheckInDialogOpen} onOpenChange={setIsCheckInDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="size-5" />
              Check-In Guest
            </DialogTitle>
            <DialogDescription>Complete check-in for {selectedGuest?.name}</DialogDescription>
          </DialogHeader>
          {selectedGuest && (
            <div className="space-y-6">
              {/* Guest Summary */}
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Guest Name:</span>
                  <span className="text-sm font-medium">{selectedGuest.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Room:</span>
                  <span className="text-sm font-medium">
                    {selectedGuest.room} - {selectedGuest.roomType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Stay Duration:</span>
                  <span className="text-sm font-medium">
                    {selectedGuest.checkInDate} - {selectedGuest.checkOutDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Amount:</span>
                  <span className="text-sm font-medium">${selectedGuest.totalAmount}</span>
                </div>
              </div>

              <Separator />

              {/* Check-In Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>ID Document Type</Label>
                    <Select
                      value={checkInFormData.identityDocType}
                      onValueChange={(value) => setCheckInFormData({ ...checkInFormData, identityDocType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Passport">Passport</SelectItem>
                        <SelectItem value="Driver's License">Driver&apos;s License</SelectItem>
                        <SelectItem value="National ID">National ID</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Document Number</Label>
                    <Input
                      value={checkInFormData.identityDocNumber}
                      onChange={(e) => setCheckInFormData({ ...checkInFormData, identityDocNumber: e.target.value })}
                      placeholder="Enter document number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Number of Key Cards</Label>
                    <Select
                      value={checkInFormData.keyCards}
                      onValueChange={(value) => setCheckInFormData({ ...checkInFormData, keyCards: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Security Deposit ($)</Label>
                    <Input
                      type="number"
                      value={checkInFormData.depositAmount}
                      onChange={(e) => setCheckInFormData({ ...checkInFormData, depositAmount: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <Label>Check-In Notes</Label>
                  <Textarea
                    value={checkInFormData.notes}
                    onChange={(e) => setCheckInFormData({ ...checkInFormData, notes: e.target.value })}
                    placeholder="Add any notes or special instructions..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button onClick={processCheckIn} className="flex-1">
              <CheckCircle className="size-4 mr-2" />
              Complete Check-In
            </Button>
            <Button variant="outline" onClick={() => setIsCheckInDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Check-Out Dialog */}
      <Dialog open={isCheckOutDialogOpen} onOpenChange={setIsCheckOutDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserX className="size-5" />
              Check-Out Guest
            </DialogTitle>
            <DialogDescription>Complete check-out for {selectedGuest?.name}</DialogDescription>
          </DialogHeader>
          {selectedGuest && (
            <div className="space-y-6">
              {/* Guest Summary */}
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Guest Name:</span>
                  <span className="text-sm font-medium">{selectedGuest.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Room:</span>
                  <span className="text-sm font-medium">
                    {selectedGuest.room} - {selectedGuest.roomType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Checked In:</span>
                  <span className="text-sm font-medium">
                    {selectedGuest.checkInDate} at {selectedGuest.checkInTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Room Rate:</span>
                  <span className="text-sm font-medium">${selectedGuest.totalAmount}</span>
                </div>
              </div>

              <Separator />

              {/* Additional Charges */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2">
                  <Receipt className="size-4" />
                  Additional Charges
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Minibar Charges ($)</Label>
                    <Input
                      type="number"
                      value={checkOutFormData.minibarCharges}
                      onChange={(e) => setCheckOutFormData({ ...checkOutFormData, minibarCharges: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label>Room Service ($)</Label>
                    <Input
                      type="number"
                      value={checkOutFormData.roomServiceCharges}
                      onChange={(e) => setCheckOutFormData({ ...checkOutFormData, roomServiceCharges: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Damages/Other Charges ($)</Label>
                    <Input
                      type="number"
                      value={checkOutFormData.damages}
                      onChange={(e) => setCheckOutFormData({ ...checkOutFormData, damages: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Total Calculation */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Room Charges:</span>
                    <span className="text-sm">${selectedGuest.totalAmount}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Additional Charges:</span>
                    <span className="text-sm">
                      $
                      {(
                        parseFloat(checkOutFormData.minibarCharges || "0") +
                        parseFloat(checkOutFormData.roomServiceCharges || "0") +
                        parseFloat(checkOutFormData.damages || "0")
                      ).toFixed(2)}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span className="font-medium">Total Amount Due:</span>
                    <span className="font-medium">
                      $
                      {(
                        selectedGuest.totalAmount +
                        parseFloat(checkOutFormData.minibarCharges || "0") +
                        parseFloat(checkOutFormData.roomServiceCharges || "0") +
                        parseFloat(checkOutFormData.damages || "0")
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div>
                  <Label>Check-Out Notes</Label>
                  <Textarea
                    value={checkOutFormData.notes}
                    onChange={(e) => setCheckOutFormData({ ...checkOutFormData, notes: e.target.value })}
                    placeholder="Room condition, items left behind, etc..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button onClick={processCheckOut} className="flex-1">
              <CheckCircle className="size-4 mr-2" />
              Complete Check-Out
            </Button>
            <Button variant="outline" onClick={() => setIsCheckOutDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="size-5" />
              Guest Details
            </DialogTitle>
            <DialogDescription>Complete information for {selectedGuest?.name}</DialogDescription>
          </DialogHeader>
          {selectedGuest && (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex gap-2">
                <Badge className={`${statusColors[selectedGuest.status]} border`} variant="outline">
                  {selectedGuest.status.replace("-", " ").toUpperCase()}
                </Badge>
                <Badge className={`${paymentStatusColors[selectedGuest.paymentStatus]} border`} variant="outline">
                  Payment: {selectedGuest.paymentStatus.toUpperCase()}
                </Badge>
              </div>

              <Separator />

              {/* Guest Information */}
              <div>
                <h3 className="flex items-center gap-2 mb-3">
                  <UserCheck className="size-4" />
                  Guest Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.name}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Reservation ID</Label>
                    <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.reservationId}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.email}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.phone}</div>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Address</Label>
                    <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.address}</div>
                  </div>
                  {selectedGuest.identityDocType && (
                    <>
                      <div className="space-y-2">
                        <Label>ID Document Type</Label>
                        <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.identityDocType}</div>
                      </div>
                      <div className="space-y-2">
                        <Label>Document Number</Label>
                        <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.identityDocNumber}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <Separator />

              {/* Room & Stay Information */}
              <div>
                <h3 className="flex items-center gap-2 mb-3">
                  <DoorOpen className="size-4" />
                  Room & Stay Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Room Number</Label>
                    <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.room}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Room Type</Label>
                    <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.roomType}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Check-In Date</Label>
                    <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.checkInDate}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Check-Out Date</Label>
                    <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.checkOutDate}</div>
                  </div>
                  {selectedGuest.checkInTime && (
                    <div className="space-y-2">
                      <Label>Check-In Time</Label>
                      <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.checkInTime}</div>
                    </div>
                  )}
                  {selectedGuest.checkOutTime && (
                    <div className="space-y-2">
                      <Label>Check-Out Time</Label>
                      <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.checkOutTime}</div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Adults</Label>
                    <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.adults}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Children</Label>
                    <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.children}</div>
                  </div>
                  {selectedGuest.keyCardsIssued && (
                    <div className="space-y-2">
                      <Label>Key Cards Issued</Label>
                      <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.keyCardsIssued}</div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Billing Information */}
              <div>
                <h3 className="flex items-center gap-2 mb-3">
                  <CreditCard className="size-4" />
                  Billing Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Room Rate (per night)</Label>
                    <div className="p-2 bg-muted rounded-md text-sm">${selectedGuest.roomRate}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Total Amount</Label>
                    <div className="p-2 bg-muted rounded-md text-sm">${selectedGuest.totalAmount}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Status</Label>
                    <div className="p-2 bg-muted rounded-md text-sm">{selectedGuest.paymentStatus}</div>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedGuest.specialRequests && (
                <>
                  <Separator />
                  <div>
                    <Label className="mb-2 block">Special Requests</Label>
                    <div className="p-3 bg-muted rounded-md text-sm">{selectedGuest.specialRequests}</div>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button onClick={() => setIsViewDialogOpen(false)} className="flex-1">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckInOut;
