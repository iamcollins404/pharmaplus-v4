"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductSort() {
  return (
    <Select defaultValue="name-asc">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
        <SelectItem value="price-asc">Price (Low to High)</SelectItem>
        <SelectItem value="price-desc">Price (High to Low)</SelectItem>
        <SelectItem value="popularity">Popularity</SelectItem>
      </SelectContent>
    </Select>
  );
}