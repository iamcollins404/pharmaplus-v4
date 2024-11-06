"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Truck, Package, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { DeliveryDetailsDialog } from "./DeliveryDetailsDialog";

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

const sampleDeliveries: DeliveryStatus[] = [
  {
    id: "1",
    orderNumber: "PO-2024-001",
    status: "in_transit",
    estimatedDelivery: "2024-03-20",
    address: "123 Pharmacy St, Medical City, MC 12345",
    trackingNumber: "TRK123456789",
    carrier: "Express Logistics",
    updates: [
      {
        timestamp: "2024-03-18T14:30:00",
        status: "Package in transit",
        location: "Distribution Center"
      },
      {
        timestamp: "2024-03-18T09:00:00",
        status: "Package picked up",
        location: "Supplier Warehouse"
      }
    ]
  },
  {
    id: "2",
    orderNumber: "PO-2024-002",
    status: "delivered",
    estimatedDelivery: "2024-03-19",
    actualDelivery: "2024-03-19",
    address: "456 Medical Ave, Pharma City, PC 67890",
    trackingNumber: "TRK987654321",
    carrier: "MediFreight",
    updates: [
      {
        timestamp: "2024-03-19T15:00:00",
        status: "Delivered",
        location: "Destination"
      },
      {
        timestamp: "2024-03-19T10:00:00",
        status: "Out for delivery",
        location: "Local Hub"
      }
    ]
  }
];

export function DeliveryTracking() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryStatus | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const getStatusBadge = (status: DeliveryStatus["status"]) => {
    const statusConfig = {
      in_transit: { label: "In Transit", variant: "default" },
      delivered: { label: "Delivered", variant: "success" },
      pending: { label: "Pending", variant: "secondary" },
      out_for_delivery: { label: "Out for Delivery", variant: "warning" }
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant as any}>{config.label}</Badge>
    );
  };

  const filteredDeliveries = sampleDeliveries.filter(delivery =>
    delivery.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    delivery.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Delivery Tracking</h3>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-full">
              <Package className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-lg font-semibold">24</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-100 rounded-full">
              <Truck className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Transit</p>
              <p className="text-lg font-semibold">8</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Delivered</p>
              <p className="text-lg font-semibold">15</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-full">
              <MapPin className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Destinations</p>
              <p className="text-lg font-semibold">6</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Carrier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Estimated Delivery</TableHead>
              <TableHead>Delivery Address</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDeliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell className="font-medium">{delivery.orderNumber}</TableCell>
                <TableCell>{delivery.trackingNumber}</TableCell>
                <TableCell>{delivery.carrier}</TableCell>
                <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                <TableCell>{format(new Date(delivery.estimatedDelivery), "MMM d, yyyy")}</TableCell>
                <TableCell className="max-w-[200px] truncate">{delivery.address}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedDelivery(delivery);
                      setShowDetailsDialog(true);
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <DeliveryDetailsDialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        delivery={selectedDelivery}
      />
    </div>
  );
}