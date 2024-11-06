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
import {
  AlertCircle,
  ArrowUpDown,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductDialog } from "./ProductDialog";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  reorderPoint: number;
  supplier: string;
  unitPrice: number;
  category: string;
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    sku: "PARA500",
    currentStock: 50,
    reorderPoint: 100,
    supplier: "PharmaCorp",
    unitPrice: 5.99,
    category: "Pain Relief",
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    sku: "AMOX250",
    currentStock: 120,
    reorderPoint: 80,
    supplier: "MediPharm",
    unitPrice: 12.99,
    category: "Antibiotics",
  },
];

export function ProductList() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof Product>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const order = sortOrder === "asc" ? 1 : -1;
    return aValue < bValue ? -order : order;
  });

  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProducts([...products, newProduct]);
    toast.success("Product added successfully");
  };

  const handleEditProduct = (product: Product) => {
    setProducts(products.map((p) => (p.id === product.id ? product : p)));
    toast.success("Product updated successfully");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setSelectedProduct(null);
              setShowProductDialog(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="flex items-center"
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("currentStock")}
                  className="flex items-center"
                >
                  Current Stock
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Reorder Point</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.currentStock}</TableCell>
                <TableCell>{product.reorderPoint}</TableCell>
                <TableCell>{product.supplier}</TableCell>
                <TableCell>${product.unitPrice.toFixed(2)}</TableCell>
                <TableCell>
                  {product.currentStock <= product.reorderPoint ? (
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-red-500">Low Stock</span>
                    </div>
                  ) : (
                    <span className="text-green-500">In Stock</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowProductDialog(true);
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

      <ProductDialog
        open={showProductDialog}
        onOpenChange={setShowProductDialog}
        product={selectedProduct}
        onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
      />
    </div>
  );
}