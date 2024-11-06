"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  History,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Boxes,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Point of Sale",
    icon: ShoppingCart,
    href: "/dashboard/pos",
    color: "text-violet-500",
  },
  {
    label: "Products",
    icon: Package,
    href: "/dashboard/products",
    color: "text-pink-700",
  },
  {
    label: "Procurement",
    icon: Boxes,
    href: "/dashboard/procurement",
    color: "text-orange-700",
  },
  {
    label: "Transactions",
    icon: History,
    href: "/dashboard/transactions",
    color: "text-emerald-500",
  },
  {
    label: "Customers",
    icon: Users,
    href: "/dashboard/customers",
    color: "text-blue-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-gray-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative flex flex-col">
      <div
        className={cn(
          "flex flex-col h-full bg-gray-900 text-white transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="p-4 flex-1">
          <div className={cn(
            "flex items-center mb-10",
            isCollapsed ? "justify-center" : "px-2"
          )}>
            {!isCollapsed && <h1 className="text-2xl font-bold">PharmaPlus</h1>}
          </div>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center py-3 px-3 rounded-lg transition-colors",
                  pathname === route.href
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/10",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <route.icon className={cn("h-5 w-5", route.color)} />
                {!isCollapsed && (
                  <span className="ml-3 text-sm font-medium">
                    {route.label}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 text-gray-400 hover:text-gray-100"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}