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
import { Plus, Search, Settings, Star } from "lucide-react";
import { SupplierDialog } from "./SupplierDialog";
import { toast } from "sonner";

interface Supplier {
  id: string;
  name: string;
  code: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  status: "active" | "inactive";
  leadTime: number;
}

const sampleSuppliers: Supplier[] = [
  {
    id: "1",
    name: "PharmaCorp",
    code: "SUP001",
    contactPerson: "John Smith",
    email: "john@pharmacorp.com",
    phone: "+1 234-567-8900",
    address: "123 Pharma St, Medical City, MC 12345",
    rating: 4.5,
    status: "active",
    leadTime: 3,
  },
  {
    id: "2",
    name: "MediPharm",
    code: "SUP002",
    contactPerson: "Jane Doe",
    email: "jane@medipharm.com",
    phone: "+1 234-567-8901",
    address: "456 Medi Ave, Pharma City, PC 67890",
    rating: 4.0,
    status: "active",
    leadTime: 5,
  },
];

export function SupplierList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(sampleSuppliers);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSupplierDialog, setShowSupplierDialog] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSupplier = (supplier: Omit<Supplier, "id">) => {
    const newSupplier = {
      ...supplier,
      id: Math.random().toString(36).substr(2, 9),
    };
    setSuppliers([...suppliers, newSupplier]);
    toast.success("Supplier added successfully");
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setSuppliers(suppliers.map((s) => (s.id === supplier.id ? supplier : s)));
    toast.success("Supplier updated successfully");
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const handleSubmitSupplier = (supplier: Supplier | Omit<Supplier, "id">) => {
    if ("id" in supplier) {
      handleEditSupplier(supplier);
    } else {
      handleAddSupplier(supplier);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button
          onClick={() => {
            setSelectedSupplier(null);
            setShowSupplierDialog(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Lead Time (days)</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-medium">{supplier.name}</TableCell>
                <TableCell>{supplier.code}</TableCell>
                <TableCell>{supplier.contactPerson}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>{supplier.leadTime}</TableCell>
                <TableCell>{renderRating(supplier.rating)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      supplier.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {supplier.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedSupplier(supplier);
                      setShowSupplierDialog(true);
                    }}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <SupplierDialog
        open={showSupplierDialog}
        onOpenChange={setShowSupplierDialog}
        supplier={selectedSupplier}
        onSubmit={handleSubmitSupplier}
      />
    </div>
  );
}