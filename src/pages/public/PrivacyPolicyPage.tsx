import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Data Collection",
      content: "We collect information that you provide directly to us, such as when you create an account, place an order, or contact our support team. This may include your name, email address, shipping address, and payment information."
    },
    {
      title: "How We Use Your Information",
      content: "Your data is used to process transactions, provide customer support, and improve our services. We may also use your information to send you updates about your orders or promotional offers if you have opted in."
    },
    {
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration. All sensitive data is encrypted during transmission and storage."
    },
    {
      title: "Third-Party Sharing",
      content: "We do not sell your personal information to third parties. We only share data with trusted partners who assist us in operating our website, conducting our business, or servicing you, provided they agree to keep this information confidential."
    },
    {
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal information at any time. You can manage your data through your account settings or by contacting our privacy officer."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
          <Shield className="w-4 h-4 text-accent" />
          <span className="text-[10px] font-black uppercase tracking-widest text-accent">Security</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Privacy Policy</h1>
        <p className="text-text-muted text-lg max-w-2xl">
          Your privacy is our priority. We are committed to protecting your personal data and being transparent about how we use it.
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
          Last updated: March 13, 2026. If you have any questions regarding this policy, please contact our privacy team.
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn-outline px-6 py-2 text-[10px] font-black uppercase tracking-widest">Download PDF</button>
          <button className="btn-primary px-6 py-2 text-[10px] font-black uppercase tracking-widest">Contact Support</button>
        </div>
      </footer>
    </div>
  );
}
