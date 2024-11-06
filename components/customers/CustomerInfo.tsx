"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface CustomerInfoProps {
  customerId: string;
}

// Sample data - replace with actual data from your backend
const customerData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 234 567 8900",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
  },
  insurance: {
    provider: "HealthCare Plus",
    policyNumber: "HC123456789",
    groupNumber: "GRP987654",
    expiryDate: "2024-12-31",
  },
};

export function CustomerInfo({ customerId }: CustomerInfoProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          {isEditing ? "Save Changes" : "Edit"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            defaultValue={customerData.name}
            readOnly={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            defaultValue={customerData.email}
            readOnly={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            defaultValue={customerData.phone}
            readOnly={!isEditing}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              defaultValue={customerData.address.street}
              readOnly={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              defaultValue={customerData.address.city}
              readOnly={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              defaultValue={customerData.address.state}
              readOnly={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              defaultValue={customerData.address.zipCode}
              readOnly={!isEditing}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Insurance Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="provider">Insurance Provider</Label>
            <Input
              id="provider"
              defaultValue={customerData.insurance.provider}
              readOnly={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="policyNumber">Policy Number</Label>
            <Input
              id="policyNumber"
              defaultValue={customerData.insurance.policyNumber}
              readOnly={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="groupNumber">Group Number</Label>
            <Input
              id="groupNumber"
              defaultValue={customerData.insurance.groupNumber}
              readOnly={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              defaultValue={customerData.insurance.expiryDate}
              readOnly={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}