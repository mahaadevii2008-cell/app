import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [activeCategory, setActiveCategory] = useState<'tailoring' | 'bottoms' | 'knits'>('tailoring');

  if (!isSizeGuideOpen) return null;

  const tailoringDataIn = [
    { size: 'XS', chest: '36.0', shoulder: '17.2', sleeve: '32.5', length: '29.5' },
    { size: 'S', chest: '38.0', shoulder: '17.8', sleeve: '33.5', length: '30.0' },
    { size: 'M', chest: '40.0', shoulder: '18.5', sleeve: '34.5', length: '30.5' },
    { size: 'L', chest: '42.5', shoulder: '19.2', sleeve: '35.5', length: '31.0' },
    { size: 'XL', chest: '45.0', shoulder: '20.0', sleeve: '36.0', length: '31.5' },
  ];

  const bottomsDataIn = [
    { size: '28', waist: '29.5', hip: '38.0', thigh: '24.0', inseam: '32.0' },
    { size: '30', waist: '31.5', hip: '40.0', thigh: '25.0', inseam: '32.5' },
    { size: '32', waist: '33.5', hip: '42.0', thigh: '26.0', inseam: '33.0' },
    { size: '34', waist: '35.5', hip: '44.0', thigh: '27.0', inseam: '33.5' },
    { size: '36', waist: '37.5', hip: '46.0', thigh: '28.0', inseam: '34.0' },
  ];

  const convert = (valStr: string) => {
    if (unit === 'in') return valStr;
    const val = parseFloat(valStr);
    return (val * 2.54).toFixed(1);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={() => setIsSizeGuideOpen(false)}
    >
      <div
        className="relative bg-white w-full max-w-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-stone-700 stroke-[1.75]" />
            <div>
              <h3 className="text-base font-serif-display font-medium text-stone-900 tracking-wide">
                Garment Measurement Specification
              </h3>
              <p className="text-xs text-stone-500">
                Precision tolerances calibrated to European tailoring standards.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            aria-label="Close size guide"
            className="p-1.5 text-stone-400 hover:text-stone-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Controls: Category Selector & Unit Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-1 bg-stone-100 p-1">
              <button
                onClick={() => setActiveCategory('tailoring')}
                className={`px-3 py-1 text-xs font-medium uppercase tracking-wider transition-colors ${
                  activeCategory === 'tailoring' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                Tailoring &amp; Outerwear
              </button>
              <button
                onClick={() => setActiveCategory('bottoms')}
                className={`px-3 py-1 text-xs font-medium uppercase tracking-wider transition-colors ${
                  activeCategory === 'bottoms' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                Trousers &amp; Denim
              </button>
            </div>

            {/* Units Toggle */}
            <div className="flex items-center gap-1 border border-stone-200 p-0.5 text-xs font-mono">
              <button
                onClick={() => setUnit('in')}
                className={`px-2.5 py-1 ${unit === 'in' ? 'bg-stone-900 text-white' : 'text-stone-600'}`}
              >
                IN
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 ${unit === 'cm' ? 'bg-stone-900 text-white' : 'text-stone-600'}`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Measurements Table (Strict Tabular Numerals) */}
          <div className="border border-stone-200 overflow-x-auto">
            {activeCategory === 'tailoring' ? (
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase tracking-wider font-medium">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold text-stone-900">Size</th>
                    <th className="py-2.5 px-4 font-medium">Chest ({unit})</th>
                    <th className="py-2.5 px-4 font-medium">Shoulder ({unit})</th>
                    <th className="py-2.5 px-4 font-medium">Sleeve ({unit})</th>
                    <th className="py-2.5 px-4 font-medium">Back Length ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono tabular-nums text-stone-800">
                  {tailoringDataIn.map((row) => (
                    <tr key={row.size} className="hover:bg-stone-50/60">
                      <td className="py-2.5 px-4 font-semibold text-stone-950">{row.size}</td>
                      <td className="py-2.5 px-4">{convert(row.chest)}</td>
                      <td className="py-2.5 px-4">{convert(row.shoulder)}</td>
                      <td className="py-2.5 px-4">{convert(row.sleeve)}</td>
                      <td className="py-2.5 px-4">{convert(row.length)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase tracking-wider font-medium">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold text-stone-900">Waist Size</th>
                    <th className="py-2.5 px-4 font-medium">True Waist ({unit})</th>
                    <th className="py-2.5 px-4 font-medium">Hip ({unit})</th>
                    <th className="py-2.5 px-4 font-medium">Thigh ({unit})</th>
                    <th className="py-2.5 px-4 font-medium">Inseam ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono tabular-nums text-stone-800">
                  {bottomsDataIn.map((row) => (
                    <tr key={row.size} className="hover:bg-stone-50/60">
                      <td className="py-2.5 px-4 font-semibold text-stone-950">{row.size}</td>
                      <td className="py-2.5 px-4">{convert(row.waist)}</td>
                      <td className="py-2.5 px-4">{convert(row.hip)}</td>
                      <td className="py-2.5 px-4">{convert(row.thigh)}</td>
                      <td className="py-2.5 px-4">{convert(row.inseam)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Measuring Guidance */}
          <div className="bg-stone-50 p-4 border border-stone-200 text-xs text-stone-600 space-y-1.5">
            <div className="font-semibold text-stone-900">Fitting Guidance:</div>
            <p>
              Our tailoring silhouettes are engineered with a relaxed architectural drape. If you prefer a tailored, slim fit through the torso, we recommend sizing down one size.
            </p>
            <p className="text-[11px] text-stone-500">
              Need personal concierge fit consultation? Email concierge@ateliermode.com with your height and chest measurements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
