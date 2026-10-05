import React, { useState, useMemo } from 'react';
import { LayoutGrid, Grid3X3, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Category } from '../types/store';

export const ProductGrid: React.FC = () => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    sortOption,
    setSortOption,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [gridCols, setGridCols] = useState<'3' | '4'>('3');

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Silhouettes' },
    { id: 'tailoring', label: 'Tailoring' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'knitwear', label: 'Knitwear' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'denim', label: 'Selvedge Denim' }
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortOption === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, activeCategory, searchQuery, sortOption]);

  return (
    <section id="catalog-section" className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-stone-200 gap-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-stone-500 font-medium">
            Permanent Catalog
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-light text-stone-900 mt-1">
            {activeCategory === 'all'
              ? 'Complete Collection'
              : categories.find((c) => c.id === activeCategory)?.label || 'Collection'}
          </h2>
        </div>

        {/* Interactive Segmented Category Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-950 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Utility Bar (Item count, Sort selector, Grid View Switcher) */}
      <div className="flex flex-wrap items-center justify-between py-5 border-b border-stone-100 gap-4 text-xs text-stone-600">
        <div className="flex items-center gap-3">
          <span className="font-mono tabular-nums text-stone-900 font-medium">
            {filteredProducts.length}
          </span>
          <span>{filteredProducts.length === 1 ? 'Garment found' : 'Garments cataloged'}</span>
          {searchQuery && (
            <span className="text-stone-400">
              for query &ldquo;{searchQuery}&rdquo;{' '}
              <button
                onClick={() => setSearchQuery('')}
                className="text-stone-900 underline hover:text-stone-600 ml-1"
              >
                Clear
              </button>
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline text-stone-400">Sort by:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-transparent border border-stone-200 py-1.5 px-2.5 text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-500 cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Client Evaluation</option>
            </select>
          </div>

          {/* Desktop Column View Toggle */}
          <div className="hidden lg:flex items-center border border-stone-200">
            <button
              onClick={() => setGridCols('3')}
              aria-label="3 columns view"
              className={`p-1.5 transition-colors ${
                gridCols === '3' ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols('4')}
              aria-label="4 columns view"
              className={`p-1.5 transition-colors ${
                gridCols === '4' ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product List Grid */}
      {filteredProducts.length > 0 ? (
        <div
          className={`grid gap-6 sm:gap-8 pt-8 ${
            gridCols === '3'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Clean Empty State */
        <div className="py-24 text-center max-w-md mx-auto">
          <SlidersHorizontal className="w-8 h-8 text-stone-300 mx-auto stroke-[1.5]" />
          <h3 className="mt-4 text-base font-medium text-stone-900">No silhouettes found</h3>
          <p className="mt-1.5 text-xs text-stone-500">
            Try adjusting your search criteria or resetting the category filter.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-5 px-5 py-2.5 bg-stone-900 text-white text-xs font-medium uppercase tracking-wider hover:bg-stone-800 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};
