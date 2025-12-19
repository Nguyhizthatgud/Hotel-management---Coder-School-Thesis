"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Clock,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  Award,
  Star,
  CheckCircle,
  Edit,
  MoreVertical,
  UserCog,
  CalendarDays,
  TrendingUp,
  DollarSign
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

type StaffRole = "front-desk" | "housekeeping" | "maintenance" | "management" | "restaurant" | "security";
type StaffStatus = "active" | "on-leave" | "off-duty" | "inactive";
type ShiftType = "morning" | "afternoon" | "night" | "full-day";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: StaffRole;
  department: string;
  status: StaffStatus;
  hireDate: string;
  shift: ShiftType;
  hourlyRate: number;
  avatar?: string;
  address?: string;
  emergencyContact?: string;
  performanceRating: number;
  tasksCompleted: number;
  attendanceRate: number;
  certifications?: string[];
}

interface Shift {
  id: string;
  staffId: string;
  staffName: string;
  role: StaffRole;
  date: string;
  shiftType: ShiftType;
  startTime: string;
  endTime: string;
  status: "scheduled" | "completed" | "absent" | "late";
}

const mockStaff: StaffMember[] = [];

const mockShifts: Shift[] = [];

const statusColors: Record<StaffStatus, string> = {
  active: "default",
  "on-leave": "secondary",
  "off-duty": "outline",
  inactive: "destructive"
};

const StaffManagement = () => {
  const [staff] = useState<StaffMember[]>(mockStaff);
  // const [shifts, setShifts] = useState(mockShifts);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter staff based on search and filters
  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Calculate statistics
  const totalStaff = staff.length;
  const activeStaff = staff.filter((s) => s.status === "active").length;
  const avgPerformance =
    staff.length > 0 ? (staff.reduce((sum, s) => sum + s.performanceRating, 0) / staff.length).toFixed(1) : "0";
  const avgAttendance =
    staff.length > 0 ? Math.round(staff.reduce((sum, s) => sum + s.attendanceRate, 0) / staff.length) : 0;

  const shifts = mockShifts;
  const todayShifts = shifts.filter((s) => s.date === "2025-12-09");
  const onDutyNow = todayShifts.length;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRoleBadgeColor = (role: StaffRole) => {
    const colors: Record<StaffRole, string> = {
      "front-desk": "bg-blue-100 text-blue-800",
      housekeeping: "bg-purple-100 text-purple-800",
      maintenance: "bg-orange-100 text-orange-800",
      management: "bg-green-100 text-green-800",
      restaurant: "bg-pink-100 text-pink-800",
      security: "bg-red-100 text-red-800"
    };
    return colors[role];
  };

  const formatShiftType = (shift: ShiftType) => {
    const labels: Record<ShiftType, string> = {
      morning: "Morning (7AM-3PM)",
      afternoon: "Afternoon (3PM-11PM)",
      night: "Night (11PM-7AM)",
      "full-day": "Full Day (9AM-5PM)"
    };
    return labels[shift];
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStaff}</div>
            <p className="text-xs text-muted-foreground">{activeStaff} currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Duty Today</CardTitle>
            <CalendarDays className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onDutyNow}</div>
            <p className="text-xs text-muted-foreground">Scheduled shifts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <Star className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPerformance}/5.0</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="size-3 text-green-600" />
              <span className="text-xs text-green-600">+0.3</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <CheckCircle className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgAttendance}%</div>
            <p className="text-xs text-muted-foreground">Average attendance</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="staff" className="w-full">
        <TabsList>
          <TabsTrigger value="staff">Staff Directory</TabsTrigger>
          <TabsTrigger value="shifts">Shift Schedule</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Staff Directory Tab */}
        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Staff Directory</CardTitle>
                  <CardDescription>Manage your hotel staff members</CardDescription>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="size-4 mr-2" />
                      Add Staff
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Staff Member</DialogTitle>
                      <DialogDescription>Enter the details of the new staff member</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@hotel.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="(555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select>
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="front-desk">Front Desk</SelectItem>
                            <SelectItem value="housekeeping">Housekeeping</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="management">Management</SelectItem>
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shift">Default Shift</Label>
                        <Select>
                          <SelectTrigger id="shift">
                            <SelectValue placeholder="Select shift" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning</SelectItem>
                            <SelectItem value="afternoon">Afternoon</SelectItem>
                            <SelectItem value="night">Night</SelectItem>
                            <SelectItem value="full-day">Full Day</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rate">Hourly Rate ($)</Label>
                        <Input id="rate" type="number" placeholder="15.00" />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="123 Main St, City, State" />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="emergency">Emergency Contact</Label>
                        <Input id="emergency" placeholder="(555) 987-6543" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAddDialogOpen(false)}>Add Staff Member</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="size-4 mr-2" />
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="front-desk">Front Desk</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                    <SelectItem value="off-duty">Off Duty</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Staff Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStaff.map((member) => (
                  <Card key={member.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.id}</div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSelectedStaff(member)}>
                              <UserCog className="size-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="size-4 mr-2" />
                              Edit Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <CalendarDays className="size-4 mr-2" />
                              Manage Shifts
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded ${getRoleBadgeColor(member.role)}`}>
                            {member.department}
                          </span>
                          <Badge variant={statusColors[member.status]}>{member.status}</Badge>
                        </div>

                        <div className="space-y-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="size-3" />
                            {member.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="size-3" />
                            {member.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="size-3" />
                            {formatShiftType(member.shift)}
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="size-3" />${member.hourlyRate}/hour
                          </div>
                        </div>

                        <div className="pt-3 border-t">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs">Performance</span>
                            <div className="flex items-center gap-1">
                              <Star className="size-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">{member.performanceRating}</span>
                            </div>
                          </div>
                          <Progress value={member.performanceRating * 20} className="h-1.5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredStaff.length === 0 && (
                <div className="text-center py-12">
                  <Users className="size-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No staff members found matching your filters</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shift Schedule Tab */}
        <TabsContent value="shifts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Shift Schedule</CardTitle>
                  <CardDescription>Today&apos;s staff schedule - December 9, 2025</CardDescription>
                </div>
                <Button>
                  <Plus className="size-4 mr-2" />
                  Add Shift
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Morning Shifts */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="font-medium">Morning Shift (7:00 AM - 3:00 PM)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-4">
                    {todayShifts
                      .filter((s) => s.shiftType === "morning")
                      .map((shift) => (
                        <Card key={shift.id}>
                          <CardContent className="pt-4">
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar className="size-10">
                                <AvatarFallback>{getInitials(shift.staffName)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">{shift.staffName}</div>
                                <div className="text-xs text-muted-foreground">
                                  {shift.startTime} - {shift.endTime}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-1 rounded ${getRoleBadgeColor(shift.role)}`}>
                                {shift.role}
                              </span>
                              <Badge variant="outline">{shift.status}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>

                {/* Afternoon Shifts */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="font-medium">Afternoon Shift (12:00 PM - 8:00 PM)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-4">
                    {todayShifts
                      .filter((s) => s.shiftType === "afternoon")
                      .map((shift) => (
                        <Card key={shift.id}>
                          <CardContent className="pt-4">
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar className="size-10">
                                <AvatarFallback>{getInitials(shift.staffName)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">{shift.staffName}</div>
                                <div className="text-xs text-muted-foreground">
                                  {shift.startTime} - {shift.endTime}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-1 rounded ${getRoleBadgeColor(shift.role)}`}>
                                {shift.role}
                              </span>
                              <Badge variant="outline">{shift.status}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>

                {/* Night Shifts */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-blue-900" />
                    <span className="font-medium">Night Shift (10:00 PM - 6:00 AM)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-4">
                    {todayShifts
                      .filter((s) => s.shiftType === "night")
                      .map((shift) => (
                        <Card key={shift.id}>
                          <CardContent className="pt-4">
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar className="size-10">
                                <AvatarFallback>{getInitials(shift.staffName)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">{shift.staffName}</div>
                                <div className="text-xs text-muted-foreground">
                                  {shift.startTime} - {shift.endTime}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-1 rounded ${getRoleBadgeColor(shift.role)}`}>
                                {shift.role}
                              </span>
                              <Badge variant="outline">{shift.status}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>

                {/* Full Day Shifts */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-medium">Full Day Shift (9:00 AM - 5:00 PM)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-4">
                    {todayShifts
                      .filter((s) => s.shiftType === "full-day")
                      .map((shift) => (
                        <Card key={shift.id}>
                          <CardContent className="pt-4">
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar className="size-10">
                                <AvatarFallback>{getInitials(shift.staffName)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">{shift.staffName}</div>
                                <div className="text-xs text-muted-foreground">
                                  {shift.startTime} - {shift.endTime}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-1 rounded ${getRoleBadgeColor(shift.role)}`}>
                                {shift.role}
                              </span>
                              <Badge variant="outline">{shift.status}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Performance Overview</CardTitle>
              <CardDescription>Track and analyze staff performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staff
                  .sort((a, b) => b.performanceRating - a.performanceRating)
                  .slice(0, 10)
                  .map((member, index) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-2xl font-bold text-muted-foreground w-8">#{index + 1}</div>
                        <Avatar>
                          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.department}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-8 mr-8">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">Performance</div>
                          <div className="flex items-center gap-1">
                            <Star className="size-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{member.performanceRating}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">Tasks</div>
                          <div className="font-medium">{member.tasksCompleted}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">Attendance</div>
                          <div className="font-medium">{member.attendanceRate}%</div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(
                  staff.reduce((acc, member) => {
                    acc[member.department] = (acc[member.department] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([dept, count]) => (
                  <div key={dept} className="flex items-center justify-between">
                    <span className="text-sm">{dept}</span>
                    <div className="flex items-center gap-4">
                      <Progress value={(count / totalStaff) * 100} className="w-32 h-2" />
                      <span className="text-sm font-medium w-8">{count}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Customer Service Excellence", count: 2 },
                  { name: "Cleaning & Sanitation", count: 4 },
                  { name: "Safety Training", count: 2 },
                  { name: "Hotel Management", count: 2 },
                  { name: "HVAC Certified", count: 1 }
                ].map((cert) => (
                  <div key={cert.name} className="flex items-center gap-3">
                    <Award className="size-4 text-yellow-600" />
                    <div className="flex-1">
                      <div className="text-sm">{cert.name}</div>
                      <div className="text-xs text-muted-foreground">{cert.count} staff members</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Staff Detail Dialog */}
      {selectedStaff && (
        <Dialog open={!!selectedStaff} onOpenChange={() => setSelectedStaff(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Staff Member Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="size-16">
                  <AvatarFallback>{getInitials(selectedStaff.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium">{selectedStaff.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedStaff.department}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={statusColors[selectedStaff.status]}>{selectedStaff.status}</Badge>
                    <Badge variant="outline">{selectedStaff.id}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="text-sm">{selectedStaff.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="text-sm">{selectedStaff.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Hire Date</Label>
                  <p className="text-sm">{selectedStaff.hireDate}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Hourly Rate</Label>
                  <p className="text-sm">${selectedStaff.hourlyRate}/hour</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Default Shift</Label>
                  <p className="text-sm">{formatShiftType(selectedStaff.shift)}</p>
                </div>
                {selectedStaff.address && (
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Address</Label>
                    <p className="text-sm">{selectedStaff.address}</p>
                  </div>
                )}
                {selectedStaff.emergencyContact && (
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Emergency Contact</Label>
                    <p className="text-sm">{selectedStaff.emergencyContact}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t">
                <h4 className="font-medium">Performance Metrics</h4>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Star className="size-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-2xl font-bold">{selectedStaff.performanceRating}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Performance</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{selectedStaff.tasksCompleted}</div>
                        <div className="text-xs text-muted-foreground">Tasks Completed</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{selectedStaff.attendanceRate}%</div>
                        <div className="text-xs text-muted-foreground">Attendance</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {selectedStaff.certifications && selectedStaff.certifications.length > 0 && (
                <div className="space-y-3 pt-4 border-t">
                  <h4 className="font-medium">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStaff.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary">
                        <Award className="size-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StaffManagement;
