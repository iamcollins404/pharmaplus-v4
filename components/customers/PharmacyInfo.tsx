"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface PharmacyInfoProps {
  customerId: string;
}

// Sample data - replace with actual data from your backend
const pharmacyData = {
  name: "City Pharmacy",
  referringPharmacist: "Dr. Emily White",
  referralDate: "2024-01-15",
  phone: "+1 234 567 8900",
  email: "city.pharmacy@example.com",
  address: {
    street: "456 Oak Street",
    city: "New York",
    state: "NY",
    zipCode: "10002",
  },
  notes: "Regular customer transferred from downtown branch",
};

export function PharmacyInfo({ customerId }: PharmacyInfoProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Pharmacy Information</h3>
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
          <Label htmlFor="pharmacyName">Pharmacy Name</Label>
          <Input
            id="pharmacyName"
            defaultValue={pharmacyData.name}
            readOnly={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="referringPharmacist">Referring Pharmacist</Label>
          <Input
            id="referringPharmacist"
            defaultValue={pharmacyData.referringPharmacist}
            readOnly={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="referralDate">Referral Date</Label>
          <Input
            id="referralDate"
            type="date"
            defaultValue={pharmacyData.referralDate}
            readOnly={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pharmacyPhone">Phone</Label>
          <Input
            id="pharmacyPhone"
            defaultValue={pharmacyData.phone}
            readOnly={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pharmacyEmail">Email</Label>
          <Input
            id="pharmacyEmail"
            type="email"
            defaultValue={pharmacyData.email}
            readOnly={!isEditing}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Pharmacy Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pharmacyStreet">Street Address</Label>
            <Input
              id="pharmacyStreet"
              defaultValue={pharmacyData.address.street}
              readOnly={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pharmacyCity">City</Label>
            <Input
              id="pharmacyCity"
              defaultValue={pharmacyData.address.city}
              readOnly={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pharmacyState">State</Label>
            <Input
              id="pharmacyState"
              defaultValue={pharmacyData.address.state}
              readOnly={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pharmacyZip">ZIP Code</Label>
            <Input
              id="pharmacyZip"
              defaultValue={pharmacyData.address.zipCode}
              readOnly={!isEditing}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pharmacyNotes">Notes</Label>
        <Input
          id="pharmacyNotes"
          defaultValue={pharmacyData.notes}
          readOnly={!isEditing}
        />
      </div>
    </div>
  );
}