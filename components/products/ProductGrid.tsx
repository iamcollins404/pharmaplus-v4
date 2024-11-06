"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { ProductQuickView } from "./ProductQuickView";
import { ShoppingCart, Eye } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

const ITEMS_PER_PAGE = 12;

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  // Simulate infinite scroll
  const loadMore = () => {
    setPage((prev) => prev + 1);
    // In a real app, fetch more products here
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden group">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setSelectedProduct(product)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold truncate">{product.name}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {product.description}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold">${product.price.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">
                  {product.stock} in stock
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div ref={ref} className="py-8 flex justify-center">
        {inView && <Button onClick={loadMore}>Load More</Button>}
      </div>

      <ProductQuickView
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}

// Sample data - replace with actual API data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    description: "Pain relief and fever reduction tablets",
    price: 5.99,
    category: "Pain Relief",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=60",
    stock: 150,
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    description: "Antibiotic capsules",
    price: 12.99,
    category: "Antibiotics",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&auto=format&fit=crop&q=60",
    stock: 80,
  },
  // Add more sample products as needed
];