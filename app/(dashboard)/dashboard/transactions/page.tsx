"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Download,
  Search,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
} from "lucide-react";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { format } from "date-fns";

// Sample data - replace with actual data from your backend
const transactions = [
  {
    id: "TX001",
    date: "2024-03-15",
    type: "sale",
    description: "POS Sale #1234",
    amount: 156.99,
    status: "completed",
    customer: "John Doe",
  },
  {
    id: "TX002",
    date: "2024-03-15",
    type: "purchase",
    description: "Inventory Restock",
    amount: -1250.00,
    status: "completed",
    supplier: "MedSupply Co.",
  },
  // Add more sample transactions
];

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [transactionType, setTransactionType] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netIncome = totalIncome - totalExpenses;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground">
            View and manage your financial records
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Records
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-2xl font-bold text-green-700">
                ${totalIncome.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-red-100 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold text-red-700">
                ${totalExpenses.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Net Income</p>
              <p className="text-2xl font-bold text-blue-700">
                ${netIncome.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <FileText className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Transactions</p>
              <p className="text-2xl font-bold text-purple-700">
                {transactions.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DatePickerWithRange className="w-full sm:w-[300px]" />
        <Select
          value={transactionType}
          onValueChange={setTransactionType}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Transaction Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="sale">Sales</SelectItem>
            <SelectItem value="purchase">Purchases</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transactions Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  Amount
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions
              .filter(transaction =>
                transaction.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) &&
                (transactionType === "all" || transaction.type === transactionType)
              )
              .sort((a, b) =>
                sortOrder === "asc"
                  ? a.amount - b.amount
                  : b.amount - a.amount
              )
              .map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{format(new Date(transaction.date), "MMM d, yyyy")}</TableCell>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === "sale"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {transaction.type === "sale" ? "Sale" : "Purchase"}
                    </span>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    transaction.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.amount > 0 ? "+" : ""}${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}