import React from 'react';
import { Shield, Sparkles, Feather, Compass } from 'lucide-react';

export const CraftManifesto: React.FC = () => {
  return (
    <section id="manifesto-section" className="bg-stone-900 text-stone-100 py-20 lg:py-28 border-t border-stone-800">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 font-medium">
            <span>Material Provenance</span>
            <span aria-hidden="true">·</span>
            <span>Zero Synthetic Blends</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-light text-white leading-tight [text-wrap:balance]">
            Constructed For Permanence, Not Planned Obsolescence.
          </h2>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Every garment in our catalog begins with single-origin regenerative agriculture. We reject microplastics, chemical water repellents, and fast-fashion seasonal turnover in favor of generational textiles.
          </p>
        </div>

        {/* 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-16 border-b border-stone-800">
          <div className="space-y-4">
            <div className="w-10 h-10 border border-stone-700 flex items-center justify-center text-stone-300">
              <Feather className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-serif-display text-white">
              Heritage Shuttle Looms
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Our raw denim is woven on vintage low-tension Toyoda G9 shuttle looms in Kojima, Japan. The slow mechanical shuttle produces irregular organic slubs that mold uniquely to your body contours.
            </p>
            <div className="text-xs font-mono text-stone-300 pt-2 border-t border-stone-800">
              0.8m / hour weaving speed
            </div>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 border border-stone-700 flex items-center justify-center text-stone-300">
              <Compass className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-serif-display text-white">
              Biella Wool Weavers
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Our tailoring uses virgin merino wool sheared from certified non-mulesed Tasmanian flocks, washed in Alpine spring meltwater in Piedmont, Italy to retain natural lanolin softness.
            </p>
            <div className="text-xs font-mono text-stone-300 pt-2 border-t border-stone-800">
              Super 130s &amp; 420 GSM pure wool
            </div>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 border border-stone-700 flex items-center justify-center text-stone-300">
              <Shield className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-serif-display text-white">
              Lifetime Care &amp; Repair
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Every garment includes complimentary repair services for seams, buttons, and tears within 24 months. We provide extra horn buttons, silk thread skeins, and fabric swatches with every order.
            </p>
            <div className="text-xs font-mono text-stone-300 pt-2 border-t border-stone-800">
              Zero landfill circular commitment
            </div>
          </div>
        </div>

        {/* Attributable Client Testimonials */}
        <div className="pt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="border-l-2 border-stone-700 pl-6 space-y-3">
            <p className="text-base sm:text-lg font-serif-display text-stone-200 italic leading-snug">
              &ldquo;The architectural drape of the double-breasted blazer is extraordinary. The shoulder construction holds its line cleanly whether paired with raw denim or pleated trousers.&rdquo;
            </p>
            <div className="text-xs text-stone-400">
              <strong className="text-white">Elena V.</strong> · Senior Partner, Foster &amp; Partners · Zurich
            </div>
          </div>

          <div className="border-l-2 border-stone-700 pl-6 space-y-3">
            <p className="text-base sm:text-lg font-serif-display text-stone-200 italic leading-snug">
              &ldquo;The selvedge denim is heavyweight without feeling rigid. After four months of daily wear, the rope-dyed fades along the pockets and honeycomb creases are museum-grade.&rdquo;
            </p>
            <div className="text-xs text-stone-400">
              <strong className="text-white">Marcus T.</strong> · Industrial Design Director · London
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
