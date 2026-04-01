import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Globe, Clock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/state/LanguageContext';

export function ShippingPolicyPage() {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
          <Truck className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">{t('shippingPolicy.badge')}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('shippingPolicy.title')}</h1>
        <p className="text-text-muted text-lg max-w-2xl">
          {t('shippingPolicy.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            icon: <Globe className="w-6 h-6" />,
            title: t('shippingPolicy.cards.global.title'),
            description: t('shippingPolicy.cards.global.description')
          },
          {
            icon: <Clock className="w-6 h-6" />,
            title: t('shippingPolicy.cards.fast.title'),
            description: t('shippingPolicy.cards.fast.description')
          },
          {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: t('shippingPolicy.cards.secure.title'),
            description: t('shippingPolicy.cards.secure.description')
          },
          {
            icon: <Truck className="w-6 h-6" />,
            title: t('shippingPolicy.cards.tracking.title'),
            description: t('shippingPolicy.cards.tracking.description')
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
          <h2 className="text-2xl font-bold uppercase tracking-tight">{t('shippingPolicy.delivery.title')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">{t('shippingPolicy.delivery.region')}</th>
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">{t('shippingPolicy.delivery.standard')}</th>
                  <th className="py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">{t('shippingPolicy.delivery.express')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-4 font-medium">{t('shippingPolicy.delivery.eu.region')}</td>
                  <td className="py-4 text-text-muted">{t('shippingPolicy.delivery.eu.standard')}</td>
                  <td className="py-4 text-primary font-bold">{t('shippingPolicy.delivery.eu.express')}</td>
                </tr>
                <tr>
                  <td className="py-4 font-medium">{t('shippingPolicy.delivery.na.region')}</td>
                  <td className="py-4 text-text-muted">{t('shippingPolicy.delivery.na.standard')}</td>
                  <td className="py-4 text-primary font-bold">{t('shippingPolicy.delivery.na.express')}</td>
                </tr>
                <tr>
                  <td className="py-4 font-medium">{t('shippingPolicy.delivery.apac.region')}</td>
                  <td className="py-4 text-text-muted">{t('shippingPolicy.delivery.apac.standard')}</td>
                  <td className="py-4 text-primary font-bold">{t('shippingPolicy.delivery.apac.express')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-tight">{t('shippingPolicy.customs.title')}</h2>
          <p className="text-text-muted text-sm leading-relaxed">
            {t('shippingPolicy.customs.description')}
          </p>
        </div>
      </section>
    </div>
  );
}
