"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductList } from "@/components/procurement/ProductList";
import { SupplierList } from "@/components/procurement/SupplierList";
import { PurchaseOrders } from "@/components/procurement/PurchaseOrders";
import { DeliveryTracking } from "@/components/procurement/DeliveryTracking";
import { Card } from "@/components/ui/card";
import { AlertCircle, Box, TruckIcon, Users } from "lucide-react";

export default function ProcurementPage() {
  const [activeTab, setActiveTab] = useState("products");

  const stats = [
    {
      title: "Low Stock Items",
      value: "12",
      description: "Items below threshold",
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-100",
    },
    {
      title: "Active Suppliers",
      value: "24",
      description: "Verified suppliers",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Pending Orders",
      value: "8",
      description: "Awaiting delivery",
      icon: TruckIcon,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Total Products",
      value: "156",
      description: "In inventory",
      icon: Box,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Procurement</h2>
        <p className="text-muted-foreground">
          Manage inventory, suppliers, and purchase orders
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
        </TabsList>
        <TabsContent value="products" className="mt-6">
          <ProductList />
        </TabsContent>
        <TabsContent value="suppliers" className="mt-6">
          <SupplierList />
        </TabsContent>
        <TabsContent value="orders" className="mt-6">
          <PurchaseOrders />
        </TabsContent>
        <TabsContent value="deliveries" className="mt-6">
          <DeliveryTracking />
        </TabsContent>
      </Tabs>
    </div>
  );
}