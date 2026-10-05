import React, { useState } from 'react';
import { X, Heart, Shield, Check, Ruler, Truck, RotateCcw, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ColorOption } from '../types/store';

export const ProductModal: React.FC = () => {
  const {
    activeProductModal,
    setActiveProductModal,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setIsSizeGuideOpen,
    setIsCartOpen
  } = useStore();

  const product = activeProductModal;

  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(
    product ? product.colors[0] : null
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product ? product.sizes.find((s) => s.stock > 0)?.size || product.sizes[0].size : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'origin' | 'care'>('details');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const currentColor = selectedColor || product.colors[0];
  const isWishlisted = isInWishlist(product.id);
  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize);
  const isOutOfStock = currentSizeObj?.stock === 0;

  const handleAddToCart = (openBag = true) => {
    if (isOutOfStock) return;
    addToCart(product, currentColor, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
    if (!openBag) {
      setActiveProductModal(null);
    }
  };

  const handleInstantCheckout = () => {
    handleAddToCart(false);
    setIsCartOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
      onClick={() => setActiveProductModal(null)}
    >
      <div
        className="relative bg-white w-full max-w-5xl shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveProductModal(null)}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-950 bg-white/80 backdrop-blur-xs rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 2-Column Split: Visual Gallery Left, Contiguous Purchase Module Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          {/* Visual Gallery Column */}
          <div className="md:col-span-6 bg-stone-100 relative overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-[3/4] md:h-full w-full">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                {product.isLimited && (
                  <span className="text-[11px] uppercase tracking-widest bg-stone-900 text-white px-2.5 py-1 font-medium">
                    Limited Run
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="text-[11px] uppercase tracking-widest bg-white text-stone-900 px-2.5 py-1 font-medium border border-stone-200">
                    Flagship Silhouette
                  </span>
                )}
              </div>
            </div>

            {/* Quick Caption / Origin Badge */}
            <div className="hidden md:flex items-center justify-between p-4 bg-stone-50 border-t border-stone-200 text-xs text-stone-500">
              <span>Origin: {product.origin}</span>
              <span className="font-mono">{product.material.split('(')[0]}</span>
            </div>
          </div>

          {/* Contiguous Purchase Module Column */}
          <div className="md:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
            <div className="space-y-6">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="uppercase tracking-widest font-medium text-stone-700">
                  {product.category} · Ref. {product.id}
                </span>
                <div className="flex items-center gap-1 text-stone-800">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="font-mono tabular-nums font-semibold">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewCount} client evaluations)</span>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif-display font-light text-stone-900 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-xl sm:text-2xl font-mono tabular-nums font-semibold text-stone-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono tabular-nums text-stone-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-emerald-700 font-medium">
                    Taxes &amp; Duties Included
                  </span>
                </div>
              </div>

              {/* Short Editorial Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Swatch Selector */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-stone-900">Color Palette:</span>
                  <span className="text-stone-500">{currentColor.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                        currentColor.name === color.name
                          ? 'ring-2 ring-stone-900 ring-offset-2 border-stone-400'
                          : 'border-stone-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {currentColor.name === color.name && (
                        <Check
                          className={`w-3.5 h-3.5 ${
                            color.hex === '#F5F5F4' || color.hex === '#FAF5EE' || color.hex === '#E7E5E4'
                              ? 'text-stone-900'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector with Size Guide Trigger */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-stone-900">
                    Size: <span className="font-mono text-stone-600">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-stone-600 hover:text-stone-900 underline flex items-center gap-1 font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Garment Measurements</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize === s.size;
                    const isSoldOut = s.stock === 0;
                    return (
                      <button
                        key={s.size}
                        disabled={isSoldOut}
                        onClick={() => setSelectedSize(s.size)}
                        className={`py-2 text-xs font-mono tabular-nums font-medium text-center border transition-all ${
                          isSoldOut
                            ? 'bg-stone-50 border-stone-200 text-stone-300 line-through cursor-not-allowed'
                            : isSelected
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white border-stone-300 text-stone-800 hover:border-stone-500'
                        }`}
                      >
                        {s.size}
                      </button>
                    );
                  })}
                </div>

                {/* Real-time low-stock indicator */}
                {currentSizeObj && currentSizeObj.stock > 0 && currentSizeObj.stock <= 3 && (
                  <p className="text-[11px] text-amber-800 mt-2 font-mono">
                    Low inventory: Only {currentSizeObj.stock} left in stock for immediate dispatch
                  </p>
                )}
                {isOutOfStock && (
                  <p className="text-[11px] text-rose-600 mt-2 font-mono">
                    Selected size is currently sold out in this batch.
                  </p>
                )}
              </div>

              {/* Quantity Counter & Primary Action Buttons */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-300 bg-white h-11 px-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="px-2 py-1 text-stone-600 hover:text-stone-950 disabled:text-stone-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-mono tabular-nums font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 py-1 text-stone-600 hover:text-stone-950"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag Primary CTA */}
                  <button
                    disabled={isOutOfStock}
                    onClick={() => handleAddToCart(true)}
                    className="flex-1 h-11 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white text-xs font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    {isOutOfStock ? (
                      'Sold Out'
                    ) : (
                      <>
                        <span>Add To Shopping Bag</span>
                        <span className="font-mono tabular-nums">· ${product.price * quantity}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Wishlist toggle"
                    className={`h-11 w-11 flex items-center justify-center border transition-colors ${
                      isWishlisted
                        ? 'border-rose-200 bg-rose-50 text-rose-600'
                        : 'border-stone-300 hover:border-stone-500 text-stone-700'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>

                {addedNotice && (
                  <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2 font-medium border border-emerald-200">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Garment successfully added to your shopping bag.</span>
                  </div>
                )}
              </div>

              {/* Tabbed Product Dossier: Details, Origin, Care */}
              <div className="pt-4 border-t border-stone-200">
                <div className="flex border-b border-stone-200 gap-6 text-xs uppercase tracking-wider font-medium text-stone-500 mb-3">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 transition-colors ${
                      activeTab === 'details' ? 'border-b-2 border-stone-900 text-stone-900 font-semibold' : 'hover:text-stone-900'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('origin')}
                    className={`pb-2 transition-colors ${
                      activeTab === 'origin' ? 'border-b-2 border-stone-900 text-stone-900 font-semibold' : 'hover:text-stone-900'
                    }`}
                  >
                    Provenance
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2 transition-colors ${
                      activeTab === 'care' ? 'border-b-2 border-stone-900 text-stone-900 font-semibold' : 'hover:text-stone-900'
                    }`}
                  >
                    Care &amp; Life
                  </button>
                </div>

                <div className="text-xs text-stone-600 min-h-[70px]">
                  {activeTab === 'details' && (
                    <ul className="space-y-1.5 list-disc list-inside">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'origin' && (
                    <div className="space-y-2">
                      <p>
                        <strong className="text-stone-900">Milled &amp; Tailored:</strong> {product.origin}
                      </p>
                      <p>
                        <strong className="text-stone-900">Primary Textile:</strong> {product.material}
                      </p>
                      <p className="text-stone-500">
                        Zero hazardous dyes used. Traceable to cooperative farms maintaining humane livestock and regenerative agricultural practices.
                      </p>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <div className="space-y-2">
                      <p className="leading-relaxed">{product.care}</p>
                      <p className="text-stone-500 italic">
                        Complimentary repair service included for all Atelier Møde pieces within 24 months of purchase.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-stone-700" />
                  <span>Dispatched from European Hub within 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-stone-700" />
                  <span>30-Day Complimentary Home Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
