"use client";

import { CartItem } from "@/types/pos";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CartSummaryProps {
  items: CartItem[];
  onRemoveItem: (item: CartItem) => void;
  onCompleteSale: () => void;
}

export function CartSummary({
  items,
  onRemoveItem,
  onCompleteSale,
}: CartSummaryProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Current Cart</h2>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.cartQuantity}</TableCell>
                <TableCell>
                  ${(item.price * item.cartQuantity).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => onRemoveItem(item)}
                    variant="destructive"
                    size="sm"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
        <span className="text-lg font-semibold">Total:</span>
        <span className="text-2xl font-bold">${total.toFixed(2)}</span>
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={onCompleteSale}
        disabled={items.length === 0}
      >
        Complete Sale
      </Button>
    </div>
  );
}