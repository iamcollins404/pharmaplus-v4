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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash } from "lucide-react";

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

interface PurchaseOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: PurchaseOrder | null;
  onSubmit: (order: PurchaseOrder | Omit<PurchaseOrder, "id">) => void;
}

const suppliers = ["PharmaCorp", "MediPharm", "HealthSupplies", "MediWholesale"];

const products = [
  { id: "1", name: "Paracetamol 500mg", price: 5.99 },
  { id: "2", name: "Amoxicillin 250mg", price: 12.99 },
  { id: "3", name: "Ibuprofen 400mg", price: 7.99 },
];

export function PurchaseOrderDialog({
  open,
  onOpenChange,
  order,
  onSubmit,
}: PurchaseOrderDialogProps) {
  const [formData, setFormData] = useState<Omit<PurchaseOrder, "id">>({
    orderNumber: order?.orderNumber || `PO-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    supplier: order?.supplier || "",
    status: order?.status || "draft",
    items: order?.items || [],
    totalAmount: order?.totalAmount || 0,
    createdAt: order?.createdAt || new Date().toISOString().split('T')[0],
    expectedDelivery: order?.expectedDelivery || "",
  });

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          productId: "",
          productName: "",
          quantity: 0,
          unitPrice: 0,
          total: 0,
        },
      ],
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    const newTotal = calculateTotal(newItems);
    setFormData({ ...formData, items: newItems, totalAmount: newTotal });
  };

  const handleItemChange = (
    index: number,
    field: keyof PurchaseOrderItem,
    value: string | number
  ) => {
    const newItems = [...formData.items];
    const item = newItems[index];

    if (field === "productId") {
      const product = products.find((p) => p.id === value);
      if (product) {
        item.productId = product.id;
        item.productName = product.name;
        item.unitPrice = product.price;
        item.total = item.quantity * product.price;
      }
    } else if (field === "quantity") {
      item.quantity = Number(value);
      item.total = item.quantity * item.unitPrice;
    }

    const newTotal = calculateTotal(newItems);
    setFormData({ ...formData, items: newItems, totalAmount: newTotal });
  };

  const calculateTotal = (items: PurchaseOrderItem[]) => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (order) {
      onSubmit({ ...formData, id: order.id });
    } else {
      onSubmit(formData);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {order ? "Edit Purchase Order" : "Create Purchase Order"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Order Number</Label>
              <Input value={formData.orderNumber} disabled />
            </div>

            <div className="space-y-2">
              <Label>Supplier</Label>
              <Select
                value={formData.supplier}
                onValueChange={(value) =>
                  setFormData({ ...formData, supplier: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier} value={supplier}>
                      {supplier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: PurchaseOrder["status"]) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Expected Delivery Date</Label>
              <Input
                type="date"
                value={formData.expectedDelivery}
                onChange={(e) =>
                  setFormData({ ...formData, expectedDelivery: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Order Items</Label>
              <Button type="button" onClick={handleAddItem} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Select
                        value={item.productId}
                        onValueChange={(value) =>
                          handleItemChange(index, "productId", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>${item.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-lg font-semibold">
              Total: ${formData.totalAmount.toFixed(2)}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {order ? "Update Order" : "Create Order"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}