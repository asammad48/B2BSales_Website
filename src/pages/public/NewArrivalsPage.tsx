import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';

export function NewArrivalsPage() {
  // Mock data as requested (not linking an API)
  const mockNewArrivals = [
    {
      id: 'mock-1',
      name: 'iPhone 15 Pro Max OLED Screen Assembly',
      brandName: 'Apple',
      modelName: 'iPhone 15 Pro Max',
      qualityType: 'SERVICE_PACK',
      price: '289.99',
      currencyCode: '$',
      imageUrl: 'https://picsum.photos/seed/iphone15/800/800',
      shortDescription: 'Original Service Pack display with pre-installed proximity sensor and ear speaker.',
      canOrder: false, // Guest view
      isPriceLocked: true
    },
    {
      id: 'mock-2',
      name: 'Samsung S24 Ultra Dynamic AMOLED 2X',
      brandName: 'Samsung',
      modelName: 'Galaxy S24 Ultra',
      qualityType: 'SERVICE_PACK',
      price: '314.50',
      currencyCode: '$',
      imageUrl: 'https://picsum.photos/seed/s24/800/800',
      shortDescription: 'Factory original display assembly with frame and battery pre-installed.',
      canOrder: false,
      isPriceLocked: true
    },
    {
      id: 'mock-3',
      name: 'Google Pixel 8 Pro Display & Touch',
      brandName: 'Google',
      modelName: 'Pixel 8 Pro',
      qualityType: 'PREMIUM',
      price: '195.00',
      currencyCode: '$',
      imageUrl: 'https://picsum.photos/seed/pixel8/800/800',
      shortDescription: 'High-grade premium refurbished display with original IC for perfect touch response.',
      canOrder: false,
      isPriceLocked: true
    },
    {
      id: 'mock-4',
      name: 'Xiaomi 14 Pro Curved AMOLED Panel',
      brandName: 'Xiaomi',
      modelName: '14 Pro',
      qualityType: 'HQ',
      price: '145.00',
      currencyCode: '$',
      imageUrl: 'https://picsum.photos/seed/xiaomi14/800/800',
      shortDescription: 'High-quality replacement panel with 120Hz support and peak brightness matching original.',
      canOrder: false,
      isPriceLocked: true
    }
  ];

  return (
    <div className="space-y-16">
      <header className="relative h-[400px] rounded-[3rem] overflow-hidden flex items-center px-12">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <img 
          src="https://picsum.photos/seed/tech-dark/1920/1080" 
          alt="New Arrivals" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        <div className="relative z-20 max-w-2xl space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">Just Landed</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none"
          >
            New <br /> Arrivals
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg"
          >
            The latest cutting-edge components for the newest devices on the market. Fresh from our quality control labs.
          </motion.p>
        </div>
      </header>

      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-border pb-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tight">Latest Inventory</h2>
            <p className="text-text-muted">Updated every 24 hours with verified stock.</p>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-text-muted">
            <span>Filter by:</span>
            <button className="px-4 py-2 bg-surface border border-border rounded-xl hover:border-primary transition-colors">Brand</button>
            <button className="px-4 py-2 bg-surface border border-border rounded-xl hover:border-primary transition-colors">Model</button>
          </div>
        </div>

        <div className="grid-layout">
          {mockNewArrivals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-12 bg-accent/5 border border-accent/10 rounded-[3rem] space-y-6">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight">Priority Stocking</h2>
          <p className="text-text-muted leading-relaxed">
            We prioritize stocking parts for flagship devices within 14 days of their global release. Stay ahead of the repair market with our early-access inventory.
          </p>
          <button className="flex items-center gap-2 text-accent font-black uppercase tracking-widest text-xs group">
            Learn about sourcing <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="p-12 bg-primary/5 border border-primary/10 rounded-[3rem] space-y-6">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight">Verified Arrivals</h2>
          <p className="text-text-muted leading-relaxed">
            Every new arrival goes through an extended 48-hour burn-in test to ensure compatibility with the latest firmware updates from manufacturers.
          </p>
          <button className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs group">
            Our Quality Standards <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
