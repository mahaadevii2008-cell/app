import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setIsSizeGuideOpen, setActiveCategory } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-stone-800">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-xl font-serif-display font-bold tracking-tight text-white inline-block"
            >
              ATELIER MØDE
            </a>
            <p className="text-stone-400 leading-relaxed max-w-sm">
              Contemporary tailoring, unbleached silk, and shuttle-loomed selvedge denim. Dedicated to architectural proportions and sustainable generational craft.
            </p>
            <div className="text-[11px] text-stone-500 font-mono">
              FLAGSHIPS: PARIS · MILAN · TOKYO · NEW YORK
            </div>
          </div>

          {/* Catalog Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-widest text-stone-100 font-semibold">
              Collections
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('tailoring');
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Architectural Tailoring
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('outerwear');
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Heavy Outerwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('knitwear');
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Mongolian Cashmere
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('denim');
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Kojima Selvedge Denim
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('dresses');
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Raw Silk Dresses
                </button>
              </li>
            </ul>
          </div>

          {/* Client Assistance */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-widest text-stone-100 font-semibold">
              Client Service
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-white transition-colors underline"
                >
                  Garment Size Guide
                </button>
              </li>
              <li>
                <span className="text-stone-400">Door-to-Door Returns (30d)</span>
              </li>
              <li>
                <span className="text-stone-400">Complimentary 24m Repairs</span>
              </li>
              <li>
                <span className="text-stone-400">Track Direct Shipment</span>
              </li>
              <li>
                <span className="text-stone-400">concierge@ateliermode.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs uppercase tracking-widest text-stone-100 font-semibold">
              The Atelier Gazette
            </div>
            <p className="text-stone-400 leading-relaxed">
              Subscribers receive early access to limited textile runs, private showroom appointments, and quarterly material monographs.
            </p>

            {subscribed ? (
              <div className="p-3 bg-stone-900 border border-stone-800 text-stone-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You have been added to our private dispatch ledger.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email for private dispatches"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-stone-900 border border-stone-800 px-3.5 py-2 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-stone-500"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-4 py-2 bg-stone-100 hover:bg-white text-stone-950 text-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <div className="text-[11px] text-stone-500">
              No promotions or third-party marketing. Unsubscribe at any time.
            </div>
          </div>
        </div>

        {/* Bottom copyright & zero-slop clean footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-stone-500 text-[11px] gap-4">
          <div>
            &copy; {new Date().getFullYear()} ATELIER MØDE Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Terms of Procurement</span>
            <span>·</span>
            <span>Privacy Standard</span>
            <span>·</span>
            <span>Supply Chain Transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
