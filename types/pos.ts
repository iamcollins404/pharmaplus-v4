export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  sku: string;
  manufacturer: string;
  schedule?: 'II' | 'III' | 'IV' | 'V';
  requiresPrescription: boolean;
  image?: string;
}

export interface CartItem extends Product {
  cartQuantity: number;
}

export interface SaleTransaction {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  prescriptionId?: string;
  customerId?: string;
}