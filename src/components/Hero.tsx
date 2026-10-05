import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { HERO_CAMPAIGN_IMAGE } from '../data/products';

export const Hero: React.FC = () => {
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToManifesto = () => {
    const el = document.getElementById('manifesto-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full border-b border-stone-200 overflow-hidden bg-stone-900 text-stone-100">
      {/* Editorial Split Hero */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[640px]">
        {/* Left Column: Editorial Campaign Typography */}
        <div className="lg:col-span-6 flex flex-col justify-between p-8 sm:p-12 lg:p-16 xl:p-20 z-10">
          <div className="space-y-6 max-w-xl">
            {/* Clean unboxed kicker with typographic separator */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 font-medium">
              <span>Collection 08</span>
              <span aria-hidden="true">·</span>
              <span>Autumn / Winter 2026</span>
              <span aria-hidden="true">·</span>
              <span>Milan & Paris</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-light tracking-tight leading-[1.08] text-white [text-wrap:balance]">
              Architectural Tailoring &amp; Tactile Fibers.
            </h1>

            <p className="text-base text-stone-300 font-normal leading-relaxed max-w-lg">
              Sculptural silhouettes carved from untamed natural wool, unbleached silk, and shuttle-loomed selvedge denim. Designed in Paris, crafted in Biella and Okayama.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToCatalog}
                className="px-6 py-3.5 bg-stone-100 text-stone-950 font-medium text-xs tracking-wider uppercase hover:bg-white hover:shadow-lg transition-all flex items-center gap-2.5 group"
              >
                <span>Explore The Collection</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={scrollToManifesto}
                className="px-6 py-3.5 border border-stone-700 text-stone-300 font-medium text-xs tracking-wider uppercase hover:text-white hover:border-stone-400 transition-colors"
              >
                The Atelier Manifesto
              </button>
            </div>
          </div>

          {/* Adjacent Craftsmanship Proof Strip */}
          <div className="pt-10 mt-10 border-t border-stone-800 grid grid-cols-3 gap-4 text-left">
            <div>
              <p className="text-xs text-stone-400">Virgin Merino</p>
              <p className="text-sm font-semibold font-mono tabular-nums text-stone-100 mt-0.5">420 GSM</p>
            </div>
            <div>
              <p className="text-xs text-stone-400">Loom Precision</p>
              <p className="text-sm font-semibold font-mono tabular-nums text-stone-100 mt-0.5">1960s Toyoda</p>
            </div>
            <div>
              <p className="text-xs text-stone-400">Delivery</p>
              <p className="text-sm font-semibold font-mono tabular-nums text-stone-100 mt-0.5">48h Express</p>
            </div>
          </div>
        </div>

        {/* Right Column: Generated High-Fidelity Campaign Photography */}
        <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full bg-stone-950">
          <img
            src={HERO_CAMPAIGN_IMAGE}
            alt="ATELIER MØDE Autumn Winter 2026 Editorial Campaign with tailored wool coats"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Subtle measured contrast gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-stone-900/60 lg:to-transparent" />
          
          <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 text-right bg-stone-950/70 backdrop-blur-sm px-4 py-2 border border-stone-800 text-[11px] text-stone-300 tracking-wider uppercase">
            <span>Look 01 / Double-Breasted Wool &amp; Trench</span>
          </div>
        </div>
      </div>

      {/* Trust & Transparency Banner (Direct adjacency to claims) */}
      <div className="border-t border-stone-800 bg-stone-950 text-stone-300 py-3.5 px-6 lg:px-12 text-xs">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-stone-400 stroke-[1.5]" />
            <span>Complimentary worldwide express shipping over $250</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-stone-400 stroke-[1.5]" />
            <span>30-day complimentary door-to-door returns &amp; size exchanges</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-stone-400 stroke-[1.5]" />
            <span>Single-origin transparent fiber traceability</span>
          </div>
        </div>
      </div>
    </section>
  );
};
