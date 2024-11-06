"use client";

import { useState } from "react";
import { ProductList } from "@/components/pos/ProductList";
import { CartSummary } from "@/components/pos/CartSummary";
import { PrescriptionValidationDialog } from "@/components/pos/PrescriptionValidationDialog";
import { CompleteSaleDialog } from "@/components/pos/CompleteSaleDialog";
import { PRODUCTS } from "@/lib/constants/products";
import { CartItem, Product } from "@/types/pos";
import { toast } from "sonner";

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
  const [showCompleteSaleDialog, setShowCompleteSaleDialog] = useState(false);

  const handleAddToCart = (product: Product) => {
    if (product.quantity === 0) {
      toast.error("Product out of stock");
      return;
    }

    setProducts(
      products.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      )
    );

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...product, cartQuantity: 1 }];
    });
  };

  const handleRemoveFromCart = (item: CartItem) => {
    setProducts(
      products.map((p) =>
        p.id === item.id ? { ...p, quantity: p.quantity + item.cartQuantity } : p
      )
    );

    setCartItems((currentItems) =>
      currentItems.filter((cartItem) => cartItem.id !== item.id)
    );
  };

  const handleCompleteSale = () => {
    const hasControlledSubstances = cartItems.some((item) => item.schedule);
    if (hasControlledSubstances) {
      setShowPrescriptionDialog(true);
    } else {
      setShowCompleteSaleDialog(true);
    }
  };

  const handlePrescriptionValidated = () => {
    setShowPrescriptionDialog(false);
    setShowCompleteSaleDialog(true);
  };

  const handleSaleComplete = () => {
    setCartItems([]);
    setShowCompleteSaleDialog(false);
    toast.success("Sale completed successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Point of Sale</h2>
        <p className="text-muted-foreground">Process sales and manage transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList
          products={products}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddToCart={handleAddToCart}
        />

        <CartSummary
          items={cartItems}
          onRemoveItem={handleRemoveFromCart}
          onCompleteSale={handleCompleteSale}
        />
      </div>

      <PrescriptionValidationDialog
        open={showPrescriptionDialog}
        onOpenChange={setShowPrescriptionDialog}
        cartItems={cartItems}
        onValidationComplete={handlePrescriptionValidated}
      />

      <CompleteSaleDialog
        open={showCompleteSaleDialog}
        onOpenChange={setShowCompleteSaleDialog}
        cartItems={cartItems}
        total={cartItems.reduce((sum, item) => sum + item.price * item.cartQuantity, 0)}
        onComplete={handleSaleComplete}
      />
    </div>
  );
}