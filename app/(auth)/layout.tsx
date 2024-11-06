"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSignUp = pathname === "/auth/signup";

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex bg-gray-900 items-center justify-center p-8">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-white mb-4">PharmaPlus POS</h1>
          <p className="text-gray-400">
            {isSignUp
              ? "Join thousands of pharmacies using our modern point of sale system."
              : "Welcome back! Sign in to manage your pharmacy operations."}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
    </div>
  );
}