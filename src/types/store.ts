export type Category = 'all' | 'outerwear' | 'tailoring' | 'knitwear' | 'dresses' | 'denim';

export interface ColorOption {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface SizeOption {
  size: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'outerwear' | 'tailoring' | 'knitwear' | 'dresses' | 'denim';
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  material: string;
  origin: string;
  description: string;
  details: string[];
  care: string;
  colors: ColorOption[];
  sizes: SizeOption[];
  isNew?: boolean;
  isLimited?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ColorOption;
  selectedSize: string;
  quantity: number;
}

export interface OrderCustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'apple_pay' | 'cod';
}

export interface PlacedOrder {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: OrderCustomerInfo;
}
