import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderCustomerInfo } from '../types/store';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    placeOrder,
    lastPlacedOrder,
    clearLastOrder
  } = useStore();

  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<OrderCustomerInfo>({
    fullName: 'Charlotte Laurent',
    email: 'charlotte.laurent@studio.com',
    phone: '+33 6 42 89 12 04',
    address: '28 Boulevard Saint-Germain',
    city: 'Paris',
    postalCode: '75005',
    country: 'France',
    shippingMethod: 'standard',
    paymentMethod: 'card'
  });

  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 4242',
    expiry: '11/28',
    cvc: '891',
    name: 'Charlotte Laurent'
  });

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleFinalOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(formData);
      setIsSubmitting(false);
    }, 800);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    clearLastOrder();
    setStep('shipping');
  };

  const finalTotal =
    cartTotal + (formData.shippingMethod === 'express' ? 20 : 0);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative bg-white w-full max-w-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-stone-500 font-medium">
              Atelier Møde Direct Dispatch
            </span>
            <h2 className="text-xl font-serif-display font-medium text-stone-900">
              {lastPlacedOrder ? 'Order Confirmation' : 'Secure Order Checkout'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close checkout"
            className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed Receipt View */}
        {lastPlacedOrder ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-8 h-8 stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-emerald-800 font-medium bg-emerald-50 px-3 py-1">
                Order Confirmed — Preparing Shipment
              </span>
              <h3 className="text-2xl font-serif-display font-light text-stone-900 pt-2">
                Thank you, {lastPlacedOrder.customer.fullName}
              </h3>
              <p className="text-xs text-stone-500 font-mono">
                Order Reference: <strong className="text-stone-900">{lastPlacedOrder.orderNumber}</strong>
              </p>
              <p className="text-xs text-stone-600 max-w-md mx-auto pt-1">
                A verification receipt and live tracking coordinates have been dispatched to{' '}
                <strong className="text-stone-900">{lastPlacedOrder.customer.email}</strong>.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-stone-50 border border-stone-200 p-6 text-left max-w-md mx-auto text-xs space-y-3">
              <div className="font-semibold text-stone-900 border-b border-stone-200 pb-2">
                Dispatch Summary
              </div>
              <div className="space-y-1.5 text-stone-600">
                {lastPlacedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.product.name} ({item.selectedSize}) x{item.quantity}
                    </span>
                    <span className="font-mono tabular-nums text-stone-900">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-stone-200 pt-2 space-y-1 text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${lastPlacedOrder.subtotal}</span>
                </div>
                {lastPlacedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-${lastPlacedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Service</span>
                  <span className="font-mono tabular-nums">
                    {lastPlacedOrder.shipping === 0 ? 'Complimentary' : `$${lastPlacedOrder.shipping}`}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-stone-900 pt-1 border-t border-stone-200 text-sm">
                  <span>Total Settled</span>
                  <span className="font-mono tabular-nums">${lastPlacedOrder.total}</span>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-stone-500">
                <strong>Shipping Address:</strong> {lastPlacedOrder.customer.address},{' '}
                {lastPlacedOrder.customer.city} {lastPlacedOrder.customer.postalCode},{' '}
                {lastPlacedOrder.customer.country}
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 bg-stone-900 text-white text-xs font-medium uppercase tracking-widest hover:bg-stone-800 transition-colors"
            >
              Return To Storefront
            </button>
          </div>
        ) : (
          /* Multi-step Checkout Form */
          <div className="p-6 sm:p-8">
            {step === 'shipping' ? (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-4 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-stone-700" />
                    <span>1. Shipping Destination &amp; Recipient</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full border border-stone-200 px-3 py-2 text-stone-900 focus:outline-none focus:border-stone-600"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Email For Dispatch Tracking</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-stone-200 px-3 py-2 text-stone-900 focus:outline-none focus:border-stone-600"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Contact Phone (For Courier)</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full border border-stone-200 px-3 py-2 text-stone-900 focus:outline-none focus:border-stone-600"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Country / Territory</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full border border-stone-200 px-3 py-2 text-stone-900 focus:outline-none focus:border-stone-600 bg-white"
                      >
                        <option value="France">France</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Germany">Germany</option>
                        <option value="Japan">Japan</option>
                        <option value="Italy">Italy</option>
                        <option value="Switzerland">Switzerland</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-stone-600 font-medium mb-1">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border border-stone-200 px-3 py-2 text-stone-900 focus:outline-none focus:border-stone-600"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 font-medium mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full border border-stone-200 px-3 py-2 text-stone-900 focus:outline-none focus:border-stone-600"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full border border-stone-200 px-3 py-2 text-stone-900 focus:outline-none focus:border-stone-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Method Selection */}
                <div className="pt-4 border-t border-stone-200">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3">
                    Courier Tier
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`p-3 border cursor-pointer transition-colors flex items-center justify-between text-xs ${
                        formData.shippingMethod === 'standard'
                          ? 'border-stone-900 bg-stone-50'
                          : 'border-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="standard"
                          checked={formData.shippingMethod === 'standard'}
                          onChange={() => setFormData({ ...formData, shippingMethod: 'standard' })}
                          className="accent-stone-900"
                        />
                        <div>
                          <div className="font-semibold text-stone-900">Standard White Glove</div>
                          <div className="text-stone-500 text-[11px]">3–5 business days</div>
                        </div>
                      </div>
                      <span className="font-mono tabular-nums font-medium text-stone-900">
                        {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                      </span>
                    </label>

                    <label
                      className={`p-3 border cursor-pointer transition-colors flex items-center justify-between text-xs ${
                        formData.shippingMethod === 'express'
                          ? 'border-stone-900 bg-stone-50'
                          : 'border-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="express"
                          checked={formData.shippingMethod === 'express'}
                          onChange={() => setFormData({ ...formData, shippingMethod: 'express' })}
                          className="accent-stone-900"
                        />
                        <div>
                          <div className="font-semibold text-stone-900">Priority Courier Express</div>
                          <div className="text-stone-500 text-[11px]">Next-day flight dispatch</div>
                        </div>
                      </div>
                      <span className="font-mono tabular-nums font-medium text-stone-900">
                        +${shippingFee + 20}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-stone-200">
                  <div className="text-xs text-stone-500">
                    Order Total: <strong className="font-mono tabular-nums text-sm text-stone-900">${finalTotal}</strong>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-stone-950 text-white text-xs font-medium uppercase tracking-widest hover:bg-stone-800 transition-colors"
                  >
                    Continue To Payment
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleFinalOrder} className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-stone-700" />
                      <span>2. Payment &amp; Settlement</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 underline"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Edit Shipping</span>
                    </button>
                  </div>

                  {/* Payment Methods */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className={`p-3 border text-xs font-medium transition-colors text-center ${
                        formData.paymentMethod === 'card'
                          ? 'border-stone-900 bg-stone-50 text-stone-900 font-semibold'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      Payment Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'apple_pay' })}
                      className={`p-3 border text-xs font-medium transition-colors text-center ${
                        formData.paymentMethod === 'apple_pay'
                          ? 'border-stone-900 bg-stone-50 text-stone-900 font-semibold'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      Digital Wallet
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className={`p-3 border text-xs font-medium transition-colors text-center ${
                        formData.paymentMethod === 'cod'
                          ? 'border-stone-900 bg-stone-50 text-stone-900 font-semibold'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      Pay on Delivery
                    </button>
                  </div>

                  {formData.paymentMethod === 'card' ? (
                    <div className="p-4 bg-stone-50 border border-stone-200 space-y-3 text-xs">
                      <div>
                        <label className="block text-stone-600 font-medium mb-1">Card Number</label>
                        <input
                          type="text"
                          required
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="w-full bg-white border border-stone-200 px-3 py-2 font-mono text-stone-900 focus:outline-none focus:border-stone-600"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-stone-600 font-medium mb-1">Expiry Date</label>
                          <input
                            type="text"
                            required
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="w-full bg-white border border-stone-200 px-3 py-2 font-mono text-stone-900 focus:outline-none focus:border-stone-600"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-600 font-medium mb-1">CVC Code</label>
                          <input
                            type="text"
                            required
                            value={cardDetails.cvc}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                            className="w-full bg-white border border-stone-200 px-3 py-2 font-mono text-stone-900 focus:outline-none focus:border-stone-600"
                          />
                        </div>
                      </div>
                    </div>
                  ) : formData.paymentMethod === 'apple_pay' ? (
                    <div className="p-6 bg-stone-50 border border-stone-200 text-center text-xs space-y-2">
                      <p className="text-stone-800 font-medium">Digital Wallet Express Auth</p>
                      <p className="text-stone-500 text-[11px]">
                        Biometric authentication will be initiated upon confirming this order.
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-stone-50 border border-stone-200 text-xs space-y-1">
                      <p className="text-stone-800 font-medium">Cash on Delivery / In-Store Settlement</p>
                      <p className="text-stone-500 text-[11px]">
                        Pay directly upon white-glove courier delivery or when collecting at our Paris flagship boutique.
                      </p>
                    </div>
                  )}
                </div>

                {/* Final Order Review & Submit */}
                <div className="pt-4 border-t border-stone-200 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-stone-500">Total Charged</span>
                    <span className="text-xl font-mono tabular-nums font-semibold text-stone-900">
                      ${finalTotal}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-stone-950 hover:bg-stone-800 disabled:bg-stone-400 text-white text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Authorizing Secure Transaction...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirm &amp; Place Order (${finalTotal})</span>
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-stone-400 text-center">
                    By confirming, you agree to our 30-day garment inspection and exchange policy.
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
