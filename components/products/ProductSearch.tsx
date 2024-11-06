"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function ProductSearch() {
  return (
    <div className="relative w-full sm:w-[300px]">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search products..."
        className="pl-9"
      />
    </div>
  );
}