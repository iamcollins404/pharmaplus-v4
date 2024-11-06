"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Plus, Search } from "lucide-react";
import { PurchaseOrderDialog } from "./PurchaseOrderDialog";
import { format } from "date-fns";
import { toast } from "sonner";

interface PurchaseOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: string;
  status: "draft" | "pending" | "approved" | "received" | "cancelled";
  items: PurchaseOrderItem[];
  totalAmount: number;
  createdAt: string;
  expectedDelivery: string;
}

const sampleOrders: PurchaseOrder[] = [
  {
    id: "1",
    orderNumber: "PO-2024-001",
    supplier: "PharmaCorp",
    status: "pending",
    items: [
      {
        productId: "1",
        productName: "Paracetamol 500mg",
        quantity: 1000,
        unitPrice: 5.99,
        total: 5990,
      },
    ],
    totalAmount: 5990,
    createdAt: "2024-03-15",
    expectedDelivery: "2024-03-20",
  },
  {
    id: "2",
    orderNumber: "PO-2024-002",
    supplier: "MediPharm",
    status: "approved",
    items: [
      {
        productId: "2",
        productName: "Amoxicillin 250mg",
        quantity: 500,
        unitPrice: 12.99,
        total: 6495,
      },
    ],
    totalAmount: 6495,
    createdAt: "2024-03-14",
    expectedDelivery: "2024-03-19",
  },
];

export function PurchaseOrders() {
  const [orders, setOrders] = useState<PurchaseOrder[]>(sampleOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddOrder = (order: Omit<PurchaseOrder, "id">) => {
    const newOrder = {
      ...order,
      id: Math.random().toString(36).substr(2, 9),
    };
    setOrders([...orders, newOrder]);
    toast.success("Purchase order created successfully");
  };

  const handleEditOrder = (order: PurchaseOrder) => {
    setOrders(orders.map((o) => (o.id === order.id ? order : o)));
    toast.success("Purchase order updated successfully");
  };

  const getStatusColor = (status: PurchaseOrder["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "received":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search purchase orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button
          onClick={() => {
            setSelectedOrder(null);
            setShowOrderDialog(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Order
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Expected Delivery</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  {order.orderNumber}
                </TableCell>
                <TableCell>{order.supplier}</TableCell>
                <TableCell>
                  {format(new Date(order.createdAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(order.expectedDelivery), "MMM d, yyyy")}
                </TableCell>
                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowOrderDialog(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PurchaseOrderDialog
        open={showOrderDialog}
        onOpenChange={setShowOrderDialog}
        order={selectedOrder}
        onSubmit={selectedOrder ? handleEditOrder : handleAddOrder}
      />
    </div>
  );
}