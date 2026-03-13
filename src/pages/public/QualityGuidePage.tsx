import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Zap, Microscope, CheckCircle2, AlertTriangle } from 'lucide-react';

export function QualityGuidePage() {
  const grades = [
    {
      title: "Service Pack / Original",
      icon: <Award className="w-6 h-6 text-primary" />,
      color: "border-primary",
      description: "Direct from the manufacturer's official supply chain. These are the exact same components used in the original device assembly.",
      pros: ["100% Original specifications", "Highest reliability", "Full manufacturer warranty support"],
      cons: ["Highest price point", "Limited availability for older models"]
    },
    {
      title: "Premium / Refurbished",
      icon: <CheckCircle2 className="w-6 h-6 text-accent" />,
      color: "border-accent",
      description: "Original components that have been professionally restored to like-new condition using high-grade materials.",
      pros: ["Original performance", "Eco-friendly choice", "Better value than Service Pack"],
      cons: ["May show microscopic signs of previous use", "Varying supply levels"]
    },
    {
      title: "High Quality (HQ) / AAA",
      icon: <Zap className="w-6 h-6 text-secondary" />,
      color: "border-secondary",
      description: "Third-party components engineered to match original specifications as closely as possible. Rigorously tested for compatibility.",
      pros: ["Excellent price-to-performance ratio", "High availability", "Strict quality control"],
      cons: ["Minor differences in color or brightness", "Slightly higher power consumption"]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
          <Microscope className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">Quality Standards</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Quality Guide</h1>
        <p className="text-text-muted text-xl max-w-3xl mx-auto">
          Transparency is at the core of our business. We categorize every component using strict industry standards so you know exactly what you're buying.
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
              <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Advantages</h3>
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
              <h3 className="text-[10px] font-black uppercase tracking-widest text-accent">Considerations</h3>
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
          <h2 className="text-3xl font-black uppercase tracking-tight">Our Testing Protocol</h2>
          <p className="text-text-muted">Every single part undergoes a 12-point inspection before shipping.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            "Visual Inspection", "Touch Sensitivity", "Color Accuracy", "Frame Fitment",
            "Power Consumption", "Heat Dissipation", "Connector Integrity", "Pixel Integrity",
            "Backlight Uniformity", "Flex Cable Stress", "IC Compatibility", "Final Burn-in"
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
