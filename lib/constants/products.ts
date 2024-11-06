import { Product } from '@/types/pos';

export const PRODUCTS: Product[] = [
  {
    id: "oxy-500",
    name: "Oxycodone 5mg",
    price: 45.99,
    quantity: 100,
    category: "Pain Relief",
    description: "Schedule II controlled substance for pain management",
    sku: "OXY5MG",
    manufacturer: "PharmaCorp",
    schedule: "II",
    requiresPrescription: true,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "adderall-30",
    name: "Adderall 30mg",
    price: 89.99,
    quantity: 60,
    category: "Stimulants",
    description: "Schedule II controlled substance for ADHD treatment",
    sku: "ADD30MG",
    manufacturer: "MediPharm",
    schedule: "II",
    requiresPrescription: true,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "xanax-1",
    name: "Xanax 1mg",
    price: 35.99,
    quantity: 90,
    category: "Anxiety",
    description: "Schedule IV controlled substance for anxiety treatment",
    sku: "XAN1MG",
    manufacturer: "PharmaCorp",
    schedule: "IV",
    requiresPrescription: true,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "amoxicillin-500",
    name: "Amoxicillin 500mg",
    price: 15.99,
    quantity: 200,
    category: "Antibiotics",
    description: "Common antibiotic for bacterial infections",
    sku: "AMOX500",
    manufacturer: "MediPharm",
    requiresPrescription: true,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&auto=format&fit=crop&q=60"
  }
];