"use client";

import { useState } from "react";
import { CartItem } from "@/types/pos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileUploader } from "./FileUploader";
import { toast } from "sonner";

interface PrescriptionValidationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  onValidationComplete: () => void;
}

export function PrescriptionValidationDialog({
  open,
  onOpenChange,
  cartItems,
  onValidationComplete,
}: PrescriptionValidationDialogProps) {
  const [prescriptionData, setPrescriptionData] = useState({
    prescriptionNumber: "",
    prescriberName: "",
    prescriberDEA: "",
    prescriptionDate: "",
    expiryDate: "",
    prescriptionFile: null as File | null,
  });

  const controlledSubstances = cartItems.filter((item) => item.schedule);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate prescription data
    if (!prescriptionData.prescriptionNumber || 
        !prescriptionData.prescriberName || 
        !prescriptionData.prescriberDEA || 
        !prescriptionData.prescriptionDate || 
        !prescriptionData.prescriptionFile) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate prescription date
    const prescriptionDate = new Date(prescriptionData.prescriptionDate);
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    if (prescriptionDate < sixMonthsAgo) {
      toast.error("Prescription is too old (over 6 months)");
      return;
    }

    if (prescriptionDate > today) {
      toast.error("Prescription date cannot be in the future");
      return;
    }

    // Validate DEA number format (2 letters followed by 7 digits)
    const deaRegex = /^[A-Z]{2}\d{7}$/;
    if (!deaRegex.test(prescriptionData.prescriberDEA)) {
      toast.error("Invalid DEA number format");
      return;
    }

    try {
      // In a real application, you would:
      // 1. Upload the prescription file to secure storage
      // 2. Verify the prescriber's DEA number against a database
      // 3. Store the prescription details in your database
      // 4. Link the prescription to the transaction
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Prescription validated successfully");
      onValidationComplete();
    } catch (error) {
      toast.error("Failed to validate prescription");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Prescription Validation Required</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Controlled Substances in Cart:</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {controlledSubstances.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>Schedule {item.schedule}</TableCell>
                    <TableCell>{item.cartQuantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prescriptionNumber">Prescription Number</Label>
              <Input
                id="prescriptionNumber"
                value={prescriptionData.prescriptionNumber}
                onChange={(e) =>
                  setPrescriptionData({
                    ...prescriptionData,
                    prescriptionNumber: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prescriberName">Prescriber Name</Label>
              <Input
                id="prescriberName"
                value={prescriptionData.prescriberName}
                onChange={(e) =>
                  setPrescriptionData({
                    ...prescriptionData,
                    prescriberName: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prescriberDEA">Prescriber DEA Number</Label>
              <Input
                id="prescriberDEA"
                value={prescriptionData.prescriberDEA}
                onChange={(e) =>
                  setPrescriptionData({
                    ...prescriptionData,
                    prescriberDEA: e.target.value.toUpperCase(),
                  })
                }
                placeholder="AB1234567"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prescriptionDate">Prescription Date</Label>
              <Input
                id="prescriptionDate"
                type="date"
                value={prescriptionData.prescriptionDate}
                onChange={(e) =>
                  setPrescriptionData({
                    ...prescriptionData,
                    prescriptionDate: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Upload Prescription</Label>
            <FileUploader
              onFileSelect={(file) =>
                setPrescriptionData({ ...prescriptionData, prescriptionFile: file })
              }
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Validate Prescription</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}