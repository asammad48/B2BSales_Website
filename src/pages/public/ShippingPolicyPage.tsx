import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Globe, Clock, ShieldCheck } from 'lucide-react';

export function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
          <Truck className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">Logistics</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Shipping Policy</h1>
        <p className="text-text-muted text-lg max-w-2xl">
          Global logistics engineered for speed and reliability. We ensure your critical components arrive safely and on time.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            icon: <Globe className="w-6 h-6" />,
            title: "Global Coverage",
            description: "We ship to over 150 countries worldwide using premium carriers like DHL, FedEx, and UPS."
          },
          {
            icon: <Clock className="w-6 h-6" />,
            title: "Fast Processing",
            description: "Orders placed before 2:00 PM CET are processed and dispatched on the same business day."
          },
          {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "Secure Packaging",
            description: "All components are packed in ESD-safe, anti-static materials to ensure zero damage during transit."
          },
          {
            icon: <Truck className="w-6 h-6" />,
            title: "Real-time Tracking",
            description: "Receive instant updates and precise tracking information as soon as your order leaves our facility."
          }
        ].map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 space-y-4"
          >
            <div className="w-12 h-12 bg-surface border border-border rounded-xl flex items-center justify-center text-primary shadow-sm">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>

      <section className="glass-card p-8 space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-tight">Delivery Estimates</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Region</th>
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Standard</th>
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Express</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-4 font-medium">European Union</td>
                  <td className="py-4 text-text-muted">2-4 Business Days</td>
                  <td className="py-4 text-primary font-bold">Next Day</td>
                </tr>
                <tr>
                  <td className="py-4 font-medium">North America</td>
                  <td className="py-4 text-text-muted">5-7 Business Days</td>
                  <td className="py-4 text-primary font-bold">2-3 Days</td>
                </tr>
                <tr>
                  <td className="py-4 font-medium">Asia Pacific</td>
                  <td className="py-4 text-text-muted">7-10 Business Days</td>
                  <td className="py-4 text-primary font-bold">3-5 Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-tight">Customs & Duties</h2>
          <p className="text-text-muted text-sm leading-relaxed">
            For international orders, please note that customs duties, taxes, and import fees may apply depending on your country's regulations. These charges are the responsibility of the recipient. We provide all necessary documentation to ensure a smooth customs clearance process.
          </p>
        </div>
      </section>
    </div>
  );
}
