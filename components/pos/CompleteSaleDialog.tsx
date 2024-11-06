"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  cartQuantity: number;
}

interface CompleteSaleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  total: number;
  onComplete: (paymentDetails: {
    method: "cash" | "card";
    amountPaid: number;
    cardDetails?: {
      number: string;
      expiry: string;
      cvv: string;
    };
  }) => Promise<void>;
}

export function CompleteSaleDialog({
  open,
  onOpenChange,
  cartItems,
  total,
  onComplete,
}: CompleteSaleDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [cashAmount, setCashAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleComplete = async () => {
    try {
      setIsProcessing(true);

      if (paymentMethod === "cash") {
        const amount = parseFloat(cashAmount);
        if (isNaN(amount) || amount < total) {
          toast.error("Invalid cash amount");
          return;
        }
      } else {
        // Validate card details
        if (!cardNumber || !cardExpiry || !cardCVV) {
          toast.error("Please fill in all card details");
          return;
        }
        if (!/^\d{16}$/.test(cardNumber)) {
          toast.error("Invalid card number");
          return;
        }
        if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
          toast.error("Invalid expiry date (MM/YY)");
          return;
        }
        if (!/^\d{3}$/.test(cardCVV)) {
          toast.error("Invalid CVV");
          return;
        }
      }

      await onComplete({
        method: paymentMethod,
        amountPaid: paymentMethod === "cash" ? parseFloat(cashAmount) : total,
        ...(paymentMethod === "card" && {
          cardDetails: {
            number: cardNumber,
            expiry: cardExpiry,
            cvv: cardCVV,
          },
        }),
      });

      // Reset form
      setCashAmount("");
      setCardNumber("");
      setCardExpiry("");
      setCardCVV("");
      
    } catch (error) {
      toast.error("Failed to process payment");
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateChange = () => {
    const amount = parseFloat(cashAmount);
    if (isNaN(amount)) return 0;
    return Math.max(0, amount - total);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Complete Sale</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.cartQuantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.cartQuantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold">${total.toFixed(2)}</span>
            </div>
          </div>

          <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "cash" | "card")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cash">Cash</TabsTrigger>
              <TabsTrigger value="card">Card</TabsTrigger>
            </TabsList>
            <TabsContent value="cash" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cashAmount">Amount Received</Label>
                <Input
                  id="cashAmount"
                  type="number"
                  step="0.01"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              {parseFloat(cashAmount) > 0 && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Change:</span>
                    <span className="font-bold">
                      ${calculateChange().toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="card" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardExpiry">Expiry Date</Label>
                  <Input
                    id="cardExpiry"
                    value={cardExpiry}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + "/" + value.slice(2, 4);
                      }
                      setCardExpiry(value);
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardCVV">CVV</Label>
                  <Input
                    id="cardCVV"
                    value={cardCVV}
                    onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    placeholder="123"
                    maxLength={3}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleComplete}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Complete Sale"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}