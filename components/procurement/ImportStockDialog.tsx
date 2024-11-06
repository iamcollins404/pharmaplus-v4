"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface ImportStockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportStockDialog({ open, onOpenChange }: ImportStockDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    sourceLocation: "",
    destinationLocation: "",
    referenceNumber: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Implement your stock transfer logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success("Stock transfer initiated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to initiate stock transfer");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Import Stock Transfer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sourceLocation">Source Location</Label>
            <Select
              value={formData.sourceLocation}
              onValueChange={(value) =>
                setFormData({ ...formData, sourceLocation: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select source location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warehouse-1">Main Warehouse</SelectItem>
                <SelectItem value="warehouse-2">Secondary Warehouse</SelectItem>
                <SelectItem value="store-1">Store Location 1</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destinationLocation">Destination Location</Label>
            <Select
              value={formData.destinationLocation}
              onValueChange={(value) =>
                setFormData({ ...formData, destinationLocation: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select destination location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pharmacy-1">Main Pharmacy</SelectItem>
                <SelectItem value="pharmacy-2">Branch Location</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="referenceNumber">Reference Number</Label>
            <Input
              id="referenceNumber"
              value={formData.referenceNumber}
              onChange={(e) =>
                setFormData({ ...formData, referenceNumber: e.target.value })
              }
              placeholder="Enter reference number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Add any additional notes"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Submit Transfer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}