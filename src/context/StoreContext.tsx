import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ColorOption, Category, PlacedOrder, OrderCustomerInfo } from '../types/store';
import { PRODUCTS } from '../data/products';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  sortOption: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  setSortOption: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeProductModal: Product | null;
  setActiveProductModal: (prod: Product | null) => void;
  promoCode: string;
  appliedPromo: string | null;
  promoError: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  discountPercent: number;
  addToCart: (product: Product, color: ColorOption, size: string, quantity?: number) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartSubtotal: number;
  cartCount: number;
  discountAmount: number;
  shippingFee: number;
  cartTotal: number;
  freeShippingRemaining: number;
  FREE_SHIPPING_THRESHOLD: number;
  orders: PlacedOrder[];
  lastPlacedOrder: PlacedOrder | null;
  placeOrder: (customer: OrderCustomerInfo) => PlacedOrder;
  clearLastOrder: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 250;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed saving cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed saving wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed saving orders to localStorage', e);
    }
  }, [orders]);

  const addToCart = (product: Product, color: ColorOption, size: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.name === color.name && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${color.name}-${size}-${Date.now()}`,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'ATELIER10' || cleanCode === 'WELCOME10') {
      setAppliedPromo(cleanCode);
      setPromoError(null);
      return true;
    } else if (cleanCode === 'VERVE15' || cleanCode === 'ARCHITECT15') {
      setAppliedPromo(cleanCode);
      setPromoError(null);
      return true;
    } else {
      setPromoError('Invalid code. Try "ATELIER10" for 10% off your order.');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError(null);
    setPromoCode('');
  };

  const discountPercent = appliedPromo === 'ARCHITECT15' || appliedPromo === 'VERVE15' ? 15 : appliedPromo ? 10 : 0;

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 25;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const placeOrder = (customer: OrderCustomerInfo): PlacedOrder => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: PlacedOrder = {
      orderNumber: `AM-${new Date().getFullYear()}-${randomSuffix}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: customer.shippingMethod === 'express' ? shippingFee + 20 : shippingFee,
      total: cartTotal + (customer.shippingMethod === 'express' ? 20 : 0),
      customer
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    setCart([]);
    setAppliedPromo(null);
    setIsCartOpen(false);
    return newOrder;
  };

  const clearLastOrder = () => {
    setLastPlacedOrder(null);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        activeCategory,
        setActiveCategory,
        sortOption,
        setSortOption,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeProductModal,
        setActiveProductModal,
        promoCode,
        appliedPromo,
        promoError,
        applyPromoCode,
        removePromoCode,
        discountPercent,
        addToCart,
        updateQuantity,
        removeFromCart,
        toggleWishlist,
        isInWishlist,
        cartSubtotal,
        cartCount,
        discountAmount,
        shippingFee,
        cartTotal,
        freeShippingRemaining,
        FREE_SHIPPING_THRESHOLD,
        orders,
        lastPlacedOrder,
        placeOrder,
        clearLastOrder
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
