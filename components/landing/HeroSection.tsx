"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Pill,
  LineChart,
  Clock,
  Users,
  Building2,
  ArrowRight,
  CheckCircle2,
  Play,
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-indigo-50 to-white -z-10" />
      <div className="absolute inset-0 bg-grid opacity-20 -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse mr-2" />
              <span className="text-sm font-medium text-blue-600">
                Trusted by 1000+ Pharmacies
              </span>
            </div>

            <h1 className="text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Modern Pharmacy
              </span>
              <br />
              Management Made Simple
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Streamline your pharmacy operations with our comprehensive inventory
              and billing platform. Manage stock, process orders, and handle
              billing—all in one place.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1200&h=800&q=80"
                  alt="Dashboard Preview"
                  width={1200}
                  height={800}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -left-6"
              >
                <Card className="p-4 shadow-lg backdrop-blur-sm bg-white/90">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Real-time Updates</p>
                      <p className="text-sm text-gray-600">Always in sync</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -top-6 -right-6"
              >
                <Card className="p-4 shadow-lg backdrop-blur-sm bg-white/90">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Secure & Compliant</p>
                      <p className="text-sm text-gray-600">HIPAA Ready</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -left-12 -top-12 w-64 h-64 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}