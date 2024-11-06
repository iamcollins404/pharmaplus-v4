"use client";

import { useState } from "react";
import { CustomerList } from "@/components/customers/CustomerList";
import { CustomerDetails } from "@/components/customers/CustomerDetails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { AddCustomerDialog } from "@/components/customers/AddCustomerDialog";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage customer information and prescriptions
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <CustomerList
            searchQuery={searchQuery}
            onSelectCustomer={setSelectedCustomerId}
            selectedCustomerId={selectedCustomerId}
          />
        </div>
        <div className="md:col-span-8">
          {selectedCustomerId ? (
            <CustomerDetails customerId={selectedCustomerId} />
          ) : (
            <div className="flex items-center justify-center h-[400px] border rounded-lg bg-muted/10">
              <p className="text-muted-foreground">
                Select a customer to view details
              </p>
            </div>
          )}
        </div>
      </div>

      <AddCustomerDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
}