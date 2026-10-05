import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Category } from '../types/store';

export const Header: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    setIsSearchOpen,
    setIsWishlistOpen,
    setIsCartOpen,
    cartCount,
    wishlist
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; cat: Category }[] = [
    { label: 'All Pieces', cat: 'all' },
    { label: 'Outerwear', cat: 'outerwear' },
    { label: 'Tailoring', cat: 'tailoring' },
    { label: 'Knitwear', cat: 'knitwear' },
    { label: 'Dresses', cat: 'dresses' },
    { label: 'Denim', cat: 'denim' }
  ];

  const handleNavClick = (cat: Category) => {
    setActiveCategory(cat);
    setMobileMenuOpen(false);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Slim Promotional Bar - Max 1 dismissible bar, under 40px */}
      {showAnnouncement && (
        <div className="bg-[#1C1917] text-[#E7E5E4] text-[12px] py-1.5 px-4 tracking-wider flex items-center justify-between border-b border-stone-800">
          <div className="mx-auto flex items-center gap-2">
            <span>Complimentary Global Express Delivery on orders over $250</span>
            <span className="hidden sm:inline text-stone-500">·</span>
            <span className="hidden sm:inline text-stone-300 font-medium">Use code ATELIER10 for 10% off</span>
          </div>
          <button
            onClick={() => setShowAnnouncement(false)}
            aria-label="Dismiss promotional banner"
            className="text-stone-400 hover:text-white text-xs px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Strict Top Bar Contract: Brand Zone — 4-6 Clean Nav Links — Primary Actions */}
      <header
        className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
          isScrolled
            ? 'bg-[#FAFAF9]/95 backdrop-blur-md border-stone-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)]'
            : 'bg-[#FAFAF9] border-stone-200'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-18 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-stone-700 hover:text-stone-900 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xl font-serif-display font-bold tracking-tight text-stone-900 hover:opacity-85 transition-opacity whitespace-nowrap"
            >
              ATELIER MØDE
            </a>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-wide uppercase font-medium text-stone-600">
            {navItems.map((item) => {
              const isActive = activeCategory === item.cat;
              return (
                <button
                  key={item.cat}
                  onClick={() => handleNavClick(item.cat)}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive ? 'text-stone-950 font-semibold' : 'hover:text-stone-950'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-900" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3 md:gap-5">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search clothing items"
              className="p-2 text-stone-700 hover:text-stone-950 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <Search className="w-4 h-4 stroke-[1.75]" />
              <span className="hidden md:inline">Search</span>
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="View saved pieces"
              className="p-2 text-stone-700 hover:text-stone-950 transition-colors relative flex items-center gap-1 text-xs font-medium"
            >
              <Heart className="w-4 h-4 stroke-[1.75]" />
              <span className="hidden md:inline">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="ml-0.5 text-[11px] font-mono tabular-nums text-stone-900 font-semibold">
                  ({wishlist.length})
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open shopping bag"
              className="px-3.5 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
              <span>Bag</span>
              <span className="font-mono tabular-nums text-[12px] bg-stone-800 text-stone-200 px-1.5 py-0.2 rounded-xs">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-[#FAFAF9] px-6 py-6 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col gap-4 text-sm font-medium tracking-wide">
              {navItems.map((item) => (
                <button
                  key={item.cat}
                  onClick={() => handleNavClick(item.cat)}
                  className={`flex items-center justify-between text-left py-2 border-b border-stone-100 ${
                    activeCategory === item.cat ? 'text-stone-950 font-semibold' : 'text-stone-600'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </button>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col gap-2 text-xs text-stone-500">
              <p>Store Flagship: 14 Rue de Charonne, Paris</p>
              <p>Client Concierge: assistance@ateliermode.com</p>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
