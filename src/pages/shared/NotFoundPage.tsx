import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/state/LanguageContext';

export function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8 max-w-md"
      >
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-accent/10 rounded-3xl flex items-center justify-center text-accent mx-auto">
            <AlertCircle className="w-12 h-12" />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-black"
          >
            404
          </motion.div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight">{t('notFound.title')}</h1>
          <p className="text-text-muted leading-relaxed">
            {t('notFound.description')}
          </p>
        </div>

        <Link to="/" className="btn-primary h-12 px-8 inline-flex items-center gap-2 group">
          <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          {t('notFound.cta')}
        </Link>
      </motion.div>
    </div>
  );
}
