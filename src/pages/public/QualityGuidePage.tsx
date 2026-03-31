import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Zap, Microscope, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/state/LanguageContext';

export function QualityGuidePage() {
  const { t } = useLanguage();
  const grades = [
    {
      title: t('qualityGuide.grades.original.title'),
      icon: <Award className="w-6 h-6 text-primary" />,
      color: "border-primary",
      description: t('qualityGuide.grades.original.description'),
      pros: [t('qualityGuide.grades.original.pros.1'), t('qualityGuide.grades.original.pros.2'), t('qualityGuide.grades.original.pros.3')],
      cons: [t('qualityGuide.grades.original.cons.1'), t('qualityGuide.grades.original.cons.2')]
    },
    {
      title: t('qualityGuide.grades.refurbished.title'),
      icon: <CheckCircle2 className="w-6 h-6 text-accent" />,
      color: "border-accent",
      description: t('qualityGuide.grades.refurbished.description'),
      pros: [t('qualityGuide.grades.refurbished.pros.1'), t('qualityGuide.grades.refurbished.pros.2'), t('qualityGuide.grades.refurbished.pros.3')],
      cons: [t('qualityGuide.grades.refurbished.cons.1'), t('qualityGuide.grades.refurbished.cons.2')]
    },
    {
      title: t('qualityGuide.grades.hq.title'),
      icon: <Zap className="w-6 h-6 text-secondary" />,
      color: "border-secondary",
      description: t('qualityGuide.grades.hq.description'),
      pros: [t('qualityGuide.grades.hq.pros.1'), t('qualityGuide.grades.hq.pros.2'), t('qualityGuide.grades.hq.pros.3')],
      cons: [t('qualityGuide.grades.hq.cons.1'), t('qualityGuide.grades.hq.cons.2')]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
          <Microscope className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">{t('qualityGuide.badge')}</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">{t('qualityGuide.title')}</h1>
        <p className="text-text-muted text-xl max-w-3xl mx-auto">
          {t('qualityGuide.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {grades.map((grade, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-8 border-l-8 ${grade.color} grid grid-cols-1 lg:grid-cols-3 gap-8`}
          >
            <div className="lg:col-span-1 space-y-4">
              <div className="w-12 h-12 bg-surface border border-border rounded-xl flex items-center justify-center">
                {grade.icon}
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">{grade.title}</h2>
              <p className="text-text-muted text-sm leading-relaxed">{grade.description}</p>
            </div>
            
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">{t('qualityGuide.advantages')}</h3>
              <ul className="space-y-3">
                {grade.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-accent">{t('qualityGuide.considerations')}</h3>
              <ul className="space-y-3">
                {grade.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <AlertTriangle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-text-muted">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="p-12 bg-surface border border-border rounded-[3rem] space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black uppercase tracking-tight">{t('qualityGuide.testing.title')}</h2>
          <p className="text-text-muted">{t('qualityGuide.testing.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            t('qualityGuide.testing.items.1'), t('qualityGuide.testing.items.2'), t('qualityGuide.testing.items.3'), t('qualityGuide.testing.items.4'),
            t('qualityGuide.testing.items.5'), t('qualityGuide.testing.items.6'), t('qualityGuide.testing.items.7'), t('qualityGuide.testing.items.8'),
            t('qualityGuide.testing.items.9'), t('qualityGuide.testing.items.10'), t('qualityGuide.testing.items.11'), t('qualityGuide.testing.items.12')
          ].map((test, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest">{test}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
