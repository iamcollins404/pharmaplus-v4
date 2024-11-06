"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Package, Truck, MapPin, Calendar } from "lucide-react";

interface DeliveryStatus {
  id: string;
  orderNumber: string;
  status: "in_transit" | "delivered" | "pending" | "out_for_delivery";
  estimatedDelivery: string;
  actualDelivery?: string;
  address: string;
  trackingNumber: string;
  carrier: string;
  updates: {
    timestamp: string;
    status: string;
    location: string;
  }[];
}

interface DeliveryDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  delivery: DeliveryStatus | null;
}

export function DeliveryDetailsDialog({
  open,
  onOpenChange,
  delivery
}: DeliveryDetailsDialogProps) {
  if (!delivery) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Delivery Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-medium">{delivery.orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tracking Number</p>
              <p className="font-medium">{delivery.trackingNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Carrier</p>
              <p className="font-medium">{delivery.carrier}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge
                variant={
                  delivery.status === "delivered" ? "success" :
                  delivery.status === "in_transit" ? "default" :
                  delivery.status === "out_for_delivery" ? "warning" : "secondary"
                }
              >
                {delivery.status.replace("_", " ").toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Estimated Delivery</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(delivery.estimatedDelivery), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Delivery Address</p>
                <p className="text-sm text-muted-foreground">{delivery.address}</p>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div>
            <h4 className="font-medium mb-4">Tracking Updates</h4>
            <div className="space-y-4">
              {delivery.updates.map((update, index) => (
                <div key={index} className="flex gap-3">
                  <div className="relative">
                    <div className="absolute top-2 left-2 -bottom-4 w-0.5 bg-muted" />
                    <div className="relative z-10 w-4 h-4 rounded-full bg-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{update.status}</p>
                    <p className="text-sm text-muted-foreground">{update.location}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(update.timestamp), "MMM d, yyyy HH:mm")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}