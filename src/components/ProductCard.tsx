import React, { useState } from 'react';
import { Heart, Eye, Plus, Check } from 'lucide-react';
import { Product } from '../types/store';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist, setActiveProductModal, addToCart } = useStore();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, size, 1);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setQuickAddOpen(false);
    }, 900);
  };

  return (
    <div className="group relative flex flex-col bg-white border border-stone-200/80 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1">
      {/* Product Image Area (70% card presence) */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 cursor-pointer"
        onClick={() => setActiveProductModal(product)}
      >
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center bg-stone-100 text-stone-400">
            <span className="font-serif-display text-lg text-stone-700">{product.name}</span>
            <span className="text-xs uppercase tracking-wider text-stone-500 mt-2">{product.material}</span>
          </div>
        )}

        {/* Quiet status marker (Zero-pill rule: unboxed quiet text) */}
        <div className="absolute top-3 left-3 z-10">
          {product.isLimited && (
            <span className="text-[11px] tracking-widest uppercase font-medium bg-stone-900/90 text-white px-2 py-0.5 backdrop-blur-xs">
              Limited Batch
            </span>
          )}
          {!product.isLimited && product.isNew && (
            <span className="text-[11px] tracking-widest uppercase font-medium bg-white/90 text-stone-900 px-2 py-0.5 backdrop-blur-xs">
              Autumn 26
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-colors ${
            isFavorited
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-stone-950 backdrop-blur-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : 'stroke-[1.75]'}`} />
        </button>

        {/* Quick View Button (Desktop hover reveal) */}
        <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveProductModal(product);
            }}
            className="flex-1 py-2 px-3 bg-stone-950/85 hover:bg-stone-950 text-white text-xs font-medium tracking-wider uppercase backdrop-blur-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickAddOpen(!quickAddOpen);
            }}
            className="py-2 px-3 bg-white/90 hover:bg-white text-stone-900 text-xs font-medium tracking-wider uppercase backdrop-blur-xs transition-colors flex items-center justify-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Sizes</span>
          </button>
        </div>

        {/* Quick Size Flyout */}
        {quickAddOpen && (
          <div
            className="absolute inset-x-3 bottom-14 z-20 bg-stone-950 text-white p-3 shadow-xl border border-stone-800 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-stone-400 mb-2">
              <span>Select Size to Bag</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuickAddOpen(false);
                }}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  disabled={s.stock === 0}
                  onClick={(e) => handleQuickAdd(s.size, e)}
                  className={`py-1.5 text-xs font-mono tabular-nums text-center border transition-colors ${
                    s.stock === 0
                      ? 'border-stone-800 text-stone-600 line-through cursor-not-allowed'
                      : 'border-stone-700 hover:bg-stone-800 hover:border-stone-500 text-stone-200'
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
            {addedAnimation && (
              <div className="mt-2 text-[11px] text-emerald-400 flex items-center justify-center gap-1 font-medium">
                <Check className="w-3 h-3" />
                <span>Added to bag</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Content Details (Clean Typography & Zero-Pill) */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="uppercase tracking-widest text-[11px] font-medium text-stone-600">
              {product.category}
            </span>
            <span className="text-[11px] text-stone-600 font-mono">
              {product.origin.split(',')[0]}
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setActiveProductModal(product)}
            className="text-sm sm:text-base font-semibold text-stone-900 hover:text-stone-700 transition-colors mt-1.5 line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-1 mt-1">
            {product.material}
          </p>
        </div>

        {/* Color Swatches and Price Baseline */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          {/* Color preview swatches */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c);
                }}
                title={c.name}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === c.name
                    ? 'ring-1 ring-stone-900 ring-offset-1 border-stone-400'
                    : 'border-stone-300 hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>

          {/* Price with Tabular Numerals */}
          <div className="flex items-baseline gap-1.5">
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-sm sm:text-base font-semibold font-mono tabular-nums text-stone-900">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
