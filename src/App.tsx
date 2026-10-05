/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { CraftManifesto } from './components/CraftManifesto';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#1C1917] font-body selection:bg-stone-900 selection:text-white">
        {/* Top Bar Contract compliant Navigation */}
        <Header />

        {/* Main Content Sections: 1. Hero -> 2. Featured Catalog -> 3. Story / Craftsmanship */}
        <main className="flex-1">
          <Hero />
          <ProductGrid />
          <CraftManifesto />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals and Drawers */}
        <ProductModal />
        <CartDrawer />
        <CheckoutModal />
        <WishlistDrawer />
        <SearchModal />
        <SizeGuideModal />
      </div>
    </StoreProvider>
  );
}
