import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Gavel, FileCheck, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/state/LanguageContext';

export function TermsOfServicePage() {
  const { t } = useLanguage();
  const terms = [
    {
      title: t('terms.sections.acceptance.title'),
      content: t('terms.sections.acceptance.content')
    },
    {
      title: t('terms.sections.license.title'),
      content: t('terms.sections.license.content')
    },
    {
      title: t('terms.sections.disclaimer.title'),
      content: t('terms.sections.disclaimer.content')
    },
    {
      title: t('terms.sections.limitations.title'),
      content: t('terms.sections.limitations.content')
    },
    {
      title: t('terms.sections.governing.title'),
      content: t('terms.sections.governing.content')
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full">
          <Scale className="w-4 h-4 text-secondary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-secondary">{t('terms.badge')}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('terms.title')}</h1>
        <p className="text-text-muted text-lg max-w-2xl">
          {t('terms.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {terms.map((term, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group p-6 bg-surface border border-border rounded-2xl hover:border-secondary transition-all"
          >
            <div className="flex items-start gap-6">
              <div className="w-8 h-8 rounded-lg bg-bg border border-border flex items-center justify-center text-text-muted group-hover:text-secondary group-hover:border-secondary transition-colors font-mono text-xs">
                {index + 1}
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-bold uppercase tracking-tight">{term.title}</h2>
                <p className="text-text-muted text-sm leading-relaxed">{term.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-8 bg-secondary/5 border border-secondary/20 rounded-3xl flex items-start gap-6">
        <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="font-bold uppercase tracking-tight">{t('terms.notice.title')}</h3>
          <p className="text-sm text-text-muted leading-relaxed">
            {t('terms.notice.content')}
          </p>
        </div>
      </div>
    </div>
  );
}
