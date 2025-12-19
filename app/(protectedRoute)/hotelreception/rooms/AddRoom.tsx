"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import React from "react";

const AddRoom = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Room
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Room</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Room Number" />
            <Input placeholder="Room Name" />
            <Input placeholder="Room Type" />
            <Input placeholder="Floor" type="number" />
            <Input placeholder="Price" type="number" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Room Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Capacity" type="number" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Amenities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wifi">WiFi</SelectItem>
                <SelectItem value="ac">AC</SelectItem>
                <SelectItem value="tv">TV</SelectItem>
                <SelectItem value="minibar">Mini Bar</SelectItem>
              </SelectContent>
            </Select>
            <textarea className="w-full p-2 border rounded" placeholder="Description" />
            <Button className="w-full">Add Room</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddRoom;
