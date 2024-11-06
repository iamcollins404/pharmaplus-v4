"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface CustomerListProps {
  searchQuery: string;
  selectedCustomerId: string | null;
  onSelectCustomer: (id: string) => void;
}

// Sample data - replace with actual data from your backend
const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    lastVisit: "2024-03-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 8901",
    lastVisit: "2024-03-14",
  },
  // Add more sample customers
];

export function CustomerList({
  searchQuery,
  selectedCustomerId,
  onSelectCustomer,
}: CustomerListProps) {
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="h-[600px]">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-2">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className={cn(
                "p-4 rounded-lg cursor-pointer transition-colors",
                selectedCustomerId === customer.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
              onClick={() => onSelectCustomer(customer.id)}
            >
              <h3 className="font-medium">{customer.name}</h3>
              <p className="text-sm opacity-90">{customer.email}</p>
              <div className="flex justify-between items-center mt-2 text-sm opacity-90">
                <span>{customer.phone}</span>
                <span>Last visit: {new Date(customer.lastVisit).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}