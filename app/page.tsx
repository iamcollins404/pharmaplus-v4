import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  ShieldCheck,
  Pill,
  LineChart,
  Clock,
  Users,
  Building2,
  Stethoscope,
  Laptop,
  Bell,
  BarChart3,
  ClipboardList,
  Boxes,
} from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Pill className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">PharmaPlus</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="#benefits" className="text-gray-600 hover:text-gray-900">Benefits</Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Everything You Need to Run Your Pharmacy
            </h2>
            <p className="text-gray-600 text-lg">
              A comprehensive suite of tools designed specifically for modern pharmacies,
              helping you streamline operations and enhance patient care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-none bg-white/80 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-8">
                  <div className="mb-6 relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose PharmaPlus
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href="#" className="text-gray-400 hover:text-white">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 PharmaPlus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Stethoscope,
    title: "Smart Inventory Management",
    description:
      "Advanced inventory control system with predictive analytics and automated reordering.",
    benefits: [
      "Real-time stock tracking",
      "Automated reorder points",
      "Expiry date monitoring",
      "Batch tracking & recalls"
    ]
  },
  {
    icon: Laptop,
    title: "Digital Point of Sale",
    description:
      "Modern POS system designed specifically for pharmacies with integrated billing and insurance processing.",
    benefits: [
      "Quick prescription filling",
      "Insurance verification",
      "Digital receipts",
      "Multiple payment methods"
    ]
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Stay informed with intelligent alerts and reminders for critical pharmacy operations.",
    benefits: [
      "Low stock alerts",
      "Expiry notifications",
      "Refill reminders",
      "Regulatory updates"
    ]
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Comprehensive reporting and analytics tools to make data-driven decisions.",
    benefits: [
      "Sales forecasting",
      "Inventory optimization",
      "Customer insights",
      "Financial reporting"
    ]
  },
  {
    icon: ClipboardList,
    title: "Prescription Management",
    description:
      "Streamlined prescription processing with digital record-keeping and verification.",
    benefits: [
      "Digital prescriptions",
      "Drug interaction checks",
      "Patient history tracking",
      "Automated refills"
    ]
  },
  {
    icon: Boxes,
    title: "Supply Chain Integration",
    description:
      "Seamless integration with suppliers and wholesalers for efficient ordering.",
    benefits: [
      "Automated ordering",
      "Supplier management",
      "Price comparisons",
      "Order tracking"
    ]
  }
];

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    description:
      "Automate routine tasks and focus on what matters most - your customers.",
  },
  {
    icon: ShieldCheck,
    title: "Reduce Errors",
    description:
      "Built-in validation and automated calculations minimize human error.",
  },
  {
    icon: LineChart,
    title: "Grow Revenue",
    description:
      "Identify sales trends and optimize your inventory for maximum profitability.",
  },
  {
    icon: Users,
    title: "Improve Service",
    description:
      "Provide faster, more accurate service with instant access to information.",
  },
];

const footerSections = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Updates", "Beta Program"]
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Partners"]
  },
  {
    title: "Resources",
    links: ["Blog", "Newsletter", "Documentation", "Support"]
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "Compliance"]
  }
];