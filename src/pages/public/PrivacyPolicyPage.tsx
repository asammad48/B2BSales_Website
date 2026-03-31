import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { useLanguage } from '@/state/LanguageContext';

export function PrivacyPolicyPage() {
  const { t } = useLanguage();
  const sections = [
    {
      title: t('privacyPolicy.sections.dataCollection.title'),
      content: t('privacyPolicy.sections.dataCollection.content')
    },
    {
      title: t('privacyPolicy.sections.dataUsage.title'),
      content: t('privacyPolicy.sections.dataUsage.content')
    },
    {
      title: t('privacyPolicy.sections.security.title'),
      content: t('privacyPolicy.sections.security.content')
    },
    {
      title: t('privacyPolicy.sections.sharing.title'),
      content: t('privacyPolicy.sections.sharing.content')
    },
    {
      title: t('privacyPolicy.sections.rights.title'),
      content: t('privacyPolicy.sections.rights.content')
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
          <Shield className="w-4 h-4 text-accent" />
          <span className="text-[10px] font-black uppercase tracking-widest text-accent">{t('privacyPolicy.badge')}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('privacyPolicy.title')}</h1>
        <p className="text-text-muted text-lg max-w-2xl">
          {t('privacyPolicy.subtitle')}
        </p>
      </header>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.section 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-8 space-y-4 border-l-4 border-l-accent"
          >
            <h2 className="text-2xl font-bold uppercase tracking-tight flex items-center gap-3">
              <span className="text-accent/30 font-mono">0{index + 1}</span>
              {section.title}
            </h2>
            <p className="text-text-muted leading-relaxed">
              {section.content}
            </p>
          </motion.section>
        ))}
      </div>

      <footer className="glass-card p-8 bg-surface/50 text-center space-y-4">
        <p className="text-sm text-text-muted">
          {t('privacyPolicy.lastUpdated')}
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn-outline px-6 py-2 text-[10px] font-black uppercase tracking-widest">{t('privacyPolicy.actions.downloadPdf')}</button>
          <button className="btn-primary px-6 py-2 text-[10px] font-black uppercase tracking-widest">{t('privacyPolicy.actions.contactSupport')}</button>
        </div>
      </footer>
    </div>
  );
}
