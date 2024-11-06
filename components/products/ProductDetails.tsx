"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/app/(dashboard)/dashboard/products/page";

interface ProductDetailsProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetails({
  product,
  onClose,
  onAddToCart,
}: ProductDetailsProps) {
  if (!product) return null;

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Description</h4>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold">Category</h4>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
              <div>
                <h4 className="font-semibold">SKU</h4>
                <p className="text-sm text-muted-foreground">{product.sku}</p>
              </div>
              <div>
                <h4 className="font-semibold">Manufacturer</h4>
                <p className="text-sm text-muted-foreground">{product.manufacturer}</p>
              </div>
              {product.expiryDate && (
                <div>
                  <h4 className="font-semibold">Expiry Date</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(product.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              <div>
                <h4 className="font-semibold">Stock</h4>
                <p className="text-sm text-muted-foreground">
                  {product.stock} units available
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <span className="text-2xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              <Button
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}