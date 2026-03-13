import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Gavel, FileCheck, AlertCircle } from 'lucide-react';

export function TermsOfServicePage() {
  const terms = [
    {
      title: "Acceptance of Terms",
      content: "By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
    },
    {
      title: "Use License",
      content: "Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title."
    },
    {
      title: "Disclaimer",
      content: "The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability."
    },
    {
      title: "Limitations",
      content: "In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website."
    },
    {
      title: "Governing Law",
      content: "These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which our company is headquartered, and you irrevocably submit to the exclusive jurisdiction of the courts in that location."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full">
          <Scale className="w-4 h-4 text-secondary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Legal Framework</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Terms of Service</h1>
        <p className="text-text-muted text-lg max-w-2xl">
          Please read these terms carefully before using our platform. They define the legal relationship between you and our company.
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
          <h3 className="font-bold uppercase tracking-tight">Important Notice</h3>
          <p className="text-sm text-text-muted leading-relaxed">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
          </p>
        </div>
      </div>
    </div>
  );
}
