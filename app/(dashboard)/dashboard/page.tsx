"use client";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  Package,
  AlertTriangle,
  TrendingUp,
  Users,
} from "lucide-react";

// Sample data for charts
const salesData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 2000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 1890 },
  { name: "Sat", sales: 2390 },
  { name: "Sun", sales: 3490 },
];

const categoryData = [
  { name: "Pain Relief", value: 400 },
  { name: "Antibiotics", value: 300 },
  { name: "Vitamins", value: 300 },
  { name: "First Aid", value: 200 },
];

const inventoryData = [
  { category: "Pain Relief", inStock: 120, lowStock: 20 },
  { category: "Antibiotics", inStock: 80, lowStock: 15 },
  { category: "Vitamins", inStock: 200, lowStock: 10 },
  { category: "First Aid", inStock: 150, lowStock: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back to PharmaPlus</p>
        </div>
        <Select defaultValue="today">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Today's Sales</p>
              <h3 className="text-2xl font-bold mt-1">$2,450</h3>
              <p className="text-xs text-green-500 mt-1">+12.5% from yesterday</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <h3 className="text-2xl font-bold mt-1">45</h3>
              <p className="text-xs text-green-500 mt-1">+5% from yesterday</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-violet-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Stock Items</p>
              <h3 className="text-2xl font-bold mt-1">8</h3>
              <p className="text-xs text-red-500 mt-1">Requires attention</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Customers</p>
              <h3 className="text-2xl font-bold mt-1">284</h3>
              <p className="text-xs text-green-500 mt-1">+2.5% from last week</p>
            </div>
            <Users className="h-8 w-8 text-emerald-500" />
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sales Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Inventory Status */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Inventory Status</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inStock" fill="#2563eb" name="In Stock" />
                <Bar dataKey="lowStock" fill="#dc2626" name="Low Stock" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                action: "New order received",
                time: "2 minutes ago",
                details: "Order #1234 - $156.00"
              },
              {
                action: "Low stock alert",
                time: "15 minutes ago",
                details: "Paracetamol 500mg - 20 units remaining"
              },
              {
                action: "Payment received",
                time: "1 hour ago",
                details: "Invoice #5678 - $342.00"
              },
              {
                action: "New customer registered",
                time: "2 hours ago",
                details: "John Doe (john@example.com)"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <p className="font-medium">{item.action}</p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{item.details}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}