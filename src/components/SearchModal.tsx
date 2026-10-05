import React, { useRef, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    products,
    setActiveProductModal
  } = useStore();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const quickTerms = ['Merino Wool', 'Selvedge Denim', 'Cashmere', 'Trench', 'Silk Dress', 'Blazer'];

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.origin.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectProduct = (product: any) => {
    setActiveProductModal(product);
    setIsSearchOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-200"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 stroke-[1.75]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search silhouettes, materials, or provenance..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-sm sm:text-base font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none bg-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-stone-400 hover:text-stone-900"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="p-1 text-stone-400 hover:text-stone-900 ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular searches suggestions */}
        <div className="p-4 sm:p-6 bg-stone-50 border-b border-stone-100">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 mb-2">
            Suggested Searches
          </div>
          <div className="flex flex-wrap gap-2">
            {quickTerms.map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-3 py-1 bg-white border border-stone-200 hover:border-stone-400 text-xs text-stone-700 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Results */}
        <div className="max-h-[380px] overflow-y-auto p-4 sm:p-6 divide-y divide-stone-100">
          {searchQuery.trim() ? (
            searchResults.length > 0 ? (
              <div className="space-y-3">
                <div className="text-xs text-stone-500 mb-2">
                  Found <span className="font-mono tabular-nums text-stone-900 font-medium">{searchResults.length}</span> results for &ldquo;{searchQuery}&rdquo;
                </div>
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="flex items-center gap-4 p-2.5 hover:bg-stone-50 cursor-pointer transition-colors group"
                  >
                    <div className="w-14 h-18 bg-stone-100 shrink-0 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-stone-500">
                        <span className="uppercase tracking-wider font-medium">{product.category}</span>
                        <span>·</span>
                        <span>{product.origin.split(',')[0]}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-stone-700 truncate mt-0.5">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate">{product.material}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono tabular-nums font-semibold text-xs sm:text-sm text-stone-900">
                        ${product.price}
                      </div>
                      <span className="text-[11px] text-stone-400 group-hover:text-stone-900 transition-colors flex items-center justify-end gap-1 mt-1">
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-stone-500">
                No items matched &ldquo;{searchQuery}&rdquo;. Try another material or category.
              </div>
            )
          ) : (
            <div className="py-6 text-center text-xs text-stone-400">
              Type above to search through our tailoring, outerwear, knitwear, and denim collections.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
