import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartTotal,
    discountAmount,
    shippingFee,
    freeShippingRemaining,
    FREE_SHIPPING_THRESHOLD,
    applyPromoCode,
    appliedPromo,
    removePromoCode,
    promoError,
    setIsCheckoutOpen
  } = useStore();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    applyPromoCode(inputCode);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const shippingProgress = Math.min(
    100,
    Math.round(((FREE_SHIPPING_THRESHOLD - freeShippingRemaining) / FREE_SHIPPING_THRESHOLD) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FAFAF9] text-stone-900 shadow-2xl flex flex-col h-full border-l border-stone-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-stone-800" />
            <h2 className="text-base font-serif-display font-medium text-stone-900 tracking-wide uppercase">
              Shopping Bag ({cart.length})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close bag drawer"
            className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-stone-100 px-6 py-3 border-b border-stone-200 text-xs">
          {freeShippingRemaining > 0 ? (
            <div>
              <div className="flex items-center justify-between text-stone-600 mb-1.5">
                <span>Add <strong className="font-mono tabular-nums text-stone-900">${freeShippingRemaining}</strong> more for complimentary delivery</span>
                <span className="font-mono text-stone-500">{shippingProgress}%</span>
              </div>
              <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-stone-900 h-full transition-all duration-300"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-stone-900 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Complimentary worldwide express delivery unlocked</span>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-white border border-stone-200/80 shadow-xs"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 bg-stone-100 shrink-0 overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-rose-600 p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-1">
                      <span>Size: <strong className="font-mono text-stone-800">{item.selectedSize}</strong></span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-stone-300 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-stone-200 bg-stone-50 text-xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 hover:text-stone-900"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-mono tabular-nums font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 hover:text-stone-900"
                      >
                        +
                      </button>
                    </div>

                    {/* Total Price for item */}
                    <span className="text-xs font-semibold font-mono tabular-nums text-stone-900">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-stone-400">
              <ShoppingBag className="w-10 h-10 stroke-[1.2] text-stone-300 mb-3" />
              <p className="text-sm font-medium text-stone-800">Your shopping bag is empty</p>
              <p className="text-xs text-stone-500 mt-1 max-w-[240px]">
                Explore our Autumn / Winter collection and select your preferred tailored silhouettes.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-5 py-2.5 bg-stone-900 text-white text-xs font-medium uppercase tracking-wider hover:bg-stone-800 transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer with Calculations & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-stone-200 bg-white space-y-4">
            {/* Promo Code Input */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-stone-100 px-3 py-2 text-xs">
                  <div className="flex items-center gap-2 text-stone-800">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <span>
                      Promo applied: <strong>{appliedPromo}</strong>
                    </span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-stone-500 hover:text-stone-900 text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. ATELIER10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 bg-stone-50 border border-stone-200 px-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-stone-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-medium uppercase tracking-wider"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>
              )}
            </div>

            {/* Financial Breakdown (Tabular Numerals) */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-1 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900">${cartSubtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Special Promotion</span>
                  <span className="font-mono tabular-nums">-${discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-mono tabular-nums text-stone-900">
                  {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-semibold text-stone-950 pt-2 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="font-mono tabular-nums text-base">${cartTotal}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              <span>Proceed To Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
              <span>Encrypted 256-bit SSL transaction &amp; fraud verification</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
