import React from 'react';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    setActiveProductModal
  } = useStore();

  if (!isWishlistOpen) return null;

  const favoritedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleOpenProduct = (product: any) => {
    setActiveProductModal(product);
    setIsWishlistOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={() => setIsWishlistOpen(false)}
    >
      <div
        className="w-full max-w-md bg-[#FAFAF9] text-stone-900 shadow-2xl flex flex-col h-full border-l border-stone-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
            <h2 className="text-base font-serif-display font-medium text-stone-900 tracking-wide uppercase">
              Curated Wishlist ({favoritedProducts.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
            className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {favoritedProducts.length > 0 ? (
            favoritedProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-3 bg-white border border-stone-200/80 shadow-xs"
              >
                <div
                  className="w-20 h-26 bg-stone-100 shrink-0 overflow-hidden cursor-pointer"
                  onClick={() => handleOpenProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4
                        onClick={() => handleOpenProduct(product)}
                        className="text-xs font-semibold text-stone-900 hover:text-stone-700 cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-stone-400 hover:text-rose-600 p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {product.material.split('(')[0]}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold font-mono tabular-nums text-stone-900">
                      ${product.price}
                    </span>

                    <button
                      onClick={() => handleOpenProduct(product)}
                      className="px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white text-[11px] uppercase tracking-wider font-medium flex items-center gap-1"
                    >
                      <span>Select Size</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-stone-400">
              <Heart className="w-10 h-10 stroke-[1.2] text-stone-300 mb-3" />
              <p className="text-sm font-medium text-stone-800">Your wishlist is empty</p>
              <p className="text-xs text-stone-500 mt-1 max-w-[240px]">
                Click the heart icon on any silhouette to reserve it for later consideration.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="mt-6 px-5 py-2.5 bg-stone-900 text-white text-xs font-medium uppercase tracking-wider hover:bg-stone-800 transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
